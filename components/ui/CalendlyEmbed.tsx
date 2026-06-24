"use client";

import Script from "next/script";

type CalendlyEmbedProps = {
  url: string;
  minHeight?: number;
};

/**
 * Calendly inline widget — keeps booking on your site instead of routing to calendly.com.
 * Set NEXT_PUBLIC_CALENDLY_URL to your event link (e.g. …/gtm-clarity-jam).
 */
export function CalendlyEmbed({ url, minHeight = 700 }: CalendlyEmbedProps) {
  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <div
        className="calendly-inline-widget w-full overflow-hidden rounded-[2px] border border-line bg-paper"
        data-url={url}
        style={{ minWidth: "320px", height: `${minHeight}px` }}
      />
    </>
  );
}
