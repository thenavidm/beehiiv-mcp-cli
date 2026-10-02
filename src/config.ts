export type Account = {name:string; apiKey:string; accessToken:string; refreshToken:string; clientId:string; clientSecret:string; tokensFile:string};
export type Config = {accounts:Account[];defaultAccount:string;readOnly:boolean;allowDestructive:boolean;auditPath:string;timeoutMs:number;maxRetries:number;minIntervalMs:number};
function number(v:string|undefined, fallback:number, min:number, max:number):number {
 const n=v===undefined||v===""?fallback:Number(v);
 if(!Number.isInteger(n)||n<min||n>max)throw new Error("Invalid settings: request limits and timeouts are outside their supported ranges.");
 return n;
}
export function loadConfig(env:NodeJS.ProcessEnv=process.env):Config {
 let entries:Record<string,unknown>[]=[];
 if(env.BEEHIIV_ACCOUNTS)try {const x=JSON.parse(env.BEEHIIV_ACCOUNTS);if(!Array.isArray(x))throw new Error();entries=x;}catch {throw new Error("BEEHIIV_ACCOUNTS must be a private JSON array of named accounts.");}
 else if(env.BEEHIIV_API_KEY||env.BEEHIIV_ACCESS_TOKEN||env.BEEHIIV_TOKENS_FILE)entries=[{name:"default",api_key:env.BEEHIIV_API_KEY,access_token:env.BEEHIIV_ACCESS_TOKEN,refresh_token:env.BEEHIIV_REFRESH_TOKEN,client_id:env.BEEHIIV_CLIENT_ID,client_secret:env.BEEHIIV_CLIENT_SECRET,tokens_file:env.BEEHIIV_TOKENS_FILE}];
 const accounts=entries.map(x=>{
  if(!x||typeof x!=="object"||typeof x.name!=="string"||!x.name.trim())throw new Error("Every Beehiiv account requires a unique, nonempty name.");
  const text=(key:string):string=>typeof x[key]==="string"?(x[key] as string):"";
  return {name:x.name.trim(),apiKey:text("api_key"),accessToken:text("access_token"),refreshToken:text("refresh_token"),clientId:text("client_id"),clientSecret:text("client_secret"),tokensFile:text("tokens_file")};
 });
 if(new Set(accounts.map(a=>a.name)).size!==accounts.length)throw new Error("Beehiiv account names must be unique.");
 return {accounts,defaultAccount:env.BEEHIIV_DEFAULT_ACCOUNT??accounts[0]?.name??"",readOnly:/^(1|true)$/i.test(env.BEEHIIV_READ_ONLY??""),allowDestructive:!/^(0|false)$/i.test(env.BEEHIIV_ALLOW_DESTRUCTIVE??""),auditPath:env.BEEHIIV_AUDIT_LOG??"",timeoutMs:number(env.BEEHIIV_REQUEST_TIMEOUT_MS,30000,100,300000),maxRetries:number(env.BEEHIIV_MAX_RETRIES,2,0,5),minIntervalMs:number(env.BEEHIIV_MIN_REQUEST_INTERVAL_MS,0,0,10000)};
}
export function selectAccount(config:Config,hint?:string):Account {
 const name=hint??config.defaultAccount;const account=config.accounts.find(a=>a.name===name);
 if(!account)throw new Error(config.accounts.length?"Unknown account. Run list_accounts and use its exact name.":"No credentials configured. Set BEEHIIV_API_KEY or BEEHIIV_TOKENS_FILE. Run beehiiv-cli login.");
 return account;
}
