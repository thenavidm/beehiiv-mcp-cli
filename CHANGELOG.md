# Changelog

## 3.0.1, 2026-10-05

- **A refusal and the approval form say what the call can do again.** 3.0.0 said every confirmed call "is public or cannot be undone", Slipway's words for a call it knows nothing more about. Both say again what 2.0.1 said, that the call may affect delivery, audience membership or irreversible state, and a test holds them to it.
- **Built on Slipway 0.1.17**, which a fresh install of 3.0.0 already used. Since the Slipway 3.0.0 was measured on, `which` prints a title once where a description opens with it and reads an argument by its own words, and the general help counts the tuning settings instead of naming them, with `agent-context` describing each.

## 3.0.0, 2026-10-05

Built on [Slipway](https://github.com/thenavidm/slipway) 0.1.13. The 117 tools keep their names and arguments, and every difference below was measured against 2.0.1, the last version on npm, before release.

- **A tool list a fifth the size.** 2.0.1 advertised 1.77 MB of schemas: the four post tools spelled out the parts of all 33 block types wherever they appeared, and twice over, as their own fields and inside `payload`, so `create_post` alone was 387 KB. 3.0.0 writes each repeated part once under `$defs`, and nothing is lost: Claude Code and Codex both read fields that appear only there, validation still checks the full schema, and the CLI's flags are unchanged. With every tool loaded, Claude Code now spends 138,012 tokens on the list instead of 655,428; with tool search, its default, 2,010 as before.
- **A person approves each write over MCP.** All 47 writes still need confirmation. Claude Code (2.1.246 and later) shows its own prompt, and a client that can show forms asks with an approval form whose one box starts unticked. Approvals are signed, bound to the exact call and work once. Where a client can do neither, the model's `confirm: true` still counts, and `BEEHIIV_CONFIRM=model` makes it enough everywhere. The audit log records who approved each write.
- **`BEEHIIV_ALLOW_DESTRUCTIVE=0` still refuses every write**, confirmed or not, as 2.0 did.
- **Beehiiv's status picks the exit code.** A body Beehiiv rejects (400 or 422) exits 2 instead of 5, and a deleted resource (410) 3 instead of 5. 401 and 403 still exit 4, 404 3, 429 7, a server error 5, and an unknown account or nothing configured 10. 1 now means an unexpected error. A network failure says so in `details.reason`.
- **`which <words>` finds a command**, and `agent-context` describes every command, flag and setting as JSON. In Codex 0.159.3, finding the command that creates a draft post took a median of 84,440 input tokens over the CLI instead of 86,352 (five runs each), because Codex asked `which` instead of reading the full command list.
- **`install <client>`** adds the server to Claude Code, Codex, Claude Desktop, Cursor, VS Code or Gemini CLI in each one's own format, and **`beehiiv-mcp --http`** serves the same tools over Streamable HTTP, on 127.0.0.1:8787 unless told otherwise.
- **Much less work to start.** The validators for the 117 input schemas compiled at load in 2.0; each now compiles on its first use, and the entry turns on Node's compile cache. The server spends 309 ms of CPU before its first answer where 2.0.1 spent 1,675, and answers in 181 ms of wall time instead of 1,141 (median of 21 runs, taking turns on one busy Mac). npx installs 10 dependencies instead of 94. A test still compiles every schema.
- **Docs.** README section 7 has the measured Claude Code and Codex costs, where 2.0 said they were pending; the version table says 3.0.0, where it still said 2.0.0; the settings table lists Slipway's own settings; and the example for `get_complimentary_access` names the command correctly, where it read `get-complimentary-acces`.

### Upgrading

Over MCP, expect an approval prompt or form before any write; a headless agent that should write with `confirm: true` alone needs `BEEHIIV_CONFIRM=model`. A script that read exit 5 as a rejected body should read 2, and as a deleted resource 3. An error's JSON keeps `error` and `status`; its `code` is now Slipway's (`usage`, `auth`, `not_found`, `rate_limited`, `api`, `not_configured`), and Beehiiv's own moves to `details.reason` when it says more. Over MCP, an argument that fails the schema comes back as the MCP SDK's own message, "Input validation error: …", instead of JSON. With `BEEHIIV_READ_ONLY=1`, a client that calls a hidden write gets "tool not found" instead of a refusal naming `BEEHIIV_READ_ONLY`; the CLI still names it. The audit log's lines gain `confirmed_by`, and each allowed write is followed by a `done` or `failed` line. A script that pipes JSON-RPC into the server must keep stdin open until it reads the answer: the server now stops when its input ends, as the MCP stdio binding asks. `--http` refuses a page from another site unless `BEEHIIV_HTTP_ALLOWED_ORIGINS` lists it. Some terminal screens grew: the general help by 191 tokens, for `which`, `install`, the flags and the exit codes it now lists; the command list by 18; `create-post --help` by 22; and a missing argument's error by 16, for its code and a hint. `SKILL.md` is 60 tokens longer in Claude Code, because it says how approval works over MCP and lists every exit code.

## 2.0.1, 2026-10-04

- **`npx -y @thenavidm/beehiiv-mcp-cli` starts the MCP server whatever order npm keeps.** npx starts whichever binary the npm registry lists first when they share one file, and the registry does not keep the published order. For this package that happened to be the server; for 23 others it was the CLI. A third binary named after the package, on its own file, now always starts the server, and npx picks it by name.

Use the native terminal capture at 1040 source pixels with lossless GIF optimization, displayed at 520 pixels, matching the Bluesky/Substack reference. Original assets remain available.

Semantic versions; newest first. npm, manifest and annotated release tags agree.

## 2.0.0 - 2026-10-02

### Added

- Current pinned v2 schema: 116 operations plus private account labels, 117 tools/commands with 70 reads and 47 confirmed writes.
- Shared house task CLI, doctor/login, schema/help/agent output, private named accounts and OAuth token-file refresh.
- Desktop packaging with production dependencies and sensitive/private user settings.
- Native bounded cursor retrieval; explicit deprecated offset inputs; async post state and Retry-After preserved.
- Full reference README, accordion FAQs, client/OS installation, skill, comparisons, version/history/security/contribution docs, topics and keywords.

### Changed

- Send API eligibility reviewed as Pro/Enterprise; draft is the create default. Exactly one content method; nonempty partial updates; explicit delivery confirmation.
- Bearer key/OAuth auth, own client registration, form-encoded refresh and endpoint scope metadata.
- Every mutation requires confirmation and has zero automatic retries. GET retries remain bounded.
- Preserve existing AGPL-3.0-or-later license and useful legacy tool names only for current endpoints.

### Migration

- Old source was MCP-only. Do not copy private original history/account instructions into public files.
- Replace unsupported email-blast helpers with current post workflows and newsletter-list inputs.
- Publication IDs are explicit tool inputs; private account labels select credentials independently.
- Current schemas, plan restrictions and OAuth scopes replace stale legacy assumptions.

### Validation

- Local build/typecheck, 29 meaningful fixture/shared-CLI checks and actual 117-tool discovery passed. Public package/bundle installation and release CI are recorded after publication.
- Actual provider account writes, desktop GUI and fresh model-token/task benchmarks remain pending. No superiority percentages claimed.

## 1.0.0 - private legacy source

Earlier MCP-only integration. Original private history remains private; this is migration context, not a public v1 npm release claim.
