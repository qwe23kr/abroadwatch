import type { MetadataRoute } from "next";
import { brandLogoUrl } from "@/lib/brand-icon";
import { siteConfig } from "@/lib/site-config";

/** PWA manifest */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.seo.title,
    short_name: siteConfig.name,
    description: siteConfig.seo.description,
    start_url: "/kr",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    orientation: "portrait-primary",
    lang: "ko",
    icons: [
      {
        src: "/icon",
        sizes: "96x96",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: brandLogoUrl(siteConfig.url, 192),
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: brandLogoUrl(siteConfig.url, 512),
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
