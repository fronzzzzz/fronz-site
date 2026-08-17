# The Two-Level Explainer: HSDB, Decile Hub, and the Bridge

Synthesized Aug 7, 2026 · sources: `01-product-hsdb.md`, `02-fund-admin-domain.md`, `03-decile-api-bridge.md`

---

## Part 1 — Explain it like I'm fifteen

### The product (HSDB)

Think about how apps normally work. There's a **database** (a locked filing
cabinet where the data lives), an **app** (the clerk who's allowed to open
the cabinet), and an **API** (the window you ask the clerk through). The data
can't do anything by itself, and unless you're a programmer, you can never
really check what the clerk is doing. You just have to trust them.

Kyle's invention flips that. Imagine a **family tree that writes itself**.
Every time something happens — a text message arrives, a song gets played on
the radio, someone answers a quiz question — a new "child" is born in the
tree, right under the correct parent, with all the details of what happened
written on it. And here's the weird part: each entry in the tree isn't just a
note card. It's a tiny program. The card *knows things* ("here's the quiz
answer I hold") and *can do things* ("check if this answer is correct").

Everything is stored as ordinary text files in ordinary folders on the
computer, and the folders are arranged in the same shape as the tree. So if
you want to know what happened and why, you don't need a programmer — you
open the folder and read it, like a diary. Every fact gets a permanent
address, like a street address: "the third phone call ever received" lives at
`Tree-1.CallHandler.#3`, forever.

His favorite example: a music contract stored as a tree. When the radio
station reports "we played your song 345 times," the contract *itself* writes
that down as a new leaf AND automatically sends the royalty payments,
following its own rules — rules the musician can read in plain text. He was a
music lawyer; he built this because artists get cheated by systems they can't
inspect.

He patented it in **January 2019**. Then something funny happened: when AI
agents took off in 2024–2026, the whole industry realized agents need exactly
this — memory kept in plain readable files, where every action leaves a
permanent trail a human can check. The world reinvented his idea five years
after he filed it. That's why the patent suddenly matters.

### The market (Decile Hub)

A venture capital fund is basically a pot of money that rich people (called
**LPs**) promise to fill so a fund manager (called a **GP**) can invest it in
startups. Running the pot involves a mountain of paperwork: legally creating
the fund, collecting signatures, asking LPs to wire money when it's needed (a
**capital call**), keeping a ledger of who paid what, sending everyone
quarterly report cards, and doing taxes. Mess any of it up and you can get in
trouble with the government (the SEC) — or worse, your investors stop
trusting you and never fund you again.

**Decile Hub** is an app that handles all of that for new, small fund
managers — like QuickBooks plus a CRM plus DocuSign, but for running a
venture fund. The company behind it (Decile Group) runs a free school called
**VC Lab** that has helped launch about a thousand new funds, and every
student learns on Decile Hub. In 2026 they went all-in on AI: they built
robot assistants that draft the capital call notices, write the reports, and
check the paperwork, and they even let managers control everything by texting
a bot on Telegram or WhatsApp.

### The problem (and the bridge)

Here's the catch. These AI assistants are touching **real money and legal
documents**, and if an AI makes a mistake — sends a capital call to the wrong
people, posts a wrong number into the ledger — you can't just undo it. And
right now, there's no black box flight recorder. Nothing writes down what the
AI knew, what it decided, who approved it, and what it actually did. The
approval is a button tap in a chat app that scrolls away forever.

The idea: build a **bridge** that sits between the manager's AI and Decile
Hub. Every single thing the AI does goes through the bridge, and the bridge
writes it into one of Kyle's self-growing trees: *the AI read this* → *the AI
proposed this* → *the human said yes* → *it happened*. Dangerous actions get
frozen until a human approves. The whole history sits in readable files the
manager — or a government examiner, or a nervous investor — can open and
read like a diary.

It's a seatbelt for AI that handles money. Decile built the fast car;
this is the seatbelt and the flight recorder.

---

## Part 2 — Explain it like I'm an intelligent colleague

### The product, precisely

US 12,664,142 (priority Jan 2019, granted June 2026) claims a **tree database
whose nodes are script files in an interpreter environment** — canonically
Node.js. Each node carries **data properties** (JSON) and **function
properties** (JavaScript) side by side. The system is **event-driven**:
events route via stock EventEmitter listeners to handler nodes ("parents"),
whose scripts instantiate child nodes holding the event's payload, then call
two kernel functions — `syn()` (construct children) and `tie()` (stamp
bidirectional link metadata: timestamps, ordinal namespace address, scope) —
plus `fs.writeFile()` for persistence. The **filesystem mirrors the tree**:
one directory per node, JSON file for data, JS file for functions; binary
payloads linked as separate files. Queries are just another event class,
handled by query nodes that traverse the tree — and reads can themselves be
logged as child nodes, so the audit trail covers reads, not only writes.
Every datum gets a permanent, human-speakable address (`Tree-1.CallHandler.#3`).
Because the interpreter executes text, scripts can be modified while the
program runs — the "non-halting" property from the provisional's title.

Three worked examples in the patent: a Twilio-backed communication appliance
(the demo he actually built on a Raspberry Pi), a music-licensing smart
document (contract clauses as a tree; usage-report events append to a
write-only transaction log and trigger royalty payments per the contract's
own terms), and an educational quiz (the minimal end-to-end file-layout
illustration).

**Reality check**: the kernel is proprietary and has never been published.
Evidence it works = YouTube demos matching the patent's mechanics exactly, a
popular open-source repo (`alchemy`) that he built *with* the kernel and
shipped *without* it, and one interactive browser-console object. No
installable package, no benchmarks, no third-party users. Pitch framing must
be "granted patent + video-proven prototype."

**Honest objections you'll face**: (1) executing data as code is an
eval-class security surface — must be answered architecturally (data in pure
JSON, functions from vetted templates, sandboxed interpreter); (2) the patent
itself concedes small-to-medium scale — filesystem-bound writes, traversal
queries, no indexes; SQLite-class, not Postgres-class; (3) "isn't this just
files + git?" — the differentiators are the live event loop, kernel-enforced
link metadata, and addressable query semantics, and the patent explicitly
treats git as complementary. None of these are fatal for a fund-ops audit
layer, where trust and inspectability dominate throughput.

**Strategic asset**: the priority date. File-first agent memory (agent-memory,
MemoFS, fslite, "versioned agent filesystems") became a real category in
2025–26; Kyle's claims — records as executable script files, event-grown
trees, intrinsic audit trails, transparency for lay stakeholders — predate
all of it by five years. He's already migrating the philosophy into that
category himself (MetaGit nested-git agent memory; ERC-7827, his accepted
Ethereum standard for versioned on-chain JSON).

### The market, precisely

Decile Group runs a three-stage funnel: **VC Lab** (free 14-week fund
accelerator; ~22 cohorts, ~1,000 funds, $1.5B+ in LP commitments) feeds
**Decile Hub** (freemium fund-management SaaS; Premium unlocks the API) which
feeds **Decile Partners** (fund admin at $50K formation + $25K/yr + 1% carry).
The customer is the **emerging manager**: Fund I–III, $5–50M, often a solo GP
with zero ops staff, ~$200K/yr in management fees covering everything. Their
operational life — sub docs, KYC/AML, capital calls, capital accounts,
distributions/waterfalls, quarterly reporting, K-1s, and SEC exempt-reporting-
adviser obligations (truncated Form ADV, books-and-records exposure,
examination authority) — is formulaic enough to automate and regulated enough
that the record of what happened matters as much as the action.

In April 2026 Decile repositioned as "**agentic fund admin**": capital-call
agents, reporting agents, KYC agents, memo agents, LP-discovery agents, and
officially blessed chat control of the platform through OpenClaw (Telegram /
Discord / WhatsApp / iMessage) against a 137-endpoint OpenAPI spec that is
unusually agent-aware (whoami introspection, preview→confirm idioms,
idempotency keys for agent runs, provenance fields).

But the API's own design betrays the trust gaps: **no webhooks** (change
detection is poll-only against an activity feed); **capital call issuance is
UI-only**; fund-level IRR/TVPI/DPI are deliberately withheld from all
agent-reachable endpoints; pipeline automations execute one-per-call with
required human confirmation; and — critically — the **general-ledger write
path (journal entries) has no approval layer and is explicitly
non-idempotent** (a retried batch double-posts). Meanwhile the sanctioned
approval UX is an inline button in a consumer chat app, with no durable,
tamper-evident, manager-owned record of what was proposed and approved.

Upmarket, Juniper Square raised $130M at a $1.1B valuation to build JunieAI
and ships **Fay**, an "Admin Oversight Agent" reviewing fund-admin close
packs — proof that *AI oversight of fund operations* is a category with
enterprise willingness-to-pay. Nothing comparable exists at Decile's price
point or for its thousand-fund community.

### The synthesis

The bridge is an **MCP server** any agent (Claude, OpenClaw) connects to
instead of hitting Decile's API directly. Internals: an API client
(normalizing three pagination schemes, throttling, decimal-string parsing), a
**local mirror** of fund state (fast, token-cheap reads with point-in-time
snapshots), a **policy engine** (risk-tiered writes; tier-2 actions — journal
entries, email sends, LPA/PACT dispatches, wire-compliance decisions,
cascading automations — are held as proposals until approved, with the
approval ride-able on Decile's own rails via `review_approve` Tasks or
Braintrust asks), and the HSDB-style **append-only, hash-chained event tree**:
one subtree per fund entity; `read` → `propose` → `approve` → `write` →
`external_change` nodes; every write closes the loop by recording the
resulting Decile ActivityEntry ID. This generalizes the two-step idiom Decile
already applies to email (preview → `confirm: true`) across the entire
dangerous surface, and adds the idempotency ledger the GL write path lacks.

Positioning: **complementary, not competitive** — it makes Decile's boldest
feature (agents operating a regulated fund from a phone) safe enough for the
regulated context it operates in. The patent supplies both the mechanism
(event-grown, self-describing, human-readable audit trees) and the narrative
(filed 2019, granted 2026, exactly as the agent era created the need).
Willingness-to-pay anchors: $25–75K/yr current admin spend at this fund size,
and the existential cost of one LP-facing error. Distribution anchor: VC
Lab's community of ~1,000 funds, reachable through channels Decile itself
operates.

The one-sentence version for a pitch: *Decile made fund ops agentic;
we make agentic fund ops auditable.*
