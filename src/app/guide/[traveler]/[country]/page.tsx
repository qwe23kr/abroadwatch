import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { SectionHeading } from "@/components/home/HomeSections";
import {
  getTravelerCountryGuides,
  type TravelerGuide,
} from "@/lib/traveler-content";
import {
  getTravelerCountry,
  travelerDestinations,
} from "@/lib/traveler-destinations";
import {
  buildTravelerBreadcrumbJsonLd,
  buildTravelerCountryMetadata,
  buildTravelerItemListJsonLd,
} from "@/lib/seo";
import { incidentTypes } from "@/lib/site-config";
import {
  getTravelerProfile,
  travelerProfiles,
  type TravelerProfile,
} from "@/lib/traveler-profiles";
import { travelerIncident, travelerName, travelerUi } from "@/lib/traveler-ui";

interface Props {
  params: Promise<{ traveler: string; country: string }>;
}

export function generateStaticParams() {
  return travelerProfiles.flatMap((profile) =>
    travelerDestinations.map((country) => ({
      traveler: profile.code,
      country: country.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { traveler, country } = await params;
  const profile = getTravelerProfile(traveler);
  if (!profile || !getTravelerCountry(country)) return {};
  return buildTravelerCountryMetadata(profile, country);
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
        hub: `/${profile.code}/${guide.country}`,
        city: guide.city,
        incident: guide.incident,
      }}
      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
    >
      <p className="text-xs font-semibold text-blue-700">
        {travelerName(profile, guide.city)} · {travelerIncident(profile, guide.incident)}
      </p>
      <h2 className="mt-2 font-bold text-gray-950">{guide.frontmatter.title}</h2>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
        {guide.frontmatter.summary}
      </p>
    </TrackedLink>
  );
}

export default async function TravelerCountryPage({ params }: Props) {
  const { traveler, country } = await params;
  const profile = getTravelerProfile(traveler);
  const countryData = getTravelerCountry(country);
  if (!profile || !countryData) notFound();

  const ui = travelerUi(profile);
  const countryName = travelerName(profile, country, countryData.name.en);
  const guides = getTravelerCountryGuides(profile.code, country);
  const breadcrumbJsonLd = buildTravelerBreadcrumbJsonLd([
    { name: profile.nativeName, path: `/${traveler}` },
    { name: countryName, path: `/${traveler}/${country}` },
  ]);
  const itemListJsonLd = buildTravelerItemListJsonLd(
    `${countryName} ${ui.hub}`,
    guides.map((guide) => ({
      name: guide.frontmatter.title,
      description: guide.frontmatter.summary,
      path: `/${traveler}/${guide.country}/${guide.city}/${guide.incident}`,
    })),
  );

  return (
    <>
      <Script
        id="traveler-country-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="traveler-country-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href={`/${traveler}`} className="hover:text-blue-700">
            {profile.flag} {profile.nativeName}
          </Link>
          <span className="mx-2">/</span>
          <span>{countryName}</span>
        </nav>

        <header className="mb-10 rounded-3xl bg-gradient-to-br from-blue-700 to-slate-950 p-6 text-white md:p-10">
          <p className="text-sm font-semibold text-blue-200">{profile.nativeName}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
            {countryName}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-blue-100 md:text-base">
            {ui.subtitle}
          </p>
        </header>

        <section className="mb-12">
          <SectionHeading title={ui.browseCountry} description={ui.browseCountryDescription} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {countryData.cities.map((city) => (
              <TrackedLink
                key={city.slug}
                href={`/${traveler}/${country}/${city.slug}`}
                eventName="country_city_click"
                eventParams={{ from: `/${traveler}/${country}`, city: city.slug }}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
              >
                <h2 className="text-lg font-bold text-gray-950">
                  {travelerName(profile, city.slug, city.name.en)}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  {incidentTypes.length} guides
                </p>
              </TrackedLink>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading title={ui.browseIncident} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <GuideCard
                key={`${guide.city}-${guide.incident}`}
                guide={guide}
                profile={profile}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
