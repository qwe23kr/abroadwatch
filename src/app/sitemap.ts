import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { travelerAlternateLanguages, travelerPath } from "@/lib/seo";
import { getAllTravelerGuideParams, getTravelerGuide } from "@/lib/traveler-content";
import { getTravelerDestinations } from "@/lib/traveler-destinations";
import { isAdsenseReadyTravelerProfile } from "@/lib/quality";
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

  for (const slug of staticPageSlugs) {
    entries.push({
      url: `${siteConfig.url}/ko/${slug}`,
      lastModified: staticPageLastModified,
      changeFrequency: "yearly",
      priority: 0.35,
      alternates: {
        languages: {
          ko: `${siteConfig.url}/ko/${slug}`,
          en: `${siteConfig.url}/en/${slug}`,
          "x-default": `${siteConfig.url}/ko/${slug}`,
        },
      },
    });
    entries.push({
      url: `${siteConfig.url}/en/${slug}`,
      lastModified: staticPageLastModified,
      changeFrequency: "yearly",
      priority: 0.35,
      alternates: {
        languages: {
          ko: `${siteConfig.url}/ko/${slug}`,
          en: `${siteConfig.url}/en/${slug}`,
          "x-default": `${siteConfig.url}/ko/${slug}`,
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
    if (!profile || !isAdsenseReadyTravelerProfile(profile)) continue;

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
