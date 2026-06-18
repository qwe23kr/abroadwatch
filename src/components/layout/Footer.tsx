import Link from "next/link";
import { t, type TranslationKey } from "@/lib/i18n";
import { siteConfig, type Locale } from "@/lib/site-config";

interface FooterProps {
  locale: Locale;
}

const footerLinks: Array<{ key: TranslationKey; path: string }> = [
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
  { key: "privacy", path: "/privacy" },
  { key: "terms", path: "/terms" },
  { key: "disclaimer", path: "/disclaimer" },
  { key: "editorial", path: "/editorial" },
];

/** 사이트 푸터 — 링크, 저작권 */
export function Footer({ locale }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="mb-2 text-lg font-bold text-gray-900">
              {siteConfig.name}
            </p>
            <p className="max-w-sm text-sm text-gray-600">
              {t(locale, "footerTagline")}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {footerLinks.map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.path}`}
                className="text-sm text-gray-600 transition-colors hover:text-blue-600"
              >
                {t(locale, link.key)}
              </Link>
            ))}
          </nav>
        </div>
        <p className="text-xs text-gray-500">
          © {year} {siteConfig.name}. {t(locale, "footerRights")}
        </p>
      </div>
    </footer>
  );
}
