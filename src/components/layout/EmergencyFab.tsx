"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics-events";

interface EmergencyFabProps {
  locale: Locale;
  phone?: string;
  label?: string;
}

/** Mobile emergency call FAB */
export function EmergencyFab({ locale, phone, label }: EmergencyFabProps) {
  const pathname = usePathname();
  const helpline = "https://www.0404.go.kr";
  const helplineTel = "tel:+82232100404";
  const displayPhone = phone ?? "0404";
  const href = phone ? `tel:${phone.replace(/\s/g, "")}` : helplineTel;

  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] right-3 z-40 flex flex-col items-end gap-2 sm:right-4 md:bottom-6 md:right-6">
      {!phone && (
        <Link
          href={helpline}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-md ring-1 ring-gray-200 sm:block"
        >
          {t(locale, "emergencyFabHelp")}
        </Link>
      )}
      <a
        href={href}
        onClick={() =>
          trackEvent("emergency_call_click", {
            phone: displayPhone,
            label: label ?? displayPhone,
            path: pathname ?? undefined,
          })
        }
        className="flex max-w-[calc(100vw-1.5rem)] items-center gap-1.5 rounded-full bg-red-600 px-3 py-2.5 text-xs font-bold text-white shadow-lg transition hover:bg-red-700 hover:shadow-xl active:scale-95 sm:gap-2 sm:px-4 sm:py-3 sm:text-sm"
        aria-label={`${t(locale, "emergencyFab")}: ${label ?? displayPhone}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
            clipRule="evenodd"
          />
        </svg>
        <span className="hidden min-[380px]:inline">{t(locale, "emergencyFab")}</span>
        <span>{displayPhone}</span>
      </a>
      {label && pathname && (
        <span className="hidden max-w-[10rem] truncate rounded-lg bg-gray-900/80 px-2 py-1 text-center text-[10px] text-white backdrop-blur-sm sm:block">
          {label}
        </span>
      )}
    </div>
  );
}
