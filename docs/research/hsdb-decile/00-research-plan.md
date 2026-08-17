# Research Plan & Index — HSDB × Decile Hub Opportunity

Started Aug 7, 2026 · Stacey Fronek / Fronz

## Goal

Build enough in-depth product and market knowledge to (1) bridge the technical
gap on Kyle Smith's Hierarchical Script Database (US Patent 12,664,142), (2)
gain working fluency in the Decile Hub / emerging-VC fund administration
domain, and (3) support pitch and GTM material development for a potential
collaboration.

## Research questions

1. **Product**: What exactly does the patent claim, how does the technology
   work mechanically, what software actually exists today, and what are the
   honest technical strengths and objections?
2. **Domain**: What does an emerging fund manager's operational life look
   like, who is Decile Group / VC Lab / Decile Hub, how do they make money,
   and who competes with them?
3. **Integration surface**: What can the Decile Hub API actually do, where
   are its gaps, and what would a minimum viable "bridge" product look like?
4. **Market timing**: Where does this land in the 2026 agent-infrastructure
   and agentic-fund-ops landscape?

## Document index

| File | Contents |
|---|---|
| `01-product-hsdb.md` | Patent mechanics in plain language, inventory of what software actually exists, honest technical assessment, comparisons vs. git/event-sourcing/SQLite/agent-memory tools, 9 analogies, sourced quotes |
| `02-fund-admin-domain.md` | Emerging-manager primer (full fund lifecycle: formation, 506(b)/(c), capital calls, waterfalls, K-1s, ERA/SEC obligations), Decile ecosystem deep-dive, competitor pricing table, opportunity surface with documented user complaints |
| `03-decile-api-bridge.md` | All 33 API groups mapped, auth/eventing model (poll-only, no webhooks), high-stakes vs. safe endpoints, 8 bridging gaps, MVP MCP-bridge architecture with event tree + 15-minute demo script |
| `04-explainers.md` | Synthesis: ELI15 and colleague-level explanations of the product, the market, and the combined opportunity |
| `05-involvement-pitch-options.md` | Four pitch options for Stacey's involvement (paid Jam → demo sprint → fractional GTM → deferred co-build), scripts, gates, recommended play |
| `06-gtm-draft.md` | v0 GTM: positioning, ICP, messaging pillars, pricing hypotheses, channels, demo storyboard, and the C1–C7 / D1–D7 blockers to finalize |

## Key findings (synthesis)

1. **The patent is real and well-drafted; the product is not shipped.** The
   kernel is proprietary and unpublished. Public evidence = YouTube demos, a
   stripped-kernel open-source repo, one interactive browser object. Honest
   framing: "granted patent + video-proven prototype," never "existing product."
2. **The 2019 priority date is the strategic asset.** The claims (records as
   executable script files, event-grown trees, intrinsic audit trail,
   lay-stakeholder transparency) sit under the file-first AI-agent-memory
   category that boomed in 2025–26. Kyle is already repositioning there
   himself (MetaGit "Living Filesystem", ERC-7827).
3. **Decile Hub is genuinely agent-forward but structurally incomplete.**
   137-endpoint OpenAPI built for agents, OpenClaw chat control officially
   blessed — but poll-only (no webhooks), no approval layer over
   general-ledger writes, non-idempotent money writes, no independent record
   of what an agent read/proposed/did, and approvals living in consumer chat
   apps.
4. **The bridge concept is validated by both sides' own behavior.** Decile's
   API guardrails (one-action-per-call, withheld IRR, read-only capital
   calls) show where they don't trust automation; Juniper Square's Fay
   (Series D at $1.1B, "Admin Oversight Agent") proves the "AI oversight for
   fund ops" category commands enterprise budgets upmarket. Nothing like it
   exists at Decile's price point.
5. **Regulatory hook**: ERAs are subject to SEC books-and-records and
   examination authority. When agents generate the communications and
   actions, the agent's decision trail arguably becomes part of the record —
   a hash-chained local audit tree is a compliance story, not just a
   convenience.

## Open questions (for the Kyle call)

- Funding: amount, source, wired or promised?
- Decile relationship: customer, partner, or observed opportunity? Any
  contact with Decile the company?
- Kernel status: what runs today, last commit, willingness to open-source or
  license?
- Licensing philosophy for the patent (open-source pledge vs. dual license)?
- Who else is involved? What was the original "disk image structure" scope?

## Next steps

- [x] Pitch narrative + positioning drafts → `05`, `06`
- [x] GTM one-pager: ICP, wedge, pricing hypothesis, channels → `06`
- [x] Demo storyboard based on the 15-minute script in `03` → `06` §6
- [ ] Brainstorm pass with Stacey; lock name, one-liner, pillar order
- [ ] Kyle call: run the C1–C7 clarification list from `06` §7
- [ ] Close D1–D7 development items before any public material ships
