# Domain migration — fronzz.com → fronzzz.com

**Canonical:** `https://www.fronzzz.com`  
**Legacy:** `fronzz.com` and `www.fronzz.com` redirect to canonical (Vercel domain settings).

## Code SSOT

| What | Where |
|------|--------|
| Site URL | `lib/content.ts` → `SITE.url` |
| Sitemap, JSON-LD, OG | Derived from `SITE.url` |
| Calendly default | `lib/content.ts` + `NEXT_PUBLIC_CALENDLY_URL` |
| llms.txt | `public/llms.txt` |
| PDF footer | `lib/starter-map-pdf.tsx` |

## Vercel checklist

- [ ] Add `fronzzz.com` and `www.fronzzz.com` to project domains
- [ ] Deploy code with updated `SITE.url`
- [ ] Set `www.fronzzz.com` as **Primary Domain**
- [ ] Redirect `fronzz.com` → `www.fronzzz.com`
- [ ] Redirect `www.fronzz.com` → `www.fronzzz.com`
- [ ] Add `NOTION_*` env vars if not already on Production
- [ ] Update `NEXT_PUBLIC_CALENDLY_URL` on Vercel to `calendly.com/fronzzz/...`

## Notion

- **GTM Clarity Map template** — run `node scripts/update-notion-template-domain.mjs` after token is valid
- **Map Submissions DB** — no schema change; `Source` stays `fronz-site/map`

## Post-cutover

- [ ] Google Search Console — new property + change of address
- [ ] Test `/map` submit → Notion row
- [ ] Test redirects: `fronzz.com/map` → `www.fronzzz.com/map`
