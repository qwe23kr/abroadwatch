import Link from "next/link";
import { getGuidePath } from "@/lib/content";
import { incidentDescriptions, incidentIcons } from "@/lib/incident-ui";
import { incidentLabels, type IncidentType, type Locale } from "@/lib/site-config";

interface IncidentGuideLinkProps {
  locale: Locale;
  country: string;
  city: string;
  incident: IncidentType;
  className?: string;
}

/** 상황별 가이드 링크 — 아이콘 + 제목 + 한 줄 설명 */
export function IncidentGuideLink({
  locale,
  country,
  city,
  incident,
  className = "",
}: IncidentGuideLinkProps) {
  return (
    <Link
      href={getGuidePath(locale, country, city, incident)}
      className={`flex gap-2.5 rounded-lg border border-gray-100 bg-gray-50/80 p-2.5 transition hover:border-blue-200 hover:bg-blue-50 ${className}`}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white text-lg shadow-sm"
        aria-hidden="true"
      >
        {incidentIcons[incident]}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold leading-tight text-gray-900">
          {incidentLabels[incident][locale]}
        </span>
        <span className="mt-0.5 block text-[11px] leading-snug text-gray-500 line-clamp-3 sm:text-xs sm:leading-relaxed">
          {incidentDescriptions[incident][locale]}
        </span>
      </span>
    </Link>
  );
}
