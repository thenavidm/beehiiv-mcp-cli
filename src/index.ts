#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { buildServer,VERSION } from "./server.js";
import { runCli, exitCodeFor } from "./cli.js";
import { runDoctor } from "./doctor.js";
import { basename } from "node:path";
const HELP=`Beehiiv MCP server and CLI ${VERSION}

beehiiv-mcp                         Start the local stdio MCP server
beehiiv-cli                         List all available commands
beehiiv-cli <command> --help        Schema-derived arguments and flags
beehiiv-cli schema <command>        Exact MCP input schema
beehiiv-cli doctor [--network]      Check settings; optionally read the account
beehiiv-cli login                   Private account setup instructions
beehiiv-cli --version               Package version

BEEHIIV_API_KEY                     An API v2 key for personal automation
BEEHIIV_ACCESS_TOKEN                OAuth access token
BEEHIIV_TOKENS_FILE                 Private OAuth JSON with refresh credentials
BEEHIIV_CLIENT_ID / _CLIENT_SECRET / _REFRESH_TOKEN   Optional OAuth refresh settings
BEEHIIV_ACCOUNTS / _DEFAULT_ACCOUNT  Named account configuration
BEEHIIV_READ_ONLY=1                 Hide/refuse all writes
BEEHIIV_ALLOW_DESTRUCTIVE=0         Block audience/delivery/deletion/secret changes
BEEHIIV_AUDIT_LOG                   Private write-guard log, no request data
BEEHIIV_REQUEST_TIMEOUT_MS=30000; BEEHIIV_MAX_RETRIES=2 (GET 429 only)
BEEHIIV_MIN_REQUEST_INTERVAL_MS     Default pacing: 2000 ms conservative default

https://github.com/thenavidm/beehiiv-mcp-cli
`;
async function main():Promise<void> {
 const args=process.argv.slice(2);const command=args[0];
 if(command==="--version"||command==="-v"){console.log(VERSION);return;}
 if(command==="--help"||command==="-h"||command==="help"){process.stdout.write(HELP);return;}
 if(command==="doctor"){if(args.slice(1).some(a=>a!=="--network")){process.exitCode=2;console.error(JSON.stringify({error:"doctor accepts only --network"}));return;}process.exitCode=await runDoctor(args.includes("--network"));return;}
 if(command==="login"){console.log("For personal automation, open https://app.beehiiv.com and open Workspace Settings > API and create a new API key. Store it only in private shell/client settings as BEEHIIV_API_KEY. OAuth integrations need your own registered Beehiiv OAuth app and a private BEEHIIV_TOKENS_FILE. Follow INSTALL.md and https://developers.beehiiv.com/oauth2. login does not open a browser, exchange authorization codes or store credentials. Then run beehiiv-cli doctor --network.");return;}
 if(args.length||basename(process.argv[1]??"").startsWith("beehiiv-cli")){process.exitCode=await runCli(args);return;}
 const server=buildServer();await server.connect(new StdioServerTransport());
 const close=async()=>{await server.close();process.exit(0);};process.on("SIGTERM",()=>void close());process.on("SIGINT",()=>void close());
}
main().catch(e=>{console.error(JSON.stringify({error:e.message}));process.exitCode=exitCodeFor(e.message);});
