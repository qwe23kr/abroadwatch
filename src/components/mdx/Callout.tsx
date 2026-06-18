import { cn } from "@/lib/utils";

type CalloutVariant = "info" | "warning" | "emergency" | "success";

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}

const variantStyles: Record<CalloutVariant, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  emergency: "border-red-300 bg-red-50 text-red-900",
  success: "border-green-200 bg-green-50 text-green-900",
};

/** 강조 정보 박스 — info, warning, emergency, success 변형 지원 */
export function Callout({
  variant = "info",
  title,
  children,
}: CalloutProps) {
  return (
    <div
      className={cn(
        "my-6 rounded-lg border-l-4 p-4",
        variantStyles[variant],
      )}
      role="note"
    >
      {title && (
        <p className="mb-2 text-sm font-bold uppercase tracking-wide">
          {title}
        </p>
      )}
      <div className="text-sm leading-relaxed [&>p:last-child]:mb-0">{children}</div>
    </div>
  );
}
