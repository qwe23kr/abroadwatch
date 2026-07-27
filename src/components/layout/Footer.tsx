import Link from "next/link";
import { t, type TranslationKey } from "@/lib/i18n";
import { siteConfig, type Locale } from "@/lib/site-config";
import type { TravelerProfile } from "@/lib/traveler-profiles";
import { travelerFooter } from "@/lib/traveler-ui";

interface FooterProps {
  locale: Locale;
  traveler?: TravelerProfile;
}

const footerLinks: Array<{ key: TranslationKey; path: string }> = [
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
  { key: "privacy", path: "/privacy" },
  { key: "terms", path: "/terms" },
  { key: "disclaimer", path: "/disclaimer" },
  { key: "editorial", path: "/editorial" },
];

export function Footer({ locale, traveler }: FooterProps) {
  const year = new Date().getFullYear();
  const nativeFooter = traveler ? travelerFooter(traveler) : undefined;

  return (
    <footer className="mt-auto bg-[#10221d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="mb-2 text-lg font-black tracking-tight text-white">
              {siteConfig.name}
            </p>
            <p className="max-w-sm text-sm leading-6 text-[#b8c8c2]">
              {nativeFooter?.tagline ?? t(locale, "footerTagline")}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {footerLinks.map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.path}`}
                className="text-sm text-[#b8c8c2] transition-colors hover:text-[#c8f169]"
              >
                {nativeFooter?.[link.key as keyof Omit<typeof nativeFooter, "tagline">] ??
                  t(locale, link.key)}
              </Link>
            ))}
          </nav>
        </div>
        <p className="border-t border-white/10 pt-6 text-xs text-[#8ea39b]">
          &copy; {year} {siteConfig.name}. {t(locale, "footerRights")}
        </p>
      </div>
    </footer>
  );
}
