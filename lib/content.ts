/**
 * Fronz site content — single source of copy.
 * Sourced from Fronz_GTM_Clarity_Map.md (strategy SSOT) and
 * Brand_Language_Guidelines.md (language SSOT). Edit here, not in components.
 *
 * Funnel SSOT: Fronz_Funnel_and_Offer_Ladder.md (Sep 2026)
 */

export const SITE = {
  name: "Fronz",
  url: "https://fronzz.com",
  tagline: "Gain clarity. Build momentum.",
  description:
    "Senior go-to-market judgment for bootstrapped–Series A founders and lean teams: decide what to sell and to whom, get in front of real buyers, and know what to run next. Bounded containers — not agency bloat or another full-time hire.",
  email: "stacey@shesthefronz.com",
  bookingUrl: "/book",
  starterUrl: "/starter",
} as const;

const CALENDLY_EMBED_URL =
  "https://calendly.com/fronzz/initial-consult?background_color=f3efe4&text_color=1c1e17&primary_color=1c1e17";

export function calendlyUrl(): string {
  return process.env.NEXT_PUBLIC_CALENDLY_URL ?? CALENDLY_EMBED_URL;
}

export const BOOKING_CTA = "Book a Starter Review";
export const HOME_CTA = "Map Your Business for Free";
export const STARTER_CTA = "Complete the GTM Clarity Starter";

/** Three-beat motion — homepage hero, offers page hero, arc strip. */
export const MOTION = {
  beats: [
    "Gain clarity.",
    "Build momentum.",
    "Know what to run next.",
  ],
  highlightBeat: 1,
  arc: [
    { label: "Gain clarity", href: "/gtm-clarity#get-clear" },
    { label: "Build momentum", href: "/gtm-clarity#make-contact" },
    { label: "Know what to run next", href: "/gtm-clarity#keep-moving" },
  ],
  sections: [
    { id: "get-clear", label: "Gain clarity" },
    { id: "make-contact", label: "Build momentum" },
    { id: "keep-moving", label: "Know what to run next" },
  ],
  sectionBlurbs: {
    "get-clear": "Map your business and decide what you sell and to whom.",
    "make-contact": "Put your positioning in front of real buyers and get honest counts.",
    "keep-moving":
      "A monthly read while you execute. Your first paid step after the map, or your return when you need one.",
  },
} as const;

export const HERO = {
  kicker: "[01] Go-to-market for bootstrapped–Series A founders & lean teams",
  beats: MOTION.beats,
  highlightBeat: MOTION.highlightBeat,
  sub: "Decide what to sell and to whom, get it in front of real buyers, and know what to run next.",
  cta: HOME_CTA,
  ctaHref: SITE.starterUrl,
  secondaryCta: "See offers",
  secondaryHref: "/gtm-clarity",
  arc: MOTION.arc,
} as const;

export const PROBLEM = {
  kicker: "[02] The real problem",
  heading: "Most founders don't have a marketing problem. They have a clarity and movement problem.",
  pains: [
    {
      head: "Nobody gets what you do.",
      body: "You can describe it five ways and none of them land. Prospects nod, then don't buy. The gap isn't your words; it's the position underneath them.",
    },
    {
      head: "You're busy, but nothing's moving.",
      body: "Every tactic is running at once and none of them convert. Without one clear bet and a way to keep score, the effort scatters and you can't tell what's working.",
    },
  ],
} as const;

export const LINES = {
  kicker: "[03] Lean and clear beats big",
  heading: "Clarity is the unfair advantage.",
  sub: "When you're clear, a lean team moves faster than a big one. I help you lock what you sell and who it's for, put it in front of real buyers, and turn their response into your next move. No bloat, no guesswork. Just momentum you can measure.",
  cta: "Find your unfair advantage",
  ctaHref: "/gtm-clarity",
} as const;

export const GUIDE = {
  kicker: "[04] Who you're working with",
  name: "Stacey Fronek (aka, Fronz)",
  empathy:
    "I'm a serial founder, from tech startups to marketing agencies. I know what it's like to need movement without hiring a full go-to-market team.",
} as const;

export const PROOF = {
  kicker: "[05] Proof",
  heading: "Ten years in marketing as a founder. One zero-to-one build.",
  reach:
    "Tens of thousands of attendees · Millions of views across campaigns",
  names: [
    "PopSockets",
    "Hotels.com",
    "Xfinity",
    "Ethereum Foundation",
    "Protocol Labs",
  ],
  portfolio: {
    lead: "Campaign work on my",
    label: "portfolio",
    href: "https://www.shesthefronz.com",
  },
  build: {
    name: "Moxa Money",
    detail: "Co-founder, CMO & CPO — product GTM from zero.",
  },
} as const;

export const WHY_FRONZ = {
  kicker: "[07] Why Fronz",
  heading: "Not an agency. Not a hire.",
  rows: [
    {
      agency: "Open-ended retainer, vague scope",
      inhouse: "Salary, benefits, and a seat to fill",
      fronz: "Named container — fixed scope, fixed price, fixed cap",
    },
    {
      agency: "They run your marketing",
      inhouse: "You hire, manage, and direct",
      fronz: "You execute — I interpret and set the next move",
    },
    {
      agency: "Always on because you're paying monthly",
      inhouse: "On payroll whether you need them this month",
      fronz: "Step in when the container fits; graduate when it doesn't",
    },
    {
      agency: "Incentive: keep you dependent",
      inhouse: "Incentive: keep the seat busy",
      fronz: "Incentive: a clear read so you can keep moving",
    },
  ],
} as const;

export const OFFERS = {
  kicker: "[06] How to work with Fronz",
  heading: "Pick the container that fits where you are.",
  sub: "Every path starts with a free map. Then fixed-scope offers for positioning, market contact, or a monthly read while you ship — named price before you commit.",
  cta: "See offers",
  ctaHref: "/gtm-clarity",
} as const;

export const LEAD = {
  kicker: "[08] One next step",
  heading: "Selling five things to everyone and nothing's landing?",
  body: "The GTM Clarity Starter maps your offers, customers, and tactics on one page, then shows you where positioning breaks. Copy a template. Keep the map. Twenty minutes. Yours to keep.",
  cta: HOME_CTA,
  href: SITE.starterUrl,
} as const;

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

export const STARTER = {
  kicker: "Free · GTM Clarity Starter",
  heading: "See your whole business on one page.",
  highlight: "on one page.",
  sub: "A 20-minute exercise to get your offers, your people, and how you reach them in front of you — so the gaps become obvious. The map is the deliverable. Copy a template and keep it.",
  instruction:
    "Do this honestly and roughly. Messy is fine. Messy is the point. Keep your first-instinct answers; don't polish them yet.",
  formHeading: "Submit your map",
  formSub:
    "Fill in your answers below — same five parts as the exercise. I'll have your map on file. After you submit, you can book a Starter Review and I'll read what you wrote before we talk.",
  parts: [
    {
      n: "01",
      title: "Your offers",
      body: "List everything you currently sell or could sell: products, services, programs, the retreat, the community, the thing you do “on the side.” For each one, write every way you've described it before. Don't pick the best yet. Dump them all.",
      prompts: [
        "“I usually describe it as…”",
        "“Sometimes I say…”",
        "“On my site it says…”",
      ],
    },
    {
      n: "02",
      title: "Your people",
      body: "List every type of customer you're trying to reach (or have imagined reaching). For each, write your clearest description of who they are, and if you can, what they're really trying to get done (the job they'd “hire” you for).",
      prompts: [
        "Who they are…",
        "What they're trying to achieve…",
        "How urgently they feel it (gut call: low / medium / high)",
      ],
    },
    {
      n: "03",
      title: "How you reach them",
      body: "For each customer, list the tactics you actually use to reach them today: email list, IRL events, social, word of mouth, DMs, a podcast, nothing-yet. Be honest about the “nothing yet” ones. A great customer with no way to reach them is one of the most useful things to find.",
      prompts: ["Customer → tactics you use to reach them today…"],
    },
    {
      n: "04",
      title: "Connect the dots",
      body: "Draw lines: offer → customer → tactic. Then just look. Where are the clean lines (right offer, right person, right way to reach them)? Where are the crossed or missing lines? What surprised you?",
      prompts: ["Note anything that jumps out."],
    },
    {
      n: "05",
      title: "What's automated vs. what still needs you",
      body: "If you're running agents, content pipelines, or dashboards: list what's automated today and what decisions you're still making by gut. The gap is often where go-to-market breaks — not in the build.",
      prompts: [
        "Automated today…",
        "Still deciding by gut…",
        "What I'd want a second pair of eyes on…",
      ],
    },
  ],
  wall: {
    heading: "You might hit a wall here. That's expected.",
    body: "Most founders get to Part 4 and feel one of these:",
    quotes: [
      "“I'm describing the same thing five different ways.”",
      "“I can't tell which of these is the actual product vs. just how people find me.”",
      "“I have way more offers and audiences than I can focus on.”",
      "“My best customers and my best channels don't line up.”",
    ],
    punchHead: "That wall is the most valuable part.",
    punchLine:
      "It's not a copywriting problem. It's a positioning decision waiting to be made.",
    sellHighlight: "The map surfaces the decision.",
    sell: "The Starter gives you that map. From there, step into whichever container fits — senior judgment while you execute, a wedge decision, or market contact. Each is scoped before you pay.",
  },
  templatesHeading: "Work in your own copy.",
  templatesNote:
    "Notion or Google Doc — duplicate a template and keep the map. No account required to use the Starter.",
  reviewHeading: "Book a Starter Review",
  reviewBody:
    "Complete the map first — submit above or work in a template. Twenty minutes to reflect what you wrote back and see which container fits. Not a strategy session.",
  reviewAttachNote:
    "Worked offline? Attach your map when you book — Calendly will prompt you for a file.",
  reviewCta: BOOKING_CTA,
  footnote: "Fronz · senior go-to-market judgment for founders who execute.",
} as const;

export const STARTER_FORM = {
  heading: "Submit your map",
  sub: "Same five parts as the exercise. I'll read this before a Starter Review. Copy a template above if you want an editable version to keep.",
  fields: [
    {
      key: "offers",
      label: "01 · Your offers",
      placeholder: "Everything you sell, in every way you've described it…",
      optional: false,
    },
    {
      key: "people",
      label: "02 · Your people",
      placeholder: "Who you're trying to reach, and what they're hiring you to do…",
      optional: false,
    },
    {
      key: "tactics",
      label: "03 · How you reach them",
      placeholder: "The tactics you actually use today (and the “nothing yet” ones)…",
      optional: false,
    },
    {
      key: "notes",
      label: "04 · What jumped out",
      placeholder: "Clean lines, crossed lines, surprises…",
      optional: false,
    },
    {
      key: "automation",
      label: "05 · Automated vs. you (optional)",
      placeholder: "What's automated, what's still gut, what you'd want a second pair of eyes on…",
      optional: true,
    },
  ],
  emailPlaceholder: "you@company.com",
  emailLabel: "Your email",
  emailHelp: "So I have your map on file and can confirm your Starter Review.",
  button: "Submit my map",
  successHeadline: "Map received.",
  successBody:
    "Your answers are saved. Book a Starter Review when you're ready — twenty minutes to reflect what you wrote back.",
  successCta: BOOKING_CTA,
  successTemplates: "Keep an editable copy:",
  successFinePrint:
    "Starter Review is twenty minutes. I read what you wrote — not a strategy session.",
} as const;

export const BOOK = {
  kicker: "Starter Review",
  heading: "Book a Starter Review.",
  sub: "Twenty minutes to reflect your map back. Complete the GTM Clarity Starter first — submit your answers or attach your map when you book. We'll talk about which container fits. Not a strategy session, not a product audit, not a pitch deck review.",
  attachNote:
    "If you worked in Notion or Google Docs, attach your map when Calendly prompts you. If you submitted the form on the Starter page, I already have your answers.",
  prerequisite: "Haven't completed your map yet?",
  prerequisiteLink: "Complete the GTM Clarity Starter →",
  prerequisiteHref: SITE.starterUrl,
} as const;

export const NAV = [
  { label: "Work", href: "/#lines" },
  { label: "Offers", href: "/gtm-clarity" },
  { label: "Starter", href: SITE.starterUrl },
  { label: "About", href: "/#guide" },
] as const;
