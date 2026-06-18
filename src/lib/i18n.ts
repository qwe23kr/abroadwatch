import { siteConfig, type Locale } from "./site-config";

/** UI 번역 문자열 타입 */
export type TranslationKey = keyof typeof translations.ko;

const translations = {
  ko: {
    heroTitle: "전 세계 여행 비상 & 안전 가이드",
    heroSubtitle:
      "해외에서 여권을 잃어버리셨나요? 병원이 필요하신가요? 전 세계 대사관, 경찰서, 비상 연락처 및 복구 가이드를 찾아보세요.",
    searchPlaceholder: "도시 또는 상황 검색 (예: 도쿄 여권)",
    searchButton: "검색",
    searchResults: "검색 결과",
    noSearchResults: "일치하는 가이드가 없습니다. 도시명이나 상황을 바꿔 검색해 보세요.",
    searchPrompt: "도시, 국가 또는 상황을 입력하세요.",
    popularGuides: "인기 가이드",
    browseByCountry: "국가별 탐색",
    browseByIncident: "상황별 탐색",
    latestGuides: "최신 여행 안전 가이드",
    faq: "자주 묻는 질문",
    viewGuide: "가이드 보기",
    allCountries: "모든 국가",
    allIncidents: "모든 상황",
    home: "홈",
    about: "소개",
    contact: "문의",
    privacy: "개인정보처리방침",
    terms: "이용약관",
    disclaimer: "면책조항",
    editorial: "편집 원칙",
    language: "언어",
    summary: "요약",
    immediateActions: "즉시 해야 할 일",
    requiredDocuments: "필요 서류",
    estimatedCosts: "예상 비용",
    estimatedTime: "예상 처리 시간",
    emergencyContacts: "비상 연락처",
    embassyInfo: "대사관 정보",
    policeInfo: "경찰 정보",
    hospitalInfo: "병원 정보",
    commonMistakes: "흔한 실수",
    relatedGuides: "관련 가이드",
    lastUpdated: "최종 업데이트",
    readMore: "더 읽기",
    notFoundTitle: "페이지를 찾을 수 없습니다",
    notFoundDescription: "요청하신 페이지가 존재하지 않거나 이동되었습니다.",
    backToHome: "홈으로 돌아가기",
    aboutTitle: "AbroadWatch 소개",
    contactTitle: "문의하기",
    privacyTitle: "개인정보처리방침",
    termsTitle: "이용약관",
    disclaimerTitle: "면책조항",
    siteDescription:
      "해외 여행 중 여권 분실, 도난, 병원 이용, 경찰 신고 등 비상 상황 대처 가이드",
    footerTagline: "해외 여행자를 위한 신뢰할 수 있는 비상 대처 가이드",
    footerRights: "All rights reserved.",
    emergency: "긴급",
    step: "단계",
    faqHome1Q: "AbroadWatch는 무엇인가요?",
    faqHome1A:
      "AbroadWatch는 해외 여행 중 발생할 수 있는 비상 상황에 대한 실용적인 대처 가이드를 제공하는 무료 정보 플랫폼입니다.",
    faqHome2Q: "정보는 얼마나 자주 업데이트되나요?",
    faqHome2A:
      "각 가이드는 정기적으로 검토되며, 대사관 연락처 및 절차 변경 시 즉시 업데이트됩니다.",
    faqHome3Q: "모든 국가를 지원하나요?",
    faqHome3A:
      "현재 아시아 주요 여행지 5개국 19개 도시를 지원하며, 지속적으로 확대하고 있습니다.",
  },
  en: {
    heroTitle: "Travel Emergency & Safety Guides Worldwide",
    heroSubtitle:
      "Lost your passport abroad? Need a hospital? Find embassies, police stations, emergency contacts and recovery guides around the world.",
    searchPlaceholder: "Search city or situation (e.g. Tokyo passport)",
    searchButton: "Search",
    searchResults: "Search Results",
    noSearchResults: "No matching guides. Try another city or situation.",
    searchPrompt: "Enter a city, country, or situation.",
    popularGuides: "Popular Guides",
    browseByCountry: "Browse By Country",
    browseByIncident: "Browse By Incident",
    latestGuides: "Latest Travel Safety Guides",
    faq: "Frequently Asked Questions",
    viewGuide: "View Guide",
    allCountries: "All Countries",
    allIncidents: "All Incidents",
    home: "Home",
    about: "About",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    disclaimer: "Disclaimer",
    editorial: "Editorial Policy",
    language: "Language",
    summary: "Summary",
    immediateActions: "What To Do Immediately",
    requiredDocuments: "Required Documents",
    estimatedCosts: "Estimated Costs",
    estimatedTime: "Estimated Processing Time",
    emergencyContacts: "Emergency Contacts",
    embassyInfo: "Embassy Information",
    policeInfo: "Police Information",
    hospitalInfo: "Hospital Information",
    commonMistakes: "Common Mistakes",
    relatedGuides: "Related Guides",
    lastUpdated: "Last Updated",
    readMore: "Read More",
    notFoundTitle: "Page Not Found",
    notFoundDescription:
      "The page you requested does not exist or has been moved.",
    backToHome: "Back to Home",
    aboutTitle: "About AbroadWatch",
    contactTitle: "Contact Us",
    privacyTitle: "Privacy Policy",
    termsTitle: "Terms of Service",
    disclaimerTitle: "Disclaimer",
    siteDescription:
      "Emergency travel guides for lost passports, theft, hospital visits, and police reports abroad",
    footerTagline:
      "Trusted emergency response guides for international travelers",
    footerRights: "All rights reserved.",
    emergency: "Emergency",
    step: "Step",
    faqHome1Q: "What is AbroadWatch?",
    faqHome1A:
      "AbroadWatch is a free information platform providing practical emergency response guides for travelers abroad.",
    faqHome2Q: "How often is the information updated?",
    faqHome2A:
      "Each guide is reviewed regularly and updated immediately when embassy contacts or procedures change.",
    faqHome3Q: "Do you cover all countries?",
    faqHome3A:
      "We currently cover 19 cities across 5 major Asian travel destinations, with ongoing expansion.",
  },
} as const;

/** 로케일에 맞는 UI 번역 문자열 반환 */
export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale][key];
}

/** 로케일별 HTML lang 속성값 */
export function getHtmlLang(locale: Locale): string {
  return locale === "ko" ? "ko" : "en";
}

/** 기본 로케일 반환 */
export function getDefaultLocale(): Locale {
  return siteConfig.defaultLocale;
}
