interface FaqItemProps {
  question: string;
  children: React.ReactNode;
}

/** FAQ 항목 — 접근성 지원 아코디언 스타일 */
export function FaqItem({ question, children }: FaqItemProps) {
  return (
    <details className="group rounded-lg border border-gray-200 bg-white">
      <summary className="cursor-pointer list-none px-5 py-4 font-medium text-gray-900 transition-colors hover:bg-gray-50 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-4">
          {question}
          <span className="shrink-0 text-blue-600 transition-transform group-open:rotate-180">
            ▼
          </span>
        </span>
      </summary>
      <div className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-700">
        {children}
      </div>
    </details>
  );
}
