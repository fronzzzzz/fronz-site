import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import { SITE } from "@/lib/content";
import {
  detectGaps,
  offerDescriptionSummary,
  personChannelLabels,
  type StarterMapData,
} from "@/lib/starter-map";

Font.register({
  family: "Fraunces",
  src: "https://cdn.jsdelivr.net/fontsource/fonts/fraunces@latest/latin-600-normal.woff",
});

Font.register({
  family: "SpaceMono",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/fontsource/fonts/space-mono@latest/latin-400-normal.woff",
      fontWeight: 400,
    },
    {
      src: "https://cdn.jsdelivr.net/fontsource/fonts/space-mono@latest/latin-700-normal.woff",
      fontWeight: 700,
    },
  ],
});

const c = {
  paper: "#f3efe4",
  sink: "#ece7d8",
  ink: "#1c1e17",
  muted: "#5a5c50",
  line: "#d9d3c4",
  accent: "#6f7d33",
  marker: "#b9c766",
};

const s = StyleSheet.create({
  page: {
    backgroundColor: c.paper,
    color: c.ink,
    paddingTop: 40,
    paddingBottom: 48,
    paddingHorizontal: 44,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.45,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: c.line,
    paddingBottom: 16,
    marginBottom: 22,
  },
  brand: {
    fontFamily: "Fraunces",
    fontSize: 22,
    marginBottom: 4,
  },
  brandDot: {
    color: c.accent,
  },
  title: {
    fontFamily: "Fraunces",
    fontSize: 16,
    marginBottom: 4,
  },
  meta: {
    fontFamily: "SpaceMono",
    fontSize: 8,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: c.muted,
  },
  section: {
    marginBottom: 18,
  },
  kicker: {
    fontFamily: "SpaceMono",
    fontSize: 8,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: c.accent,
    marginBottom: 6,
  },
  sectionTitle: {
    fontFamily: "Fraunces",
    fontSize: 14,
    marginBottom: 10,
  },
  card: {
    backgroundColor: c.sink,
    borderWidth: 1,
    borderColor: c.line,
    padding: 10,
    marginBottom: 8,
  },
  cardTitle: {
    fontFamily: "Fraunces",
    fontSize: 12,
    marginBottom: 4,
  },
  cardBody: {
    color: c.muted,
    fontSize: 9.5,
  },
  tag: {
    fontFamily: "SpaceMono",
    fontSize: 7.5,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: c.accent,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: c.line,
    paddingVertical: 6,
  },
  rowLabel: {
    width: "28%",
    fontFamily: "Fraunces",
    fontSize: 10,
    paddingRight: 8,
  },
  rowMid: {
    width: "36%",
    color: c.muted,
    fontSize: 9,
    paddingRight: 8,
  },
  rowEnd: {
    width: "36%",
    color: c.muted,
    fontSize: 9,
  },
  tableHead: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: c.ink,
    paddingBottom: 4,
    marginBottom: 2,
  },
  tableHeadCell: {
    fontFamily: "SpaceMono",
    fontSize: 7,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: c.muted,
  },
  gapBox: {
    borderLeftWidth: 3,
    borderLeftColor: c.marker,
    backgroundColor: c.sink,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  gapItem: {
    color: c.muted,
    fontSize: 9.5,
    marginBottom: 3,
  },
  reflection: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: c.line,
    padding: 10,
    fontSize: 10,
    color: c.ink,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 44,
    right: 44,
    borderTopWidth: 1,
    borderTopColor: c.line,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontFamily: "SpaceMono",
    fontSize: 7.5,
    color: c.muted,
    letterSpacing: 0.6,
  },
});

function offerNamesForPerson(map: StarterMapData, personId: string): string {
  const person = map.people.find((p) => p.id === personId);
  if (!person) return "—";
  const names = person.offerIds
    .map((id) => map.offers.find((o) => o.id === id)?.name.trim())
    .filter(Boolean);
  return names.length ? names.join(", ") : "None linked";
}

export function StarterMapPdfDocument({ map }: { map: StarterMapData }) {
  const offers = map.offers.filter((o) => o.name.trim());
  const people = map.people.filter((p) => p.label.trim());
  const gaps = detectGaps(map);
  const date = new Date().toISOString().slice(0, 10);

  return (
    <Document
      title="GTM Clarity Map"
      author="Fronz"
      subject="GTM Clarity Map"
    >
      <Page size="LETTER" style={s.page}>
        <View style={s.header}>
          <Text style={s.brand}>
            Fronz<Text style={s.brandDot}>.</Text>
          </Text>
          <Text style={s.title}>GTM Clarity Map</Text>
          <Text style={s.meta}>Generated {date}</Text>
        </View>

        <View style={s.section}>
          <Text style={s.kicker}>01 · Your offers</Text>
          <Text style={s.sectionTitle}>What you sell</Text>
          {offers.length === 0 ? (
            <Text style={s.cardBody}>No offers listed.</Text>
          ) : (
            offers.map((offer) => {
              const desc = offerDescriptionSummary(offer);
              return (
                <View key={offer.id} style={s.card}>
                  <Text style={s.cardTitle}>{offer.name.trim()}</Text>
                  {desc ? <Text style={s.cardBody}>{desc}</Text> : null}
                </View>
              );
            })
          )}
        </View>

        <View style={s.section}>
          <Text style={s.kicker}>02 · Your people</Text>
          <Text style={s.sectionTitle}>Who you reach</Text>
          {people.length === 0 ? (
            <Text style={s.cardBody}>No people listed.</Text>
          ) : (
            people.map((person) => (
              <View key={person.id} style={s.card}>
                <Text style={s.cardTitle}>{person.label.trim()}</Text>
                {person.job.trim() ? (
                  <Text style={s.cardBody}>{person.job.trim()}</Text>
                ) : null}
                {person.urgency ? (
                  <Text style={s.tag}>{person.urgency} urgency</Text>
                ) : null}
                <Text style={[s.cardBody, { marginTop: 4 }]}>
                  Offers: {offerNamesForPerson(map, person.id)}
                </Text>
              </View>
            ))
          )}
        </View>

        <View style={s.section}>
          <Text style={s.kicker}>03 · Your channels</Text>
          <Text style={s.sectionTitle}>How you reach them</Text>
          {people.length === 0 ? (
            <Text style={s.cardBody}>No channels listed.</Text>
          ) : (
            people.map((person) => {
              const channels = personChannelLabels(person);
              return (
                <View key={person.id} style={s.card}>
                  <Text style={s.cardTitle}>{person.label.trim()}</Text>
                  <Text style={s.cardBody}>
                    {channels.length ? channels.join(", ") : "None selected"}
                  </Text>
                </View>
              );
            })
          )}
        </View>

        <View style={s.section}>
          <Text style={s.kicker}>04 · Connect the dots</Text>
          <Text style={s.sectionTitle}>Your map</Text>

          <View style={s.tableHead}>
            <Text style={[s.tableHeadCell, { width: "28%" }]}>Person</Text>
            <Text style={[s.tableHeadCell, { width: "36%" }]}>Offers</Text>
            <Text style={[s.tableHeadCell, { width: "36%" }]}>Channels</Text>
          </View>

          {people.map((person) => (
            <View key={person.id} style={s.row}>
              <Text style={s.rowLabel}>{person.label.trim()}</Text>
              <Text style={s.rowMid}>{offerNamesForPerson(map, person.id)}</Text>
              <Text style={s.rowEnd}>
                {personChannelLabels(person).join(", ") || "—"}
              </Text>
            </View>
          ))}

          {gaps.length > 0 && (
            <View style={s.gapBox}>
              <Text style={[s.kicker, { marginBottom: 4 }]}>Gaps flagged</Text>
              {gaps.map((gap) => (
                <Text key={gap} style={s.gapItem}>
                  · {gap}
                </Text>
              ))}
            </View>
          )}

          {map.reflection.trim() ? (
            <View style={{ marginTop: 8 }}>
              <Text style={[s.kicker, { marginBottom: 6 }]}>
                What jumped out
              </Text>
              <Text style={s.reflection}>{map.reflection.trim()}</Text>
            </View>
          ) : null}
        </View>

        <View style={s.footer} fixed>
          <Text style={s.footerText}>fronzz.com · GTM Clarity Map</Text>
          <Text style={s.footerText}>{SITE.tagline}</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function downloadStarterMapPdf(map: StarterMapData): Promise<void> {
  const blob = await pdf(<StarterMapPdfDocument map={map} />).toBlob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `gtm-clarity-map-${new Date().toISOString().slice(0, 10)}.pdf`;
  anchor.click();
  URL.revokeObjectURL(url);
}
