"use client";

import { useState } from "react";
import { STARTER } from "@/lib/content";
import { StarterWizard } from "@/components/starter/StarterWizard";

type StarterFunnelProps = {
  notionUrl?: string;
  gdocUrl?: string;
  calendlyUrl: string;
};

export function StarterFunnel({
  notionUrl,
  gdocUrl,
  calendlyUrl,
}: StarterFunnelProps) {
  const [active, setActive] = useState(false);
  const hasTemplates = Boolean(notionUrl || gdocUrl);

  return (
    <div className="space-y-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="border border-line bg-paper p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-chartreuse-deep">
            Option A
          </p>
          <h2 className="mt-3 text-[length:var(--text-h3)]">
            {STARTER.download.heading}
          </h2>
          <p className="mt-3 text-ink-muted">{STARTER.download.sub}</p>
          {hasTemplates ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {notionUrl && (
                <a
                  href={notionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-[2px] border border-line bg-paper px-6 py-3.5 font-mono text-sm tracking-wide transition-colors hover:border-ink"
                >
                  Copy Notion template →
                </a>
              )}
              {gdocUrl && (
                <a
                  href={gdocUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-[2px] border border-line bg-paper px-6 py-3.5 font-mono text-sm tracking-wide transition-colors hover:border-ink"
                >
                  Copy Google Doc template →
                </a>
              )}
            </div>
          ) : (
            <p className="mt-6 font-mono text-sm text-ink-muted">
              Templates coming soon. Use Option B to complete the map online.
            </p>
          )}
        </div>

        <div className="border border-line bg-paper-sink p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-chartreuse-deep">
            Option B
          </p>
          <h2 className="mt-3 text-[length:var(--text-h3)]">
            {STARTER.preview.heading}
          </h2>
          <p className="mt-3 text-ink-muted">{STARTER.preview.sub}</p>
          <ol className="mt-8 space-y-0 overflow-hidden border border-line bg-paper">
            {STARTER.parts.map((p, i) => (
              <li
                key={p.n}
                className="flex items-start gap-4 border-b border-line px-4 py-3.5 last:border-b-0"
              >
                <span className="font-mono text-xs text-chartreuse-deep">
                  {p.n}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-lg leading-snug">{p.title}</p>
                </div>
              </li>
            ))}
          </ol>
          {!active && (
            <button
              type="button"
              onClick={() => {
                setActive(true);
                requestAnimationFrame(() => {
                  document
                    .getElementById("map")
                    ?.scrollIntoView({ behavior: "smooth" });
                });
              }}
              className="mt-8 inline-flex min-h-[44px] w-full items-center justify-center rounded-[2px] bg-ink px-7 py-4 font-mono text-sm tracking-wide text-paper transition-colors hover:bg-chartreuse-deep sm:w-auto"
            >
              {STARTER.preview.cta} →
            </button>
          )}
        </div>
      </div>

      {active && (
        <div id="map" className="scroll-mt-24">
          <StarterWizard
            calendlyUrl={calendlyUrl}
            onExit={() => setActive(false)}
          />
        </div>
      )}

      <p className="font-mono text-xs text-ink-muted">{STARTER.footnote}</p>
    </div>
  );
}
