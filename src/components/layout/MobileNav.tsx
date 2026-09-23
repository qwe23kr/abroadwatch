"use client";

import Link from "next/link";
import { useState } from "react";
import { t, type TranslationKey } from "@/lib/i18n";
import { siteConfig, type Locale } from "@/lib/site-config";
import type { TravelerProfile } from "@/lib/traveler-profiles";
import { travelerNav } from "@/lib/traveler-ui";
import { responseCopy } from "@/lib/response-copy";
import { affiliateLinks } from "@/lib/affiliate-links";
import { TrackedLink } from "@/components/analytics/TrackedLink";

interface MobileNavProps {
  locale: Locale;
  traveler?: TravelerProfile;
}

const navItems: Array<{ key: TranslationKey; path: string }> = [
  { key: "about", path: "/about" },
];

/** 모바일 햄버거 메뉴 */
export function MobileNav({ locale, traveler }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const nativeNav = traveler ? travelerNav(traveler) : undefined;
  const searchPath = traveler ? `/${traveler.code}/search` : `/${locale}/search`;

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#173c32]/15 bg-white text-[#10221d] shadow-sm transition hover:border-[#0f766e]/40 hover:bg-[#eef5ef]"
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
            className="fixed right-0 top-0 z-50 flex h-dvh w-[min(20rem,calc(100vw-1rem))] flex-col border-l border-gray-200 bg-white p-4 shadow-2xl"
            aria-label="Mobile"
          >
            <div className="mb-6 flex items-center justify-between gap-3">
              <span className="truncate font-bold text-gray-900">{siteConfig.name}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
                aria-label={t(locale, "menuClose")}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="space-y-1">
              <li>
                <Link
                  href={searchPath}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg bg-[#10221d] px-3 py-2.5 text-sm font-bold text-[#c8f169]"
                >
                  {nativeNav?.search ?? t(locale, "searchButton")}
                </Link>
              </li>
              {traveler && (
                <li>
                  <Link
                    href={`/${traveler.code}/prepare`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {responseCopy[traveler.language].prep}
                  </Link>
                </li>
              )}
              {traveler && (
                <li className="pt-4">
                  <p className="flex items-center gap-2 px-3 pb-2 text-[10px] font-black tracking-[.14em] text-[#9a4d0d]">
                    <span className="rounded-full bg-[#e45c2f] px-1.5 py-0.5 text-[9px] tracking-[.08em] text-white">HOT</span>
                    {traveler.code === "kr" ? "여행 특가" : "TRAVEL DEALS"}
                  </p>
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-[#f1b85b]/35 bg-[#fff8e9] p-1.5">
                    {Object.entries(affiliateLinks).map(([key, item]) => (
                      <TrackedLink
                        key={key}
                        href={item.href}
                        target="_blank"
                        rel="sponsored nofollow noopener"
                        eventName="affiliate_click"
                        eventParams={{ placement: "mobile_menu", partner: item.partner, product: key }}
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-3 py-2.5 text-sm font-bold text-[#5c3b21] hover:bg-[#ffe9bd] hover:text-[#9a4d0d]"
                      >
                        {traveler.code === "kr" ? item.ko : item.en} ↗
                      </TrackedLink>
                    ))}
                  </div>
                  <p className="px-3 pt-2 text-[10px] leading-4 text-[#788983]">
                    {traveler.code === "kr" ? "구매 시 수수료를 받을 수 있습니다." : "We may earn a commission."}
                  </p>
                </li>
              )}
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={traveler ? `/${traveler.code}${item.path}` : `/${locale}${item.path}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {item.key === "about" ? nativeNav?.about ?? t(locale, item.key) : nativeNav?.contact ?? t(locale, item.key)}
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
