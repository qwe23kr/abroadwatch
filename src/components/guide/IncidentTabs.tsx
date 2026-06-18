import Link from "next/link";
import { getGuidePath } from "@/lib/content";
import { incidentDescriptions, incidentIcons } from "@/lib/incident-ui";
import { incidentLabels, incidentTypes, type IncidentType, type Locale } from "@/lib/site-config";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface IncidentTabsProps {
  locale: Locale;
  country: string;
  city: string;
  current: IncidentType;
}

/** 같은 도시 6가지 상황 탭 — 모바일은 세로 목록 */
export function IncidentTabs({ locale, country, city, current }: IncidentTabsProps) {
  return (
    <nav className="mb-8" aria-label={t(locale, "incidentTabsLabel")}>
      <p className="mb-3 text-sm font-semibold text-gray-700">
        {t(locale, "incidentTabsLabel")}
      </p>

      {/* 모바일: 세로 목록 (텍스트 항상 표시) */}
      <ul className="grid gap-2 sm:hidden">
        {incidentTypes.map((incident) => {
          const active = incident === current;
          return (
            <li key={incident}>
              <Link
                href={getGuidePath(locale, country, city, incident)}
                className={cn(
                  "flex gap-3 rounded-xl border px-3 py-3 transition",
                  active
                    ? "border-blue-600 bg-blue-50 text-blue-800"
                    : "border-gray-200 bg-white text-gray-800 hover:border-blue-200",
                )}
                aria-current={active ? "page" : undefined}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-lg"
                  aria-hidden="true"
                >
                  {incidentIcons[incident]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">
                    {incidentLabels[incident][locale]}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-gray-500 line-clamp-2">
                    {incidentDescriptions[incident][locale]}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* 태블릿 이상: 가로 탭 */}
      <ul className="hidden min-w-max gap-2 sm:flex sm:flex-wrap">
        {incidentTypes.map((incident) => {
          const active = incident === current;
          return (
            <li key={incident}>
              <Link
                href={getGuidePath(locale, country, city, incident)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition",
                  active
                    ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                    : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:text-blue-700",
                )}
                aria-current={active ? "page" : undefined}
              >
                <span aria-hidden="true">{incidentIcons[incident]}</span>
                {incidentLabels[incident][locale]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
