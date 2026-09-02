import type { Metadata } from "next";
import { FrontDoorProposal } from "@/components/proposal/FrontDoorProposal";
import { JUPITERBLOCK_PROPOSAL } from "@/lib/deliverables/jupiterblock-front-door";

export const metadata: Metadata = {
  title: "Front Door Intensive — JupiterBlock",
  description: JUPITERBLOCK_PROPOSAL.hero.subhead,
  robots: { index: false, follow: false },
  alternates: { canonical: JUPITERBLOCK_PROPOSAL.path },
};

export default function Page() {
  return <FrontDoorProposal />;
}
