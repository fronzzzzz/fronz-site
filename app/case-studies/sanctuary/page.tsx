import type { Metadata } from "next";
import { CaseStudyDetail } from "@/components/case-study/CaseStudyDetail";
import { getCaseStudy } from "@/lib/case-studies";

const study = getCaseStudy("sanctuary")!;

export const metadata: Metadata = {
  title: `The Sanctuary — GTM Clarity Jam case study`,
  description: study.hero.subhead,
  // Shareable link, not indexed. Flip to `index: true` (and add to sitemap.ts)
  // once client consent is confirmed for public portfolio use.
  robots: { index: false, follow: true },
  alternates: { canonical: "/case-studies/sanctuary" },
};

export default function Page() {
  return <CaseStudyDetail study={study} />;
}
