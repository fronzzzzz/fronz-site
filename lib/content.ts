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
    "Senior go-to-market judgment for founders and lean teams: decide what to sell and to whom, get in front of real buyers, and know what to run next. Bounded containers — not agency bloat or another full-time hire.",
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
  kicker: "[01] Go-to-market for founders & lean teams",
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
    detail: "Co-founder, CMO & CPO. Product GTM from zero.",
  },
} as const;

export const WHY_FRONZ = {
  kicker: "[07] Why Fronz",
  heading: "Not an agency. Not a hire.",
  rows: [
    {
      agency: "Open-ended retainer, vague scope",
      inhouse: "Salary, benefits, and a seat to fill",
      fronz: "Named container: fixed scope, fixed price, fixed cap",
    },
    {
      agency: "They run your marketing",
      inhouse: "You hire, manage, and direct",
      fronz: "Scoped to the container: guide, decide, or execute inside fixed caps",
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
  sub: "Every path starts with a free map. Then fixed-scope offers for positioning decisions, hands-on market contact, or a monthly read while you ship.",
  cta: "See offers",
  ctaHref: "/gtm-clarity",
} as const;

export const LEAD = {
  kicker: "[08] One next step",
  heading: "Selling five things to everyone and nothing's landing?",
  body: "The GTM Clarity Starter maps your offers, customers, and channels on one page, then shows you where positioning breaks. Copy a template. Keep the map. Twenty minutes. Yours to keep.",
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
  sub: "Twenty minutes. Four parts. One map. The gaps become obvious when offers, people, and channels sit on the same page.",
  instruction:
    "Do this honestly and roughly. Messy is fine. Messy is the point. Keep your first-instinct answers; don't polish them yet.",
  process: [
    "Copy a template or start online",
    "One part at a time, about 20 minutes total",
    "Download your map, or submit and book a Starter Review",
  ],
  download: {
    heading: "Download the template",
    sub: "Duplicate a Notion or Google Doc and work offline. Same four parts. Submit online when you're done, or attach your file when you book.",
  },
  preview: {
    heading: "The map",
    sub: "Four parts on one page. Part 4 is where the positioning gaps show up.",
    cta: "Start the map",
  },
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
      body: "List every type of customer you're trying to reach. For each: who they are, what they're trying to get done, how urgent it feels, and which offer or offers are for them.",
      prompts: [
        "Who they are…",
        "What they're trying to achieve…",
        "How urgently they feel it (gut call: low / medium / high)",
        "Which offer or offers are for this person?",
      ],
    },
    {
      n: "03",
      title: "Your channels",
      body: "For each person, tap the channels you actually use today. Be honest about “Nothing yet.” A great customer with no way to reach them is one of the most useful things to find.",
      prompts: ["Pick all that apply, or add your own channel."],
    },
    {
      n: "04",
      title: "Connect the dots",
      body: "Your map draws from the links you made. Look for clean lines and missing connections, then note what surprised you.",
      prompts: ["Note anything that jumps out."],
    },
  ],
  footnote: "Fronz · go-to-market in bounded containers for founders and lean teams.",
} as const;

export const STARTER_FORM = {
  back: "Back",
  next: "Next part",
  addOffer: "Add another offer",
  addPerson: "Add another person",
  addDescription: "Add another way you describe it",
  offerName: "Offer name",
  offerNamePlaceholder: "e.g. Monthly advisory, Workshop, SaaS product…",
  descriptionPlaceholder: "Another way you've described it…",
  personLabel: "Who they are",
  personLabelPlaceholder: "e.g. Series A founder, solo consultant…",
  personJob: "What they're trying to achieve",
  personJobPlaceholder: "The job they'd hire you for…",
  urgencyLabel: "How urgent (gut call)",
  offerLinkLabel: "Which offer or offers are for this person?",
  customChannelPlaceholder: "Add custom channel…",
  addCustomChannel: "Add",
  gapsHeading: "Gaps flagged on your map",
  reflectionLabel: "What jumped out?",
  reflectionExamples: [
    "I'm describing the same thing five different ways.",
    "I have way more offers and audiences than I can focus on.",
    "My best customers and my best channels don't line up.",
  ],
  downloadHeading: "Download your map",
  downloadSub:
    "Your map is ready. Download a styled PDF to keep, share, or work from offline.",
  downloadButton: "Download your map",
  reviewGatewayHeading: "Want a free read of your GTM Starter Map?",
  reviewGatewaySub:
    "Submit your map and schedule a free 20-minute Starter Review.",
  emailPlaceholder: "you@company.com",
  emailLabel: "Your email",
  emailHelp: "So I have your map on file and can match it to your booking.",
  submitButton: "Submit and schedule",
  scheduleHeading: "Schedule your Starter Review",
  scheduleSub: "Twenty minutes to review your map together.",
  successHeadline: "Map received.",
  successBody: "Your answers are saved. Pick a time below.",
  offlineNote:
    "Worked offline? Attach your template when Calendly prompts you for a file.",
} as const;

export const BOOK = {
  kicker: "Starter Review",
  heading: "Book a Starter Review.",
  sub: "Twenty minutes to reflect your map back. Complete the GTM Clarity Starter first: submit online or attach your template when you book. We'll talk about which container fits. Not a strategy session, not a product audit, not a pitch deck review.",
  attachNote:
    "If you worked in Notion or Google Docs, attach your map when Calendly prompts you. If you submitted online, I already have your answers.",
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
