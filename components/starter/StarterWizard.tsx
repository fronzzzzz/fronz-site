"use client";

import { useCallback, useEffect, useState } from "react";
import { STARTER, STARTER_FORM, SITE } from "@/lib/content";
import {
  STARTER_CHANNEL_PRESETS,
  STARTER_MAP_LIMITS,
  detectGaps,
  emptyOffer,
  emptyPerson,
  emptyStarterMap,
  normalizeStoredMap,
  type StarterMapData,
  type StarterOffer,
  type StarterPerson,
  type Urgency,
} from "@/lib/starter-map";
import { CalendlyEmbed } from "@/components/ui/CalendlyEmbed";
import { MapDiagram, MapMobileSummary } from "@/components/starter/MapDiagram";
import { PrivacyNote } from "@/components/starter/PrivacyNote";
import { downloadStarterMapPdf } from "@/lib/starter-map-pdf";

const STORAGE_KEY = "fronz-starter-map-v1";

type Phase = "wizard" | "success";
type Status = "idle" | "submitting" | "error";

type BookedContact = {
  name: string;
  email: string;
  company: string;
};

function loadMap(): StarterMapData {
  if (typeof window === "undefined") return emptyStarterMap();
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStarterMap();
    return normalizeStoredMap(JSON.parse(raw));
  } catch {
    return emptyStarterMap();
  }
}

function saveMap(map: StarterMapData) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

function clearMap() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

const selectedChipClass =
  "border-chartreuse-deep bg-marker/40 text-ink";
const chipClass =
  "min-h-[44px] rounded-[2px] border px-3 py-2 font-mono text-xs tracking-wide transition-colors";

function toggleChannel(
  person: StarterPerson,
  channelId: string,
): StarterPerson {
  const preset = STARTER_CHANNEL_PRESETS.find((c) => c.id === channelId);
  if (preset?.exclusive) {
    const on = person.channelIds.includes(channelId);
    return {
      ...person,
      channelIds: on ? [] : [channelId],
      customChannels: on ? person.customChannels : [],
    };
  }
  const base = person.channelIds.filter((id) => id !== "nothing");
  const on = base.includes(channelId);
  return {
    ...person,
    channelIds: on
      ? base.filter((id) => id !== channelId)
      : [...base, channelId],
  };
}

function addCustomChannel(person: StarterPerson, label: string): StarterPerson {
  const trimmed = label.trim();
  if (!trimmed || person.customChannels.includes(trimmed)) return person;
  return {
    ...person,
    customChannels: [...person.customChannels, trimmed],
    channelIds: person.channelIds.filter((id) => id !== "nothing"),
  };
}

function toggleOffer(person: StarterPerson, offerId: string): StarterPerson {
  const on = person.offerIds.includes(offerId);
  return {
    ...person,
    offerIds: on
      ? person.offerIds.filter((id) => id !== offerId)
      : [...person.offerIds, offerId],
  };
}

const inputClass =
  "w-full min-h-[44px] border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-chartreuse-deep focus:outline-none";

type ReviewGatewayFormProps = {
  map: StarterMapData;
  persist: (next: StarterMapData) => void;
  onSubmit: (e: React.FormEvent) => void;
  status: Status;
  error: string;
};

const inputClassDark =
  "w-full min-h-[44px] border border-paper/20 bg-paper/5 px-4 py-3 text-sm text-paper placeholder:text-paper/40 focus:border-chartreuse-deep focus:outline-none";

function ReviewGatewayForm({
  map,
  persist,
  onSubmit,
  status,
  error,
}: ReviewGatewayFormProps) {
  return (
    <div className="mt-10 bg-ink p-6 text-paper md:p-10">
      <p className="font-mono text-xs uppercase tracking-widest text-paper/60">
        {STARTER_FORM.reviewGatewayKicker}
      </p>
      <h3 className="mt-3 text-[length:var(--text-h3)] text-paper">
        {STARTER_FORM.reviewGatewayHeading}
      </h3>
      <p className="mt-4 max-w-xl text-paper/75">
        {STARTER_FORM.reviewGatewaySub}
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="starter-name"
              className="font-mono text-xs uppercase tracking-widest text-paper/60"
            >
              {STARTER_FORM.nameLabel}
            </label>
            <input
              id="starter-name"
              type="text"
              required
              autoComplete="name"
              value={map.name}
              onChange={(e) => persist({ ...map, name: e.target.value })}
              placeholder={STARTER_FORM.namePlaceholder}
              className={inputClassDark}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="starter-company"
              className="font-mono text-xs uppercase tracking-widest text-paper/60"
            >
              {STARTER_FORM.companyLabel}
            </label>
            <input
              id="starter-company"
              type="text"
              required
              autoComplete="organization"
              value={map.company}
              onChange={(e) => persist({ ...map, company: e.target.value })}
              placeholder={STARTER_FORM.companyPlaceholder}
              className={inputClassDark}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="starter-email"
            className="font-mono text-xs uppercase tracking-widest text-paper/60"
          >
            {STARTER_FORM.emailLabel}
          </label>
          <input
            id="starter-email"
            type="email"
            required
            autoComplete="email"
            value={map.email}
            onChange={(e) => persist({ ...map, email: e.target.value })}
            placeholder={STARTER_FORM.emailPlaceholder}
            className={`${inputClassDark} font-mono`}
          />
          <p className="text-xs text-paper/60">{STARTER_FORM.emailHelp}</p>
        </div>
        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex min-h-[48px] items-center justify-center rounded-[2px] bg-chartreuse-deep px-8 py-4 font-mono text-sm tracking-wide text-ink transition-colors hover:bg-paper disabled:opacity-60"
          >
            {status === "submitting"
              ? "Sending…"
              : `${STARTER_FORM.submitButton} →`}
          </button>
          {status === "error" && (
            <p className="font-mono text-xs text-paper/70">
              {error}{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="underline decoration-marker underline-offset-2 hover:text-paper"
              >
                Or email me.
              </a>
            </p>
          )}
        </div>
        <p className="font-mono text-xs text-paper/50">
          {STARTER_FORM.reviewGatewayFinePrint}
        </p>
      </form>
    </div>
  );
}

type StarterWizardProps = {
  calendlyUrl: string;
  onExit: () => void;
};

export function StarterWizard({ calendlyUrl, onExit }: StarterWizardProps) {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("wizard");
  const [map, setMap] = useState<StarterMapData>(emptyStarterMap);
  const [status, setStatus] = useState<Status>("idle");
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [customChannelDraft, setCustomChannelDraft] = useState<
    Record<string, string>
  >({});
  const [bookedContact, setBookedContact] = useState<BookedContact | null>(
    null,
  );

  useEffect(() => {
    setMap(loadMap());
  }, []);

  const persist = useCallback((next: StarterMapData) => {
    setMap(next);
    saveMap(next);
  }, []);

  const partCount = STARTER.parts.length;
  const part = STARTER.parts[step];
  const gaps = detectGaps(map);

  function updateOffers(updater: (offers: StarterOffer[]) => StarterOffer[]) {
    persist({ ...map, offers: updater(map.offers) });
  }

  function updatePeople(updater: (people: StarterPerson[]) => StarterPerson[]) {
    persist({ ...map, people: updater(map.people) });
  }

  function canAdvance(): boolean {
    if (step === 0) return map.offers.some((o) => o.name.trim());
    if (step === 1) return map.people.some((p) => p.label.trim());
    return true;
  }

  function goNext() {
    if (!canAdvance() || step >= partCount - 1) return;
    setStep((s) => s + 1);
  }

  function goBack() {
    if (step > 0) setStep((s) => s - 1);
    else onExit();
  }

  async function handleDownload() {
    setDownloading(true);
    try {
      await downloadStarterMapPdf(map);
    } finally {
      setDownloading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = map.name.trim();
    const email = map.email.trim();
    const company = map.company.trim();
    if (!name || !email || !company) return;
    setStatus("submitting");
    setError("");

    const payload = {
      ...map,
      name,
      email,
      company,
    };

    try {
      const res = await fetch("/api/starter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          consentResearch: true,
          map: payload,
        }),
      });

      if (res.ok) {
        setBookedContact({ name, email, company });
        clearMap();
        setPhase("success");
        setStatus("idle");
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

  if (phase === "success") {
    return (
      <div className="mx-auto max-w-3xl border border-line bg-paper p-6 md:p-10">
        <p className="font-serif text-[length:var(--text-h3)]">
          {STARTER_FORM.successHeadline}
        </p>
        <p className="mt-3 text-ink-muted">{STARTER_FORM.successBody}</p>
        <h2 className="mt-10 text-[length:var(--text-h3)]">
          {STARTER_FORM.scheduleHeading}
        </h2>
        <p className="mt-2 text-ink-muted">{STARTER_FORM.scheduleSub}</p>
        <div className="mt-8">
          <CalendlyEmbed
            url={calendlyUrl}
            minHeight={640}
            prefill={
              bookedContact
                ? {
                    name: bookedContact.name,
                    email: bookedContact.email,
                  }
                : undefined
            }
          />
        </div>
          <p className="mt-6 font-mono text-xs text-ink-muted">
            {STARTER_FORM.offlineNote}
          </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl border border-line bg-paper p-6 md:p-10">
      {step === 0 && <PrivacyNote variant="wizard" />}
      <div className={`flex items-center justify-between gap-4 ${step === 0 ? "mt-8" : ""}`}>
        <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
          Part {step + 1} of {partCount}
        </p>
        <div className="flex gap-1.5" aria-hidden="true">
          {STARTER.parts.map((p, i) => (
            <span
              key={p.n}
              className={`h-1.5 w-6 rounded-full ${
                i <= step ? "bg-chartreuse-deep" : "bg-line"
              }`}
            />
          ))}
        </div>
      </div>

      <span className="mt-6 inline-block font-mono text-xs text-chartreuse-deep">
        {part.n}
      </span>
      <h2 className="mt-2 text-[length:var(--text-h3)]">{part.title}</h2>
      <p className="mt-4 text-ink-muted">{part.body}</p>

      {/* Step 0: Offers */}
      {step === 0 && (
        <div className="mt-8 space-y-6">
          {map.offers.map((offer, oi) => (
            <div
              key={offer.id}
              className="border border-line bg-paper-sink p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-xs text-chartreuse-deep">
                  Offer {oi + 1}
                </span>
                {map.offers.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      updateOffers((list) =>
                        list.filter((o) => o.id !== offer.id),
                      )
                    }
                    className="font-mono text-xs text-ink-muted hover:text-ink"
                  >
                    Remove
                  </button>
                )}
              </div>
              <label className="mt-4 block font-mono text-xs uppercase tracking-widest text-ink-muted">
                {STARTER_FORM.offerName}
              </label>
              <input
                value={offer.name}
                onChange={(e) =>
                  updateOffers((list) =>
                    list.map((o) =>
                      o.id === offer.id ? { ...o, name: e.target.value } : o,
                    ),
                  )
                }
                placeholder={STARTER_FORM.offerNamePlaceholder}
                className={`${inputClass} mt-2`}
              />
              {offer.descriptions.map((desc, di) => (
                <div key={di} className="mt-3">
                  <input
                    value={desc}
                    onChange={(e) =>
                      updateOffers((list) =>
                        list.map((o) =>
                          o.id === offer.id
                            ? {
                                ...o,
                                descriptions: o.descriptions.map((d, j) =>
                                  j === di ? e.target.value : d,
                                ),
                              }
                            : o,
                        ),
                      )
                    }
                    placeholder={
                      di === 0
                        ? "“I usually describe it as…”"
                        : STARTER_FORM.descriptionPlaceholder
                    }
                    className={inputClass}
                  />
                </div>
              ))}
              {offer.descriptions.length <
                STARTER_MAP_LIMITS.maxDescriptions && (
                <button
                  type="button"
                  onClick={() =>
                    updateOffers((list) =>
                      list.map((o) =>
                        o.id === offer.id
                          ? { ...o, descriptions: [...o.descriptions, ""] }
                          : o,
                      ),
                    )
                  }
                  className="mt-3 font-mono text-xs text-ink-muted underline decoration-line underline-offset-4 hover:text-ink"
                >
                  {STARTER_FORM.addDescription}
                </button>
              )}
            </div>
          ))}
          {map.offers.length < STARTER_MAP_LIMITS.maxOffers && (
            <button
              type="button"
              onClick={() =>
                updateOffers((list) => [...list, emptyOffer()])
              }
              className="font-mono text-sm text-ink-muted underline decoration-marker underline-offset-4 hover:text-ink"
            >
              + {STARTER_FORM.addOffer}
            </button>
          )}
        </div>
      )}

      {/* Step 1: People */}
      {step === 1 && (
        <div className="mt-8 space-y-6">
          {map.people.map((person, pi) => (
            <div
              key={person.id}
              className="border border-line bg-paper-sink p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-xs text-chartreuse-deep">
                  Person {pi + 1}
                </span>
                {map.people.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      updatePeople((list) =>
                        list.filter((p) => p.id !== person.id),
                      )
                    }
                    className="font-mono text-xs text-ink-muted hover:text-ink"
                  >
                    Remove
                  </button>
                )}
              </div>
              <label className="mt-4 block font-mono text-xs uppercase tracking-widest text-ink-muted">
                {STARTER_FORM.personLabel}
              </label>
              <input
                value={person.label}
                onChange={(e) =>
                  updatePeople((list) =>
                    list.map((p) =>
                      p.id === person.id
                        ? { ...p, label: e.target.value }
                        : p,
                    ),
                  )
                }
                placeholder={STARTER_FORM.personLabelPlaceholder}
                className={`${inputClass} mt-2`}
              />
              <label className="mt-4 block font-mono text-xs uppercase tracking-widest text-ink-muted">
                {STARTER_FORM.personJob}
              </label>
              <input
                value={person.job}
                onChange={(e) =>
                  updatePeople((list) =>
                    list.map((p) =>
                      p.id === person.id ? { ...p, job: e.target.value } : p,
                    ),
                  )
                }
                placeholder={STARTER_FORM.personJobPlaceholder}
                className={`${inputClass} mt-2`}
              />
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-muted">
                {STARTER_FORM.urgencyLabel}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(["low", "medium", "high"] as Urgency[]).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() =>
                      updatePeople((list) =>
                        list.map((p) =>
                          p.id === person.id
                            ? {
                                ...p,
                                urgency: p.urgency === u ? "" : u,
                              }
                            : p,
                        ),
                      )
                    }
                    className={`min-h-[44px] rounded-[2px] border px-4 py-2 font-mono text-xs capitalize tracking-wide transition-colors ${
                      person.urgency === u
                        ? "border-ink bg-ink text-paper"
                        : "border-line bg-paper text-ink-muted hover:border-ink"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
              {map.offers.some((o) => o.name.trim()) ? (
                <>
                  <p className="mt-6 font-mono text-xs uppercase tracking-widest text-ink-muted">
                    {STARTER_FORM.offerLinkLabel}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {map.offers
                      .filter((o) => o.name.trim())
                      .map((offer) => {
                        const on = person.offerIds.includes(offer.id);
                        return (
                          <button
                            key={offer.id}
                            type="button"
                            onClick={() =>
                              updatePeople((list) =>
                                list.map((p) =>
                                  p.id === person.id
                                    ? toggleOffer(p, offer.id)
                                    : p,
                                ),
                              )
                            }
                            className={`min-h-[44px] rounded-[2px] border px-3 py-2 font-mono text-xs tracking-wide transition-colors ${
                              on
                                ? "border-chartreuse-deep bg-marker/40 text-ink"
                                : "border-line bg-paper text-ink-muted hover:border-ink"
                            }`}
                          >
                            {offer.name.trim()}
                          </button>
                        );
                      })}
                  </div>
                </>
              ) : (
                <p className="mt-6 font-mono text-xs text-ink-muted">
                  Name your offers in Part 1 to link them here.
                </p>
              )}
            </div>
          ))}
          {map.people.length < STARTER_MAP_LIMITS.maxPeople && (
            <button
              type="button"
              onClick={() =>
                updatePeople((list) => [...list, emptyPerson()])
              }
              className="font-mono text-sm text-ink-muted underline decoration-marker underline-offset-4 hover:text-ink"
            >
              + {STARTER_FORM.addPerson}
            </button>
          )}
        </div>
      )}

      {/* Step 2: Channels */}
      {step === 2 && (
        <div className="mt-8 space-y-6">
          {map.people
            .filter((p) => p.label.trim())
            .map((person) => (
              <div
                key={person.id}
                className="border border-line bg-paper-sink p-5"
              >
                <p className="font-serif text-lg">{person.label.trim()}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {STARTER_CHANNEL_PRESETS.map((channel) => {
                    const on = person.channelIds.includes(channel.id);
                    return (
                      <button
                        key={channel.id}
                        type="button"
                        onClick={() =>
                          updatePeople((list) =>
                            list.map((p) =>
                              p.id === person.id
                                ? toggleChannel(p, channel.id)
                                : p,
                            ),
                          )
                        }
                        className={`${chipClass} ${
                          on
                            ? selectedChipClass
                            : "border-line bg-paper text-ink-muted hover:border-ink"
                        }`}
                      >
                        {channel.label}
                      </button>
                    );
                  })}
                  {person.customChannels.map((custom) => (
                    <button
                      key={`${person.id}-${custom}`}
                      type="button"
                      onClick={() =>
                        updatePeople((list) =>
                          list.map((p) =>
                            p.id === person.id
                              ? {
                                  ...p,
                                  customChannels: p.customChannels.filter(
                                    (c) => c !== custom,
                                  ),
                                }
                              : p,
                          ),
                        )
                      }
                      className={`${chipClass} ${selectedChipClass}`}
                      aria-label={`Remove ${custom}`}
                    >
                      {custom} ×
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <input
                    value={customChannelDraft[person.id] ?? ""}
                    onChange={(e) =>
                      setCustomChannelDraft((d) => ({
                        ...d,
                        [person.id]: e.target.value,
                      }))
                    }
                    placeholder={STARTER_FORM.customChannelPlaceholder}
                    className={`${inputClass} flex-1`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const val = (
                          customChannelDraft[person.id] ?? ""
                        ).trim();
                        if (!val) return;
                        updatePeople((list) =>
                          list.map((p) =>
                            p.id === person.id
                              ? addCustomChannel(p, val)
                              : p,
                          ),
                        );
                        setCustomChannelDraft((d) => ({
                          ...d,
                          [person.id]: "",
                        }));
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const val = (
                        customChannelDraft[person.id] ?? ""
                      ).trim();
                      if (!val) return;
                      updatePeople((list) =>
                        list.map((p) =>
                          p.id === person.id
                            ? addCustomChannel(p, val)
                            : p,
                        ),
                      );
                      setCustomChannelDraft((d) => ({
                        ...d,
                        [person.id]: "",
                      }));
                    }}
                    className="min-h-[44px] shrink-0 rounded-[2px] border border-line px-4 font-mono text-xs hover:border-ink"
                  >
                    {STARTER_FORM.addCustomChannel}
                  </button>
                </div>
              </div>
            ))}
          {map.people.every((p) => !p.label.trim()) && (
            <p className="font-mono text-sm text-ink-muted">
              Add at least one person in Part 2 to set channels.
            </p>
          )}
        </div>
      )}

      {/* Step 3: Map + reflect */}
      {step === 3 && (
        <div className="mt-8 space-y-8">
          <MapDiagram map={map} />
          <MapMobileSummary map={map} />

          {gaps.length > 0 && (
            <div className="border-l-2 border-marker bg-paper-sink px-4 py-3">
              <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                {STARTER_FORM.gapsHeading}
              </p>
              <ul className="mt-3 space-y-2">
                {gaps.map((gap) => (
                  <li key={gap} className="font-serif text-base text-ink-muted">
                    · {gap}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label
              htmlFor="starter-reflection"
              className="font-mono text-xs uppercase tracking-widest text-ink-muted"
            >
              {STARTER_FORM.reflectionLabel}
            </label>
            <textarea
              id="starter-reflection"
              rows={5}
              value={map.reflection}
              onChange={(e) =>
                persist({ ...map, reflection: e.target.value })
              }
              placeholder={STARTER_FORM.reflectionExamples
                .map((q) => `"${q}"`)
                .join("\n")}
              className={`${inputClass} mt-2 resize-y`}
            />
          </div>

          <div className="border-t border-line pt-10">
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={goBack}
                className="min-h-[44px] font-mono text-sm text-ink-muted underline decoration-line underline-offset-4 hover:text-ink"
              >
                {STARTER_FORM.back}
              </button>
              <button
                type="button"
                disabled={downloading}
                onClick={handleDownload}
                className="inline-flex min-h-[44px] items-center rounded-[2px] bg-ink px-7 py-3.5 font-mono text-sm tracking-wide text-paper transition-colors hover:bg-chartreuse-deep disabled:opacity-60"
              >
                {downloading
                  ? "Building PDF…"
                  : `${STARTER_FORM.downloadButton} →`}
              </button>
            </div>
            <PrivacyNote variant="inline" className="mt-6" />
          </div>

          <ReviewGatewayForm
            map={map}
            persist={persist}
            onSubmit={handleSubmit}
            status={status}
            error={error}
          />
        </div>
      )}

      {step < partCount - 1 && (
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={goBack}
            className="min-h-[44px] font-mono text-sm text-ink-muted underline decoration-line underline-offset-4 hover:text-ink"
          >
            {STARTER_FORM.back}
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canAdvance()}
            className="inline-flex min-h-[44px] items-center rounded-[2px] bg-ink px-7 py-3.5 font-mono text-sm tracking-wide text-paper transition-colors hover:bg-chartreuse-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            {`${STARTER_FORM.next} →`}
          </button>
        </div>
      )}
      {!canAdvance() && (step === 0 || step === 1) && (
        <p className="mt-3 font-mono text-xs text-ink-muted">
          Add at least one {step === 0 ? "offer with a name" : "person"} to
          continue.
        </p>
      )}
    </div>
  );
}
