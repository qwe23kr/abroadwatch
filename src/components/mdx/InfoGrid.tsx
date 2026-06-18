interface InfoGridItem {
  label: string;
  value: string;
}

interface InfoGridProps {
  items?: InfoGridItem[];
}

/** 요약 정보 그리드 — 비용, 시간, 서류 등 */
export function InfoGrid({ items = [] }: InfoGridProps) {
  if (items.length === 0) return null;
  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-lg border border-gray-200 bg-gray-50 p-4"
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
            {item.label}
          </p>
          <p className="font-medium text-gray-900">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
