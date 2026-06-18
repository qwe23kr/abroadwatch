"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, type Locale } from "@/lib/site-config";

interface LanguageSwitcherProps {
  locale: Locale;
}

/** 현재 경로를 유지하면서 언어 전환 링크 제공 */
export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const switchPath = (targetLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    return segments.join("/") || `/${targetLocale}`;
  };

  return (
    <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
      {siteConfig.locales.map((loc) => (
        <Link
          key={loc}
          href={switchPath(loc)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
            locale === loc
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
          hrefLang={loc}
          aria-current={locale === loc ? "page" : undefined}
        >
          {loc === "ko" ? "한국어" : "English"}
        </Link>
      ))}
    </div>
  );
}
