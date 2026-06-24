import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Highlight } from "@/components/ui/Highlight";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[70vh] w-full max-w-[1180px] flex-col justify-center px-6 py-24 md:px-10">
        <p className="kicker mb-6">[404] Lost the thread</p>
        <h1 className="max-w-[16ch] text-[length:var(--text-display)] leading-[0.98]">
          This page isn't <Highlight>legible</Highlight> — because it doesn't
          exist.
        </h1>
        <p className="mt-8 max-w-xl text-[length:var(--text-lead)] text-ink-muted">
          Fitting, for a brand about clarity. Let's get you back to something
          that makes sense.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-[2px] bg-ink px-6 py-3.5 font-mono text-sm tracking-wide text-paper transition-colors hover:bg-chartreuse-deep"
          >
            Back to home →
          </Link>
          <Link
            href="/#lines"
            className="font-mono text-sm underline decoration-marker decoration-2 underline-offset-[6px] transition-colors hover:decoration-chartreuse-deep"
          >
            See the services
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
