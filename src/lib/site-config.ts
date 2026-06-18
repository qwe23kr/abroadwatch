/** 사이트 전역 설정 — 국가, 도시, 사건 유형, 로케일 정의 */

export const siteConfig = {
  name: "AbroadWatch",
  domain: "abroadwatch.com",
  url: "https://abroadwatch.com",
  adsenseClientId: "ca-pub-5495602989008149",
  /** Google Analytics 4 측정 ID */
  gaMeasurementId: "G-123Z5X8X27",
  /** Google Search Console 소유 확인 */
  googleSiteVerification: "kxcfVDsuqZgaprqcwiVTe3Stc9JEqfjfq-9ORpkP0NU",
  /** emrldco 트래킹 스크립트 */
  emrldScriptUrl: "https://emrldco.com/NTQxMDA0.js?t=541004",
  defaultLocale: "ko" as const,
  locales: ["ko", "en"] as const,
  twitterHandle: "@abroadwatch",
};

export type Locale = (typeof siteConfig.locales)[number];

export const incidentTypes = [
  "lost-passport",
  "lost-phone",
  "lost-wallet",
  "hospital",
  "police-report",
] as const;

export type IncidentType = (typeof incidentTypes)[number];

export interface CityConfig {
  slug: string;
  name: Record<Locale, string>;
}

export interface CountryConfig {
  slug: string;
  name: Record<Locale, string>;
  cities: CityConfig[];
}

export const countries: CountryConfig[] = [
  {
    slug: "japan",
    name: { ko: "일본", en: "Japan" },
    cities: [
      { slug: "tokyo", name: { ko: "도쿄", en: "Tokyo" } },
      { slug: "osaka", name: { ko: "오사카", en: "Osaka" } },
      { slug: "fukuoka", name: { ko: "후쿠오카", en: "Fukuoka" } },
      { slug: "kyoto", name: { ko: "교토", en: "Kyoto" } },
      { slug: "sapporo", name: { ko: "삿포로", en: "Sapporo" } },
    ],
  },
  {
    slug: "thailand",
    name: { ko: "태국", en: "Thailand" },
    cities: [
      { slug: "bangkok", name: { ko: "방콕", en: "Bangkok" } },
      { slug: "phuket", name: { ko: "푸켓", en: "Phuket" } },
      { slug: "chiang-mai", name: { ko: "치앙마이", en: "Chiang Mai" } },
      { slug: "pattaya", name: { ko: "파타야", en: "Pattaya" } },
    ],
  },
  {
    slug: "vietnam",
    name: { ko: "베트남", en: "Vietnam" },
    cities: [
      { slug: "danang", name: { ko: "다낭", en: "Da Nang" } },
      { slug: "hanoi", name: { ko: "하노이", en: "Hanoi" } },
      { slug: "ho-chi-minh-city", name: { ko: "호치민", en: "Ho Chi Minh City" } },
      { slug: "nha-trang", name: { ko: "나트랑", en: "Nha Trang" } },
    ],
  },
  {
    slug: "taiwan",
    name: { ko: "대만", en: "Taiwan" },
    cities: [
      { slug: "taipei", name: { ko: "타이베이", en: "Taipei" } },
      { slug: "taichung", name: { ko: "타이중", en: "Taichung" } },
      { slug: "kaohsiung", name: { ko: "가오슝", en: "Kaohsiung" } },
    ],
  },
  {
    slug: "philippines",
    name: { ko: "필리핀", en: "Philippines" },
    cities: [
      { slug: "manila", name: { ko: "마닐라", en: "Manila" } },
      { slug: "cebu", name: { ko: "세부", en: "Cebu" } },
      { slug: "boracay", name: { ko: "보라카이", en: "Boracay" } },
    ],
  },
];

/** 사건 유형별 다국어 라벨 */
export const incidentLabels: Record<IncidentType, Record<Locale, string>> = {
  "lost-passport": { ko: "여권 분실", en: "Lost Passport" },
  "lost-phone": { ko: "휴대폰 분실", en: "Lost Phone" },
  "lost-wallet": { ko: "지갑 분실", en: "Lost Wallet" },
  hospital: { ko: "병원 이용", en: "Hospital Visit" },
  "police-report": { ko: "경찰 신고", en: "Police Report" },
};

/** 국가 슬러그로 국가 설정 조회 */
export function getCountry(slug: string): CountryConfig | undefined {
  return countries.find((c) => c.slug === slug);
}

/** 국가·도시 슬러그로 도시 설정 조회 */
export function getCity(
  countrySlug: string,
  citySlug: string,
): CityConfig | undefined {
  return getCountry(countrySlug)?.cities.find((c) => c.slug === citySlug);
}

/** 사건 유형 슬러그 유효성 검사 */
export function isValidIncident(slug: string): slug is IncidentType {
  return incidentTypes.includes(slug as IncidentType);
}

/** 로케일 유효성 검사 */
export function isValidLocale(locale: string): locale is Locale {
  return siteConfig.locales.includes(locale as Locale);
}
