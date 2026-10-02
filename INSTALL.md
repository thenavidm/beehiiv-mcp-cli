# Install Beehiiv MCP Server & CLI

One npm package includes both binaries and all **117 tools**. Requires Node.js 22 or newer for CLI/manual MCP installs. Discovery works before account authentication. Account operations need eligible Beehiiv API access; OAuth integrations need documented operation scopes.

| Route | Program | Use |
| --- | --- | --- |
| Terminal | beehiiv-cli | Scripts and agents with a shell |
| Local MCP | beehiiv-mcp | AI clients supporting stdio |
| Desktop archive | beehiiv-2.0.0.mcpb | Compatible Claude Desktop custom extensions |
| Beehiiv-hosted alternative | https://mcp.beehiiv.com/mcp | Official remote OAuth, reads on all plans; writes on paid plans |

## Contents

[Requirements](#requirements) · [CLI](#cli) · [Private account setup](#private-account-setup) · [Claude Code](#claude-code) · [Codex](#codex) · [Claude Desktop](#claude-desktop) · [Cursor](#cursor) · [VS Code and Copilot](#vs-code-and-copilot) · [Windsurf](#windsurf) · [Zed](#zed) · [Gemini CLI](#gemini-cli) · [Docker](#docker) · [Verify](#verify) · [Multiple accounts](#multiple-accounts) · [Updates and removal](#updates-and-removal) · [Troubleshooting](#troubleshooting) · [Development](#development)

## Requirements

Install Node from [nodejs.org](https://nodejs.org/en/download). Open a new terminal and check `node --version` and `npm --version`. The desktop host needs a compatible Node runtime; dependencies are bundled. A GUI app may not inherit your terminal's environment. Check your account's current API access with Beehiiv instead of assuming npm installation provides it.

## CLI

On macOS/Linux, use Terminal. On Windows, use PowerShell or Command Prompt:

```bash
npm install -g @thenavidm/beehiiv-mcp-cli@latest
beehiiv-cli --version
beehiiv-cli
beehiiv-cli list-posts --help
beehiiv-cli schema create-post
beehiiv-cli login
```

If PowerShell blocks npm.ps1, use npm.cmd or Command Prompt according to your policy. If a binary is missing, check `npm prefix -g`, ensure its executable directory is on PATH and open a new terminal. Avoid sudo as a workaround for PATH problems.

For one command without a global install:

```bash
npx -y --package @thenavidm/beehiiv-mcp-cli@latest beehiiv-cli tools
```

Make [SKILL.md](./SKILL.md) available in your agent's supported skill location. The installed file is `<npm root -g>/@thenavidm/beehiiv-mcp-cli/SKILL.md`. npm does not automatically register client skills. Your agent should read the actual schema and use --agent/--select for compact output.

## Private account setup

### API key for your own account

1. Open [Beehiiv](https://app.beehiiv.com), then Settings > API under Workspace Settings.
2. Choose Create New API Key, name it and select publication restrictions if needed.
3. Save the value privately when shown. It cannot be retrieved after leaving the page.
4. Set BEEHIIV_API_KEY in private shell/client settings. Never put it into a shared config, AI chat or public transcript.
5. Run doctor, then doctor --network. The network check reads permitted publications and does not send email or change subscribers.

Follow [the current key instructions](https://developers.beehiiv.com/welcome/create-an-api-key). Keys authenticate as Bearer tokens. A restricted key sees only permitted publications; out-of-scope publications return 404 and workspace privacy deletion returns 403. The package does not automatically load .env or inherit a terminal environment into GUI apps. login prints instructions without saving credentials.

For a temporary macOS/Linux shell, set the value privately:

```bash
export BEEHIIV_API_KEY='YOUR_PRIVATE_API_KEY'
beehiiv-cli doctor --network
```

PowerShell:

```powershell
$env:BEEHIIV_API_KEY = 'YOUR_PRIVATE_API_KEY'
beehiiv-cli doctor --network
```

### Your own OAuth integration

Contact Beehiiv support to register your own client and follow [the OAuth guide](https://developers.beehiiv.com/oauth2). Use your exact registered callback, verified random state and PKCE for public clients. Request only required scopes; identify:read alone does not grant all API actions. The package does not host the initial consent/callback flow.

Authorization: https://app.beehiiv.com/oauth/authorize. Token exchange/refresh: https://app.beehiiv.com/oauth/token with application/x-www-form-urlencoded. Confidential clients supply their own client secret; public clients use PKCE for initial exchange and omit that secret.

Store tokens and your app settings in a private regular JSON file outside the checkout:

```json
{"access_token":"YOUR_ACCESS_TOKEN","refresh_token":"YOUR_REFRESH_TOKEN","client_id":"YOUR_APP_ID","client_secret":"YOUR_CONFIDENTIAL_APP_SECRET"}
```

Omit client_secret for public clients and include real issued created_at/expires_in metadata when available. Set BEEHIIV_TOKENS_FILE to the absolute path. The file is limited to 64 KB and symlinks are refused. Protect it with 0600 on POSIX and user-only file/folder ACLs on Windows. Refresh writes atomically. Alternatively use private BEEHIIV_ACCESS_TOKEN, BEEHIIV_REFRESH_TOKEN, BEEHIIV_CLIENT_ID and optional BEEHIIV_CLIENT_SECRET environment values; refreshed state then lasts only in the process. An OAuth access token takes precedence over the API key. See [account setup](README.md#3-set-up-beehiiv-access).

### Agent-guided installation

> Help me install Beehiiv MCP Server & CLI with INSTALL.md. Check Node and the binary, let me configure my account credentials privately, then run discovery and doctor --network. Do not send email or change subscribers during setup.

## Claude Code

For a user-scoped connection, after privately configuring credentials:

~~~bash
claude mcp add --scope user beehiiv -- npx -y @thenavidm/beehiiv-mcp-cli@latest
claude mcp list
~~~

Use the client's private local environment settings for the account variable if they are not inherited. Claude's `-e NAME=value` registration option writes values into its config; only use it locally through your secret manager, with no shared command transcript. Never place credentials in a project .mcp.json. Reconnect and ask Claude to verify credentials.

Alternatively install the CLI, make SKILL.md available to Claude, and use shell commands. Registering both surfaces is optional.

## Codex

~~~bash
codex mcp add beehiiv -- npx -y @thenavidm/beehiiv-mcp-cli@latest
codex mcp list
~~~

Account credentials must reach the server through private environment settings. `codex mcp add --env NAME=value` stores values in your local config, so never commit that config or put secrets in a shared command. In TOML, the equivalent server is:

~~~toml
[mcp_servers.beehiiv]
command = "npx"
args = ["-y", "@thenavidm/beehiiv-mcp-cli@latest"]
env_vars = ["BEEHIIV_API_KEY", "BEEHIIV_TOKENS_FILE"]
~~~

`env_vars` forwards those names from the environment available to Codex. If that environment does not contain them, configure private env settings locally. Codex can also call the CLI directly with SKILL.md and `--agent` output.

## Claude Desktop

### Install the .mcpb extension

1. Download `beehiiv-2.0.0.mcpb` from [GitHub Releases](https://github.com/thenavidm/beehiiv-mcp-cli/releases/latest).
2. In a supported Claude Desktop build, open **Settings > Extensions > Advanced settings > Install Extension…** and select it.
3. Enter a private API key in the sensitive setting, or an absolute private OAuth token-file path. Leave the unused method empty.
4. Enable read-only if you want only the 70 reads. Reconnect and ask for account verification.

The bundle includes production dependencies and no credentials. Use the token-file route for your own authorized OAuth integration. The manifest requires Node 22 or newer from a compatible host. Organization policy may restrict custom extensions. Manual bundle updates require installing the new version; no automatic directory updates are promised. GUI installation remains unverified separately from archive/protocol checks.

### Manual config

Open **Settings > Developer > Edit Config**, or use your platform's config file:

| OS | Typical config path |
| --- | --- |
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json`; confirm the location through Edit Config in your installed build |

~~~json
{
  "mcpServers": {
    "beehiiv": {
      "command": "npx",
      "args": ["-y", "@thenavidm/beehiiv-mcp-cli@latest"],
      "env": {
        "BEEHIIV_API_KEY": "YOUR_API_KEY",
        "BEEHIIV_TOKENS_FILE": ""
      }
    }
  }
}
~~~

Replace the placeholders only in your private file. Merge the server entry into an existing mcpServers object instead of replacing other integrations. Fully quit and reopen Claude Desktop. Do not enable an extension and a manual entry with the same name; choose one route.

If a Windows launcher cannot execute npx directly, use `"command": "cmd"` with `"args": ["/c", "npx", "-y", "@thenavidm/beehiiv-mcp-cli@latest"]`. An absolute node executable and installed `dist/index.js` path also avoids launcher/PATH problems.

## Cursor

Use private user settings at `~/.cursor/mcp.json`, or **Settings > Tools & MCP**. [Cursor documents environment interpolation and envFile support](https://cursor.com/docs/mcp).

~~~json
{
  "mcpServers": {
    "beehiiv": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/beehiiv-mcp-cli@latest"],
      "env": {
        "BEEHIIV_API_KEY": "${env:BEEHIIV_API_KEY}",
        "BEEHIIV_TOKENS_FILE": "${env:BEEHIIV_TOKENS_FILE}"
      }
    }
  }
}
~~~

The environment values must exist for the Cursor process. If you use envFile, keep that file private and outside version control. A project's .cursor/mcp.json must not contain actual credentials. Reconnect the server after saving.

## VS Code and Copilot

Use **MCP: Open User Configuration**. [VS Code uses servers and secure inputs](https://code.visualstudio.com/docs/agent-customization/mcp-servers), rather than a mcpServers root:

~~~json
{
  "inputs": [
    {"type": "promptString", "id": "beehiiv-api-key", "description": "Beehiiv API key (leave empty for OAuth)", "password": true},
    {"type": "promptString", "id": "beehiiv-token-file", "description": "Optional private OAuth token-file path (leave empty for API key)"}
  ],
  "servers": {
    "beehiiv": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/beehiiv-mcp-cli@latest"],
      "env": {
        "BEEHIIV_API_KEY": "${input:beehiiv-api-key}",
        "BEEHIIV_TOKENS_FILE": "${input:beehiiv-token-file}"
      }
    }
  }
}
~~~

Start Beehiiv through the MCP controls, approve trust if prompted, and enter credentials in the private input prompts. Workspace .vscode/mcp.json may contain this placeholder-only structure, but never resolved secret values. Remote development runs the server in the selected remote environment, so local file paths refer to that environment.

## Windsurf

Open Cascade's MCP settings or edit the private user file `~/.codeium/windsurf/mcp_config.json`. Use the Claude Desktop manual mcpServers block above with your locally configured env values. See [Windsurf's current MCP documentation](https://docs.devin.ai/desktop/cascade/mcp). Restart or reconnect Beehiiv in Cascade; project files must not contain secrets.

## Zed

Open **Settings > AI > MCP Servers > Add Server > Add Local Server**, or your user settings file. [Zed uses context_servers](https://zed.dev/docs/ai/mcp):

~~~json
{
  "context_servers": {
    "beehiiv": {
      "command": "npx",
      "args": ["-y", "@thenavidm/beehiiv-mcp-cli@latest"],
      "env": {
        "BEEHIIV_API_KEY": "YOUR_API_KEY",
        "BEEHIIV_TOKENS_FILE": ""
      }
    }
  }
}
~~~

Enter actual values only in private user settings. Check the active-server indicator before prompting. Do not wrap command and args inside a nested command object from older Zed examples.

## Gemini CLI

Merge the Claude Desktop manual mcpServers block into your private `~/.gemini/settings.json`. Configure the two env values locally, then restart Gemini CLI and inspect `/mcp`. See [Gemini CLI's MCP configuration](https://geminicli.com/docs/tools/mcp-server/). Its project settings must not contain real credentials. You can instead use the CLI from an agent shell.

Other local stdio clients use the same command and arguments, adapted to their config format. A client that only accepts a remote MCP URL cannot connect directly: this package does not ship a public HTTP listener. ChatGPT's remote connector setup is not a substitute for local stdio installation.

## Docker

Build locally from the reviewed source; no prebuilt registry image is claimed:

```bash
git clone https://github.com/thenavidm/beehiiv-mcp-cli.git
cd beehiiv-mcp-cli
docker build -t beehiiv-mcp-cli .
docker run --rm -i -e BEEHIIV_API_KEY beehiiv-mcp-cli
```

`-e BEEHIIV_API_KEY` forwards the shell's already configured private value. MCP needs `-i` and stdio. For OAuth, mount the private token file into the container with only the access needed for refresh, then set the in-container absolute BEEHIIV_TOKENS_FILE path. Host paths do not automatically exist inside a container. Restrict mounts and persist refreshed tokens if you need restart continuity.

## Cline and other local MCP clients

Use the client's **Add MCP server** flow with command `npx`, arguments `-y` and `@thenavidm/beehiiv-mcp-cli@latest`, stdio transport, and private local BEEHIIV_API_KEY or BEEHIIV_TOKENS_FILE settings. UI names depend on the installed client. Reconnect and discover tools before an account call. Browser-only clients need a remote HTTPS connector; use Beehiiv's official server rather than this local stdio command.

## Verify

```bash
beehiiv-cli doctor
beehiiv-cli doctor --network
beehiiv-cli tools
beehiiv-cli schema list-subscriptions
beehiiv-cli list-accounts --agent
```

The full server discovers 117 tools; read-only discovers 70. Help/schemas/list_accounts are local. The network doctor reads allowed publications without returning private account details. A successful account read does not prove every endpoint's OAuth/plan eligibility or successful delivery.

To try read-only, privately set BEEHIIV_READ_ONLY=1, restart/reconnect and inspect discovery. All 47 writes must disappear and direct write calls must refuse. Remove/disable the setting and reconnect only when you need writes. `BEEHIIV_ALLOW_DESTRUCTIVE=0` separately blocks all 47 writes even when confirmed.

## Multiple accounts

Set private BEEHIIV_ACCOUNTS JSON, which replaces the single-account variables:

```json
[{"name":"work","api_key":"YOUR_WORK_API_KEY"},{"name":"personal","tokens_file":"/absolute/private/path/personal-beehiiv.json"}]
```

Set BEEHIIV_DEFAULT_ACCOUNT=work. `beehiiv-cli list-accounts --agent` lists labels and auth methods; `--account personal` selects another account. Keep the JSON out of public project configs. Separate server instances can provide stronger process-level isolation if needed.

## Updates and removal

```bash
npm install -g @thenavidm/beehiiv-mcp-cli@latest
beehiiv-cli --version
claude mcp remove --scope user beehiiv
codex mcp remove beehiiv
npm uninstall -g @thenavidm/beehiiv-mcp-cli
```

Reinstall a newer desktop archive separately and restart affected clients. Remove manual client entries using its own settings. Uninstalling the package does not revoke Beehiiv credentials, remove private token/secret files or unschedule email. Revoke/delete keys or authorized apps in Beehiiv when appropriate. Inspect and remove private files yourself after preserving any receiver secrets still in use.

Pin a reviewed version instead of @latest if your automation requires reproducibility. Check [CHANGELOG.md](./CHANGELOG.md) and [GitHub Releases](https://github.com/thenavidm/beehiiv-mcp-cli/releases) before a major update. Do not roll back by blindly publishing an older version over an existing npm version.

## Troubleshooting

| Problem | Check |
| --- | --- |
| Missing command | Node 22+, global prefix and PATH |
| No configured account | Private BEEHIIV_API_KEY or regular BEEHIIV_TOKENS_FILE |
| GUI authentication fails | Actual private GUI environment; shell env is separate |
| OAuth required | Current operation scopes and identify_oauth_user OAuth requirement |
| 401/403 | Publication restrictions, OAuth expiry/revocation, current account permissions |
| Invalid/null body | schema; use payload/payload_file for null and nested data |
| First page only | Native cursor where exposed, bounded all_pages; deprecated offset page elsewhere |
| Guard refusal | User-requested --confirm, read-only and destructive settings |
| Write timeout | Inspect account before repeating; no automatic write retries |
| Desktop host rejects extension | Compatible host/runtime and organization custom-extension policy |

See the README for the complete argument table, safety, 20 FAQs and API snapshot corrections. Secrets must never appear in a troubleshooting transcript.

## Development

```bash
git clone https://github.com/thenavidm/beehiiv-mcp-cli.git
cd beehiiv-mcp-cli
npm ci
npm run typecheck
npm run build
npm test
npm run check:counts
npm run build:mcpb
```

Source mode: configure private env, then register `node /absolute/path/beehiiv-mcp-cli/dist/index.js` as the MCP command. Build before registration and after source changes. No local credentials are packaged. [CONTRIBUTING.md](./CONTRIBUTING.md), [SECURITY.md](./SECURITY.md) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) cover contributions, disclosures and licensing.
