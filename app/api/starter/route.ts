import { NextResponse } from "next/server";

/**
 * GTM Clarity Starter map capture.
 *
 * Best-effort persistence: Customer.io (if configured) + Notion mirror (if configured).
 * Never blocks the user on backend failure — they can still book a Starter Review
 * and attach their map via Calendly.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NOTION_VERSION = "2022-06-28";

type Map = {
  email: string;
  offers: string;
  people: string;
  tactics: string;
  notes: string;
  automation: string;
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
    automation: clip(body.automation),
  };

  let saved = false;

  saved = (await writeToCustomerIo(map)) || saved;
  saved = (await writeToNotion(map)) || saved;

  if (!saved) {
    console.warn(
      "starter_map_submitted: no backend configured — map not persisted for",
      email,
    );
  }

  return NextResponse.json({ ok: true, saved });
}

function clip(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, 5000) : "";
}

async function writeToCustomerIo(map: Map): Promise<boolean> {
  const siteId = process.env.CUSTOMERIO_SITE_ID;
  const apiKey = process.env.CUSTOMERIO_TRACK_API_KEY;
  if (!siteId || !apiKey) return false;

  const host =
    process.env.CUSTOMERIO_REGION === "eu"
      ? "track-eu.customer.io"
      : "track.customer.io";
  const auth = Buffer.from(`${siteId}:${apiKey}`).toString("base64");
  const id = encodeURIComponent(map.email);
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
        email: map.email,
        starter_map_submitted: true,
        starter_map_submitted_at: now,
        source: "fronz-site/starter",
      }),
    });

    if (!identify.ok) return false;

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
          automation: map.automation,
        },
      }),
    });

    return true;
  } catch (err) {
    console.error("Customer.io capture failed (non-fatal):", err);
    return false;
  }
}

async function writeToNotion(map: Map): Promise<boolean> {
  const token = process.env.NOTION_TOKEN;
  const parentId = process.env.NOTION_STARTER_PARENT_ID;
  if (!token || !parentId) return false;

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

  try {
    const res = await fetch("https://api.notion.com/v1/pages", {
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
          ...section("01 · Your offers", map.offers),
          ...section("02 · Your people", map.people),
          ...section("03 · How you reach them", map.tactics),
          ...section("04 · What jumped out", map.notes),
          ...(map.automation
            ? section("05 · Automated vs. you", map.automation)
            : []),
        ],
      }),
    });

    return res.ok;
  } catch (err) {
    console.error("Notion mirror failed (non-fatal):", err);
    return false;
  }
}
