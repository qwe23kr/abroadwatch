"use client";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics-events";
/** Never collect phone numbers, search queries or arbitrary link text. */
export function ResponseAnalytics({ traveler }: { traveler: string }) {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) trackEvent("help_phone_click", { traveler });
      else if (link.closest("[data-official-sources]")) {
        const target = new URL(link.href);
        if (["https:", "http:"].includes(target.protocol) && target.origin !== window.location.origin) {
          trackEvent("official_source_click", { traveler, destination_host: target.hostname });
        }
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [traveler]);
  return null;
}
