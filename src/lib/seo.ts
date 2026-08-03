import type { Metadata } from "next";
import { getGuidePath } from "./content";
import { brandLogoUrl, siteIcons } from "./brand-icon";
import {
  buildGuideMetaDescription,
  buildGuideShareTitle,
  buildGuideTabTitle,
  truncateMetaDescription,
} from "./seo-titles";
import {
  getCity,
  getCountry,
  incidentLabels,
  siteConfig,
  type IncidentType,
  type Locale,
} from "./site-config";
import { getTravelerCity, getTravelerCountry } from "./traveler-destinations";
import { isAdsensePriorityCity, isAdsenseReadyTravelerProfile } from "./quality";
import type { TravelerProfile } from "./traveler-profiles";
import { travelerIncident, travelerName, travelerUi } from "./traveler-ui";

const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "AbroadWatch — 당황한 순간에도, 다음 행동은 선명하게.",
} as const;

const OG_LOCALE_BY_LANGUAGE: Record<TravelerProfile["language"], string> = {
  ko: "ko_KR",
  en: "en_US",
  ja: "ja_JP",
  "zh-Hans": "zh_CN",
  "zh-Hant": "zh_TW",
  th: "th_TH",
  vi: "vi_VN",
};

export const INDEXABLE_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export const NOINDEX_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true,
  },
};

export function travelerPath(profile: TravelerProfile, suffix = "") {
  return `/${profile.code}${suffix}`;
}

export function travelerAlternateLanguages(
  profile: TravelerProfile,
  suffix = "",
): Record<string, string> {
  return {
    [profile.htmlLang]: `${siteConfig.url}${travelerPath(profile, suffix)}`,
    "x-default": `${siteConfig.url}${travelerPath(profile, suffix)}`,
  };
}

/** 사이트 전역 메타데이터 — 루트 레이아웃·검색엔진 기본값 */
export function buildSiteMetadata(): Metadata {
  const { title, description, ogTitle, ogDescription } = siteConfig.seo;
  const metaDescription = truncateMetaDescription(description);

  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "travel",
    keywords: [
      "travel emergency",
      "lost passport abroad",
      "travel safety",
      "consular assistance",
      "AbroadWatch",
    ],
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description: metaDescription,
    openGraph: {
      title: ogTitle,
      description: truncateMetaDescription(ogDescription),
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: "ko_KR",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: truncateMetaDescription(ogDescription),
      site: siteConfig.twitterHandle,
      images: [OG_IMAGE.url],
    },
    robots: INDEXABLE_ROBOTS,
    icons: siteIcons,
  };
}

/** 국적별 홈(`/kr` 등) 메타데이터 */
export function buildTravelerHomeMetadata(profile: TravelerProfile): Metadata {
  const ui = travelerUi(profile);
  const path = `/${profile.code}`;
  const canonicalUrl = `${siteConfig.url}${path}`;
  const metaDescription = truncateMetaDescription(ui.subtitle);
  const shareTitle = `${siteConfig.name} | ${ui.hub}`;
  const emergencyKeywords = [
    "lost passport",
    "lost phone",
    "lost wallet",
    "hospital abroad",
    "police report abroad",
    "travel scam",
    profile.nativeName,
    siteConfig.name,
  ];

  return {
    title: ui.hub,
    description: metaDescription,
    icons: siteIcons,
    keywords: emergencyKeywords,
    alternates: {
      canonical: canonicalUrl,
      languages: travelerAlternateLanguages(profile),
    },
    openGraph: {
      title: shareTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: OG_LOCALE_BY_LANGUAGE[profile.language],
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: metaDescription,
      site: siteConfig.twitterHandle,
      images: [OG_IMAGE.url],
    },
    robots: isAdsenseReadyTravelerProfile(profile) ? INDEXABLE_ROBOTS : NOINDEX_ROBOTS,
  };
}

export function buildTravelerGuideMetadata(
  profile: TravelerProfile,
  country: string,
  city: string,
  incident: IncidentType,
  frontmatter: {
    title: string;
    summary: string;
    publishedAt: string;
    updatedAt: string;
    estimatedCost?: string;
    estimatedTime?: string;
    emergencyNumber?: string;
  },
): Metadata {
  const suffix = `/${country}/${city}/${incident}`;
  const canonicalUrl = `${siteConfig.url}${travelerPath(profile, suffix)}`;
  const countryName = travelerName(
    profile,
    country,
    getTravelerCountry(country)?.name.en ?? country,
  );
  const cityName = travelerName(
    profile,
    city,
    getTravelerCity(country, city)?.name.en ?? city,
  );
  const incidentName = travelerIncident(profile, incident);
  const intentTitle =
    profile.language === "ko"
      ? ({
          "lost-passport": `${cityName} 여권 분실 대처법 | 경찰 신고·긴급여권·영사관`,
          "lost-phone": `${cityName} 휴대폰 분실 대처법 | 잠금·유심 정지·경찰 신고`,
          "lost-wallet": `${cityName} 지갑 분실 대처법 | 카드 정지·경찰 신고`,
          hospital: `${cityName} 병원·응급실 이용법 | 비용·통역·준비 서류`,
          "police-report": `${cityName} 경찰 신고 방법 | 외국인 절차·신고서 받기`,
          scam: `${cityName} 여행 사기 대처법 | 유형·신고·환불 절차`,
        } satisfies Record<IncidentType, string>)[incident]
      : frontmatter.title;
  const koreanIntentDescription =
    profile.language === "ko"
      ? ({
            "lost-passport": `${countryName} ${cityName} 여권 분실 시 분실물 확인부터 경찰 신고, 한국 영사관 긴급여권 신청, 귀국 항공편 처리까지 순서대로 확인하세요.`,
            "lost-phone": `${cityName} 휴대폰 분실 시 원격 잠금, SIM·eSIM 정지, 금융앱 보호, 경찰 신고와 증거 보존 순서를 확인하세요.`,
            "lost-wallet": `${cityName} 지갑·카드 분실 시 카드 정지, 부정결제 확인, 현지 경찰 신고서 발급 순서를 확인하세요.`,
            hospital: `${cityName} 병원·응급실 이용 시 긴급번호, 접수 방법, 비용, 한국어 통역 요청과 준비 서류를 확인하세요.`,
            "police-report": `${cityName}에서 도난·분실을 신고하는 외국인 절차와 접수번호, 경찰 확인서를 받는 방법을 확인하세요.`,
            scam: `${cityName} 여행 사기 피해 시 추가 결제 중단, 증거 보존, 관광경찰 신고와 카드 결제 분쟁 순서를 확인하세요.`,
          } satisfies Record<IncidentType, string>)[incident]
      : "";
  const koreanFactSuffix = [
    frontmatter.estimatedTime && `처리시간 ${frontmatter.estimatedTime}`,
    frontmatter.estimatedCost && `비용 ${frontmatter.estimatedCost}`,
  ].filter(Boolean).join(", ");
  const metaDescription =
    profile.language === "ko"
      ? truncateMetaDescription(
          `${koreanIntentDescription}${koreanFactSuffix ? ` ${koreanFactSuffix}.` : ""}`,
        )
      : truncateMetaDescription(frontmatter.summary);
  return {
    title: intentTitle,
    description: metaDescription,
    icons: siteIcons,
    alternates: {
      canonical: canonicalUrl,
      languages: travelerAlternateLanguages(profile, suffix),
    },
    keywords: [
      frontmatter.title,
      incidentName,
      cityName,
      countryName,
      profile.nativeName,
      "AbroadWatch",
    ],
    openGraph: {
      title: intentTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: OG_LOCALE_BY_LANGUAGE[profile.language],
      type: "article",
      images: [OG_IMAGE],
      ...(frontmatter.publishedAt && { publishedTime: frontmatter.publishedAt }),
      modifiedTime: frontmatter.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: intentTitle,
      description: metaDescription,
      site: siteConfig.twitterHandle,
      images: [OG_IMAGE.url],
    },
    robots:
      isAdsenseReadyTravelerProfile(profile) && isAdsensePriorityCity(country, city)
        ? INDEXABLE_ROBOTS
        : NOINDEX_ROBOTS,
  };
}

export function buildTravelerCountryMetadata(
  profile: TravelerProfile,
  country: string,
): Metadata {
  const countryName = travelerName(
    profile,
    country,
    getTravelerCountry(country)?.name.en ?? country,
  );
  const suffix = `/${country}`;
  const canonicalUrl = `${siteConfig.url}${travelerPath(profile, suffix)}`;
  const title = `${countryName} travel emergency guide for ${profile.nativeName}`;
  const description = truncateMetaDescription(
    `${countryName} emergency guide for ${profile.nativeName}: lost passport, phone, wallet, hospital, police report, and travel scam steps by city.`,
  );

  return {
    title,
    description,
    icons: siteIcons,
    keywords: [
      `${countryName} lost passport`,
      `${countryName} emergency number`,
      `${countryName} police report`,
      `${countryName} hospital`,
      `${countryName} travel scam`,
      profile.nativeName,
      siteConfig.name,
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: travelerAlternateLanguages(profile, suffix),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: OG_LOCALE_BY_LANGUAGE[profile.language],
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.twitterHandle,
      images: [OG_IMAGE.url],
    },
    robots: isAdsenseReadyTravelerProfile(profile) ? INDEXABLE_ROBOTS : NOINDEX_ROBOTS,
  };
}

export function buildTravelerCityMetadata(
  profile: TravelerProfile,
  country: string,
  city: string,
): Metadata {
  const countryName = travelerName(
    profile,
    country,
    getTravelerCountry(country)?.name.en ?? country,
  );
  const cityName = travelerName(
    profile,
    city,
    getTravelerCity(country, city)?.name.en ?? city,
  );
  const suffix = `/${country}/${city}`;
  const canonicalUrl = `${siteConfig.url}${travelerPath(profile, suffix)}`;
  const title = `${cityName} emergency guide for ${profile.nativeName}`;
  const description = truncateMetaDescription(
    `${cityName}, ${countryName} emergency guide for ${profile.nativeName}: what to do for lost passport, lost phone, hospital care, police reports, and scams.`,
  );

  return {
    title,
    description,
    icons: siteIcons,
    keywords: [
      `${cityName} lost passport`,
      `${cityName} lost phone`,
      `${cityName} police report`,
      `${cityName} hospital`,
      `${cityName} travel scam`,
      countryName,
      profile.nativeName,
      siteConfig.name,
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: travelerAlternateLanguages(profile, suffix),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: OG_LOCALE_BY_LANGUAGE[profile.language],
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.twitterHandle,
      images: [OG_IMAGE.url],
    },
    robots:
      isAdsenseReadyTravelerProfile(profile) && isAdsensePriorityCity(country, city)
        ? INDEXABLE_ROBOTS
        : NOINDEX_ROBOTS,
  };
}

interface PageMetadataOptions {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  publishedAt?: string;
  updatedAt?: string;
  alternatePaths?: Partial<Record<Locale, string>>;
  type?: "website" | "article";
  /** OG·Twitter 전용 제목 (없으면 title 사용) */
  shareTitle?: string;
}

/** 페이지 메타데이터 생성 (canonical, OG, Twitter, hreflang) */
export function buildMetadata(options: PageMetadataOptions): Metadata {
  const {
    locale,
    title,
    description,
    path,
    publishedAt,
    updatedAt,
    alternatePaths,
    type = "website",
    shareTitle,
  } = options;

  const canonicalUrl = `${siteConfig.url}${path}`;
  const metaDescription = truncateMetaDescription(description);
  const ogTitle = shareTitle ?? title;

  const languages: Record<string, string> = {};
  for (const loc of siteConfig.locales) {
    const altPath = alternatePaths?.[loc] ?? path.replace(`/${locale}`, `/${loc}`);
    languages[loc] = `${siteConfig.url}${altPath}`;
  }
  languages["x-default"] = `${siteConfig.url}${alternatePaths?.ko ?? path.replace(`/${locale}`, "/ko")}`;

  return {
    title,
    description: metaDescription,
    icons: siteIcons,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: ogTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type,
      images: [OG_IMAGE],
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(updatedAt && { modifiedTime: updatedAt }),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: metaDescription,
      site: siteConfig.twitterHandle,
      images: [OG_IMAGE.url],
    },
    robots: INDEXABLE_ROBOTS,
  };
}

/** 가이드 페이지 메타데이터 생성 */
export function buildGuideMetadata(
  locale: Locale,
  country: string,
  city: string,
  incident: IncidentType,
  frontmatter: { title: string; summary: string; publishedAt: string; updatedAt: string },
): Metadata {
  const path = getGuidePath(locale, country, city, incident);
  const alternatePaths: Partial<Record<Locale, string>> = {};
  for (const loc of siteConfig.locales) {
    alternatePaths[loc] = getGuidePath(loc, country, city, incident);
  }

  return buildMetadata({
    locale,
    title: buildGuideTabTitle(locale, country, city, incident),
    shareTitle: buildGuideShareTitle(locale, country, city, incident),
    description: buildGuideMetaDescription(
      locale,
      country,
      city,
      incident,
      frontmatter.summary,
    ),
    path,
    publishedAt: frontmatter.publishedAt,
    updatedAt: frontmatter.updatedAt,
    alternatePaths,
    type: "article",
  });
}

/** BreadcrumbList JSON-LD 생성 */
export function buildBreadcrumbJsonLd(
  locale: Locale,
  items: Array<{ name: string; path: string }>,
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

/** Article JSON-LD 생성 */
export function buildArticleJsonLd(
  locale: Locale,
  country: string,
  city: string,
  incident: IncidentType,
  frontmatter: { title: string; summary: string; publishedAt: string; updatedAt: string },
): object {
  const countryData = getCountry(country);
  const cityData = getCity(country, city);
  const path = getGuidePath(locale, country, city, incident);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.summary,
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.updatedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}${path}`,
    isAccessibleForFree: true,
    genre: "Travel emergency guide",
    keywords: [
      incidentLabels[incident][locale],
      cityData?.name[locale] ?? city,
      countryData?.name[locale] ?? country,
      locale === "ko" ? "해외여행 비상대처" : "travel emergency",
    ],
    contentLocation: {
      "@type": "City",
      name: cityData?.name[locale] ?? city,
      containedInPlace: {
        "@type": "Country",
        name: countryData?.name[locale] ?? country,
      },
    },
    about: {
      "@type": "Thing",
      name: `${incidentLabels[incident][locale]} - ${cityData?.name[locale] ?? city}, ${countryData?.name[locale] ?? country}`,
    },
    inLanguage: locale === "ko" ? "ko-KR" : "en-US",
  };
}

export function buildHowToJsonLd(
  title: string,
  description: string,
  steps: Array<{ title: string; detail: string }>,
): object {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.detail,
    })),
  };
}

/** FAQPage JSON-LD 생성 */
export function buildFaqJsonLd(
  items: Array<{ question: string; answer: string }>,
): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildTravelerBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function buildTravelerArticleJsonLd(
  profile: TravelerProfile,
  options: {
    countryName: string;
    cityName: string;
    incidentName: string;
    path: string;
    title: string;
    description: string;
    publishedAt: string;
    updatedAt: string;
  },
): object {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.title,
    description: truncateMetaDescription(options.description),
    datePublished: options.publishedAt,
    dateModified: options.updatedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: brandLogoUrl(siteConfig.url, 512),
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: `${siteConfig.url}${options.path}`,
    citation: profile.officialGuidance,
    isAccessibleForFree: true,
    genre: "Travel emergency guide",
    keywords: [
      options.incidentName,
      options.cityName,
      options.countryName,
      profile.nativeName,
      profile.consularHotline,
      "travel emergency",
      "AbroadWatch",
    ],
    contentLocation: {
      "@type": "City",
      name: options.cityName,
      containedInPlace: {
        "@type": "Country",
        name: options.countryName,
      },
    },
    about: {
      "@type": "Thing",
      name: `${options.cityName} ${options.incidentName}`,
    },
    inLanguage: profile.htmlLang,
  };
}

/** WebSite JSON-LD 생성 */
export function buildTravelerItemListJsonLd(
  name: string,
  items: Array<{ name: string; path: string; description?: string }>,
): object {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.url}${item.path}`,
      name: item.name,
      ...(item.description && { description: truncateMetaDescription(item.description) }),
    })),
  };
}

export function buildWebsiteJsonLd(profile?: TravelerProfile): object {
  const searchPath = profile ? travelerPath(profile, "/search") : "/kr/search";
  const description = profile ? travelerUi(profile).subtitle : siteConfig.seo.description;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: brandLogoUrl(siteConfig.url, 512),
        width: 512,
        height: 512,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}${searchPath}?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
