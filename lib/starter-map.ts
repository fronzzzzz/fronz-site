/**
 * GTM Clarity Starter — structured map model (Phase 1).
 * Captures offers, people, channels, and links; flattens for Notion / Customer.io.
 */

export type Urgency = "low" | "medium" | "high";

export type StarterOffer = {
  id: string;
  name: string;
  descriptions: string[];
};

export type StarterPerson = {
  id: string;
  label: string;
  job: string;
  urgency: Urgency | "";
  offerIds: string[];
  channelIds: string[];
  customChannels: string[];
};

export type ChannelPreset = {
  id: string;
  label: string;
  exclusive?: boolean;
};

export const STARTER_CHANNEL_PRESETS: readonly ChannelPreset[] = [
  { id: "email", label: "Email list" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "irl", label: "IRL events" },
  { id: "word-of-mouth", label: "Word of mouth" },
  { id: "dms", label: "DMs" },
  { id: "podcast", label: "Podcast" },
  { id: "paid", label: "Paid ads" },
  { id: "content", label: "Content / SEO" },
  { id: "partners", label: "Partners" },
  { id: "nothing", label: "Nothing yet", exclusive: true },
] as const;

export const STARTER_MAP_LIMITS = {
  maxOffers: 6,
  maxPeople: 6,
  maxDescriptions: 3,
} as const;

export type StarterMapData = {
  version: 1;
  offers: StarterOffer[];
  people: StarterPerson[];
  reflection: string;
  /** Contact fields — collected only when booking a Starter Review */
  name: string;
  email: string;
  company: string;
  /** Opt-in: anonymized gap/channel patterns for market research */
  consentResearch: boolean;
};

export function createId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

export function emptyStarterMap(): StarterMapData {
  return {
    version: 1,
    offers: [emptyOffer()],
    people: [emptyPerson()],
    reflection: "",
    name: "",
    email: "",
    company: "",
    consentResearch: false,
  };
}

export function emptyOffer(): StarterOffer {
  return { id: createId("offer"), name: "", descriptions: [""] };
}

export function emptyPerson(): StarterPerson {
  return {
    id: createId("person"),
    label: "",
    job: "",
    urgency: "",
    offerIds: [],
    channelIds: [],
    customChannels: [],
  };
}

export function channelLabel(id: string): string {
  return STARTER_CHANNEL_PRESETS.find((c) => c.id === id)?.label ?? id;
}

export function personChannelLabels(person: StarterPerson): string[] {
  const preset = person.channelIds
    .filter((id) => id !== "nothing")
    .map(channelLabel);
  if (person.channelIds.includes("nothing")) preset.push("Nothing yet");
  return [...preset, ...person.customChannels.filter(Boolean)];
}

export function personHasChannels(person: StarterPerson): boolean {
  return (
    person.channelIds.some((id) => id !== "nothing") ||
    person.customChannels.some(Boolean)
  );
}

export function offerDescriptionSummary(offer: StarterOffer): string {
  return offer.descriptions.map((d) => d.trim()).filter(Boolean).join(" · ");
}

export function detectGaps(map: StarterMapData): string[] {
  const gaps: string[] = [];
  const people = map.people.filter((p) => p.label.trim());
  const offers = map.offers.filter((o) => o.name.trim());

  for (const person of people) {
    const name = person.label.trim();

    if (person.offerIds.length === 0) {
      gaps.push(`${name} is missing an offer.`);
    }

    if (!personHasChannels(person)) {
      if (person.channelIds.includes("nothing")) {
        gaps.push(`${name} is missing a channel.`);
      } else if (
        person.channelIds.length === 0 &&
        person.customChannels.length === 0
      ) {
        gaps.push(`${name} is missing a channel.`);
      }
    }
  }

  for (const offer of offers) {
    const name = offer.name.trim();
    const linkedPeople = people.filter((p) => p.offerIds.includes(offer.id));

    if (linkedPeople.length === 0) {
      gaps.push(`"${name}" is missing a person.`);
      gaps.push(`"${name}" is missing a channel.`);
      continue;
    }

    const hasChannelPath = linkedPeople.some((p) => personHasChannels(p));
    if (!hasChannelPath) {
      gaps.push(`"${name}" is missing a channel.`);
    }
  }

  if (offers.length > 1 && people.length > 0) {
    const namedOffers = offers.map((o) => o.id);
    const allSame =
      people.every((p) => p.offerIds.length > 0) &&
      people.every(
        (p) =>
          p.offerIds.length === namedOffers.length &&
          namedOffers.every((id) => p.offerIds.includes(id)),
      );
    if (allSame) {
      gaps.push(
        "Every person is linked to every offer. That may mean the offers aren't distinct yet.",
      );
    }
  }

  return gaps;
}

export function flattenStarterMap(map: StarterMapData): {
  offers: string;
  people: string;
  channels: string;
  notes: string;
  automation: string;
} {
  const offers = map.offers
    .filter((o) => o.name.trim())
    .map((o, i) => {
      const desc = o.descriptions.filter(Boolean).join("\n    · ");
      return desc
        ? `${i + 1}. ${o.name.trim()}\n    · ${desc}`
        : `${i + 1}. ${o.name.trim()}`;
    })
    .join("\n\n");

  const people = map.people
    .filter((p) => p.label.trim())
    .map((p, i) => {
      const urgency = p.urgency ? ` (${p.urgency} urgency)` : "";
      const job = p.job.trim() ? `\n    Job: ${p.job.trim()}` : "";
      return `${i + 1}. ${p.label.trim()}${urgency}${job}`;
    })
    .join("\n\n");

  const channels = map.people
    .filter((p) => p.label.trim())
    .map((p) => {
      const labels = personChannelLabels(p);
      const channelText = labels.length ? labels.join(", ") : "(none selected)";
      return `${p.label.trim()} → ${channelText}`;
    })
    .join("\n");

  const linkLines = map.people
    .filter((p) => p.label.trim())
    .map((p) => {
      const offerNames = p.offerIds
        .map((id) => map.offers.find((o) => o.id === id)?.name.trim())
        .filter(Boolean);
      const offersText =
        offerNames.length > 0 ? offerNames.join(", ") : "(no offer linked)";
      const channelText =
        personChannelLabels(p).join(", ") || "(no channels)";
      return `${p.label.trim()}: ${offersText} · via ${channelText}`;
    })
    .join("\n");

  const gaps = detectGaps(map);
  const gapBlock =
    gaps.length > 0 ? `\n\nGaps flagged:\n· ${gaps.join("\n· ")}` : "";

  const notes = [
    linkLines && `Connections:\n${linkLines}`,
    map.reflection.trim() && `Reflection:\n${map.reflection.trim()}`,
    gapBlock.trim(),
  ]
    .filter(Boolean)
    .join("\n\n");

  return {
    offers: offers || "—",
    people: people || "—",
    channels: channels || "—",
    notes: notes || "—",
    automation: "",
  };
}

function normalizePerson(raw: unknown): StarterPerson {
  const p = raw as Record<string, unknown>;
  return {
    id: typeof p.id === "string" ? p.id : createId("person"),
    label: typeof p.label === "string" ? p.label : "",
    job: typeof p.job === "string" ? p.job : "",
    urgency: (typeof p.urgency === "string" ? p.urgency : "") as Urgency | "",
    offerIds: Array.isArray(p.offerIds) ? (p.offerIds as string[]) : [],
    channelIds: Array.isArray(p.channelIds)
      ? (p.channelIds as string[])
      : Array.isArray(p.tacticIds)
        ? (p.tacticIds as string[])
        : [],
    customChannels: Array.isArray(p.customChannels)
      ? (p.customChannels as string[])
      : Array.isArray(p.customTactics)
        ? (p.customTactics as string[])
        : [],
  };
}

export function isValidMapPayload(value: unknown): value is StarterMapData {
  if (!value || typeof value !== "object") return false;
  const v = value as StarterMapData;
  return (
    v.version === 1 &&
    Array.isArray(v.offers) &&
    Array.isArray(v.people) &&
    typeof v.reflection === "string"
  );
}

/** Migrate legacy sessionStorage drafts */
export function normalizeStoredMap(raw: unknown): StarterMapData {
  if (!raw || typeof raw !== "object") return emptyStarterMap();
  const v = raw as Record<string, unknown>;
  if (v.version !== 1 || !Array.isArray(v.offers) || !Array.isArray(v.people)) {
    return emptyStarterMap();
  }
  return {
    version: 1,
    offers: v.offers as StarterMapData["offers"],
    people: (v.people as unknown[]).map(normalizePerson),
    reflection: typeof v.reflection === "string" ? v.reflection : "",
    name: typeof v.name === "string" ? v.name : "",
    email: typeof v.email === "string" ? v.email : "",
    company: typeof v.company === "string" ? v.company : "",
    consentResearch: v.consentResearch === true,
  };
}
