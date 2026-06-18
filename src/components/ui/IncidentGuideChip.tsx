import Link from "next/link";
import { incidentIcons } from "@/lib/incident-ui";
import { incidentLabels, type IncidentType, type Locale } from "@/lib/site-config";

interface IncidentGuideChipProps {
  locale: Locale;
  country: string;
  city: string;
  incident: IncidentType;
}

/** 국가 탐색용 컴팩트 칩 — 아이콘 + 제목만 */
export function IncidentGuideChip({
  locale,
  country,
  city,
  incident,
}: IncidentGuideChipProps) {
  return (
    <Link
      href={`/${locale}/${country}/${city}/${incident}`}
      className="flex items-center gap-1.5 rounded-md border border-gray-100 bg-gray-50 px-2 py-1.5 text-xs font-medium text-gray-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
      title={incidentLabels[incident][locale]}
    >
      <span className="text-sm leading-none" aria-hidden="true">
        {incidentIcons[incident]}
      </span>
      <span className="truncate">{incidentLabels[incident][locale]}</span>
    </Link>
  );
}
