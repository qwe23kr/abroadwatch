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
import type { TravelerProfile } from "./traveler-profiles";
import { travelerIncident, travelerName, travelerUi } from "./traveler-ui";

const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "AbroadWatch — 아시아 여행 비상·안전 가이드",
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

  return {
    title: ui.hub,
    description: metaDescription,
    icons: siteIcons,
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
  };
}

export function buildTravelerGuideMetadata(
  profile: TravelerProfile,
  country: string,
  city: string,
  incident: IncidentType,
  frontmatter: { title: string; summary: string; publishedAt?: string; updatedAt: string },
): Metadata {
  const suffix = `/${country}/${city}/${incident}`;
  const canonicalUrl = `${siteConfig.url}${travelerPath(profile, suffix)}`;
  const metaDescription = truncateMetaDescription(frontmatter.summary);
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

  return {
    title: frontmatter.title,
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
      title: frontmatter.title,
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
      title: frontmatter.title,
      description: metaDescription,
      site: siteConfig.twitterHandle,
      images: [OG_IMAGE.url],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildTravelerCountryMetadata(
  profile: TravelerProfile,
  country: string,
): Metadata {
  const ui = travelerUi(profile);
  const countryName = travelerName(
    profile,
    country,
    getTravelerCountry(country)?.name.en ?? country,
  );
  const suffix = `/${country}`;
  const canonicalUrl = `${siteConfig.url}${travelerPath(profile, suffix)}`;
  const title = `${countryName} - ${ui.hub}`;
  const description = truncateMetaDescription(`${countryName}: ${ui.subtitle}`);

  return {
    title,
    description,
    icons: siteIcons,
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
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildTravelerCityMetadata(
  profile: TravelerProfile,
  country: string,
  city: string,
): Metadata {
  const ui = travelerUi(profile);
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
  const title = `${cityName}, ${countryName} - ${ui.hub}`;
  const description = truncateMetaDescription(`${cityName}, ${countryName}: ${ui.subtitle}`);

  return {
    title,
    description,
    icons: siteIcons,
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
    robots: {
      index: true,
      follow: true,
    },
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
    robots: {
      index: true,
      follow: true,
    },
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
    updatedAt: string;
  },
): object {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.title,
    description: truncateMetaDescription(options.description),
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
    isAccessibleForFree: true,
    genre: "Travel emergency guide",
    keywords: [
      options.incidentName,
      options.cityName,
      options.countryName,
      profile.nativeName,
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

export function buildWebsiteJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.seo.description,
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
      target: `${siteConfig.url}/kr/search?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
