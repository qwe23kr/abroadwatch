import Link from "next/link";
import { getGuidePath, type GuideContent } from "@/lib/content";
import { buildGuideHeadline } from "@/lib/seo-titles";
import { incidentDescriptions } from "@/lib/incident-ui";
import { stripMarkdown } from "@/lib/text";
import { incidentLabels } from "@/lib/site-config";
import { getCity, getCountry } from "@/lib/site-config";

interface GuideCardProps {
  guide: GuideContent;
}

/** 가이드 목록 카드 */
export function GuideCard({ guide }: GuideCardProps) {
  const country = getCountry(guide.country);
  const city = getCity(guide.country, guide.city);
  const incidentLabel = incidentLabels[guide.incident][guide.locale];
  const displayTitle = buildGuideHeadline(
    guide.locale,
    guide.city,
    guide.country,
    guide.incident,
  );
  const location = `${city?.name[guide.locale] ?? guide.city}, ${country?.name[guide.locale] ?? guide.country}`;

  return (
    <Link
      href={getGuidePath(guide.locale, guide.country, guide.city, guide.incident)}
      className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
    >
      <span className="mb-2 inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
        {incidentLabel}
      </span>
      <h3 className="mb-2 font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
        {displayTitle}
      </h3>
      <p className="mb-2 text-xs leading-relaxed text-gray-500 line-clamp-2">
        {incidentDescriptions[guide.incident][guide.locale]}
      </p>
      <p className="mb-3 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
        {stripMarkdown(guide.frontmatter.summary)}
      </p>
      <span className="text-xs font-medium text-gray-500">{location}</span>
    </Link>
  );
}
