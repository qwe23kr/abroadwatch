import Link from "next/link";
import { t } from "@/lib/i18n";
import { siteConfig, type Locale } from "@/lib/site-config";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";

interface HeaderProps {
  locale: Locale;
}

const navItems = [
  { key: "about" as const, path: "/about" },
  { key: "contact" as const, path: "/contact" },
];

/** 사이트 헤더 — 로고, 내비게이션, 언어 전환 */
export function Header({ locale }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            AW
          </span>
          <span className="text-lg font-bold text-gray-900">
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
              {t(locale, item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher locale={locale} />
          </div>
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
}
