import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalendlyEmbed } from "@/components/ui/CalendlyEmbed";
import { BOOK, SITE, calendlyUrl } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book a Map Review",
  description: BOOK.sub,
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Header />
      <main>
        <section className="border-b border-line">
          <div className="mx-auto w-full max-w-[1180px] px-6 py-16 md:px-10 md:py-20">
            <nav className="mb-8 font-mono text-xs uppercase tracking-widest text-ink-muted">
              <Link href="/" className="hover:text-ink">
                Fronz
              </Link>
              <span className="mx-2">/</span>
              <span className="text-ink">Map Review</span>
            </nav>
            <p className="kicker mb-6">{BOOK.kicker}</p>
            <h1 className="text-[length:var(--text-h2)]">{BOOK.heading}</h1>
            <p className="mt-6 text-lead text-ink-muted">{BOOK.sub}</p>
            <p className="mt-4 text-sm text-ink-muted">{BOOK.attachNote}</p>
            <p className="mt-6 font-mono text-sm">
              {BOOK.prerequisite}{" "}
              <Link
                href={BOOK.prerequisiteHref}
                className="underline decoration-marker underline-offset-2 hover:text-chartreuse-deep"
              >
                {BOOK.prerequisiteLink}
              </Link>
            </p>
          </div>
        </section>

        <section className="bg-paper-sink">
          <div className="mx-auto w-full max-w-[1180px] px-6 py-10 md:px-10 md:py-14">
            <CalendlyEmbed url={calendlyUrl()} />
            <p className="mt-6 text-center font-mono text-xs text-ink-muted">
              Have a different inquiry? Email{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="underline decoration-marker underline-offset-2 hover:text-ink"
              >
                {SITE.email}
              </a>{" "}
              and we&apos;ll set up a time to discuss!
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
