interface StepListProps {
  steps?: string[];
}

/** 단계별 절차 목록 — 번호 배지 포함 */
export function StepList({ steps = [] }: StepListProps) {
  if (steps.length === 0) return null;
  return (
    <ol className="my-6 space-y-4">
      {steps.map((step, index) => (
        <li key={index} className="flex gap-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {index + 1}
          </span>
          <p className="pt-1 leading-relaxed text-gray-700">{step}</p>
        </li>
      ))}
    </ol>
  );
}
