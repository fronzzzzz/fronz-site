# Decile Hub API Surface & Bridge Architecture

Researched Aug 7, 2026

Technical analysis for building an AI-agent "bridge" between fund managers' AI agents and Decile Hub (VC fund management SaaS).

Source: full text of Decile Hub's public API documentation page — OpenAPI 3.0, "137 endpoints · 33 groups · 72 schemas" — saved at `agent-tools/45474db6-f9bf-4213-bfed-497182c01253.txt` (5,621 lines). Line references below point into that file.

---

## 1. API Surface Map (33 groups)

### Identity, access & platform

| Group (endpoints) | What it does | Lines |
|---|---|---|
| **Authentication** (1) | `GET /api/v1/whoami` — token introspection: the user it belongs to, account scope, token-level permissions, `account_user` role flags, and accessible pipeline IDs. Explicitly "useful for agents and integrations to introspect their own capabilities." Legacy API tokens are rejected with 403. | 13–25 |
| **Admin** (1) | `GET /admin/accounts` — lists accounts a Decile admin can reach (opted-in accounts + direct memberships, capped at 100). Requires the `X-Account-Id` header. | 27–45 |
| **Accounts** (1) | Current account's basic information. | 226–237 |
| **AccountUsers** (1) | Team-member roster; source of `assigned_id` values for prospect ownership. Zero-indexed pagination, page size 100. | 239–258 |
| **ActivityEntries** (2) | **The account-wide audit/change feed.** List endpoint is keyset-paginated (`page_token` cursor), newest first, filterable by subject (entity), curated event type, actor (`user_id`, or the literal `automation` for system events), and `created_after`/`created_before`. The detail endpoint returns the full per-type `entryable` body: audit change diffs, full email bodies and recipients, note bodies, AML/KYC status, chat summaries. | 260–312 |
| **Braintrusts** (6) | "Shared AI rooms" — built-in agent-to-human collaboration primitives: `notify` a member (non-blocking), `ask` a member (drops a Task in their Hub inbox), `share` external context with provenance (`claimed_source`), pull the room `digest`, rewrite the digest, and `capture_item` (action items/feedback). A natively blessed human-in-the-loop channel for agents. | 47–224 |
| **agent_platform** (1) | `POST /agent_platform/file_search` — semantic search returning ranked chunks from the account's data-room corpus plus conversation-scoped chunks. | 4305–4331 |

### Fund accounting & finance (the money layer)

| Group (endpoints) | What it does | Lines |
|---|---|---|
| **Entities** (5) | Funds, SPVs, holdings, management companies, general partnerships: list (filter by kind, active/hidden; 1-indexed, per_page cap 100), **create** (requires `full_access_account_admin`; suppresses onboarding side effects; explicitly **not idempotent** — "GET and check whether the desired entity already exists before retrying," line 346), show with optional `include=calculations` (fund dashboard values with elaborate fee-semantics warnings — see §2), **update** (kind immutable; 409 `organization_shared_with_siblings` renaming guard), and a structured Schedule of Investments. | 314–456 |
| **Capital Accounts** (5) | All read-only. Fund-level `capital_summary` (NAV/commitments/period activity; `partner_type` is **required** — LP-only vs GP-only vs all; fund-level "IRR, TVPI, DPI, RVPI and MOIC are deliberately absent and are not available from any agent-reachable endpoint," line 469). Per-LP capital account list (rich filters: KYC/AML flags, commitment ranges, admitted-date windows), single account with contacts/transfers, single-account period `calculations` (commitments, 15 period-activity ledger movements, per-account DPI/RVPI/TVPI), and a bulk calculations endpoint with fund-level totals. All numerics returned as decimal strings to preserve precision. | 457–611 |
| **Bank Transactions** (2) | Read-only, privacy-scrubbed imported bank transactions: "This endpoint cannot create, import, sync, update, reconcile, discard, or delete data" (line 616). Filters: provider, status, reconciliation status, date window, amount bounds, bank account. | 612–661 |
| **Journal Entries** (4) | List/show GL double-entry postings (filters: date window, debit/credit GL codes, reconciled/pending, amount bounds, polymorphic counterparty). **Create single** and **create bulk** (1–100 rows, all validated first, atomic all-or-nothing within one DB transaction) — but "Idempotency is the caller's responsibility — re-sending a batch posts it again" (line 738). Entries created unreconciled. Returns 403 for read-only tokens. This is the **only ledger write path** in the API. | 663–781 |
| **Accounting Accounts** (2) | Read-only chart of accounts / GL codes (1xxx assets, 2xxx liabilities, 3xxx equity, 4xxx revenue, 6xxx/7xxx expenses); used to validate codes before posting JEs. | 783–826 |
| **Capital Calls** (3) | **Read-only.** List calls (draft/open/closed) with per-LP wire line items (`lp_query` filter, `lp_details` embed capped at 25 rows with an explicit `lp_details_coverage` block so callers never mistake a filtered subset for fund totals), call header, and paginated per-LP detail rows: amount called, committed capital, wired amount/date, variance, derived `payment_status` (fully_paid/underpaid/overpaid/unpaid/prepaid/over_commitment). **There is no API to issue a capital call.** | 828–906 |
| **Financial Reports** (3) | Async job pattern: `POST` queues a report generation job (entity_type scope, report types or `all_reports`, period incl. custom ranges, xlsx or pdf — xlsx includes PAA/General Ledger/Journal Entries supplemental worksheets); poll via `status_url`; successful jobs carry download URLs. | 908–981 |

### CRM, fundraising & deal flow

| Group (endpoints) | What it does | Lines |
|---|---|---|
| **Directory** (14) | Organizations and People CRUD: list, bulk create, bulk update, single-record upserts (`POST /organization`, `POST /person`), show, update by ID, and append-only notes on both. | 1650–2137 |
| **Pipelines** (4) | Read-only pipeline list and detail (incl. `allowed_prospect_types`), pipeline `metrics` (current state + 7-day-ago snapshot), and creation of custom data points (account-wide fan-out). | 3074–3171 |
| **Prospects** (2) | Agent-native prospect creation — the doc calls `POST /prospects` "the moved-from-internal `create_prospect` agent tool" (line 2358). Type must match the pipeline's `allowed_prospect_types`; dedupe by email (Person) or name (Organization) so existing records are reused, never duplicated; email provenance rules (`email_source`: user_provided \| tool_verified \| document — "never one built from a name and a company domain," line 2362); Gmail deal-import triage routing (`sender_email`, `triage`, `deck_text`, `source_refs`). `bulk_create` (max 100, per-entry independent outcomes, partial success normal). **Both accept an `idempotency_key` (Redis SETNX, 24h TTL); run-JWT agent callers get one auto-derived from the run + request body** (lines 2433, 2477). | 2354–2487 |
| **PipelineProspects** (14) | List (with custom data points and Hub deep-link `url` per row), create, bulk update, single update, delete, upsert, append-only notes, attachments (list/attach/delete/download). Plus **pipeline action executions**: list pending automation actions as a tree of roots + children with resolved human-readable descriptions and per-type `target` blocks "so a caller (especially an agent / MCP client) can show the user *what the action would do* before triggering it" (line 2829); **preview** a pending `send_email` execution (renders without sending); **execute one action per call** — "This endpoint deliberately does not loop or bulk-execute — agent / MCP callers are expected to list pending executions, surface each action's resolved description to the user, and call this endpoint per confirmed action" (line 2871). Executing a root with pending children **cascades** through all children in order (line 2839). Action types include `send_email`, `move_to_stage`, `apply_tag`, `execute_job` ("raw class name; review before triggering"), `copy_to_pipeline`, and more. | 2489–3072 |
| **ResearchInvestors** (2) | Shared "Decile Research" LP roster (visible to every account) + async copy of selected entries into your own pipeline stage. | 2303–2352 |
| **Pacts** (2) | List signed PACTs (soft commitments / pledge agreements) with fuzzy signatory search, date windows, and account-wide aggregates (`total_pledged_amount_all_matches`, reportable sums) computed across all matches, not just the page. `POST /pacts/send_pact` mirrors the UI "Send PACT" button: moves the Person onto the Send PACT stage and dispatches the configured template. | 3740–3798 |
| **Lpas** (1) | `POST /lpas/send_lpa` — a heavyweight macro in one call: resolves investor + closing pipelines, moves the Person to the Closing stage, **creates or finds their capital account on the fund**, seats the closing-pipeline prospect on the Send LPA stage, and sends the LPA email (line 3884). | 3880–3908 |
| **Deal Shares** (6) | Share a deal into the Decile network feed (idempotent per organization), list/show/delete own shares, copy a shared deal into a pipeline stage, and AI auto-fill enrichment. | 3172–3348 |
| **Deal Memos** (6) | List, start, get, update memos; **submit for review**; **close**. | 3349–3599 |
| **PortfolioCompanies** (6) | Read-only: portfolio companies, per-company investment tranches (share counts as decimal strings, tax holding dates, FMV-exclusion flags), valuation history, and single valuation/investment lookups. | 3600–3739 |

### Communication, documents & workflow

| Group (endpoints) | What it does | Lines |
|---|---|---|
| **Emails** (4) | Template list/detail (with variable schemas), then a **two-step preview → send flow**. Preview resolves the recipient, renders the template, substitutes variables, and reports unresolved variables and blocker warnings plus a `ready_to_send` flag — without sending. Send requires `confirm: true` or it returns 422 `confirmation_required` — "by design, to prevent accidental sends" (line 4216). Supports scheduling (`scheduled_at`) and test-sends (`test_email_to_addresses`). | 4112–4259 |
| **Variables** (2) | Merge-tag variable picker, scoped per pipeline and per user (mirrors the email composer). | 4261–4303 |
| **Files** (11) | Data-room files: list, upload, show, update, download, save-to-folder (**content-idempotent** — same content + folder returns `status: unchanged`, line 1448), save CSV to folder, personalized links. | 1294–1549 |
| **Folders** (1 + search) | Folder list/create/show plus data-room folder search. | 1551–1648 |
| **Events** (8) | Events CRUD (create/show/update/delete), guest list, add guests, update RSVP. | 983–1292 |
| **Tasks** (6) | Account task management: list, create (rich `action_type`s including `review_approve`, `upload`, `sign`, `fill_form`, `make_payment`, `verify_identity`, `provide_tax_info`), get, update, complete. Plus `POST /tasks/{task_id}/decision` — a **non-compliant-wire compliance-review decision** endpoint: decline requires notes, "the original audit remains immutable," retries are idempotent only under exact-match conditions, and conflicting decisions return 409 (lines 2275–2301). | 2138–2301 |
| **Base** (8) | Decile Base community forum: inbox, channels, channel posts, create post/reply, show post, search posts/articles, download attachments. | 3910–4110 |
| **Search** (2) | Anchored + trigram-fuzzy search over people/orgs (returns `referred_by`, org affiliations, Hub deep links) and over pipeline prospects (returns pipeline/stage, `capital_commitment`, deep links). Rows carry `match: "strong"` vs `match: "fuzzy"` — "Confirm a fuzzy hit with the user before acting on it" (line 3804). Unscoped prospect search spans every readable pipeline; membership in a specific pipeline requires `pipeline_id`. | 3800–3851 |
| **Counts** (1) | Exact, filterable `COUNT(*)` per resource (people, organizations, entities, capital accounts, capital calls, PACTs), with per-fund breakdowns and `funds_counted`/`funds_total` honesty markers. | 3852–3878 |

---

## 2. Authentication, Eventing & Operational Model

### Authentication

- **Per-account API tokens.** Legacy tokens are rejected with 403 (line 17). `GET /whoami` returns the token's user, account scope, **token-level permissions**, the user's `account_user` **role flags**, and **accessible pipeline IDs** — the API is explicitly designed for agents to introspect their own capabilities before acting.
- **Read-only tokens** exist as a first-class concept: writes return "403 Forbidden (read-only token or insufficient permission)" (lines 705, 730, 2298).
- **Role gating** on sensitive operations: entity creation requires `full_access_account_admin` (line 348); task updates are permitted only for creator/assignee/owners/admins (line 2221); pipeline access is per-user (variables and prospect visibility are policy-filtered per user).
- **Admin scoping** via the `X-Account-Id` header for Decile-admin tokens (line 31); missing/unauthorized header returns 401.
- **Run-scoped agent JWTs**: the bulk prospect endpoint references "an agent (run-JWT) caller" that automatically receives a derived idempotency key per run (line 2477) — evidence Decile's own agent platform authenticates agent runs with dedicated short-lived tokens.

### Eventing: poll-only — no webhooks

**There are no webhooks anywhere in the spec** (zero matches for "webhook" across 5,621 lines). External systems **cannot subscribe** to changes; this matters a lot for an event-driven bridge. The substitute is:

- `GET /api/v1/activity_entries` — a keyset-cursored (`page_token`), newest-first audit feed filterable by `created_after`/`created_before`, subject type/id, curated event type, and actor including the literal `automation` (lines 262–293).
- `GET /api/v1/activity_entries/{id}` — full entryable bodies: audit change diffs, complete email bodies and recipients, AML/KYC status (line 297).

A bridge must therefore run a **poller** on this feed: freshness is bounded by poll interval, dedupe is on entry ID, and cursoring makes incremental sync cheap. `GET /pipelines/{id}/metrics` also offers a built-in current-vs-7-days-ago snapshot for coarse trend checks.

### Pagination — three inconsistent schemes (bridge should normalize)

| Scheme | Where |
|---|---|
| 1-indexed `page` + `per_page` (cap 100, default 50) | Entities, capital accounts, journal entries, bank transactions, capital calls, accounting accounts |
| 0-indexed `page`, fixed size | AccountUsers (100), tasks, financial reports (50), pacts (50), email templates (50), variables (50), search (15) |
| Keyset cursor (`page_token`) | ActivityEntries |

### Rate limits

**Not documented at all** — no 429 responses, no rate-limit headers mentioned anywhere. Assume limits exist server-side and build client-side throttling and backoff into the bridge.

### Idempotency — patchy, a real bridge concern

- **Has it:** prospects `create`/`bulk_create` (`idempotency_key`, Redis SETNX, 24h TTL; auto-derived for run-JWT agents); file save-to-folder (content-based); deal share (per organization); prospect re-add (no-op); action execute (422 `already_finalized`); task decision (exact-match retry only).
- **Lacks it:** **journal-entry bulk explicitly re-posts on retry** (line 738); entity `POST` is non-idempotent (line 346). The two most dangerous creates have the weakest retry safety.

### Semantic guardrails baked into the docs

The documentation repeatedly instructs agent callers how *not* to misread financial data — e.g., fee fields: "Nothing in the `fees` group is cash… `forecast_lifetime` … must never be described as fees charged, recognized, or owed" (line 371); fund-level IRR/TVPI/DPI/RVPI/MOIC "deliberately absent… Do not compute them from these figures" (line 469); capital-call header totals always cover every LP and are never narrowed by filters (line 840). A bridge should encode these rules as typed tool outputs.

---

## 3. High-Stakes Writes vs. Safe Reads

### High-stakes writes (bridge should approval-gate these)

| Endpoint | Why it's dangerous | Lines |
|---|---|---|
| `POST /entities/{id}/journal_entries` and `/journal_entries/bulk` | Direct general-ledger postings — money-books mutations. Bulk is atomic but **not idempotent** (retry double-posts). No platform-side approval step. The single most dangerous surface. | 701–762 |
| `POST /emails` | Sends real email to LPs/founders (or schedules it). Gated only by `confirm: true`. | 4212–4259 |
| `POST /pacts/send_pact` | Triggers a soft-commitment legal workflow + pipeline stage move + email in one call. | 3772–3798 |
| `POST /lpas/send_lpa` | Even bigger macro: stage moves, **capital account creation**, closing-pipeline seating, LPA email dispatch. | 3882–3908 |
| `POST /tasks/{task_id}/decision` | Approves/declines a **wire compliance review**; immutable audit; 409 conflict semantics. | 2275–2301 |
| `POST .../action_executions/{id}/execute` | Runs authored automations: `send_email`, stage moves, and `execute_job` (arbitrary background job class — "review before triggering"). Executing a root **cascades through all pending children** in one call. | 2865–2905, 2839, 2843 |
| `POST /entities`, `PATCH /entities/{id}` | Creates/renames legal entities (funds/SPVs). Admin-gated; create is non-idempotent. | 340–428 |
| `POST /deals/share` | Exposes deal data + attached files to the external Decile network feed. | 3174–3226 |
| `POST /deal_memos/{id}/submit_for_review`, `/close` | Advances/terminates investment-decision workflow states. | 3528–3599 |
| `DELETE` endpoints | Events, pipeline prospects, deal shares, prospect attachments — destructive. | 1157, 2699, 3274, 3029 |

**Medium tier (execute with logging, no hold):** directory/prospect creates and updates (dedupe-protected, largely reversible), notes (append-only by design), tasks create/update/complete, events create/update, file uploads and folder ops, Base posts/replies (visible to community), braintrust writes, research-roster copies, deal-memo start/update.

### Safe reads (mirror freely)

Everything in: Capital Accounts, Capital Calls, Bank Transactions, Accounting Accounts, Portfolio Companies, Pipelines (GETs), Pacts (GET), Search, Counts, ActivityEntries, Variables, Financial Reports (GETs), plus the GET halves of every other group. Notably, **capital calls, bank transactions, and capital accounts are read-only by construction** — the platform deliberately keeps call issuance and bank/wire mutation out of the API entirely.

---

## 4. Gaps → Bridging Opportunities

1. **No webhooks → the bridge owns change detection.** A poller on `activity_entries` (cursor + `created_after`) turned into a local event stream is the foundational service. Everything else — cache invalidation, "what changed since I last looked," push notifications to the manager's chat agent — hangs off it.
2. **No cross-session agent memory or replayable history.** The platform audits *its own* records (ActivityEntries), but nothing stores *what an agent read, believed, proposed, and did*. An append-only local event tree — every read snapshot, proposed write, approval, and executed call with response hash — provides replayability and accountability the platform cannot.
3. **No approval layer over the dangerous writes.** Journal entries post immediately; only email has a preview/confirm pattern, and action executions have preview + one-per-call discipline. The bridge can **generalize Decile's own two-step idiom to all writes**: proposed-write nodes held until a human approves — and the approval UX can ride Decile's own rails (`POST /tasks` with `action_type: review_approve` and a deep link, or a Braintrust `ask`).
4. **Idempotency ledger.** Wrap the non-idempotent writes (JE bulk, entity create) with bridge-side dedupe keys so agent retries never double-post the GL.
5. **Local mirror/cache of fund state.** Entities → capital accounts → calls → journal entries → portfolio is all fetchable but chatty (three pagination schemes, per-page caps, decimal-string parsing). A mirror gives agents fast, cheap, token-efficient reads plus point-in-time snapshots ("NAV as the agent saw it when it drafted the LP letter").
6. **Cross-referencing docs/email outside the platform.** The API sees only what's uploaded to Hub. A bridge can join Hub records against the manager's external mail/docs and write conclusions back as notes/files/activity — carrying provenance, matching the discipline the API already demands (`email_source` on prospects, line 2362; `claimed_source` on braintrust shares, line 136).
7. **Derived-metrics guardrails as typed tools.** Encode the doc's prohibition rules (no fund-level IRR, fee-basis semantics, coverage blocks) into pre-validated read tools so downstream agents can't misquote the numbers.
8. **Pagination/retry normalization.** One consistent cursor interface, automatic backoff, and full-scan helpers over the three pagination schemes.

---

## 5. MVP Bridge Architecture (MCP server + hierarchical event tree)

### Shape

A single MCP server that the fund manager's agent (Claude, OpenClaw, etc.) connects to instead of hitting Decile directly. Three internal parts:

1. **API client** — token management, pagination normalization, throttling/backoff, decimal-string-safe parsing.
2. **Event-tree store** — SQLite (or Postgres) with an append-only, hash-chained event log organized as a hierarchy.
3. **Policy engine** — risk-tier classification of every tool call and approval gates for tier-2 writes.

```
 Manager's agent (Claude / OpenClaw / Telegram / Discord)
                │  MCP tools
                ▼
 ┌────────────── Bridge MCP server ──────────────┐
 │ Policy engine: tier writes, hold for approval │
 │ Event tree (append-only, hash-chained):       │
 │   account                                     │
 │   ├── fund: "Fund I"          ← one subtree   │
 │   │   ├── state/  (mirror: CAs, calls, JEs,   │
 │   │   │            portfolio, NAV snapshots)  │
 │   │   └── events/ (append-only)               │
 │   │       ├── read    #101 capital_summary ✓  │
 │   │       ├── propose #102 JE bulk (3 rows) ⏳ │
 │   │       ├── approve #103 by GP via Hub Task ✓│
 │   │       └── write   #104 POST …/bulk → 201 ✓│
 │   ├── fund: "SPV Alpha" …                     │
 │   └── crm/  (pipelines, prospects, emails)    │
 │ Poller: GET /activity_entries (cursor) ───────┼──► reconcile mirror,
 └───────────────┬───────────────────────────────┘    detect external edits
                 ▼  HTTPS, API token
            Decile Hub API (poll-only, no webhooks)
```

### Tree design

- **One subtree per fund entity** — matches the API's `entity_id` scoping (journal entries, capital accounts, calls, bank transactions all hang off an entity). Plus a `crm/` subtree for account-level resources (pipelines, prospects, directory, emails) and an `account/` root for settings/users.
- **Every MCP tool call appends an event node** under the relevant subtree:
  - `read` nodes — endpoint, params, response snapshot hash, summary (cheap to store, enough to replay "what did the agent know").
  - `propose` nodes — the exact would-be request body of a tier-2 write, risk tier, human-readable diff.
  - `approve` / `reject` nodes — reference the proposal, record the decision channel (Hub Task ID or braintrust message) and the human actor.
  - `write` nodes — final request, response, and the resulting **ActivityEntry ID** (closing the loop with Decile's own audit feed).
  - `external_change` nodes — appended by the poller when the activity feed shows an edit the bridge didn't make.
- **Hash-chain** each fund's log (each node stores the previous node's hash) for tamper evidence; export as JSONL for replay.

### Approvals & audit flow

- **Tier 0 (reads):** pass through, logged as `read` nodes; served from mirror when fresh.
- **Tier 1 (reversible CRM writes):** execute immediately with logging (notes, prospects, tasks, events, files).
- **Tier 2 (JEs, email sends, PACT/LPA, action executions, entity create/update, deletes, wire decisions, deal shares/memo transitions):** create a `propose` node, then surface the approval **through Decile's own rails** — `POST /api/v1/tasks` with `action_type: review_approve` and a `deep_link_url` to the bridge's diff view, or a Braintrust `ask`. The write fires only on approval, using a bridge-generated idempotency key; the response and new ActivityEntry ID complete the chain.
- This is a generalization of Decile's own design language: emails already require preview → `confirm: true`; action executions already require list → preview → one-confirmed-execute-per-call.

### 15-minute demo script for a fund manager

1. **(2 min) Instant answers from the mirror.** "What's Fund I's LP-only NAV, and who's underpaid on the last capital call?" — answered in seconds from the local mirror with per-LP variance/`payment_status`, citing snapshot time.
2. **(4 min) Proposed journal entries.** Agent reconciles recent bank transactions against the GL and drafts a 3-row journal-entry batch. The bridge **holds it** as a proposal; a `review_approve` Task appears in the manager's Hub inbox with a diff link.
3. **(3 min) Approval → atomic write.** Manager approves; the bridge posts the atomic bulk JE with an idempotency guard; the new activity entry appears in the poller feed; the event tree shows the full read → propose → approve → write chain.
4. **(3 min) External-change detection.** Manager edits a capital account in the Hub UI; within one poll cycle the bridge flags the external change, reconciles the mirror, and notes it in the tree.
5. **(3 min) Replayable audit.** Export the fund's event log: "everything the agent ever saw, proposed, and did — per fund, hash-chained, exportable" — and show a simulated retry of step 3 being blocked by the idempotency ledger.

---

## 6. Open Claw / OpenClaw × Decile Hub

Decile has **already blessed exactly this integration pattern** — personal agents holding a Hub API/MCP token:

- Decile announced "**Decile Hub is now OpenClaw ready**" (April 2026): "Everything you can do in Hub's interface, you can now do through a chat agent on your phone" — pipeline updates, personalized emails factoring tone/history/notes, event creation, automatic deal scoring, conversational fund modeling. [Decile Group on LinkedIn](https://www.linkedin.com/posts/decilegroup_vc-lab-event-decile-hub-ai-open-claw-for-activity-7445500355620003840--O_9)
- OpenClaw is an agentic AI OS that fronts chat surfaces — **Telegram, Discord, WhatsApp, iMessage** — and drives Hub through its full API/MCP. Signature demo: a GP photographs a business card at a conference → contact created in the investor pipeline → personalized outreach email sent before they're back at the hotel. [VC Lab: Agentic VC](https://govclab.com/2026/04/21/agentic-vc-leading-the-ai-revolution/), [VC Lab: Agentic Fund Admin](https://govclab.com/2026/04/21/agentic-fund-admin/)
- Setup is self-serve: **Hub Settings → API, with MCP recommended for agents** and the OpenAPI spec downloadable from the docs page. [Decile forum: bulk import prospects](https://decilegroup.com/posts/137283-is-there-a-way-to-bulk-import-prospects-into-decile-hub)
- A [VC Lab webinar (Hub Voice & AI Agents)](https://www.youtube.com/watch?v=-5VoFT-x3-U) demos Hub Voice and OpenClaw workflows and states "everything our API can do, our MCP can do," with the surface expanding rapidly.

**Implication for the bridge:** OpenClaw covers the *interface* layer (chat control of Hub) but — like Decile's own MCP — is stateless pass-through against the API: no local mirror, no independent audit trail of agent behavior, no approval gating beyond the API's built-in `confirm` flags, and no change subscription (impossible anyway, since the platform is poll-only). The bridge's differentiation is precisely the **state / audit / approval layer** sitting between any such agent and the API — and it can present itself to OpenClaw or Claude as just another MCP server, riding the exact integration path Decile already promotes.
