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
  button: "Send it to me",
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
