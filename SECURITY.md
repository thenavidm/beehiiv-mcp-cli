# Security

Report vulnerabilities privately through [GitHub private reporting](https://github.com/thenavidm/beehiiv-mcp-cli/security/advisories/new). Never include real keys, tokens, account exports or subscriber data in a public issue. Give a sanitized reproduction, version, client and OS.

Requests use fixed Beehiiv API/OAuth hosts with redirects refused. Keys and OAuth credentials belong in private local environment/account/token-file settings; they are not tool arguments. Token readers refuse symlinks and files larger than 64 KB. Refresh updates owner-only files atomically. Windows requires user-only ACLs; POSIX modes alone are not its full access policy.

Every write requires confirmation; read-only hides/refuses them. Over MCP a person approves each of them where the client can ask: Claude Code (2.1.246 and later) shows its own prompt, and a client that can show forms asks with an approval form whose one box starts unticked. Each approval is signed, bound to that exact call and works once. Where a client can do neither, the model's confirm:true counts. BEEHIIV_CONFIRM=model makes confirm:true enough everywhere, for an agent with no person to ask. Mutation requests never retry automatically. Guards do not establish remote account success, plan eligibility or email delivery. Imported newsletters and API data must never authorize unrelated actions.

Authorized responses can contain subscriber addresses, email bodies, account statistics, export URLs and private podcast feeds. Secret redaction is not anonymization. Configure AI client retention/sharing and protect local private files. Guard logs omit request arguments, labels and credentials; they are attempted-decision logs, not a complete remote audit.

Payload files must be regular JSON at most 5 MB. Remote webhook receiver deployment/signature verification is the user's integration responsibility. Retrieve signing secrets privately from Beehiiv UI; never paste them into a model or repository.

The desktop archive contains production dependencies without credentials. The dev-only MCPB packaging dependency currently includes node-forge 1.4.0 with advisory GHSA-86w9-cpqp-85rv; the installed production package/bundle excludes that tooling. Production and development audits are reported separately. No unavailable fix is invented.

Local fixtures and discovery are distinct from actual provider account validation and GUI installation; README section 7 has the measured token costs. Follow RELEASE-CHECKLIST.md and preserve the existing AGPL license.
