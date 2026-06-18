"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface GoogleAnalyticsPageViewProps {
  gaId: string;
}

/** App Router 클라이언트 네비게이션 시 GA4 page_view 전송 */
export function GoogleAnalyticsPageView({ gaId }: GoogleAnalyticsPageViewProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!window.gtag) return;

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    window.gtag("config", gaId, { page_path: pagePath });
  }, [pathname, searchParams, gaId]);

  return null;
}
