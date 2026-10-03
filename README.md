<img src="https://cdn.navid.me/brand/platforms/beehiiv.png" alt="Beehiiv" width="88">

# Beehiiv MCP Server & CLI

[![npm](https://img.shields.io/npm/v/@thenavidm/beehiiv-mcp-cli?color=orange&label=npm)](https://www.npmjs.com/package/@thenavidm/beehiiv-mcp-cli)
[![CI](https://github.com/thenavidm/beehiiv-mcp-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/thenavidm/beehiiv-mcp-cli/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-AGPL--3.0-green)](./LICENSE)
[![YouTube](https://img.shields.io/badge/YouTube-@thenavidm-red?logo=youtube&logoColor=white)](https://youtube.com/@thenavidm?sub_confirmation=1)
[![X](https://img.shields.io/badge/X-@thenavidm-black?logo=x)](https://x.com/thenavidm)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-thenavidm-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/thenavidm)

Beehiiv MCP server and CLI for Claude Code, Codex and AI agents. **117 tools: 70 reads and 47 confirmed writes** for publications, newsletters, subscriptions, automations, analytics, polls, referral programs, tiers, podcast feeds and webhooks.

One package gives you two ways in: beehiiv-mcp connects the tools to your AI app, and beehiiv-cli makes the same tools shell commands. Claude Desktop also has a bundled .mcpb extension.

Built and maintained by [Navid Moazzez](https://navid.me?utm_source=github&utm_medium=referral&utm_campaign=beehiiv-mcp-cli&utm_content=readme). Complete installation and private account setup are in [INSTALL.md](INSTALL.md).

<img src="https://cdn.navid.me/repos/beehiiv-mcp-cli-retina.gif" alt="Illustrated Beehiiv workflow in the same house terminal used on navid.me" width="520">

The terminal illustrates shipped tools and the draft workflow. It is a presentation preview, not a live account send.

You need a private Beehiiv API key or your own authorized OAuth integration. Endpoint plan/scope permissions apply; Send API creation requires eligible Pro/Enterprise access. The community wrapper preserves AGPL-3.0-or-later licensing; Beehiiv service charges remain separate. This is not a Beehiiv-endorsed product.

Beehiiv already has an official account MCP and a separate documentation MCP. A community task CLI also exists. The comparison below records their scopes; this package makes no unsupported claim of broader coverage or measured efficiency.

## Two ways to use it

### Command line

```bash
npm install -g @thenavidm/beehiiv-mcp-cli@latest
beehiiv-cli
beehiiv-cli list-publications --help
beehiiv-cli schema create-post
beehiiv-cli list-publications --limit 5 --agent
```

Configure credentials privately first. Every write requires --confirm; --agent and --yes never authorize account changes.

### MCP server, for your AI app

```bash
claude mcp add --scope user beehiiv -- npx -y @thenavidm/beehiiv-mcp-cli@latest
```

Then ask: *"Show the publications I can access. Read the latest posts in the publication I choose."* Full client/OS configuration is in INSTALL.md.

### Which one

| Where you work | What to use |
| --- | --- |
| Claude Code, Codex, Cursor or another shell agent | MCP, CLI or both |
| Claude Desktop chat | Local MCP or the desktop bundle |
| Scripts/CI | CLI, or an MCP client |
| Web clients that accept only remote MCP URLs | Official hosted Beehiiv MCP |

## Features

| Capability | CLI command | MCP tool |
| --- | --- | --- |
| Allowed publications | beehiiv-cli list-publications | list_publications |
| Newsletter posts | beehiiv-cli list-posts / get-post | list_posts / get_post |
| Draft and update | beehiiv-cli create-post / update-post | create_post / update_post |
| Subscriptions | beehiiv-cli list-subscriptions / create-subscription | list_subscriptions / create_subscription |
| Automations | beehiiv-cli list-automations | list_automations |
| Webhooks | beehiiv-cli create-webhook | create_webhook |
| Private accounts | beehiiv-cli list-accounts | list_accounts |
| Setup diagnosis | beehiiv-cli doctor | CLI utility |

## Contents

| Number | Section | What it covers |
| --- | --- | --- |
| 1 | [What you can ask it](#1-what-you-can-ask-it) | Practical prompts and coverage |
| 2 | [Quick install](#2-quick-install) | MCP, CLI and desktop |
| 3 | [Set up Beehiiv access](#3-set-up-beehiiv-access) | Credentials, OAuth and eligibility |
| 4 | [Connect your client](#4-connect-your-client) | Clients and OS routes |
| 5 | [Check it works](#5-check-it-works) | Doctor and first read |
| 6 | [Output, flags and exit codes](#6-output-flags-and-exit-codes) | Scripts, JSON and stable exit codes |
| 7 | [MCP or CLI and token cost](#7-mcp-or-cli-and-token-cost) | Actual measurement method |
| 8 | [Every tool and argument](#8-every-tool-and-argument) | All 117 tools and arguments |
| 9 | [Newsletter and subscription workflows](#9-newsletter-and-subscription-workflows) | Drafts, sending and audience work |
| 10 | [Pagination, exports and webhooks](#10-pagination-exports-and-webhooks) | Cursor/offset pagination and callbacks |
| 11 | [Several private accounts](#11-several-private-accounts) | Accounts versus publications |
| 12 | [Writing safely](#12-writing-safely) | Confirmation, read-only and retries |
| 13 | [How it works](#13-how-it-works) | Shared handlers and releases |
| 14 | [Your data](#14-your-data) | Hosts, private data and local files |
| 15 | [Environment variables](#15-environment-variables) | Credentials, safety and tuning |
| 16 | [Updates and removal](#16-updates-and-removal) | Updates and disconnecting |
| 17 | [Troubleshooting](#17-troubleshooting) | Symptoms and remedies |
| 18 | [API coverage and comparisons](#18-api-coverage-and-comparisons) | Official and community alternatives |
| 19 | [Versions](#19-versions) | Versions and legacy migration |
| 20 | [FAQ](#20-faq) | Accordion questions |


## 1. What you can ask it

- Show publications this credential can access.
- Summarize the latest five posts and their statistics.
- Find this subscriber in the intended publication.
- Draft the newsletter I requested and leave it unscheduled.
- Read the current subscriber list before the audience change I requested.
- Inspect referral rewards, segments, automations or private podcast subscriptions.

The snapshot contains 116 operations plus the local account helper: **117 tools, 70 reads and 47 confirmed writes**. Areas include publications, posts, subscriptions, automations, custom fields, segments, polls, referral programs, tiers, webhooks, ad offers, analytics, newsletter lists, exports and privacy requests. Plan and OAuth scope requirements apply to each operation.

**Checked:** build/typecheck, 29 fixture/shared-CLI checks and real local discovery. Live account sends, desktop GUI installation and fresh token/task measurements remain pending. API coverage does not imply full Beehiiv UI or official MCP feature parity.

## 2. Quick install

```bash
npm install -g @thenavidm/beehiiv-mcp-cli@latest
beehiiv-cli --version
beehiiv-cli
beehiiv-cli list-publications --help
beehiiv-cli schema create-post
beehiiv-cli login
```

Node 22 or newer is required for CLI/manual MCP installation. Discovery works before authentication. `login` explains private setup; it does not open a browser or save credentials. Download the desktop `.mcpb` from [GitHub Releases](https://github.com/thenavidm/beehiiv-mcp-cli/releases/latest). Full client/OS instructions are in [INSTALL.md](INSTALL.md).

## 3. Set up Beehiiv access

### API key for personal automation

1. Sign in to [Beehiiv](https://app.beehiiv.com).
2. Open **Settings > API** under **Workspace Settings**.
3. Choose **Create New API Key**. Name the integration and restrict its publications where appropriate.
4. Save the newly shown key in private local settings. It cannot be viewed again after leaving the page.
5. Set `BEEHIIV_API_KEY` in the process/client that launches the package, then run doctor and a read.

Use [the current key instructions](https://developers.beehiiv.com/welcome/create-an-api-key). Keys use Bearer authentication. Requests to publications outside a restricted key's scope return 404, and workspace-wide data deletion returns 403. A password is not an API key. The package does not load `.env` files automatically. GUI clients may not inherit a terminal environment.

### Your own OAuth integration

[Register a client through Beehiiv support](https://developers.beehiiv.com/oauth2). Use your own client ID, exact registered callback, a verified random state and PKCE for public clients. Authorization uses `https://app.beehiiv.com/oauth/authorize`; exchange/refresh uses `https://app.beehiiv.com/oauth/token` with `application/x-www-form-urlencoded`. Confidential clients also supply their private client secret.

Request only the documented scopes needed by the user. The default identify:read scope does not authorize all account reads/writes. The tool catalog records upstream endpoint scope labels. The test-send endpoint is labeled only `posts` upstream; confirm its required granted action through current Beehiiv permissions rather than treating that label as an OAuth scope to request. `identify_oauth_user` requires an OAuth session. This package does not provide a hosted callback, borrow another CLI's OAuth app or implement the initial browser consent flow.

Save the authorized token response and your app settings to a private regular JSON file outside the repo:

```json
{"access_token":"YOUR_ACCESS_TOKEN","refresh_token":"YOUR_REFRESH_TOKEN","client_id":"YOUR_OWN_APP_ID","client_secret":"YOUR_CONFIDENTIAL_APP_SECRET"}
```

Omit client_secret for a public client. Include the real issued `created_at`/`expires_in` metadata when available. Set `BEEHIIV_TOKENS_FILE` to the absolute path. Files must be regular, at most 64 KB; symlinks are refused. Protect POSIX files with mode 0600 and Windows folders with user-only ACLs. Refresh updates files atomically. Without a file, environment-based refreshed state lasts only in that process. OAuth access tokens take precedence over an API key.

### Rate limits and disconnecting

[Current API limits](https://developers.beehiiv.com/welcome/rate-limiting) are Free 30, Lite 180, Pro 500 and Enterprise 800 requests/minute. The wrapper defaults to conservative 2,000 ms pacing per account. Configure a supported interval when your plan and shared credential traffic justify it. Other processes also count; a response header after an idle period alone is not a complete plan eligibility check.

Revoke the API key or authorized app in Beehiiv, remove private client settings and reconnect. Uninstalling the package does not revoke credentials, delete remote subscribers or unschedule posts.

## 4. Connect your client

The full commands and private configurations are in [INSTALL.md](./INSTALL.md). Common registrations, after privately configuring account credentials:

```bash
claude mcp add --scope user beehiiv -- npx -y @thenavidm/beehiiv-mcp-cli@latest
claude mcp list
codex mcp add beehiiv -- npx -y @thenavidm/beehiiv-mcp-cli@latest
codex mcp list
```

Claude Desktop can install the `.mcpb` release or use manual JSON. Cursor, Windsurf and Gemini CLI use their user MCP settings; VS Code supports secure prompted inputs; Zed uses `context_servers`. Local Cline/Roo-style clients accept the same stdio command through their MCP setup UI. A local stdio process is not a public HTTP connector for ChatGPT on the web. Beehiiv's official hosted MCP at https://mcp.beehiiv.com/mcp is the appropriate remote option there.

Desktop settings accept a sensitive API key or a private OAuth token-file path. OAuth integrations require the documented scopes and identify_oauth_user requires OAuth. Custom extension availability depends on your installed host and organization policy.

### Let an agent guide setup

> Help me install Beehiiv MCP Server & CLI using INSTALL.md. Check Node and the binary, let me configure my account credentials privately, then run discovery and doctor --network. Do not send email or change subscribers during setup.

For shell agents, make [SKILL.md](./SKILL.md) available through the client's supported skills location. npm installation does not register the skill automatically.

## 5. Check it works

```bash
beehiiv-cli --version
beehiiv-cli doctor
beehiiv-cli doctor --network
beehiiv-cli list-publications --limit 1 --agent
beehiiv-cli list-accounts --agent
```

The local doctor checks configuration. The network doctor reads allowed publications without returning private account content. It does not send email, reactivate a subscription or change an account. An empty permitted publication list can be valid. A successful read does not establish every endpoint's plan or scope permissions. Read-only discovery exposes 70 tools.

## 6. Output, flags and exit codes

Tool names become dashed commands: `get_post` becomes `beehiiv-cli get-post`. Both exact underscore tool names and dashed forms are accepted. Argument names have dashed aliases: `post_id` is `--post-id`. Use help and `schema` to discover each operation's current input.

```bash
beehiiv-cli tools
beehiiv-cli get-post --help
beehiiv-cli schema get-post
beehiiv-cli get-post --publication-id pub_00000000-0000-0000-0000-000000000000 --post-id post_00000000-0000-0000-0000-000000000000 --agent
```

| Flag | Behavior |
| --- | --- |
| `--help` | Current schema-derived arguments and defaults |
| `--json` | Structured JSON output |
| `--compact` | Compact JSON on one line |
| `--agent` | JSON, compact, no prompts or color |
| `--select a,b.c` | Keep selected fields; dotted paths descend through objects and arrays |
| `--no-color` | No terminal colors |
| `--no-input` | No interactive prompts |
| `--yes` | House noninteractive flag; never substitutes for `--confirm` |
| `--confirm` | Explicit confirmation for the requested guarded operation |
| `--account NAME` | Select a configured local account on API tools |
| `--payload JSON` | Complete request body as one JSON object |
| `--payload-file PATH` | Complete request body from a local regular JSON file, at most 5 MB |

Body flags and `payload`/`payload_file` are mutually exclusive. Path and query flags remain separate. Objects take JSON; array flags repeat once per array item. Do not pass an array to a flag that expects a single item:

```bash
beehiiv-cli list-subscriptions --publication-id pub_00000000-0000-0000-0000-000000000000 --limit 10 --agent
beehiiv-cli create-post --publication-id pub_00000000-0000-0000-0000-000000000000 --payload-file /absolute/private/path/newsletter.json --confirm --agent
```

### Null and complete bodies

Use an actual JSON null in `payload` for nullable values. A shell `--field null` is a string. For example, a `headers` object can use null values to suppress inherited headers, per reviewed upstream prose. Discover the complete schema before editing nested fields.

| Code | Meaning |
| --- | --- |
| 0 | Success |
| 2 | Invalid arguments or refused write |
| 3 | Resource not found |
| 4 | Authentication or permission failure |
| 5 | Other API/transport failure |
| 7 | Rate limited |
| 10 | Missing or invalid private configuration |

Results go to stdout; errors are JSON on stderr. `--select` controls local result rendering, not the original API response. Arrays of objects use repeated JSON-item flags; `payload`/`payload_file` is easier for a complex post block tree.

## 7. MCP or CLI and token cost

Both surfaces call the same 117 tools through the MCP SDK's in-memory transport. The CLI does not implement a second HTTP client. A stdio client connects to beehiiv-mcp; scripts use beehiiv-cli; Claude Desktop uses the bundle. Browser-only remote clients need the official hosted MCP.

| Measurement | MCP | CLI |
| --- | --- | --- |
| Eager full-schema loading | Pending actual usage | Include skill discovery text |
| Default/deferred discovery | Pending actual usage | Include skill discovery text |
| One-time skill read | Selected schemas/results still count | Pending actual usage |
| Complete equivalent task | Include discovery, calls, reasoning, results and retries | Include help/schema, commands, reasoning, results and retries |

Fresh Claude Code standing-context and matched-task measurements are not available for this release yet. No estimate or borrowed efficiency percentage is substituted. Record client/model/package versions, date, settings and API usage. Use the same authorized publication, result fields and success criteria. Compare latest-post summaries across the official MCP/community CLI where supported; compare draft creation only on an eligible test account without sending email.

Deferred MCP tool search can reduce standing schema context. --select reduces result text. Neither is proof of lower full-task cost, and API plan/service costs remain separate.

## 8. Every tool and argument

The following tools and argument tables come from actual MCP discovery. API paths and OAuth scopes come from the pinned official snapshot. OAuth scopes apply to OAuth integrations; API keys instead use workspace/publication permissions. Body requirements are enforced at execution even when the complete body is supplied through `payload`.

| Tool | API | Mode | OAuth scope |
| --- | --- | --- | --- |
| `list_ad_network_offers` | `GET /v2/publications/{publicationId}/ad_network/offers` | Read | `posts:read` |
| `create_ad_network_offer` | `POST /v2/publications/{publicationId}/ad_network/offers` | Write, confirms | `posts:write` |
| `ad_network_offers_advertisements` | `GET /v2/publications/{publicationId}/ad_network/offers/{offerId}/advertisements` | Read | `posts:read` |
| `list_ad_network_reports` | `GET /v2/publications/{publicationId}/ad_network/reports` | Read | `posts:read` |
| `ad_network_reports_summary` | `GET /v2/publications/{publicationId}/ad_network/reports/summaries` | Read | `posts:read` |
| `ad_network_reports_account_summary` | `GET /v2/ad_network/reports/summaries` | Read | `posts:read` |
| `list_advertisement_opportunities` | `GET /v2/publications/{publicationId}/advertisement_opportunities` | Read | `posts:read` |
| `list_authors` | `GET /v2/publications/{publicationId}/authors` | Read | `Account permissions` |
| `get_author` | `GET /v2/publications/{publicationId}/authors/{authorId}` | Read | `Account permissions` |
| `add_subscriber_to_automation` | `POST /v2/publications/{publicationId}/automations/{automationId}/journeys` | Write, confirms | `automations:write` |
| `list_automation_journeys` | `GET /v2/publications/{publicationId}/automations/{automationId}/journeys` | Read | `automations:read` |
| `get_automation_journey` | `GET /v2/publications/{publicationId}/automations/{automationId}/journeys/{automationJourneyId}` | Read | `automations:read` |
| `list_automations` | `GET /v2/publications/{publicationId}/automations` | Read | `automations:read` |
| `get_automation` | `GET /v2/publications/{publicationId}/automations/{automationId}` | Read | `automations:read` |
| `automations_list_emails` | `GET /v2/publications/{publicationId}/automations/{automationId}/emails` | Read | `Account permissions` |
| `create_bulk_subscription` | `POST /v2/publications/{publicationId}/bulk_subscriptions` | Write, confirms | `subscriptions:write` |
| `list_bulk_subscription_updates` | `GET /v2/publications/{publicationId}/bulk_subscription_updates` | Read | `subscriptions:read` |
| `get_bulk_subscription_update` | `GET /v2/publications/{publicationId}/bulk_subscription_updates/{id}` | Read | `subscriptions:read` |
| `replace_bulk_subscription_update` | `PUT /v2/publications/{publicationId}/subscriptions/bulk_actions` | Write, confirms | `subscriptions:write` |
| `update_bulk_subscription_update` | `PATCH /v2/publications/{publicationId}/subscriptions/bulk_actions` | Write, confirms | `subscriptions:write` |
| `bulk_subscription_updates_put_status` | `PUT /v2/publications/{publicationId}/subscriptions` | Write, confirms | `subscriptions:write` |
| `bulk_subscription_updates_patch_status` | `PATCH /v2/publications/{publicationId}/subscriptions` | Write, confirms | `subscriptions:write` |
| `create_subscription` | `POST /v2/publications/{publicationId}/subscriptions` | Write, confirms | `subscriptions:write` |
| `list_subscriptions` | `GET /v2/publications/{publicationId}/subscriptions` | Read | `subscriptions:read` |
| `list_complimentary_access` | `GET /v2/publications/{publicationId}/complimentary_access` | Read | `complimentary_access:read` |
| `get_complimentary_access` | `GET /v2/publications/{publicationId}/complimentary_access/{complimentaryAccessId}` | Read | `complimentary_access:read` |
| `list_condition_sets` | `GET /v2/publications/{publicationId}/condition_sets` | Read | `condition_sets:read` |
| `get_condition_set` | `GET /v2/publications/{publicationId}/condition_sets/{conditionSetId}` | Read | `condition_sets:read` |
| `create_custom_field` | `POST /v2/publications/{publicationId}/custom_fields` | Write, confirms | `custom_fields:write` |
| `list_custom_fields` | `GET /v2/publications/{publicationId}/custom_fields` | Read | `custom_fields:read` |
| `get_custom_field` | `GET /v2/publications/{publicationId}/custom_fields/{id}` | Read | `custom_fields:read` |
| `update_custom_field` | `PUT /v2/publications/{publicationId}/custom_fields/{id}` | Write, confirms | `custom_fields:write` |
| `patch_custom_field` | `PATCH /v2/publications/{publicationId}/custom_fields/{id}` | Write, confirms | `custom_fields:write` |
| `delete_custom_field` | `DELETE /v2/publications/{publicationId}/custom_fields/{id}` | Write, confirms | `custom_fields:write` |
| `create_data_deletion` | `POST /v2/publications/{publicationId}/data_privacy/deletion_requests` | Write, confirms | `data_deletion:write` |
| `list_data_deletion` | `GET /v2/publications/{publicationId}/data_privacy/deletion_requests` | Read | `data_deletion:read` |
| `get_data_deletion` | `GET /v2/publications/{publicationId}/data_privacy/deletion_requests/{id}` | Read | `data_deletion:read` |
| `list_engagements` | `GET /v2/publications/{publicationId}/engagements` | Read | `publications:read` |
| `list_exports` | `GET /v2/publications/{publicationId}/exports/subscriptions` | Read | `subscriptions:read` |
| `create_export` | `POST /v2/publications/{publicationId}/exports/subscriptions` | Write, confirms | `subscriptions:write` |
| `get_export` | `GET /v2/publications/{publicationId}/exports/subscriptions/{id}` | Read | `subscriptions:read` |
| `list_newsletter_lists` | `GET /v2/publications/{publicationId}/newsletter_lists` | Read | `newsletter_lists:read` |
| `create_newsletter_list` | `POST /v2/publications/{publicationId}/newsletter_lists` | Write, confirms | `newsletter_lists:write` |
| `get_newsletter_list` | `GET /v2/publications/{publicationId}/newsletter_lists/{newsletterListId}` | Read | `newsletter_lists:read` |
| `update_newsletter_list` | `PATCH /v2/publications/{publicationId}/newsletter_lists/{newsletterListId}` | Write, confirms | `newsletter_lists:write` |
| `delete_newsletter_list` | `DELETE /v2/publications/{publicationId}/newsletter_lists/{newsletterListId}` | Write, confirms | `newsletter_lists:write` |
| `create_newsletter_list_subscription` | `POST /v2/publications/{publicationId}/newsletter_lists/{newsletterListId}/subscriptions` | Write, confirms | `newsletter_lists:write` |
| `list_newsletter_list_subscriptions` | `GET /v2/publications/{publicationId}/newsletter_lists/{newsletterListId}/subscriptions` | Read | `newsletter_lists:read` |
| `get_newsletter_list_subscription` | `GET /v2/publications/{publicationId}/newsletter_lists/{newsletterListId}/subscriptions/{newsletterListSubscriptionId}` | Read | `newsletter_lists:read` |
| `update_newsletter_list_subscription` | `PATCH /v2/publications/{publicationId}/newsletter_lists/{newsletterListId}/subscriptions/{newsletterListSubscriptionId}` | Write, confirms | `newsletter_lists:write` |
| `newsletter_list_subscriptions_update_by_subscription_id` | `PATCH /v2/publications/{publicationId}/newsletter_lists/{newsletterListId}/subscriptions/by_subscription_id/{subscriptionId}` | Write, confirms | `newsletter_lists:write` |
| `newsletter_list_subscriptions_create_import` | `POST /v2/publications/{publicationId}/newsletter_lists/{newsletterListId}/subscriptions/import` | Write, confirms | `newsletter_lists:write` |
| `newsletter_list_subscriptions_get_import` | `GET /v2/publications/{publicationId}/newsletter_lists/{newsletterListId}/subscriptions/import` | Read | `newsletter_lists:read` |
| `identify_oauth_user` | `GET /v2/users/identify` | Read | `identify:read` |
| `podcasts_list_podcasts` | `GET /v2/publications/{publicationId}/podcasts` | Read | `podcasts:read` |
| `podcasts_get_podcast` | `GET /v2/publications/{publicationId}/podcasts/{podcastShowId}` | Read | `podcasts:read` |
| `podcasts_get_private_feed` | `GET /v2/publications/{publicationId}/podcasts/{podcastShowId}/private_feeds/{subscriptionId}` | Read | `podcasts:read` |
| `podcasts_get_private_feed_by_email` | `GET /v2/publications/{publicationId}/podcasts/{podcastShowId}/private_feeds/by_email/{email}` | Read | `podcasts:read` |
| `podcasts_send_private_feed_email` | `POST /v2/publications/{publicationId}/podcasts/{podcastShowId}/private_feeds/{subscriptionId}/emails` | Write, confirms | `podcasts:write` |
| `podcasts_send_private_feed_email_by_email` | `POST /v2/publications/{publicationId}/podcasts/{podcastShowId}/private_feeds/by_email/{email}/emails` | Write, confirms | `podcasts:write` |
| `podcasts_list_episodes` | `GET /v2/publications/{publicationId}/podcasts/{podcastShowId}/episodes` | Read | `podcasts:read` |
| `podcasts_get_episode` | `GET /v2/publications/{publicationId}/podcasts/{podcastShowId}/episodes/{podcastEpisodeId}` | Read | `podcasts:read` |
| `list_polls` | `GET /v2/publications/{publicationId}/polls` | Read | `polls:read` |
| `get_poll` | `GET /v2/publications/{publicationId}/polls/{pollId}` | Read | `polls:read` |
| `polls_list_responses` | `GET /v2/publications/{publicationId}/polls/{pollId}/responses` | Read | `polls:read` |
| `create_post` | `POST /v2/publications/{publicationId}/posts` | Write, confirms | `posts:write` |
| `list_posts` | `GET /v2/publications/{publicationId}/posts` | Read | `posts:read` |
| `update_post` | `PATCH /v2/publications/{publicationId}/posts/{postId}` | Write, confirms | `posts:write` |
| `get_post` | `GET /v2/publications/{publicationId}/posts/{postId}` | Read | `posts:read` |
| `delete_post` | `DELETE /v2/publications/{publicationId}/posts/{postId}` | Write, confirms | `posts:write` |
| `get_post_aggregate_stats` | `GET /v2/publications/{publicationId}/posts/aggregate_stats` | Read | `posts:read` |
| `send_post_test` | `POST /v2/publications/{publicationId}/posts/{postId}/test_sends` | Write, confirms | `posts` |
| `preview_post` | `GET /v2/publications/{publicationId}/posts/{postId}/preview` | Read | `posts:read` |
| `list_post_templates` | `GET /v2/publications/{publicationId}/post_templates` | Read | `posts:read` |
| `create_post_template` | `POST /v2/publications/{publicationId}/post_templates` | Write, confirms | `posts:write` |
| `post_templates_workspace_index` | `GET /v2/workspaces/post_templates` | Read | `posts:read` |
| `post_templates_workspace_create` | `POST /v2/workspaces/post_templates` | Write, confirms | `posts:write` |
| `post_templates_workspace_show` | `GET /v2/workspaces/post_templates/{postTemplateId}` | Read | `posts:read` |
| `get_post_template` | `GET /v2/publications/{publicationId}/post_templates/{postTemplateId}` | Read | `posts:read` |
| `list_publication_fields` | `GET /v2/workspaces/publication_fields` | Read | `publication_fields:read` |
| `create_publication_field` | `POST /v2/workspaces/publication_fields` | Write, confirms | `publication_fields:write` |
| `get_publication_field` | `GET /v2/workspaces/publication_fields/{publicationFieldId}` | Read | `publication_fields:read` |
| `update_publication_field` | `PATCH /v2/workspaces/publication_fields/{publicationFieldId}` | Write, confirms | `publication_fields:write` |
| `publication_fields_values_index` | `GET /v2/workspaces/publication_field_values` | Read | `publication_fields:read` |
| `publication_fields_values_update` | `PATCH /v2/workspaces/publication_fields/{publicationFieldId}/values` | Write, confirms | `publication_fields:write` |
| `list_publications` | `GET /v2/publications` | Read | `publications:read` |
| `get_publication` | `GET /v2/publications/{publicationId}` | Read | `publications:read` |
| `get_referral_program` | `GET /v2/publications/{publicationId}/referral_program` | Read | `referral_program:read` |
| `create_segment` | `POST /v2/publications/{publicationId}/segments` | Write, confirms | `Account permissions` |
| `list_segments` | `GET /v2/publications/{publicationId}/segments` | Read | `segments:read` |
| `get_segment` | `GET /v2/publications/{publicationId}/segments/{segmentId}` | Read | `segments:read` |
| `delete_segment` | `DELETE /v2/publications/{publicationId}/segments/{segmentId}` | Write, confirms | `segments:write` |
| `segments_recalculate` | `PUT /v2/publications/{publicationId}/segments/{segmentId}/recalculate` | Write, confirms | `segments:write` |
| `get_segment_subscribers` | `GET /v2/publications/{publicationId}/segments/{segmentId}/members` | Read | `segments:read` |
| `segments_expand_results` | `GET /v2/publications/{publicationId}/segments/{segmentId}/results` | Read | `segments:read` |
| `get_subscription_by_email` | `GET /v2/publications/{publicationId}/subscriptions/by_email/{email}` | Read | `subscriptions:read` |
| `update_subscription_by_email` | `PUT /v2/publications/{publicationId}/subscriptions/by_email/{email}` | Write, confirms | `subscriptions:write` |
| `get_subscription` | `GET /v2/publications/{publicationId}/subscriptions/{subscriptionId}` | Read | `subscriptions:read` |
| `update_subscription` | `PUT /v2/publications/{publicationId}/subscriptions/{subscriptionId}` | Write, confirms | `subscriptions:write` |
| `patch_subscription` | `PATCH /v2/publications/{publicationId}/subscriptions/{subscriptionId}` | Write, confirms | `subscriptions:write` |
| `delete_subscription` | `DELETE /v2/publications/{publicationId}/subscriptions/{subscriptionId}` | Write, confirms | `subscriptions:write` |
| `add_tags` | `POST /v2/publications/{publicationId}/subscriptions/{subscriptionId}/tags` | Write, confirms | `subscriptions:write` |
| `remove_tag` | `DELETE /v2/publications/{publicationId}/subscriptions/{subscriptionId}/tags` | Write, confirms | `subscriptions:write` |
| `create_tier` | `POST /v2/publications/{publicationId}/tiers` | Write, confirms | `tiers:write` |
| `list_tiers` | `GET /v2/publications/{publicationId}/tiers` | Read | `tiers:read` |
| `get_tier` | `GET /v2/publications/{publicationId}/tiers/{tierId}` | Read | `tiers:read` |
| `replace_tier` | `PUT /v2/publications/{publicationId}/tiers/{tierId}` | Write, confirms | `tiers:write` |
| `update_tier` | `PATCH /v2/publications/{publicationId}/tiers/{tierId}` | Write, confirms | `tiers:write` |
| `create_webhook` | `POST /v2/publications/{publicationId}/webhooks` | Write, confirms | `webhooks:write` |
| `list_webhooks` | `GET /v2/publications/{publicationId}/webhooks` | Read | `webhooks:read` |
| `get_webhook` | `GET /v2/publications/{publicationId}/webhooks/{endpointId}` | Read | `webhooks:read` |
| `update_webhook` | `PATCH /v2/publications/{publicationId}/webhooks/{endpointId}` | Write, confirms | `webhooks:write` |
| `delete_webhook` | `DELETE /v2/publications/{publicationId}/webhooks/{endpointId}` | Write, confirms | `webhooks:write` |
| `workspaces_identify` | `GET /v2/workspaces/identify` | Read | `identify:read` |
| `workspaces_permissions` | `GET /v2/workspaces/permissions` | Read | `identify:read` |
| `workspaces_publications_by_subscription_email` | `GET /v2/workspaces/publications/by_subscription_email/{email}` | Read | `publications:read` |
| `list_accounts` | Local settings | Read | Not applicable |

### Shared input rules

All API tools accept `account` for a private named account. Every write also accepts `confirm`, which must be true. Body tools accept either their individual body arguments, `payload` containing the whole JSON object, or `payload_file` pointing to a regular local JSON file up to 5 MB. These body routes are mutually exclusive; path/query inputs stay separate. `schema <command>` returns every nested property and validation rule.

Only tools whose native schema contains `cursor` expose `all_pages` and `max_items`. Do not invent cursor input on offset-only endpoints. Tool and argument underscores have dashed CLI aliases.

### Complete arguments

#### list_ad_network_offers

Get ad offers. Reads account data. OAuth integrations require posts:read.

```bash
beehiiv-cli list-ad-network-offers --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |

#### create_ad_network_offer

Accept ad offer. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require posts:write.

```bash
beehiiv-cli create-ad-network-offer --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `offer_id` | string | Body | The ID of the ad offer to accept. |
| `advertisement_id` | string | Body | The ID of the advertisement creative to use. |
| `post_id` | string | Body | The ID of the post where the advertisement should be inserted. |
| `custom_intro` | string | No | Plain text displayed before the advertisement. Maximum 200 characters and cannot contain URLs. Available only when custom ad introductions are enabled for the publication. |

#### ad_network_offers_advertisements

Get ad offer advertisements. Reads account data. OAuth integrations require posts:read.

```bash
beehiiv-cli ad-network-offers-advertisements --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `offer_id` | string | Yes | The ID of the ad offer. |

#### list_ad_network_reports

Get ad network reports. Reads account data. OAuth integrations require posts:read.

```bash
beehiiv-cli list-ad-network-reports --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object. Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `limit` | integer | No | A limit between 1 and 100. Defaults to 10. Minimum: `1`. Maximum: `100`. |
| `page` | integer | No | The page of reports to return. Defaults to 1. Minimum: `1`. Maximum: `100`. |
| `start_date` | string | No | Include reports for advertisements sent on or after this date in `YYYY-MM-DD` format. Format: `date`. |
| `end_date` | string | No | Include reports for advertisements sent on or before this date in `YYYY-MM-DD` format. Format: `date`. |

#### ad_network_reports_summary

Get ad network report summary. Reads account data. OAuth integrations require posts:read.

```bash
beehiiv-cli ad-network-reports-summary --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object. Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `start_date` | string | No | Include reports for advertisements sent on or after this date in `YYYY-MM-DD` format. Format: `date`. |
| `end_date` | string | No | Include reports for advertisements sent on or before this date in `YYYY-MM-DD` format. Format: `date`. |

#### ad_network_reports_account_summary

Get account ad network report summary. Reads account data. OAuth integrations require posts:read.

```bash
beehiiv-cli ad-network-reports-account-summary --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `start_date` | string | No | Include reports for advertisements sent on or after this date in `YYYY-MM-DD` format. Format: `date`. |
| `end_date` | string | No | Include reports for advertisements sent on or before this date in `YYYY-MM-DD` format. Format: `date`. |

#### list_advertisement_opportunities

Get advertisement opportunities. Reads account data. OAuth integrations require posts:read.

```bash
beehiiv-cli list-advertisement-opportunities --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |

#### list_authors

List authors. Reads account data.

```bash
beehiiv-cli list-authors --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `page` | integer | No | Pagination returns the results in pages. Each page contains the number of results specified by the `limit` (default: 10). If not specified, results 1-10 from page 1 will be returned. Minimum: `1`. Maximum: `100`. |
| `name` | string | No | Optionally filter authors by full name or first name (case-insensitive). |

#### get_author

Get author. Reads account data.

```bash
beehiiv-cli get-author --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `author_id` | string | Yes | The author identifier. This accepts a prefixed author ID, full name, or first name. |

#### add_subscriber_to_automation

Add subscription to an automation. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require automations:write.

```bash
beehiiv-cli add-subscriber-to-automation --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `automation_id` | string | Yes | The prefixed ID of the automation object Pattern: `^(aut_[0-9a-fA-F\-]+)$`. |
| `email` | string | No | The email address associated with the subscription. |
| `subscription_id` | string | No | The prefixed ID of the subscription. Pattern: `^(sub_[0-9a-fA-F\-]+)$`. |
| `double_opt_override` | string | No | Override the publication's default double opt-in settings for this subscription. Possible values are: - "on" : The subscriber will receive a double opt-in confirmation email and will need to confirm their subscription prior to being marked as active. - "off" : The subscriber will be marked as active immediately and will not receive a double opt-in confirmation email. - "not_set" : The publication's default double opt-in settings will be applied to this subscription. |

#### list_automation_journeys

List automation journeys. Reads account data. OAuth integrations require automations:read.

```bash
beehiiv-cli list-automation-journeys --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `automation_id` | string | Yes | The prefixed ID of the automation object Pattern: `^(aut_[0-9a-fA-F\-]+)$`. |
| `status` | string | No | Optionally filter the results by the automation journey's status. Default: `all`. Values: `in_progress`, `completed`, `exited_early`, `all`. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `page` | integer | No | Pagination returns the results in pages. Each page contains the number of results specified by the `limit` (default: 10). Minimum: `1`. Maximum: `100`. |

#### get_automation_journey

Get automation journey. Reads account data. OAuth integrations require automations:read.

```bash
beehiiv-cli get-automation-journey --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `automation_id` | string | Yes | The prefixed ID of the automation object Pattern: `^(aut_[0-9a-fA-F\-]+)$`. |
| `automation_journey_id` | string | Yes | The prefixed automation journey id Pattern: `^(aj_[0-9a-fA-F\-]+)$`. |

#### list_automations

List automations. Reads account data. OAuth integrations require automations:read.

```bash
beehiiv-cli list-automations --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `expand` | string | No | Optional list of expandable objects. Values: `stats`. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `page` | integer | No | Pagination returns the results in pages. Each page contains the number of results specified by the `limit` (default: 10). If not specified, results 1-10 from page 1 will be returned. Minimum: `1`. Maximum: `100`. |

#### get_automation

Get automation. Reads account data. OAuth integrations require automations:read.

```bash
beehiiv-cli get-automation --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `automation_id` | string | Yes | The prefixed ID of the automation object Pattern: `^(aut_[0-9a-fA-F\-]+)$`. |
| `expand` | string | No | Optional list of expandable objects. Values: `stats`. |

#### automations_list_emails

List automation emails. Reads account data.

```bash
beehiiv-cli automations-list-emails --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `automation_id` | string | Yes | The prefixed ID of the automation object Pattern: `^(aut_[0-9a-fA-F\-]+)$`. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `cursor` | string | No | **Cursor-based pagination (recommended)**: Use this opaque cursor token to fetch the next page of results. Obtain it from the `next_cursor` field of a previous response. |
| `page` | integer | No | **Deprecated**: Use `cursor` instead. Pagination returns the results in pages. Limited to 100 pages maximum. Minimum: `1`. Maximum: `100`. |
| `all_pages` | boolean | No | Read successive cursor pages, bounded by max_items (default 1000). |
| `max_items` | integer | No | Maximum records when all_pages=true. Returns continuation cursor and truncation. Minimum: `1`. Maximum: `10000`. |

#### create_bulk_subscription

Bulk create subscription. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require subscriptions:write.

```bash
beehiiv-cli create-bulk-subscription --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `subscriptions` | array | Body | Subscriptions (body input). Array items: object. |

#### list_bulk_subscription_updates

List subscription updates. Reads account data. OAuth integrations require subscriptions:read.

```bash
beehiiv-cli list-bulk-subscription-updates --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |

#### get_bulk_subscription_update

Get subscription update. Reads account data. OAuth integrations require subscriptions:read.

```bash
beehiiv-cli get-bulk-subscription-update --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `bulk_subscription_update_id` | string | Yes | The ID of the Subscription Update object |

#### replace_bulk_subscription_update

Update subscriptions. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require subscriptions:write.

```bash
beehiiv-cli replace-bulk-subscription-update --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `subscriptions` | array | No | An array of objects representing the subscriptions to be updated (max 1000). Array items: object. |

#### update_bulk_subscription_update

Update subscriptions. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require subscriptions:write.

```bash
beehiiv-cli update-bulk-subscription-update --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `subscriptions` | array | No | An array of objects representing the subscriptions to be updated (max 1000). Array items: object. |

#### bulk_subscription_updates_put_status

Update subscriptions' status. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require subscriptions:write.

```bash
beehiiv-cli bulk-subscription-updates-put-status --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `subscription_ids` | array | Body | An array of subscription IDs to be updated Array items: string. |
| `new_status` | string | Body | The new status to set for the subscriptions |

#### bulk_subscription_updates_patch_status

Update subscriptions' status. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require subscriptions:write.

```bash
beehiiv-cli bulk-subscription-updates-patch-status --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `subscription_ids` | array | Body | An array of subscription IDs to be updated Array items: string. |
| `new_status` | string | Body | The new status to set for the subscriptions |

#### create_subscription

Create subscription. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require subscriptions:write.

```bash
beehiiv-cli create-subscription --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `email` | string | Body | The email address of the subscription. |
| `reactivate_existing` | boolean | No | Whether or not to reactivate the subscription if they have already unsubscribed. This option should be used only if the subscriber is knowingly resubscribing. Default: `false`. |
| `send_welcome_email` | boolean | No | Send welcome email (body input). Default: `false`. |
| `utm_source` | string | No | The source of the subscription. |
| `utm_medium` | string | No | The medium of the subscription |
| `utm_campaign` | string | No | The acquisition campaign of the subscription |
| `utm_term` | string | No | The acquisition term; typically the keyword or search term |
| `utm_content` | string | No | The acquisition content; typically used for A/B testing or ad variations |
| `referring_site` | string | No | The website that the subscriber was referred from |
| `referral_code` | string | No | This should be a subscribers referral_code. This gives referral credit for the new subscription. |
| `custom_fields` | array | No | The custom fields must already exist for the publication. Any new custom fields here will be discarded. Array items: object. |
| `double_opt_override` | string | No | Override the publication's default double opt-in settings for this subscription. Possible values are: - "on" : The subscriber will receive a double opt-in confirmation email and will need to confirm their subscription prior to being marked as active. - "off" : The subscriber will be marked as active immediately and will not receive a double opt-in confirmation email. - "not_set" : The publication's default double opt-in settings will be applied to this subscription. |
| `tier` | string | No | The tier for this subscription. Values: `free`, `premium`. |
| `premium_tiers` | array | No | An array of premium tier names to assign to this subscription. When provided, the subscription will be assigned to premium tiers matching these names. Can be combined with `premium_tier_ids` to include tiers from both (duplicates are removed). Takes precedence over the `tier` parameter. Array items: string. |
| `premium_tier_ids` | array | No | An array of premium tier IDs to assign to this subscription. When provided, the subscription will be assigned to these specific premium tiers. Can be combined with `premium_tiers` to include tiers from both (duplicates are removed). Takes precedence over the `tier` parameter. Array items: string. |
| `stripe_customer_id` | string | No | The Stripe customer ID for this subscription. Pattern: `^(cus_[0-9a-zA-Z]+)?$`. |
| `automation_ids` | array | No | Enroll the subscriber into automations after their subscription has been created. Requires the automations to have an active *Add by API* trigger. Array items: string. |
| `newsletter_list_ids` | array | No | An array of newsletter list prefixed IDs to subscribe the new subscription to. The newsletter lists must belong to the same publication. Array items: string. |
| `skip_newsletter_list_auto_subscribe` | boolean | No | When true, the subscriber will not be auto-subscribed to newsletter lists configured with auto-subscribe. Defaults to false. |
| `complimentary_gift_id` | string | No | The prefixed ID of a complimentary access object to apply to this subscription. The complimentary access must belong to the same publication. Pattern: `^(comp_access_[0-9a-fA-F\-]+)$`. |

#### list_subscriptions

List subscriptions. Reads account data. OAuth integrations require subscriptions:read.

```bash
beehiiv-cli list-subscriptions --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `expand` | string | No | Optional list of expandable objects. `subscription_premium_tiers ` - Returns an array of tiers the subscription is associated with. `referrals` - Returns an array of subscriptions with limited data - `id`, `email`, and `status`. These are the subscriptions that were referred by this subscription. `stats` - Returns statistics about the subscription(s). `custom_fields` - Returns an array of custom field values that have been set on the subscription.  `newsletter_lists` - Returns an array of newsletter list prefixed IDs the subscription is actively subscribed to. Values: `stats`, `custom_fields`, `referrals`, `newsletter_lists`. |
| `status` | string | No | Optionally filter the results by a status Default: `all`. Values: `validating`, `invalid`, `pending`, `active`, `inactive`, `all`. |
| `tier` | string | No | Optionally filter the results by a their tier Default: `all`. Values: `free`, `premium`, `all`. |
| `premium_tiers` | string | No | Optionally filter the results by one or multiple premium tiers |
| `premium_tier_ids` | string | No | Optionally filter the results by one or multiple premium tier ids |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `cursor` | string | No | **Cursor-based pagination (recommended)**: Use this opaque cursor token to fetch the next page of results. When provided, pagination will use cursor-based method which is more efficient and consistent than offset-based pagination. See the [Pagination Guide](/welcome/pagination) for more details. |
| `page` | integer | No | **Offset-based pagination (deprecated)**: Page number for offset-based pagination. This method is deprecated and limited to 100 pages maximum. Please migrate to cursor-based pagination using the `cursor` parameter. If not specified, results 1-10 from page 1 will be returned. See the [Pagination Guide](/welcome/pagination) for migration guidance. Minimum: `1`. Maximum: `100`. |
| `email` | string | No | Optional email address to find a subscription. This param must be an exact match and is case insensitive. |
| `order_by` | string | No | The field that the results are sorted by. Defaults to created  `created` - The time in which the subscription was first created. Default: `created`. Values: `created`. |
| `direction` | string | No | The direction that the results are sorted in. Defaults to asc  `asc` - Ascending, sorts from smallest to largest.  `desc` - Descending, sorts from largest to smallest. Default: `asc`. Values: `asc`, `desc`. |
| `creation_date` | string | No | Optional date entry (in the format YYYY/MM/DD) that filters returned subscriptions by their creation date. |
| `all_pages` | boolean | No | Read successive cursor pages, bounded by max_items (default 1000). |
| `max_items` | integer | No | Maximum records when all_pages=true. Returns continuation cursor and truncation. Minimum: `1`. Maximum: `10000`. |

#### list_complimentary_access

List complimentary access. Reads account data. OAuth integrations require complimentary_access:read.

```bash
beehiiv-cli list-complimentary-access --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `expand` | string | No | Optional list of expandable objects. `tier` - Returns the full tier object associated with this complimentary access. `stats` - Returns granted subscription counts. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `cursor` | string | No | Use this opaque cursor token to fetch the next page of results. Obtain the value from `next_cursor` in a previous response. |
| `all_pages` | boolean | No | Read successive cursor pages, bounded by max_items (default 1000). |
| `max_items` | integer | No | Maximum records when all_pages=true. Returns continuation cursor and truncation. Minimum: `1`. Maximum: `10000`. |

#### get_complimentary_access

Get complimentary access. Reads account data. OAuth integrations require complimentary_access:read.

```bash
beehiiv-cli get-complimentary-acces --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `complimentary_access_id` | string | Yes | The prefixed ID of the complimentary access object Pattern: `^(comp_access_[0-9a-fA-F\-]+)$`. |
| `expand` | string | No | Optional list of expandable objects. `tier` - Returns the full tier object associated with this complimentary access. |

#### list_condition_sets

List condition sets. Reads account data. OAuth integrations require condition_sets:read.

```bash
beehiiv-cli list-condition-sets --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `cursor` | string | No | **Cursor-based pagination (recommended)**: Use this opaque cursor token to fetch the next page of results. When provided, pagination will use cursor-based method which is more efficient and consistent than offset-based pagination. |
| `page` | integer | No | **Offset-based pagination (deprecated)**: Page number for offset-based pagination. Please migrate to cursor-based pagination using the `cursor` parameter. If not specified, results 1-10 from page 1 will be returned. Minimum: `1`. Maximum: `100`. |
| `purpose` | string | No | Filter condition sets by purpose. When not specified, all active condition sets are returned. Values: `dynamic_content`. |
| `all_pages` | boolean | No | Read successive cursor pages, bounded by max_items (default 1000). |
| `max_items` | integer | No | Maximum records when all_pages=true. Returns continuation cursor and truncation. Minimum: `1`. Maximum: `10000`. |

#### get_condition_set

Get condition set. Reads account data. OAuth integrations require condition_sets:read.

```bash
beehiiv-cli get-condition-set --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `condition_set_id` | string | Yes | The UUID of the condition set object |
| `expand` | array | No | Optionally expand the response to include additional data.  `stats` - Calculates and returns the active subscriber count for this condition set synchronously. Array items: string. |

#### create_custom_field

Create custom field. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require custom_fields:write.

```bash
beehiiv-cli create-custom-field --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `kind` | string | Body | The type of value being stored in the custom field. Values: `string`, `integer`, `boolean`, `date`, `datetime`, `list`, `double`. |
| `display` | string | Body | Display (body input). |

#### list_custom_fields

List custom fields. Reads account data. OAuth integrations require custom_fields:read.

```bash
beehiiv-cli list-custom-fields --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |

#### get_custom_field

Get custom field. Reads account data. OAuth integrations require custom_fields:read.

```bash
beehiiv-cli get-custom-field --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `custom_field_id` | string | Yes | The ID of the Custom Fields object |

#### update_custom_field

Update custom field. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require custom_fields:write.

```bash
beehiiv-cli update-custom-field --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `custom_field_id` | string | Yes | The ID of the Custom Fields object |
| `display` | string | No | Display (body input). |

#### patch_custom_field

Update custom field. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require custom_fields:write.

```bash
beehiiv-cli patch-custom-field --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `custom_field_id` | string | Yes | The ID of the Custom Fields object |
| `display` | string | No | Display (body input). |

#### delete_custom_field

Delete custom field. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require custom_fields:write.

```bash
beehiiv-cli delete-custom-field --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `custom_field_id` | string | Yes | The ID of the Custom Fields object |

#### create_data_deletion

Create data deletion request. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require data_deletion:write.

```bash
beehiiv-cli create-data-deletion --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `email` | string | Body | The email address of the subscriber to delete. |

#### list_data_deletion

List data deletion requests. Reads account data. OAuth integrations require data_deletion:read.

```bash
beehiiv-cli list-data-deletion --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |

#### get_data_deletion

Get data deletion request. Reads account data. OAuth integrations require data_deletion:read.

```bash
beehiiv-cli get-data-deletion --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `data_deletion_id` | string | Yes | The ID of the data deletion request |

#### list_engagements

Get publication engagements. Reads account data. OAuth integrations require publications:read.

```bash
beehiiv-cli list-engagements --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication. Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `start_date` | string | No | The starting date for the engagement metrics in `YYYY-MM-DD` format. Defaults to 1 day ago if not provided. Format: `date`. |
| `number_of_days` | integer | No | The number of days to return engagement metrics for, starting from `start_date`. Must be between 1 and 31. Defaults to `1` if not provided. Minimum: `1`. Maximum: `31`. |
| `granularity` | string | No | The granularity at which to report the engagement metrics. Defaults to `day` if not provided. Values: `day`, `week`, `month`. |
| `email_type` | string | No | Filter engagement metrics by email type. If omitted, all email engagement is included.  `post`: Only post emails.  `message`: Only automated and system-generated emails. Values: `all`, `post`, `message`. |
| `direction` | string | No | The direction that the results are sorted in. Defaults to `asc`.  `asc`: Oldest to newest  `desc`: Newest to oldest Default: `asc`. Values: `asc`, `desc`. |

#### list_exports

List subscription exports. Reads account data. OAuth integrations require subscriptions:read.

```bash
beehiiv-cli list-exports --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `cursor` | string | No | **Cursor-based pagination (recommended)**: Use this opaque cursor token to fetch the next page of results. When provided, pagination will use cursor-based method which is more efficient and consistent than offset-based pagination. See the [Pagination Guide](/welcome/pagination) for more details. |
| `page` | integer | No | **Offset-based pagination (deprecated)**: Page number for offset-based pagination. This method is deprecated and limited to 100 pages maximum. Please migrate to cursor-based pagination using the `cursor` parameter. If not specified, results 1-10 from page 1 will be returned. See the [Pagination Guide](/welcome/pagination) for migration guidance. Minimum: `1`. Maximum: `100`. |
| `all_pages` | boolean | No | Read successive cursor pages, bounded by max_items (default 1000). |
| `max_items` | integer | No | Maximum records when all_pages=true. Returns continuation cursor and truncation. Minimum: `1`. Maximum: `10000`. |

#### create_export

Create subscription export. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require subscriptions:write.

```bash
beehiiv-cli create-export --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `variant` | string | Body | Which column set the export uses Values: `full`, `basic`. |
| `segment_id` | string | No | Optional prefixed ID of a segment to scope the export to. When omitted the export covers the whole publication. A segment that does not exist, or belongs to another publication, answers 404. Pattern: `^(seg_[0-9a-fA-F\-]+)$`. |

#### get_export

Get subscription export. Reads account data. OAuth integrations require subscriptions:read.

```bash
beehiiv-cli get-export --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `export_id` | string | Yes | The prefixed ID of the Subscription Export object Pattern: `^(export_[0-9a-fA-F\-]+)$`. |

#### list_newsletter_lists

List newsletter lists. Reads account data. OAuth integrations require newsletter_lists:read.

```bash
beehiiv-cli list-newsletter-lists --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `page` | integer | No | Pagination returns the results in pages. Each page contains the number of results specified by the `limit` (default: 10). If not specified, results 1-10 from page 1 will be returned. Minimum: `1`. Maximum: `100`. |
| `direction` | string | No | The direction that the results are sorted in. Defaults to asc  `asc` - Ascending, sorts from smallest to largest.  `desc` - Descending, sorts from largest to smallest. Default: `asc`. Values: `asc`, `desc`. |

#### create_newsletter_list

Create newsletter list. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require newsletter_lists:write.

```bash
beehiiv-cli create-newsletter-list --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `name` | string | Body | The name of the newsletter list. |
| `description` | string | No | A description of the newsletter list. |
| `slug` | string | No | A unique slug for the newsletter list. Auto-generated from the name if not provided. |
| `auto_subscribe` | boolean | No | Whether new subscribers are automatically subscribed to this list. |
| `show_in_preference_center` | boolean | No | Whether the list appears on the subscriber Manage Preferences page, where subscribers can opt in to or out of it. Defaults to `false`. |
| `email_settings` | object | No | The sending identity for posts sent to this list. Any field omitted is inherited from the publication. |
| `headers` | object | No | Custom email headers for posts sent to this list. Merges with publication headers at send time, with this list's values winning on a key collision. Set a value to `null` to suppress a header inherited from the publication. System-managed headers (e.g. List-Unsubscribe, X-SMTPAPI) cannot be overridden. |
| `utm_source` | string | No | The utm_source appended to links in posts sent to this list. |
| `utm_medium` | string | No | The utm_medium appended to links in posts sent to this list. |
| `utm_campaign` | string | No | The utm_campaign appended to links in posts sent to this list. |
| `utm_params_enabled` | boolean | No | Whether UTM parameters are appended to links in posts sent to this list. Omit to inherit from the publication. |

#### get_newsletter_list

Get newsletter list. Reads account data. OAuth integrations require newsletter_lists:read.

```bash
beehiiv-cli get-newsletter-list --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `newsletter_list_id` | string | Yes | The prefixed ID of the newsletter list object Pattern: `^(nl_list_[0-9a-fA-F\-]+)$`. |

#### update_newsletter_list

Update newsletter list. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require newsletter_lists:write.

```bash
beehiiv-cli update-newsletter-list --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `newsletter_list_id` | string | Yes | The prefixed ID of the newsletter list object Pattern: `^(nl_list_[0-9a-fA-F\-]+)$`. |
| `name` | string | No | The name of the newsletter list. |
| `description` | string | No | A description of the newsletter list. |
| `slug` | string | No | A unique slug for the newsletter list. |
| `auto_subscribe` | boolean | No | Whether new subscribers are automatically subscribed to this list. |
| `show_in_preference_center` | boolean | No | Whether the list appears on the subscriber Manage Preferences page, where subscribers can opt in to or out of it. Archived lists cannot be shown; archiving a list hides it. |
| `status` | string | No | The status of the newsletter list. Valid values are `active` and `archived`. Setting `draft` is not permitted. Values: `active`, `archived`. |
| `email_settings` | object | No | The sending identity for posts sent to this list. Only the provided fields within this object will be updated. |
| `headers` | object | No | Custom email headers for posts sent to this list. When provided, this replaces all existing headers on the list. Merges with publication headers at send time, with this list's values winning on a key collision. Set a value to `null` to suppress a header inherited from the publication. System-managed headers (e.g. List-Unsubscribe, X-SMTPAPI) cannot be overridden. |
| `utm_source` | string | No | The utm_source appended to links in posts sent to this list. |
| `utm_medium` | string | No | The utm_medium appended to links in posts sent to this list. |
| `utm_campaign` | string | No | The utm_campaign appended to links in posts sent to this list. |
| `utm_params_enabled` | boolean | No | Whether UTM parameters are appended to links in posts sent to this list. When left unset on the list, falls back to the publication. |

#### delete_newsletter_list

Delete newsletter list. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require newsletter_lists:write.

```bash
beehiiv-cli delete-newsletter-list --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `newsletter_list_id` | string | Yes | The prefixed ID of the newsletter list object Pattern: `^(nl_list_[0-9a-fA-F\-]+)$`. |

#### create_newsletter_list_subscription

Create newsletter list subscription. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require newsletter_lists:write.

```bash
beehiiv-cli create-newsletter-list-subscription --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `newsletter_list_id` | string | Yes | The prefixed ID of the newsletter list object Pattern: `^(nl_list_[0-9a-fA-F\-]+)$`. |
| `subscription_id` | string | No | The prefixed ID of the subscription to subscribe. Either subscription_id or email must be provided. Pattern: `^(sub_[0-9a-fA-F\-]+)$`. |
| `email` | string | No | The email address of the subscription to subscribe. Either subscription_id or email must be provided. |

#### list_newsletter_list_subscriptions

List newsletter list subscriptions. Reads account data. OAuth integrations require newsletter_lists:read.

```bash
beehiiv-cli list-newsletter-list-subscriptions --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `newsletter_list_id` | string | Yes | The prefixed ID of the newsletter list object Pattern: `^(nl_list_[0-9a-fA-F\-]+)$`. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `cursor` | string | No | **Cursor-based pagination (recommended)**: Use this opaque cursor token to fetch the next page of results. When provided, pagination will use cursor-based method which is more efficient and consistent than offset-based pagination. |
| `page` | integer | No | **Offset-based pagination (deprecated)**: Page number for offset-based pagination. Please migrate to cursor-based pagination using the `cursor` parameter. If not specified, results 1-10 from page 1 will be returned. Minimum: `1`. Maximum: `100`. |
| `direction` | string | No | The direction that the results are sorted in. Defaults to asc  `asc` - Ascending, sorts from smallest to largest.  `desc` - Descending, sorts from largest to smallest. Default: `asc`. Values: `asc`, `desc`. |
| `all_pages` | boolean | No | Read successive cursor pages, bounded by max_items (default 1000). |
| `max_items` | integer | No | Maximum records when all_pages=true. Returns continuation cursor and truncation. Minimum: `1`. Maximum: `10000`. |

#### get_newsletter_list_subscription

Get newsletter list subscription. Reads account data. OAuth integrations require newsletter_lists:read.

```bash
beehiiv-cli get-newsletter-list-subscription --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `newsletter_list_id` | string | Yes | The prefixed ID of the newsletter list object Pattern: `^(nl_list_[0-9a-fA-F\-]+)$`. |
| `newsletter_list_subscription_id` | string | Yes | The prefixed ID of the newsletter list subscription object Pattern: `^(nl_list_sub_[0-9a-fA-F\-]+)$`. |

#### update_newsletter_list_subscription

Update newsletter list subscription. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require newsletter_lists:write.

```bash
beehiiv-cli update-newsletter-list-subscription --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `newsletter_list_id` | string | Yes | The prefixed ID of the newsletter list object Pattern: `^(nl_list_[0-9a-fA-F\-]+)$`. |
| `newsletter_list_subscription_id` | string | Yes | The prefixed ID of the newsletter list subscription object Pattern: `^(nl_list_sub_[0-9a-fA-F\-]+)$`. |
| `unsubscribe` | boolean | No | Set to true to unsubscribe the subscription from this newsletter list. |

#### newsletter_list_subscriptions_update_by_subscription_id

Update newsletter list subscription by subscription ID. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require newsletter_lists:write.

```bash
beehiiv-cli newsletter-list-subscriptions-update-by-subscription-id --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `newsletter_list_id` | string | Yes | The prefixed ID of the newsletter list object Pattern: `^(nl_list_[0-9a-fA-F\-]+)$`. |
| `subscription_id` | string | Yes | The prefixed ID of the subscription Pattern: `^(sub_[0-9a-fA-F\-]+)$`. |
| `unsubscribe` | boolean | No | Set to true to unsubscribe the subscription from this newsletter list. |

#### newsletter_list_subscriptions_create_import

Create newsletter list subscriber import. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require newsletter_lists:write.

```bash
beehiiv-cli newsletter-list-subscriptions-create-import --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `newsletter_list_id` | string | Yes | The prefixed ID of the newsletter list object Pattern: `^(nl_list_[0-9a-fA-F\-]+)$`. |
| `custom_field_id` | string | No | The ID of a boolean custom field. Only subscribers with this field set to `true` are added. Cannot be combined with `tag`. |
| `tag` | string | No | The name of a subscriber tag. Only subscribers with this tag are added. Cannot be combined with `custom_field_id`. |

#### newsletter_list_subscriptions_get_import

Get newsletter list subscriber import. Reads account data. OAuth integrations require newsletter_lists:read.

```bash
beehiiv-cli newsletter-list-subscriptions-get-import --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `newsletter_list_id` | string | Yes | The prefixed ID of the newsletter list object Pattern: `^(nl_list_[0-9a-fA-F\-]+)$`. |

#### identify_oauth_user

Identify user. Reads account data. OAuth integrations require identify:read. OAuth access token required; API key identity is not this endpoint.

```bash
beehiiv-cli identify-oauth-user --help
```

No operation-specific arguments. See shared inputs above.

#### podcasts_list_podcasts

List podcasts. Reads account data. OAuth integrations require podcasts:read.

```bash
beehiiv-cli podcasts-list-podcasts --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `cursor` | string | No | **Cursor-based pagination (recommended)**: Use this opaque cursor token to fetch the next page of results. Obtain the value from `next_cursor` in a previous response. |
| `page` | integer | No | **Offset-based pagination (deprecated)**: Page number for offset-based pagination. Please migrate to cursor-based pagination using the `cursor` parameter. Minimum: `1`. Maximum: `100`. |
| `status` | string | No | Optionally filter the results by the status of the podcast. `draft` - No episodes have been published. `live` - Published and active. `archived` - The podcast is no longer active. Values: `draft`, `live`, `archived`. |
| `all_pages` | boolean | No | Read successive cursor pages, bounded by max_items (default 1000). |
| `max_items` | integer | No | Maximum records when all_pages=true. Returns continuation cursor and truncation. Minimum: `1`. Maximum: `10000`. |

#### podcasts_get_podcast

Get podcast. Reads account data. OAuth integrations require podcasts:read.

```bash
beehiiv-cli podcasts-get-podcast --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `podcast_show_id` | string | Yes | The prefixed ID of the podcast Pattern: `^(pod_[0-9a-fA-F\-]+)$`. |

#### podcasts_get_private_feed

Get private feed. Reads account data. OAuth integrations require podcasts:read.

```bash
beehiiv-cli podcasts-get-private-feed --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `podcast_show_id` | string | Yes | The prefixed ID of the podcast Pattern: `^(pod_[0-9a-fA-F\-]+)$`. |
| `subscription_id` | string | Yes | The prefixed ID of the subscription Pattern: `^(sub_[0-9a-fA-F\-]+)$`. |

#### podcasts_get_private_feed_by_email

Get private feed by email. Reads account data. OAuth integrations require podcasts:read.

```bash
beehiiv-cli podcasts-get-private-feed-by-email --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `podcast_show_id` | string | Yes | The prefixed ID of the podcast Pattern: `^(pod_[0-9a-fA-F\-]+)$`. |
| `email` | string | Yes | The URL-encoded email address of the subscription |

#### podcasts_send_private_feed_email

Send private feed email. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require podcasts:write.

```bash
beehiiv-cli podcasts-send-private-feed-email --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `podcast_show_id` | string | Yes | The prefixed ID of the podcast Pattern: `^(pod_[0-9a-fA-F\-]+)$`. |
| `subscription_id` | string | Yes | The prefixed ID of the subscription Pattern: `^(sub_[0-9a-fA-F\-]+)$`. |

#### podcasts_send_private_feed_email_by_email

Send private feed email by email. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require podcasts:write.

```bash
beehiiv-cli podcasts-send-private-feed-email-by-email --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `podcast_show_id` | string | Yes | The prefixed ID of the podcast Pattern: `^(pod_[0-9a-fA-F\-]+)$`. |
| `email` | string | Yes | The URL-encoded email address of the subscription |

#### podcasts_list_episodes

List podcast episodes. Reads account data. OAuth integrations require podcasts:read.

```bash
beehiiv-cli podcasts-list-episodes --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `podcast_show_id` | string | Yes | The prefixed ID of the podcast Pattern: `^(pod_[0-9a-fA-F\-]+)$`. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `cursor` | string | No | **Cursor-based pagination (recommended)**: Use this opaque cursor token to fetch the next page of results. Obtain the value from `next_cursor` in a previous response. |
| `page` | integer | No | **Offset-based pagination (deprecated)**: Page number for offset-based pagination. Please migrate to cursor-based pagination using the `cursor` parameter. Minimum: `1`. Maximum: `100`. |
| `status` | string | No | Optionally filter the results by the status of the episode. `draft` - Not yet published. `scheduled` - Scheduled for future publication. `published` - Available via web and RSS. `archived` - No longer available via web or RSS. Values: `draft`, `scheduled`, `published`, `archived`. |
| `order_by` | string | No | The field that the results are sorted by. Defaults to `displayed_date` `created` - The time in which the episode was first created. `updated` - The time the episode was last updated. `publish_date` - The exact time the system published the episode (when it went live), not the scheduled time the user set. `displayed_date` - The time displayed in place of the `publish_date`. Uses a custom display date if set, otherwise the scheduled time the user set for publication, otherwise the `publish_date`, otherwise the creation date. For imported episodes, the original feed's `pubDate` is stored as the custom display date. This is the same field used to order episodes in the podcast's RSS feed. Default: `displayed_date`. Values: `created`, `updated`, `publish_date`, `displayed_date`. |
| `direction` | string | No | The direction that the results are sorted in. Defaults to desc  `asc` - Ascending, sorts from smallest to largest.  `desc` - Descending, sorts from largest to smallest. Default: `asc`. Values: `asc`, `desc`. |
| `all_pages` | boolean | No | Read successive cursor pages, bounded by max_items (default 1000). |
| `max_items` | integer | No | Maximum records when all_pages=true. Returns continuation cursor and truncation. Minimum: `1`. Maximum: `10000`. |

#### podcasts_get_episode

Get podcast episode. Reads account data. OAuth integrations require podcasts:read.

```bash
beehiiv-cli podcasts-get-episode --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `podcast_show_id` | string | Yes | The prefixed ID of the podcast Pattern: `^(pod_[0-9a-fA-F\-]+)$`. |
| `podcast_episode_id` | string | Yes | The prefixed ID of the episode Pattern: `^(pod_ep_[0-9a-fA-F\-]+)$`. |

#### list_polls

List polls. Reads account data. OAuth integrations require polls:read.

```bash
beehiiv-cli list-polls --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `cursor` | string | No | **Cursor-based pagination (recommended)**: Use this opaque cursor token to fetch the next page of results. When provided, pagination will use cursor-based method which is more efficient and consistent than offset-based pagination. |
| `page` | integer | No | **Offset-based pagination (deprecated)**: Page number for offset-based pagination. Please migrate to cursor-based pagination using the `cursor` parameter. If not specified, results 1-10 from page 1 will be returned. Minimum: `1`. Maximum: `100`. |
| `order_by` | string | No | The field that the results are sorted by. Defaults to created.  `created` - The time the poll was created.  `name` - The name of the poll. Default: `created`. Values: `created`, `name`. |
| `direction` | string | No | The direction that the results are sorted in. Defaults to asc.  `asc` - Ascending, sorts from smallest to largest.  `desc` - Descending, sorts from largest to smallest. Default: `asc`. Values: `asc`, `desc`. |
| `expand` | array | No | Optionally expand the response to include additional data.  `stats` - Returns aggregate vote counts per choice and total completions.  `poll_responses` - Returns up to 10 most recent subscriber responses. Use /polls/{pollId}/responses for paginated access to all responses.  `trivia_answer` - Returns the correct answer for trivia-type polls. Array items: string. |
| `post_id` | string | No | Filter to only return polls that were embedded in the specified post. Accepts a prefixed post ID (e.g. `post_abc123`). |
| `all_pages` | boolean | No | Read successive cursor pages, bounded by max_items (default 1000). |
| `max_items` | integer | No | Maximum records when all_pages=true. Returns continuation cursor and truncation. Minimum: `1`. Maximum: `10000`. |

#### get_poll

Get poll. Reads account data. OAuth integrations require polls:read.

```bash
beehiiv-cli get-poll --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `poll_id` | string | Yes | The prefixed ID of the poll object Pattern: `^(poll_[0-9a-fA-F\-]+)$`. |
| `expand` | array | No | Optionally expand the response to include additional data.  `stats` - Returns aggregate vote counts per choice and total completions.  `poll_responses` - Returns up to 10 most recent subscriber responses. Use /polls/{pollId}/responses for paginated access to all responses.  `trivia_answer` - Returns the correct answer for trivia-type polls. Array items: string. |

#### polls_list_responses

List poll responses. Reads account data. OAuth integrations require polls:read.

```bash
beehiiv-cli polls-list-responses --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `poll_id` | string | Yes | The prefixed ID of the poll object Pattern: `^(poll_[0-9a-fA-F\-]+)$`. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `cursor` | string | No | **Cursor-based pagination (recommended)**: Use this opaque cursor token to fetch the next page of results. |
| `page` | integer | No | **Offset-based pagination (deprecated)**: Page number for offset-based pagination. Minimum: `1`. Maximum: `100`. |
| `order_by` | string | No | The field that the results are sorted by. Defaults to created. Default: `created`. Values: `created`. |
| `direction` | string | No | The direction that the results are sorted in. Defaults to asc.  `asc` - Ascending, sorts from smallest to largest.  `desc` - Descending, sorts from largest to smallest. Default: `asc`. Values: `asc`, `desc`. |
| `expand` | array | No | Optionally expand the response to include additional data.  `post` - Returns the post title and publication date for the post where each response was collected. Array items: string. |
| `post_id` | string | No | Filter to only return responses collected via the specified post. Accepts a prefixed post ID (e.g. `post_abc123`). |
| `all_pages` | boolean | No | Read successive cursor pages, bounded by max_items (default 1000). |
| `max_items` | integer | No | Maximum records when all_pages=true. Returns continuation cursor and truncation. Minimum: `1`. Maximum: `10000`. |

#### create_post

Create post. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require posts:write. Defaults to draft. Creation is asynchronous; inspect the existing post ID before repeating a write.

```bash
beehiiv-cli create-post --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `blocks` | array | No | The structured content blocks that make up the post. Supports block types such as paragraph, image, heading, button, html, table, list, columns, and more. You can embed raw HTML snippets within blocks using the `html` block type. Either this field OR the `body_content` field must be provided. Array items: object. |
| `body_content` | string | No | The content of the post as a single raw HTML string. The HTML is wrapped in an `htmlSnippet` block internally. Note that ` ` and ` ` tags are removed during sanitization : use inline styles for all visual styling. Either this field OR the `blocks` field must be provided. |
| `title` | string | Body | The title of the post. |
| `subtitle` | string | No | The subtitle of the post. |
| `post_template_id` | string | No | The ID of the template to use for the post. If not provided, the default template will be used. Pattern: `^(post_template_[0-9a-fA-F\-]+)$`. |
| `status` | string | No | The status of the post. If not provided, the default (`draft`) value will be used and the post will not be scheduled or published. Explicitly pass `confirmed` to have the post publish immediately (if no `scheduled_at` is provided) or at the `scheduled_at` time. Default: `draft`. Values: `draft`, `confirmed`. |
| `scheduled_at` | string | No | The time in which the post will be published. If not provided, the post will be published immediately unless `status` is set to `draft`. A draft post cannot be scheduled. Format: `date-time`. |
| `custom_link_tracking_enabled` | boolean | No | If true, custom link tracking will be enabled for this post. If not provided, the default value will be used. |
| `email_capture_type_override` | string | No | The email capture type to use for this post. If not provided, the default value will be used. Values: `none`, `gated`, `popup`. |
| `override_scheduled_at` | string | No | If you wish to display a date other than the scheduled_at date in the email, you can provide a date here. This will not affect the actual publish date of the post. Format: `date-time`. |
| `social_share` | string | No | The social share type to use for this post. If not provided, the default value will be used. Values: `comments_and_likes_only`, `with_comments_and_likes`, `top`, `none`. |
| `thumbnail_image_url` | string | No | The URL of the thumbnail image to use for the post. If not provided, the default value will be used. |
| `recipients` | object | No | The recipients to use for this post. If not provided, the default value will be used. Object requires: `web`, `email`. |
| `email_settings` | object | No | The email settings to use for this post. If not provided, the default value will be used. |
| `web_settings` | object | No | The web settings to use for this post. If not provided, the default value will be used. |
| `seo_settings` | object | No | The metadata to use for this post. If not provided, the default value will be used. |
| `content_tags` | array | No | The content tags to use for this post. If not provided, the default value will be used. Array items: string. |
| `guest_author_ids` | array | No | The prefixed IDs of the guest authors to associate with this post. Guest authors must belong to the publication. Obtain IDs from the List Authors endpoint. When provided, replaces all existing guest authors on the post. Array items: string. |
| `team_author_ids` | array | No | The prefixed IDs of the team members to associate with this post as authors. Team authors must have access to the publication. Note the List Authors endpoint only returns team members who already have a byline on a published post in this publication, so it will not surface IDs for a team member's first assignment. When provided, replaces all existing team authors on the post. Array items: string. |
| `headers` | object | No | Custom email headers for this post. Merges with newsletter list and publication headers at send time, with this post's values winning on a key collision. Set a value to `null` to suppress a header inherited from the newsletter list or publication. System-managed headers (e.g. List-Unsubscribe, X-SMTPAPI) cannot be overridden. |
| `utm_source` | string | No | The utm_source appended to links in this post. Falls back to the newsletter list, then the publication, then a generated default. |
| `utm_medium` | string | No | The utm_medium appended to links in this post. Falls back to the newsletter list, then the publication, then a generated default. |
| `utm_campaign` | string | No | The utm_campaign appended to links in this post. Falls back to the newsletter list, then the publication, then a generated default. |
| `utm_params_enabled` | boolean | No | Whether UTM parameters are appended to links in this post. Omit to inherit from the newsletter list, then the publication. |
| `custom_fields` | object | No | The custom fields to use for this post. If not provided, the default value will be used. |
| `newsletter_list_id` | string | No | The prefixed ID of the newsletter list to associate with this post. When provided, the post will only be sent to subscribers of this list. |

#### list_posts

List posts. Reads account data. OAuth integrations require posts:read.

```bash
beehiiv-cli list-posts --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `expand` | array | No | Optionally expand the results by adding additional information.  `stats` - Adds statistics about the post(s).  `free_web_content` - Adds the web HTML rendered to a free reader.  `free_email_content` - Adds the email HTML rendered to a free reader.  `free_rss_content` - Adds the RSS feed HTML.  `premium_web_content` - Adds the web HTML rendered to a premium reader.  `premium_email_content` - Adds the email HTML rendered to a premium reader. Array items: string. |
| `audience` | string | No | Optionally filter the results by audience Default: `all`. Values: `free`, `premium`, `all`. |
| `platform` | string | No | Optionally filter the results by platform. `web` - Posts only published to web. `email` - Posts only published to email. `both` - Posts published to email and web. `all` - Does not restrict results by platform. Default: `all`. Values: `web`, `email`, `both`, `all`. |
| `status` | string | No | Optionally filter the results by the status of the post. `draft` - not been scheduled. `confirmed` - The post will be active after the `scheduled_at`. `archived` - The post is no longer active. `all` - Does not restrict results by status. Default: `all`. Values: `draft`, `confirmed`, `archived`, `all`. |
| `content_tags` | array | No | Optionally filter posts by content_tags. Adding a content tag will return any post with that content tag associated to it.   Example : Filtering for `content_tags: ["sales","closing"]` will return results of posts that have *either* `sales` or `closing` content_tags. Array items: string. |
| `slugs` | array | No | Optionally filter posts by their slugs. Adding a slug will return any post with that exact slug associated to it.   Example:  Filtering for `slugs: ["my-first-post","another-post"]` will return results of posts that have *either* `my-first-post` or `another-post` as their slug. Array items: string. |
| `authors` | array | No | Optionally filter posts by their authors. Adding an author name will return any post with that author associated to it (case-insensitive).   Example:  Filtering for `authors: ["John Doe","Jane Smith"]` will return results of posts that have *either* John Doe or Jane Smith as authors. Array items: string. |
| `premium_tiers` | array | No | Optionally filter posts by audience based on premium tiers.  This takes in an array of Display Names of the premium tiers.  It will also scope any expanded content output to the specified premium tiers.  Note: This is case insensitive. Array items: string. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `page` | integer | No | Pagination returns the results in pages. Each page contains the number of results specified by the `limit` (default: 10). If not specified, results 1-10 from page 1 will be returned. Minimum: `1`. Maximum: `100`. |
| `order_by` | string | No | The field that the results are sorted by. Defaults to created  `created` - The time in which the post was first created.  `publish_date` - The time the post was set to be published.  `displayed_date` - The time displayed in place of the `publish_date`. If no `displayed_date` was set, it will default to the `publish_date` Default: `created`. Values: `created`, `publish_date`, `displayed_date`. |
| `direction` | string | No | The direction that the results are sorted in. Defaults to asc  `asc` - Ascending, sorts from smallest to largest.  `desc` - Descending, sorts from largest to smallest. Default: `asc`. Values: `asc`, `desc`. |
| `hidden_from_feed` | string | No | Optionally filter the results by the `hidden_from_feed` attribute of the post. `all` - Does not restrict results by `hidden_from_feed`. `true` - Only return posts hidden from the feed. `false` - Only return posts that are visible on the feed. Default: `all`. Values: `all`, `true`, `false`. |

#### update_post

Update post. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require posts:write.

```bash
beehiiv-cli update-post --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `post_id` | string | Yes | The prefixed ID of the post to update Pattern: `^(post_[0-9a-fA-F\-]+)$`. |
| `content_merge_strategy` | string | No | Controls how provided `blocks` interact with the post's existing content. Defaults to `replace`. Use `append_to_template` to preserve template header blocks when updating posts that were created from a template. Values: `replace`, `append_to_template`, `append`, `prepend`. |
| `blocks` | array | No | The structured content blocks for the post. How these interact with existing content depends on `content_merge_strategy` (default: full replacement). Supports block types such as paragraph, image, heading, button, html, table, list, columns, and more. Cannot be provided together with `body_content`. Array items: object. |
| `body_content` | string | No | Raw HTML to replace the post's current content. The HTML is wrapped in an `htmlSnippet` block internally. Note that ` ` and ` ` tags are removed during sanitization : use inline styles for all visual styling. Cannot be provided together with `blocks`. |
| `title` | string | No | The title of the post. |
| `subtitle` | string | No | The subtitle of the post. |
| `scheduled_at` | string | No | The time at which the post will be published. Cannot be updated after the post has already been sent. Format: `date-time`. |
| `custom_link_tracking_enabled` | boolean | No | If true, custom link tracking will be enabled for this post. |
| `email_capture_type_override` | string | No | The email capture type to use for this post. Values: `none`, `gated`, `popup`. |
| `override_scheduled_at` | string | No | A display date that overrides the scheduled_at date shown in the email. Does not affect the actual publish date. Format: `date-time`. |
| `social_share` | string | No | The social share type to use for this post. Values: `comments_and_likes_only`, `with_comments_and_likes`, `top`, `none`. |
| `thumbnail_image_url` | string | No | The URL of the thumbnail image to use for the post. |
| `email_settings` | object | No | The email settings to use for this post. Only the provided fields within this object will be updated. |
| `web_settings` | object | No | The web settings to use for this post. Only the provided fields within this object will be updated. |
| `seo_settings` | object | No | The SEO metadata to use for this post. Only the provided fields within this object will be updated. |
| `status` | string | No | Transition the post's status. Use `confirmed` to schedule or publish a draft post. Only the `draft` → `confirmed` transition is supported : a confirmed post cannot be moved back to `draft`. Default: `draft`. Values: `draft`, `confirmed`. |
| `content_tags` | array | No | The content tags for this post. When provided, this replaces all existing content tags on the post. Array items: string. |
| `headers` | object | No | Custom email headers for this post. Merges with newsletter list and publication headers at send time, with this post's values winning on a key collision. Set a value to `null` to suppress a header inherited from the newsletter list or publication. System-managed headers (e.g. List-Unsubscribe, X-SMTPAPI) cannot be overridden. |
| `utm_source` | string | No | The utm_source appended to links in this post. Falls back to the newsletter list, then the publication, then a generated default. |
| `utm_medium` | string | No | The utm_medium appended to links in this post. Falls back to the newsletter list, then the publication, then a generated default. |
| `utm_campaign` | string | No | The utm_campaign appended to links in this post. Falls back to the newsletter list, then the publication, then a generated default. |
| `utm_params_enabled` | boolean | No | Whether UTM parameters are appended to links in this post. When left unset on the post, falls back to the newsletter list, then the publication. |
| `guest_author_ids` | array | No | The prefixed IDs of the guest authors to associate with this post. Guest authors must belong to the publication. When provided, replaces all existing guest authors on the post. Array items: string. |
| `team_author_ids` | array | No | The prefixed IDs of the team members to associate with this post as authors. Team authors must have access to the publication. When provided, replaces all existing team authors on the post. Array items: string. |
| `recipients` | object | No | The recipients for this post. When provided, replaces all existing web and email audience targets with the specified values. If omitted, existing targets are unchanged. Object requires: `web`, `email`. |
| `newsletter_list_id` | string | No | The prefixed ID of the newsletter list to associate with this post. When provided, updates the newsletter list association. Pass null to remove the association. |

#### get_post

Get post. Reads account data. OAuth integrations require posts:read.

```bash
beehiiv-cli get-post --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `post_id` | string | Yes | The prefixed ID of the post object Pattern: `^(post_[0-9a-fA-F\-]+)$`. |
| `expand` | array | No | Optionally expand the results by adding additional information.  `stats` - Adds statistics about the post(s).  `free_web_content` - Adds the web HTML rendered to a free reader.  `free_email_content` - Adds the email HTML rendered to a free reader.  `free_rss_content` - Adds the RSS feed HTML.  `premium_web_content` - Adds the web HTML rendered to a premium reader.  `premium_email_content` - Adds the email HTML rendered to a premium reader. Array items: string. |
| `premium_tiers` | array | No | Scope any expanded content output to the specified premium tiers.  This takes in an array of Display Names of the premium tiers.  Note: This is case insensitive. Array items: string. |

#### delete_post

Delete post. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require posts:write.

```bash
beehiiv-cli delete-post --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `post_id` | string | Yes | The prefixed ID of the post object Pattern: `^(post_[0-9a-fA-F\-]+)$`. |

#### get_post_aggregate_stats

Get aggregate stats. Reads account data. OAuth integrations require posts:read.

```bash
beehiiv-cli get-post-aggregate-stats --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `audience` | string | No | Optionally filter the results by audience Default: `all`. Values: `free`, `premium`, `all`. |
| `platform` | string | No | Optionally filter the results by platform. `web` - Posts only published to web. `email` - Posts only published to email. `both` - Posts published to email and web. `all` - Does not restrict results by platform. Default: `all`. Values: `web`, `email`, `both`, `all`. |
| `status` | string | No | Optionally filter the results by the status of the post. `draft` - not been scheduled. `confirmed` - The post will be active after the `scheduled_at`. `archived` - The post is no longer active. `all` - Does not restrict results by status. Default: `all`. Values: `draft`, `confirmed`, `archived`, `all`. |
| `content_tags` | array | No | Optionally filter posts by content_tags. Adding a content tag will return any post with that content tag associated to it. Example: Filtering for `content_tags: ["sales","closing"]` will return results of posts that have *either* sales or closing content_tags. Array items: string. |
| `authors` | array | No | Optionally filter posts by their authors. Adding an author name will return any post with that author associated to it (case-insensitive).   Example:  Filtering for `authors: ["John Doe","Jane Smith"]` will return results of posts that have *either* John Doe or Jane Smith as authors. Array items: string. |
| `hidden_from_feed` | string | No | Optionally filter the results by the `hidden_from_feed` attribute of the post. `all` - Does not restrict results by `hidden_from_feed`. `true` - Only return posts hidden from the feed. `false` - Only return posts that are visible on the feed. Default: `all`. Values: `all`, `true`, `false`. |

#### send_post_test

Send test email. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require posts.

```bash
beehiiv-cli send-post-test --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `post_id` | string | Yes | The prefixed ID of the post object Pattern: `^(post_[0-9a-fA-F\-]+)$`. |
| `recipient_emails` | array | Body | One or more email addresses to send the test to. Returns 422 if the daily test send limit has been reached. Array items: string. |

#### preview_post

Generate post preview URL. Reads account data. OAuth integrations require posts:read.

```bash
beehiiv-cli preview-post --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `post_id` | string | Yes | The prefixed ID of the post object Pattern: `^(post_[0-9a-fA-F\-]+)$`. |
| `platform` | string | No | `email` (default) or `web`. |
| `subscriber_type` | string | No | `free` (default) or `premium`. `premium` requires `tier_ids` to be present. Ignored if `subscriber_id` is present. |
| `tier_ids` | array | No | One or more premium tier IDs to preview as. Only used when `subscriber_type` is `premium`. Ignored if `subscriber_id` is present. Array items: string. |
| `subscriber_id` | string | No | Preview using a specific subscriber's real tier memberships. Takes precedence over `subscriber_type`/`tier_ids` when present. Pattern: `^(sub_[0-9a-fA-F\-]+)$`. |

#### list_post_templates

Get post templates. Reads account data. OAuth integrations require posts:read.

```bash
beehiiv-cli list-post-templates --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `page` | integer | No | Pagination returns the results in pages. Each page contains the number of results specified by the `limit` (default: 10). If not specified, results 1-10 from page 1 will be returned. Minimum: `1`. Maximum: `100`. |
| `order` | string | No | The direction of the request. Defaults to `asc`. Default: `asc`. Values: `asc`, `desc`. |
| `order_by` | string | No | The field to order by. Defaults to `created`. |

#### create_post_template

Create post template. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require posts:write.

```bash
beehiiv-cli create-post-template --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `name` | string | Body | The name of the post template. |
| `description` | string | No | The description of the post template. |
| `blocks` | array | No | The structured content blocks posts built from this template start with. Supports the same block types as Create Post, with the exception of `advertisement`: an advertisement opportunity is booked for a single send and cannot be stored on a template. Array items: object. |
| `body_content` | string | No | The content posts built from this template start with, as a single raw HTML string. The HTML is wrapped in an `htmlSnippet` block internally. Note that ` ` and ` ` tags are removed during sanitization : use inline styles for all visual styling. |
| `thumbnail_image_url` | string | No | The URL of the thumbnail image to download for the template. |
| `social_share` | string | No | The social share style posts built from this template start with. Values: `comments_and_likes_only`, `with_comments_and_likes`, `top`, `none`. |
| `email_capture_type_override` | string | No | The email capture type posts built from this template start with. Values: `none`, `gated`, `popup`. |
| `content_tags` | array | No | The content tags posts built from this template start with. Tags that do not exist on the publication are created. Array items: string. |
| `guest_author_ids` | array | No | The prefixed IDs of the guest authors posts built from this template start with. Guest authors must belong to the publication. Array items: string. |
| `team_author_ids` | array | No | The prefixed IDs of the team members posts built from this template start with as authors. Team authors must have access to the publication. Array items: string. |
| `headers` | object | No | Custom email headers posts built from this template start with. Set a value to `null` to suppress a header inherited from the newsletter list or publication. System-managed headers (e.g. List-Unsubscribe, X-SMTPAPI) cannot be overridden. |
| `utm_source` | string | No | The utm_source appended to links in posts built from this template. |
| `utm_medium` | string | No | The utm_medium appended to links in posts built from this template. |
| `utm_campaign` | string | No | The utm_campaign appended to links in posts built from this template. |
| `utm_params_enabled` | boolean | No | Whether UTM parameters are appended to links in posts built from this template. Omit to inherit from the newsletter list, then the publication. |
| `newsletter_list_id` | string | No | The prefixed ID of the newsletter list posts built from this template are associated with. |
| `email_settings` | object | No | The email settings posts built from this template start with. |
| `web_settings` | object | No | The web settings posts built from this template start with. |

#### post_templates_workspace_index

List workspace post templates. Reads account data. OAuth integrations require posts:read.

```bash
beehiiv-cli post-templates-workspace-index --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `cursor` | string | No | **Cursor-based pagination (recommended)**: Use this opaque cursor token to fetch the next page of results. When provided, pagination will use cursor-based method which is more efficient and consistent than offset-based pagination. |
| `page` | integer | No | **Offset-based pagination (deprecated)**: Page number for offset-based pagination. Please migrate to cursor-based pagination using the `cursor` parameter. If not specified, results 1-10 from page 1 will be returned. Minimum: `1`. Maximum: `100`. |
| `all_pages` | boolean | No | Read successive cursor pages, bounded by max_items (default 1000). |
| `max_items` | integer | No | Maximum records when all_pages=true. Returns continuation cursor and truncation. Minimum: `1`. Maximum: `10000`. |

#### post_templates_workspace_create

Create workspace post template. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require posts:write.

```bash
beehiiv-cli post-templates-workspace-create --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `name` | string | Body | The name of the post template. |
| `description` | string | No | The description of the post template. |
| `blocks` | array | No | The structured content blocks posts built from this template start with. Blocks that need a publication are refused; see the endpoint description. Array items: object. |
| `body_content` | string | No | The content posts built from this template start with, as a single raw HTML string. The HTML is wrapped in an `htmlSnippet` block internally. Note that ` ` and ` ` tags are removed during sanitization, so use inline styles for all visual styling. |
| `social_share` | string | No | The social share style posts built from this template start with. Values: `comments_and_likes_only`, `with_comments_and_likes`, `top`, `none`. |
| `email_capture_type_override` | string | No | The email capture type posts built from this template start with. Values: `none`, `gated`, `popup`. |
| `headers` | object | No | Custom email headers posts built from this template start with. Set a value to `null` to suppress a header inherited from the newsletter list or publication. System-managed headers (e.g. List-Unsubscribe, X-SMTPAPI) cannot be overridden. |
| `utm_source` | string | No | The utm_source appended to links in posts built from this template. |
| `utm_medium` | string | No | The utm_medium appended to links in posts built from this template. |
| `utm_campaign` | string | No | The utm_campaign appended to links in posts built from this template. |
| `utm_params_enabled` | boolean | No | Whether UTM parameters are appended to links in posts built from this template. Omit to inherit from the newsletter list, then the publication. |
| `email_settings` | object | No | The email settings posts built from this template start with. |
| `web_settings` | object | No | The web settings posts built from this template start with. |

#### post_templates_workspace_show

Get workspace post template. Reads account data. OAuth integrations require posts:read.

```bash
beehiiv-cli post-templates-workspace-show --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `post_template_id` | string | Yes | The prefixed ID of the post template object Pattern: `^(post_template_[0-9a-fA-F\-]+)$`. |

#### get_post_template

Get post template. Reads account data. OAuth integrations require posts:read.

```bash
beehiiv-cli get-post-template --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `post_template_id` | string | Yes | The prefixed ID of the post template object Pattern: `^(post_template_[0-9a-fA-F\-]+)$`. |
| `expand` | array | No | Optionally expand the result by adding the rendered HTML of the template.  `free_web_content` - Adds the web HTML rendered to a free reader.  `free_email_content` - Adds the email HTML rendered to a free reader.  `free_rss_content` - Adds the RSS feed HTML.  `premium_web_content` - Adds the web HTML rendered to a premium reader.  `premium_email_content` - Adds the email HTML rendered to a premium reader. Array items: string. |

#### list_publication_fields

List publication fields. Reads account data. OAuth integrations require publication_fields:read.

```bash
beehiiv-cli list-publication-fields --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `cursor` | string | No | **Cursor-based pagination (recommended)**: Use this opaque cursor token to fetch the next page of results. When provided, pagination will use cursor-based method which is more efficient and consistent than offset-based pagination. |
| `page` | integer | No | **Offset-based pagination (deprecated)**: Page number for offset-based pagination. Please migrate to cursor-based pagination using the `cursor` parameter. If not specified, results 1-10 from page 1 will be returned. Minimum: `1`. Maximum: `100`. |
| `status` | string | No | Filter fields by whether they have been archived. Defaults to `active`. Values: `active`, `archived`, `all`. |
| `all_pages` | boolean | No | Read successive cursor pages, bounded by max_items (default 1000). |
| `max_items` | integer | No | Maximum records when all_pages=true. Returns continuation cursor and truncation. Minimum: `1`. Maximum: `10000`. |

#### create_publication_field

Create publication field. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require publication_fields:write.

```bash
beehiiv-cli create-publication-field --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `display` | string | Body | The human readable label for the field. |
| `kind` | string | Body | The type of value the field holds. Values: `text`, `number`, `boolean`, `date`, `color`, `url`, `image_url`, `rss_feed_url`, `json`. |
| `name` | string | No | The merge tag key for the field, unique within the workspace. Derived from `display` when omitted. Normalized to start with a letter and contain only lowercase letters, numbers and underscores, so `Support Email` is stored as `support_email`. A `date` or `number` field also claims its format variants, so `launch_date_mdy` is rejected with `NAME_CLASHES` while a `date` field named `launch_date` exists, and the other way around. |
| `value_source` | string | No | Where the value for each publication comes from. Defaults to `static`. Values: `static`, `fetched`. |
| `default_value` | string | No | The value used for publications that have not set one of their own. Required for every kind except `json` and `rss_feed_url`. |
| `endpoint_url` | string | No | The URL the value is retrieved from. Required when `value_source` is `fetched` and rejected otherwise. May contain merge tags that resolve per publication. |
| `response_keys` | array | No | The keys declared within the fetched JSON response body. Required when `kind` is `json` and rejected otherwise. A `number` or `date` key also claims its format variants, so a key `temp_round2` is rejected with `RESPONSE_KEYS_CLASHES` beside a `number` key named `temp`. Array items: object. |

#### get_publication_field

Get publication field. Reads account data. OAuth integrations require publication_fields:read.

```bash
beehiiv-cli get-publication-field --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_field_id` | string | Yes | The prefixed ID of the publication field object Pattern: `^(pub_field_[0-9a-fA-F\-]+)$`. |

#### update_publication_field

Update publication field. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require publication_fields:write.

```bash
beehiiv-cli update-publication-field --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_field_id` | string | Yes | The prefixed ID of the publication field object Pattern: `^(pub_field_[0-9a-fA-F\-]+)$`. |
| `display` | string | No | The human readable label for the field. |
| `default_value` | string | No | The value used for publications that have not set one of their own. |
| `endpoint_url` | string | No | The URL the value is retrieved from. Only supported for fetched fields. May contain merge tags that resolve per publication. |
| `response_keys` | array | No | The keys declared within the fetched JSON response body. Replaces the existing list. Only supported for `json` fields. A `number` or `date` key also claims its format variants, so a key `temp_round2` is rejected with `RESPONSE_KEYS_CLASHES` beside a `number` key named `temp`. Array items: object. |
| `status` | string | No | Set to `archived` to archive the field, or `active` to restore it. Left unchanged when omitted. Values: `active`, `archived`. |

#### publication_fields_values_index

List publication field values. Reads account data. OAuth integrations require publication_fields:read.

```bash
beehiiv-cli publication-fields-values-index --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | No | Return one result per field for this publication. Cannot be combined with `publication_field_id`. Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `publication_field_id` | string | No | Return one result per publication for this field. Cannot be combined with `publication_id`. Archived fields are accepted, since their values still resolve in content. Pattern: `^(pub_field_[0-9a-fA-F\-]+)$`. |
| `status` | string | No | Filter the fields returned for a publication by whether they have been archived. Only applies alongside `publication_id`, and defaults to `active`. Values: `active`, `archived`, `all`. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `cursor` | string | No | **Cursor-based pagination (recommended)**: Use this opaque cursor token to fetch the next page of results. When provided, pagination will use cursor-based method which is more efficient and consistent than offset-based pagination. |
| `page` | integer | No | **Offset-based pagination (deprecated)**: Page number for offset-based pagination. Please migrate to cursor-based pagination using the `cursor` parameter. If not specified, results 1-10 from page 1 will be returned. Minimum: `1`. Maximum: `100`. |
| `all_pages` | boolean | No | Read successive cursor pages, bounded by max_items (default 1000). |
| `max_items` | integer | No | Maximum records when all_pages=true. Returns continuation cursor and truncation. Minimum: `1`. Maximum: `10000`. |

#### publication_fields_values_update

Assign publication field values. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require publication_fields:write.

```bash
beehiiv-cli publication-fields-values-update --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_field_id` | string | Yes | The prefixed ID of the publication field object Pattern: `^(pub_field_[0-9a-fA-F\-]+)$`. |
| `values` | object | Body | The value each publication should resolve to, keyed by prefixed publication ID. A null or empty value clears the publication's own value. |

#### list_publications

List publications. Reads account data. OAuth integrations require publications:read.

```bash
beehiiv-cli list-publications --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `expand` | array | No | Optionally expand the results by adding additional information like subscription counts and engagement stats. Array items: string. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `page` | integer | No | Pagination returns the results in pages. Each page contains the number of results specified by the `limit` (default: 10). If not specified, results 1-10 from page 1 will be returned. Minimum: `1`. Maximum: `100`. |
| `direction` | string | No | The direction that the results are sorted in. Defaults to asc  `asc` - Ascending, sorts from smallest to largest.  `desc` - Descending, sorts from largest to smallest. Default: `asc`. Values: `asc`, `desc`. |
| `order_by` | string | No | The field that the results are sorted by. Defaults to created  `created` - The time in which the publication was first created.  `name` - The name of the publication. Default: `created`. Values: `created`, `name`. |

#### get_publication

Get publication. Reads account data. OAuth integrations require publications:read.

```bash
beehiiv-cli get-publication --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `expand` | array | No | Optionally expand the results by adding additional information like subscription counts and engagement stats. Array items: string. |

#### get_referral_program

Get referral program. Reads account data. OAuth integrations require referral_program:read.

```bash
beehiiv-cli get-referral-program --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `page` | integer | No | Pagination returns the results in pages. Each page contains the number of results specified by the `limit` (default: 10). If not specified, results 1-10 from page 1 will be returned. Minimum: `1`. Maximum: `100`. |

#### create_segment

Create segment. Changes account state and requires confirm=true for the user-requested action.

```bash
beehiiv-cli create-segment --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `name` | string | Body | A unique name for the segment that does not already exist in the publication. |
| `input` | object | Body | Input for segment creation. Use `subscriptions` or `emails` to create a manual segment from explicit lists, or `custom_fields` to create a dynamic segment filtered by custom field values. object: Object requires: `type`, `subscriptions`. object: Object requires: `type`, `emails`. object: Object requires: `type`, `custom_fields`. |

#### list_segments

List segments. Reads account data. OAuth integrations require segments:read.

```bash
beehiiv-cli list-segments --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `type` | string | No | Optionally filter the results by the segment's type. Default: `all`. Values: `dynamic`, `static`, `manual`, `all`. |
| `status` | string | No | Optionally filter the results by the segment's status. Default: `all`. Values: `pending`, `processing`, `completed`, `failed`, `all`. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `page` | integer | No | Pagination returns the results in pages. Each page contains the number of results specified by the `limit` (default: 10). If not specified, results 1-10 from page 1 will be returned. Minimum: `1`. Maximum: `100`. |
| `order_by` | string | No | The field that the results are sorted by. Defaults to created  `created` - The time in which the segment was first created.  `last_calculated` - The time that the segment last completed calculation. Measured in seconds since the Unix epoch. Default: `created`. Values: `created`, `last_calculated`. |
| `direction` | string | No | The direction that the results are sorted in. Defaults to asc  `asc` - Ascending, sorts from smallest to largest.  `desc` - Descending, sorts from largest to smallest. Default: `asc`. Values: `asc`, `desc`. |
| `expand` | array | No | Optionally expand the response to include additional data.   `stats` - Requests the most recently calculated statistics for a segment.   Segment stats are recalculated once daily around 7 a.m. UTC for dynamic segments, but can be manually recalculated at any time in the dashboard. Manual and static segments only calculate once upon upload or creation. Array items: string. |

#### get_segment

Get segment. Reads account data. OAuth integrations require segments:read.

```bash
beehiiv-cli get-segment --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `segment_id` | string | Yes | The prefixed ID of the segment object Pattern: `^(seg_[0-9a-fA-F\-]+)$`. |
| `expand` | array | No | Optionally expand the response to include additional data.   `stats` - Requests the most recently calculated statistics for a segment.   Segment stats are recalculated once daily around 7 a.m. UTC for dynamic segments, but can be manually recalculated at any time in the dashboard. Manual and static segments only calculate once upon upload or creation. Array items: string. |

#### delete_segment

Delete segment. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require segments:write.

```bash
beehiiv-cli delete-segment --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `segment_id` | string | Yes | The prefixed ID of the segment object Pattern: `^(seg_[0-9a-fA-F\-]+)$`. |

#### segments_recalculate

Recalculate segment. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require segments:write.

```bash
beehiiv-cli segments-recalculate --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `segment_id` | string | Yes | The prefixed ID of the segment object Pattern: `^(seg_[0-9a-fA-F\-]+)$`. |

#### get_segment_subscribers

List segment subscribers. Reads account data. OAuth integrations require segments:read.

```bash
beehiiv-cli get-segment-subscribers --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `segment_id` | string | Yes | The prefixed ID of the segment object Pattern: `^(seg_[0-9a-fA-F\-]+)$`. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `page` | integer | No | Pagination returns the results in pages. Each page contains the number of results specified by the `limit` (default: 10). If not specified, results 1-10 from page 1 will be returned. Minimum: `1`. Maximum: `100`. |
| `expand` | array | No | Optionally expand the response to include additional data.   `stats` - Returns statistics about the subscription(s).   `custom_fields` - Returns custom field values set on the subscription.   `referrals` - Returns referrals made by the subscription.   `tags` - Returns tags associated with the subscription.   `subscription_premium_tiers` - Returns premium tier(s) the subscription is subscribed to. Array items: string. |

#### segments_expand_results

List segment subscriber IDs. Reads account data. OAuth integrations require segments:read.

```bash
beehiiv-cli segments-expand-results --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `segment_id` | string | Yes | The prefixed ID of the segment object Pattern: `^(seg_[0-9a-fA-F\-]+)$`. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `page` | integer | No | Pagination returns the results in pages. Each page contains the number of results specified by the `limit` (default: 10). If not specified, results 1-10 from page 1 will be returned. Minimum: `1`. Maximum: `100`. |

#### get_subscription_by_email

Get subscription by email. Reads account data. OAuth integrations require subscriptions:read.

```bash
beehiiv-cli get-subscription-by-email --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `email` | string | Yes | The ID of the subscriber object |
| `expand` | string | No | Optional list of expandable objects. `subscription_premium_tiers ` - Returns an array of tiers the subscription is associated with. `referrals` - Returns an array of subscriptions with limited data - `id`, `email`, and `status`. These are the subscriptions that were referred by this subscription. `stats` - Returns statistics about the subscription(s). `custom_fields` - Returns an array of custom field values that have been set on the subscription.  `tags` - Returns an array of tags that have been set on the subscription. `newsletter_lists` - Returns an array of newsletter list prefixed IDs the subscription is actively subscribed to. Values: `stats`, `custom_fields`, `referrals`, `tags`, `newsletter_lists`. |

#### update_subscription_by_email

Update subscription by email. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require subscriptions:write.

```bash
beehiiv-cli update-subscription-by-email --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `target_email` | string | Yes | The email of the subscription object |
| `email` | string | No | The new email address for the subscription |
| `tier` | string | No | Optional parameter to set the tier for this subscription. Values: `free`, `premium`. |
| `premium_tier_ids` | array | No | An array of premium tier IDs to assign to this subscription. When provided, the subscription will be assigned to these specific premium tiers. Can be combined with `premium_tiers` to include tiers from both (duplicates are removed). Takes precedence over the `tier` parameter. Array items: string. |
| `premium_tiers` | array | No | An array of premium tier names to assign to this subscription. When provided, the subscription will be assigned to premium tiers matching these names. Can be combined with `premium_tier_ids` to include tiers from both (duplicates are removed). Takes precedence over the `tier` parameter. Array items: string. |
| `stripe_customer_id` | string | No | The Stripe Customer ID of the subscription (not required) Pattern: `^(cus_[0-9a-zA-Z]+)?$`. |
| `unsubscribe` | boolean | No | A boolean value specifying whether to unsubscribe this subscription from the publication (not required) |
| `custom_fields` | array | No | An array of custom field objects to update Array items: object. |
| `newsletter_list_ids` | array | No | An array of newsletter list prefixed IDs to subscribe this subscription to. Adds to the subscription's existing list memberships; it does not replace them. The newsletter lists must belong to the same publication. Cannot be combined with `unsubscribe`. Array items: string. |
| `unsubscribe_newsletter_list_ids` | array | No | An array of newsletter list prefixed IDs to unsubscribe this subscription from. Unsubscribing from a list the subscription is not on is a no-op. The newsletter lists must belong to the same publication, and the same list cannot appear in `newsletter_list_ids`. Array items: string. |
| `complimentary_gift_id` | string | No | The prefixed ID of a complimentary access object to apply to this subscription. The complimentary access must belong to the same publication. Pattern: `^(comp_access_[0-9a-fA-F\-]+)$`. |

#### get_subscription

Get subscription by ID. Reads account data. OAuth integrations require subscriptions:read.

```bash
beehiiv-cli get-subscription --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `subscription_id` | string | Yes | The prefixed ID of the subscription object Pattern: `^(sub_[0-9a-fA-F\-]+)$`. |
| `expand` | string | No | Optional list of expandable objects. `subscription_premium_tiers` - Returns an array of tiers the subscription is associated with. `referrals` - Returns an array of subscriptions with limited data - `id`, `email`, and `status`. These are the subscriptions that were referred by this subscription. `stats` - Returns statistics about the subscription(s). `custom_fields` - Returns an array of custom field values that have been set on the subscription.  `tags` - Returns an array of tags that have been set on the subscription. `newsletter_lists` - Returns an array of newsletter list prefixed IDs the subscription is actively subscribed to. Values: `stats`, `custom_fields`, `referrals`, `tags`, `newsletter_lists`. |

#### update_subscription

Update subscription by ID. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require subscriptions:write.

```bash
beehiiv-cli update-subscription --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `subscription_id` | string | Yes | The prefixed ID of the subscription object Pattern: `^(sub_[0-9a-fA-F\-]+)$`. |
| `tier` | string | No | Optional parameter to set the tier for this subscription. Values: `free`, `premium`. |
| `premium_tier_ids` | array | No | An array of premium tier IDs to assign to this subscription. When provided, the subscription will be assigned to these specific premium tiers. Can be combined with `premium_tiers` to include tiers from both (duplicates are removed). Takes precedence over the `tier` parameter. Array items: string. |
| `premium_tiers` | array | No | An array of premium tier names to assign to this subscription. When provided, the subscription will be assigned to premium tiers matching these names. Can be combined with `premium_tier_ids` to include tiers from both (duplicates are removed). Takes precedence over the `tier` parameter. Array items: string. |
| `email` | string | No | The new email address for the subscription |
| `stripe_customer_id` | string | No | The Stripe Customer ID of the subscription (not required) Pattern: `^(cus_[0-9a-zA-Z]+)?$`. |
| `unsubscribe` | boolean | No | A boolean value specifying whether to unsubscribe this subscription from the publication (not required) |
| `custom_fields` | array | No | An array of custom field objects to update Array items: object. |
| `newsletter_list_ids` | array | No | An array of newsletter list prefixed IDs to subscribe this subscription to. Adds to the subscription's existing list memberships; it does not replace them. The newsletter lists must belong to the same publication. Cannot be combined with `unsubscribe`. Array items: string. |
| `unsubscribe_newsletter_list_ids` | array | No | An array of newsletter list prefixed IDs to unsubscribe this subscription from. Unsubscribing from a list the subscription is not on is a no-op. The newsletter lists must belong to the same publication, and the same list cannot appear in `newsletter_list_ids`. Array items: string. |
| `complimentary_gift_id` | string | No | The prefixed ID of a complimentary access object to apply to this subscription. The complimentary access must belong to the same publication. Pattern: `^(comp_access_[0-9a-fA-F\-]+)$`. |

#### patch_subscription

Update subscription by ID. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require subscriptions:write.

```bash
beehiiv-cli patch-subscription --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `subscription_id` | string | Yes | The prefixed ID of the subscription object Pattern: `^(sub_[0-9a-fA-F\-]+)$`. |
| `email` | string | No | The new email address for the subscription |
| `tier` | string | No | Optional parameter to set the tier for this subscription. Values: `free`, `premium`. |
| `premium_tier_ids` | array | No | An array of premium tier IDs to assign to this subscription. When provided, the subscription will be assigned to these specific premium tiers. Can be combined with `premium_tiers` to include tiers from both (duplicates are removed). Takes precedence over the `tier` parameter. Array items: string. |
| `premium_tiers` | array | No | An array of premium tier names to assign to this subscription. When provided, the subscription will be assigned to premium tiers matching these names. Can be combined with `premium_tier_ids` to include tiers from both (duplicates are removed). Takes precedence over the `tier` parameter. Array items: string. |
| `stripe_customer_id` | string | No | The Stripe Customer ID of the subscription (not required) Pattern: `^(cus_[0-9a-zA-Z]+)?$`. |
| `unsubscribe` | boolean | No | A boolean value specifying whether to unsubscribe this subscription from the publication (not required) |
| `custom_fields` | array | No | An array of custom field objects to update Array items: object. |
| `newsletter_list_ids` | array | No | An array of newsletter list prefixed IDs to subscribe this subscription to. Adds to the subscription's existing list memberships; it does not replace them. The newsletter lists must belong to the same publication. Cannot be combined with `unsubscribe`. Array items: string. |
| `unsubscribe_newsletter_list_ids` | array | No | An array of newsletter list prefixed IDs to unsubscribe this subscription from. Unsubscribing from a list the subscription is not on is a no-op. The newsletter lists must belong to the same publication, and the same list cannot appear in `newsletter_list_ids`. Array items: string. |
| `complimentary_gift_id` | string | No | The prefixed ID of a complimentary access object to apply to this subscription. The complimentary access must belong to the same publication. Pattern: `^(comp_access_[0-9a-fA-F\-]+)$`. |

#### delete_subscription

Delete subscription. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require subscriptions:write.

```bash
beehiiv-cli delete-subscription --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `subscription_id` | string | Yes | The prefixed ID of the subscription object Pattern: `^(sub_[0-9a-fA-F\-]+)$`. |

#### add_tags

Add subscription tag. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require subscriptions:write.

```bash
beehiiv-cli add-tags --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication. Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `subscription_id` | string | Yes | The prefixed ID of the subscription. Pattern: `^(sub_[0-9a-fA-F\-]+)$`. |
| `tags` | array | No | Tags that can be used to group subscribers Array items: string. |

#### remove_tag

Remove subscription tag. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require subscriptions:write.

```bash
beehiiv-cli remove-tag --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication. Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `subscription_id` | string | Yes | The prefixed ID of the subscription. Pattern: `^(sub_[0-9a-fA-F\-]+)$`. |
| `tags` | array | No | Tags to remove from the subscriber Array items: string. |

#### create_tier

Create a tier. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require tiers:write.

```bash
beehiiv-cli create-tier --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `name` | string | Body | Name (body input). |
| `description` | string | No | Description (body input). |
| `prices_attributes` | array | No | Prices attributes (body input). Array items: object. |

#### list_tiers

List tiers. Reads account data. OAuth integrations require tiers:read.

```bash
beehiiv-cli list-tiers --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `expand` | string | No | Optional list of expandable objects. `stats` - Returns statistics about the tier(s). `prices` - Returns prices for the tier(s). |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |
| `page` | integer | No | Pagination returns the results in pages. Each page contains the number of results specified by the `limit` (default: 10). If not specified, results 1-10 from page 1 will be returned. Minimum: `1`. Maximum: `100`. |
| `direction` | string | No | The direction that the results are sorted in. Defaults to asc  `asc` - Ascending, sorts from smallest to largest.  `desc` - Descending, sorts from largest to smallest. Default: `asc`. Values: `asc`, `desc`. |

#### get_tier

Get tier. Reads account data. OAuth integrations require tiers:read.

```bash
beehiiv-cli get-tier --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `tier_id` | string | Yes | The prefixed ID of the tier object Pattern: `^(tier_[0-9a-fA-F\-]+)$`. |
| `expand` | string | No | Optional list of expandable objects. `stats` - Returns statistics about the tier(s). `prices` - Returns prices for the tier(s). |

#### replace_tier

Update a tier. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require tiers:write.

```bash
beehiiv-cli replace-tier --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `tier_id` | string | Yes | The prefixed ID of the tier object Pattern: `^(tier_[0-9a-fA-F\-]+)$`. |
| `name` | string | No | Name (body input). |
| `description` | string | No | Description (body input). |
| `prices_attributes` | array | No | Prices attributes (body input). Array items: object. |

#### update_tier

Update a tier. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require tiers:write.

```bash
beehiiv-cli update-tier --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `tier_id` | string | Yes | The prefixed ID of the tier object Pattern: `^(tier_[0-9a-fA-F\-]+)$`. |
| `name` | string | No | Name (body input). |
| `description` | string | No | Description (body input). |
| `prices_attributes` | array | No | Prices attributes (body input). Array items: object. |

#### create_webhook

Create a webhook. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require webhooks:write.

```bash
beehiiv-cli create-webhook --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `url` | string | Body | The webhook URL to send events to. Format: `uri`. |
| `event_types` | array | Body | The types of events the webhook will receive. Array items: string. |
| `description` | string | No | A description of the webhook. |

#### list_webhooks

List webhooks. Reads account data. OAuth integrations require webhooks:read.

```bash
beehiiv-cli list-webhooks --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `limit` | integer | No | A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10. Minimum: `1`. Maximum: `100`. |

#### get_webhook

Get webhook. Reads account data. OAuth integrations require webhooks:read.

```bash
beehiiv-cli get-webhook --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `endpoint_id` | string | Yes | The prefixed ID of the webhook object Pattern: `^(ep_.+)$`. |

#### update_webhook

Update webhook. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require webhooks:write.

```bash
beehiiv-cli update-webhook --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `endpoint_id` | string | Yes | The prefixed ID of the webhook object Pattern: `^(ep_.+)$`. |
| `event_types` | array | No | The types of events the webhook will receive. Array items: string. |
| `description` | string | No | A description of the webhook. |

#### delete_webhook

Delete a webhook. Changes account state and requires confirm=true for the user-requested action. OAuth integrations require webhooks:write.

```bash
beehiiv-cli delete-webhook --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `publication_id` | string | Yes | The prefixed ID of the publication object Pattern: `^(pub_[0-9a-fA-F\-]+)$`. |
| `endpoint_id` | string | Yes | The prefixed ID of the webhook object Pattern: `^(ep_.+)$`. |

#### workspaces_identify

Identify workspace. Reads account data. OAuth integrations require identify:read.

```bash
beehiiv-cli workspaces-identify --help
```

No operation-specific arguments. See shared inputs above.

#### workspaces_permissions

Get workspace permissions. Reads account data. OAuth integrations require identify:read.

```bash
beehiiv-cli workspaces-permissions --help
```

No operation-specific arguments. See shared inputs above.

#### workspaces_publications_by_subscription_email

Get publications by subscription email. Reads account data. OAuth integrations require publications:read.

```bash
beehiiv-cli workspaces-publications-by-subscription-email --help
```

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `email` | string | Yes | The email address to search for subscriptions |
| `expand` | array | No | Optionally expand the results by adding additional information.  `subscription` - Returns the full Subscription object for the email address in each publication.  `publication` - Returns the full Publication object instead of just ID and name.  `subscription_custom_fields` - Returns custom field values nested within the subscription object. (Returns the subscription object regardless of whether `subscription` is requested.) Array items: string. |

#### list_accounts

List private account labels and configured auth methods, without returning credentials or token-file paths. Does not contact Beehiiv.

```bash
beehiiv-cli list-accounts --help
```

No operation-specific arguments. See shared inputs above.

## 9. Newsletter and subscription workflows

### Create a draft, then inspect the same post

The Send API requires eligible **Pro/Enterprise** access. Creation accepts a title and exactly one of `blocks` or `body_content`. Draft is the default; scheduling a draft is refused. These zero IDs are illustrative, not real account resources: replace them with IDs from Beehiiv before executing.

```bash
beehiiv-cli list-posts --publication-id pub_00000000-0000-0000-0000-000000000000 --limit 5 --agent
beehiiv-cli create-post --publication-id pub_00000000-0000-0000-0000-000000000000 --title "Creator notes" --body-content '<p>Your actual newsletter content.</p>' --confirm --agent
beehiiv-cli get-post --publication-id pub_00000000-0000-0000-0000-000000000000 --post-id post_00000000-0000-0000-0000-000000000000 --agent
```

Creation returns an accepted post ID before background processing is complete. The wrapper marks `creation_pending`. A subsequent HTTP 202 read returns pending state plus Retry-After when present; it does not poll forever or resubmit. Preserve the ID, wait as instructed and read it again. A POST_CREATION_FAILED 404 is a failure. Inspect account state before repeating an unknown write outcome.

### Structured blocks, HTML and scheduling

Use `beehiiv-cli schema create-post` or schema update-post, then a private payload file for nested content. HTML uses inline CSS; style/link tags are stripped by Beehiiv. Template content and `content_merge_strategy` affect whether the template header/content is preserved. Inspect the rendered draft in Beehiiv before a confirmed scheduling/delivery update. Do not replace a branded template with one paragraph by accident.

An update needs a nonempty body, refuses both blocks and body_content, and validates the current documented fields. A schedule uses the appropriate confirmed status and scheduled_at fields. No local guard or HTTP acceptance establishes successful email delivery.

### Subscribers and automations

Discover an existing subscriber and read the intended publication before applying an audience change. Create subscription can reactivate an existing record, send a welcome email, enroll automations or modify paid-tier associations when those fields are supplied. Every write requires confirmation; reading a list is not permission to send or reactivate.

Private podcast feeds, exported account data, billing/advertising-related offers and workspace privacy deletions need particular care. A tool's existence does not imply your key, plan or OAuth scopes permit it. Only perform the user-requested action.

## 10. Pagination, exports and webhooks

### Native cursors and deprecated offset pages

Only 13 reviewed operations expose cursor. They accept all_pages and a max_items cap (default 1,000, maximum 10,000), stop after 100 pages and refuse repeated cursors. The last request size shrinks to the remaining cap so its next cursor does not skip unseen records. Aggregated output reports collected/pages/truncated plus the last pagination object.

Do not mix cursor with page, or all_pages with page. max_items without all_pages is refused. Offset-only tools, including the reviewed list_posts/list_publications schemas, retain deprecated page input capped at 100; they do not receive invented cursor support. The current pagination guide recommends cursor where available, with limit at most 100 and default 10.

```bash
beehiiv-cli list-subscriptions --publication-id pub_00000000-0000-0000-0000-000000000000 --limit 25 --agent
beehiiv-cli list-subscriptions --publication-id pub_00000000-0000-0000-0000-000000000000 --all-pages --max-items 500 --agent
```

### Exports and asynchronous operations

A successful create/export response can mean work was accepted, not that every record is exported. Keep returned job/resource identifiers and inspect the appropriate existing resource. A bounded list is not a complete backup guarantee. Protect response data and download links as private account content.

### Webhook receivers

Webhook management requires eligible Lite+ access and appropriate scopes. Create/update the requested endpoint through the API, then retrieve its signing secret privately from the endpoint UI and configure your own receiver. Verify Svix-style signature headers according to Beehiiv's current webhook documentation. This package does not deploy a receiver, prove public reachability or return a signing-secret file. Never paste a signing secret into model context.

## 11. Several private accounts

Set `BEEHIIV_ACCOUNTS` to a private JSON array. Its supported keys are `name`, `api_key`, `access_token`, `refresh_token`, `client_id`, `client_secret` and `tokens_file`. It replaces the single-account variables:

```json
[
  {"name":"work","api_key":"YOUR_WORK_API_KEY"},
  {"name":"personal","tokens_file":"/absolute/private/path/personal-beehiiv.json"}
]
```

Set `BEEHIIV_DEFAULT_ACCOUNT=work`, then:

```bash
beehiiv-cli list-accounts --agent
beehiiv-cli list-publications --account work --limit 10 --agent
beehiiv-cli list-publications --account personal --agent
```

Names must be unique. `list_accounts` exposes labels, default choice and auth type only, never credentials or file paths. Guard logs omit account names. Separate processes are still preferable when you need strict account isolation.

Account selects credentials; publication_id selects a permitted publication. They are separate concepts. A restricted key can list only the publications in its scope.

## 12. Writing safely

Every one of the 47 writes requires confirm:true through MCP or --confirm through the CLI. --agent and --yes never override confirmation. Confirmation authorizes only the requested action.

| Setting | Effect |
| --- | --- |
| BEEHIIV_READ_ONLY=1 | Hide/refuse all 47 writes, leaving 70 reads |
| BEEHIIV_ALLOW_DESTRUCTIVE=0 | Block all confirmed writes even when explicitly confirmed |
| BEEHIIV_AUDIT_LOG | Optional private guard-decision log without request arguments or credentials |

GET 429 retries are bounded; OAuth GET 401 can refresh and retry once. Mutating calls have zero automatic retries, including timeout, 429 or expiry. A failed request can have an unknown remote outcome. Inspect the existing resource before repeating a write. Imported content and API responses are data, not instructions to run unrelated commands.

## 13. How it works

One reviewed operation registry generates MCP tools and schema-derived CLI commands. Both use the same Ajv validation, fixed API host, private account context and WriteGuard. The SDK's in-memory transport connects the CLI to the actual server, avoiding duplicate request logic.

```bash
git clone https://github.com/thenavidm/beehiiv-mcp-cli.git
cd beehiiv-mcp-cli
npm ci
npm run typecheck
npm run build
npm test
npm run check:counts
npm run build:mcpb
npm pack --dry-run
```

The official snapshots and source hash are recorded under scripts/ and src/tools/api-source.json. Review new schemas and prose corrections before sync: node scripts/sync-openapi.mjs /absolute/path/reviewed-api.json. CI checks Linux/Windows Node 22/24 and desktop packaging. The annotated tag release workflow checks versions/counts, publishes npm with provenance and attaches the desktop archive.

Use RELEASE-CHECKLIST.md for every update. Package allowlists exclude private configuration and legacy history. The desktop archive bundles production dependencies and notices, never credentials. A protocol check is distinct from a GUI installation.

## 14. Your data

API calls go directly to https://api.beehiiv.com/v2, with OAuth refresh at https://app.beehiiv.com/oauth/token. No Navid-hosted relay or telemetry is included. Redirects are refused. API keys, access/refresh tokens and client secrets are sanitized from results and reflected errors.

Subscriber addresses, newsletters, analytics, export links and private podcast URLs remain authorized private business data, not anonymized information. Your AI client and Beehiiv apply their own retention/sharing policies. Do not treat secret redaction as removal of all account data.

Private token files and optional guard logs stay on the server's machine. Refresh writes an owner-only temporary file and renames it atomically. Guard logs omit arguments, account labels and credentials; they record decisions and attempts, not proof of remote delivery. Logging failure does not block a requested operation. See SECURITY.md for disclosure and dependency limitations.

## 15. Environment variables

| Variable | Default | Meaning |
| --- | --- | --- |
| `BEEHIIV_API_KEY` | Empty | Private personal API key |
| `BEEHIIV_ACCESS_TOKEN` | Empty | Authorized OAuth access token |
| `BEEHIIV_REFRESH_TOKEN` | Empty | OAuth refresh token |
| `BEEHIIV_CLIENT_ID` | Empty | Your registered OAuth client ID |
| `BEEHIIV_CLIENT_SECRET` | Empty | Confidential-client secret; omit for public clients |
| `BEEHIIV_TOKENS_FILE` | Empty | Absolute regular private OAuth JSON, max 64 KB |
| `BEEHIIV_ACCOUNTS` | Empty | Private JSON named accounts; replaces single-account variables |
| `BEEHIIV_DEFAULT_ACCOUNT` | First configured account | Default private account label |
| `BEEHIIV_READ_ONLY` | 0 | Hide/refuse all writes when 1 or true |
| `BEEHIIV_ALLOW_DESTRUCTIVE` | 1 | Block all writes when 0 or false |
| `BEEHIIV_AUDIT_LOG` | None | Private write-guard decision log |
| `BEEHIIV_REQUEST_TIMEOUT_MS` | 30000 | Integer per-request deadline, 100–300000 ms |
| `BEEHIIV_MAX_RETRIES` | 2 | GET 429 retry count, 0–5 |
| `BEEHIIV_MIN_REQUEST_INTERVAL_MS` | 0 = 2000 ms | 0 selects conservative pacing; otherwise 1–10000 ms |

Set values privately in the process/client environment. No .env loader, hosted secret manager or automatic GUI inheritance is included. Full account/client examples are in INSTALL.md.

## 16. Updates and removal

```bash
npm install -g @thenavidm/beehiiv-mcp-cli@latest
beehiiv-cli --version
claude mcp remove --scope user beehiiv
codex mcp remove beehiiv
npm uninstall -g @thenavidm/beehiiv-mcp-cli
```

Reinstall a newer desktop archive separately and restart affected clients. Remove manual client entries using its own settings. Uninstalling the package does not revoke Beehiiv credentials, remove private token/secret files or unschedule email. Revoke/delete keys or authorized apps in Beehiiv when appropriate. Inspect and remove private files yourself after preserving any private data you still need.

Pin a reviewed version instead of @latest if your automation requires reproducibility. Check [CHANGELOG.md](./CHANGELOG.md) and [GitHub Releases](https://github.com/thenavidm/beehiiv-mcp-cli/releases) before a major update. Do not roll back by blindly publishing an older version over an existing npm version.

## 17. Troubleshooting

| Symptom | Resolution |
| --- | --- |
| Binary missing | Node 22+, npm global prefix/PATH, reopen terminal |
| Doctor exit 10 | Repair private credentials/accounts/timeout settings |
| GUI auth differs | Configure the GUI process; shell variables may not be inherited |
| 401 | Check Bearer key/token, OAuth expiry/revocation |
| 403 | Plan, scopes, roles or workspace restrictions |
| Publication 404 | Resource absence or publication-scoped key restriction |
| Post HTTP 202 | Pending processing; keep the ID and honor Retry-After |
| POST_CREATION_FAILED 404 | Failed creation; inspect existing state before another submission |
| Create post refused | Title and exactly one content method; eligible Pro/Enterprise access |
| First page only | Native cursor where exposed; offset-only page remains deprecated |
| 429 | Respect actual plan/shared credential limits; never blindly repeat writes |
| Unknown write outcome | Inspect account state before repeating |
| Extension rejected | Compatible host/runtime and custom-extension policy |
| Webhook receiver fails | Check your receiver and private signature verification; package does not host it |

## 18. API coverage and comparisons

| Offering | Surface | Reviewed scope | Tradeoff |
| --- | --- | --- | --- |
| [Official Beehiiv account MCP](https://www.beehiiv.com/support/article/39255979546263-getting-started-with-the-beehiiv-mcp) | Hosted MCP at `https://mcp.beehiiv.com/mcp` | Account reads on all plans; writes on paid plans, with existing role permissions | Hosted setup and UI operations beyond the API; excludes publishing/scheduling/sending posts and activating automations |
| [Developer documentation MCP](https://developers.beehiiv.com/) | `https://developers.beehiiv.com/_mcp/server` | Read developer documentation | Does not operate an account |
| This implementation | Local stdio MCP, shared task CLI and released desktop bundle | Documented v2 operations, private named accounts, bounded native cursor retrieval, write guards and no automatic mutation retries | Local configuration/maintenance; endpoint scopes and plans apply; live account outcomes pending |
| [deldrid1/beehiiv-cli](https://github.com/deldrid1/beehiiv-cli) | Community Go task CLI | OAuth, operating-system credential storage and task commands; distribution includes Homebrew and Windows routes | Already a useful CLI alternative; compare requested commands and output rather than declaring CLI absence |
| [Official TypeScript SDK](https://github.com/beehiiv/typescript-sdk) | `@beehiiv/sdk`, public beta | API client for application code | Different interface from a task CLI; review the SDK's version and request retry policy for writes |



[COMPARISON.md](COMPARISON.md) records dated primary sources, API/MCP differences and pending evidence. No competitor token, latency or success-rate advantage is asserted.

## 19. Versions

| Component | Version / source |
| --- | --- |
| Package and desktop manifest | 2.0.0 |
| Runtime | Node 22 or newer |
| Beehiiv API | v2; 116 pinned operations, reviewed 2026-10-02 |
| MCP SDK | ^1.31.0 |
| Source provenance | api-source.json with exact source hash and reviewed corrections |

CHANGELOG.md records dated versions. Version 2 replaces the private MCP-only 1.0.0 source with current API coverage, a shared CLI and desktop packaging. Existing documented tool names remain where the current endpoints exist. Unsupported email-blast helpers are removed; use current post creation/update and the intended newsletter-list fields on eligible plans.

Use publication_id from list_publications, current prefixed resource IDs and native schemas. Review consent/reactivation/welcome-email fields, scheduling status and irreversible privacy operations. Private account instructions and old Git history remain private. Preserve the existing AGPL license.

## 20. FAQ

<details>
<summary><b>What is an MCP server?</b></summary>

It exposes account operations to an AI client through structured tools. This package runs locally over stdio; it does not host a public remote connector.

</details>

<details>
<summary><b>What is the CLI?</b></summary>

`beehiiv-cli` exposes the same tools as shell commands through the shared MCP implementation. Use it with scripts or an agent that can run terminal commands.

</details>

<details>
<summary><b>Does Beehiiv have an official MCP?</b></summary>

Yes. The official account MCP supports reads on all plans and writes on paid plans. Its UI capabilities differ from API coverage. A separate documentation MCP only reads developer docs.

</details>

<details>
<summary><b>Why offer this alongside the official MCP?</b></summary>

It provides a local task CLI, named private accounts, bounded native cursor retrieval and explicit write guards. Eligible Send API workflows are another API-specific difference. No broader coverage or measured efficiency claim is made.

</details>

<details>
<summary><b>Is there another Beehiiv CLI?</b></summary>

Yes. The community `deldrid1/beehiiv-cli` already offers a Go task CLI with OAuth and OS credential storage. Compare actual requested commands, install preferences and outputs.

</details>

<details>
<summary><b>Is the wrapper free?</b></summary>

The wrapper preserves AGPL-3.0-or-later licensing. Beehiiv account plans, API eligibility and service charges remain separate; installing npm does not upgrade an account.

</details>

<details>
<summary><b>Where do I create an API key?</b></summary>

Open Workspace Settings > API in Beehiiv and choose Create New API Key. Save it privately when shown. Optional publication restrictions limit what it can access.

</details>

<details>
<summary><b>Do I give the AI my API key?</b></summary>

No. Configure it in private local shell or client settings as BEEHIIV_API_KEY. Never paste keys, tokens or signing secrets into chat, issues, repositories or public transcripts.

</details>

<details>
<summary><b>Does login open an OAuth browser flow?</b></summary>

No. It prints setup instructions. OAuth integrations use your own registered client and callback. Beehiiv support handles client registration; public clients need PKCE.

</details>

<details>
<summary><b>Can I use Claude Desktop?</b></summary>

The desktop archive bundles production dependencies and uses a sensitive API-key setting or private OAuth token-file path. Custom-extension policy and a compatible host/runtime apply. Archive/protocol checks are distinct from a GUI installation.

</details>

<details>
<summary><b>Can I connect ChatGPT on the web?</b></summary>

This package requires local stdio support. A web client accepting only remote MCP URLs needs Beehiiv’s official hosted server, subject to the client’s connector support.

</details>

<details>
<summary><b>Does creating a post send it immediately?</b></summary>

Creation defaults to draft and requires confirmation. Send API access requires eligible Pro/Enterprise permissions. Setting confirmed status and delivery options changes the operation; inspect the requested audience and schedule explicitly.

</details>

<details>
<summary><b>What does HTTP 202 mean?</b></summary>

The existing post is still processing. Preserve its post ID and Retry-After guidance and read that same post later. Pending is not a completed send or permission to create another post.

</details>

<details>
<summary><b>Can I use both blocks and HTML?</b></summary>

No. Create requires exactly one of structured blocks or body_content. Updates refuse both and require a nonempty body. Use the current schema for nested block shapes and HTML/template constraints.

</details>

<details>
<summary><b>Will it retry a failed write?</b></summary>

No. Mutating POST, PUT, PATCH and DELETE requests have zero automatic retries, including timeouts and rate limits. Inspect account state before repeating an action with an unknown outcome.

</details>

<details>
<summary><b>Can I retrieve all subscription pages?</b></summary>

Use all_pages only on a tool that exposes native cursor input. max_items bounds retrieval and reduces the last page size so the returned cursor does not skip unseen records. Offset-only page inputs remain deprecated and capped at 100.

</details>

<details>
<summary><b>Can I connect multiple accounts or publications?</b></summary>

Named private accounts select credentials with --account. Each publication-specific tool takes publication_id separately. Use list_publications to discover the publications allowed by that credential.

</details>

<details>
<summary><b>Why does a publication return 404?</b></summary>

It may not exist, or it may be outside the API key’s publication restrictions. A scoped key also cannot perform workspace-wide data deletion. Check the intended credential and permissions.

</details>

<details>
<summary><b>Where are webhook signing secrets?</b></summary>

Get them privately through the Beehiiv webhook endpoint UI on an eligible plan, then configure signature verification in your own receiver. The wrapper does not deploy a receiver or supply a signing-secret rotation service.

</details>

<details>
<summary><b>Is the CLI more token efficient?</b></summary>

Fresh usage/task results are pending. Compare full loading, deferred tool search, skill loading and matched successful tasks with actual model usage. Neither tool counts nor character estimates establish savings.

</details>

## Questions

Open an [issue](https://github.com/thenavidm/beehiiv-mcp-cli/issues) with the version/client and a sanitized reproduction. Security reports go privately through SECURITY.md.

## About the author

Navid Moazzez is a leading AI business strategist, and the host of the AI Creator Summit, watched by 100,000+ creators. He helps creators and founders master AI and build their own AI Operating System (AI OS) to automate their business and life. This Beehiiv MCP server and CLI is one piece of that system.

**Links**

- Personal website: [navid.me](https://navid.me)
- Link in bio: [navid.bio](https://navid.bio)
- Navid Media: [navid.media](https://navid.media)
- YouTube: [@thenavidm](https://youtube.com/@thenavidm?sub_confirmation=1) and [@thenavidai](https://youtube.com/@thenavidai?sub_confirmation=1)
- X: [@thenavidm](https://x.com/thenavidm)
- Instagram: [@thenavidm](https://instagram.com/thenavidm)
- LinkedIn: [thenavidm](https://linkedin.com/in/thenavidm)

## Dependencies

| Dependency | Version range | Used for |
| --- | --- | --- |
| `@modelcontextprotocol/sdk` | `^1.31.0` | MCP protocol and shared CLI bridge |
| `ajv` | `^8.17.1` | JSON Schema input validation |
| `ajv-formats` | `^3.0.1` | JSON Schema input validation |

Full third-party attribution is in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Development tooling and its audit limitations are documented in [SECURITY.md](SECURITY.md).

## License

AGPL-3.0-or-later, preserving the existing source license. See [LICENSE](LICENSE), the full [AGPL text](licenses/AGPL-3.0.txt) and THIRD_PARTY_NOTICES.md. Beehiiv service/documentation terms remain separate.

---

© 2026 [Navid Media](https://navid.media). Made with ❤️ by [Navid Moazzez](https://navid.me).
