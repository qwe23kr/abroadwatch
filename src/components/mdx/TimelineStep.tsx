interface TimelineStepProps {
  time: string;
  action: string;
  note?: string;
}

/** 타임라인 단일 단계 — MDX 배열 props 없이 문자열만 사용 */
export function TimelineStep({ time, action, note }: TimelineStepProps) {
  return (
    <div className="relative mb-4 rounded-lg border border-blue-200 bg-white p-4 shadow-sm last:mb-0">
      <div className="mb-2 inline-flex rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
        {time}
      </div>
      <p className="text-base font-semibold leading-snug text-gray-900">{action}</p>
      {note && note.trim() !== "" && (
        <p className="mt-2 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">
          💡 {note}
        </p>
      )}
    </div>
  );
}

interface TimelineGroupProps {
  title?: string;
  children: React.ReactNode;
}

/** 타임라인 그룹 래퍼 */
export function TimelineGroup({ title, children }: TimelineGroupProps) {
  return (
    <div className="my-6 rounded-xl border-2 border-blue-100 bg-blue-50/40 p-4 md:p-5">
      {title && (
        <h4 className="mb-4 flex items-center gap-2 text-base font-bold text-blue-900">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
            ⏱
          </span>
          {title}
        </h4>
      )}
      <div className="space-y-0">{children}</div>
    </div>
  );
}
