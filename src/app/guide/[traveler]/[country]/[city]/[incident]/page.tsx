import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx/MdxContent";
import { EmergencyFab } from "@/components/layout/EmergencyFab";
import { getAllTravelerGuideParams, getTravelerGuide } from "@/lib/traveler-content";
import { getTravelerProfile } from "@/lib/traveler-profiles";
import { travelerIncident, travelerName, travelerUi } from "@/lib/traveler-ui";
import { getCity, getCountry, isValidIncident, type IncidentType, type Locale } from "@/lib/site-config";

interface Props {
  params: Promise<{ traveler: string; country: string; city: string; incident: string }>;
}

export function generateStaticParams() {
  return getAllTravelerGuideParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { traveler, country, city, incident } = await params;
  const profile = getTravelerProfile(traveler);
  if (!profile || !isValidIncident(incident)) return {};
  const guide = getTravelerGuide(profile.code, country, city, incident);
  if (!guide) return {};
  return {
    title: guide.frontmatter.title,
    description: guide.frontmatter.summary,
    alternates: { canonical: `/${traveler}/${country}/${city}/${incident}` },
  };
}

export default async function TravelerGuidePage({ params }: Props) {
  const { traveler, country, city, incident } = await params;
  const profile = getTravelerProfile(traveler);
  if (!profile || !isValidIncident(incident) || !getCountry(country) || !getCity(country, city)) notFound();
  const guide = getTravelerGuide(profile.code, country, city, incident as IncidentType);
  if (!guide) notFound();
  const locale: Locale = traveler === "kr" ? "ko" : "en";
  const ui = travelerUi(profile);

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-8 pb-24 md:px-6 md:py-12">
        <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href={`/${traveler}`} className="hover:text-blue-700">{profile.flag} {profile.nativeName}</Link>
          <span className="mx-2">/</span>
          <span>{travelerName(profile, city, getCity(country, city)?.name.en ?? city)}</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{guide.frontmatter.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">{guide.frontmatter.summary}</p>
          <dl className="mt-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
            <div className="rounded-lg bg-red-50 p-3"><dt className="text-xs text-red-700">{ui.emergency}</dt><dd className="font-bold text-red-800">{guide.frontmatter.emergencyNumber}</dd></div>
            <div className="rounded-lg bg-gray-50 p-3"><dt className="text-xs text-gray-500">{ui.updated}</dt><dd className="font-semibold">{guide.frontmatter.updatedAt}</dd></div>
            <div className="rounded-lg bg-gray-50 p-3"><dt className="text-xs text-gray-500">{ui.nationality}</dt><dd className="font-semibold">{profile.nativeName}</dd></div>
          </dl>
        </header>

        <div className="prose-guide">
          <MdxContent source={guide.content} locale={locale} uiLanguage={profile.language} />
        </div>

        <section className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="mb-4 text-lg font-bold">{ui.other}</h2>
          <div className="flex flex-wrap gap-2">
            {(["lost-passport", "lost-phone", "lost-wallet", "hospital", "police-report", "scam"] as const).filter((item) => item !== incident).map((item) => (
              <Link key={item} href={`/${traveler}/${country}/${city}/${item}`} className="rounded-full border border-gray-200 px-3 py-2 text-sm hover:bg-blue-50">{travelerIncident(profile, item)}</Link>
            ))}
          </div>
        </section>
      </article>
      <EmergencyFab locale={locale} phone={guide.frontmatter.emergencyNumber} label={guide.frontmatter.title} />
    </>
  );
}
