#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const NOTION_VERSION = "2022-06-28";

function loadEnvLocal() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const m = trimmed.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
      }
    }
  } catch {
    /* no .env.local */
  }
}

const shellToken = process.env.NOTION_TOKEN?.trim();
loadEnvLocal();

const token = process.env.NOTION_TOKEN?.trim();
const databaseId = process.env.NOTION_STARTER_DATABASE_ID?.trim();
const parentId = process.env.NOTION_STARTER_PARENT_ID?.trim();

async function notion(path, options = {}) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }
  return { ok: res.ok, status: res.status, data };
}

console.log("=== Notion map submission diagnostics ===\n");
console.log("NOTION_TOKEN:", token ? `${token.slice(0, 8)}… (${token.length} chars)` : "MISSING");
if (shellToken && token && shellToken !== token) {
  console.log(
    "⚠ Shell NOTION_TOKEN differs from .env.local — Next.js dev keeps the shell value.",
  );
  console.log("  Run: unset NOTION_TOKEN && pnpm dev");
}
console.log("NOTION_STARTER_DATABASE_ID:", databaseId ?? "MISSING");
console.log("NOTION_STARTER_PARENT_ID:", parentId ?? "MISSING");
console.log();

if (!token) {
  console.error("Set NOTION_TOKEN in .env.local");
  process.exit(1);
}

const me = await notion("/users/me");
console.log("1. Token valid:", me.ok ? "yes" : `no (${me.status})`);
if (!me.ok) {
  console.error(JSON.stringify(me.data, null, 2));
  process.exit(1);
}
console.log("   Integration:", me.data.name ?? me.data.id);

if (databaseId) {
  const db = await notion(`/databases/${databaseId}`);
  console.log("\n2. Database accessible:", db.ok ? "yes" : `no (${db.status})`);
  if (!db.ok) {
    console.error(JSON.stringify(db.data, null, 2));
  } else {
    const props = Object.keys(db.data.properties ?? {});
    console.log("   Title:", db.data.title?.[0]?.plain_text ?? "(untitled)");
    console.log("   Properties:", props.join(", "));

    const expected = [
      "Submission",
      "Email",
      "Company",
      "Contact",
      "Submitted",
      "Status",
      "Gap count",
      "Offer count",
      "People count",
      "Nothing yet channel",
      "Channels",
      "Map version",
      "Submission ID",
      "Source",
      "Gaps",
    ];
    const missing = expected.filter((p) => !props.includes(p));
    if (missing.length) {
      console.log("   ⚠ Missing properties:", missing.join(", "));
    }

    const sourceOpts =
      db.data.properties?.Source?.select?.options?.map((o) => o.name) ?? [];
    console.log("   Source options:", sourceOpts.join(", ") || "(none)");
    if (!sourceOpts.includes("fronz-site/map")) {
      console.log('   ⚠ Source option "fronz-site/map" missing — writes will fail');
    }
  }

  console.log("\n3. Test row create (dry payload)…");
  const testPayload = {
    parent: { database_id: databaseId },
    properties: {
      Submission: {
        title: [{ text: { content: "DIAG · Test · Do not use" } }],
      },
      Email: { email: "diagnostic@example.com" },
      Company: { rich_text: [{ text: { content: "Diagnostic Co" } }] },
      Contact: { rich_text: [{ text: { content: "Diagnostic Test" } }] },
      Submitted: { date: { start: new Date().toISOString() } },
      Status: { select: { name: "New" } },
      "Gap count": { number: 0 },
      "Offer count": { number: 1 },
      "People count": { number: 1 },
      "Nothing yet channel": { checkbox: false },
      Channels: { multi_select: [{ name: "Email list" }] },
      "Map version": { number: 1 },
      "Submission ID": {
        rich_text: [{ text: { content: "diag-test-id" } }],
      },
      Source: { select: { name: "fronz-site/map" } },
      Gaps: { rich_text: [{ text: { content: "—" } }] },
    },
    children: [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [{ type: "text", text: { content: "Diagnostic test row — safe to delete." } }],
        },
      },
    ],
  };

  const create = await notion("/pages", {
    method: "POST",
    body: JSON.stringify(testPayload),
  });
  console.log("   Create result:", create.ok ? "success" : `failed (${create.status})`);
  if (!create.ok) {
    console.error(JSON.stringify(create.data, null, 2));
  } else {
    const pageId = create.data.id?.replace(/-/g, "");
    console.log(`   Created page: https://www.notion.so/${pageId}`);
    console.log("   Delete this test row in Notion when done reviewing.");
  }

  const query = await notion(`/databases/${databaseId}/query`, {
    method: "POST",
    body: JSON.stringify({ page_size: 5, sorts: [{ timestamp: "created_time", direction: "descending" }] }),
  });
  console.log("\n4. Recent rows in database:", query.ok ? query.data.results?.length ?? 0 : `query failed (${query.status})`);
  if (query.ok && query.data.results?.length) {
    for (const row of query.data.results) {
      const title = row.properties?.Submission?.title?.[0]?.plain_text ?? "(no title)";
      const created = row.created_time?.slice(0, 19) ?? "?";
      console.log(`   · ${created} — ${title}`);
    }
  } else if (!query.ok) {
    console.error(JSON.stringify(query.data, null, 2));
  }
}

if (parentId) {
  const parent = await notion(`/pages/${parentId}`);
  console.log("\n5. Parent page accessible:", parent.ok ? "yes" : `no (${parent.status})`);
  if (!parent.ok) console.error(JSON.stringify(parent.data, null, 2));
}
