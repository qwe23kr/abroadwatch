import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
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
  metadataBase: new URL("https://abroadwatch.com"),
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
