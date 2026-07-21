/**
 * The Sanctuary GTM Clarity Jam leave-behind — v2
 * Revised July 10, 2026 from client feedback.
 *
 * Positioning: curated recommendation, not an options dump.
 * Run hard with Option A (Intervention). Keep the fork visible;
 * collapse B to "path not taken." One buyer. One pitch sentence.
 */

import type { CaseStudy } from "../case-studies";

export const sanctuaryV2: CaseStudy = {
  slug: "sanctuary-v2",

  client: {
    name: "Andrej Berlin & Anna Zhu",
    company: "The Sanctuary / Deep Work",
    note: "Prepared July 1, 2026 · Revised July 10, 2026 (v2)",
  },
  session: {
    format: "GTM Clarity Jam · Group format",
    date: "July 1, 2026",
    detail: "2 hours · 4 participants · recorded",
  },

  hero: {
    eyebrow: "Your GTM Clarity Jam recap · v2",
    headline:
      "The decisions you made, the fork you still need to answer, and {what comes next.}",
    subhead:
      "What you cleared on the board, Fronz's recommendation on the open fork (Option A), one buyer, one pitch sentence, and five next steps written to that path.",
  },

  beforeAfter: {
    kicker: "What you cleared in the GTM Clarity Jam",
    heading: "Your board, before and after.",
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
        after:
          "1 anchor: The Sanctuary Residency — and no offer between free content and ~$8k",
        strong: true,
      },
      {
        label: "Channels",
        before: "8 tactics tangled with products",
        after:
          "3 clean channels: Telegram (community), email list (sales), personal outreach",
      },
      {
        label: "Speculative bets",
        before:
          "Funder access, hubs, co-ownership, user acquisition all on the board",
        after: "Removed. No monetization, no reach.",
      },
      {
        label: "Alumni membership",
        before: "Standalone paid product",
        after:
          "Built into the residency price. A marketing channel after purchase, not a separate product.",
      },
      {
        label: '"Financially free" buyer',
        before: "Your stated core customer",
        after: "Killed. Inaccurate, unscalable, no urgent need.",
      },
      {
        label: "Health / longevity",
        before: "Core hero of the pitch",
        after: "Bonus, not core. Supportive environment, not the promise.",
      },
      {
        label: "Your original pitch",
        before:
          '"Sanctuary curates financially-free founders and provides upgrades to body, mind, and product through IRL events, residencies, and community."',
        after: "Replaced below with one recommended sentence under Option A.",
      },
    ],
    notCaptured: [
      {
        head: "You already have Telegram and email, but you aren't using them for reach.",
        body: "Both already reach founders, and the newsletter already converted one client. They were hiding under the \"parked\"/\"online\" tags. Most founders at your stage don't have this — it changes what you can sell next.",
      },
      {
        head: "Retreat / residency → intervention / reboot.",
        body: "Your category noun sharpened in the Jam: a purposeful stay, not a getaway. Hold onto that. It's more concrete, not softer.",
      },
    ],
  },

  fork: {
    kicker: "The fork — and the path we're recommending",
    heading:
      "One question still matters. Fronz's answer is Option A. The rest of this document runs with that.",
    question:
      "Is The Sanctuary primarily selling a better {company}, or a better {founder}?",
    body: "Trying to promise both is what produced the fuzzy \"unblocking / magic / rejuvenation / clarity\" language in the Jam — real feelings, but the symptom of an unresolved fork. Below: the recommended path in full, and the other path in brief so you can reject the recommendation cleanly if it's wrong.",
    options: [
      {
        label: "Option A",
        name: "The Intervention",
        tagline: "better company, founder-supported",
        recommended: true,
        promise:
          "You get the founder unblocked so the venture moves. Health, sauna, cold plunge, meditation, and place are present — as the environment that makes the intervention possible, not as the product.",
        attributes: [
          {
            label: "Buyer's job",
            value:
              '"My company is stalling and we\'re burning runway. I need to get unstuck and back to shipping."',
          },
          {
            label: "What they leave with",
            value:
              "A decisive next move, a repositioned product, a strategy they'll execute, and (as a side effect) more energy than they came with.",
          },
          {
            label: "Health role",
            value:
              "Present, felt, not sold. No bloodwork, no protocols, no biomarkers.",
          },
          {
            label: "Category",
            value: "Intervention / reboot / working residency",
          },
          {
            label: "What proof looks like",
            value:
              '"I went in stuck on X; I came out with Y decided/launched/repositioned." Company outcomes.',
          },
          {
            label: "Direct competitor",
            value:
              "Founder Camp Morocco (~$4,050 · 2 weeks · deep work + coaching + surf/yoga).",
          },
        ],
        strengths: [
          "Urgency: buyers with a business at risk act now.",
          "Priceability: $6–10k defends against saved runway.",
          "Provable in 2 weeks: company outcomes you can point to.",
          "Less crowded: one direct comp, not a field of retreat brands.",
        ],
        weaknesses: [
          'Underplays the health/place "magic" you and Anna love — on purpose. Magic stays in the delivery, not the promise.',
        ],
      },
      {
        label: "Option B",
        name: "The Reboot",
        tagline: "better founder, company clarified",
        compact: true,
        promise:
          "Restore the founder (energy, clarity, creative spark). The company gets sharper along the way. True to Anna's gift and the Sanctuary name — and harder to price, prove, and sell through your current channels.",
        attributes: [],
        strengths: [],
        weaknesses: [
          "Crowded retreat market without bio-data as a differentiator; burnout buyers are less urgent than stalled-company buyers; and you don't have a strong mid-tier offer shape for pure restoration. Choose this only if Option A feels like a false self.",
        ],
      },
    ],
    trap: {
      heading: "The trap: trying to do both",
      intro:
        "\"Both, at once\" sounds complete. In practice it's the same sprawl you walked in with — and usually kills the offer. Four failures if you hold both:",
      failures: [
        {
          head: "Your one-liner ballooned with each attempt.",
          body: "You saw this in the Jam. Two promises can't compress without going abstract, and abstract doesn't sell.",
        },
        {
          head: "Your price can't justify itself.",
          body: 'For $8k, buyers ask "for what, exactly?" Two answers = zero answers.',
        },
        {
          head: "Your proof stories contradict each other.",
          body: "Company-outcome stories sell A. Transformation stories sell B. Featuring both muddies the pitch.",
        },
        {
          head: "You don't have a mid-tier offer.",
          body: "A mid-tier offer has to be a slice of the main promise. Two promises → a weak half-of-each, or two products.",
        },
      ],
      close:
        "Pick one as the promise. The other becomes a felt, honest side effect — not a second headline.",
    },
    recommendation: {
      option: "Fronz's recommendation: Option A (The Intervention)",
      headline:
        "Run with Option A. Lean hard into Deep Work's facilitation track record and your network. Create real outcomes for companies by {investing in their founders}.",
      reasons: [
        {
          head: "It makes the residency a business expense.",
          body: 'Not a personal indulgence. Buyers can justify $6–10k against saved runway. They can\'t justify the same for "restoration" without the bio-data differentiator you\'ve chosen not to build.',
        },
        {
          head: "It matches the audience you already have.",
          body: 'Telegram and email skew high-agency and builder-identity — people who admit "my company is stalling" more readily than "I\'m depleted."',
        },
        {
          head: "It gives you a mid-tier offer you can sell now.",
          body: "Andrej's bi-weekly strategy sessions (already in market with a client) and a paid founder audit are real slices of Option A. Option B doesn't hand you an equally strong mid-tier.",
        },
      ],
      close:
        "Health, place, and magic stay — as the how that makes the intervention yours. The promise is the what: the company moves.",
      pitch: {
        label: "Your recommended one-sentence pitch",
        sentence:
          '"For founders burning runway while stuck in their own heads, The Sanctuary is a two-week intervention that gets you unstuck and back to shipping. You leave with a decisive next move and real momentum."',
        note: "Say it out loud. If it survives 24 hours without a caveat from either of you, it's locked. If you need more of the place/magic in the wording, soften the method clause — don't add a second promise.",
      },
    },
  },

  keystoneProduct: {
    kicker: "Your anchor offering · under Option A",
    heading: "The Sanctuary Residency",
    details: [
      { label: "Format", value: "2-week residential" },
      {
        label: "Cohort",
        value: "Small. Target ~8–12 (run a cost-model check).",
      },
      {
        label: "Price",
        value: "Target $6–8k once Option A is confirmed. Placeholder was ~$XXk.",
      },
      {
        label: "Included",
        value:
          "The residency, alumni community (channel, not add-on), core method, environment",
      },
      {
        label: "Optional add-ons",
        value:
          "Sauna, cold plunge, optional longevity-info sessions from Andrej's own experience (not medical advice). Bonus, not core.",
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
      heading: "Where you sit in the market",
      intro:
        "Your closest 2-week founder-retreat comp is $4,050. A $6–8k price needs a sharper outcome or sharper delivery. Option A has less direct competition than a restoration/reboot pitch.",
      rows: [
        {
          name: "Founder Camp Morocco",
          length: "14 days",
          price: "$4,050",
          positioning: "Deep work + coaching + surf/yoga",
          url: "https://www.thefoundercamp.com/",
        },
        {
          name: "Reset Retreat Mallorca",
          length: "5 days",
          price: "€2,900",
          positioning: "Digital detox, nervous system reset, 90-day plan",
          url: "https://resetretreatmallorca.com/",
        },
        {
          name: "Elite Retreat Marbella",
          length: "4 days",
          price: "By application",
          positioning: "Performance reset for founders",
          url: "https://eliteretreat.co/",
        },
        {
          name: "Founder's Oasis Black Forest",
          length: "~5 days",
          price: "By application",
          positioning: "Transformational coaching, group",
          url: "https://www.foundersoasis.life/founders-oasis-black-forest",
        },
        {
          name: "Fazlani (India)",
          length: "14–21 days",
          price: "Clinical pricing",
          positioning: "Severe burnout Ayurvedic reset",
          url: "https://fazlaninaturesnest.com/",
        },
        {
          name: "Istana Private",
          length: "3 wk – 3 mo",
          price: "££££",
          positioning: "1:1 clinical / bespoke",
          url: "https://istanaprivate.com/",
        },
      ],
      readOnPrice:
        "$6–8k for 2 weeks is defensible if your outcome, delivery, or peer signal beats Founder Camp Morocco. $10k+ needs clearer category differentiation than you have today. Sharp promise first; price second.",
    },
  },

  icp: {
    kicker: "Your buyer · under Option A",
    heading: "The Stalled Founder.",
    intro:
      "You merged seven profiles into Founders & Builders. Under Option A, the primary buyer is the person whose company is at risk — not the person who primarily needs restoration.",
    personas: [
      {
        name: "The Stalled Founder",
        pairedWith: "Option A · The Intervention",
        recommended: true,
        situation:
          "Has a product/company, has burned some runway, is stuck in their own head, can't ship or can't get traction.",
        pain: '"I\'m losing momentum and I don\'t know what to do next."',
        where: "In your Telegram, on your email list, or one degree away.",
        why: "Urgency. The company is at risk.",
        proof: "Before/after of a company that moved because of you.",
      },
    ],
    recommendation:
      "This buyer matches your channels and your team's delivery skills (strategy, research, design, org). The \"depleted founder\" buyer belongs to Option B — harder to reach on Telegram/email, and a crowded market. Don't build for them unless you reject A.",
    realityCheck:
      "Reach reality: ~20 founder leads + a handful of protocol decision-makers, none warm. You'll need to thaw them either way. This buyer is closer to who already shows up in your community.",
  },

  mapFindings: {
    kicker: "What the map showed you",
    heading: "Four lines. That's the diagnosis.",
    findings: [
      {
        icon: "✅",
        label: "Working",
        body: "Telegram + email already reach founders. One newsletter conversion already happened. Rare at your stage.",
      },
      {
        icon: "⚠️",
        label: "Cold list",
        body: "Your ~20 founder leads are the right audience — and none are warm. Thaw before you sell.",
      },
      {
        icon: "⭕",
        label: "Gap",
        body: "No offer between free content and the ~$8k residency. Highest-leverage thing to build next.",
      },
      {
        icon: "💡",
        label: "Easy win",
        body: "Andrej's strategy sessions with a current client are already the prototype. Brand them under The Sanctuary team.",
      },
    ],
  },

  nextSteps: {
    kicker: "Your next steps",
    heading: "Five next steps.",
    intro:
      "Written as if Option A is chosen. Step 1 is confirm or reject — then execute. Assign a lead per step so this doesn't become a shelved artifact.",
    steps: [
      {
        n: "01",
        name: "Confirm Option A (or reject it)",
        timing: "This week",
        gate: true,
        body: "Say the recommended pitch out loud. Let it sit 24 hours. If neither of you adds a caveat, Option A is locked. If it feels wrong, reject it in writing — don't quietly drift back to \"both.\"",
        deliverable:
          "A yes on Option A + the pitch sentence above, or a clear \"we're choosing B\" so the leave-behind can be rewritten.",
      },
      {
        n: "02",
        name: "Build the mid-tier offer",
        timing: "2–4 weeks",
        body: "The offer between free content and the residency — a slice of The Intervention, under one brand (\"The Sanctuary team\"), not individual consultant billing. From the Jam:",
        bullets: [
          "Primary: Andrej's bi-weekly strategy sessions (~$500–800/mo) — already testing with a client. Brand and productize under The Sanctuary.",
          "Strong alternate: Paid Product / Founder Audit (~$300–500) — 90-min live diagnostic + written recap.",
          "Skip for now unless you choose B: Founder Reset Sprint (~$300–500 weekend cohort).",
          "Price so the jump to the residency stays roughly 8–10× (mid-tier in the $300–800 range → ~$6–8k residency).",
        ],
        deliverable:
          "One mid-tier offer named, priced, and ready to invite people into.",
      },
      {
        n: "03",
        name: "Build the marketing system",
        timing: "4–8 weeks, parallel",
        body: "Carry the Intervention pitch on the channels you already own.",
        bullets: [
          "Telegram: community + social proof. Every free asset ends with a next step (mid-tier first, residency second).",
          "Email: sales channel. A short series: Aware → Problem → Solution → Product → Buy.",
          "Personal outreach: a simple cadence and script for day-to-day follow-up.",
        ],
      },
      {
        n: "04",
        name: "Warm up your ~20-founder list",
        timing: "2–3 weeks, starts once Option A is confirmed",
        body: "Your named commitment from the Jam: re-engage ~20 founder leads plus a handful of protocol decision-makers. They are not warm.",
        bullets: [
          "Keep Stalled Founder fits; remove people who only match a restoration pitch.",
          "First touch: useful, no-ask, specific to them.",
          "Second touch (2–3 weeks later): invite to the mid-tier offer or a free workshop.",
          "Track replies, mid-tier conversions, and residency conversations.",
        ],
      },
      {
        n: "05",
        name: "Lock your cohort + price",
        timing: "Before your first paid residency",
        body: "Replace the placeholder with a real number under Option A.",
        bullets: [
          "Minimum cohort size for margin (venue + food + team).",
          "Per-person target: $6–8k at Intervention sharpness.",
          "Flat vs. tiered (shared/private room, early-bird).",
          "Add-on pricing (bundled or à la carte).",
        ],
        deliverable: "A real number on the sales page — no more ~$XXk.",
      },
    ],
  },

  cta: {
    kicker: "Where Fronz comes back in",
    heading: "The next step isn't another document. It's locking this with you.",
    sub: "Anyone can paste this page into an LLM and get a generic plan. What you can't get from that is judgment on the live fork, a pitch sentence that survives contact with how you actually sell, and a mid-tier offer shaped around what Andrej is already delivering. If you want that done with you — confirm A, lock the sentence, productize the strategy sessions — book 20 minutes and we'll scope the working session.",
    button: "Book a working session",
    href: "/book",
  },
};
