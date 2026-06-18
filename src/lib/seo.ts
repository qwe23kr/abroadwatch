import type { Metadata } from "next";
import { getGuidePath } from "./content";
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
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(updatedAt && { modifiedTime: updatedAt }),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: metaDescription,
      site: siteConfig.twitterHandle,
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

/** WebSite JSON-LD 생성 */
export function buildWebsiteJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: "Travel emergency and safety guides worldwide",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/ko/search?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
