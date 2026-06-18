import { siteConfig, type Locale } from "./site-config";

/** UI 번역 문자열 타입 */
export type TranslationKey = keyof typeof translations.ko;

const translations = {
  ko: {
    heroTitle: "아시아 19개 도시 여행 비상 & 안전 가이드",
    heroSubtitle:
      "여권 분실, 병원, 경찰 신고, 여행 사기까지 — 아시아 주요 여행지의 대사관·경찰·비상 연락처와 복구 절차를 한곳에서 확인하세요.",
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
      "아시아 19개 도시 여권 분실, 병원, 경찰 신고, 여행 사기 등 해외 비상 상황 대처 가이드",
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
    browseCountryDescription:
      "도시를 찾고 여권·휴대폰·지갑 분실, 병원, 경찰 신고, 여행 사기 중 필요한 가이드를 바로 선택하세요.",
    browseIncidentDescription:
      "상황을 선택하면 지원 중인 19개 도시의 관련 가이드만 모아 보여드립니다.",
    filterByCountry: "국가 필터",
    allCountriesClear: "전체 보기",
    cityHubTitle: "도시 비상 가이드",
    cityHubDescription: "이 도시에서 발생할 수 있는 6가지 비상 상황 가이드입니다.",
    countryHubTitle: "국가별 가이드",
    countryHubDescription: "지원 도시와 주요 비상 가이드를 확인하세요.",
    countryIncidentHubScam: "여행 사기 가이드",
    countryIncidentHubHospital: "병원·응급실 가이드",
    countryIncidentHubDescription:
      "이 국가의 모든 지원 도시 가이드를 한곳에서 확인하세요.",
    incidentTabsLabel: "같은 도시 다른 상황",
    emergencyFab: "긴급 전화",
    emergencyFabHelp: "해외여행자 24시간",
    menuOpen: "메뉴 열기",
    menuClose: "메뉴 닫기",
    address: "주소",
    phone: "전화",
    hours: "운영시간",
    website: "웹사이트",
    reviewSource: "출처",
    reviewVerified: "여행 후기·커뮤니티 기반",
    viewOnMap: "Google Maps에서 길찾기",
  },
  en: {
    heroTitle: "Travel Emergency & Safety Guides — 19 Asian Cities",
    heroSubtitle:
      "Lost passport, hospital, police report, or travel scam — embassy contacts, emergency numbers, and step-by-step guides for major Asian destinations.",
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
      "Emergency travel guides for 19 Asian cities — lost passport, hospital, police, and travel scams",
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
    browseCountryDescription:
      "Pick a city, then open guides for lost passport, phone, wallet, hospital, police report, or travel scams.",
    browseIncidentDescription:
      "Choose a situation to see matching guides across all 19 supported cities.",
    filterByCountry: "Filter by country",
    allCountriesClear: "Show all",
    cityHubTitle: "City emergency guides",
    cityHubDescription: "Six emergency situations covered for this city.",
    countryHubTitle: "Country guides",
    countryHubDescription: "Supported cities and key emergency guides.",
    countryIncidentHubScam: "Travel scam guides",
    countryIncidentHubHospital: "Hospital & ER guides",
    countryIncidentHubDescription:
      "All supported city guides for this country in one place.",
    incidentTabsLabel: "Other situations in this city",
    emergencyFab: "Emergency call",
    emergencyFabHelp: "24hr traveler helpline",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    address: "Address",
    phone: "Phone",
    hours: "Hours",
    website: "Website",
    reviewSource: "Source",
    reviewVerified: "Based on travel reviews & forums",
    viewOnMap: "Open in Google Maps",
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
