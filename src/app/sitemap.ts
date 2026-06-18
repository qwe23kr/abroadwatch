import type { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

const staticPaths = ["", "/about", "/contact", "/privacy", "/terms", "/disclaimer", "/editorial"];

/** 다국어 sitemap.xml 생성 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of siteConfig.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "daily" : "monthly",
        priority: path === "" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            siteConfig.locales.map((loc) => [loc, `${baseUrl}/${loc}${path}`]),
          ),
        },
      });
    }
  }

  for (const guide of getAllGuides()) {
    const path = `/${guide.locale}/${guide.country}/${guide.city}/${guide.incident}`;
    const altPaths = siteConfig.locales.map(
      (loc) => `/${loc}/${guide.country}/${guide.city}/${guide.incident}`,
    );

    entries.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(guide.frontmatter.updatedAt),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(
          siteConfig.locales.map((loc, i) => [loc, `${baseUrl}${altPaths[i]}`]),
        ),
      },
    });
  }

  return entries;
}
