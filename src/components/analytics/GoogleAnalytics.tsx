import Script from "next/script";
import { Suspense } from "react";
import { GoogleAnalyticsPageView } from "./GoogleAnalyticsPageView";

/** GA4 Measurement ID — NEXT_PUBLIC_GA_ID 환경변수 (예: G-XXXXXXXXXX) */
function getGaId(): string | undefined {
  return process.env.NEXT_PUBLIC_GA_ID?.trim() || undefined;
}

/** Google Analytics 4 — gtag 로드 + 페이지뷰 추적 */
export function GoogleAnalytics() {
  const gaId = getGaId();
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: true });
        `}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsPageView gaId={gaId} />
      </Suspense>
    </>
  );
}
