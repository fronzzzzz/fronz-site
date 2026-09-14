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

## Troubleshooting

### Submissions succeed in the UI but no Notion rows

1. **Production (Vercel)** — add all three server env vars and redeploy:
   - `NOTION_TOKEN`
   - `NOTION_STARTER_DATABASE_ID`
   - `NOTION_STARTER_PARENT_ID`
   
   The API can return `saved: true` when only Customer.io is configured. Check the response fields `notionSaved` and `customerIoSaved`.

2. **Local dev** — if `.env.local` is correct but writes 401:
   - A stale `NOTION_TOKEN` in your shell overrides `.env.local` in Next.js.
   - Run `unset NOTION_TOKEN && pnpm dev`, or open a fresh terminal.

3. **Run diagnostics** (uses `.env.local`):

   ```bash
   node scripts/diagnose-notion-starter.mjs
   ```

4. **Look in the right place** — rows land in the **Map Submissions** database (`NOTION_STARTER_DATABASE_ID`), not the blank parent page.

5. **Integration access** — the Submissions page and database must be shared with the same Notion integration as `NOTION_TOKEN`.

6. **Source select** — if the database was created before the `/map` rename, add a `fronz-site/map` option on the **Source** property (or rerun the bootstrap script on a fresh parent page).
