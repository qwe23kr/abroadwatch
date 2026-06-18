import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  countries,
  incidentTypes,
  siteConfig,
  type IncidentType,
  type Locale,
} from "./site-config";

/** MDX frontmatter 스키마 */
export interface GuideFrontmatter {
  title: string;
  summary: string;
  publishedAt: string;
  updatedAt: string;
  estimatedCost?: string;
  estimatedTime?: string;
  emergencyNumber?: string;
}

/** 가이드 콘텐츠 전체 구조 */
export interface GuideContent {
  locale: Locale;
  country: string;
  city: string;
  incident: IncidentType;
  frontmatter: GuideFrontmatter;
  content: string;
  slug: string;
}

const contentDir = path.join(process.cwd(), "content");

/** content 디렉터리 내 MDX 파일 경로 생성 */
function getMdxPath(
  locale: Locale,
  country: string,
  city: string,
  incident: IncidentType,
): string {
  return path.join(contentDir, locale, country, city, `${incident}.mdx`);
}

/** MDX 파일 존재 여부 확인 */
export function guideExists(
  locale: Locale,
  country: string,
  city: string,
  incident: IncidentType,
): boolean {
  return fs.existsSync(getMdxPath(locale, country, city, incident));
}

/** MDX 가이드 파일 파싱 */
export function getGuide(
  locale: Locale,
  country: string,
  city: string,
  incident: IncidentType,
): GuideContent | null {
  const filePath = getMdxPath(locale, country, city, incident);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    locale,
    country,
    city,
    incident,
    frontmatter: data as GuideFrontmatter,
    content,
    slug: `${locale}/${country}/${city}/${incident}`,
  };
}

/** 가이드 URL 경로 생성 */
export function getGuidePath(
  locale: Locale,
  country: string,
  city: string,
  incident: IncidentType,
): string {
  return `/${locale}/${country}/${city}/${incident}`;
}

/** content 폴더에서 존재하는 모든 가이드 목록 반환 */
export function getAllGuides(): GuideContent[] {
  const guides: GuideContent[] = [];

  for (const locale of siteConfig.locales) {
    const localeDir = path.join(contentDir, locale);
    if (!fs.existsSync(localeDir)) continue;

    for (const country of countries) {
      for (const city of country.cities) {
        for (const incident of incidentTypes) {
          const guide = getGuide(locale, country.slug, city.slug, incident);
          if (guide) guides.push(guide);
        }
      }
    }
  }

  return guides;
}

/** 정적 생성용 params 목록 반환 */
export function getAllGuideParams(): Array<{
  locale: Locale;
  country: string;
  city: string;
  incident: IncidentType;
}> {
  return getAllGuides().map((g) => ({
    locale: g.locale,
    country: g.country,
    city: g.city,
    incident: g.incident,
  }));
}

/** 최신 가이드 N개 반환 (updatedAt 기준) */
export function getLatestGuides(locale: Locale, limit = 6): GuideContent[] {
  return getAllGuides()
    .filter((g) => g.locale === locale)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.updatedAt).getTime() -
        new Date(a.frontmatter.updatedAt).getTime(),
    )
    .slice(0, limit);
}

const popularGuideKeys = [
  "japan/tokyo/lost-passport",
  "thailand/bangkok/lost-phone",
  "vietnam/danang/hospital",
  "philippines/cebu/lost-passport",
  "taiwan/taipei/police-report",
  "japan/osaka/lost-wallet",
] as const;

/** 운영상 중요도와 대표 여행지를 기준으로 선정한 가이드 */
export function getPopularGuides(locale: Locale, limit = 6): GuideContent[] {
  return popularGuideKeys
    .map((key) => {
      const [country, city, incident] = key.split("/");
      return getGuide(locale, country, city, incident as IncidentType);
    })
    .filter((guide): guide is GuideContent => guide !== null)
    .slice(0, limit);
}

/** 제목, 요약, 국가, 도시, 사건 유형을 대상으로 검색 */
export function searchGuides(
  locale: Locale,
  rawQuery: string,
  limit = 30,
): GuideContent[] {
  const query = rawQuery.trim().toLocaleLowerCase(locale);
  if (!query) return [];

  const terms = query.split(/\s+/).filter(Boolean);

  return getAllGuides()
    .filter((guide) => guide.locale === locale)
    .filter((guide) => {
      const country = countries.find((item) => item.slug === guide.country);
      const city = country?.cities.find((item) => item.slug === guide.city);
      const haystack = [
        guide.frontmatter.title,
        guide.frontmatter.summary,
        country?.name[locale],
        country?.slug,
        city?.name[locale],
        city?.slug,
        guide.incident,
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase(locale);

      return terms.every((term) => haystack.includes(term));
    })
    .slice(0, limit);
}

/** 특정 사건 유형의 도시별 가이드 */
export function getGuidesByIncident(
  locale: Locale,
  incident: IncidentType,
): GuideContent[] {
  return getAllGuides().filter(
    (guide) => guide.locale === locale && guide.incident === incident,
  );
}

/** 같은 도시의 다른 사건 유형 가이드 반환 */
export function getRelatedGuides(
  locale: Locale,
  country: string,
  city: string,
  currentIncident: IncidentType,
  limit = 4,
): GuideContent[] {
  return incidentTypes
    .filter((inc) => inc !== currentIncident)
    .map((inc) => getGuide(locale, country, city, inc))
    .filter((g): g is GuideContent => g !== null)
    .slice(0, limit);
}
