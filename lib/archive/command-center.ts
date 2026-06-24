/**
 * ARCHIVED — Signal Stack Command Center (parked R&D, 2026-06-24).
 *
 * This line was pulled from the live site. It is preserved here intact so it can
 * be resurrected without git archaeology. See the strategy SSOT
 * (`Fronz_GTM_Clarity_Map.md`, §11 "Parked & future bets") for the rationale, and
 * the `Signal Stack/` kit (each file carries a parked banner) for the full offering.
 *
 * To resurrect:
 *   1. Re-add this object under the "command-center" key in `lib/lines.ts`
 *      (LINES_DETAIL), and re-add the "command-center" step to `ARC`.
 *   2. Re-create `app/command-center/page.tsx` (mirror `app/groundswell/page.tsx`).
 *   3. Re-add the homepage line card + pricing tier in `lib/content.ts`
 *      (LINES.items, PRICING.tiers) and the Command Center offer in
 *      `lib/schema.ts` (schemaGraph.makesOffer).
 *   4. Re-instate the third pillar in HERO / SITE.description / PROBLEM.
 *   5. Revisit AI Visibility — it was folded into Groundswell as the on-demand
 *      $1,200 Refresh; decide how it splits if the Command Center returns.
 *
 * This file is intentionally not imported anywhere (it is not shipped); it only
 * needs to keep type-checking against LineDetail.
 */
import type { LineDetail } from "@/lib/lines";

export const COMMAND_CENTER_ARCHIVED: LineDetail = {
  slug: "command-center",
  name: "Signal Stack Command Center",
  eyebrow: "Legible to your team",
  arcLabel: "Get command",
  promise: "Measure & decide.",
  heroSub:
    "Decisions, not dashboards. The Command Center turns your scattered data into a decision system your team owns — built in your own workspace, on your own keys. Every metric that matters comes with a threshold, a meaning, and the next action attached. Start with one live signal and grow it domain by domain.",
  problem: {
    heading:
      "Knowing what to measure is a different skill in every corner of your business.",
    points: [
      {
        head: "Each function speaks its own language.",
        body: "Finance, product, customers, and growth each have their own signals, healthy ranges, and plays. What matters in one tells you nothing about another.",
      },
      {
        head: "Tools give you charts, not judgment.",
        body: "Dashboards show you everything and tell you nothing. The hard part isn't the graph; it's knowing which number matters and what to do when it moves.",
      },
      {
        head: "You can't hire a specialist for each.",
        body: "A RevOps lead, a product analyst, a lifecycle marketer, an AI-visibility strategist. That's four hires you don't have, so you're guessing across all of them.",
      },
    ],
    punch: "Nod at one of these? You're running your company on a hunch.",
  },
  differentiator: {
    heading: "Built in your environment. On your keys. Always.",
    body: "I never hold your logins or API keys. You authorize the connections inside your own accounts, the tokens stay with you and the connector that maintains them, and I build your command center as a guest you can revoke anytime — seeing only the finished signals, never your raw records. You own the workspace, the connections, and the keys from day one. (The one exception is AI Visibility: its data is public, so I host that one for you, and you grant access to nothing.)",
  },
  compactMethod: true,
  domains: {
    eyebrow: "Five disciplines",
    heading: "Five disciplines, one command center.",
    sub: "Each one is its own expertise: I bring the operator judgment of what to measure, what 'good' looks like, and what to do when it moves, then build it into a system your team owns and runs. Take one, or stack several. The four business domains are built in your workspace; AI Visibility is the one I host for you.",
    note: "Everything here, I build in my own company's command center first — I'm my own first client, not a theory shop.",
    items: [
      {
        name: "RevOps & Financial Command",
        outcome: "Always know how much cash, how long, and whether you're on plan.",
        problem: "Cash, burn, and runway live in three places and update never.",
        build: "The four numbers that actually predict survival, piped live: cash position, true 30-day burn, runway, and variance vs. plan. Each comes with a threshold, plus a triage queue that routes risk and opportunity to an owner.",
        decision: "Walk into any board meeting knowing the number and the action before anyone asks.",
      },
      {
        name: "GTM & Phase-Gating",
        outcome: "Know when you're actually ready to scale, launch, or raise.",
        problem: "Big go/no-go calls made on gut and optimism.",
        build: "The gates that actually signal readiness: each growth stage tied to a quantitative threshold and an evidence source, so 'ready' is a number, not a feeling.",
        decision: "A weekly, honest read on 'are we ready?' Green means go, red holds the line.",
      },
      {
        name: "Product Analytics",
        outcome: "See activation and retention slip before they become churn.",
        problem: "The numbers that predict growth are buried in a tool nobody opens.",
        build: "The handful of signals that actually predict growth, in one view: activation, retention, and weekly-active, each with a healthy range so a dip is obvious early.",
        decision: "Know within a week if onboarding is slipping, and exactly where to fix it.",
      },
      {
        name: "Customer Relationship Analytics",
        outcome: "Spot disengagement before it turns into churn.",
        problem: "You find out a customer left after they're gone.",
        build: "A churn-risk signal per customer, flagged from the engagement behaviors that tend to precede leaving — usage drop-off, support friction, slipping logins — plus a live view of lifecycle health.",
        decision: "A shortlist of accounts showing risk signals this week, with the reason and the play attached.",
      },
      {
        name: "AI Visibility (hosted)",
        outcome: "Track whether AI recommends you, alongside everything else you watch.",
        problem: "You ran a visibility push but can't see if AI keeps citing you over time.",
        build: "The metrics that actually show whether AI trusts you, tracked live and hosted by me — its data is external, so it needs zero access to your systems: Share-of-Model, citation frequency, competitor share, accuracy, and source coverage.",
        decision: "Know if your AI visibility is climbing or slipping, and when to refresh.",
      },
    ],
  },
  method: {
    heading: "How every domain gets built",
    sub: "The same method behind each one, starting from the decisions you make, not the data you happen to have.",
    steps: [
      { n: "01", name: "Decision Map", body: "Start from the decisions you make weekly, then build backward." },
      { n: "02", name: "Metric Architecture", body: "North-star outcomes → drivers → signals. Every metric gets one owner." },
      { n: "03", name: "Signal Layer", body: "Each metric gets a threshold, a meaning, and an action routed to a person." },
      { n: "04", name: "Live Build", body: "Managed connectors you authorize in your own accounts feed real data into one live surface in your Notion — your keys never leave your control." },
      { n: "05", name: "Handoff & Enablement", body: "A plain-English playbook plus training, so your team runs it without me." },
    ],
  },
  tiers: {
    heading: "Simple, fixed pricing. No forever retainers.",
    sub: "The Blueprint and Build go deep on one business domain, built in your environment. AI Visibility is the one I host for you. Start with the Blueprint — it credits 100% toward a Build within 30 days, and you keep everything. Need more than one domain? Stack fixed-scope builds.",
    items: [
      {
        name: "Blueprint + Live Signal",
        price: "$7,500",
        meta: "2–3 weeks · one domain",
        tagline: "The smart first step. You keep everything.",
        points: [
          "Decision Map workshop to kick off",
          "A fully designed, vendor-neutral metric architecture for one domain",
          "One signal built live in your workspace from one source you connect (up to 5 metrics)",
          "'How to read your numbers' primer + prioritized roadmap",
          "An implementation-ready architecture and a live signal you own",
        ],
      },
      {
        name: "Command Center Build",
        price: "$15,000",
        meta: "4–6 weeks · one domain, in your environment",
        tagline: "Most chosen.",
        featured: true,
        points: [
          "The full method applied to the domain that matters most",
          "Up to 4 sources, connected through managed connectors you authorize in your own accounts",
          "Built in your Notion as a guest — your keys never leave your control",
          "Executive dashboard + the Signal Layer: thresholds, actions, owners",
          "'How to read your numbers' playbook + 2 training sessions + 30 days of tuning",
          "Need more domains? Stack another build, fixed-scope.",
        ],
      },
      {
        name: "AI Visibility Command Stack",
        price: "$7,500",
        meta: "hosted by me · the done-for-you domain",
        tagline: "The one I run for you.",
        points: [
          "Tracks whether AI recommends you: Share-of-Model, citation frequency, competitor share, accuracy, source coverage",
          "Its data is external, so I host it on my own accounts — zero access to your systems",
          "A live dashboard handed to you, refreshed on demand ($1,200), never a retainer",
          "50% off ($3,750) after a Groundswell engagement — the baseline's already built",
        ],
      },
    ],
  },
  entryPoints: [
    { who: "Drowning in tools, deciding on gut", start: "Start with the Blueprint: one domain, one live signal, you keep it all." },
    { who: "Ready to build", start: "Go straight to a Command Center Build, then stack domains as you grow." },
  ],
  support: {
    heading: "Optional, only if you want it. Never required.",
    points: [
      "Maintenance in 10-hour packs at $250/hr ($2,500).",
      "Prepaid hours apply to a Refresh at $1,200/domain, booked anytime.",
      "Your data connectors are vendor-maintained and owned by you — nothing for me to babysit.",
    ],
  },
  whoFor: {
    fit: [
      "A team of 1–30 making real decisions weekly",
      "You want a system your team will actually use, not ignore",
      "You want decision impact, not a prettier chart",
    ],
    notFit: [
      "You need heavy statistical / big-data BI (I'll point you to the right tool)",
      "You want a cheap template, or won't authorize connectors in your own accounts",
    ],
  },
  faq: [
    {
      q: "Do I have to hand over our logins or API keys?",
      a: "No — and that's the point. You authorize the connections inside your own accounts, so the keys stay with you and the connector that maintains them. I build your command center as a guest you can revoke anytime, and I only ever see the finished signals, never your raw records. You stay in control, and it passes a security review. The one exception is AI Visibility, which I host — and it needs no access to your systems at all.",
    },
    {
      q: "Isn't Notion just for docs, not real business intelligence?",
      a: "The data flows in through managed connectors; Notion is your decision surface, where your team and your AI already work. You get the clarity without the enterprise-BI price tag. And if you outgrow it, the data layer ports straight into a dedicated BI tool.",
    },
    {
      q: "Why not just hire an analyst or a RevOps retainer?",
      a: "Those cost $5–50k every month, indefinitely. I build you an owned system in weeks, your team maintains it, and you only call me when you actually want to.",
    },
    {
      q: "How is this different from a dashboard?",
      a: "A dashboard shows numbers. The Command Center tells you what's wrong, why it matters, and what to do, with a person attached to each signal. That's the difference between data and decisions.",
    },
    {
      q: "Can our team really maintain this after you leave?",
      a: "Yes, that's the whole design goal. It lives in your Notion, the data flows through managed connectors the vendor maintains, every signal has an owner, and you get a plain-English playbook plus training. Maintenance is optional, not required.",
    },
  ],
  cta: {
    heading: "Stop running your company on guesswork.",
    sub: "Start with a Blueprint. Walk away with your metric architecture and a live signal running for your team.",
    button: "Book a Command Center Blueprint",
  },
};
