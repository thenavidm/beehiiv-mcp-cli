import { readFile, writeFile, rename, lstat, unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";
import { BeehiivError, UsageError } from "./errors.js";
import { selectAccount, type Account, type Config } from "../config.js";
export type Json=Record<string,any>;
type Tokens={access_token?:string;refresh_token?:string;client_id?:string;client_secret?:string;created_at?:number;expires_in?:number};
export class BeehiivClient {
 private tokens=new Map<string,Tokens>();private refreshes=new Map<string,Promise<Tokens>>();private schedules=new Map<string,Promise<void>>();private nextAt=new Map<string,number>();
 constructor(readonly config:Config,private readonly fetcher:typeof fetch=fetch,private readonly sleep:(ms:number)=>Promise<void>=ms=>new Promise(resolve=>setTimeout(resolve,ms))){}
 private secrets():string[] {
  return [...this.config.accounts.flatMap(a=>[a.apiKey,a.accessToken,a.refreshToken,a.clientSecret]),...Array.from(this.tokens.values()).flatMap(t=>[t.access_token,t.refresh_token,t.client_secret])].filter((s):s is string=>Boolean(s)).sort((a,b)=>b.length-a.length);
 }
 redactText(text:string):string {for(const secret of this.secrets())text=text.split(secret).join("[redacted]");return text;}
 sanitize(value:unknown):unknown {
  if(typeof value==="string")return this.redactText(value);
  if(Array.isArray(value))return value.map(v=>this.sanitize(v));
  if(value&&typeof value==="object")return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,/^(secret|signing_secret|previous_secret|client_secret|access_token|refresh_token|api_key)$/i.test(k)?"[redacted]":this.sanitize(v)]));
  return value;
 }
 private async loadTokens(account:Account):Promise<Tokens> {
  if(this.tokens.has(account.name))return this.tokens.get(account.name)!;
  let t:Tokens={access_token:account.accessToken,refresh_token:account.refreshToken,client_id:account.clientId,client_secret:account.clientSecret};
  if(account.tokensFile)try {
   const stat=await lstat(account.tokensFile);if(!stat.isFile()||stat.size>65536)throw new Error();
   t={...t,...JSON.parse(await readFile(account.tokensFile,"utf8"))};
  }catch {throw new BeehiivError("Cannot read the private Beehiiv tokens file. It must be a regular JSON file.",0,"CONFIG");}
  this.tokens.set(account.name,t);return t;
 }
 private async refresh(account:Account):Promise<Tokens> {
  const existing=this.refreshes.get(account.name);if(existing)return existing;
  const promise=(async()=>{
   const t=await this.loadTokens(account);
   if(!t.refresh_token||!t.client_id)throw new BeehiivError("OAuth token expired. Refresh credentials are not configured; renew the private access token.",401,"AUTH");
   let response:Response;
   try {response=await this.fetcher("https://app.beehiiv.com/oauth/token",{method:"POST",redirect:"error",signal:AbortSignal.timeout(this.config.timeoutMs),headers:{"Content-Type":"application/x-www-form-urlencoded","Accept":"application/json"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t.refresh_token,client_id:t.client_id,...(t.client_secret?{client_secret:t.client_secret}:{})}).toString()});}
   catch {throw new BeehiivError("OAuth refresh request failed. No token values are logged.",0,"AUTH");}
   if(!response.ok)throw new BeehiivError(`OAuth refresh failed (${response.status}). Renew the private credentials.`,response.status,"AUTH");
   let data:Tokens;try {data=await response.json() as Tokens;}catch {throw new BeehiivError("OAuth refresh returned an invalid response.",0,"AUTH");}
   if(!data.access_token)throw new BeehiivError("OAuth refresh returned no access token.",0,"AUTH");
   const merged={...t,...data,created_at:data.created_at??Math.floor(Date.now()/1000)};this.tokens.set(account.name,merged);
   if(account.tokensFile) {
    const temp=join(dirname(account.tokensFile),`.beehiiv-refresh-${randomUUID()}.tmp`);
    try {await writeFile(temp,JSON.stringify(merged),{mode:0o600,flag:"wx"});await rename(temp,account.tokensFile);}catch {await unlink(temp).catch(()=>{});throw new BeehiivError("Token refresh succeeded but the private token file could not be updated. Do not repeat writes; repair file permissions.",0,"CONFIG");}
   }
   return merged;
  })();this.refreshes.set(account.name,promise);
  try {return await promise;}finally {this.refreshes.delete(account.name);}
 }
 private async auth(account:Account,oauthOnly:boolean):Promise<{headers:Record<string,string>;oauth:boolean}> {
  let t=await this.loadTokens(account);
  if(t.access_token) {
   if(t.created_at&&t.expires_in&&Date.now()>=(t.created_at+t.expires_in)*1000-60000)t=await this.refresh(account);
   return {headers:{Authorization:`Bearer ${t.access_token}`},oauth:true};
  }
  if(oauthOnly)throw new BeehiivError("OAuth is required for this endpoint; an API key cannot use it.",403,"AUTH");
  if(account.apiKey)return {headers:{Authorization:`Bearer ${account.apiKey}`},oauth:false};
  throw new BeehiivError("No credentials configured for the selected account. Run beehiiv-cli login.",0,"CONFIG");
 }
 private async pace(account:Account,oauth:boolean):Promise<void> {
  const previous=this.schedules.get(account.name)??Promise.resolve();
  const next=previous.catch(()=>{}).then(async()=>{const delay=Math.max(0,(this.nextAt.get(account.name)??0)-Date.now());if(delay)await this.sleep(delay);this.nextAt.set(account.name,Date.now()+(this.config.minIntervalMs|| 2000));});
  this.schedules.set(account.name,next);await next;
 }
 async request(method:string,path:string,query:Json={},body?:Json,accountHint?:string,oauthOnly=false):Promise<Json> {
  if(!/^\/v2\/[a-zA-Z0-9_%@.+\-/]+$/.test(path)||path.split("/").some(s=>decodeURIComponent(s)===".."))throw new UsageError("Unsupported Beehiiv API path.");
  const account=selectAccount(this.config,accountHint);let auth=await this.auth(account,oauthOnly);
  const url=new URL(path,"https://api.beehiiv.com");
  for(const[k,v]of Object.entries(query)) {
   if(v===undefined||v===null)continue;
   if(Array.isArray(v))for(const x of v)url.searchParams.append(k,String(x));
   else url.searchParams.set(k,String(v));
  }
  const encoded=body===undefined?undefined:JSON.stringify(body);
  if(encoded&&Buffer.byteLength(encoded)>5*1024*1024)throw new UsageError("Request JSON exceeds the 5 MB local safety cap. Split the batch.");
  let refreshed=false;
  for(let attempt=0;;attempt++) {
   await this.pace(account,auth.oauth);
   let response:Response;
   try {response=await this.fetcher(url,{method,redirect:"error",signal:AbortSignal.timeout(this.config.timeoutMs),headers:{...auth.headers,Accept:"application/json",...(encoded?{"Content-Type":"application/json"}:{})},...(encoded?{body:encoded}:{})});}
   catch {throw new BeehiivError(method==="GET"?"Beehiiv request failed or timed out.":"Beehiiv write failed or timed out; its outcome may be unknown. Inspect the account before repeating it.",0,"NETWORK");}
   if(method==="GET"&&response.status===401&&auth.oauth&&!refreshed) {
    refreshed=true;await response.body?.cancel();await this.refresh(account);auth=await this.auth(account,oauthOnly);continue;
   }
   if(method==="GET"&&response.status===429&&attempt<this.config.maxRetries) {
    const raw=response.headers.get("retry-after");const seconds=raw===null?1:Number(raw);const ms=Number.isFinite(seconds)?seconds*1000:Date.parse(raw!)-Date.now();await response.body?.cancel();await this.sleep(Math.max(100,Math.min(ms||1000,10000)));continue;
   }
   const text=await response.text();
   if(!response.ok) {
    let detail="";try {const x=JSON.parse(text);detail=JSON.stringify(x.errors??x.error??"");}catch {}
    throw new BeehiivError(this.redactText(`Beehiiv API ${response.status}${detail?`: ${detail.slice(0,1000)}`:""}`),response.status,response.status===429?"RATE_LIMIT":response.status===401||response.status===403?"AUTH":"API_ERROR");
   }
   if(response.status===202){let pending:Json={};try{pending=text?JSON.parse(text):{};}catch{}return {...pending,http_status:202,creation_pending:true,retry_after:response.headers.get("retry-after")};}
   if(!text)return {success:true};
   try {return JSON.parse(text) as Json;}catch {throw new BeehiivError("Beehiiv returned a non-JSON response.",0,"API_ERROR");}
  }
 }
}
