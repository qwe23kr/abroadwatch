import Link from "next/link";
import { getGuidePath } from "@/lib/content";
import { incidentLabels, incidentTypes, type IncidentType, type Locale } from "@/lib/site-config";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface IncidentTabsProps {
  locale: Locale;
  country: string;
  city: string;
  current: IncidentType;
}

const incidentIcons: Record<IncidentType, string> = {
  "lost-passport": "📋",
  "lost-phone": "📱",
  "lost-wallet": "👛",
  hospital: "🏥",
  "police-report": "🚔",
  scam: "⚠️",
};

/** 같은 도시 6가지 상황 탭 */
export function IncidentTabs({ locale, country, city, current }: IncidentTabsProps) {
  return (
    <nav
      className="mb-8 -mx-1 overflow-x-auto pb-1"
      aria-label={t(locale, "incidentTabsLabel")}
    >
      <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {t(locale, "incidentTabsLabel")}
      </p>
      <ul className="flex min-w-max gap-2 px-1">
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
