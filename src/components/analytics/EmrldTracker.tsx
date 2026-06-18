import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

/** emrldco 트래킹 — head에 외부 스크립트 동적 주입 */
export function EmrldTracker() {
  const src = siteConfig.emrldScriptUrl;

  return (
    <Script
      id="emrld-tracker-loader"
      strategy="afterInteractive"
      data-noptimize="1"
      data-cfasync="false"
      data-no-defer="1"
    >
      {`
        (function () {
          var script = document.createElement("script");
          script.async = 1;
          script.src = "${src}";
          document.head.appendChild(script);
        })();
      `}
    </Script>
  );
}
