# Distribution playbook — fronzz.com

How to send the site out so you can tell what's working. Written Aug 2026. Updated 31 Aug 2026: client conversations only. `/resume` is unpublished (noindex, not in nav or sitemap). Do not send it as a hiring offer.

## UTM convention

Append UTM parameters to every link you distribute. Vercel Analytics picks these up automatically. Keep values lowercase, hyphen-separated.

Format:

```
https://fronzz.com?utm_source=<where>&utm_medium=<how>&utm_campaign=<track>
```

| Parameter | Use | Examples |
|-----------|-----|----------|
| `utm_source` | Where the link lives | `linkedin`, `email`, `twitter`, `warm-intro` |
| `utm_medium` | How it got there | `dm`, `cold-email`, `bio-link`, `referral` |
| `utm_campaign` | Which track | `client-outreach`, `gtm-clarity`, `groundswell` |

Ready-to-copy examples:

- LinkedIn DM to a founder:
  `https://fronzz.com?utm_source=linkedin&utm_medium=dm&utm_campaign=client-outreach`
- Warm intro forwarded by a contact:
  `https://fronzz.com?utm_source=warm-intro&utm_medium=referral&utm_campaign=gtm-clarity`
- Starter as the front door:
  `https://fronzz.com/starter?utm_source=email&utm_medium=cold-email&utm_campaign=gtm-clarity`

Rule of thumb: link `/` or `/starter` for client conversations. Do not link `/resume`.

## Private links

The Sanctuary case study and deliverables stay noindex / private-link only. Share directly when relevant:

- `/case-studies/sanctuary`
- `/deliverables/the-sanctuary-jam-v2`

`/resume` is the same class: URL may still resolve for already-sent links. It is not a distribution surface.

## Keeping materials in sync

Source of truth for career claims: the resume HTML files in
`~/Documents/Job Applications/`. When those change:

1. Re-export PDFs (headless Chrome or browser Print → Save as PDF)
2. Copy the general PDF to `public/Stacey-Fronek-Resume.pdf`
3. Check `lib/resume.ts` (the unpublished /resume story) for drift
4. Check LinkedIn against `LinkedIn - Profile Copy.md`

## Adding photos to /resume

Drop images in `public/resume/` and add `src` to the matching slot in
`lib/resume.ts`, e.g.:

```ts
{ label: "Devcon — main stage", src: "/resume/devcon-stage.jpg" }
```

All slots are click-to-enlarge automatically.
