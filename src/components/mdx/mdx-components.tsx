import type { MDXComponents } from "mdx/types";
import type { Locale } from "@/lib/site-config";
import { ActionGroup, ActionStep } from "./ActionStep";
import { Callout } from "./Callout";
import { ContactCard } from "./ContactCard";
import { EmergencyBanner } from "./EmergencyBanner";
import { FaqItem } from "./FaqItem";
import { GoogleMap } from "./GoogleMap";
import { InfoRow, InfoRows } from "./InfoRow";
import { LocalPhrase } from "./LocalPhrase";
import { ReviewNote } from "./ReviewNote";
import { TimelineGroup, TimelineStep } from "./TimelineStep";

/** MDX 렌더링용 커스텀 컴포넌트 맵 (locale 주입) */
export function createMdxComponents(locale: Locale): MDXComponents {
  return {
    ActionGroup,
    ActionStep,
    Callout,
    ContactCard: (props) => <ContactCard {...props} locale={locale} />,
    EmergencyBanner,
    FaqItem,
    GoogleMap,
    InfoRow,
    InfoRows,
    LocalPhrase,
    ReviewNote: (props) => <ReviewNote {...props} locale={locale} />,
    TimelineGroup,
    TimelineStep,
    h2: ({ children, ...props }) => (
      <h2
        className="mt-10 mb-4 scroll-mt-24 border-b border-gray-200 pb-2 text-xl font-bold text-gray-900 first:mt-0 md:text-2xl"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="mt-6 mb-3 text-lg font-semibold text-gray-800 md:text-xl"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="mb-4 leading-relaxed text-gray-700" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6 text-gray-700" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-gray-900" {...props}>
        {children}
      </strong>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="font-medium text-blue-600 underline decoration-blue-200 underline-offset-2 transition-colors hover:text-blue-800 hover:decoration-blue-400"
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-4 border-l-4 border-blue-500 bg-blue-50 py-2 pl-4 italic text-gray-700"
        {...props}
      >
        {children}
      </blockquote>
    ),
    table: ({ children, ...props }) => (
      <div className="my-6 overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-gray-50" {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }) => (
      <th
        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="px-4 py-3 text-gray-700" {...props}>
        {children}
      </td>
    ),
  };
}

/** @deprecated createMdxComponents(locale) 사용 */
export const mdxComponents: MDXComponents = createMdxComponents("ko");
