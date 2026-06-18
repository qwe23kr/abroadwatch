import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePageLayout } from "@/components/guide/GuidePageLayout";
import {
  getAllGuideParams,
  getGuide,
  getRelatedGuides,
  guideExists,
} from "@/lib/content";
import { buildGuideMetadata } from "@/lib/seo";
import {
  getCity,
  getCountry,
  isValidIncident,
  isValidLocale,
  type IncidentType,
  type Locale,
} from "@/lib/site-config";

interface GuidePageProps {
  params: Promise<{
    locale: string;
    country: string;
    city: string;
    incident: string;
  }>;
}

/** 가이드 페이지 정적 params 생성 */
export function generateStaticParams() {
  return getAllGuideParams();
}

/** 가이드 페이지 동적 메타데이터 */
export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { locale, country, city, incident } = await params;
  if (
    !isValidLocale(locale) ||
    !isValidIncident(incident) ||
    !getCountry(country) ||
    !getCity(country, city)
  ) {
    return {};
  }

  const guide = getGuide(locale, country, city, incident as IncidentType);
  if (!guide) return {};

  return buildGuideMetadata(
    locale as Locale,
    country,
    city,
    incident as IncidentType,
    guide.frontmatter,
  );
}

/** MDX 기반 가이드 상세 페이지 */
export default async function GuidePage({ params }: GuidePageProps) {
  const { locale, country, city, incident } = await params;

  if (
    !isValidLocale(locale) ||
    !isValidIncident(incident) ||
    !getCountry(country) ||
    !getCity(country, city)
  ) {
    notFound();
  }

  const typedIncident = incident as IncidentType;
  const typedLocale = locale as Locale;

  if (!guideExists(typedLocale, country, city, typedIncident)) {
    notFound();
  }

  const guide = getGuide(typedLocale, country, city, typedIncident)!;
  const relatedGuides = getRelatedGuides(
    typedLocale,
    country,
    city,
    typedIncident,
  );

  return (
    <GuidePageLayout guide={guide} relatedGuides={relatedGuides} />
  );
}
