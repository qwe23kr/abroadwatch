import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/site-config";
import type { TravelerProfile } from "@/lib/traveler-profiles";

import { InlineMarkdown } from "./InlineMarkdown";

interface ReviewNoteProps {
  source: string;
  url?: string;
  label?: string;
  locale?: Locale;
  uiLanguage?: TravelerProfile["language"];
  children: React.ReactNode;
}

export function ReviewNote({
  source,
  url,
  label,
  locale = "ko",
  uiLanguage,
  children,
}: ReviewNoteProps) {
  const displayLabel =
    label ??
    (locale === "ko" ? "확인 기준 및 참고 자료" : `Reference: ${t(locale, "reviewVerified")}`);
  const sourceLabel = uiLanguage
    ? ({
        ko: "참고",
        "zh-Hans": "Source",
        ja: "Source",
        "zh-Hant": "Source",
        th: "Source",
        vi: "Source",
        en: "Source",
      } as const)[uiLanguage]
    : locale === "ko"
      ? "참고"
      : t(locale, "reviewSource");

  return (
    <aside className="relative my-6 overflow-hidden rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5 shadow-sm">
      <p className="relative mb-3 text-xs font-semibold uppercase tracking-wide text-amber-900">
        {displayLabel}
      </p>
      <div className="relative border-l-2 border-amber-400 pl-4 text-sm leading-relaxed text-gray-800">
        {typeof children === "string" ? (
          <InlineMarkdown text={children} />
        ) : (
          children
        )}
      </div>
      <footer className="relative mt-4 flex flex-wrap items-center gap-2 border-t border-amber-200/60 pt-3 text-xs text-gray-600">
        <span className="rounded-full bg-white/80 px-2 py-0.5 font-medium text-amber-800">
          {sourceLabel}
        </span>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:underline"
          >
            {source} →
          </a>
        ) : (
          <span>{source}</span>
        )}
      </footer>
    </aside>
  );
}
