import {
  detectGaps,
  personChannelLabels,
  STARTER_CHANNEL_PRESETS,
  type StarterMapData,
} from "@/lib/starter-map";

export type StarterSubmissionMeta = {
  submissionId: string;
  gapCount: number;
  gaps: string[];
  gapsText: string;
  offerCount: number;
  peopleCount: number;
  channelIds: string[];
  hasNothingYetChannel: boolean;
  mapVersion: number;
};

export function buildSubmissionMeta(
  map: StarterMapData,
  submissionId: string,
): StarterSubmissionMeta {
  const gaps = detectGaps(map);
  const offers = map.offers.filter((o) => o.name.trim());
  const people = map.people.filter((p) => p.label.trim());
  const channelIds = new Set<string>();

  for (const person of people) {
    for (const id of person.channelIds) {
      if (id !== "nothing") channelIds.add(id);
    }
    if (person.customChannels.some(Boolean)) channelIds.add("custom");
  }

  const hasNothingYetChannel = people.some((p) =>
    p.channelIds.includes("nothing"),
  );

  return {
    submissionId,
    gapCount: gaps.length,
    gaps,
    gapsText: gaps.length ? gaps.map((g) => `· ${g}`).join("\n") : "—",
    offerCount: offers.length,
    peopleCount: people.length,
    channelIds: [...channelIds],
    hasNothingYetChannel,
    mapVersion: map.version,
  };
}

export const NOTION_CHANNEL_OPTIONS = [
  ...STARTER_CHANNEL_PRESETS.filter((c) => c.id !== "nothing").map((c) => ({
    name: c.label,
    color: "default" as const,
  })),
  { name: "Custom", color: "gray" as const },
];

export function channelIdsToNotionLabels(ids: string[]): string[] {
  return ids.map((id) => {
    if (id === "custom") return "Custom";
    return (
      STARTER_CHANNEL_PRESETS.find((c) => c.id === id)?.label ?? id
    );
  });
}
