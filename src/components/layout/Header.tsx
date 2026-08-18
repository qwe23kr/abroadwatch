import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";
import { t } from "@/lib/i18n";
import { siteConfig, type Locale } from "@/lib/site-config";
import { MobileNav } from "./MobileNav";
import { NationalitySelector } from "./NationalitySelector";
import type { TravelerProfile } from "@/lib/traveler-profiles";
import { travelerNav } from "@/lib/traveler-ui";
import { affiliateLinks } from "@/lib/affiliate-links";
import { TrackedLink } from "@/components/analytics/TrackedLink";

interface HeaderProps {
  locale: Locale;
  traveler?: TravelerProfile;
}

const navItems = [
  { key: "about" as const, path: "/about" },
  { key: "contact" as const, path: "/contact" },
];

/** 사이트 헤더 — 로고, 내비게이션, 언어 전환 */
export function Header({ locale, traveler }: HeaderProps) {
  const nativeNav = traveler ? travelerNav(traveler) : undefined;
  return (
    <header className="sticky top-0 z-50 border-b border-[#173c32]/10 bg-[#f8f9f4]/95 shadow-[0_8px_30px_rgba(16,34,29,0.05)] backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href={traveler ? `/${traveler.code}` : `/${locale}`}
          className="group flex min-w-0 flex-1 items-center gap-2.5 transition-opacity hover:opacity-75 lg:flex-none"
        >
          <BrandMark size={34} className="shrink-0 transition-transform group-hover:-rotate-3" />
          <span className="whitespace-nowrap text-base font-black tracking-[-0.04em] text-[#10221d] sm:text-lg">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main">
          {traveler && (
            <Link
              href={`/${traveler.code}/prepare`}
              className="rounded-full bg-[#10221d] px-4 py-2.5 text-sm font-black text-[#c8f169] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {traveler.code === "kr" ? "여행 준비" : "Trip prep"}
            </Link>
          )}
          {traveler && (
            <div className="group relative">
              <button
                type="button"
                className="inline-flex rounded-full px-4 py-2.5 text-sm font-bold text-[#52645e] transition-colors hover:bg-white group-hover:text-[#0f766e] group-focus-within:text-[#0f766e]"
                aria-haspopup="true"
              >
                {traveler.code === "kr" ? "여행 서비스" : "Travel services"}
                <span className="ml-1 text-xs" aria-hidden="true">⌄</span>
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="rounded-2xl border border-[#173c32]/10 bg-[#fffefb] p-2 shadow-[0_20px_60px_rgba(16,34,29,0.18)]">
                  {Object.entries(affiliateLinks).map(([key, item]) => (
                    <TrackedLink
                      key={key}
                      href={item.href}
                      target="_blank"
                      rel="sponsored nofollow noopener"
                      eventName="affiliate_click"
                      eventParams={{ placement: "desktop_header", partner: item.partner, product: key }}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-[#31443d] hover:bg-[#eef5ef] hover:text-[#0f766e]"
                    >
                      <span>{traveler.code === "kr" ? item.ko : item.en}</span>
                      <span className="text-xs" aria-hidden="true">↗</span>
                    </TrackedLink>
                  ))}
                  <p className="px-3 pb-1 pt-2 text-[10px] leading-4 text-[#788983]">
                    {traveler.code === "kr" ? "제휴 링크 · 구매 시 수수료를 받을 수 있습니다." : "Affiliate links · We may earn a commission."}
                  </p>
                </div>
              </div>
            </div>
          )}
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={traveler ? `/${traveler.code}${item.path}` : `/${locale}${item.path}`}
              className={`${item.key === "contact" ? "hidden xl:block" : ""} rounded-full px-3 py-2.5 text-sm font-bold text-[#52645e] transition-colors hover:bg-white hover:text-[#0f766e]`}
            >
              {nativeNav?.[item.key] ?? t(locale, item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <NationalitySelector locale={locale} />
          <MobileNav locale={locale} traveler={traveler} />
        </div>
      </div>
    </header>
  );
}
