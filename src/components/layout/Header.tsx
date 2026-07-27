import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";
import { t } from "@/lib/i18n";
import { siteConfig, type Locale } from "@/lib/site-config";
import { MobileNav } from "./MobileNav";
import { NationalitySelector } from "./NationalitySelector";
import type { TravelerProfile } from "@/lib/traveler-profiles";
import { travelerNav } from "@/lib/traveler-ui";

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
    <header className="sticky top-0 z-50 border-b border-[#173c32]/10 bg-[#f6f7f2]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-1.5 px-3 py-3.5 sm:px-5 md:px-8">
        <Link
          href={traveler ? `/${traveler.code}` : `/${locale}`}
          className="flex min-w-0 flex-1 items-center gap-2 transition-opacity hover:opacity-75 md:flex-none"
        >
          <BrandMark size={30} className="shrink-0 min-[360px]:h-8 min-[360px]:w-8" />
          <span className="whitespace-nowrap text-sm font-black tracking-[-0.03em] text-[#10221d] min-[360px]:text-base sm:text-lg">
            {siteConfig.name}
          </span>
          <span className="hidden rounded-full bg-[#10221d] px-2 py-1 text-[9px] font-bold tracking-[0.14em] text-[#c8f169] sm:inline">
            TRAVEL READY
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {traveler && (
            <Link
              href={`/${traveler.code}/prepare`}
              className="rounded-full bg-[#10221d] px-4 py-2 text-sm font-black text-[#c8f169] transition hover:-translate-y-0.5"
            >
              {traveler.code === "kr" ? "여행 준비" : "Trip prep"}
            </Link>
          )}
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.path}`}
              className="text-sm font-semibold text-[#52645e] transition-colors hover:text-[#0f766e]"
            >
              {nativeNav?.[item.key] ?? t(locale, item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <NationalitySelector locale={locale} />
          <MobileNav locale={locale} traveler={traveler} />
        </div>
      </div>
    </header>
  );
}
