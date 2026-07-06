interface ReviewQuotesProps {
  title?: string;
  children: React.ReactNode;
}

export function ReviewQuotes({
  title = "여행자 사례에서 반복되는 패턴",
  children,
}: ReviewQuotesProps) {
  return (
    <section className="my-6 rounded-xl border border-gray-200 bg-white p-4">
      <h4 className="mb-3 text-sm font-bold text-gray-900">{title}</h4>
      <ul className="space-y-2.5">{children}</ul>
    </section>
  );
}

interface ReviewQuoteProps {
  source?: string;
  children: React.ReactNode;
}

export function ReviewQuote({ source, children }: ReviewQuoteProps) {
  return (
    <li className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
      <p className="text-sm leading-relaxed text-gray-700">{children}</p>
      {source && (
        <p className="mt-2 text-xs font-medium text-gray-500">참고: {source}</p>
      )}
    </li>
  );
}

interface ReviewQuoteRowProps {
  text: string;
  source?: string;
}

export function ReviewQuoteRow({ text, source }: ReviewQuoteRowProps) {
  return <ReviewQuote source={source}>{text}</ReviewQuote>;
}
