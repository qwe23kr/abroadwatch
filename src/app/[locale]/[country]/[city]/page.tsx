import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideCard } from "@/components/ui/GuideCard";
import { IncidentGuideLink } from "@/components/ui/IncidentGuideLink";
import { EmergencyFab } from "@/components/layout/EmergencyFab";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/home/HomeSections";
import {
  getAllGuides,
  getCityGuides,
  getCountryHubPath,
} from "@/lib/content";
import { getCityEmergency } from "@/lib/emergency";
import { t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { buildCityHubTitle, buildCountryIncidentHubTitle } from "@/lib/seo-titles";
import {
  countries,
  getCity,
  getCountry,
  incidentLabels,
  incidentTypes,
  isValidIncident,
  isValidLocale,
  type IncidentType,
  type Locale,
} from "@/lib/site-config";

const SEO_INCIDENTS = ["scam", "hospital"] as const;

interface SegmentPageProps {
  params: Promise<{ locale: string; country: string; city: string }>;
}

function isSeoIncident(segment: string): segment is (typeof SEO_INCIDENTS)[number] {
  return SEO_INCIDENTS.includes(segment as (typeof SEO_INCIDENTS)[number]);
}

export function generateStaticParams() {
  const params: Array<{ locale: Locale; country: string; city: string }> = [];
  for (const locale of ["ko", "en"] as const) {
    for (const country of countries) {
      for (const city of country.cities) {
        params.push({ locale, country: country.slug, city: city.slug });
      }
      for (const incident of SEO_INCIDENTS) {
        params.push({ locale, country: country.slug, city: incident });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: SegmentPageProps): Promise<Metadata> {
  const { locale: lp, country, city: segment } = await params;
  if (!isValidLocale(lp) || !getCountry(country)) return {};
  const locale = lp as Locale;
  const countryData = getCountry(country)!;

  if (isSeoIncident(segment)) {
    const metadata = buildMetadata({
      locale,
      title: buildCountryIncidentHubTitle(locale, country, segment),
      description: t(locale, "countryIncidentHubDescription"),
      path: `/${locale}/${country}/${segment}`,
      alternatePaths: {
        ko: `/ko/${country}/${segment}`,
        en: `/en/${country}/${segment}`,
      },
    });
    return { ...metadata, robots: { index: false, follow: true } };
  }

  const cityData = getCity(country, segment);
  if (!cityData) return {};

  const metadata = buildMetadata({
    locale,
    title: buildCityHubTitle(locale, country, segment),
    description: `${cityData.name[locale]}, ${countryData.name[locale]} — ${t(locale, "cityHubDescription")}`,
    path: `/${locale}/${country}/${segment}`,
    alternatePaths: { ko: `/ko/${country}/${segment}`, en: `/en/${country}/${segment}` },
  });
  return { ...metadata, robots: { index: false, follow: true } };
}

/** 도시 허브 또는 국가별 사기·병원 SEO 랜딩 */
export default async function CityOrIncidentHubPage({ params }: SegmentPageProps) {
  const { locale: lp, country, city: segment } = await params;
  if (!isValidLocale(lp) || !getCountry(country)) notFound();
  const locale = lp as Locale;
  const countryData = getCountry(country)!;

  if (isSeoIncident(segment) && isValidIncident(segment)) {
    const incident = segment as IncidentType;
    const guides = getAllGuides().filter(
      (g) => g.locale === locale && g.country === country && g.incident === incident,
    );
    const title =
      incident === "scam"
        ? `${countryData.name[locale]} ${t(locale, "countryIncidentHubScam")}`
        : `${countryData.name[locale]} ${t(locale, "countryIncidentHubHospital")}`;

    return (
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <Breadcrumbs
          items={[
            { label: t(locale, "home"), href: `/${locale}` },
            { label: countryData.name[locale], href: getCountryHubPath(locale, country) },
            { label: incidentLabels[incident][locale] },
          ]}
        />
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            {t(locale, "countryIncidentHubDescription")}
          </p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </div>
    );
  }

  const cityData = getCity(country, segment);
  if (!cityData) notFound();

  const guides = getCityGuides(locale, country, segment);
  const emergency = getCityEmergency(locale, country, segment);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-10 pb-24 md:px-6 md:py-14 md:pb-28">
        <Breadcrumbs
          items={[
            { label: t(locale, "home"), href: `/${locale}` },
            { label: countryData.name[locale], href: getCountryHubPath(locale, country) },
            { label: cityData.name[locale] },
          ]}
        />
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {cityData.name[locale]} — {t(locale, "cityHubTitle")}
          </h1>
          <p className="mt-3 max-w-2xl text-gray-600">{t(locale, "cityHubDescription")}</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm">
            <span className="font-medium text-red-700">{locale === "ko" ? "긴급번호" : "Emergency"}</span>
            <a href={`tel:${emergency.number}`} className="font-bold text-red-800">
              {emergency.number}
            </a>
          </div>
        </header>

        <div className="mb-8 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {incidentTypes.map((incident) => (
            <IncidentGuideLink
              key={incident}
              locale={locale}
              country={country}
              city={segment}
              incident={incident}
            />
          ))}
        </div>

        <SectionHeading title={t(locale, "viewGuide")} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </div>
      <EmergencyFab locale={locale} phone={emergency.number} label={cityData.name[locale]} />
    </>
  );
}
