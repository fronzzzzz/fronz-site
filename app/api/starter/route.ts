import { NextResponse } from "next/server";

/**
 * "Send your map ahead of your Jam" capture for the GTM Clarity Starter.
 *
 * Always: upserts the person in Customer.io and fires `starter_map_submitted`
 * (with the map as event data) + sets a flag attribute the delivery campaign
 * branches on. Reuses the Tracking API creds from app/api/lead.
 *
 * Optional (Phase 2): if NOTION_TOKEN + NOTION_STARTER_PARENT_ID are set, also
 * creates a child page under the Fronz "GTM Clarity Starter — Submissions" page
 * so the map is a reviewable, editable working doc for the Jam. A Notion failure
 * never fails the request — the Customer.io capture is the source of record.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NOTION_VERSION = "2022-06-28";

type Map = {
  email: string;
  offers: string;
  people: string;
  tactics: string;
  notes: string;
};

export async function POST(request: Request) {
  let body: Partial<Map>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const map: Map = {
    email,
    offers: clip(body.offers),
    people: clip(body.people),
    tactics: clip(body.tactics),
    notes: clip(body.notes),
  };

  const siteId = process.env.CUSTOMERIO_SITE_ID;
  const apiKey = process.env.CUSTOMERIO_TRACK_API_KEY;
  if (!siteId || !apiKey) {
    return NextResponse.json(
      { error: "Lead capture is not configured yet." },
      { status: 503 },
    );
  }

  const host =
    process.env.CUSTOMERIO_REGION === "eu"
      ? "track-eu.customer.io"
      : "track.customer.io";
  const auth = Buffer.from(`${siteId}:${apiKey}`).toString("base64");
  const id = encodeURIComponent(email);
  const headers = {
    Authorization: `Basic ${auth}`,
    "Content-Type": "application/json",
  };
  const now = Math.floor(Date.now() / 1000);

  try {
    const identify = await fetch(`https://${host}/api/v1/customers/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        email,
        starter_map_submitted: true,
        starter_map_submitted_at: now,
        source: "fronz-site/starter",
      }),
    });

    if (!identify.ok) {
      return NextResponse.json(
        { error: "Couldn't save your map. Please try again." },
        { status: 502 },
      );
    }

    await fetch(`https://${host}/api/v1/customers/${id}/events`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: "starter_map_submitted",
        data: {
          offers: map.offers,
          people: map.people,
          tactics: map.tactics,
          notes: map.notes,
        },
      }),
    });
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach our email system. Please try again." },
      { status: 502 },
    );
  }

  // Phase 2 mirror — only runs when the Fronz Notion workspace is wired up.
  await writeToNotion(map).catch((err) => {
    console.error("Notion mirror failed (non-fatal):", err);
  });

  return NextResponse.json({ ok: true });
}

function clip(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, 5000) : "";
}

async function writeToNotion(map: Map): Promise<void> {
  const token = process.env.NOTION_TOKEN;
  const parentId = process.env.NOTION_STARTER_PARENT_ID;
  if (!token || !parentId) return;

  const section = (heading: string, text: string) => [
    {
      object: "block",
      type: "heading_3",
      heading_3: { rich_text: [{ type: "text", text: { content: heading } }] },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [{ type: "text", text: { content: text || "—" } }],
      },
    },
  ];

  const submitted = new Date().toISOString().slice(0, 10);

  await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Notion-Version": NOTION_VERSION,
    },
    body: JSON.stringify({
      parent: { page_id: parentId },
      icon: { type: "emoji", emoji: "📍" },
      properties: {
        title: {
          title: [{ text: { content: `${submitted} · ${map.email}` } }],
        },
      },
      children: [
        {
          object: "block",
          type: "callout",
          callout: {
            icon: { type: "emoji", emoji: "✉️" },
            rich_text: [
              {
                type: "text",
                text: {
                  content: `${map.email} · submitted ${submitted} · via fronz-site/starter`,
                },
              },
            ],
          },
        },
        ...section("Your offers", map.offers),
        ...section("Your people", map.people),
        ...section("How you reach them", map.tactics),
        ...section("What jumped out", map.notes),
      ],
    }),
  });
}
