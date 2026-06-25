import { ImageResponse } from "next/og";
import { HERO, SITE } from "@/lib/content";

export const alt = `${SITE.name} — ${HERO.highlight}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#f3efe4";
const PAPER_SINK = "#ece7d8";
const INK = "#1c1e17";
const INK_MUTED = "#5a5c50";
const LINE = "#d9d3c4";
const MARKER = "#b9c766";
const CHARTREUSE_DEEP = "#6f7d33";

async function loadGoogleFont(family: string, weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`,
    {
      headers: {
        // Google serves woff2 to modern clients.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    },
  ).then((res) => res.text());

  const resource = css.match(
    /src: url\((.+)\) format\('(?:opentype|truetype|woff2)'\)/,
  )?.[1];

  if (!resource) {
    throw new Error(`Failed to load font data for ${family}`);
  }

  return fetch(resource).then((res) => res.arrayBuffer());
}

export default async function Image() {
  const [fraunces, spaceMono] = await Promise.all([
    loadGoogleFont("Fraunces", 600),
    loadGoogleFont("Space+Mono", 400),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: PAPER,
          fontFamily: "Fraunces",
        }}
      >
        {/* Left editorial band — mirrors alternating section rhythm */}
        <div
          style={{
            width: 12,
            height: "100%",
            background: PAPER_SINK,
            borderRight: `1px solid ${LINE}`,
          }}
        />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px 52px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Kicker */}
            <p
              style={{
                margin: 0,
                fontFamily: "Space Mono",
                fontSize: 13,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: INK_MUTED,
              }}
            >
              {HERO.kicker}
            </p>

            {/* Hero headline */}
            <p
              style={{
                margin: "28px 0 0",
                fontSize: 62,
                fontWeight: 600,
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                color: INK,
                maxWidth: 900,
              }}
            >
              {HERO.lead}
            </p>

            {/* Highlighted tagline — marker swipe + brand phrase */}
            <div
              style={{
                marginTop: 8,
                position: "relative",
                display: "flex",
                maxWidth: 920,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -8,
                  right: -8,
                  bottom: 6,
                  height: 52,
                  background: MARKER,
                  opacity: 0.85,
                  borderRadius: 2,
                }}
              />
              <p
                style={{
                  margin: 0,
                  fontSize: 62,
                  fontWeight: 600,
                  lineHeight: 1.02,
                  letterSpacing: "-0.02em",
                  color: INK,
                  position: "relative",
                }}
              >
                {HERO.highlight}
              </p>
            </div>
          </div>

          {/* Footer rule + wordmark */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ height: 1, background: LINE, width: "100%" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "Space Mono",
                  fontSize: 14,
                  color: INK_MUTED,
                }}
              >
                {SITE.url.replace("https://", "")}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 36,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: INK,
                }}
              >
                {SITE.name}
                <span style={{ color: CHARTREUSE_DEEP }}>.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
        { name: "Space Mono", data: spaceMono, weight: 400, style: "normal" },
      ],
    },
  );
}
