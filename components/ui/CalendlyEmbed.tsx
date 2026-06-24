"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

type CalendlyEmbedProps = {
  url: string;
  minHeight?: number;
};

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
export function CalendlyEmbed({ url, minHeight = 700 }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptReady = useRef(false);

  const initWidget = useCallback(() => {
    const parent = containerRef.current;
    if (!parent || !window.Calendly) return;
    parent.innerHTML = "";
    window.Calendly.initInlineWidget({ url, parentElement: parent });
  }, [url]);

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
