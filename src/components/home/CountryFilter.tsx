import Link from "next/link";
import { countries, type Locale } from "@/lib/site-config";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface CountryFilterProps {
  locale: Locale;
  active?: string;
}

/** 홈 국가 필터 칩 */
export function CountryFilter({ locale, active }: CountryFilterProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <Link
        href={`/${locale}`}
        className={cn(
          "rounded-full border px-3 py-1.5 text-sm font-medium transition",
          !active
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-gray-200 bg-white text-gray-700 hover:border-blue-300",
        )}
      >
        {t(locale, "allCountriesClear")}
      </Link>
      {countries.map((country) => (
        <Link
          key={country.slug}
          href={`/${locale}?country=${country.slug}#country-${country.slug}`}
          className={cn(
            "rounded-full border px-3 py-1.5 text-sm font-medium transition",
            active === country.slug
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-gray-200 bg-white text-gray-700 hover:border-blue-300",
          )}
        >
          {country.name[locale]}
        </Link>
      ))}
    </div>
  );
}
