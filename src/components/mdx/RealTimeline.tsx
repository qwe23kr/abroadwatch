interface TimelineItem {
  time: string;
  action: string;
  note?: string;
}

interface RealTimelineProps {
  title?: string;
  items: TimelineItem[];
}

/** 실제 후기 기반 시간별 타임라인 */
export function RealTimeline({ title, items = [] }: RealTimelineProps) {
  if (items.length === 0) return null;

  return (
    <div className="my-6 rounded-xl border border-blue-100 bg-blue-50/50 p-5">
      {title && (
        <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-blue-800">
          {title}
        </h4>
      )}
      <ol className="relative space-y-4 border-l-2 border-blue-200 pl-6">
        {items.map((item, index) => (
          <li key={index} className="relative">
            <span className="absolute -left-[1.6rem] top-1 flex h-3 w-3 rounded-full bg-blue-600 ring-4 ring-blue-50" />
            <p className="text-xs font-semibold text-blue-700">{item.time}</p>
            <p className="mt-0.5 text-sm font-medium text-gray-900">
              {item.action}
            </p>
            {item.note && (
              <p className="mt-1 text-xs text-gray-600">{item.note}</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
