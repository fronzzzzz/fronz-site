"use client";

import { useState } from "react";
import { LEAD, SITE } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm() {
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

      if (res.ok) {
        setStatus("success");
        return;
      }

      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setError("Couldn't reach the server. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="font-mono text-sm text-chartreuse-deep">
        You're on the list. Watch {email} for the GTM Clarity Starter.
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
