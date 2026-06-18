import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx/MdxContent";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { staticPages, staticPageSlugs } from "@/lib/static-pages";
import { isValidLocale, siteConfig, type Locale } from "@/lib/site-config";

interface StaticPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

/** 정적 페이지 공통 컴포넌트 */
export function createStaticPage(slug: string) {
  if (!staticPageSlugs.includes(slug)) {
    throw new Error(`Unknown static page: ${slug}`);
  }

  const page = staticPages[slug];

  async function generateMetadata({
    params,
  }: StaticPageProps): Promise<Metadata> {
    const { locale: localeParam } = await params;
    if (!isValidLocale(localeParam)) return {};
    const locale = localeParam as Locale;

    return buildMetadata({
      locale,
      title: page.title[locale],
      description: page.description[locale],
      path: `/${locale}/${slug}`,
      alternatePaths: Object.fromEntries(
        siteConfig.locales.map((loc) => [loc, `/${loc}/${slug}`]),
      ) as Partial<Record<Locale, string>>,
    });
  }

  async function Page({ params }: StaticPageProps) {
    const { locale: localeParam } = await params;
    if (!isValidLocale(localeParam)) notFound();
    const locale = localeParam as Locale;

    const content = page.content[locale];

    return (
      <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
        <Breadcrumbs
          items={[
            { label: t(locale, "home"), href: `/${locale}` },
            { label: page.title[locale] },
          ]}
        />
        <h1 className="mb-8 text-3xl font-bold text-gray-900 md:text-4xl">
          {page.title[locale]}
        </h1>
        <div className="prose-guide">
          <MdxContent source={content} />
        </div>
      </div>
    );
  }

  return { generateMetadata, default: Page };
}
