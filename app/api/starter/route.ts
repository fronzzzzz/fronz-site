import { NextResponse } from "next/server";
import { writeStarterSubmissionToNotion } from "@/lib/notion-starter";
import { buildSubmissionMeta } from "@/lib/starter-submission-meta";
import {
  flattenStarterMap,
  isValidMapPayload,
  type StarterMapData,
} from "@/lib/starter-map";

/**
 * GTM Clarity Starter map capture.
 *
 * Accepts structured map (Phase 1) or legacy flat strings.
 * Best-effort persistence: Customer.io + Notion (database row or child page).
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FlatMap = {
  name: string;
  email: string;
  company: string;
  consentResearch: boolean;
  offers: string;
  people: string;
  channels: string;
  notes: string;
  automation: string;
  structured?: StarterMapData;
  submissionId: string;
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email =
    typeof body.email === "string" ? body.email.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const company =
    typeof body.company === "string" ? body.company.trim() : "";
  /** Submitting for a Starter Review implies client relationship and processing consent. */
  const consentResearch = true;
  const submissionId = crypto.randomUUID();

  if (!name) {
    return NextResponse.json(
      { error: "Please enter your name." },
      { status: 400 },
    );
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (!company) {
    return NextResponse.json(
      { error: "Please enter your company name." },
      { status: 400 },
    );
  }

  let map: FlatMap;

  if (isValidMapPayload(body.map)) {
    const structured: StarterMapData = {
      ...body.map,
      name,
      email,
      company,
      consentResearch,
    };
    const flat = flattenStarterMap(structured);
    map = {
      name,
      email,
      company,
      consentResearch,
      submissionId,
      ...flat,
      structured,
    };
  } else {
    map = {
      name,
      email,
      company,
      consentResearch,
      submissionId,
      offers: clip(body.offers),
      people: clip(body.people),
      channels: clip(body.channels ?? body.tactics),
      notes: clip(body.notes),
      automation: clip(body.automation),
    };
  }

  let saved = false;

  saved = (await writeToCustomerIo(map)) || saved;

  const notion = await writeStarterSubmissionToNotion({
    name: map.name,
    email: map.email,
    company: map.company,
    structured: map.structured,
    offers: map.offers,
    people: map.people,
    channels: map.channels,
    notes: map.notes,
    meta: buildSubmissionMeta(
      map.structured ?? {
        version: 1,
        offers: [],
        people: [],
        reflection: "",
        name: map.name,
        email: map.email,
        company: map.company,
        consentResearch: true,
      },
      map.submissionId,
    ),
  });
  saved = notion.ok || saved;

  if (!saved) {
    console.warn(
      "starter_map_submitted: no backend configured — map not persisted for",
      email,
    );
  }

  return NextResponse.json({ ok: true, saved, submissionId: map.submissionId });
}

function clip(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, 5000) : "";
}

async function writeToCustomerIo(map: FlatMap): Promise<boolean> {
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
        name: map.name,
        company: map.company,
        starter_map_submitted: true,
        starter_map_submitted_at: now,
        starter_research_consent: map.consentResearch,
        source: "fronz-site/starter",
        starter_map_version: map.structured ? 1 : 0,
        starter_submission_id: map.submissionId,
      }),
    });

    if (!identify.ok) return false;

    await fetch(`https://${host}/api/v1/customers/${id}/events`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: "starter_map_submitted",
        data: {
          submission_id: map.submissionId,
          name: map.name,
          company: map.company,
          consent_research: map.consentResearch,
          offers: map.offers,
          people: map.people,
          channels: map.channels,
          notes: map.notes,
          automation: map.automation,
          structured: map.structured ?? null,
        },
      }),
    });

    return true;
  } catch (err) {
    console.error("Customer.io capture failed (non-fatal):", err);
    return false;
  }
}
