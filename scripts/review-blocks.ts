/** MDX 후기·인용 블록 공통 유틸 */

import type { Locale } from "../src/lib/site-config";

export interface ReviewQuoteItem {
  text: { ko: string; en: string };
  source: { ko: string; en: string };
}

export function esc(str: string): string {
  return str.replace(/"/g, '\\"').replace(/\n/g, " ");
}

/** 실제 후기 3줄 요약 MDX 블록 */
export function reviewQuotesBlock(quotes: ReviewQuoteItem[], locale: Locale): string {
  if (quotes.length === 0) return "";
  const title = locale === "ko" ? "실제 후기 요약" : "Review highlights";
  const rows = quotes
    .map(
      (q) =>
        `<ReviewQuoteRow text="${esc(q.text[locale])}" source="${esc(q.source[locale])}" />`,
    )
    .join("\n");
  return `<ReviewQuotes title="${title}">
${rows}
</ReviewQuotes>`;
}
