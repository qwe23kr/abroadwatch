import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx/MdxContent";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { staticPages, staticPageSlugs } from "@/lib/static-pages";
import { getTravelerProfile } from "@/lib/traveler-profiles";
import type { Locale } from "@/lib/site-config";

interface Props {
  params: Promise<{ traveler: string }>;
}

export function createTravelerStaticPage(slug: string) {
  if (!staticPageSlugs.includes(slug)) throw new Error(`Unknown static page: ${slug}`);
  const page = staticPages[slug];

  async function generateMetadata({ params }: Props): Promise<Metadata> {
    const profile = getTravelerProfile((await params).traveler);
    if (!profile) return {};
    const locale: Locale = profile.code === "kr" ? "ko" : "en";
    return buildMetadata({
      locale,
      title: page.title[locale],
      description: page.description[locale],
      path: `/${profile.code}/${slug}`,
    });
  }

  async function Page({ params }: Props) {
    const profile = getTravelerProfile((await params).traveler);
    if (!profile) notFound();
    const locale: Locale = profile.code === "kr" ? "ko" : "en";

    return (
      <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
        <Breadcrumbs
          items={[
            { label: profile.nativeName, href: `/${profile.code}` },
            { label: page.title[locale] },
          ]}
        />
        <h1 className="mb-8 text-3xl font-bold text-gray-900 md:text-4xl">
          {page.title[locale]}
        </h1>
        <div className="prose-guide">
          <MdxContent source={page.content[locale]} locale={locale} uiLanguage={profile.language} />
        </div>
      </div>
    );
  }

  return { generateMetadata, default: Page };
}
