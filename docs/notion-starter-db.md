# GTM Clarity Map — Notion DB (MVP)

Submissions from `/api/starter` can write to a **Notion database** (recommended) or fall back to child pages under the Submissions parent page.

## Access for Cursor / agents

The Cursor Notion MCP must be connected to the **Fronz workspace**, and the Submissions page must be **shared with the same integration** that powers `NOTION_TOKEN` on the site.

## Bootstrap the database

From repo root with `.env.local` configured:

```bash
node scripts/setup-notion-starter-db.mjs
```

Copy the printed `NOTION_STARTER_DATABASE_ID` into `.env.local`.

## Database schema

| Property | Type | Use |
|----------|------|-----|
| **Submission** | Title | `YYYY-MM-DD · Name · Company` |
| Email | Email | Match Calendly |
| Company | Text | Lead gen |
| Contact | Text | Call prep |
| Submitted | Date | Funnel timing |
| Status | Select | New → Booked → Completed / No show |
| Gap count | Number | Sort prep queue |
| Offer count | Number | Analytics |
| People count | Number | Analytics |
| Nothing yet channel | Checkbox | Strong signal |
| Channels | Multi-select | Pattern analysis |
| Map version | Number | Schema migrations |
| Submission ID | Text | Stable key from API |
| Source | Select | `fronz-site/map` |
| Gaps | Text | Quick scan before call |

## Env vars

```env
NOTION_TOKEN=ntn_...
NOTION_STARTER_PARENT_ID=...
NOTION_STARTER_DATABASE_ID=...
```

When `NOTION_STARTER_DATABASE_ID` is set, submissions create **database rows**. Otherwise they create **child pages** (legacy behavior).

## Suggested Notion views

1. **Prep queue** — Status = New, sort by Submitted ascending
2. **High gaps** — Gap count ≥ 3
3. **Nothing yet** — Nothing yet channel = checked
4. **This week** — Submitted within 7 days

## Public template

Duplicate link for Option A on `/map`:

`https://www.notion.so/3d6ebef38005806da346d8810eb980f5?source=copy_link`
