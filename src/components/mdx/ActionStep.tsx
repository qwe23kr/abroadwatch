interface ActionStepProps {
  n: string | number;
  title: string;
  detail: string;
  urgent?: boolean | string;
}

/** 즉시 해야 할 일 — 단일 단계 (큰 번호 + 제목 + 상세) */
export function ActionStep({ n, title, detail, urgent }: ActionStepProps) {
  const isUrgent = urgent === true || urgent === "true";
  return (
    <div
      className={`mb-3 flex gap-4 rounded-xl border-2 p-4 last:mb-0 ${
        isUrgent
          ? "border-red-200 bg-red-50"
          : "border-gray-200 bg-white shadow-sm"
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${
          isUrgent ? "bg-red-600" : "bg-blue-600"
        }`}
      >
        {n}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-base font-bold text-gray-900">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-gray-600">{detail}</p>
      </div>
    </div>
  );
}

interface ActionGroupProps {
  title?: string;
  children: React.ReactNode;
}

/** 즉시 해야 할 일 그룹 래퍼 */
export function ActionGroup({ title, children }: ActionGroupProps) {
  return (
    <div className="my-6">
      {title && (
        <h4 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-xs text-white">
            !
          </span>
          {title}
        </h4>
      )}
      <div>{children}</div>
    </div>
  );
}
