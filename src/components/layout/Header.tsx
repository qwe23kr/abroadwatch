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
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-1.5 px-2.5 py-3 min-[360px]:gap-2 min-[360px]:px-3 sm:px-4 md:px-6">
        <Link
          href={traveler ? `/${traveler.code}` : `/${locale}`}
          className="flex min-w-0 flex-1 items-center gap-1.5 transition-opacity hover:opacity-80 min-[360px]:gap-2 md:flex-none"
        >
          <BrandMark size={30} className="shrink-0 min-[360px]:h-8 min-[360px]:w-8" />
          <span className="whitespace-nowrap text-sm font-bold tracking-tight text-gray-900 min-[360px]:text-base min-[360px]:tracking-normal sm:text-lg">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.path}`}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
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
