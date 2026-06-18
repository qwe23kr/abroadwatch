"use client";

import Link from "next/link";
import { useState } from "react";
import { t, type TranslationKey } from "@/lib/i18n";
import { siteConfig, type Locale } from "@/lib/site-config";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface MobileNavProps {
  locale: Locale;
}

const navItems: Array<{ key: TranslationKey; path: string }> = [
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
];

/** 모바일 햄버거 메뉴 */
export function MobileNav({ locale }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
        aria-expanded={open}
        aria-label={open ? t(locale, "menuClose") : t(locale, "menuOpen")}
      >
        {open ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/30"
            aria-label={t(locale, "menuClose")}
            onClick={() => setOpen(false)}
          />
          <nav
            className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col border-l border-gray-200 bg-white p-5 shadow-xl"
            aria-label="Mobile"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-bold text-gray-900">{siteConfig.name}</span>
              <LanguageSwitcher locale={locale} />
            </div>
            <ul className="space-y-1">
              <li>
                <Link
                  href={`/${locale}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {t(locale, "home")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/search`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {t(locale, "searchButton")}
                </Link>
              </li>
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${locale}${item.path}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {t(locale, item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
