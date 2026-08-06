import { ImageResponse } from "next/og";
import { SITE } from "@/lib/content";
import { COVER } from "@/lib/resume";

export const alt = "Resume — Stacey Fronek";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#f3efe4";
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
          alignItems: "center",
          justifyContent: "center",
          background: PAPER,
          fontFamily: "Fraunces",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: 920,
            gap: 8,
          }}
        >
          <p
            style={{
              margin: "0 0 12px",
              fontFamily: "Space Mono",
              fontSize: 13,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: INK_MUTED,
            }}
          >
            {COVER.kicker}
          </p>

          <p
            style={{
              margin: 0,
              fontSize: 56,
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: INK,
            }}
          >
            {COVER.lead}
          </p>
          <div style={{ position: "relative", display: "flex" }}>
            <div
              style={{
                position: "absolute",
                left: -8,
                right: -8,
                bottom: 6,
                height: 48,
                background: MARKER,
                opacity: 0.85,
                borderRadius: 2,
              }}
            />
            <p
              style={{
                margin: 0,
                fontSize: 56,
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: INK,
                position: "relative",
              }}
            >
              {COVER.highlight}
            </p>
          </div>

          <p
            style={{
              margin: "20px 0 0",
              fontSize: 24,
              color: INK_MUTED,
              lineHeight: 1.4,
              maxWidth: 800,
            }}
          >
            Founder · Executive producer of global conferences · Startup
            CMO/CPO — the career story, told in chapters.
          </p>

          <div
            style={{
              marginTop: 28,
              display: "flex",
              flexDirection: "column",
              gap: 20,
              width: "100%",
            }}
          >
            <div style={{ height: 1, background: LINE, width: "100%" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                width: "100%",
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
                {SITE.url.replace("https://", "")}/resume
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
