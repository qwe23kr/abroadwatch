import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/** robots.txt 생성 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
