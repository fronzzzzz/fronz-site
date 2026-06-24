/**
 * Fronz site content — single source of copy.
 * Sourced from Fronz_GTM_Clarity_Map.md (strategy SSOT). Edit here, not in components.
 */

export const SITE = {
  name: "Fronz",
  url: "https://shesthefronz.com",
  tagline: "Build the system. Own the growth.",
  description:
    "Be clearly understood by your customers and found by the AI those customers ask — lean systems you own, not agencies you rent.",
  email: "stacey@shesthefronz.com",
  /** On-site booking page — keeps the customer on shesthefronz.com. */
  bookingUrl: "/book",
} as const;

/** Calendly inline embed URL (override in Vercel via NEXT_PUBLIC_CALENDLY_URL). */
const CALENDLY_EMBED_URL =
  "https://calendly.com/fronzz/initial-consult?background_color=f3efe4&text_color=1c1e17&primary_color=1c1e17";

/** Calendly event URL for the inline embed on /book. */
export function calendlyUrl(): string {
  return process.env.NEXT_PUBLIC_CALENDLY_URL ?? CALENDLY_EMBED_URL;
}

export const BOOKING_CTA = "Book a Pre-Jam Consult";

export const HERO = {
  kicker: "Fronz — growth systems for lean founders",
  lead: "Skip the agency retainers.",
  highlight: "Build the system. Own the growth.",
  sub: "Be clearly understood by your customers and found by the AI those customers ask — lean systems you own, not agencies you rent.",
  cta: BOOKING_CTA,
  ctaHref: SITE.bookingUrl,
  secondaryCta: "See how it works",
  secondaryHref: "#lines",
} as const;

export const PROBLEM = {
  kicker: "[02] The problem",
  heading: "Most founders don't have a marketing problem. They have a clarity problem.",
  pains: [
    {
      head: "Nobody gets what you do.",
      body: "You can describe it five ways and none of them land. Customers bounce before they understand your value. The gap isn't your words; it's the position underneath them. We help you get clear on your position and build out your value prop, ideal customer profile, and marketing channels. You leave with clear tactics and systems that are built and running.",
    },
    {
      head: "AI doesn't mention you.",
      body: "Buyers now ask ChatGPT, Perplexity, and Google's AI for a recommendation — and your competitor might be the answer. Over half of B2B software buyers start in an AI chatbot. We help ensure that you're in the room when the decision gets made.",
    },
  ],
} as const;

export const LINES = {
  kicker: "[03] The Playbook",
  heading: "Become the incumbent's worst nightmare.",
  calloutPre: "In the AI era,",
  calloutHighlight: "lean + clear beats big.",
  lead: "You can punch above your weight when you're clear to the two audiences that decide whether you win: your customers, and the AI they ask.",
  approach: [
    "We build systems, not slide decks. We build autonomy into your team, not dependency on an outside partner.",
    "We design the blueprint and you choose how much we build, from a clean strategy hand-off to a complete execution.",
  ],
  items: [
    {
      id: "gtm-clarity",
      name: "GTM Clarity",
      legibleTo: "Legible to your customers",
      promise: "Know what to say.",
      body: "Positioning, messaging, and the go-to-market system to deliver it. From your one sentence to a running machine your team owns.",
      span: "$1,500 → $25,000",
      start: "Way in: GTM Clarity Jam · $1,500",
    },
    {
      id: "groundswell",
      name: "Groundswell AI Discoverability",
      legibleTo: "Legible to AI",
      promise: "Get found & cited.",
      body: "AI visibility through earned community consensus. Become the brand models recommend in your category, measured in a system you own.",
      span: "$1,500 → $30,000+",
      start: "Way in: Visibility Audit · $1,500",
    },
  ],
} as const;

export const GUIDE = {
  kicker: "[04] Who you're working with",
  name: "Stacey Fronek",
  empathy:
    "I'm bootstrapping Moxa with my husband — I know what it's like to need results without overhead.",
  authority:
    "A decade producing for PopSockets, Hotels.com, Xfinity, the Ethereum Foundation, and Protocol Labs — now productized so a lean team can actually use it.",
  proof:
    "I build all of it at my own company, Moxa, first. You get a system I've built for myself, not a deck of theory.",
} as const;

export const PROOF = {
  kicker: "[05] Proof",
  heading: "Built live, not theorized.",
  logos: [
    "PopSockets",
    "Hotels.com",
    "Xfinity",
    "Ethereum Foundation",
    "Protocol Labs",
    "Moxa",
  ],
  note: "Every method I sell, I build into my own company first.",
} as const;

export const SUPPORT = {
  kicker: "[06] The support model",
  heading: "I build it. You own it.",
  promise:
    "My job is to make your team self-sufficient, then be there when the world changes — not bill you while it doesn't.",
  rows: [
    { agency: "Mandatory monthly fee, forever", fronz: "One-time build, you own it" },
    { agency: "You depend on them", fronz: "Your team is enabled to run it" },
    {
      agency: "Pay whether or not you need them",
      fronz: "On-call hours + opt-in refreshes only",
    },
    {
      agency: "Incentive: keep you dependent",
      fronz: "Incentive: make you self-sufficient",
    },
  ],
  extras: [
    "Team enablement included in every build.",
    "On-call hours: prepaid 10-hour packs at $250/hr — use when you want.",
    "Groundswell Refresh, booked anytime, no cadence: $1,200 — never a subscription.",
  ],
} as const;

export const PRICING = {
  kicker: "[07] Pricing",
  heading: "Real prices. No “contact us.”",
  sub: "Transparent entry points for every line. Each starter credits 100% toward the bigger builds in its own line.",
  tiers: [
    {
      line: "GTM Clarity",
      entry: "GTM Clarity Jam",
      price: "$1,500",
      detail: "2-hour 1:1, recorded. Your one sentence + your one wedge, with a recap artifact.",
      featured: true,
    },
    {
      line: "Groundswell",
      entry: "Visibility Audit",
      price: "$1,500",
      detail: "Where AI is omitting you, why, and the consensus plan to fix it.",
      featured: false,
    },
  ],
} as const;

export const LEAD = {
  kicker: "[08] Free, start now",
  heading: "See your whole business on one page.",
  body: "The GTM Clarity Starter is a 20-minute exercise that maps your offers, customers, and tactics — and shows you exactly where it's blurry. It's the warm-up for the Jam, and it's free.",
  cta: "Get the GTM Clarity Starter",
  placeholder: "you@company.com",
  button: "Get instant access",
  /** Public page that hosts the exercise (also where the delivery email points). */
  href: "/starter",
} as const;

/**
 * Duplicatable "work in it" templates for the Starter. These are public share
 * links (not secrets), so they default to the live docs and can be overridden
 * per-environment via Vercel env. The Google link uses the `/copy` form so it
 * prompts "Make a copy" instead of opening the master doc.
 */
export function starterTemplates() {
  return {
    notion:
      process.env.NEXT_PUBLIC_STARTER_NOTION_TEMPLATE_URL ??
      "https://app.notion.com/p/fronzz/GTM-Clarity-Starter-3898234f4e90805f9c45caf4f44a8ddd?source=copy_link",
    gdoc:
      process.env.NEXT_PUBLIC_STARTER_GDOC_TEMPLATE_URL ??
      "https://docs.google.com/document/d/1QqaSpLlEYZ5BCO9WUP8vOAE288SaSQE8BivX-elUUPc/copy",
  };
}

/**
 * The GTM Clarity Starter — the hosted lead-magnet exercise at /starter.
 * Source of truth: "GTM Clarity Jam/GTM_Clarity_Starter_Homework.md".
 */
export const STARTER = {
  kicker: "Free · GTM Clarity Starter",
  heading: "See your whole business on one page.",
  highlight: "on one page.",
  sub: "A 20-minute exercise to get your offers, your people, and how you reach them in front of you — so the gaps become obvious. The warm-up for the GTM Clarity Jam.",
  intro:
    "You know what you do. Putting it into words that land is the hard part. This isn't about clever copy — it's about seeing your offers, your people, and how you reach them all in one place, so the gaps become obvious.",
  instruction:
    "Do this honestly and roughly. Messy is fine — messy is the point. Keep your first-instinct answers; don't polish them yet.",
  tip: "Work in a visual board (FigJam, Miro, even sticky notes) or grab a template below. Make a node for each item — you'll connect them at the end.",
  parts: [
    {
      n: "01",
      title: "Your offers",
      body: "List everything you currently sell or could sell — products, services, programs, the retreat, the community, the thing you do “on the side.” For each one, write every way you've described it before. Don't pick the best yet — dump them all.",
      prompts: [
        "“I usually describe it as…”",
        "“Sometimes I say…”",
        "“On my site it says…”",
      ],
    },
    {
      n: "02",
      title: "Your people",
      body: "List every type of customer you're trying to reach (or have imagined reaching). For each, write your clearest description of who they are — and if you can, what they're really trying to get done (the job they'd “hire” you for).",
      prompts: [
        "Who they are…",
        "What they're trying to achieve…",
        "How urgently they feel it (gut call: low / medium / high)",
      ],
    },
    {
      n: "03",
      title: "How you reach them",
      body: "For each customer, list the tactics you actually use to reach them today — email list, IRL events, social, word of mouth, DMs, a podcast, nothing-yet. Be honest about the “nothing yet” ones — a great customer with no way to reach them is one of the most useful things to find.",
      prompts: ["Customer → tactics you use to reach them today…"],
    },
    {
      n: "04",
      title: "Connect the dots",
      body: "Draw lines: offer → customer → tactic. Then just look. Where are the clean lines (right offer, right person, right way to reach them)? Where are the crossed or missing lines? What surprised you?",
      prompts: ["Note anything that jumps out."],
    },
  ],
  wall: {
    heading: "You'll probably hit a wall here — that's expected.",
    body: "Most founders get to Part 4 and feel one of these:",
    quotes: [
      "“I'm describing the same thing five different ways.”",
      "“I can't tell which of these is the actual product vs. just how people find me.”",
      "“I have way more offers and audiences than I can focus on.”",
      "“My best customers and my best channels don't line up.”",
    ],
    punch:
      "That wall is the most valuable part. It's not a copywriting problem — it's a positioning decision waiting to be made. Pushing through it is exactly what the GTM Clarity Jam does: in two hours we turn this map into one clear sentence and one decided wedge — the single offer, customer, and channel to focus on next.",
  },
  templatesHeading: "Want a head start? Grab a template.",
  templatesNote:
    "Make your own copy and work in it — it's yours to keep. Or use any board you like.",
  ctaHeading: "Bring this with you.",
  ctaBody:
    "Finished, or stuck? Book a GTM Clarity Jam and send your map ahead. We'll start from it — no wasted time — and you'll leave with a sentence you can say out loud and a 90-day focus.",
  cta: "Book your GTM Clarity Jam",
  footnote: "Fronz · clarity, not clever.",
} as const;

/** Optional "send your map ahead of the Jam" capture on /starter. */
export const STARTER_FORM = {
  heading: "Send your map ahead of your Jam (optional)",
  sub: "Prefer to type it out? Drop your rough answers here and I'll have them before we meet. Totally optional — bringing a board works just as well.",
  fields: [
    { key: "offers", label: "Your offers", placeholder: "Everything you sell, in every way you've described it…" },
    { key: "people", label: "Your people", placeholder: "Who you're trying to reach, and what they're hiring you to do…" },
    { key: "tactics", label: "How you reach them", placeholder: "The tactics you actually use today (and the “nothing yet” ones)…" },
    { key: "notes", label: "What jumped out", placeholder: "Clean lines, crossed lines, surprises…" },
  ],
  emailPlaceholder: "you@company.com",
  button: "Send my map",
  success: "Got it — your map is on its way to Stacey. Now grab a time for your Jam.",
} as const;

export const BOOK = {
  kicker: "Book a consult",
  heading: "Pick a time for your initial call.",
  sub: "Choose a slot below — you'll stay on this site the whole way through. The GTM Clarity Jam is a 2-hour working session; we'll find your one sentence and your one wedge.",
  note: "You'll get a confirmation email with everything you need. Reschedule anytime from that email.",
} as const;

export const FINAL_CTA = {
  kicker: "[09] One next step",
  heading: "Selling five things to everyone and nothing's landing?",
  sub: "In two hours we'll find your one sentence and your one wedge. That's the Jam.",
  cta: BOOKING_CTA,
  href: SITE.bookingUrl,
} as const;

export const NAV = [
  { label: "Playbook", href: "/#lines" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/#guide" },
] as const;
