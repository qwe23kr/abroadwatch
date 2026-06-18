interface ReviewQuotesProps {
  title?: string;
  children: React.ReactNode;
}

/** 실제 후기 요약 섹션 */
export function ReviewQuotes({ title = "실제 후기 요약", children }: ReviewQuotesProps) {
  return (
    <section className="my-6">
      <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-xs">
          💬
        </span>
        {title}
      </h4>
      <ul className="space-y-2.5">{children}</ul>
    </section>
  );
}

interface ReviewQuoteProps {
  source?: string;
  children: React.ReactNode;
}

/** 단일 후기 인용 */
export function ReviewQuote({ source, children }: ReviewQuoteProps) {
  return (
    <li className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-amber-50/40 px-4 py-3.5">
      <p className="text-sm leading-relaxed text-gray-700">&ldquo;{children}&rdquo;</p>
      {source && (
        <p className="mt-2 text-xs font-medium text-gray-400">— {source}</p>
      )}
    </li>
  );
}

interface ReviewQuoteRowProps {
  text: string;
  source?: string;
}

/** MDX 생성용 — text·source 문자열 props */
export function ReviewQuoteRow({ text, source }: ReviewQuoteRowProps) {
  return (
    <ReviewQuote source={source}>
      {text}
    </ReviewQuote>
  );
}
