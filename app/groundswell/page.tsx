import type { Metadata } from "next";
import { LineDetail } from "@/components/line/LineDetail";
import { getLine } from "@/lib/lines";
import { lineSchema } from "@/lib/schema";

const line = getLine("groundswell")!;

export const metadata: Metadata = {
  title: `${line.name} — ${line.promise}`,
  description: line.heroSub,
  alternates: { canonical: "/groundswell" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lineSchema(line)) }}
      />
      <LineDetail line={line} />
    </>
  );
}
