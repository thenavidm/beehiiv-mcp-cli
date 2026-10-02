# Beehiiv alternatives and scope

Reviewed October 2, 2026. Compare actual workflows and permission eligibility. The local implementation is not published yet; its local discovery contains 116 pinned v2 operations plus `list_accounts`: 117 tools, 70 reads and 47 confirmed writes. This does not establish a larger feature set than Beehiiv's hosted MCP.

| Offering | Surface | Reviewed scope | Tradeoff |
| --- | --- | --- | --- |
| [Official Beehiiv account MCP](https://www.beehiiv.com/support/article/39255979546263-getting-started-with-the-beehiiv-mcp) | Hosted MCP at `https://mcp.beehiiv.com/mcp` | Account reads on all plans; writes on paid plans, with existing role permissions | Hosted setup and UI operations beyond the API; excludes publishing/scheduling/sending posts and activating automations |
| [Developer documentation MCP](https://developers.beehiiv.com/) | `https://developers.beehiiv.com/_mcp/server` | Read developer documentation | Does not operate an account |
| This implementation | Local stdio MCP, shared task CLI and released desktop bundle | Documented v2 operations, private named accounts, bounded native cursor retrieval, write guards and no automatic mutation retries | Local configuration/maintenance; endpoint scopes and plans apply; live account outcomes pending |
| [deldrid1/beehiiv-cli](https://github.com/deldrid1/beehiiv-cli) | Community Go task CLI | OAuth, operating-system credential storage and task commands; distribution includes Homebrew and Windows routes | Already a useful CLI alternative; compare requested commands and output rather than declaring CLI absence |
| [Official TypeScript SDK](https://github.com/beehiiv/typescript-sdk) | `@beehiiv/sdk`, public beta | API client for application code | Different interface from a task CLI; review the SDK's version and request retry policy for writes |

## Account MCP versus the API

The official account MCP includes UI surfaces such as templates, segment conditions, signup flows, products, advertising, podcasts and website administration. An OpenAPI wrapper is not automatically a superset of those capabilities. Its tool count is not evidence of greater coverage.

The current API supports post creation through the [Send API](https://developers.beehiiv.com/api-reference/posts/create). Eligibility is Pro/Enterprise, replacing the old repo's stale Scale-plan description. Supported API creation/scheduling is a potential workflow difference from the official account MCP's stated restrictions. It still needs the correct account permissions and a live account check. No actual email delivery, latency advantage or reliability percentage has been measured for this wrapper.

## Authentication and limits

Create personal API keys under Workspace Settings > API, using [the current key instructions](https://developers.beehiiv.com/welcome/create-an-api-key). Keys can be restricted to publications. An out-of-scope publication can return 404; this is not proof it does not exist. Workspace-level privacy deletion requires appropriate workspace access.

[OAuth](https://developers.beehiiv.com/oauth2) is separate. Register your own client through Beehiiv support; the initial consent flow uses PKCE. The wrapper does not borrow another CLI's client ID or provide a hosted callback. Token refresh uses the documented form-encoded exchange at `https://app.beehiiv.com/oauth/token`. API operations use `https://api.beehiiv.com/v2` and Bearer authentication for both keys and OAuth.

[Current API rate limits](https://developers.beehiiv.com/welcome/rate-limiting) are plan dependent: Free 30, Lite 180, Pro 500 and Enterprise 800 requests per minute. The wrapper defaults to a conservative 2,000 ms spacing and exposes a pacing override; other processes sharing the credential still count. These are API limits, not an assumed hosted-MCP tool allowance.

## Requests, drafts and asynchronous completion

Create a post with exactly one of structured `blocks` or HTML `body_content`. This implementation defaults to `status: draft` and refuses a schedule on a draft. A confirmed write is still needed. Current create returns an accepted asynchronous post ID; an existing post read may return HTTP 202 and Retry-After while processing. A 404 with POST_CREATION_FAILED is failure, not permission to submit the same newsletter again.

Mutating POST/PUT/PATCH/DELETE requests have zero automatic retries, including timeouts and 429. This is a documented safeguard, not a claim that competing software is unsafe. Read GET retries are bounded. Review the current SDK/CLI behavior directly before making a comparison.

[Pagination](https://developers.beehiiv.com/welcome/pagination) recommends cursors, but the reviewed schema exposes cursor input on only 13 operations. This wrapper offers `all_pages` only on those operations. Other documented offset endpoints retain explicit deprecated `page` input, bounded to page 100. General pagination prose does not justify inventing cursor support for every endpoint.

Webhook management is available on eligible Lite+ accounts. Retrieve signing secrets privately from the Beehiiv UI and verify signatures in your own receiver. The wrapper does not deploy a receiver or return a generated signing-secret file.

## Evidence and future benchmarks

Local build/typecheck, 29 controlled HTTP/shared-CLI checks and actual stdio discovery have passed. Fixture tests validate construction, guards, retry policy, form-encoded refresh and pending post responses. They do not establish live account success or sending eligibility. Public npm, desktop GUI, hosted official MCP handshakes and matched token/task benchmarks are not yet completed for this integration.

Compare the same authorized publication task with our CLI, our MCP, the official account MCP and the community CLI when that task is supported. Fix client/model/package versions, date, loading mode, account, requested output fields and completion criteria. Report actual API input/output/cache usage and latency, separating schema loading from full task cost. Never use character-count estimates or an unmatched tool-count comparison as a token savings percentage.

## Pinned source

The exact API source URL, version, date, SHA-256, operation count and reviewed corrections are recorded in [api-source.json](src/tools/api-source.json). The API and OAuth snapshots are checked into scripts for reproducibility. Re-read current documentation before the next release; discovery of a new endpoint is not a completed implementation review.
