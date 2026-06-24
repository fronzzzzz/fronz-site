"use client";

import { useEffect } from "react";

/** Enables reveal animations only after JS is running — content stays visible without it. */
export function RevealReady() {
  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
  }, []);
  return null;
}
