/**
 * Detail-page content for the three Fronz lines.
 * Sourced from the offering kits (GTM Clarity Jam / Map+Playbook / Build,
 * Groundswell Offering Kit, Business Command Center one-pager) + the GTM Clarity Map.
 */

export type Tier = {
  name: string;
  price: string;
  meta?: string;
  tagline?: string;
  points: string[];
  featured?: boolean;
  note?: string;
};

export type LineDetail = {
  slug: string;
  name: string;
  eyebrow: string; // "Legible to your customers"
  arcLabel: string; // "Get clear"
  promise: string;
  heroSub: string;
  problem: {
    heading: string;
    points: { head: string; body: string }[];
    punch?: string;
    sources?: { label: string; href: string }[];
  };
  differentiator?: { heading: string; body: string };
  method: {
    heading: string;
    sub?: string;
    steps: { n: string; name: string; body: string }[];
  };
  tiers: { heading: string; sub?: string; items: Tier[] };
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
};

export const ARC = [
  { slug: "gtm-clarity", label: "Get clear", line: "GTM Clarity", legibleTo: "your customers" },
  { slug: "groundswell", label: "Get found", line: "Groundswell AI Discoverability", legibleTo: "AI" },
] as const;

export const LINES_DETAIL: Record<string, LineDetail> = {
  "gtm-clarity": {
    slug: "gtm-clarity",
    name: "GTM Clarity",
    eyebrow: "Legible to your customers",
    arcLabel: "Get clear",
    promise: "Know what to say.",
    heroSub:
      "Get clear on what to say, to whom, and how to reach them, then build the go-to-market system that does it. GTM Clarity spans the whole arc: from deciding your one sentence and your wedge, to a formalized playbook, to a running go-to-market machine your team owns.",
    problem: {
      heading: "It isn't a marketing problem. It's a clarity problem.",
      points: [
        {
          head: "You can explain it five ways, and none of them stick.",
          body: "Prospects nod, then don't buy. You keep rewriting the headline when the real gap is the position underneath it.",
        },
        {
          head: "You sound like everyone else in your category.",
          body: "Your pitch could sit on three competitors' sites, so buyers default to price or to no decision at all.",
        },
        {
          head: "You're running every tactic, but none of them convert.",
          body: "Posting, emailing, campaigns, all going at once. Without a sharp position and one wedge, each tactic works harder for less.",
        },
      ],
      punch: "Nod at one of these? That's the deal you're leaving on the table.",
    },
    method: {
      heading: "From blur to the words that land",
      sub: "Clarity is a decision, not copy. We decide it, document it, then build the system that runs it, and you own every layer.",
      steps: [
        { n: "01", name: "Decide the position", body: "Separate product from channel from model, choose your one wedge, and land the one sentence. Positioning before tactics, every time. (This is the Jam.)" },
        { n: "02", name: "Productize the message", body: "Turn the decision into a reusable messaging set and real, specific ICPs your whole team can use." },
        { n: "03", name: "Map the go-to-market", body: "The full offer × customer × channel map, wedge highlighted, gaps named, plus the outreach playbook to run it." },
        { n: "04", name: "Build & run the machine", body: "Stand up the channel and content infrastructure across multiple wedges, with your team trained to operate it without you." },
      ],
    },
    tiers: {
      heading: "Three ways in",
      sub: "Each tier is a complete step you own. Start where you are. The Jam credits 100% toward the Map + Playbook or a Build within 30 days.",
      items: [
        {
          name: "GTM Clarity Jam",
          price: "$1,500",
          meta: "2-hour 1:1 · recorded",
          tagline: "Walk in with a blur. Walk out with a sentence and a wedge.",
          featured: true,
          points: [
            "Live decision-mapping of your offers, customers, and tactics",
            "Your one clear positioning sentence",
            "Your one decided wedge (offer × customer × channel)",
            "A recap artifact you can act on Monday",
            "Credits 100% toward the Map + Playbook or a Build within 30 days",
          ],
        },
        {
          name: "Map + Playbook",
          price: "$5,000",
          meta: "~2–3 weeks · workshop + async build",
          tagline: "Walk out with the system to run your wedge.",
          points: [
            "Productized messaging set: tagline, one-liner, elevator, audience variants, objection reframes",
            "Refined ICP profiles (JTBD, pains, watering holes, triggers)",
            "The full GTM map, formalized, with the wedge highlighted",
            "First-wedge outreach playbook: channel, message, cadence, CTAs, metrics",
            "A sequenced 90-day plan",
          ],
        },
        {
          name: "GTM Build",
          price: "$15k–$25k",
          meta: "scoped per engagement",
          tagline: "We don't just hand you the plan. We build the machine and get it running.",
          points: [
            "2–3 wedges fully built, not just documented",
            "Channel infrastructure stood up (email, content engine, lead capture + nurture)",
            "A repeatable content engine running",
          "Done-with-you execution with your team trained to run it",
          "A measurement spec your team can run to see what's actually working",
        ],
        },
      ],
    },
    entryPoints: [
      { who: "Early / blurry founder", start: "Start with the Jam: decide your wedge and sentence." },
      { who: "Past PMF, tactics feel hit-or-miss", start: "Start with Map + Playbook or a Build: install the system." },
    ],
    whoFor: {
      fit: [
        "You're selling multiple things and need to focus",
        "Pre- or post-PMF, but the message isn't landing",
        "You want to run the system yourself, not rent it forever",
      ],
      notFit: [
        "You want done-for-you marketing forever",
        "You're not willing to commit to a single focus",
      ],
    },
    faq: [
      {
        q: "Is this just another agency engagement?",
        a: "No retainer, no bloat. We decide it together, your team runs it, and you own every artifact. I'm on call, not on the meter.",
      },
      {
        q: "I can't afford a big engagement. Where do I start?",
        a: "Start at $1,500 with the Jam. It pays for itself in clarity, and it credits 100% toward the Map + Playbook or a Build within 30 days.",
      },
      {
        q: "What's the difference between the Jam and the Map + Playbook?",
        a: "The Jam decides your wedge and sentence in two hours. The Map + Playbook turns that decision into a formalized, runnable system: messaging, ICPs, the full map, and an outreach playbook.",
      },
    ],
    cta: {
      heading: "Selling five things to everyone and nothing's landing?",
      sub: "In two hours we'll find your one sentence and your one wedge. That's the Jam.",
      button: "Book a GTM Clarity Jam",
    },
  },

  groundswell: {
    slug: "groundswell",
    name: "Groundswell AI Discoverability",
    eyebrow: "Legible to AI",
    arcLabel: "Get found",
    promise: "Get found & cited.",
    heroSub:
      "Become the brand AI recommends when your buyers ask, by earning genuine community consensus across the sources models trust, not by buying placements. Groundswell spans the whole arc: see where you stand, earn authority through your own distribution, then run the system that sustains it as models change.",
    problem: {
      heading: "Buyers ask AI for a recommendation. Your competitor is the answer.",
      points: [
        {
          head: "You're invisible in ChatGPT, Perplexity, Gemini, and AI Overviews.",
          body: "51% of B2B software buyers now start their research in an AI chatbot more often than Google — and you're not in the answer they read.",
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
          price: "$15,000",
          meta: "~90 days · the hero",
          tagline: "Become the answer because the web genuinely agrees you are.",
          featured: true,
          points: [
            "Owned foundation: schema, llms.txt, entity association, answer-first content",
            "A consensus-seeding strategy built on your existing distribution channels",
            "The campaign run in your priority category's trusted communities",
            "Third-party verifiability signals the models weight",
            "Baseline → re-measure shows what moved, with your team trained to continue",
          ],
        },
        {
          name: "Groundswell Authority Engine",
          price: "from $30,000",
          meta: "the system",
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
        "Refresh on demand · $1,200: a re-measure across the engines plus a seeding refresh, taken when a decision warrants it — no cadence, no retainer.",
        "Want always-on tracking between refreshes? I'll set you up in an off-the-shelf visibility tracker you own and run yourself. Live watching is a cheap commodity; the strategy is the part you hire me for.",
        "Proactive check-ins: I can re-run a focused visibility snapshot to flag when models start dropping you — so a refresh is a decision, not a surprise.",
      ],
    },
    whoFor: {
      fit: [
        "AI omits you while a competitor gets cited",
        "You have real distribution to build authentic presence on",
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
        a: "Book a Refresh anytime for $1,200 — a re-measure across the engines plus a seeding refresh, taken when a decision warrants it. Want always-on watching in between? I'll set you up in a visibility tracker you own and run yourself. Either way, no monthly retainer.",
      },
    ],
    cta: {
      heading: "When buyers ask AI, is your competitor the answer?",
      sub: "Start with a $1,500 Visibility Audit: the map of exactly where and how to become the answer.",
      button: "Book a Visibility Audit",
    },
  },
};

export const LINE_SLUGS = Object.keys(LINES_DETAIL);

export function getLine(slug: string): LineDetail | undefined {
  return LINES_DETAIL[slug];
}
