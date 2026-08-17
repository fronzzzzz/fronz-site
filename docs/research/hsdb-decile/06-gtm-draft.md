# Initial GTM Materials — Agent Audit Bridge for Fund Ops

Drafted Aug 7, 2026 · v0 for brainstorm · basis: `01`–`04`
Status: DRAFT — blocked items listed in §7 must close before any of this is
final or public.

---

## 1. Positioning

**Category:** agent oversight / audit infrastructure for fund operations
(NOT "a database," NOT "agent memory" — those categories are crowded and
commoditized; oversight is where the budget and urgency live, per Juniper
Square's Fay at the enterprise tier).

**One-liner (working):**
> Decile made fund ops agentic. We make agentic fund ops auditable.

**Positioning statement:**
> For emerging fund managers who let AI agents run their operations, the
> Bridge is a flight recorder and approval layer that captures everything an
> agent reads, proposes, and does — as a tamper-evident, human-readable
> record you can show an LP, an auditor, or the SEC. Unlike platform logs or
> chat-app approvals, the record is yours: local, permanent, and readable
> without a programmer.

**Name candidates (all need trademark/domain checks):**
- *Flight Deck / Flightline* — flight-recorder metaphor, approval "deck"
- *Provenance* — what the product literally provides
- *Ledgerline* — fund-ops native
- *GlassBox* — the patent's own black-box-vs-glass-box thesis
- Descriptive fallback: *Agent Audit Bridge*

**The patent narrative (press/deck layer, not homepage):**
> Filed January 2019. Granted June 2026. A database where every record is a
> readable file that logs its own history — patented five years before AI
> agents made it necessary.

## 2. ICP and audience map

**Primary ICP:** Decile Hub Premium / Decile Partners fund managers already
using agent features (OpenClaw, agent toolkits). Fund I–III, $5–50M, solo GP
or 2-person team, no ops staff. They already pay $25K+/yr for admin and
already let agents touch their books — the trust gap is live, not
hypothetical.

**Secondary:** VC Lab cohort members pre-fund (land early, free tier,
grow with them — mirrors Decile's own funnel).

**Tertiary (later):** agent-forward managers on Carta/AngelList; the
agent-developer ecosystem (open-source core adoption).

**Buying trigger moments:** first capital call with agent involvement; first
LP operational-due-diligence questionnaire; SEC exam notice; an agent
mistake (theirs or a peer's horror story).

## 3. Messaging pillars

**Pillar 1 — The flight recorder (fear of the irreversible).**
Agents now draft your capital calls and post to your ledger. The GL write
path has no approval step and double-posts on retry. When something goes
wrong, "the AI did it" is not an answer.
*Proof points: Decile API docs (JE non-idempotency, one-action-per-call
guardrails); OpenClaw security warnings; capital calls as the canonical
irreversible action.*

**Pillar 2 — The regulator (books and records).**
As an ERA you're subject to SEC recordkeeping and examination authority.
When agents generate your notices, memos, and LP emails, the agent's
decision trail *is* part of your record. Own it — hash-chained, exportable,
readable.
*Proof points: Advisers Act §204; ERA best-practice record lists; the
activity feed living only in Decile's cloud, behind Premium.*

**Pillar 3 — The LP (Fund II depends on trust).**
LPs who catch report errors don't re-up. Show them provenance instead:
every number traceable from statement back to ledger event and approval.
"Fay for the rest of us" — what $1B GPs buy from Juniper Square, at
emerging-manager scale.
*Proof points: Juniper Fay positioning and claims; quarterly reporting as
top re-up factor.*

## 4. Offer & pricing hypotheses (test on design partners)

| Tier | What | Price hypothesis | Anchor |
|---|---|---|---|
| Open core | MCP bridge + local event tree, self-hosted | Free (community/distribution engine) | Kyle's open-source stewardship intent |
| Fund tier | Managed bridge per fund: approvals UX, mirror, poller, exports | $200–400/mo per fund entity | 1–2% of existing admin spend; below "ask my LPs" threshold |
| Audit tier | Hash-chain attestation, examiner/LP export packs, multi-entity | $500–900/mo or $5–8K/yr | K-1/audit line-item norms |
| Design partners (first 5) | Free/at-cost + public case study + roadmap input | — | Category-creation phase |

Open question: whether Decile Premium requirement (API access) constrains
the funnel — the bridge only works for Premium/Partners customers, which is
also exactly the segment with money. Possibly a plus.

## 5. Channels

1. **The Decile door (highest leverage, one shot):** pitch as complementary
   trust infrastructure that makes their agentic story enterprise-safe.
   Possible outcomes: blessed integration listing, co-marketing to VC Lab
   cohorts, or acquisition interest. Requires positioning + demo first.
2. **VC Lab / Decile Base community:** where the ICP already congregates;
   helpful-expert content, not ads.
3. **AI discoverability (Groundswell applied to ourselves):** own the
   answers to "is it safe to let AI run my fund ops," "AI agent audit
   trail," "SEC books and records AI agents." Category is new; consensus is
   unclaimed. This is Stacey's own practice run as case study.
4. **Agent-developer ecosystem:** the open core as an MCP server others
   embed; hackathons (Kyle's existing EthGlobal/SensAI circuit).
5. **Emerging-manager media:** VC Beast, Capitaly, fund-admin comparison
   blogs — the places our own research kept landing; they take guest
   analysis.

## 6. Demo storyboard (sales asset, from `03` §5)

1. Ask the agent: "Who's underpaid on the last capital call?" — instant
   answer from local mirror, with snapshot timestamp cited.
2. Agent reconciles bank transactions, drafts a 3-row journal entry batch —
   **held as a proposal**, approval task appears in the manager's own Hub
   inbox with a diff link.
3. Manager approves → atomic write with idempotency guard → event tree shows
   read → propose → approve → write, closed-loop with Decile's activity ID.
4. Manager edits something in Hub UI → bridge detects the external change on
   next poll, reconciles, logs it.
5. Export the fund's audit chain as one file; retry the write and watch the
   idempotency ledger block the double-post.

Tagline over the closing frame: *"Everything your agent saw, proposed, and
did. Per fund. Tamper-evident. Yours."*

---

## 7. BLOCKERS — clarify or develop before pitch/GTM can finalize

### Must clarify (questions, mostly for Kyle; some for Decile)

| # | Item | Why it blocks |
|---|---|---|
| C1 | **Kernel status**: does `syn()`/`tie()` run today on current Node? Last commit? Test coverage? | Determines Option 2a vs 2b (live vs concierge demo) and the entire build timeline |
| C2 | **Licensing posture**: open core + patent non-assertion pledge? Dual license? | Channel 4 and the free tier are impossible to market around an ambiguous patent threat; devs will ask on day one |
| C3 | **Funding reality**: amount, source, wired? | Gates Option 3; sets whether pricing/pace is bootstrap or funded |
| C4 | **Decile relationship**: any actual contact with Decile Group? Is he a Hub user? Premium? | Channel 1 is one-shot; we need to know if the door is warm, cold, or already opened badly |
| C5 | **Patent scope / FTO**: does a bridge that stores events in SQLite (per the `03` MVP sketch) even practice the patent's claims (script-file nodes)? Or must the event tree literally be script files for the patent story to be true? | The marketing narrative ("patented foundation") must match what we ship, or it's puffery with legal risk |
| C6 | **Freedom to operate**: any competing patents in agent-audit space (Juniper Square filings?) | Standard diligence before public category claims |
| C7 | **Who else is committed** (advisors, EIR, collaborators; the original four-person thread scope) | Cap table / credit hygiene before any equity discussion |

### Must develop (engineering/design, before public pitch)

| # | Item | Why it blocks |
|---|---|---|
| D1 | **Security architecture answer** for the eval-class objection: data-as-pure-JSON + vetted function templates + sandboxed interpreter, documented | First question every technical buyer and every Decile engineer will ask; cannot be hand-waved in a fintech context |
| D2 | **Reconcile HSDB with the MVP store**: decide script-file-native tree vs. SQLite event log with script-file export — or a hybrid (SQLite hot path, script-tree as the human-readable rendering) | Product truth for C5; also determines whether "readable without a programmer" is literal |
| D3 | **Poller resilience**: activity-feed polling under undocumented rate limits; staleness guarantees we can honestly claim | "Detects external changes" claims need a number (e.g., within 60s) |
| D4 | **Approval UX**: Hub Task deep-link flow prototyped end-to-end (does `review_approve` + external deep link actually work smoothly for a non-technical GP?) | The demo's emotional peak; must feel effortless |
| D5 | **Hash-chain / export format**: what an "examiner-ready export" actually contains; ideally validated with one fund CFO or compliance attorney | Pillar 2 is a compliance claim; needs an expert sanity pass before we print it |
| D6 | **Hosting model**: local-first (matches transparency story) vs. managed cloud (matches solo-GP reality — they don't run servers) | Pricing tiers and the "yours, local, permanent" copy depend on it |
| D7 | **Decile Premium dependency**: confirm API token scopes available on Premium suffice (read GL, post JEs, create tasks) on a real account | The whole product assumes API access that's gated and reportedly flaky (403/empty-permissions forum thread) |

### Honesty constraints for all materials (from `01`)

- Never say "existing product" — say granted patent + proven prototype.
- Never claim scale beyond the patent's own small-to-medium positioning.
- Never imply Decile partnership before one exists.
