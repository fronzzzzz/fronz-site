"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

type CalendlyPrefill = {
  name?: string;
  email?: string;
};

type CalendlyEmbedProps = {
  url: string;
  minHeight?: number;
  prefill?: CalendlyPrefill;
};

function buildCalendlyUrl(url: string, prefill?: CalendlyPrefill): string {
  if (!prefill?.name && !prefill?.email) return url;
  try {
    const parsed = new URL(url);
    if (prefill.name) parsed.searchParams.set("name", prefill.name);
    if (prefill.email) parsed.searchParams.set("email", prefill.email);
    return parsed.toString();
  } catch {
    return url;
  }
}

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

/**
 * Calendly inline widget — keeps booking on your site instead of routing to calendly.com.
 * Set NEXT_PUBLIC_CALENDLY_URL to your event link (e.g. …/initial-consult).
 */
export function CalendlyEmbed({
  url,
  minHeight = 700,
  prefill,
}: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptReady = useRef(false);
  const widgetUrl = buildCalendlyUrl(url, prefill);

  const initWidget = useCallback(() => {
    const parent = containerRef.current;
    if (!parent || !window.Calendly) return;
    parent.innerHTML = "";
    window.Calendly.initInlineWidget({ url: widgetUrl, parentElement: parent });
  }, [widgetUrl]);

  useEffect(() => {
    if (scriptReady.current) initWidget();
  }, [initWidget]);

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          scriptReady.current = true;
          initWidget();
        }}
      />
      <div
        ref={containerRef}
        className="w-full overflow-hidden rounded-[2px] border border-line bg-paper"
        style={{ minWidth: "320px", height: `${minHeight}px` }}
      />
    </>
  );
}
