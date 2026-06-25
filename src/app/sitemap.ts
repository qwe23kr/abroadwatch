import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { travelerAlternateLanguages, travelerPath } from "@/lib/seo";
import { getAllTravelerGuideParams, getTravelerGuide } from "@/lib/traveler-content";
import { travelerDestinations } from "@/lib/traveler-destinations";
import { travelerProfiles, type TravelerProfile } from "@/lib/traveler-profiles";

function homeEntry(profile: TravelerProfile): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteConfig.url}${travelerPath(profile)}`,
    lastModified: new Date("2026-06-23"),
    alternates: {
      languages: travelerAlternateLanguages(),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = travelerProfiles.map(homeEntry);

  for (const profile of travelerProfiles) {
    for (const country of travelerDestinations) {
      const countrySuffix = `/${country.slug}`;
      entries.push({
        url: `${siteConfig.url}${travelerPath(profile, countrySuffix)}`,
        lastModified: new Date("2026-06-25"),
        alternates: {
          languages: travelerAlternateLanguages(countrySuffix),
        },
      });

      for (const city of country.cities) {
        const citySuffix = `/${country.slug}/${city.slug}`;
        entries.push({
          url: `${siteConfig.url}${travelerPath(profile, citySuffix)}`,
          lastModified: new Date("2026-06-25"),
          alternates: {
            languages: travelerAlternateLanguages(citySuffix),
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
    if (!profile) continue;

    entries.push({
      url: `${siteConfig.url}${travelerPath(profile, suffix)}`,
      lastModified: new Date(guide.frontmatter.updatedAt),
      alternates: {
        languages: travelerAlternateLanguages(suffix),
      },
    });
  }

  return entries;
}
