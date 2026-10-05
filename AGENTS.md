# Beehiiv MCP server and CLI

Read INSTALL.md, SKILL.md and COMPARISON.md. Follow the current Bluesky/Substack
framework and the shared MCP/CLI skill. Preserve AGPL-3.0-or-later licensing.

The public v2 branch is sanitized. Legacy personal account instructions and
private source history stay on the local legacy/private-source branch and in
the old account. Never push that history to the new public remote.

Both binaries come from one operation registry through
[Slipway](https://github.com/thenavidm/slipway), which builds the MCP server
and the CLI; `src/app.ts` hands it the tools. Generate schemas from the official OpenAPI snapshot; review recorded
overrides and current docs before syncing. Do not guess plan-specific limits, async post creation, pagination or OAuth scope eligibility. Never retry a mutating API request
automatically. Confirm audience changes, publishing, sending and deletions.

Never expose credentials in tool arguments, errors, stdout, audit records,
source, package or bundle. Webhook signing secrets are configured privately from the Beehiiv UI, never returned to the model. Keep every advertised client, feature and count factual.

Before release: build, typecheck, behavior tests, actual discovery/counts,
clean package and desktop checks, source/history/artifact secret scans and
complete README/INSTALL/SKILL/CHANGELOG/topics/keywords/release/CMS review.
Use the configured maintainer commit identity.

Use the correct Bluesky/Firefly README layout, with details/summary accordion FAQs. Follow RELEASE-CHECKLIST.md for every update. Keep official Beehiiv account MCP and developer-docs MCP distinct. A community task CLI already exists; do not claim we fill an empty CLI market. Official MCP has UI capabilities absent from the API; eligible Send API creation/scheduling is a distinct scope, not proof of overall superiority.
