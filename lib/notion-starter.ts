import {
  channelIdsToNotionLabels,
  type StarterSubmissionMeta,
} from "@/lib/starter-submission-meta";
import { flattenStarterMap, type StarterMapData } from "@/lib/starter-map";

const NOTION_VERSION = "2022-06-28";

export type StarterSubmissionRecord = {
  name: string;
  email: string;
  company: string;
  structured?: StarterMapData;
  offers: string;
  people: string;
  channels: string;
  notes: string;
  meta: StarterSubmissionMeta;
};

function richText(content: string) {
  const trimmed = content.trim() || "—";
  const chunks: { type: "text"; text: { content: string } }[] = [];
  for (let i = 0; i < trimmed.length; i += 2000) {
    chunks.push({
      type: "text",
      text: { content: trimmed.slice(i, i + 2000) },
    });
  }
  return chunks;
}

function section(heading: string, text: string) {
  return [
    {
      object: "block",
      type: "heading_3",
      heading_3: {
        rich_text: [{ type: "text", text: { content: heading } }],
      },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: { rich_text: richText(text) },
    },
  ];
}

export function buildNotionSubmissionPage(record: StarterSubmissionRecord) {
  const submitted = new Date().toISOString();
  const submittedDate = submitted.slice(0, 10);
  const title = `${submittedDate} · ${record.name} · ${record.company}`;
  const versionNote = record.structured
    ? ` · structured map v${record.meta.mapVersion}`
    : " · legacy flat submit";

  return {
    icon: { type: "emoji", emoji: "📍" },
    properties: {
      Submission: {
        title: [{ text: { content: title } }],
      },
      Email: { email: record.email },
      Company: { rich_text: richText(record.company) },
      Contact: { rich_text: richText(record.name) },
      Submitted: { date: { start: submitted } },
      Status: { select: { name: "New" } },
      "Gap count": { number: record.meta.gapCount },
      "Offer count": { number: record.meta.offerCount },
      "People count": { number: record.meta.peopleCount },
      "Nothing yet channel": {
        checkbox: record.meta.hasNothingYetChannel,
      },
      Channels: {
        multi_select: channelIdsToNotionLabels(record.meta.channelIds).map(
          (name) => ({ name }),
        ),
      },
      "Map version": { number: record.meta.mapVersion },
      "Submission ID": {
        rich_text: richText(record.meta.submissionId),
      },
      Source: { select: { name: "fronz-site/starter" } },
      Gaps: { rich_text: richText(record.meta.gapsText) },
    },
    children: [
      {
        object: "block",
        type: "callout",
        callout: {
          icon: { type: "emoji", emoji: "✉️" },
          rich_text: richText(
            `${record.name} · ${record.company} · ${record.email} · submitted ${submittedDate} · via fronz-site/starter${versionNote} · id ${record.meta.submissionId}`,
          ),
        },
      },
      ...section("01 · Your offers", record.offers),
      ...section("02 · Your people", record.people),
      ...section("03 · Your channels", record.channels),
      ...section("04 · Connect the dots", record.notes),
    ],
  };
}

export async function writeStarterSubmissionToNotion(
  record: StarterSubmissionRecord,
): Promise<{ ok: boolean; pageId?: string }> {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_STARTER_DATABASE_ID;
  const parentPageId = process.env.NOTION_STARTER_PARENT_ID;

  if (!token) return { ok: false };

  const page = buildNotionSubmissionPage(record);
  const parent = databaseId
    ? { database_id: databaseId }
    : parentPageId
      ? { page_id: parentPageId }
      : null;

  if (!parent) return { ok: false };

  const properties = databaseId
    ? page.properties
    : {
        title: page.properties.Submission,
      };

  try {
    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Notion-Version": NOTION_VERSION,
      },
      body: JSON.stringify({
        parent,
        icon: page.icon,
        properties,
        children: page.children,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Notion submission failed:", err);
      return { ok: false };
    }

    const data = (await res.json()) as { id?: string };
    return { ok: true, pageId: data.id };
  } catch (err) {
    console.error("Notion submission failed (non-fatal):", err);
    return { ok: false };
  }
}
