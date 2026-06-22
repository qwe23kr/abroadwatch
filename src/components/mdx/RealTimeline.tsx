import { InlineMarkdown } from "./InlineMarkdown";

interface RealTimelineStepProps {
  time: string;
  action: string;
  note?: string;
}

/** 실제 경험담 타임라인 단일 단계 */
export function RealTimelineStep({ time, action, note }: RealTimelineStepProps) {
  return (
    <li className="relative">
      <span className="absolute -left-[1.6rem] top-1 flex h-3 w-3 rounded-full bg-blue-600 ring-4 ring-blue-50" />
      <p className="text-xs font-semibold text-blue-700">{time}</p>
      <p className="mt-0.5 text-sm font-medium text-gray-900">
        <InlineMarkdown text={action} />
      </p>
      {note && note.trim() !== "" && (
        <p className="mt-1 text-xs text-gray-600">
          <InlineMarkdown text={note} />
        </p>
      )}
    </li>
  );
}

interface RealTimelineProps {
  title?: string;
  children: React.ReactNode;
}

/** 실제 후기 기반 시간별 타임라인 */
export function RealTimeline({ title, children }: RealTimelineProps) {
  return (
    <div className="my-6 rounded-xl border border-blue-100 bg-blue-50/50 p-5">
      {title && (
        <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-blue-800">
          {title}
        </h4>
      )}
      <ol className="relative space-y-4 border-l-2 border-blue-200 pl-6">
        {children}
      </ol>
    </div>
  );
}
