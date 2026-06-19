import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { buildSiteMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

/** 루트 레이아웃 — HTML shell, 글 "#globals.css" */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${notoSansKr.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white font-sans text-gray-900 antialiased">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  ...buildSiteMetadata(),
  icons: {
    icon: [
      { url: "/brand-icon/48", sizes: "48x48", type: "image/png" },
      { url: "/icon", sizes: "96x96", type: "image/png" },
      { url: "/brand-icon/192", sizes: "192x192", type: "image/png" },
      { url: "/brand-icon/512", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    shortcut: "/icon",
  },
  verification: {
    google: siteConfig.googleSiteVerification,
    other: {
      "naver-site-verification": siteConfig.naverSiteVerification,
      "msvalidate.01": siteConfig.bingSiteVerification,
    },
  },
  other: {
    "google-adsense-account": siteConfig.adsenseClientId,
  },
};
