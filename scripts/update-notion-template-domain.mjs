#!/usr/bin/env node
/**
 * Update fronzz.com → www.fronzzz.com links in the GTM Clarity Map Notion template.
 * Usage: node scripts/update-notion-template-domain.mjs
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const NOTION_VERSION = "2022-06-28";
const TEMPLATE_PAGE_ID = "3d6ebef3-8005-806d-a346-d8810eb980f5";
const OLD = "https://fronzz.com";
const NEW = "https://www.fronzzz.com";

function loadEnvLocal() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const m = trimmed.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
    }
  } catch {
    /* no .env.local */
  }
}

loadEnvLocal();

const token = process.env.NOTION_TOKEN?.trim();
if (!token) {
  console.error("Missing NOTION_TOKEN in .env.local");
  process.exit(1);
}

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
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}

function mapRichText(richText) {
  return richText.map((part) => {
    let content = part.plain_text;
    let link = part.href ?? null;

    if (link?.startsWith(OLD)) {
      link = NEW + link.slice(OLD.length);
    }
    if (content.includes("fronzz.com")) {
      content = content.replace(/fronzz\.com/g, "fronzzz.com");
    }
    if (content.includes("Starter Review")) {
      content = content.replace("Starter Review", "Map Review");
    }

    const text = { content };
    if (link) text.link = { url: link };
    return { type: "text", text };
  });
}

async function walkBlocks(blockId) {
  let cursor;
  const updated = [];
  do {
    const data = await notion(
      `/blocks/${blockId}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ""}`,
    );
    for (const block of data.results) {
      const payload = block[block.type];
      if (payload?.rich_text?.some((t) => t.plain_text.includes("fronzz"))) {
        const body = {
          [block.type]: {
            rich_text: mapRichText(payload.rich_text),
          },
        };
        await notion(`/blocks/${block.id}`, {
          method: "PATCH",
          body: JSON.stringify(body),
        });
        updated.push(block.id);
        console.log(`Updated ${block.type} ${block.id}`);
      }
      if (block.has_children) {
        updated.push(...(await walkBlocks(block.id)));
      }
    }
    cursor = data.has_more ? data.next_cursor : null;
  } while (cursor);
  return updated;
}

const ids = await walkBlocks(TEMPLATE_PAGE_ID);
console.log(`\nDone — ${ids.length} block(s) updated on template ${TEMPLATE_PAGE_ID}`);
