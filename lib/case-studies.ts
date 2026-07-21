/**
 * Fronz case studies — portfolio-tier proof for the service lines.
 * Reusable template pattern (mirrors lib/lines.ts): each entry renders through
 * <CaseStudyDetail>. Edit content here, not in components.
 */

export type BeforeAfterRow = {
  label: string;
  before: string;
  after: string;
  /** Emphasize this row (renders after column bolder). */
  strong?: boolean;
};

export type ForkOption = {
  /** e.g., "Option A" */
  label: string;
  /** e.g., "The Intervention" */
  name: string;
  /** short subtitle, e.g., "better company, founder-supported" */
  tagline: string;
  /** the promise sentence */
  promise: string;
  /** mono-labeled attribute rows, in comparable order across options */
  attributes: { label: string; value: string }[];
  strengths: string[];
  weaknesses: string[];
  /** Visual emphasis — the path the leave-behind runs with */
  recommended?: boolean;
  /**
   * Render as a short secondary card (promise + why-not).
   * Use for the path-not-taken so the doc doesn't create equal-choice fatigue.
   */
  compact?: boolean;
};

export type PitchGroup = {
  /** the fork this group belongs to */
  forkName: string;
  variants: {
    /** e.g., "1 · Direct" */
    label: string;
    sentence: string;
  }[];
  note?: string;
};

export type NextStep = {
  n: string;
  name: string;
  timing?: string;
  /** true = this is a gate; downstream steps depend on it */
  gate?: boolean;
  body: string;
  bullets?: string[];
  deliverable?: string;
};

export type Persona = {
  name: string;
  /** e.g., "Paired with Option A" */
  pairedWith?: string;
  recommended?: boolean;
  situation: string;
  pain: string;
  where: string;
  why: string;
  proof: string;
};

export type CompetitorRow = {
  name: string;
  length: string;
  price: string;
  positioning: string;
  /** Optional link — used on client deliverables only */
  url?: string;
};

export type CaseStudy = {
  slug: string;

  /** Header + metadata strip */
  client: { name: string; company: string; note?: string };
  session: {
    /** e.g., "GTM Clarity Jam · Group format" */
    format: string;
    /** e.g., "July 1, 2026" */
    date: string;
    /** e.g., "2 hours · 7 participants · recorded" */
    detail: string;
  };

  hero: {
    eyebrow: string;
    /** headline; the token wrapped in curly braces {like_this} becomes the Highlight */
    headline: string;
    subhead: string;
  };

  beforeAfter: {
    kicker: string;
    heading: string;
    intro?: string;
    /** column labels for the header row */
    columns: { before: string; after: string };
    rows: BeforeAfterRow[];
    /** callouts that the row-table doesn't capture */
    notCaptured?: { head: string; body: string }[];
  };

  fork: {
    kicker: string;
    heading: string;
    /** the one question, with a {highlight} token for the marker swipe */
    question: string;
    body: string;
    options: ForkOption[];
    trap: {
      heading: string;
      intro: string;
      failures: { head: string; body: string }[];
      close: string;
    };
    recommendation: {
      /** e.g., "Option A (The Intervention)" — becomes the section title */
      option: string;
      /** the leading recommendation sentence with a {highlight} token */
      headline: string;
      reasons: { head: string; body: string }[];
      close?: string;
      /** The one pitch sentence the leave-behind commits to */
      pitch?: {
        label: string;
        sentence: string;
        note?: string;
      };
    };
  };

  keystoneProduct?: {
    kicker: string;
    heading: string;
    details: { label: string; value: string }[];
    subProductsOut?: string[];
    market: {
      heading: string;
      intro?: string;
      rows: CompetitorRow[];
      readOnPrice: string;
    };
  };

  icp?: {
    kicker: string;
    heading: string;
    intro: string;
    personas: Persona[];
    recommendation: string;
    realityCheck?: string;
  };

  pitchOptions?: {
    kicker: string;
    heading: string;
    intro: string;
    groups: PitchGroup[];
  };

  mapFindings?: {
    kicker: string;
    heading: string;
    findings: { icon: string; label: string; body: string }[];
  };

  nextSteps?: {
    kicker: string;
    heading: string;
    intro?: string;
    steps: NextStep[];
  };

  cta?: {
    kicker: string;
    heading: string;
    sub: string;
    button: string;
    href: string;
  };

  /**
   * Deliverable-only: skip the shared Jam → Playbook → Build ladder block.
   * Use when the leave-behind should end on the client's next steps + CTA
   * without a productized upsell section.
   */
  hideWhereFits?: boolean;
};

/* ------------------------------------------------------------------ */
/* Sanctuary — Andrej Berlin & Anna Zhu · GTM Clarity Jam pilot        */
/* ------------------------------------------------------------------ */

const sanctuary: CaseStudy = {
  slug: "sanctuary",

  client: {
    name: "Andrej Berlin & Anna Zhu",
    company: "The Sanctuary / Deep Work",
    note: "Builder community + product/org design studio, pre-monetization",
  },
  session: {
    format: "GTM Clarity Jam · Group format",
    date: "July 1, 2026",
    detail: "2 hours · 4 participants · recorded",
  },

  hero: {
    eyebrow: "Case study · GTM Clarity Jam",
    headline:
      "From a $25k longevity retreat for the rich to a {founder intervention} that saves runway.",
    subhead:
      "A two-hour working session that turned The Sanctuary's 12-product, 7-audience sprawl into one anchor offering, two channels, and a single fork to decide the one-sentence pitch.",
  },

  beforeAfter: {
    kicker: "The transformation",
    heading: "What was on the board vs. what came off it.",
    intro:
      "The Sanctuary team came in with a sprawling map: three businesses tangled into one path to purchase, twelve products with a single price between them, and an ICP (ideal customer profile: the one buyer everything is built around) of \"financially-free founders\" that couldn't scale. Two hours later, the board looked like this.",
    columns: { before: "Before the Jam", after: "After the Jam" },
    rows: [
      {
        label: "Customers",
        before: "7 profiles across 3 businesses",
        after: "1 merged profile: Founders & Builders (individuals)",
        strong: true,
      },
      {
        label: "Products",
        before: "12 items, only 1 priced ($20–25k residency)",
        after: "1 anchor offering: The Sanctuary Residency, plus a defined gap for a missing rung between free and $8k",
        strong: true,
      },
      {
        label: "Channels",
        before: "8 tactics tangled with products",
        after: "3 clean channels: Telegram (community), email list (sales), personal outreach",
      },
      {
        label: "Speculative bets",
        before: "Funder access, hubs, co-ownership, user acquisition all on the board",
        after: "Removed. No monetization, no reach.",
      },
      {
        label: "Alumni membership",
        before: "Standalone paid product",
        after: "Built into the residency price. Functions as a marketing channel, not a SKU.",
      },
      {
        label: '"Financially free" ICP',
        before: "The stated core customer",
        after: "Killed. Inaccurate, unscalable, no urgent need.",
      },
      {
        label: "Health / longevity",
        before: "Core hero of the pitch",
        after: "Bonus, not core. A supportive environment, not the promise.",
      },
      {
        label: "The original pitch",
        before:
          "\"Sanctuary curates financially-free founders and provides upgrades to body, mind, and product through IRL events, residencies, and community.\"",
        after: "Fork identified. Pitch sentence pending one decision (see below).",
      },
    ],
    notCaptured: [
      {
        head: "A proven reach engine, unrecognized",
        body: "Telegram + email already had reach and had converted one client through the newsletter. It was hiding in the \"parked\"/\"online\" tags. Most founders at this stage don't have this, and it changes what the ladder (the path a buyer walks from free to paid to premium) can be.",
      },
      {
        head: "The category noun quietly upgraded",
        body: '"Retreat / residency" softened to "intervention / reboot": a purposeful stay, not a getaway. A positioning upgrade hiding in a vocabulary shift.',
      },
    ],
  },

  fork: {
    kicker: "The one decision left",
    heading: "One question determines the pitch sentence, the price, and the buyer.",
    question: "Is The Sanctuary primarily selling a better {company}, or a better {founder}?",
    body: "The two answers imply different buyers with different urgency, different proofs of success, different price justifications, and different competitors. Trying to promise both is what produced the fuzzy \"unblocking / magic / rejuvenation / clarity\" language in the GTM Clarity Jam — real feelings in the room, but the symptom of an unresolved fork. The pitch sentence can't lock until this does.",
    options: [
      {
        label: "Option A",
        name: "The Intervention",
        tagline: "better company, founder-supported",
        promise:
          "We get the founder unblocked so the venture moves. Health, sauna, cold plunge, meditation, and place are all present, but as the supportive environment that makes the intervention possible, not the product.",
        attributes: [
          { label: "Buyer's job", value: "\"My company is stalling and we're burning runway. I need to get unstuck and back to shipping.\"" },
          { label: "What they leave with", value: "A decisive next move, a repositioned product, a strategy they'll execute, and (as a side effect) more energy than they came with." },
          { label: "Health role", value: "Present, felt, not sold. No bloodwork, no protocols, no biomarkers." },
          { label: "Category", value: "Intervention / reboot / working residency" },
          { label: "Proof", value: '"I went in stuck on X; I came out with Y decided/launched/repositioned." Business outcomes.' },
          { label: "Direct competitor", value: "Founder Camp Morocco (~$4,050 · 2 weeks · deep work + coaching + surf/yoga)." },
        ],
        strengths: [
          "Urgency: buyers with a business at risk act now.",
          "Priceability: $6–10k defends against saved runway.",
          "Provable ROI: business outcomes are demonstrable in 2 weeks.",
          "Distinct market position: one direct comp, not a crowded field.",
        ],
        weaknesses: [
          "Underplays the health/place \"magic\" that Andrej and Anna love.",
        ],
      },
      {
        label: "Option B",
        name: "The Reboot",
        tagline: "better founder, company clarified",
        promise:
          "We restore the founder (energy, clarity, creative spark, mental health), and along the way the company gets sharper too. Light health/mental-health language framed as care, not clinical.",
        attributes: [
          { label: "Buyer's job", value: "\"I'm running on empty. I need to come back as the founder my company actually needs.\"" },
          { label: "What they leave with", value: "Restored energy, mental clarity, creative reconnection, and a clearer view of what to do next with the company." },
          { label: "Health role", value: "In the pitch, framed as care and sustainable performance. Still no bloodwork or clinical claims." },
          { label: "Category", value: "Reboot / reset / founder retreat" },
          { label: "Proof", value: '"I arrived depleted; I left restored and clear." Human-transformation testimonials.' },
          { label: "Direct competitors", value: "Elite Retreat Marbella, Founder's Circle Italy, Founder's Oasis, Casa Slow, Intayya, Reset Retreat Mallorca. A crowded field, most differentiating on bio-data (which The Sanctuary is not building)." },
        ],
        strengths: [
          "Emotionally resonant, true to Anna's therapeutic gift.",
          "On-brand with \"The Sanctuary\" as a name.",
        ],
        weaknesses: [
          'Hardest to price and prove ("how is this not an expensive vacation?").',
          "Fights a crowded market without the standard bio-data differentiator.",
          "Burnout-as-market is less urgent than stalling-as-market.",
          "A mid-tier offer in the $100–$1,000 range is structurally harder here, because most true restoration happens in-person.",
        ],
      },
    ],
    trap: {
      heading: "The trap: trying to do both",
      intro:
        "The pull in the GTM Clarity Jam was toward \"both, at once\": restore the founder AND unblock the company, with health AND strategy AND peer group AND therapeutic support. It sounds complete. In practice, it's the same sprawl they walked in with, just described more elegantly. Four concrete failures follow.",
      failures: [
        {
          head: "The sales pitch sentence won't finish.",
          body: "Every attempt at a one-liner ballooned in the GTM Clarity Jam because the promise was two promises. You can't compress that into one sentence without going abstract, and abstract doesn't sell.",
        },
        {
          head: "The price can't justify itself.",
          body: "For $8k, buyers ask \"for what, exactly?\" Two answers = zero answers. One answer, sharply, sells.",
        },
        {
          head: "The proof set is contradictory.",
          body: "Business testimonials serve Option A; human-transformation testimonials serve Option B. Choosing which past stories to feature is choosing the option.",
        },
        {
          head: "The missing rung can't be designed.",
          body: "A mid-tier offer must be a slice of the anchor offering. If the anchor is two things, the mid-tier is either half of each (weak) or split into two products.",
        },
      ],
      close: "Pick one as the promise. The other becomes a felt, honest side effect.",
    },
    recommendation: {
      option: "Fronz's recommendation: Option A (The Intervention)",
      headline:
        "Pick Option A. Lean hard into Deep Work's prior facilitation success and network. Focus on creating real outcomes for companies by {investing in their founders}.",
      reasons: [
        {
          head: "It makes the residency a business expense.",
          body: "Not a personal indulgence. Founders with an urgent need can justify $6–10k against saved runway; they can't justify the same amount for \"restoration\" without a bloodwork/biomarker differentiator they've chosen not to build.",
        },
        {
        head: "It matches the existing reach.",
        body: "Telegram and email built a high-agency, builder-identity audience: the people who admit \"my company is stalling\" more readily than \"I'm depleted.\" The channels they own map to Buyer A.",
        },
        {
          head: "It has a clean path to the missing rung.",
          body: "A paid audit or bi-weekly retainer is a genuine slice of Option A's promise. Option B has no equally strong mid-tier candidate.",
        },
      ],
      close:
        "This isn't a rejection of the health, place, and magic — those become the how that makes the intervention uniquely theirs. The promise is the what.",
    },
  },

  keystoneProduct: {
    kicker: "The anchor offering",
    heading: "The Sanctuary Residency",
    details: [
      { label: "Format", value: "2-week residential" },
      { label: "Cohort", value: "Small. Target ~8–12 (cost-model check needed)." },
      { label: "Price", value: "~$XXk. Pending fork decision." },
      { label: "Included", value: "The residency, alumni community membership (channel, not add-on), core method, environment" },
      {
        label: "Optional add-ons",
        value:
          "Sauna, cold plunge, and optional longevity-info sessions where Andrej shares his own experience (not medical advice). Bonus, not core.",
      },
    ],
    subProductsOut: [
      "Organizational / team edition",
      "Ongoing 1:1 retainer",
      "Medical health protocols",
      "Facilitated psychotherapy",
      "Community-tools revenue",
    ],
    market: {
      heading: "Where it sits in the market",
      intro:
        "The direct 2-week founder-retreat comp charges $4,050. The Sanctuary's $6–10k target requires earning the premium through sharper outcome or sharper delivery, which is why picking the option matters more than picking the price.",
      rows: [
        { name: "Founder Camp Morocco", length: "14 days", price: "$4,050", positioning: "Deep work + coaching + surf/yoga" },
        { name: "Reset Retreat Mallorca", length: "5 days", price: "€2,900", positioning: "Digital detox, nervous system reset, 90-day plan" },
        { name: "Elite Retreat Marbella", length: "4 days", price: "By application", positioning: "Performance reset for founders" },
        { name: "Founder's Oasis Black Forest", length: "~5 days", price: "By application", positioning: "Transformational coaching, group" },
        { name: "Fazlani (India)", length: "14–21 days", price: "Clinical pricing", positioning: "Severe burnout Ayurvedic reset" },
        { name: "Istana Private", length: "3 wk – 3 mo", price: "££££", positioning: "1:1 clinical / bespoke" },
      ],
      readOnPrice:
        "$6–8k for 2 weeks is defensible only if outcome, delivery, or peer signal beats Founder Camp Morocco. $10k+ requires clear category differentiation. The sharper the promise (Option A or Option B, not both), the higher the defensible price.",
    },
  },

  icp: {
    kicker: "The refined ICP",
    heading: "Founders & Builders, with a finer cut still to make.",
    intro:
      "Seven profiles merged into one working ICP. The remaining question is which buyer type is the primary. A finer cut of the same fork.",
    personas: [
      {
        name: "The Stalled Founder",
        pairedWith: "Paired with Option A",
        recommended: true,
        situation: "Has a product/company, has burned some runway, is stuck in their own head, can't ship or can't get traction.",
        pain: "\"I'm losing momentum and I don't know what to do next.\"",
        where: "In Telegram, on the email list, or 1-degree away.",
        why: "Urgency. The company is at risk.",
        proof: "Before/after of a company that moved.",
      },
      {
        name: "The Depleted Founder",
        pairedWith: "Paired with Option B",
        situation: "Running a company, running on empty, aware they're becoming a bottleneck to their own venture.",
        pain: "\"I've lost my spark and I'm scared what that means for my company.\"",
        where: "Harder to reach in the current channels. People who admit burnout publicly aren't Telegram's dominant vibe.",
        why: "Self-preservation. The founder is at risk.",
        proof: "Transformation testimonials, energy/clarity claims.",
      },
    ],
    recommendation:
      "The Stalled Founder pairs with the proven channels and the team's actual delivery skills (strategy, research, design, org). The Depleted Founder pairs better with the therapeutic gift but is harder to reach through Telegram/email and fights a crowded market.",
    realityCheck:
      "Reach reality check: ~20 founder leads + a handful of protocol decision-makers, none warm. Reach needs to be built regardless of fork, but Buyer A is closer to the existing community's identity.",
  },

  pitchOptions: {
    kicker: "One-sentence pitches · candidates",
    heading: "Four candidates, two options. Say each out loud.",
    intro:
      "Each candidate commits to one option. Notice which one you can defend without adding a caveat.",
    groups: [
      {
        forkName: "Option A · The Intervention",
        variants: [
          {
            label: "1 · Direct",
            sentence:
              "\"For founders burning runway while stuck in their own heads, The Sanctuary is a two-week intervention that gets you unstuck and back to shipping. You leave with a decisive next move and real momentum.\"",
          },
          {
            label: "2 · Softer, keeps the \"magic\"",
            sentence:
              "\"For founders whose company has stalled, The Sanctuary is a two-week working residency where sharp strategy, hand-picked peers, and a restorative environment converge to get you unstuck. You leave with a sharper company and more energy than you came with.\"",
          },
        ],
        note: "Candidate 1 is a promise about the venture with a felt side effect; Candidate 2 is a promise about the venture that names the environment as part of the method, not the reward.",
      },
      {
        forkName: "Option B · The Reboot",
        variants: [
          {
            label: "3 · Direct",
            sentence:
              "\"For founders running on empty, The Sanctuary is a two-week reboot that restores your energy, clarity, and creative spark — so you come back as the founder your company actually needs.\"",
          },
          {
            label: "4 · Company-tied",
            sentence:
              "\"For founders who've become the bottleneck to their own venture, The Sanctuary is a two-week reset where deep restoration and honest strategy work meet, so you and your company both come back stronger.\"",
          },
        ],
        note: "Candidate 3 is a promise about the founder with company as consequence; Candidate 4 tries to hold both — which is where the trap begins.",
      },
    ],
  },

  mapFindings: {
    kicker: "What the map showed",
    heading: "The whole diagnosis in four lines.",
    findings: [
      {
        icon: "✅",
        label: "Working",
        body: "Telegram + email already exist and already have reach. A rare asset at this stage.",
      },
      {
        icon: "⚠️",
        label: "Mismatch",
        body: "The ~20-founder network is the best proximate audience, but they're not warm. Thawing is required before selling.",
      },
      {
        icon: "⭕",
        label: "Gap",
        body: "No mid-tier offer between free content and the ~$8k residency: the missing rung in the ladder. Highest-leverage thing to build next.",
      },
      {
        icon: "💡",
        label: "Easy win",
        body: "The strategy sessions Andrej is already testing with a current client can become that missing rung. Brand them under The Sanctuary.",
      },
    ],
  },

  nextSteps: {
    kicker: "What comes next",
    heading: "Five steps, in dependency order.",
    intro:
      "Nothing else moves until Step 1 lands. The rest are sequenced accordingly.",
    steps: [
      {
        n: "01",
        name: "Answer the fork",
        timing: "This week",
        gate: true,
        body: "Pick Option A or Option B. Not \"both.\" Not \"we'll see.\" One pitch sentence, said out loud, that survives 24 hours without needing a caveat.",
        deliverable: "A chosen pitch sentence (one of the four candidates, or a variant).",
      },
      {
        n: "02",
        name: "Build the missing rung",
        timing: "2–4 weeks",
        body: "The mid-tier offer between free content and the residency. Design it as a slice of the chosen anchor offering, not a separate product. Delivered under one brand (\"The Sanctuary team\"), not individual consultant billing.",
        bullets: [
          "Price range: $100–$1,000 (a $100 → $1,000 → $8,000 ladder gives the recommended ~8–10x jumps).",
          "Paid Product/Founder Audit (~$300–500): 90-min live diagnostic + written recap. Best for Option A.",
          "Bi-weekly Strategy Retainer (~$500–800/mo): what Andrej is already testing. Works for either option.",
          "Founder Reset Sprint (~$300–500, weekend live cohort): applies one part of The Sanctuary method. Best for Option B.",
        ],
      },
      {
        n: "03",
        name: "Build the marketing systems",
        timing: "4–8 weeks, parallel",
        body: "The engine that carries the pitch to the right ears.",
        bullets: [
          "Telegram: the community/social-proof engine. Every free asset ends with a clear next step (mid-tier first, residency second).",
          "Email list: the sales channel. Design a 5–7-email series from \"aware\" → \"problem\" → \"solution\" → \"product\" → \"buy.\"",
          "Personal outreach infrastructure: cadence and script for the day-to-day.",
        ],
      },
      {
        n: "04",
        name: "Warm up the ~20-founder list",
        timing: "2–3 weeks, starts as soon as fork is decided",
        body: "The named commitment from the GTM Clarity Jam: identify ~20 founder leads plus a few protocol decision-makers and initiate re-engagement. These leads are not warm. They need thawing before a sales conversation.",
        bullets: [
          "Segment against the chosen option (Buyer A vs. B); remove non-fits.",
          "First-touch: a genuinely useful, no-ask message. Reference something specific.",
          "Second-touch (2–3 weeks later): invite to the mid-tier offer or a free workshop.",
          "Track: replies, conversions to the mid-tier offer, conversions to residency conversations.",
        ],
      },
      {
        n: "05",
        name: "Lock cohort + price",
        timing: "Before first paid residency",
        body: "Turn the ~$XXk placeholder into a real number.",
        bullets: [
          "Minimum cohort size for margin (venue + food + team costs).",
          "Per-person price, target range: $6–8k at Option A sharpness; $10k+ requires clearer category differentiation.",
          "Flat vs. tiered (shared/private room, early-bird).",
          "Add-on pricing (bundled or à la carte).",
        ],
        deliverable: "A real number replaces ~$XXk everywhere on the sales page.",
      },
    ],
  },

  cta: {
    kicker: "The Jam that produced this",
    heading: "Walk in with a blur. Walk out with a decision.",
    sub:
      "Two hours, 1:1, recorded. We separate what you sell from how people find it, decide your position, cut to your one urgent customer, and pick the wedge to run. You leave with a pitch sentence, a 90-day plan, and a recap you act on Monday.",
    button: "Book a GTM Clarity Jam",
    href: "/book",
  },
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  sanctuary,
};

export const CASE_STUDY_SLUGS = Object.keys(CASE_STUDIES);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES[slug];
}
