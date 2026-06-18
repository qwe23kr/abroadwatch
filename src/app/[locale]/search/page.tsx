import type { Metadata } from "next";
import Form from "next/form";
import { notFound } from "next/navigation";
import { GuideCard } from "@/components/ui/GuideCard";
import { getGuidesByIncident, searchGuides } from "@/lib/content";
import { t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { incidentLabels, isValidIncident, isValidLocale, type Locale } from "@/lib/site-config";

interface SearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ query?: string | string[]; incident?: string | string[] }>;
}

export async function generateMetadata({ params }: SearchPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) return {};
  const locale = localeParam as Locale;

  const metadata = buildMetadata({
    locale,
    title: t(locale, "searchResults"),
    description: t(locale, "siteDescription"),
    path: `/${locale}/search`,
    alternatePaths: { ko: "/ko/search", en: "/en/search" },
  });
  return { ...metadata, robots: { index: false, follow: true } };
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const queryParam = (await searchParams).query;
  const query = Array.isArray(queryParam) ? queryParam[0] ?? "" : queryParam ?? "";
  const incidentParam = (await searchParams).incident;
  const rawIncident = Array.isArray(incidentParam) ? incidentParam[0] : incidentParam;
  const incident = rawIncident && isValidIncident(rawIncident) ? rawIncident : undefined;
  const baseResults = query ? searchGuides(locale, query) : incident ? getGuidesByIncident(locale, incident) : [];
  const results = incident ? baseResults.filter((guide) => guide.incident === incident) : baseResults;
  const heading = incident ? incidentLabels[incident][locale] : t(locale, "searchResults");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <h1 className="text-3xl font-bold text-gray-900">{heading}</h1>
      {incident && (
        <p className="mt-2 text-gray-600">
          {locale === "ko" ? `지원 중인 도시 ${results.length}곳의 가이드입니다.` : `Guides for ${results.length} supported cities.`}
        </p>
      )}
      <Form action={`/${locale}/search`} className="mt-6 flex max-w-2xl flex-col gap-2 sm:flex-row">
        {incident && <input type="hidden" name="incident" value={incident} />}
        <input
          name="query"
          type="search"
          required
          defaultValue={query}
          placeholder={t(locale, "searchPlaceholder")}
          className="min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        <button type="submit" className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 sm:w-auto">
          {t(locale, "searchButton")}
        </button>
      </Form>

      <p className="mt-6 text-sm text-gray-600">
        {query ? `${query} · ${results.length}` : incident ? `${results.length}${locale === "ko" ? "개 결과" : " results"}` : t(locale, "searchPrompt")}
      </p>

      {(query || incident) && results.length === 0 ? (
        <p className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6 text-gray-700">
          {t(locale, "noSearchResults")}
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((guide) => <GuideCard key={guide.slug} guide={guide} />)}
        </div>
      )}
    </div>
  );
}
