# Changelog

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
