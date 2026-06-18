import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { createMdxComponents } from "@/components/mdx/mdx-components";
import type { Locale } from "@/lib/site-config";

interface MdxContentProps {
  source: string;
  locale: Locale;
}

/** MDX 콘텐츠 렌더러 — locale별 ContactCard·ReviewNote 라벨 */
export async function MdxContent({ source, locale }: MdxContentProps) {
  const { content } = await compileMDX({
    source,
    components: createMdxComponents(locale),
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return content;
}
