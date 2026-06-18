import Link from "next/link";
import { IncidentGuideChip } from "@/components/ui/IncidentGuideChip";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  countries,
  incidentTypes,
  type CountryConfig,
  type Locale,
} from "@/lib/site-config";

interface CountryGridProps {
  locale: Locale;
  filterCountry?: string;
}

const countryTheme: Record<
  string,
  { accent: string; bg: string; ring: string; emoji: string }
> = {
  japan: {
    accent: "from-rose-500 to-red-600",
    bg: "bg-rose-50/80",
    ring: "ring-rose-100",
    emoji: "🇯🇵",
  },
  thailand: {
    accent: "from-amber-500 to-orange-600",
    bg: "bg-amber-50/80",
    ring: "ring-amber-100",
    emoji: "🇹🇭",
  },
  vietnam: {
    accent: "from-red-500 to-rose-600",
    bg: "bg-red-50/80",
    ring: "ring-red-100",
    emoji: "🇻🇳",
  },
  taiwan: {
    accent: "from-sky-500 to-blue-600",
    bg: "bg-sky-50/80",
    ring: "ring-sky-100",
    emoji: "🇹🇼",
  },
  philippines: {
    accent: "from-indigo-500 to-blue-600",
    bg: "bg-indigo-50/80",
    ring: "ring-indigo-100",
    emoji: "🇵🇭",
  },
};

/** 국가별 탐색 — 도시 카드 + 상황 목록 */
export function CountryGrid({ locale, filterCountry }: CountryGridProps) {
  const visible = filterCountry
    ? countries.filter((c) => c.slug === filterCountry)
    : countries;

  return (
    <div
      className={cn(
        "grid gap-6",
        filterCountry ? "grid-cols-1" : "lg:grid-cols-2",
      )}
    >
      {visible.map((country) => (
        <CountryBrowseCard
          key={country.slug}
          country={country}
          locale={locale}
          expanded={!!filterCountry}
        />
      ))}
    </div>
  );
}

function CountryBrowseCard({
  country,
  locale,
  expanded,
}: {
  country: CountryConfig;
  locale: Locale;
  expanded: boolean;
}) {
  const theme = countryTheme[country.slug] ?? countryTheme.japan;
  const cityLabel =
    locale === "ko"
      ? `${country.cities.length}개 도시 · 6가지 비상 가이드`
      : `${country.cities.length} cities · 6 emergency guides`;

  return (
    <article
      id={`country-${country.slug}`}
      className={cn(
        "scroll-mt-24 overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition hover:shadow-md",
        theme.ring,
        "ring-1 ring-inset",
      )}
    >
      <div className={cn("bg-gradient-to-r px-4 py-4 text-white sm:px-5", theme.accent)}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 text-2xl backdrop-blur-sm"
              aria-hidden="true"
            >
              {theme.emoji}
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-bold tracking-tight">
                <Link
                  href={`/${locale}/${country.slug}`}
                  className="rounded hover:underline focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  {country.name[locale]}
                </Link>
              </h3>
              <p className="text-sm leading-snug text-white/90">{cityLabel}</p>
            </div>
          </div>
          <Link
            href={`/${locale}/${country.slug}`}
            className="inline-flex w-full items-center justify-center rounded-lg bg-white/15 px-3 py-2 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/25 sm:w-auto sm:py-1.5 sm:text-xs"
          >
            {locale === "ko" ? "국가 가이드 보기 →" : "View country guides →"}
          </Link>
        </div>
      </div>

      <div className={cn("p-2.5 sm:p-3", theme.bg)}>
        <ul
          className={cn(
            "grid gap-2",
            expanded ? "sm:grid-cols-2" : "grid-cols-1",
          )}
        >
          {country.cities.map((city) => (
            <li key={city.slug}>
              <CityBrowseCard country={country} city={city} locale={locale} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** 도시별 카드 — 컴팩트 상황 칩 */
function CityBrowseCard({
  country,
  city,
  locale,
}: {
  country: CountryConfig;
  city: CountryConfig["cities"][number];
  locale: Locale;
}) {
  const hubPath = `/${locale}/${country.slug}/${city.slug}`;

  return (
    <div className="rounded-lg border border-white/60 bg-white p-2.5 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <Link
          href={hubPath}
          className="text-sm font-bold text-gray-900 hover:text-blue-700"
        >
          {city.name[locale]}
        </Link>
        <Link
          href={hubPath}
          className="shrink-0 text-[11px] font-semibold text-blue-600 hover:underline"
        >
          {locale === "ko" ? "전체 →" : "All →"}
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-1.5 min-[480px]:grid-cols-3">
        {incidentTypes.map((incident) => (
          <li key={incident}>
            <IncidentGuideChip
              locale={locale}
              country={country.slug}
              city={city.slug}
              incident={incident}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
