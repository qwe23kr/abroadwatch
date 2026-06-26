import { getGuide } from "./content";
import type { IncidentType, Locale } from "./site-config";

const countryFallback: Record<string, { number: string; label: { ko: string; en: string } }> = {
  japan: { number: "110", label: { ko: "일본 경찰 110", en: "Japan Police 110" } },
  thailand: { number: "1155", label: { ko: "태국 관광경찰 1155", en: "Tourist Police 1155" } },
  vietnam: { number: "113", label: { ko: "베트남 경찰 113", en: "Vietnam Police 113" } },
  taiwan: { number: "110", label: { ko: "대만 경찰 110", en: "Taiwan Police 110" } },
  philippines: { number: "911", label: { ko: "필리핀 긴급 911", en: "Philippines Emergency 911" } },
};

/** 도시·국가 기준 긴급번호 (가이드 frontmatter 우선) */
export function getCityEmergency(
  locale: Locale,
  country: string,
  city: string,
): { number: string; label: string } {
  for (const incident of ["lost-passport", "scam", "hospital", "police-report"] as IncidentType[]) {
    const guide = getGuide(locale, country, city, incident);
    if (guide?.frontmatter.emergencyNumber) {
      const fallback = countryFallback[country];
      return {
        number: guide.frontmatter.emergencyNumber,
        label: fallback?.label[locale] ?? guide.frontmatter.emergencyNumber,
      };
    }
  }
  const fallback = countryFallback[country];
  return {
    number: fallback?.number ?? "112",
    label: fallback?.label[locale] ?? "Emergency",
  };
}
