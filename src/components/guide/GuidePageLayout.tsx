import Script from "next/script";
import { MdxContent } from "@/components/mdx/MdxContent";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { GuideCard } from "@/components/ui/GuideCard";
import { getGuidePath, type GuideContent } from "@/lib/content";
import { t } from "@/lib/i18n";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildHowToJsonLd,
} from "@/lib/seo";
import {
  getCity,
  getCountry,
  incidentLabels,
} from "@/lib/site-config";

interface GuidePageLayoutProps {
  guide: GuideContent;
  relatedGuides: GuideContent[];
}

/** 가이드 상세 페이지 레이아웃 */
export function GuidePageLayout({ guide, relatedGuides }: GuidePageLayoutProps) {
  const { locale, country, city, incident, frontmatter } = guide;
  const countryData = getCountry(country);
  const cityData = getCity(country, city);
  const incidentLabel = incidentLabels[incident][locale];

  const breadcrumbItems = [
    { label: t(locale, "home"), href: `/${locale}` },
    {
      label: countryData?.name[locale] ?? country,
      href: `/${locale}?country=${country}`,
    },
    {
      label: cityData?.name[locale] ?? city,
      href: `/${locale}/${country}/${city}/lost-passport`,
    },
    { label: incidentLabel },
  ];

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(locale, [
    { name: t(locale, "home"), path: `/${locale}` },
    { name: countryData?.name[locale] ?? country, path: `/${locale}?country=${country}` },
    {
      name: `${cityData?.name[locale] ?? city} - ${incidentLabel}`,
      path: getGuidePath(locale, country, city, incident),
    },
  ]);

  const articleJsonLd = buildArticleJsonLd(
    locale,
    country,
    city,
    incident,
    frontmatter,
  );
  const faqItems = Array.from(
    guide.content.matchAll(/<FaqItem question="([^"]+)">\s*([\s\S]*?)\s*<\/FaqItem>/g),
    (match) => ({ question: match[1], answer: match[2].replace(/[*_`]/g, "").trim() }),
  );
  const actionSteps = Array.from(
    guide.content.matchAll(/<ActionStep[^>]*title="([^"]+)"[^>]*detail="([^"]+)"[^>]*\/>/g),
    (match) => ({ title: match[1], detail: match[2].replace(/[*_`]/g, "") }),
  );

  return (
    <>
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqItems.length > 0 && (
        <Script id="guide-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(faqItems)) }} />
      )}
      {actionSteps.length > 0 && (
        <Script id="guide-howto-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHowToJsonLd(frontmatter.title, frontmatter.summary, actionSteps)) }} />
      )}
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <header className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {incidentLabel}
            </span>
            <span className="text-sm text-gray-500">
              {cityData?.name[locale]}, {countryData?.name[locale]}
            </span>
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            {frontmatter.title}
          </h1>
          <p className="text-lg leading-relaxed text-gray-600">
            {frontmatter.summary}
          </p>
          <p className="mt-4 text-sm text-gray-500">
            {t(locale, "lastUpdated")}: {frontmatter.updatedAt}
          </p>
          <dl className="mt-5 grid grid-cols-1 gap-3 min-[380px]:grid-cols-3">
            {frontmatter.emergencyNumber && (
              <div className="rounded-lg bg-red-50 p-3"><dt className="text-xs font-medium text-red-700">{locale === "ko" ? "긴급번호" : "Emergency"}</dt><dd className="mt-1 font-bold text-red-800">{frontmatter.emergencyNumber}</dd></div>
            )}
            {frontmatter.estimatedTime && (
              <div className="rounded-lg bg-gray-50 p-3"><dt className="text-xs font-medium text-gray-500">{t(locale, "estimatedTime")}</dt><dd className="mt-1 text-sm font-semibold text-gray-900">{frontmatter.estimatedTime}</dd></div>
            )}
            {frontmatter.estimatedCost && (
              <div className="rounded-lg bg-gray-50 p-3"><dt className="text-xs font-medium text-gray-500">{t(locale, "estimatedCosts")}</dt><dd className="mt-1 text-sm font-semibold text-gray-900">{frontmatter.estimatedCost}</dd></div>
            )}
          </dl>
        </header>

        <div className="prose-guide">
          <MdxContent source={guide.content} />
        </div>

        {relatedGuides.length > 0 && (
          <section className="mt-12 border-t border-gray-200 pt-10">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              {t(locale, "relatedGuides")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedGuides.map((related) => (
                <GuideCard key={related.slug} guide={related} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
