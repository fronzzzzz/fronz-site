#!/usr/bin/env node
/**
 * Bootstrap the GTM Clarity Starter Submissions database in Fronz Notion.
 *
 * Requires in .env.local (or env):
 *   NOTION_TOKEN
 *   NOTION_STARTER_PARENT_ID — existing "GTM Clarity Starter — Submissions" page
 *
 * Prints NOTION_STARTER_DATABASE_ID for .env.local when done.
 *
 * Usage: node scripts/setup-notion-starter-db.mjs
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const NOTION_VERSION = "2022-06-28";

function loadEnvLocal() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    /* no .env.local */
  }
}

loadEnvLocal();

const token = process.env.NOTION_TOKEN;
const parentId = process.env.NOTION_STARTER_PARENT_ID;

if (!token || !parentId) {
  console.error(
    "Missing NOTION_TOKEN or NOTION_STARTER_PARENT_ID. Add them to .env.local first.",
  );
  process.exit(1);
}

const channelOptions = [
  "Email list",
  "LinkedIn",
  "IRL events",
  "Word of mouth",
  "DMs",
  "Podcast",
  "Paid ads",
  "Content / SEO",
  "Partners",
  "Custom",
].map((name) => ({ name, color: "default" }));

const statusOptions = [
  { name: "New", color: "blue" },
  { name: "Booked", color: "yellow" },
  { name: "Completed", color: "green" },
  { name: "No show", color: "red" },
];

const body = {
  parent: { type: "page_id", page_id: parentId },
  icon: { type: "emoji", emoji: "📍" },
  title: [{ type: "text", text: { content: "Starter Submissions" } }],
  properties: {
    Submission: { title: {} },
    Email: { email: {} },
    Company: { rich_text: {} },
    Contact: { rich_text: {} },
    Submitted: { date: {} },
    Status: { select: { options: statusOptions } },
    "Gap count": { number: { format: "number" } },
    "Offer count": { number: { format: "number" } },
    "People count": { number: { format: "number" } },
    "Nothing yet channel": { checkbox: {} },
    Channels: { multi_select: { options: channelOptions } },
    "Map version": { number: { format: "number" } },
    "Submission ID": { rich_text: {} },
    Source: {
      select: {
        options: [{ name: "fronz-site/starter", color: "green" }],
      },
    },
    Gaps: { rich_text: {} },
  },
};

const res = await fetch("https://api.notion.com/v1/databases", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Notion-Version": NOTION_VERSION,
  },
  body: JSON.stringify(body),
});

const data = await res.json();

if (!res.ok) {
  console.error("Notion API error:", JSON.stringify(data, null, 2));
  process.exit(1);
}

console.log("\n✓ Created database: Starter Submissions\n");
console.log(`NOTION_STARTER_DATABASE_ID=${data.id}\n`);
console.log(
  "Add that line to .env.local, redeploy, and submit a test map to verify a new row appears.",
);
console.log(`\nOpen in Notion: https://www.notion.so/${data.id.replace(/-/g, "")}`);
