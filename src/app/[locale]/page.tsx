import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import {
  CountryGrid,
  CoverageAndTrust,
  FaqSection,
  Hero,
  IncidentGrid,
  SectionHeading,
} from "@/components/home/HomeSections";
import { CountryFilter } from "@/components/home/CountryFilter";
import { EmergencyFab } from "@/components/layout/EmergencyFab";
import { GuideCard } from "@/components/ui/GuideCard";
import { getLatestGuides, getPopularGuides } from "@/lib/content";
import { t } from "@/lib/i18n";
import { buildFaqJsonLd, buildMetadata, buildWebsiteJsonLd } from "@/lib/seo";
import { buildHomeTabTitle } from "@/lib/seo-titles";
import { countries, getCountry, isValidLocale, type Locale } from "@/lib/site-config";

interface HomePageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ country?: string | string[] }>;
}

/** 로케일별 홈페이지 메타데이터 */
export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) return {};
  const locale = localeParam as Locale;

  return buildMetadata({
    locale,
    title: buildHomeTabTitle(locale),
    description: t(locale, "siteDescription"),
    path: `/${locale}`,
    alternatePaths: { ko: "/ko", en: "/en" },
  });
}

/** 로케일별 홈페이지 */
export default async function HomePage({ params, searchParams }: HomePageProps) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();
  const locale = localeParam as Locale;

  const countryParam = (await searchParams).country;
  const rawCountry = Array.isArray(countryParam) ? countryParam[0] : countryParam;
  const filterCountry =
    rawCountry && getCountry(rawCountry) ? rawCountry : undefined;

  const latestGuides = getLatestGuides(locale, 6);
  const popularGuides = getPopularGuides(locale, 7);

  const faqItems = [
    { question: t(locale, "faqHome1Q"), answer: t(locale, "faqHome1A") },
    { question: t(locale, "faqHome2Q"), answer: t(locale, "faqHome2A") },
    { question: t(locale, "faqHome3Q"), answer: t(locale, "faqHome3A") },
  ];

  return (
    <>
      <Script
        id="website-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildWebsiteJsonLd()),
        }}
      />
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqJsonLd(faqItems)),
        }}
      />

      <Hero locale={locale} />

      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <CoverageAndTrust locale={locale} />
        {popularGuides.length > 0 && (
          <section className="mb-16">
            <SectionHeading title={t(locale, "popularGuides")} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {popularGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>
        )}

        <section className="mb-16" id="browse-countries">
          <SectionHeading
            title={t(locale, "browseByCountry")}
            description={t(locale, "browseCountryDescription")}
          />
          <CountryFilter locale={locale} active={filterCountry} />
          <CountryGrid locale={locale} filterCountry={filterCountry} />
        </section>

        <section className="mb-16">
          <SectionHeading
            title={t(locale, "browseByIncident")}
            description={t(locale, "browseIncidentDescription")}
          />
          <IncidentGrid locale={locale} />
        </section>

        {latestGuides.length > 0 && (
          <section className="mb-16">
            <SectionHeading title={t(locale, "latestGuides")} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latestGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>
        )}

        <section>
          <SectionHeading title={t(locale, "faq")} />
          <FaqSection locale={locale} />
        </section>
      </div>

      <EmergencyFab locale={locale} />
    </>
  );
}
