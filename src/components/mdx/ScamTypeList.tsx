import { InlineMarkdown } from "./InlineMarkdown";

interface ScamHotspotsProps {
  label?: string;
  children: React.ReactNode;
}

/** 사기 다발 구역 — 한 줄 배지 */
export function ScamHotspots({ label = "주의 구역", children }: ScamHotspotsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/80 px-3 py-2.5">
      <span className="shrink-0 rounded-md bg-amber-200/80 px-2 py-0.5 text-xs font-bold text-amber-900">
        {label}
      </span>
      <span className="text-sm font-medium text-amber-950">{children}</span>
    </div>
  );
}

interface ScamTypeProps {
  title: string;
  children: React.ReactNode;
}

/** 사기 유형 카드 — 제목 + 설명 */
export function ScamType({ title, children }: ScamTypeProps) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-amber-200">
      <h4 className="mb-2 text-sm font-bold text-gray-900">{title}</h4>
      <p className="text-sm leading-relaxed text-gray-600 [&>p]:mb-0">{children}</p>
    </article>
  );
}

interface ScamTypeListProps {
  children: React.ReactNode;
}

/** 사기 유형 목록 래퍼 */
export function ScamTypeList({ children }: ScamTypeListProps) {
  return <div className="my-6 space-y-3">{children}</div>;
}

interface ScamTypeRowProps {
  title: string;
  detail: string;
}

/** MDX 생성용 — title·detail 문자열 props */
export function ScamTypeRow({ title, detail }: ScamTypeRowProps) {
  return (
    <ScamType title={title}>
      <InlineMarkdown text={detail} />
    </ScamType>
  );
}
