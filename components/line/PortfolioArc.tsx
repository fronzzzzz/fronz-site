import Link from "next/link";
import { ARC } from "@/lib/lines";

/**
 * "Where it fits" — shows the Clarify -> Get found -> Get command arc and
 * highlights the current line, so customers see how the offerings intersect.
 */
export function PortfolioArc({ current }: { current: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {ARC.map((step, i) => {
        const active = step.slug === current;
        return (
          <Link
            key={step.slug}
            href={`/${step.slug}`}
            className={`group relative block border p-6 transition-colors ${
              active
                ? "border-ink bg-ink text-paper"
                : "border-line bg-paper hover:border-ink"
            }`}
          >
            <span
              className={`font-mono text-xs uppercase tracking-widest ${
                active ? "text-marker" : "text-chartreuse-deep"
              }`}
            >
              0{i + 1} · {step.label}
            </span>
            <p className="mt-3 font-serif text-2xl">{step.line}</p>
            <p
              className={`mt-1 text-sm ${active ? "text-paper/70" : "text-ink-muted"}`}
            >
              Legible to {step.legibleTo}
            </p>
            {active && (
              <span className="mt-4 inline-block font-mono text-xs text-marker">
                You're here
              </span>
            )}
            {!active && (
              <span className="mt-4 inline-block font-mono text-xs text-ink-muted group-hover:text-ink">
                Explore →
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
