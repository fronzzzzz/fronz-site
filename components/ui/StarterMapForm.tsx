"use client";

import { useState } from "react";
import { STARTER_FORM, STARTER, SITE } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const initial = { offers: "", people: "", tactics: "", notes: "", email: "" };

export function StarterMapForm() {
  const [values, setValues] = useState(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function update(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.email.trim()) return;
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/starter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email.trim(),
          offers: values.offers.trim(),
          people: values.people.trim(),
          tactics: values.tactics.trim(),
          notes: values.notes.trim(),
        }),
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
      <div className="border border-line bg-paper p-8">
        <p className="font-serif text-xl">{STARTER_FORM.success}</p>
        <a
          href={SITE.bookingUrl}
          className="mt-6 inline-flex items-center gap-2 rounded-[2px] bg-ink px-6 py-3.5 font-mono text-sm tracking-wide text-paper transition-colors hover:bg-chartreuse-deep"
        >
          {STARTER.cta} →
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 border border-line bg-paper p-8"
    >
      <div>
        <h3 className="text-[length:var(--text-h3)]">{STARTER_FORM.heading}</h3>
        <p className="mt-3 text-ink-muted">{STARTER_FORM.sub}</p>
      </div>

      {STARTER_FORM.fields.map((field) => (
        <div key={field.key} className="flex flex-col gap-2">
          <label
            htmlFor={`starter-${field.key}`}
            className="font-mono text-xs uppercase tracking-widest text-ink-muted"
          >
            {field.label}
          </label>
          <textarea
            id={`starter-${field.key}`}
            rows={3}
            value={values[field.key as keyof typeof values]}
            onChange={(e) => update(field.key, e.target.value)}
            placeholder={field.placeholder}
            className="w-full resize-y border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-chartreuse-deep focus:outline-none"
          />
        </div>
      ))}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="starter-email"
          className="font-mono text-xs uppercase tracking-widest text-ink-muted"
        >
          Your email
        </label>
        <input
          id="starter-email"
          type="email"
          required
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder={STARTER_FORM.emailPlaceholder}
          className="w-full border border-line bg-paper px-4 py-3.5 font-mono text-sm text-ink placeholder:text-ink-muted focus:border-chartreuse-deep focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-[2px] bg-ink px-6 py-3.5 font-mono text-sm tracking-wide text-paper transition-colors hover:bg-chartreuse-deep disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : STARTER_FORM.button}
        </button>
        {status === "error" && (
          <p className="font-mono text-xs text-ink-muted">
            {error}{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="underline decoration-marker underline-offset-2 hover:text-ink"
            >
              Or email me.
            </a>
          </p>
        )}
      </div>
    </form>
  );
}
