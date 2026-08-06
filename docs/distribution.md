# Distribution playbook — fronzz.com

How to send the site out so you can tell what's working. Written Aug 2026.

## UTM convention

Append UTM parameters to every link you distribute. Vercel Analytics picks these up automatically. Keep values lowercase, hyphen-separated.

Format:

```
https://fronzz.com/resume?utm_source=<where>&utm_medium=<how>&utm_campaign=<track>
```

| Parameter | Use | Examples |
|-----------|-----|----------|
| `utm_source` | Where the link lives | `linkedin`, `email`, `twitter`, `warm-intro`, `job-application` |
| `utm_medium` | How it got there | `dm`, `cold-email`, `application-form`, `bio-link`, `referral` |
| `utm_campaign` | Which search track | `fractional`, `marketing-leadership`, `product-gtm`, `crypto`, `local-ga`, `client-outreach` |

Ready-to-copy examples:

- Job application (resume link in a form):
  `https://fronzz.com/resume?utm_source=job-application&utm_medium=application-form&utm_campaign=marketing-leadership`
- LinkedIn DM to a founder about fractional work:
  `https://fronzz.com?utm_source=linkedin&utm_medium=dm&utm_campaign=fractional`
- Warm intro forwarded by a contact:
  `https://fronzz.com/resume?utm_source=warm-intro&utm_medium=referral&utm_campaign=product-gtm`

Rule of thumb: link `/resume` for employment conversations, `/` for client conversations.

## Private links

The Sanctuary case study and deliverables stay noindex / private-link only. Share directly when relevant:

- `/case-studies/sanctuary`
- `/deliverables/the-sanctuary-jam-v2`

## Keeping materials in sync

Source of truth for career claims: the resume HTML files in
`~/Documents/Job Applications/`. When those change:

1. Re-export PDFs (headless Chrome or browser Print → Save as PDF)
2. Copy the general PDF to `public/Stacey-Fronek-Resume.pdf`
3. Check `lib/resume.ts` (the /resume story) for drift
4. Check LinkedIn against `LinkedIn - Profile Copy.md`

## Adding photos to /resume

Drop images in `public/resume/` and add `src` to the matching slot in
`lib/resume.ts`, e.g.:

```ts
{ label: "Devcon — main stage", src: "/resume/devcon-stage.jpg" }
```

All slots are click-to-enlarge automatically.
