import { NextResponse } from "next/server";

/**
 * Lead capture for the GTM Clarity Starter.
 * Upserts the person in Customer.io and triggers an event a campaign can
 * listen for to deliver the Starter. Requires these env vars:
 *   CUSTOMERIO_SITE_ID         — Customer.io Tracking site ID
 *   CUSTOMERIO_TRACK_API_KEY   — Customer.io Tracking API key
 *   CUSTOMERIO_REGION          — "us" (default) or "eu"
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email: string | undefined;
  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim() : undefined;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const siteId = process.env.CUSTOMERIO_SITE_ID;
  const apiKey = process.env.CUSTOMERIO_TRACK_API_KEY;

  if (!siteId || !apiKey) {
    // Don't fake success — surface a real error so the form can fall back.
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

  try {
    const identify = await fetch(`https://${host}/api/v1/customers/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        email,
        gtm_clarity_starter_requested_at: Math.floor(Date.now() / 1000),
        source: "fronz-site/lead-form",
      }),
    });

    if (!identify.ok) {
      return NextResponse.json(
        { error: "Couldn't save your details. Please try again." },
        { status: 502 },
      );
    }

    await fetch(`https://${host}/api/v1/customers/${id}/events`, {
      method: "POST",
      headers,
      body: JSON.stringify({ name: "gtm_clarity_starter_requested" }),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach our email system. Please try again." },
      { status: 502 },
    );
  }
}
