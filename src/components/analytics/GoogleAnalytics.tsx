import Script from "next/script";
import { Suspense } from "react";
import { siteConfig } from "@/lib/site-config";
import { GoogleAnalyticsPageView } from "./GoogleAnalyticsPageView";

/** Google tag (gtag.js) — GA4 */
export function GoogleAnalytics() {
  const gaId = siteConfig.gaMeasurementId;

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsPageView gaId={gaId} />
      </Suspense>
    </>
  );
}
