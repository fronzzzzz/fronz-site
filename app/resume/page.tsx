import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ResumeStory } from "@/components/resume/ResumeStory";

export const metadata: Metadata = {
  title: "Resume — Stacey Fronek",
  description:
    "Ten years of building the thing, then handing over the keys. Founder, executive producer of the two largest Devcons ever held, and startup CMO/CPO — the career story of Stacey Fronek, told in chapters.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <>
      <Header />
      <main>
        <ResumeStory />
      </main>
      <Footer />
    </>
  );
}
