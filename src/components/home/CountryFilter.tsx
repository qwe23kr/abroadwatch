import Link from "next/link";
import { countries, type Locale } from "@/lib/site-config";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const countryEmojis: Record<string, string> = {
  japan: "🇯🇵",
  thailand: "🇹🇭",
  vietnam: "🇻🇳",
  taiwan: "🇹🇼",
  philippines: "🇵🇭",
};

interface CountryFilterProps {
  locale: Locale;
  active?: string;
}

/** 홈 국가 필터 칩 */
export function CountryFilter({ locale, active }: CountryFilterProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <Link
        href={`/${locale}#browse-countries`}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition",
          !active
            ? "border-blue-600 bg-blue-600 text-white shadow-sm"
            : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50",
        )}
      >
        {t(locale, "allCountriesClear")}
      </Link>
      {countries.map((country) => (
        <Link
          key={country.slug}
          href={`/${locale}?country=${country.slug}#country-${country.slug}`}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition",
            active === country.slug
              ? "border-blue-600 bg-blue-600 text-white shadow-sm"
              : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50",
          )}
        >
          <span aria-hidden="true">{countryEmojis[country.slug]}</span>
          {country.name[locale]}
        </Link>
      ))}
    </div>
  );
}
