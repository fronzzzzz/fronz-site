/**
 * Resume story content — the click-through career narrative at /resume.
 * Sourced from "Stacey Fronek - Resume - Director of Sales and Marketing"
 * (general track). One chapter per era; layouts are bespoke per chapter
 * in components/resume/ResumeStory.tsx.
 *
 * Photo slots: add a `src` (path under /public) to any slot to replace the
 * placeholder with the real image. All slots are click-to-enlarge.
 */

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type PhotoSlotDef = {
  label: string;
  src?: string;
};

export const RESUME_PDF = "/Stacey-Fronek-Resume.pdf";

/** Rail metadata — one entry per chapter, in click-through order. */
export const CHAPTER_META = [
  { id: "cover", era: "The story", short: "Start" },
  { id: "production", era: "2016–2022", short: "Producer" },
  { id: "events", era: "2022–2024", short: "Conferences" },
  { id: "moxa", era: "2024–2026", short: "Startup" },
  { id: "now", era: "2026–today", short: "Fronz" },
] as const;

export const COVER = {
  kicker: "Resume · Stacey Fronek",
  lead: "Ten years of building",
  highlight: "from zero.",
  sub: "Marketing and brand leader. A decade building brands, campaigns, and large-scale experiences as a founder — then CMO and CPO at a technology startup. Four chapters, one through-line.",
  hint: "Click through, or use your arrow keys",
} as const;

export const PRODUCTION = {
  era: "2016 – 2022",
  role: "Film & Advertising Producer / Founder",
  org: "She's the Fronz Productions",
  headline: "Six years profitable, on repeat business and referrals.",
  narrative:
    "I founded a full-service production and storytelling agency and kept it profitable for six years on repeat business and industry referrals. The work took two shapes: campaigns produced end to end for my own clients, and freelance line production inside larger productions for national brands.",
  secondary:
    "Either way, the job was the same — build and manage the budget, staff and lead the crew, negotiate the vendors, and creative-produce the story, translating a brand's positioning into narrative, casting, and visual identity. Across repeat productions, I developed junior crew into department leads.",
  brands: ["PopSockets", "Hotels.com", "Xfinity", "Nite Ize", "Mountainsmith"],
  brandsLead: "Campaigns brought to screen for",
  portfolioLabel: "Full portfolio",
  portfolioHref: "https://www.shesthefronz.com",
  stats: [
    { value: 6, suffix: " yrs", label: "profitable on repeat business and industry referrals" },
    { value: 250, prefix: "$", suffix: "k", label: "production budgets, line-produced end to end" },
    { value: 30, suffix: "+", label: "crew staffed, supervised, and developed per production" },
  ] satisfies Stat[],
  photoSlots: [
    { label: "On set — hero production still" },
    { label: "Behind the camera" },
    { label: "Campaign frame" },
    { label: "Crew at work" },
  ] satisfies PhotoSlotDef[],
} as const;

export const EVENTS = {
  era: "2022 – 2024",
  role: "Executive Producer, Global Conferences",
  org: "She's the Fronz Productions · Ethereum Foundation, Protocol Labs",
  headline: "Conferences on four continents, produced end to end.",
  narrative:
    "For two and a half years I produced conferences and large-scale events around the world — negotiating venue, catering, and banquet-scale F&B contracts with international properties, directing programming, A/V, and multilingual production teams, and producing one conference end to end: venue selection, programming, sponsorship sales, and attendee acquisition.",
  secondary:
    "The keystones were the two largest Devcon conferences ever held, produced as lead contractor to the Ethereum Foundation. But the portfolio ran wider — events for Protocol Labs and others, each with its own scale, market, and production model. Live social coverage and post-event video turned each one into a year-round content engine.",
  keystoneKicker: "The keystone engagements",
  bigStats: [
    { value: 7000, label: "attendees · Devcon Bogotá, Colombia" },
    { value: 12000, label: "attendees · Devcon Bangkok, Thailand" },
  ] satisfies Stat[],
  stats: [
    { value: 4, label: "continents produced on" },
    { value: 300, prefix: "$", suffix: "k+", label: "departmental budgets, on or under, in international markets" },
    { value: 30, suffix: "+", label: "cross-functional, multilingual team members recruited and led" },
  ] satisfies Stat[],
  photoSlots: [
    { label: "Devcon — main stage" },
    { label: "Venue floor" },
    { label: "Production team" },
    { label: "On site" },
  ] satisfies PhotoSlotDef[],
} as const;

export const MOXA = {
  era: "2024 – 2026",
  role: "Chief Marketing Officer & Chief Product Officer",
  org: "Moxa Money · fintech startup · co-founder",
  headline: "Two seats, one build: product and marketing from zero.",
  narrative:
    "I co-founded Moxa Money — a finance app for entrepreneurs and small business owners, unifying traditional bank accounts, self-custodial crypto wallets, and centralized exchanges in a single budgeting experience — and held the CMO and CPO seats together. They weren't separate jobs. It was one build, and each function came online as the product developed.",
  sequenceKicker: "The build, in order",
  sequence: [
    {
      n: "01",
      name: "Research & strategy",
      body: "Market research, segmentation, and the product thesis: entrepreneurs and small business owners running money across traditional and crypto rails — and why now.",
    },
    {
      n: "02",
      name: "Legal & financial build-out",
      body: "Entity and compliance groundwork, pricing architecture, and vendor negotiations including Plaid.",
    },
    {
      n: "03",
      name: "Plans & budgets",
      body: "Annual plans, budgets, and forecasts, owned at the executive level.",
    },
    {
      n: "04",
      name: "UI/UX design",
      body: "Designing the experience for people operating across traditional and crypto rails at once.",
    },
    {
      n: "05",
      name: "The app",
      body: "Built hands-on in React Native, in Cursor; shipped working demos to the App Store and Play Store.",
    },
    {
      n: "06",
      name: "Brand & website",
      body: "Brand positioning built out and launched at moxa.money.",
    },
    {
      n: "07",
      name: "Lifecycle & KPIs",
      body: "12+ automated campaigns across email, push, and in-app — with dashboards tracking product engagement and marketing performance.",
    },
  ],
  stats: [
    { value: 12, suffix: "+", label: "automated lifecycle campaigns across email, push, and in-app" },
    { value: 0, suffix: " → 1", label: "product and marketing functions, built from nothing" },
    { value: 2, label: "working demos shipped — App Store and Play Store" },
  ] satisfies Stat[],
  screenshotSlots: [
    { label: "Moxa app — dashboard" },
    { label: "Moxa app — budgeting" },
    { label: "Moxa app — accounts" },
  ] satisfies PhotoSlotDef[],
} as const;

export const NOW = {
  era: "2026 – today",
  role: "Founder",
  org: "Fronz",
  headline: "Every chapter started from zero. That's the skill I sell.",
  narrative:
    "Fronz is the newest build: go-to-market systems for founders and lean teams. The work draws on everything before it — positioning, brand storytelling, lifecycle systems, and executive-level operating experience — now delivered as complete marketing systems designed to be handed off to the teams that own them. The practice is AI-native end to end. AI multiplies the craft; human taste finishes it.",
  howIWork: {
    kicker: "How I work",
    pairs: [
      {
        ai: "AI runs the market research, trend analysis, and social and ad performance analysis.",
        human: "I make the calls.",
      },
      {
        ai: "AI drafts the content schedules and outlines.",
        human: "I build everything out and finish it with human taste.",
      },
      {
        ai: "Live-data KPI dashboards, with automated Notion reporting keeping executive views current.",
        human: "Raw data becomes decisions, fast.",
      },
      {
        ai: "The tools are hands-on: Cursor and Claude Code, Git, React and React Native.",
        human: "I ship the product myself, not just the strategy.",
      },
    ],
  },
  skills: [
    {
      group: "Marketing",
      items: "Brand positioning, market research and segmentation, go-to-market strategy, lifecycle marketing (email, push, in-app), CRM and marketing automation, content and video production",
    },
    {
      group: "Product & GTM",
      items: "Product strategy, user research, UI/UX design, pricing inputs, shipping working demos to the App Store and Play Store, founding-team GTM",
    },
    {
      group: "Leadership",
      items: "Building functions from zero, recruiting and mentoring teams of 30+, cross-cultural and remote team management, client and stakeholder relations",
    },
    {
      group: "AI-Native & Technical",
      items: "1,500+ hours in Cursor and Claude Code; Gemini, ChatGPT, Claude; Git, CLIs, and IDE-based development; React, React Native, and Next.js (multiple shipped apps and sites); Cloudflare; live-data KPI dashboards with automated Notion reporting",
    },
    {
      group: "Tools",
      items: "Customer.io, PostHog, Notion, Figma, Google Workspace, and modern marketing and collaboration stacks",
    },
  ],
  education: "Berry College — B.A., Government · 2013",
  closing: {
    heading: "Work with me.",
    consultLabel: "Book an intro call",
    consultHref: "/book",
    softLine:
      "The way in is a sprint. The way through is a scoped engagement your team owns.",
    downloadLabel: "Download the PDF resume",
  },
} as const;
