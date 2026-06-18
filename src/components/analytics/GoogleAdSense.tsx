import Script from "next/script";

/** 게시자 ID가 설정된 경우에만 AdSense 검토/광고 스크립트를 로드합니다. */
export function GoogleAdSense() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client?.startsWith("ca-pub-")) return null;

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
