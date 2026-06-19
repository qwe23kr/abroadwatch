import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { createMdxComponents } from "@/components/mdx/mdx-components";
import type { Locale } from "@/lib/site-config";
import type { TravelerProfile } from "@/lib/traveler-profiles";

interface MdxContentProps {
  source: string;
  locale: Locale;
  uiLanguage?: TravelerProfile["language"];
}

/** MDX 콘텐츠 렌더러 — locale별 ContactCard·ReviewNote 라벨 */
export async function MdxContent({ source, locale, uiLanguage }: MdxContentProps) {
  const { content } = await compileMDX({
    source,
    components: createMdxComponents(locale, uiLanguage),
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return content;
}
