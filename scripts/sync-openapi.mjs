import fs from "node:fs";
import crypto from "node:crypto";
const source="https://developers.beehiiv.com/docs/v2/openapi/api-reference.json";
const local=process.argv[2];
const raw=local?fs.readFileSync(local,"utf8"):await(await fetch(source,{headers:{"User-Agent":"Mozilla/5.0"},signal:AbortSignal.timeout(30000)})).text();
const api=JSON.parse(raw);
function clean(v,stack=[]) {
 if(Array.isArray(v))return v.map(x=>clean(x,stack));
 if(!v||typeof v!=="object")return v;
 if(v.$ref) {
  if(stack.includes(v.$ref))throw new Error(`Circular schema: ${v.$ref}`);
  const target=v.$ref.slice(2).split("/").reduce((o,k)=>o[k],api);
  return clean({...target,...Object.fromEntries(Object.entries(v).filter(([k])=>k!=="$ref"))},[...stack,v.$ref]);
 }
 const o={};for(const[k,x]of Object.entries(v))if(!["example","examples","deprecated","readOnly","writeOnly","xml","discriminator","nullable"].includes(k))o[k]=clean(x,stack);
 if(typeof o.description==="string")o.description=o.description.replace(/<[^>]*>/g," ").replace(/\s+/g," ").replace(/—/g,":").trim();
 if(v.nullable&&typeof o.type==="string")o.type=[o.type,"null"];
 if(o.type==="object"&&o.additionalProperties===undefined)o.additionalProperties=false;
 return o;
}

const snake=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1_$2").replace(/[^a-zA-Z0-9]+/g,"_").toLowerCase().replace(/^_|_$/g,"");
const singular=s=>s.endsWith("ies")?s.slice(0,-3)+"y":s.endsWith("ss")?s:s.endsWith("s")?s.slice(0,-1):s;
const legacy={publications_index:"list_publications",publications_show:"get_publication",subscriptions_index:"list_subscriptions","subscriptions_get-by-id":"get_subscription","subscriptions_get-by-email":"get_subscription_by_email",subscriptions_create:"create_subscription",subscriptions_put:"update_subscription",subscriptions_patch:"patch_subscription","subscriptions_update-by-email":"update_subscription_by_email",subscriptions_delete:"delete_subscription",subscriptionTags_create:"add_tags",subscriptionTags_destroy:"remove_tag",posts_index:"list_posts",posts_show:"get_post",posts_create:"create_post",posts_update:"update_post",posts_delete:"delete_post",segments_index:"list_segments",segments_show:"get_segment",segments_list_members:"get_segment_subscribers",segments_delete:"delete_segment",automations_index:"list_automations",automations_show:"get_automation",automationJourneys_index:"list_automation_journeys",automationJourneys_show:"get_automation_journey",automationJourneys_create:"add_subscriber_to_automation",customFields_index:"list_custom_fields",customFields_show:"get_custom_field",customFields_create:"create_custom_field",customFields_put:"update_custom_field",customFields_patch:"patch_custom_field",customFields_delete:"delete_custom_field",tiers_index:"list_tiers",tiers_show:"get_tier",tiers_create:"create_tier",tiers_put:"replace_tier",tiers_patch:"update_tier",referralProgram_show:"get_referral_program",webhooks_index:"list_webhooks",webhooks_show:"get_webhook",webhooks_create:"create_webhook",webhooks_update:"update_webhook",webhooks_delete:"delete_webhook",oauthUsers_identify:"identify_oauth_user",posts_test_send:"send_post_test",posts_preview:"preview_post",posts_aggregate_stats:"get_post_aggregate_stats"};
const corrections=["Post creation requires exactly one of blocks/body_content, defaults status=draft and refuses scheduling a draft; partial updates require a nonempty body and also refuse both content methods.","Header value null suppresses an inherited header per official prose, although the snapshot only types values as strings. Nullable string header values are accepted as a reviewed correction.","Cursor aggregate controls are offered only where the operation schema exposes cursor. Offset page remains an explicit deprecated API input, bounded to page 100; do not assume every operation supports cursor from the general guide.","Existing documented legacy tool names are retained where their endpoints exist. Email-in-path inputs use target_email when a body also has email, avoiding accidental target/update collisions."];
const operations=[];
for(const[path,item]of Object.entries(api.paths))for(const[method,op]of Object.entries(item)){
 if(!["get","post","put","patch","delete"].includes(method))continue;
 const group=snake(op.operationId.split("_")[0]);
 const action=op.operationId.slice(op.operationId.indexOf("_")+1);
 const name=legacy[op.operationId]??(action==="index"?`list_${group}`:action==="show"?`get_${singular(group)}`:action==="create"?`create_${singular(group)}`:action==="delete"?`delete_${singular(group)}`:action==="put"?`replace_${singular(group)}`:action==="patch"||action==="update"?`update_${singular(group)}`:snake(op.operationId));
 const body=clean(op.requestBody?.content?.["application/json"]?.schema??{type:"object",properties:{},additionalProperties:false});
 const params=(op.parameters??[]).filter(p=>p.in==="path"||p.in==="query").map(p=>({...p,key:p.in==="path"&&body.properties?.[snake(p.name)]?`target_${snake(p.name)}`:p.name==="id"?`${singular(group)}_id`:snake(p.name),schema:clean(p.schema??{})}));
 for(const p of params){p.schema.description=p.description?.replace(/<[^>]*>/g," ").replace(/—/g,":").trim()??p.schema.description;if(p.name==="page")Object.assign(p.schema,{minimum:1,maximum:100});if(p.name==="limit")Object.assign(p.schema,{minimum:1,maximum:100});}
 if(group==="posts"&&["post","patch"].includes(method)&&body.properties?.headers)body.properties.headers.additionalProperties={type:["string","null"]};
 if(name==="create_post")body.oneOf=[{required:["blocks"],not:{required:["body_content"]}},{required:["body_content"],not:{required:["blocks"]}}];
 const title=op.summary.replace(/<Badge[\s\S]*?<\/Badge>/g,"").replace(/<[^>]*>/g,"").replace(/—/g,":").trim();
 const scope=op.summary.match(/OAuth Scope:\s*([^<]+)/)?.[1]?.trim()??"";
 const risk=method==="get"?"read":"destructive";
 const oauthOnly=path==="/users/identify";
 const description=`${title}. ${risk==="read"?"Reads account data.":"Changes account state and requires confirm=true for the user-requested action."}${scope?` OAuth integrations require ${scope}.`:""}${oauthOnly?" OAuth access token required; API key identity is not this endpoint.":""}${name==="create_post"?" Defaults to draft. Creation is asynchronous; inspect the existing post ID before repeating a write.":""}`;
 operations.push({name,title,description,method:method.toUpperCase(),path:"/v2"+path,group,risk,oauthOnly,scope,params,bodySchema:body});
}
if(new Set(operations.map(o=>o.name)).size!==operations.length)throw new Error("Duplicate operation names: "+operations.filter((o,i)=>operations.findIndex(x=>x.name===o.name)!==i).map(o=>o.name));
fs.writeFileSync(new URL("../src/tools/operations.json",import.meta.url),JSON.stringify(operations,null,2)+"\n");
fs.writeFileSync(new URL("../src/tools/api-source.json",import.meta.url),JSON.stringify({source,checked:new Date().toISOString().slice(0,10),apiVersion:"v2",documentVersion:api.info.version,sha256:crypto.createHash("sha256").update(raw).digest("hex"),operationCount:operations.length,corrections},null,2)+"\n");
if(!local)fs.writeFileSync(new URL("./beehiiv-api.snapshot.json",import.meta.url),raw);
console.log(`Generated ${operations.length} Beehiiv v2 operations.`);
