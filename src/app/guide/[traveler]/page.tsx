import Form from "next/form";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmergencyFab } from "@/components/layout/EmergencyFab";
import { SectionHeading } from "@/components/home/HomeSections";
import { incidentIcons } from "@/lib/incident-ui";
import { buildTravelerHomeMetadata } from "@/lib/seo";
import { incidentTypes } from "@/lib/site-config";
import { getTravelerDestinations } from "@/lib/traveler-destinations";
import {
  getLatestTravelerGuides,
  getPopularTravelerGuides,
  type TravelerGuide,
} from "@/lib/traveler-content";
import { getTravelerProfile, travelerProfiles, type TravelerProfile } from "@/lib/traveler-profiles";
import { travelerIncident, travelerName, travelerUi } from "@/lib/traveler-ui";

export function generateStaticParams() {
  return travelerProfiles.map((profile) => ({ traveler: profile.code }));
}

/** 국적별 홈 메타데이터 — 사이트 제목·설명·OG */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ traveler: string }>;
}): Promise<Metadata> {
  const { traveler } = await params;
  const profile = getTravelerProfile(traveler);
  if (!profile) return {};
  return buildTravelerHomeMetadata(profile);
}

function TravelerGuideCard({ guide, profile }: { guide: TravelerGuide; profile: TravelerProfile }) {
  return (
    <Link
      href={`/${profile.code}/${guide.country}/${guide.city}/${guide.incident}`}
      className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
    >
      <span className="mb-2 inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
        {travelerIncident(profile, guide.incident)}
      </span>
      <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-blue-600">{guide.frontmatter.title}</h3>
      <p className="mb-3 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">{guide.frontmatter.summary}</p>
      <span className="text-xs font-medium text-gray-500">
        {travelerName(profile, guide.city)}, {travelerName(profile, guide.country)}
      </span>
    </Link>
  );
}

export default async function TravelerHomePage({ params }: { params: Promise<{ traveler: string }> }) {
  const { traveler } = await params;
  const profile = getTravelerProfile(traveler);
  if (!profile) notFound();
  const ui = travelerUi(profile);
  const popularGuides = getPopularTravelerGuides(profile.code, 7);
  const latestGuides = getLatestTravelerGuides(profile.code, 6);
  const destinations = getTravelerDestinations(profile);
  const cityCount = destinations.reduce((sum, country) => sum + country.cities.length, 0);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 px-4 py-16 text-white md:py-24">
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold text-blue-200">{profile.flag} {profile.nativeName}</p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">{ui.hero}</h1>
          <p className="mx-auto max-w-3xl text-base text-blue-100 md:text-lg">{ui.subtitle}</p>
          <Form action={`/${profile.code}/search`} className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-2xl bg-white/10 p-2 backdrop-blur-sm sm:flex-row">
            <label htmlFor="traveler-guide-search" className="sr-only">{ui.searchPlaceholder}</label>
            <input id="traveler-guide-search" name="query" type="search" required placeholder={ui.searchPlaceholder} className="min-w-0 flex-1 rounded-xl bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-blue-300" />
            <button type="submit" className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 sm:w-auto">{ui.searchButton}</button>
          </Form>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <section className="mb-16 overflow-hidden rounded-2xl bg-slate-900 px-6 py-8 text-white md:px-10 md:py-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-blue-300">ABROADWATCH COVERAGE</p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">{ui.hub}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{ui.official}</p>
              <p className="mt-3 text-sm font-semibold text-blue-300">{profile.consularHotline}</p>
            </div>
            <dl className="grid grid-cols-3 gap-3">
              {[[destinations.length, "Countries"], [cityCount, "Cities"], [cityCount * incidentTypes.length, "Guides"]].map(([value, label]) => (
                <div key={label} className="rounded-xl bg-white/10 p-4 text-center"><dt className="text-2xl font-bold md:text-3xl">{value}</dt><dd className="mt-1 text-xs text-slate-300 md:text-sm">{label}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mb-16">
          <SectionHeading title={ui.popular} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{popularGuides.map((guide) => <TravelerGuideCard key={`${guide.country}-${guide.city}-${guide.incident}`} guide={guide} profile={profile} />)}</div>
        </section>

        <section className="mb-16" id="browse-countries">
          <SectionHeading title={ui.browseCountry} description={ui.browseCountryDescription} />
          <div className="grid gap-6 lg:grid-cols-2">
            {destinations.map((country) => (
              <article key={country.slug} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <Link href={`/${profile.code}/${country.slug}`} className="block bg-gradient-to-r from-blue-700 to-cyan-600 px-5 py-4 text-white transition hover:from-blue-800 hover:to-cyan-700"><h3 className="text-xl font-bold">{travelerName(profile, country.slug, country.name.en)}</h3></Link>
                <div className="space-y-5 p-5">{country.cities.map((city) => (
                  <div key={city.slug}><Link href={`/${profile.code}/${country.slug}/${city.slug}`} className="mb-2 inline-block font-semibold text-gray-800 hover:text-blue-700">{travelerName(profile, city.slug, city.name.en)}</Link><div className="flex flex-wrap gap-2">{incidentTypes.map((incident) => (
                    <Link key={incident} href={`/${profile.code}/${country.slug}/${city.slug}/${incident}`} className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-blue-300 hover:bg-blue-50">{travelerIncident(profile, incident)}</Link>
                  ))}</div></div>
                ))}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <SectionHeading title={ui.browseIncident} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{incidentTypes.map((incident) => (
            <Link key={incident} href={`/${profile.code}/search?incident=${incident}`} className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md">
              <div className="mb-3 flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-xl">{incidentIcons[incident]}</span><h3 className="font-bold text-gray-900 group-hover:text-blue-700">{travelerIncident(profile, incident)}</h3></div>
              <span className="text-sm font-semibold text-blue-600">{cityCount} →</span>
            </Link>
          ))}</div>
        </section>

        <section className="mb-16">
          <SectionHeading title={ui.latest} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{latestGuides.map((guide) => <TravelerGuideCard key={`${guide.country}-${guide.city}-${guide.incident}`} guide={guide} profile={profile} />)}</div>
        </section>

        <section>
          <SectionHeading title={ui.faq} />
          <div className="space-y-3">{[[ui.faq1q, ui.faq1a], [ui.faq2q, ui.faq2a], [ui.faq3q, ui.faq3a]].map(([question, answer]) => (
            <details key={question} className="group rounded-xl border border-gray-200 bg-white"><summary className="cursor-pointer list-none px-5 py-4 font-medium text-gray-900 hover:bg-gray-50">{question}<span className="float-right text-blue-600">⌄</span></summary><div className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-700">{answer}</div></details>
          ))}</div>
        </section>
      </div>

      <EmergencyFab locale={profile.language === "ko" ? "ko" : "en"} phone={profile.consularHotline} label={ui.emergency} />
    </>
  );
}
