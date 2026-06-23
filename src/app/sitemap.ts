import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { travelerAlternateLanguages, travelerPath } from "@/lib/seo";
import { getAllTravelerGuideParams, getTravelerGuide } from "@/lib/traveler-content";
import { travelerProfiles, type TravelerProfile } from "@/lib/traveler-profiles";

const CORE_GUIDES: ReadonlySet<string> = new Set([
  "kr/japan/tokyo/lost-passport",
  "kr/thailand/bangkok/scam",
  "kr/thailand/bangkok/lost-phone",
  "kr/vietnam/danang/hospital",
  "kr/philippines/cebu/lost-passport",
  "kr/taiwan/taipei/police-report",
  "cn/japan/tokyo/lost-passport",
  "cn/south-korea/seoul/lost-passport",
  "jp/thailand/bangkok/scam",
  "jp/south-korea/seoul/lost-passport",
  "th/south-korea/seoul/lost-passport",
  "vn/south-korea/seoul/lost-passport",
]);

function homeEntry(profile: TravelerProfile): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteConfig.url}${travelerPath(profile)}`,
    lastModified: new Date("2026-06-23"),
    changeFrequency: "weekly",
    priority: profile.code === "kr" ? 1.0 : 0.9,
    alternates: {
      languages: travelerAlternateLanguages(),
    },
  };
}

function guidePriority(key: string) {
  if (CORE_GUIDES.has(key)) {
    return 0.85;
  }
  if (key.includes("/south-korea/seoul/")) return 0.75;
  if (key.includes("/lost-passport") || key.includes("/scam")) return 0.7;
  return 0.45;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = travelerProfiles.map(homeEntry);

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

    const key = `${params.traveler}${suffix}`;
    entries.push({
      url: `${siteConfig.url}${travelerPath(profile, suffix)}`,
      lastModified: new Date(guide.frontmatter.updatedAt),
      changeFrequency: "monthly",
      priority: guidePriority(key),
      alternates: {
        languages: travelerAlternateLanguages(suffix),
      },
    });
  }

  return entries;
}
