import type { Metadata } from "next";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/** Internal canvas for `node scripts/generate-wordmark.mjs` — matches header wordmark styles. */
export default function WordmarkExportPage() {
  return (
    <div
      id="wordmark-canvas"
      className="flex size-[2048px] items-center justify-center bg-paper text-ink"
    >
      <span className="font-serif text-[420px] font-semibold tracking-tight leading-none">
        {SITE.name}
      </span>
    </div>
  );
}
