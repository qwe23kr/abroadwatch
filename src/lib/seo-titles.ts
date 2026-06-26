import { stripMarkdown } from "./text";
import {
  getCity,
  getCountry,
  incidentLabels,
  incidentTypes,
  type IncidentType,
  type Locale,
} from "./site-config";

const META_DESC_MAX = 155;

/** 메타 description 길이 제한 */
export function truncateMetaDescription(text: string, max = META_DESC_MAX): string {
  const clean = stripMarkdown(text).trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

/** 가이드 페이지 `<title>` — 탭·SERP용 (키워드 앞, 35자 내외) */
export function buildGuideTabTitle(
  locale: Locale,
  country: string,
  city: string,
  incident: IncidentType,
): string {
  const cityName = getCity(country, city)?.name[locale] ?? city;

  if (locale === "ko") {
    const ko: Record<IncidentType, string> = {
      "lost-passport": `${cityName} 여권 분실 — 절차·연락처`,
      "lost-phone": `${cityName} 휴대폰 분실 — 신고·보험`,
      "lost-wallet": `${cityName} 지갑 분실 — 카드정지·신고`,
      hospital: `${cityName} 병원·응급실 — 비용·통역`,
      "police-report": `${cityName} 경찰 신고 — 외국인 절차`,
      scam: `${cityName} 여행 사기 — 유형·예방`,
    };
    return ko[incident];
  }

  const en: Record<IncidentType, string> = {
    "lost-passport": `Lost Passport in ${cityName} — Steps`,
    "lost-phone": `Lost Phone in ${cityName} — Report & Insurance`,
    "lost-wallet": `Lost Wallet in ${cityName} — Block & Report`,
    hospital: `Hospital & ER in ${cityName} — Costs`,
    "police-report": `Police Report in ${cityName} — Guide`,
    scam: `Travel Scams in ${cityName} — Avoid & Report`,
  };
  return en[incident];
}

/** OG·공유용 — 국가명 포함 (동명 도시 구분) */
export function buildGuideShareTitle(
  locale: Locale,
  country: string,
  city: string,
  incident: IncidentType,
): string {
  const cityName = getCity(country, city)?.name[locale] ?? city;
  const countryName = getCountry(country)?.name[locale] ?? country;
  const label = incidentLabels[incident][locale];

  if (locale === "ko") {
    return `${countryName} ${cityName} ${label} 가이드`;
  }
  return `${label} in ${cityName}, ${countryName}`;
}

/** 가이드 메타 description — 검색 의도 키워드 포함 */
export function buildGuideMetaDescription(
  locale: Locale,
  country: string,
  city: string,
  incident: IncidentType,
  summary?: string,
): string {
  const cityName = getCity(country, city)?.name[locale] ?? city;
  const countryName = getCountry(country)?.name[locale] ?? country;
  const cleaned = summary ? stripMarkdown(summary) : "";

  if (cleaned.length >= 40 && cleaned.length <= META_DESC_MAX) {
    return cleaned;
  }

  if (locale === "ko") {
    const fallback: Record<IncidentType, string> = {
      "lost-passport": `${countryName} ${cityName} 여권 분실 시 경찰 신고, 대사관 긴급여권, 항공 변경까지 단계별 안내와 비상 연락처.`,
      "lost-phone": `${cityName} 휴대폰 분실·도난 시 기기 잠금, SIM 정지, 경찰 신고, 여행자보험 청구 절차.`,
      "lost-wallet": `${cityName} 지갑·카드 분실 시 즉시 카드 정지, 경찰 신고서, 대사관 연락 방법.`,
      hospital: `${cityName} 응급실·병원 이용, 비상번호, 여권·보험 준비, 한국어 통역 요청 방법.`,
      "police-report": `${cityName} 도난·분실 경찰 신고, 보험용 확인서, 외국인 신고 절차와 연락처.`,
      scam: `${countryName} ${cityName} 여행 사기 유형, 예방법, 관광경찰·경찰 신고 방법. 실제 후기 기반.`,
    };
    return truncateMetaDescription(fallback[incident]);
  }

  const fallbackEn: Record<IncidentType, string> = {
    "lost-passport": `Lost passport in ${cityName}, ${countryName}: police report, embassy emergency passport, and flight changes step by step.`,
    "lost-phone": `Lost or stolen phone in ${cityName}: remote lock, SIM block, police report, and travel insurance claim.`,
    "lost-wallet": `Lost wallet in ${cityName}: block cards, police report, and embassy contacts.`,
    hospital: `ER and hospitals in ${cityName}: emergency numbers, insurance, and interpreter tips.`,
    "police-report": `Police report in ${cityName} for foreigners: theft/loss certificate and insurance paperwork.`,
    scam: `Travel scams in ${cityName}, ${countryName}: common types, prevention, and how to report.`,
  };
  return truncateMetaDescription(fallbackEn[incident]);
}

/** 페이지 H1용 — 본문 제목 (탭보다 약간 길게) */
export function buildGuideHeadline(
  locale: Locale,
  city: string,
  country: string,
  incident: IncidentType,
): string {
  const cityName = getCity(country, city)?.name[locale] ?? city;
  const label = incidentLabels[incident][locale];

  if (locale === "ko") {
    return `${cityName} ${label} — 실제 대처 가이드`;
  }
  return `${label} in ${cityName} — Emergency Guide`;
}

/** 국가 허브 탭 타이틀 */
export function buildCountryHubTitle(locale: Locale, country: string): string {
  const name = getCountry(country)?.name[locale] ?? country;
  const cityCount = getCountry(country)?.cities.length ?? 0;

  if (locale === "ko") {
    return `${name} 여행 비상정보 — ${cityCount}개 도시`;
  }
  return `${name} Travel Emergency Guides`;
}

/** 도시 허브 탭 타이틀 */
export function buildCityHubTitle(
  locale: Locale,
  country: string,
  city: string,
): string {
  const cityName = getCity(country, city)?.name[locale] ?? city;
  const guideCount = incidentTypes.length;

  if (locale === "ko") {
    return `${cityName} 비상 가이드 — ${guideCount}가지 상황`;
  }
  return `${cityName} Emergency Guides — ${guideCount} Situations`;
}

/** 국가별 사기·병원 SEO 랜딩 탭 타이틀 */
export function buildCountryIncidentHubTitle(
  locale: Locale,
  country: string,
  incident: "scam" | "hospital",
): string {
  const name = getCountry(country)?.name[locale] ?? country;
  if (locale === "ko") {
    return incident === "scam" ? `${name} 여행 사기 가이드` : `${name} 병원·응급 가이드`;
  }
  return incident === "scam"
    ? `${name} Travel Scam Guide`
    : `${name} Hospital & ER Guide`;
}

/** 홈 탭 타이틀 */
export function buildHomeTabTitle(locale: Locale): string {
  return locale === "ko"
    ? "아시아 여행 비상·안전 가이드"
    : "Asia Travel Emergency Guides";
}
