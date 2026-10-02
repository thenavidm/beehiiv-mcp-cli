import operationsData from "./operations.json" with {type:"json"};
import { Ajv, type ValidateFunction } from "ajv";
import addFormats from "ajv-formats";
import { readFile, lstat } from "node:fs/promises";
import type { Json, BeehiivClient } from "../api/client.js";
import { UsageError } from "../api/errors.js";
import type { Config } from "../config.js";
import type { Risk } from "../safety.js";
export type Operation={name:string;title:string;description:string;method:string;path:string;group:string;risk:Risk;oauthOnly:boolean;params:{name:string;key:string;in:string;required?:boolean;schema:Json}[];bodySchema:Json};
export type ToolSpec={name:string;title:string;description:string;group:string;inputSchema:Json;risk:Risk;handler:(args:Json,client:BeehiivClient)=>Promise<unknown>};
const operations=operationsData as unknown as Operation[];
const ajv=new Ajv({allErrors:true,strict:false});(addFormats as unknown as(a:Ajv)=>void)(ajv);
function check(validate:ValidateFunction,args:unknown):void {if(!validate(args))throw new UsageError(ajv.errorsText(validate.errors,{separator:"; "}));}
function fieldsFor(op:Operation):Json {
 const properties:Json=Object.fromEntries(op.params.map(p=>[p.key,p.schema]));
 Object.assign(properties,op.bodySchema.properties??{});
 properties.account={type:"string",description:"Named private account from BEEHIIV_ACCOUNTS. Defaults to BEEHIIV_DEFAULT_ACCOUNT or the first configured account."};
 if(op.risk!=="read")properties.confirm={type:"boolean",description:"Must be true for every account mutation. Confirms only the user-requested action."};
 const required=op.params.filter(p=>p.required).map(p=>p.key);
 if(Object.keys(op.bodySchema.properties??{}).length) {
  properties.payload={...op.bodySchema,description:"Complete JSON body instead of individual body flags. Supports nullable fields and nested bulk structures. Cannot be combined with body flags or payload_file."};
  properties.payload_file={type:"string",minLength:1,description:"Local JSON request body file, at most 5 MB. Contents are validated before the API call and are never logged."};
 }
 if(op.params.some(p=>p.name==="cursor")) {
  properties.all_pages={type:"boolean",description:"Read successive cursor pages, bounded by max_items (default 1000)."};
  properties.max_items={type:"integer",minimum:1,maximum:10000,description:"Maximum records when all_pages=true. Returns continuation cursor and truncation."};
 }
 return {type:"object",properties,required,additionalProperties:false};
}
async function execute(op:Operation,args:Json,client:BeehiivClient):Promise<unknown> {
 const flat=Object.fromEntries(Object.keys(op.bodySchema.properties??{}).filter(k=>args[k]!==undefined).map(k=>[k,args[k]]));
 if((args.payload!==undefined||args.payload_file!==undefined)&&Object.keys(flat).length)throw new UsageError("Use individual body flags or payload/payload_file, without mixing them.");
 if(args.payload!==undefined&&args.payload_file!==undefined)throw new UsageError("Use payload or payload_file, not both.");
 let body:Json=args.payload??flat;
 if(args.payload_file)try {
  const stat=await lstat(args.payload_file);if(!stat.isFile()||stat.size>5*1024*1024)throw new Error();
  body=JSON.parse(await readFile(args.payload_file,"utf8"));
 }catch {throw new UsageError("payload_file must be a regular JSON file, at most 5 MB.");}
 if(op.name==="create_post")body={status:"draft",...body};
 check(ajv.compile(op.bodySchema),body);
 if(["PATCH","PUT"].includes(op.method)&&!Object.keys(body).length)throw new UsageError("Provide at least one field to update.");
 if(args.cursor&&args.page)throw new UsageError("Use cursor or deprecated page, not both.");
 if(args.all_pages&&args.page)throw new UsageError("all_pages uses cursor; omit deprecated page.");
 if(["create_post","update_post"].includes(op.name)) {
  if(body.blocks!==undefined&&body.body_content!==undefined)throw new UsageError("Use blocks or body_content, not both.");
  if(op.name==="create_post"&&body.status==="draft"&&body.scheduled_at)throw new UsageError("A draft post cannot be scheduled. Set confirmed status only for a requested delivery.");
 }
 if(args.max_items!==undefined&&!args.all_pages)throw new UsageError("max_items requires all_pages=true.");
 for(const key of["url","target_url","callback_url"])if(body[key]) {
  let url:URL;try {url=new URL(body[key]);}catch {throw new UsageError(`${key} must be an absolute HTTPS URL.`);}
  if(url.protocol!=="https:"||url.username||url.password)throw new UsageError(`${key} must use HTTPS without embedded credentials.`);
 }
 const path=op.params.filter(p=>p.in==="path").reduce((path,p)=>path.replace(`{${p.name}}`,encodeURIComponent(String(args[p.key]))),op.path);
 const query:Json=Object.fromEntries(op.params.filter(p=>p.in==="query"&&args[p.key]!==undefined).map(p=>[p.name,args[p.key]]));
 if(args.all_pages)query.limit=Math.min(query.limit??10,args.max_items??1000);
 const result=await client.request(op.method,path,query,op.method==="GET"||!Object.keys(body).length?undefined:body,args.account,op.oauthOnly);
  if(op.name==="create_post")return client.sanitize({...result,creation_pending:true,note:"Post creation was accepted asynchronously. Read this same post ID and inspect its state before repeating a write."});
  if(!args.all_pages)return client.sanitize(result);
  const collection=Object.keys(result).find(k=>Array.isArray(result[k]));
  if(!collection)throw new UsageError("This response has no paginated collection.");
  const max=args.max_items??1000;const items=result[collection].slice(0,max);let page=result;const seen=new Set<string>();let pages=1;
  while(items.length<max&&page.pagination?.has_more) {
   const cursor=page.pagination.next_cursor;
   if(typeof cursor!=="string"||!cursor||seen.has(cursor)||pages>=100)throw new UsageError("Pagination cursor repeated or exceeded 100 pages; narrow the request.");
   seen.add(cursor);page=await client.request(op.method,path,{...query,cursor,limit:Math.min(query.limit??10,max-items.length)},undefined,args.account,op.oauthOnly);pages++;
   if(!Array.isArray(page[collection]))throw new UsageError("Pagination response collection changed unexpectedly.");
   items.push(...page[collection].slice(0,max-items.length));
  }
  return client.sanitize({...result,[collection]:items,pagination:page.pagination,collected:items.length,pages,truncated:Boolean(page.pagination?.has_more)});
}
export const ALL_TOOLS:ToolSpec[]=operations.map(op=>({name:op.name,title:op.title,description:op.description,group:op.group,inputSchema:fieldsFor(op),risk:op.risk,handler:(args,client)=>execute(op,args,client)}));
ALL_TOOLS.push({name:"list_accounts",title:"List configured accounts",description:"List private account labels and configured auth methods, without returning credentials or token-file paths. Does not contact Beehiiv.",group:"accounts",risk:"read",inputSchema:{type:"object",properties:{},additionalProperties:false},handler:async(_args,client)=>({accounts:client.config.accounts.map(a=>({name:a.name,default:a.name===client.config.defaultAccount,auth:a.tokensFile||a.accessToken?"oauth":a.apiKey?"api_key":"not_configured"}))})});
const validators=new Map(ALL_TOOLS.map(t=>[t.name,ajv.compile(t.inputSchema)]));
export function validateArguments(tool:ToolSpec,args:Json):void {check(validators.get(tool.name)!,args);}
export function visibleTools(config:Config):ToolSpec[] {return ALL_TOOLS.filter(t=>!config.readOnly||t.risk==="read");}
