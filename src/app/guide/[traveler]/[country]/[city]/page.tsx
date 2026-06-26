import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { SectionHeading } from "@/components/home/HomeSections";
import {
  getTravelerCityGuides,
  type TravelerGuide,
} from "@/lib/traveler-content";
import {
  getTravelerDestinations,
  getTravelerCity,
  getTravelerCountry,
  isDomesticTravelerDestination,
} from "@/lib/traveler-destinations";
import {
  buildTravelerBreadcrumbJsonLd,
  buildTravelerCityMetadata,
  buildTravelerItemListJsonLd,
} from "@/lib/seo";
import {
  getTravelerProfile,
  travelerProfiles,
  type TravelerProfile,
} from "@/lib/traveler-profiles";
import { travelerIncident, travelerName, travelerUi } from "@/lib/traveler-ui";

interface Props {
  params: Promise<{ traveler: string; country: string; city: string }>;
}

export function generateStaticParams() {
  return travelerProfiles.flatMap((profile) =>
    getTravelerDestinations(profile).flatMap((country) =>
      country.cities.map((city) => ({
        traveler: profile.code,
        country: country.slug,
        city: city.slug,
      })),
    ),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { traveler, country, city } = await params;
  const profile = getTravelerProfile(traveler);
  if (!profile || isDomesticTravelerDestination(profile.code, country) || !getTravelerCountry(country) || !getTravelerCity(country, city)) {
    return {};
  }
  return buildTravelerCityMetadata(profile, country, city);
}

function GuideCard({
  guide,
  profile,
}: {
  guide: TravelerGuide;
  profile: TravelerProfile;
}) {
  return (
    <TrackedLink
      href={`/${profile.code}/${guide.country}/${guide.city}/${guide.incident}`}
      eventName="hub_guide_click"
      eventParams={{
        hub: `/${profile.code}/${guide.country}/${guide.city}`,
        incident: guide.incident,
      }}
      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
    >
      <p className="text-xs font-semibold text-blue-700">
        {travelerIncident(profile, guide.incident)}
      </p>
      <h2 className="mt-2 font-bold text-gray-950">{guide.frontmatter.title}</h2>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
        {guide.frontmatter.summary}
      </p>
    </TrackedLink>
  );
}

export default async function TravelerCityPage({ params }: Props) {
  const { traveler, country, city } = await params;
  const profile = getTravelerProfile(traveler);
  const countryData = getTravelerCountry(country);
  const cityData = getTravelerCity(country, city);
  if (!profile || !countryData || !cityData || isDomesticTravelerDestination(profile.code, country)) notFound();

  const ui = travelerUi(profile);
  const countryName = travelerName(profile, country, countryData.name.en);
  const cityName = travelerName(profile, city, cityData.name.en);
  const guides = getTravelerCityGuides(profile.code, country, city);
  const relatedCities = countryData.cities.filter((item) => item.slug !== city);
  const breadcrumbJsonLd = buildTravelerBreadcrumbJsonLd([
    { name: profile.nativeName, path: `/${traveler}` },
    { name: countryName, path: `/${traveler}/${country}` },
    { name: cityName, path: `/${traveler}/${country}/${city}` },
  ]);
  const itemListJsonLd = buildTravelerItemListJsonLd(
    `${cityName} ${ui.hub}`,
    guides.map((guide) => ({
      name: guide.frontmatter.title,
      description: guide.frontmatter.summary,
      path: `/${traveler}/${guide.country}/${guide.city}/${guide.incident}`,
    })),
  );

  return (
    <>
      <Script
        id="traveler-city-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="traveler-city-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href={`/${traveler}`} className="hover:text-blue-700">
            {profile.flag} {profile.nativeName}
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/${traveler}/${country}`} className="hover:text-blue-700">
            {countryName}
          </Link>
          <span className="mx-2">/</span>
          <span>{cityName}</span>
        </nav>

        <header className="mb-10 rounded-3xl bg-gradient-to-br from-slate-950 to-blue-700 p-6 text-white md:p-10">
          <p className="text-sm font-semibold text-blue-200">{countryName}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
            {cityName}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-blue-100 md:text-base">
            {ui.subtitle}
          </p>
        </header>

        <section className="mb-12">
          <SectionHeading title={ui.browseIncident} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <GuideCard key={guide.incident} guide={guide} profile={profile} />
            ))}
          </div>
        </section>

        {relatedCities.length > 0 && (
          <section>
            <SectionHeading title={ui.browseCountry} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCities.map((relatedCity) => (
                <TrackedLink
                  key={relatedCity.slug}
                  href={`/${traveler}/${country}/${relatedCity.slug}`}
                  eventName="related_city_click"
                  eventParams={{
                    from: `/${traveler}/${country}/${city}`,
                    to_city: relatedCity.slug,
                  }}
                  className="rounded-2xl border border-gray-200 bg-white p-5 font-bold text-gray-950 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                >
                  {travelerName(profile, relatedCity.slug, relatedCity.name.en)}
                </TrackedLink>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
