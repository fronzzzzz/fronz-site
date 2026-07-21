import type { Metadata } from "next";
import { CaseStudyDetail } from "@/components/case-study/CaseStudyDetail";
import { getDeliverable } from "@/lib/deliverables";

const deliverable = getDeliverable("sanctuary-v2")!;

export const metadata: Metadata = {
  title: `The Sanctuary Recap v2 — Fronz`,
  description: deliverable.hero.subhead,
  // Client leave-behind, not for public discovery. Shareable URL only.
  robots: { index: false, follow: false },
  alternates: { canonical: "/deliverables/the-sanctuary-jam-v2" },
};

export default function Page() {
  return <CaseStudyDetail study={deliverable} variant="deliverable" />;
}
