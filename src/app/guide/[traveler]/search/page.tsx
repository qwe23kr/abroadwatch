import Link from "next/link";
import { notFound } from "next/navigation";
import { incidentTypes, type IncidentType } from "@/lib/site-config";
import { getTravelerGuides, searchTravelerGuides } from "@/lib/traveler-content";
import { getTravelerProfile } from "@/lib/traveler-profiles";
import { travelerIncident, travelerName, travelerUi } from "@/lib/traveler-ui";

export default async function TravelerSearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ traveler: string }>;
  searchParams: Promise<{ query?: string | string[]; incident?: string | string[] }>;
}) {
  const { traveler } = await params;
  const profile = getTravelerProfile(traveler);
  if (!profile) notFound();
  const ui = travelerUi(profile);
  const values = await searchParams;
  const query = Array.isArray(values.query) ? values.query[0] : values.query ?? "";
  const incidentValue = Array.isArray(values.incident) ? values.incident[0] : values.incident;
  const incident = incidentTypes.includes(incidentValue as IncidentType) ? incidentValue as IncidentType : undefined;
  const results = incident
    ? getTravelerGuides(profile.code).filter((guide) => guide.incident === incident)
    : searchTravelerGuides(profile.code, query);
  const heading = incident ? travelerIncident(profile, incident) : `${ui.searchButton}: ${query}`;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="text-3xl font-bold text-gray-900">{heading}</h1>
      <p className="mt-2 text-gray-600">{results.length}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((guide) => (
          <Link key={`${guide.country}-${guide.city}-${guide.incident}`} href={`/${profile.code}/${guide.country}/${guide.city}/${guide.incident}`} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md">
            <span className="text-xs font-semibold text-blue-700">{travelerIncident(profile, guide.incident)}</span>
            <h2 className="mt-2 font-bold text-gray-900">{guide.frontmatter.title}</h2>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{guide.frontmatter.summary}</p>
            <p className="mt-4 text-xs text-gray-500">{travelerName(profile, guide.city)}, {travelerName(profile, guide.country)}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
