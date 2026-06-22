import type { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/content";
import { getAllTravelerGuideParams, getTravelerGuide } from "@/lib/traveler-content";
import { travelerProfiles } from "@/lib/traveler-profiles";
import { countries, siteConfig, type Locale } from "@/lib/site-config";

const LEGAL_PATHS = [
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/editorial",
] as const;

/** 로케일별 hreflang alternates */
function localeAlternates(pathSuffix: string) {
  return {
    languages: Object.fromEntries(
      siteConfig.locales.map((loc) => [
        loc,
        `${siteConfig.url}/${loc}${pathSuffix}`,
      ]),
    ),
  };
}

/** 가이드 목록에서 pathSuffix 기준 최신 updatedAt */
function latestUpdatedAt(
  guides: ReturnType<typeof getAllGuides>,
  locale: Locale,
  match: (guide: (typeof guides)[number]) => boolean,
): Date {
  const dates = guides
    .filter((g) => g.locale === locale && match(g))
    .map((g) => new Date(g.frontmatter.updatedAt).getTime());

  return dates.length > 0 ? new Date(Math.max(...dates)) : new Date();
}

/** 다국어 sitemap.xml 생성 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const guides = getAllGuides();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of siteConfig.locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: latestUpdatedAt(guides, locale, () => true),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: localeAlternates(""),
    });

    for (const legalPath of LEGAL_PATHS) {
      entries.push({
        url: `${baseUrl}/${locale}${legalPath}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
        alternates: localeAlternates(legalPath),
      });
    }
  }

  for (const locale of siteConfig.locales) {
    for (const country of countries) {
      const hasCountryGuides = guides.some(
        (g) => g.locale === locale && g.country === country.slug,
      );
      if (!hasCountryGuides) continue;

      const countryPath = `/${country.slug}`;
      entries.push({
        url: `${baseUrl}/${locale}${countryPath}`,
        lastModified: latestUpdatedAt(
          guides,
          locale,
          (g) => g.country === country.slug,
        ),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: localeAlternates(countryPath),
      });

      for (const city of country.cities) {
        const hasCityGuides = guides.some(
          (g) =>
            g.locale === locale &&
            g.country === country.slug &&
            g.city === city.slug,
        );
        if (!hasCityGuides) continue;

        const cityPath = `/${country.slug}/${city.slug}`;
        entries.push({
          url: `${baseUrl}/${locale}${cityPath}`,
          lastModified: latestUpdatedAt(
            guides,
            locale,
            (g) => g.country === country.slug && g.city === city.slug,
          ),
          changeFrequency: "monthly",
          priority: 0.7,
          alternates: localeAlternates(cityPath),
        });
      }
    }
  }

  const seoIncidents = ["scam", "hospital"] as const;
  for (const locale of siteConfig.locales) {
    for (const country of countries) {
      for (const incident of seoIncidents) {
        const incidentPath = `/${country.slug}/${incident}`;
        entries.push({
          url: `${baseUrl}/${locale}${incidentPath}`,
          lastModified: latestUpdatedAt(
            guides,
            locale,
            (g) => g.country === country.slug && g.incident === incident,
          ),
          changeFrequency: "monthly",
          priority: 0.75,
          alternates: localeAlternates(incidentPath),
        });
      }
    }
  }

  for (const guide of guides) {
    const pathSuffix = `/${guide.country}/${guide.city}/${guide.incident}`;

    entries.push({
      url: `${baseUrl}/${guide.locale}${pathSuffix}`,
      lastModified: new Date(guide.frontmatter.updatedAt),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: localeAlternates(pathSuffix),
    });
  }

  const travelerParams = getAllTravelerGuideParams();
  for (const profile of travelerProfiles) {
    entries.push({
      url: `${baseUrl}/${profile.code}`,
      lastModified: new Date("2026-06-22"),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  for (const params of travelerParams) {
    const guide = getTravelerGuide(
      params.traveler,
      params.country,
      params.city,
      params.incident,
    );
    if (!guide) continue;
    const suffix = `/${params.country}/${params.city}/${params.incident}`;
    entries.push({
      url: `${baseUrl}/${params.traveler}${suffix}`,
      lastModified: new Date(guide.frontmatter.updatedAt),
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: {
        languages: Object.fromEntries(
          travelerProfiles.map((profile) => [
            profile.htmlLang,
            `${baseUrl}/${profile.code}${suffix}`,
          ]),
        ),
      },
    });
  }

  return entries;
}
