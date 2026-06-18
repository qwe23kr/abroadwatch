import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

/** 게시자 ID가 설정된 경우에만 AdSense 검토/광고 스크립트를 로드합니다. */
export function GoogleAdSense() {
  const client = siteConfig.adsenseClientId;

  return (
    <Script
      id="google-adsense"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
    />
  );
}
