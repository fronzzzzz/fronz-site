# GTM Clarity Starter — Notion DB (MVP)

Submissions from `/api/starter` can write to a **Notion database** (recommended) or fall back to child pages under the Submissions parent page.

## Access for Cursor / agents

The Cursor Notion MCP must be connected to the **Fronz workspace**, and the Submissions page must be **shared with the same integration** that powers `NOTION_TOKEN` on the site.

If the agent gets `object_not_found` for `NOTION_STARTER_PARENT_ID`, the integration does not have access yet.

### Grant access

1. Notion → **Settings → Connections** → confirm the Fronz site integration exists.
2. Open [GTM Clarity Starter — Submissions](https://app.notion.com/p/GTM-Clarity-Starter-Submissions-3898234f4e908171bfaaf5c46ffc3e04).
3. **⋯ → Connections → Add connection** → select the Fronz integration.
4. In Cursor, connect Notion MCP to the **fronz** workspace (not a personal sandbox).

## Bootstrap the database

From repo root with `.env.local` configured:

```bash
node scripts/setup-notion-starter-db.mjs
```

Copy the printed `NOTION_STARTER_DATABASE_ID` into `.env.local`.

Or create manually: inline database on the Submissions page with the properties below.

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
| Source | Select | `fronz-site/starter` |
| Gaps | Text | Quick scan before call |

Each row’s **page body** still holds the full map sections (offers, people, channels, reflection).

## Env vars

```env
NOTION_TOKEN=ntn_...
NOTION_STARTER_PARENT_ID=3898234f-4e90-8171-bfaa-f5c46ffc3e04
NOTION_STARTER_DATABASE_ID=...   # after bootstrap
```

When `NOTION_STARTER_DATABASE_ID` is set, submissions create **database rows**. Otherwise they create **child pages** (legacy behavior).

## Suggested Notion views

1. **Prep queue** — Status = New, sort by Submitted ascending
2. **High gaps** — Gap count ≥ 3
3. **Nothing yet** — Nothing yet channel = checked
4. **This week** — Submitted within 7 days

## API response

Successful submits return `{ ok: true, saved: boolean, submissionId: string }`. Use `submissionId` in Calendly prefill (future) to match bookings to rows.
