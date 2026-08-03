import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { travelerAlternateLanguages, travelerPath } from "@/lib/seo";
import { getAllTravelerGuideParams, getTravelerGuide } from "@/lib/traveler-content";
import { getTravelerDestinations } from "@/lib/traveler-destinations";
import {
  isAdsenseIndexableGuide,
  isAdsensePriorityCity,
  isAdsenseReadyTravelerProfile,
} from "@/lib/quality";
import { travelerProfiles, type TravelerProfile } from "@/lib/traveler-profiles";

const staticPageSlugs = ["about", "contact", "privacy", "terms", "disclaimer", "editorial"];
const qualityUpdateLastModified = new Date("2026-07-10");

function latestDate(...dates: Date[]) {
  return new Date(Math.max(...dates.map((date) => date.getTime())));
}

function homeEntry(profile: TravelerProfile): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteConfig.url}${travelerPath(profile)}`,
    lastModified: qualityUpdateLastModified,
    changeFrequency: "weekly",
    priority: profile.code === "kr" || profile.code === "us" ? 1 : 0.9,
    alternates: {
      languages: travelerAlternateLanguages(profile),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const indexableProfiles = travelerProfiles.filter(isAdsenseReadyTravelerProfile);
  const entries: MetadataRoute.Sitemap = indexableProfiles.map(homeEntry);
  const staticPageLastModified = new Date("2026-06-18");

  for (const profile of indexableProfiles) {
    for (const [suffix, priority] of [["/prepare", 0.96], ["/tools/lost-phone", 0.92], ["/claims", 0.88]] as const) {
      entries.push({
        url: `${siteConfig.url}${travelerPath(profile, suffix)}`,
        lastModified: new Date("2026-07-27"),
        changeFrequency: "monthly",
        priority,
        alternates: { languages: travelerAlternateLanguages(profile, suffix) },
      });
    }
  }

  for (const slug of staticPageSlugs) {
    entries.push({
      url: `${siteConfig.url}/kr/${slug}`,
      lastModified: staticPageLastModified,
      changeFrequency: "yearly",
      priority: 0.35,
      alternates: {
        languages: {
          ko: `${siteConfig.url}/kr/${slug}`,
          "x-default": `${siteConfig.url}/kr/${slug}`,
        },
      },
    });
  }

  for (const profile of indexableProfiles) {
    for (const country of getTravelerDestinations(profile)) {
      const countrySuffix = `/${country.slug}`;
      entries.push({
        url: `${siteConfig.url}${travelerPath(profile, countrySuffix)}`,
        lastModified: qualityUpdateLastModified,
        changeFrequency: "weekly",
        priority: 0.72,
        alternates: {
          languages: travelerAlternateLanguages(profile, countrySuffix),
        },
      });

      for (const city of country.cities) {
        if (!isAdsensePriorityCity(country.slug, city.slug)) continue;
        const citySuffix = `/${country.slug}/${city.slug}`;
        entries.push({
          url: `${siteConfig.url}${travelerPath(profile, citySuffix)}`,
          lastModified: qualityUpdateLastModified,
          changeFrequency: "weekly",
          priority: 0.78,
          alternates: {
            languages: travelerAlternateLanguages(profile, citySuffix),
          },
        });
      }
    }
  }

  for (const params of getAllTravelerGuideParams()) {
    const guide = getTravelerGuide(
      params.traveler,
      params.country,
      params.city,
      params.incident,
    );
    if (!guide) continue;

    const suffix = `/${params.country}/${params.city}/${params.incident}`;
    const profile = travelerProfiles.find((item) => item.code === params.traveler);
    if (!profile || !isAdsenseIndexableGuide(profile, params.country, params.city)) continue;

    entries.push({
      url: `${siteConfig.url}${travelerPath(profile, suffix)}`,
      lastModified: latestDate(new Date(guide.frontmatter.updatedAt), qualityUpdateLastModified),
      changeFrequency: "monthly",
      priority: 0.86,
      alternates: {
        languages: travelerAlternateLanguages(profile, suffix),
      },
    });
  }

  return entries;
}
