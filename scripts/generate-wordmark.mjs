import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const brandDir = join(root, "public", "brand");
const canvasSize = 2048;
const ports = [3000, 3001];

async function findDevServer() {
  for (const port of ports) {
    try {
      const res = await fetch(`http://localhost:${port}/wordmark-export`, {
        redirect: "follow",
      });
      if (res.ok) return port;
    } catch {
      // try next port
    }
  }
  return null;
}

async function main() {
  const port = await findDevServer();
  if (!port) {
    console.error(
      "Dev server not running. Start it with `pnpm dev`, then rerun this script.",
    );
    process.exit(1);
  }

  const url = `http://localhost:${port}/wordmark-export`;
  const browser = await chromium.launch();
  const exports = [
    { scale: 1, suffix: "2048" },
    { scale: 2, suffix: "4096" },
  ];

  try {
    for (const { scale, suffix } of exports) {
      const page = await browser.newPage({
        viewport: { width: canvasSize, height: canvasSize },
        deviceScaleFactor: scale,
      });

      await page.goto(url, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);

      const canvas = page.locator("#wordmark-canvas");
      const png = await canvas.screenshot({ type: "png" });
      const outPath = join(brandDir, `fronz-wordmark-square-${suffix}.png`);
      writeFileSync(outPath, png);
      console.log(`Wrote ${outPath} (${canvasSize * scale}x${canvasSize * scale})`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
