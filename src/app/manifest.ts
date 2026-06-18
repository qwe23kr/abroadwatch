import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/** PWA manifest */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AbroadWatch — Travel Emergency Guides",
    short_name: "AbroadWatch",
    description:
      "Emergency guides for lost passport, hospital, police, and travel scams across 19 Asian cities.",
    start_url: "/ko",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    orientation: "portrait-primary",
    lang: "ko",
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
