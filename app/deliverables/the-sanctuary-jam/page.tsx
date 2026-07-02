import type { Metadata } from "next";
import { CaseStudyDetail } from "@/components/case-study/CaseStudyDetail";
import { getDeliverable } from "@/lib/deliverables";

const deliverable = getDeliverable("sanctuary")!;

export const metadata: Metadata = {
  title: `The Sanctuary Recap — Fronz`,
  description: deliverable.hero.subhead,
  // Client leave-behind, not for public discovery. Shareable URL only.
  robots: { index: false, follow: false },
  alternates: { canonical: "/deliverables/the-sanctuary-jam" },
};

export default function Page() {
  return <CaseStudyDetail study={deliverable} variant="deliverable" />;
}
