/**
 * Detail-page content for the Fronz lines.
 * GTM Clarity: Fronz_Funnel_and_Offer_Ladder.md (Sep 2026)
 * Groundswell: Groundswell Offering Kit + GTM Clarity Map
 */

import { BOOKING_CTA, MOTION, STARTER_CTA, SITE } from "./content";

export type Tier = {
  name: string;
  /** Founder / entry price. */
  price: string;
  /** Founder-tier meta line (format, duration, recording notes, etc.). */
  meta?: string;
  /** Optional team-tier price shown alongside the founder price. */
  teamPrice?: string;
  /** Optional team-tier meta line. Rendered when teamPrice is present. */
  teamMeta?: string;
  tagline?: string;
  points: string[];
  /** Anchor section on the line page (homepage arc links here). */
  section?: "get-clear" | "make-contact" | "keep-moving";
  featured?: boolean;
  note?: string;
  /** When this container fits — shown on outcome cards. */
  fitNote?: string;
  /** Optional phase label (e.g. Phase 2 cross-line card). */
  phaseLabel?: string;
  /** Visual treatment for cross-line / phase-2 cards. */
  variant?: "phase2";
  /** Override default tier CTA target and label. */
  href?: string;
  ctaLabel?: string;
};

export type LineDetail = {
  slug: string;
  name: string;
  eyebrow: string; // "Legible to your customers"
  arcLabel: string; // "Get clear"
  promise: string;
  /** When set, replaces product name + promise in the hero H1. */
  heroBeats?: readonly string[];
  heroHighlightBeat?: number;
  heroSub: string;
  /** Optional Phase-2 / prerequisite banner rendered in the hero. */
  prerequisite?: {
    label: string;
    body: string;
    cta?: { label: string; href: string };
  };
  problem?: {
    heading: string;
    points: { head: string; body: string }[];
    punch?: string;
    sources?: { label: string; href: string }[];
  };
  differentiator?: { heading: string; body: string };
  method?: {
    heading: string;
    sub?: string;
    steps: { n: string; name: string; body: string }[];
  };
  /** Horizontal movement band. When present, replaces the method section. */
  flow?: {
    kicker?: string;
    heading: string;
    sub?: string;
    steps: { label: string; body: string }[];
  };
  tiers: {
    heading: string;
    sub?: string;
    systemNote?: string;
    /** Motion callouts + funnel-order grid (not sequential section groups). */
    motionCallouts?: boolean;
    items: Tier[];
  };
  /** One full card per offer with an outcome line only (no deliverable bullets). */
  outcomeCards?: boolean;
  entryPoints?: { who: string; start: string }[];
  domains?: {
    eyebrow?: string;
    heading: string;
    sub?: string;
    note?: string;
    items: {
      name: string;
      outcome: string;
      problem: string;
      build: string;
      decision: string;
    }[];
  };
  support?: { heading: string; points: string[] };
  /** Render the method compact + demoted (used when domains carry the selling). */
  compactMethod?: boolean;
  whoFor?: { fit: string[]; notFit: string[] };
  faq: { q: string; a: string }[];
  cta: { heading: string; sub: string; button: string };
  /** Per-line CTA targets — defaults to /book when omitted. */
  links?: {
    tierCta: { label: string; href: string };
    heroSecondary?: { label: string; href: string };
    footerCta?: { label: string; href: string };
  };
  whereFits?: { heading: string; sub: string };
};

export const ARC = [
  { slug: "gtm-clarity", label: "Get clear", line: "GTM Clarity", legibleTo: "your customers" },
  { slug: "groundswell", label: "Get found", line: "Groundswell AI Customer Discoverability", legibleTo: "AI" },
] as const;

export const LINES_DETAIL: Record<string, LineDetail> = {
  "gtm-clarity": {
    slug: "gtm-clarity",
    name: "GTM Clarity",
    eyebrow: "Go-to-market for founders and lean teams",
    arcLabel: "Gain clarity",
    promise: "Build momentum.",
    heroBeats: MOTION.beats,
    heroHighlightBeat: MOTION.highlightBeat,
    heroSub:
      "Decide what to sell and to whom, get in front of real buyers, and keep senior judgment on what to run next. Fixed-scope containers for judgment, decisions, and hands-on market contact.",
    outcomeCards: true,
    tiers: {
      heading: "Start free. Step up when you're ready.",
      sub: "Begin with the free map, then step into whichever container fits where you are now.",
      motionCallouts: true,
      items: [
        {
          name: "GTM Clarity Starter",
          price: "Free",
          meta: "20 min · self-serve",
          tagline: "See your whole business on one page and spot exactly where the lines break.",
          points: [
            "Four parts: offers, people, how you reach them, connect the dots",
            "Optional fifth part for AI-heavy executors: what's automated vs. what still needs a human decision",
            "Copy a Notion or Google Doc template and keep the map",
            "Submit your answers when you want a Starter Review",
          ],
        },
        {
          name: "Starter Review",
          price: "Free",
          meta: "20 min · after Starter",
          tagline: "An honest read on your map and a straight answer on which container fits you next.",
          points: [
            "Complete the Starter first. I'll read your answers before we talk",
            "Reflect what you wrote, not a free strategy session",
            "Assess fit for the next container, or a clean close",
            "Self-book after you submit the Starter form",
          ],
        },
        {
          name: "GTM Review Container",
          price: "$500/mo",
          meta: "3-mo min · 2 hr/mo cap",
          fitNote: "After the map, or anytime you're executing and need a read.",
          tagline:
            "Senior judgment on what to run next while you execute. Not another builder to manage.",
          points: [
            "Monthly Execution Brief: what to run next, based on what you're shipping",
            "45-minute review call each month",
            "3-month minimum, then month-to-month",
            "2-hour/month cap: you own the execution",
          ],
        },
        {
          name: "GTM Intensive",
          price: "$2,500",
          meta: "3 days · 1 hr/day together",
          fitNote: "When the wedge still needs deciding.",
          tagline: "Your wedge and first test decided in three days, so you walk out with both locked.",
          points: [
            "Three consecutive days, one hour together each day",
            "Separate product from channel from model; land the pitch sentence",
            "One wedge decided: offer × customer × channel",
            "First test designed before you leave",
            "Collaborative decision work, not execution-only guidance",
          ],
        },
        {
          name: "GTM Sprint",
          price: "$7,500",
          meta: "2 weeks · 30 hr cap",
          fitNote: "When you're ready for real market contact.",
          tagline: "Two weeks of hands-on market contact: positioning tested, first channel live, honest numbers.",
          points: [
            "Two weeks toward one metric you agree on upfront",
            "Hands-on execution inside the sprint cap, not a deck you implement alone",
            "Positioning tested with real market contact",
            "First channel live with measurement",
            "Hypothesis scorecard and scoped follow-on at the gate",
          ],
        },
        {
          name: "Scoped GTM follow-on",
          price: "Custom",
          meta: "@ $250/hr · at the gate",
          fitNote: "After a sprint or intensive opens the next move.",
          tagline: "Your next move scoped from real data: named work, named price, no open-ended retainer.",
          points: [
            "Custom scope after Intensive or Sprint",
            "Execute the next scoped move: interpret what's working, build what's next",
            "No open-ended retainer: named work, named price",
          ],
        },
        {
          name: "Groundswell AI Customer Discoverability",
          price: "From $1,500",
          phaseLabel: "Phase 2 · after clarity",
          variant: "phase2",
          tagline:
            "Once your message and wedge are live, become the brand AI recommends when buyers ask in your category.",
          points: [],
          href: "/groundswell",
          ctaLabel: "Explore Groundswell",
        },
      ],
    },
    whoFor: {
      fit: [
        "You're a founder or lean team selling multiple things and need to focus",
        "The product works, or it's close, but the message isn't landing",
        "You want bounded work you can graduate from, not an open-ended retainer",
      ],
      notFit: [
        "You want done-for-you marketing forever",
        "You're not willing to commit to a single focus",
      ],
    },
    faq: [
      {
        q: "Is this an agency engagement or a fractional hire?",
        a: "Neither model. No open-ended retainer, no headcount on your payroll. Each tier is a named container with fixed scope and fixed price. The Review Container is monthly judgment while you run day-to-day. The Intensive and Sprint include hands-on work inside the cap: wedge decisions, market contact, channels live. Nothing is open-ended done-for-you forever.",
      },
      {
        q: "Where do I start?",
        a: "The GTM Clarity Starter: free, twenty minutes, your map on one page. When you want a read on what you found, submit your answers and book a Starter Review.",
      },
      {
        q: "What's the difference between the Starter and the Starter Review?",
        a: "The Starter is the exercise: you map offers, people, and channels and see where the lines break. The Starter Review is twenty minutes where I read your map and reflect it back, then we talk about whether a GTM Container fits.",
      },
      {
        q: "Do I have to go through every container in order?",
        a: "No. Every path starts with the free map. After that, step into whichever container fits where you are: Review Container for ongoing senior judgment, Intensive to decide a wedge, Sprint for hands-on market contact. Many founders start with senior judgment; others sprint first and come back for a read.",
      },
      {
        q: "What's the GTM Review Container vs. the Intensive?",
        a: "Different jobs. The Container is monthly senior judgment while you execute: a brief plus a 45-minute call each month. It works as a first paid step after the map or as a return after a sprint. The Intensive is three consecutive days of collaborative decision work: wedge, pitch sentence, and first test design before you leave.",
      },
      {
        q: "What's the Intensive vs. the Sprint?",
        a: "The Intensive decides the wedge and designs the first test. The Sprint assumes the wedge is decided. I run market contact inside the two-week cap: positioning tested, first channel live, counts in hand.",
      },
      {
        q: "Can I skip straight to the Intensive or Sprint?",
        a: "Sometimes, if you've already done the clarity work elsewhere. Complete your GTM Clarity Starter and we can discuss this on your free Starter Review call.",
      },
    ],
    cta: {
      heading: "Selling five things to everyone and nothing's landing?",
      sub: "Start with the GTM Clarity Starter: twenty minutes, your whole business on one page. When you want a read, book the Starter Review after you submit.",
      button: STARTER_CTA,
    },
    links: {
      tierCta: { label: STARTER_CTA, href: SITE.starterUrl },
      heroSecondary: { label: STARTER_CTA, href: SITE.starterUrl },
      footerCta: { label: STARTER_CTA, href: SITE.starterUrl },
    },
  },

  groundswell: {
    slug: "groundswell",
    name: "Groundswell AI Customer Discoverability",
    eyebrow: "Legible to AI",
    arcLabel: "Get found",
    promise: "Get found & cited.",
    heroSub:
      "Become the brand AI recommends when your buyers ask, by earning genuine community consensus across the sources models trust, not by buying placements. Groundswell spans the whole arc: see where you stand, earn authority through the channels you already own, then run the system that sustains it as models change.",
    prerequisite: {
      label: "Phase 2",
      body: "Groundswell works once your message and wedge are already live. If prospects still don't get what you sell, start with the free GTM Clarity Starter and come back when you're clear.",
      cta: { label: "Start with GTM Clarity", href: SITE.starterUrl },
    },
    problem: {
      heading: "Buyers ask AI for a recommendation. Your competitor is the answer.",
      points: [
        {
          head: "You're invisible in ChatGPT, Perplexity, Gemini, and AI Overviews.",
          body: "51% of B2B software buyers now start their research in an AI chatbot more often than Google, and you're not in the answer they read.",
        },
        {
          head: "AI describes you wrong, or not at all.",
          body: "The model learned an outdated or vague version of you, so it hedges or hands the recommendation to someone else.",
        },
        {
          head: "Agencies want to sell you placements.",
          body: "Bought citations and faked posts don't hold. ~84% of AI citations come from earned, third-party sources models trust; paid placements are barely 0.3%.",
        },
      ],
      punch: "Nod at one of these? You're invisible exactly when buyers are deciding.",
      sources: [
        {
          label: "G2, The Answer Economy (2026)",
          href: "https://learn.g2.com/g2-2026-ai-search-insight-report",
        },
        {
          label: "Muck Rack, Generative Pulse: What Is AI Reading? (2026)",
          href: "https://www.globenewswire.com/news-release/2026/05/07/3290268/0/en/generative-pulse-earned-media-consistently-drives-ai-citations-holding-at-84.html",
        },
      ],
    },
    method: {
      heading: "From invisible to the recommendation",
      sub: "Winning used to mean mind share: the brand buyers thought of first. Now they ask AI, so what counts is model share: the name it recommends. Here's how we move you from one to the other.",
      steps: [
        { n: "01", name: "Measure your model share", body: "We put the exact questions your buyers ask to ChatGPT, Perplexity, Gemini, and AI Overviews, and score how often you come up. That baseline is your starting line." },
        { n: "02", name: "Map where AI gets its answers", body: "AI doesn't invent recommendations; it pulls from a specific set of sites, reviews, and communities in your market. We rank the ones that actually move the answer for you." },
        { n: "03", name: "Make your own content legible", body: "We shape your site and content so AI can read you clearly and describe you accurately, instead of guessing or handing the answer to a competitor." },
        { n: "04", name: "Earn genuine consensus", body: "Using your own audience and channels, we build real mentions in those trusted places. Earned, never bought; AI is built to discount the fakes." },
        { n: "05", name: "Measure the change, hand you the keys", body: "We re-measure against your baseline to show what moved, then train your team to keep it climbing." },
      ],
    },
    tiers: {
      heading: "Start where you stand",
      sub: "See where you stand, earn the consensus, then systematize it. The Audit credits 100% toward a Build within 30 days.",
      items: [
        {
          name: "AI Visibility Audit & Opportunity Map",
          price: "$1,500",
          meta: "entry",
          tagline: "Not 'are you invisible?' It's the map out you can't self-serve.",
          points: [
            "Share-of-Model across 4 engines for 20–40 real buyer prompts",
            "Competitor Share-of-Model: who's winning your citations and why",
            "Your source/citation map = your ranked seeding targets",
            "Accuracy check: where AI mis-describes you",
            "A prioritized 30/60/90 roadmap (credits toward a Build)",
          ],
        },
        {
          name: "Groundswell Authority Build",
          price: "from $15,000",
          meta: "~90 days · the hero",
          tagline: "Become the answer because the web genuinely agrees you are.",
          featured: true,
          points: [
            "Owned foundation: schema, llms.txt, entity association, answer-first content",
            "A consensus-seeding strategy built on the channels you already own",
            "The campaign run in your priority category's trusted communities",
            "Third-party verifiability signals the models weight",
            "Baseline → re-measure shows what moved, with your team trained to continue",
          ],
        },
        {
          name: "Groundswell Authority Engine",
          price: "Custom scope",
          meta: "scoped to your categories & platforms",
          tagline: "The system that keeps you the answer as models change.",
          points: [
            "Everything in the Build, extended across multiple categories and platforms",
            "A standing system to maintain consensus as models retrain and update",
            "Governance + a refresh motion your team runs, with refreshes on demand ($1,200), never a retainer",
            "A durable authority apparatus you own, not a campaign you repeat",
          ],
        },
      ],
    },
    entryPoints: [
      { who: "Traffic eroding, AI omits you", start: "Start with the Audit: see exactly where and how to win citations." },
      { who: "Message already clear, reach is the gap", start: "Go straight to an Authority Build." },
    ],
    support: {
      heading: "Keeping it fresh, on your terms, not a retainer",
      points: [
        "Refresh on demand · $1,200: a re-measure across the engines plus a seeding refresh, taken when a decision warrants it. No cadence, no retainer.",
        "Want always-on tracking between refreshes? I'll set you up in an off-the-shelf visibility tracker you own and run yourself. Live watching is a cheap commodity; the strategy is the part you hire me for.",
        "Proactive check-ins: I can re-run a focused visibility snapshot to flag when models start dropping you, so a refresh is a decision, not a surprise.",
      ],
    },
    whoFor: {
      fit: [
        "AI omits you while a competitor gets cited",
        "You have real reach to build authentic presence on",
        "You want earned visibility, not bought placements",
      ],
      notFit: [
        "You want to buy citations or astroturf communities",
        "Your positioning isn't dialed yet (start with GTM Clarity)",
      ],
    },
    faq: [
      {
        q: "Can't I just ask ChatGPT whether it mentions me?",
        a: "You can see that you're absent for free, but not why, who's winning your citations, or which sources to influence. The Audit's value is the seeding-target map, competitor Share-of-Model, and the roadmap you can't self-serve.",
      },
      {
        q: "Is this the same as buying PR placements?",
        a: "No. Placements are the thing most agencies sell and the thing that doesn't hold. Groundswell earns genuine community consensus across the sources models trust: no bought traction, no faked posts.",
      },
      {
        q: "How do you keep it current as models change?",
        a: "Book a Refresh anytime for $1,200: a re-measure across the engines plus a seeding refresh, taken when a decision warrants it. Want always-on watching in between? I'll set you up in a visibility tracker you own and run yourself. Either way, no monthly retainer.",
      },
    ],
    cta: {
      heading: "When buyers ask AI, is your competitor the answer?",
      sub: "The way in is the $1,500 Visibility Audit — the map of exactly where and how to become the answer. If prospects still don't understand what you sell, start with the GTM Clarity Starter instead.",
      button: "Explore the Visibility Audit",
    },
    links: {
      tierCta: { label: "Book a free intro call", href: SITE.bookingUrl },
      heroSecondary: { label: "Start with GTM Clarity", href: SITE.starterUrl },
      footerCta: { label: "See Groundswell pricing", href: "#pricing" },
    },
    whereFits: {
      heading: "Groundswell when AI is the gap, GTM Clarity when the message is.",
      sub: "If prospects don't understand what you sell, start with the GTM Clarity Starter. If the pitch is clear but AI recommends your competitor, start with the Visibility Audit.",
    },
  },
};

export const LINE_SLUGS = Object.keys(LINES_DETAIL);

export function getLine(slug: string): LineDetail | undefined {
  return LINES_DETAIL[slug];
}
