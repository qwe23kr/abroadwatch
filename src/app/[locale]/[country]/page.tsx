import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/home/HomeSections";
import {
  getCountryHubPath,
  getCountryIncidentHubPath,
  getCityHubPath,
} from "@/lib/content";
import { t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { buildCountryHubTitle } from "@/lib/seo-titles";
import {
  countries,
  getCountry,
  isValidLocale,
  type Locale,
} from "@/lib/site-config";

interface CountryHubPageProps {
  params: Promise<{ locale: string; country: string }>;
}

export function generateStaticParams() {
  const params: Array<{ locale: Locale; country: string }> = [];
  for (const locale of ["ko", "en"] as const) {
    for (const country of countries) {
      params.push({ locale, country: country.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: CountryHubPageProps): Promise<Metadata> {
  const { locale: lp, country } = await params;
  if (!isValidLocale(lp) || !getCountry(country)) return {};
  const locale = lp as Locale;
  const countryData = getCountry(country)!;

  return buildMetadata({
    locale,
    title: buildCountryHubTitle(locale, country),
    description: `${countryData.name[locale]} ${t(locale, "countryHubDescription")}`,
    path: `/${locale}/${country}`,
    alternatePaths: { ko: `/ko/${country}`, en: `/en/${country}` },
  });
}

/** 국가 허브 — 도시 목록 + 사기·병원 랜딩 */
export default async function CountryHubPage({ params }: CountryHubPageProps) {
  const { locale: lp, country } = await params;
  if (!isValidLocale(lp) || !getCountry(country)) notFound();

  const locale = lp as Locale;
  const countryData = getCountry(country)!;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <Breadcrumbs
        items={[
          { label: t(locale, "home"), href: `/${locale}` },
          { label: countryData.name[locale] },
        ]}
      />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
          {countryData.name[locale]} — {t(locale, "countryHubTitle")}
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">{t(locale, "countryHubDescription")}</p>
      </header>

      <div className="mb-10 flex flex-wrap gap-3">
        <Link
          href={getCountryIncidentHubPath(locale, country, "scam")}
          className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900 hover:bg-amber-100"
        >
          ⚠️ {t(locale, "countryIncidentHubScam")}
        </Link>
        <Link
          href={getCountryIncidentHubPath(locale, country, "hospital")}
          className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-900 hover:bg-blue-100"
        >
          🏥 {t(locale, "countryIncidentHubHospital")}
        </Link>
      </div>

      <SectionHeading title={t(locale, "browseByCountry")} />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {countryData.cities.map((city) => (
          <li key={city.slug}>
            <Link
              href={getCityHubPath(locale, country, city.slug)}
              className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-gray-900">{city.name[locale]}</h2>
              <p className="mt-1 text-sm text-gray-600">{t(locale, "cityHubDescription")}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
