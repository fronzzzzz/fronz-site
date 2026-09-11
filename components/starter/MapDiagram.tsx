"use client";

import {
  channelLabel,
  offerDescriptionSummary,
  personChannelLabels,
  type StarterMapData,
  type StarterOffer,
  type StarterPerson,
} from "@/lib/starter-map";

type NodeItem = {
  id: string;
  title: string;
  subtitle?: string;
  tag?: string;
  lineCount: number;
};

type PlacedNode = NodeItem & { x: number; y: number; height: number };

const NODE_WIDTH = 176;
const LINE_H = 14;
const PAD = 10;

function nodeHeight(item: NodeItem): number {
  return PAD * 2 + item.lineCount * LINE_H;
}

function layoutColumn(
  items: NodeItem[],
  x: number,
  canvasHeight: number,
): PlacedNode[] {
  if (items.length === 0) return [];
  const heights = items.map((item) => nodeHeight(item));
  const total = heights.reduce((a, b) => a + b, 0);
  const gap =
    items.length > 1
      ? Math.max(16, (canvasHeight - total - 48) / (items.length - 1))
      : 0;
  let y = 48;
  return items.map((item, i) => {
    const height = heights[i];
    const centerY = y + height / 2;
    const placed = { ...item, x, y: centerY, height };
    y += height + gap;
    return placed;
  });
}

function linePath(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

function collectChannels(map: StarterMapData) {
  const items: { id: string; label: string }[] = [];
  const seen = new Set<string>();

  for (const person of map.people) {
    for (const cid of person.channelIds) {
      if (seen.has(cid)) continue;
      seen.add(cid);
      items.push({ id: cid, label: channelLabel(cid) });
    }
    for (const custom of person.customChannels) {
      const trimmed = custom.trim();
      if (!trimmed) continue;
      const id = `custom:${trimmed}`;
      if (seen.has(id)) continue;
      seen.add(id);
      items.push({ id, label: trimmed });
    }
  }

  return items;
}

function personChannelNodeIds(person: StarterPerson): string[] {
  const ids = [...person.channelIds];
  for (const custom of person.customChannels) {
    const trimmed = custom.trim();
    if (trimmed) ids.push(`custom:${trimmed}`);
  }
  return ids;
}

function offerNodeItem(offer: StarterOffer): NodeItem {
  const desc = offerDescriptionSummary(offer);
  const subtitle = desc.length > 72 ? `${desc.slice(0, 70)}…` : desc;
  return {
    id: offer.id,
    title: offer.name.trim(),
    subtitle: subtitle || undefined,
    lineCount: subtitle ? 2 : 1,
  };
}

function personNodeItem(person: StarterPerson): NodeItem {
  const job = person.job.trim();
  const subtitle = job.length > 72 ? `${job.slice(0, 70)}…` : job;
  return {
    id: person.id,
    title: person.label.trim(),
    subtitle: subtitle || undefined,
    tag: person.urgency || undefined,
    lineCount: subtitle ? (person.urgency ? 3 : 2) : person.urgency ? 2 : 1,
  };
}

function truncate(title: string, max = 24): string {
  return title.length > max ? `${title.slice(0, max - 1)}…` : title;
}

export function MapDiagram({ map }: { map: StarterMapData }) {
  const offers = map.offers.filter((o) => o.name.trim());
  const people = map.people.filter((p) => p.label.trim());
  const channels = collectChannels(map);

  const width = 760;
  const canvasHeight = Math.max(
    320,
    Math.max(offers.length, people.length, channels.length) * 88 + 96,
  );

  const offerNodes = layoutColumn(
    offers.map(offerNodeItem),
    120,
    canvasHeight,
  );
  const personNodes = layoutColumn(
    people.map(personNodeItem),
    width / 2,
    canvasHeight,
  );
  const channelNodes = layoutColumn(
    channels.map((c) => ({
      id: c.id,
      title: c.label,
      lineCount: 1 as const,
    })),
    width - 120,
    canvasHeight,
  );

  const offerById = new Map(offerNodes.map((n) => [n.id, n]));
  const personById = new Map(personNodes.map((n) => [n.id, n]));
  const channelById = new Map(channelNodes.map((n) => [n.id, n]));

  const offerPersonLines: { x1: number; y1: number; x2: number; y2: number }[] =
    [];
  const personChannelLines: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    dashed?: boolean;
  }[] = [];

  for (const person of people) {
    const pn = personById.get(person.id);
    if (!pn) continue;

    for (const oid of person.offerIds) {
      const on = offerById.get(oid);
      if (on) {
        offerPersonLines.push({ x1: on.x, y1: on.y, x2: pn.x, y2: pn.y });
      }
    }

    for (const cid of personChannelNodeIds(person)) {
      const cn = channelById.get(cid);
      if (cn) {
        personChannelLines.push({
          x1: pn.x,
          y1: pn.y,
          x2: cn.x,
          y2: cn.y,
          dashed: cid === "nothing",
        });
      }
    }
  }

  if (offers.length === 0 && people.length === 0) {
    return (
      <p className="font-mono text-sm text-ink-muted">
        Add offers and people to see your map.
      </p>
    );
  }

  return (
    <div className="hidden overflow-x-auto md:block">
      <svg
        viewBox={`0 0 ${width} ${canvasHeight}`}
        className="w-full min-w-[560px] text-ink"
        role="img"
        aria-label="Map connecting offers, people, and channels"
      >
        <text
          x={120}
          y={24}
          textAnchor="middle"
          className="fill-ink-muted text-[11px] font-mono uppercase tracking-widest"
        >
          Offers
        </text>
        <text
          x={width / 2}
          y={24}
          textAnchor="middle"
          className="fill-ink-muted text-[11px] font-mono uppercase tracking-widest"
        >
          People
        </text>
        <text
          x={width - 120}
          y={24}
          textAnchor="middle"
          className="fill-ink-muted text-[11px] font-mono uppercase tracking-widest"
        >
          Channels
        </text>

        {offerPersonLines.map((l, i) => (
          <path
            key={`op-${i}`}
            d={linePath(l.x1, l.y1, l.x2, l.y2)}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="text-chartreuse-deep/70"
          />
        ))}
        {personChannelLines.map((l, i) => (
          <path
            key={`pc-${i}`}
            d={linePath(l.x1, l.y1, l.x2, l.y2)}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeDasharray={l.dashed ? "4 4" : undefined}
            className={l.dashed ? "text-ink-muted/50" : "text-ink/40"}
          />
        ))}

        {[...offerNodes, ...personNodes, ...channelNodes].map((node) => (
          <g key={node.id}>
            <rect
              x={node.x - NODE_WIDTH / 2}
              y={node.y - node.height / 2}
              width={NODE_WIDTH}
              height={node.height}
              rx={2}
              className="fill-paper stroke-line"
              strokeWidth={1}
            />
            <text
              x={node.x}
              y={node.y - node.height / 2 + PAD + 10}
              textAnchor="middle"
              className="fill-ink text-[12px] font-serif"
            >
              {truncate(node.title)}
            </text>
            {node.subtitle && (
              <text
                x={node.x}
                y={node.y - node.height / 2 + PAD + 24}
                textAnchor="middle"
                className="fill-ink-muted text-[10px] font-mono"
              >
                {truncate(node.subtitle, 36)}
              </text>
            )}
            {node.tag && (
              <text
                x={node.x}
                y={node.y + node.height / 2 - PAD}
                textAnchor="middle"
                className="fill-chartreuse-deep text-[9px] font-mono uppercase tracking-widest"
              >
                {node.tag} urgency
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

function UrgencyBadge({ urgency }: { urgency: string }) {
  if (!urgency) return null;
  return (
    <span className="rounded-[2px] border border-line bg-paper px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-chartreuse-deep">
      {urgency} urgency
    </span>
  );
}

/** Connection summary with full context */
export function MapMobileSummary({ map }: { map: StarterMapData }) {
  const people = map.people.filter((p) => p.label.trim());
  if (people.length === 0) return null;

  return (
    <div className="space-y-4">
      {people.map((person) => {
        const linkedOffers = person.offerIds
          .map((id) => map.offers.find((o) => o.id === id))
          .filter((o): o is StarterOffer => Boolean(o?.name.trim()));
        const channelLabels = personChannelLabels(person);

        return (
          <div
            key={person.id}
            className="border border-line bg-paper-sink px-4 py-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-serif text-lg">{person.label.trim()}</p>
              <UrgencyBadge urgency={person.urgency} />
            </div>
            {person.job.trim() && (
              <p className="mt-2 text-sm text-ink-muted">{person.job.trim()}</p>
            )}
            <div className="mt-4">
              <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                Offers
              </p>
              {linkedOffers.length ? (
                <ul className="mt-2 space-y-2">
                  {linkedOffers.map((offer) => {
                    const desc = offerDescriptionSummary(offer);
                    return (
                      <li key={offer.id} className="text-sm">
                        <span className="font-medium text-ink">
                          {offer.name.trim()}
                        </span>
                        {desc && (
                          <p className="mt-0.5 font-mono text-xs text-ink-muted">
                            {desc}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="mt-1 font-mono text-xs text-ink-muted">
                  None linked
                </p>
              )}
            </div>
            <p className="mt-4 font-mono text-xs text-ink-muted">
              Channels:{" "}
              {channelLabels.length ? channelLabels.join(", ") : "None selected"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
