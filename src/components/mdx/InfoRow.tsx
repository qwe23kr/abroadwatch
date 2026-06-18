interface InfoRowProps {
  label: string;
  value: string;
}

/** 필요 서류/정보 — 단일 행 */
export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
        {label}
      </span>
      <span className="text-sm font-semibold text-gray-900 sm:text-right">
        {value}
      </span>
    </div>
  );
}

interface InfoRowsProps {
  children: React.ReactNode;
}

/** 필요 서류 그룹 */
export function InfoRows({ children }: InfoRowsProps) {
  return <div className="my-6 grid gap-2 sm:grid-cols-2">{children}</div>;
}
