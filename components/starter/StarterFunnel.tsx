"use client";

import { useState } from "react";
import { STARTER } from "@/lib/content";
import { StarterWizard } from "@/components/starter/StarterWizard";
import { PrivacyNote } from "@/components/starter/PrivacyNote";

type StarterFunnelProps = {
  calendlyUrl: string;
};

export function StarterFunnel({ calendlyUrl }: StarterFunnelProps) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div
        id="map"
        className="scroll-mt-24 border border-line bg-paper p-6 text-ink md:p-10"
      >
        <StarterWizard
          calendlyUrl={calendlyUrl}
          onExit={() => setActive(false)}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl py-4 md:py-8">
      <h2 className="text-[length:var(--text-h2)] text-paper">
        {STARTER.preview.heading}
      </h2>
      <p className="mt-4 text-lead text-paper/75">{STARTER.preview.sub}</p>
      <PrivacyNote variant="dark" className="mt-8" />
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
        className="mt-10 inline-flex min-h-[44px] items-center justify-center rounded-[2px] bg-marker px-7 py-4 font-mono text-sm tracking-wide text-ink transition-colors hover:bg-chartreuse"
      >
        {STARTER.preview.cta} →
      </button>
    </div>
  );
}
