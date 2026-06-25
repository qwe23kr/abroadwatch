import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { TravelerDepthSection } from "@/components/guide/TravelerDepthSection";
import { MdxContent } from "@/components/mdx/MdxContent";
import { EmergencyFab } from "@/components/layout/EmergencyFab";
import { getAllTravelerGuideParams, getTravelerGuide } from "@/lib/traveler-content";
import { getTravelerProfile } from "@/lib/traveler-profiles";
import { getTravelerCity, getTravelerCountry } from "@/lib/traveler-destinations";
import { travelerIncident, travelerName, travelerTagCopy, travelerUi } from "@/lib/traveler-ui";
import {
  buildFaqJsonLd,
  buildTravelerArticleJsonLd,
  buildTravelerBreadcrumbJsonLd,
  buildTravelerGuideMetadata,
} from "@/lib/seo";
import { isValidIncident, type IncidentType, type Locale } from "@/lib/site-config";

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
  return buildTravelerGuideMetadata(profile, country, city, incident, guide.frontmatter);
}

export default async function TravelerGuidePage({ params }: Props) {
  const { traveler, country, city, incident } = await params;
  const profile = getTravelerProfile(traveler);
  if (!profile || !isValidIncident(incident) || !getTravelerCountry(country) || !getTravelerCity(country, city)) notFound();
  const guide = getTravelerGuide(profile.code, country, city, incident as IncidentType);
  if (!guide) notFound();
  const locale: Locale = traveler === "kr" ? "ko" : "en";
  const ui = travelerUi(profile);
  const tagCopy = travelerTagCopy(profile);
  const cityName = travelerName(profile, city, getTravelerCity(country, city)?.name.en ?? city);
  const countryName = travelerName(profile, country, getTravelerCountry(country)?.name.en ?? country);
  const incidentName = travelerIncident(profile, incident as IncidentType);
  const canonicalPath = `/${traveler}/${country}/${city}/${incident}`;
  const breadcrumbJsonLd = buildTravelerBreadcrumbJsonLd([
    { name: profile.nativeName, path: `/${traveler}` },
    { name: countryName, path: `/${traveler}/${country}` },
    { name: cityName, path: `/${traveler}/${country}/${city}` },
    { name: incidentName, path: canonicalPath },
  ]);
  const articleJsonLd = buildTravelerArticleJsonLd(profile, {
    countryName,
    cityName,
    incidentName,
    path: canonicalPath,
    title: guide.frontmatter.title,
    description: guide.frontmatter.summary,
    updatedAt: guide.frontmatter.updatedAt,
  });
  const faqItems = Array.from(
    guide.content.matchAll(/<FaqItem question="([^"]+)">\s*([\s\S]*?)\s*<\/FaqItem>/g),
    (match) => ({ question: match[1], answer: match[2].replace(/[*_`]/g, "").trim() }),
  );
  const hashtag = (value: string) => `#${value.replace(/[\s·・,.'’/()\-]/g, "")}`;
  const tags = [
    { label: hashtag(`${cityName}${tagCopy.city}`), href: `/${traveler}/search?query=${encodeURIComponent(cityName)}` },
    { label: hashtag(incidentName), href: `/${traveler}/search?incident=${incident}` },
    { label: hashtag(`${countryName}${tagCopy.country}`), href: `/${traveler}/search?query=${encodeURIComponent(countryName)}` },
    { label: hashtag(`${profile.nativeName}${tagCopy.traveler}`), href: `/${traveler}` },
    { label: hashtag(tagCopy.guide), href: `/${traveler}/search?incident=${incident}` },
  ];
  const relatedCitiesLabel = ({
    ko: "관련 도시 가이드",
    "zh-Hans": "相关城市指南",
    ja: "関連都市のガイド",
    "zh-Hant": "相關城市指南",
    th: "คู่มือเมืองที่เกี่ยวข้อง",
    vi: "Hướng dẫn thành phố liên quan",
    en: "Related city guides",
  } as const)[profile.language];
  const relatedCities = getTravelerCountry(country)!.cities.filter((item) => item.slug !== city);

  return (
    <>
      <Script
        id="traveler-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="traveler-article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqItems.length > 0 && (
        <Script
          id="traveler-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(faqItems)) }}
        />
      )}
      <article className="mx-auto max-w-3xl px-4 py-8 pb-24 md:px-6 md:py-12">
        <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href={`/${traveler}`} className="hover:text-blue-700">{profile.flag} {profile.nativeName}</Link>
          <span className="mx-2">/</span>
          <Link href={`/${traveler}/${country}`} className="hover:text-blue-700">{countryName}</Link>
          <span className="mx-2">/</span>
          <Link href={`/${traveler}/${country}/${city}`} className="hover:text-blue-700">{cityName}</Link>
          <span className="mx-2">/</span>
          <span>{incidentName}</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{guide.frontmatter.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">{guide.frontmatter.summary}</p>
          <dl className="mt-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
            <div className="rounded-lg bg-red-50 p-3"><dt className="text-xs text-red-700">{ui.emergency}</dt><dd className="font-bold text-red-800">{guide.frontmatter.emergencyNumber}</dd></div>
            <div className="rounded-lg bg-gray-50 p-3"><dt className="text-xs text-gray-500">{ui.updated}</dt><dd className="font-semibold">{guide.frontmatter.updatedAt}</dd></div>
            <div className="rounded-lg bg-gray-50 p-3"><dt className="text-xs text-gray-500">{ui.nationality}</dt><dd className="font-semibold">{profile.nativeName}</dd></div>
          </dl>
          <nav className="mt-5" aria-label={tagCopy.heading}>
            <p className="sr-only">{tagCopy.heading}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100 hover:text-blue-900"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        <div className="prose-guide">
          <MdxContent source={guide.content} locale={locale} uiLanguage={profile.language} />
        </div>

        <TravelerDepthSection
          profile={profile}
          countryName={countryName}
          cityName={cityName}
          incidentName={incidentName}
          incident={incident as IncidentType}
        />

        <section className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="mb-4 text-lg font-bold">{ui.other}</h2>
          <div className="flex flex-wrap gap-2">
            {(["lost-passport", "lost-phone", "lost-wallet", "hospital", "police-report", "scam"] as const).filter((item) => item !== incident).map((item) => (
              <TrackedLink
                key={item}
                href={`/${traveler}/${country}/${city}/${item}`}
                eventName="related_page_click"
                eventParams={{ from: canonicalPath, to_incident: item, relation: "same_city" }}
                className="rounded-full border border-gray-200 px-3 py-2 text-sm hover:bg-blue-50"
              >
                {travelerIncident(profile, item)}
              </TrackedLink>
            ))}
          </div>
        </section>

        {relatedCities.length > 0 && (
          <section className="mt-10 border-t border-gray-200 pt-8">
            <h2 className="mb-4 text-lg font-bold">{relatedCitiesLabel}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedCities.map((relatedCity) => (
                <TrackedLink
                  key={relatedCity.slug}
                  href={`/${traveler}/${country}/${relatedCity.slug}/${incident}`}
                  eventName="related_page_click"
                  eventParams={{ from: canonicalPath, to_city: relatedCity.slug, relation: "same_incident" }}
                  className="rounded-xl border border-gray-200 bg-white p-4 font-semibold text-gray-800 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
                >
                  {travelerName(profile, relatedCity.slug, relatedCity.name.en)} · {travelerIncident(profile, incident as IncidentType)} →
                </TrackedLink>
              ))}
            </div>
          </section>
        )}
      </article>
      <EmergencyFab locale={locale} phone={guide.frontmatter.emergencyNumber} label={guide.frontmatter.title} />
    </>
  );
}
