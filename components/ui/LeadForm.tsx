"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LEAD, SITE } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      // Capture the email if we can — but don't block access to the Starter
      // on it. Email delivery is off until the sending domain is verified, so
      // the Starter is delivered instantly by sending them to the page.
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        // 503 = capture not configured yet; still let them through.
        if (res.status !== 503) {
          setError(data?.error ?? "Something went wrong. Please try again.");
          setStatus("error");
          return;
        }
      }

      setStatus("success");
      router.push(LEAD.href);
    } catch {
      // Network hiccup shouldn't gate the free resource.
      setStatus("success");
      router.push(LEAD.href);
    }
  }

  if (status === "success") {
    return (
      <p className="font-mono text-sm text-chartreuse-deep">
        Opening your GTM Clarity Starter…{" "}
        <a
          href={LEAD.href}
          className="underline decoration-marker underline-offset-2 hover:text-ink"
        >
          Tap here if it doesn't load.
        </a>
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="lead-email" className="sr-only">
        Email address
      </label>
      <input
        id="lead-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={LEAD.placeholder}
        className="flex-1 border border-line bg-paper px-4 py-3.5 font-mono text-sm text-ink placeholder:text-ink-muted focus:border-chartreuse-deep focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-[2px] bg-ink px-6 py-3.5 font-mono text-sm tracking-wide text-paper transition-colors hover:bg-chartreuse-deep disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : LEAD.button}
      </button>
      {status === "error" && (
        <p className="basis-full font-mono text-xs text-ink-muted">
          {error}{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="underline decoration-marker underline-offset-2 hover:text-ink"
          >
            Or email me.
          </a>
        </p>
      )}
    </form>
  );
}
