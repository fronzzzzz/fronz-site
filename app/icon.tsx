import { ImageResponse } from "next/og";
import { SITE } from "@/lib/content";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const PAPER = "#f3efe4";
const INK = "#1c1e17";
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

export default async function Icon() {
  const fraunces = await loadGoogleFont("Fraunces", 600);

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
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "-0.03em",
          color: INK,
        }}
      >
        {SITE.name}
        <span style={{ color: CHARTREUSE_DEEP }}>.</span>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
      ],
    },
  );
}
