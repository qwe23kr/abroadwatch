"use client";

import { useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/site-config";
import {
  getTravelerByCountryCode,
  getTravelerProfile,
  travelerProfiles,
  type TravelerCountryCode,
} from "@/lib/traveler-profiles";

const STORAGE_KEY = "abroadwatch-nationality";

function isNationalityCode(value: string): value is TravelerCountryCode {
  return Boolean(getTravelerByCountryCode(value));
}

export function NationalitySelector({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const nationality = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      window.addEventListener("abroadwatch-nationality", onStoreChange);
      return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener("abroadwatch-nationality", onStoreChange);
      };
    },
    () => {
      const segments = pathname.split("/");
      const routeTraveler =
        segments[1] === "guide"
          ? getTravelerProfile(segments[2] ?? "")
          : getTravelerProfile(segments[1] ?? "");
      if (routeTraveler) return routeTraveler.countryCode;
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved && isNationalityCode(saved) ? saved : "KR";
    },
    () => "KR",
  );

  const handleChange = (value: string) => {
    if (!isNationalityCode(value)) return;
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event("abroadwatch-nationality"));
    const profile = getTravelerByCountryCode(value);
    if (!profile) return;
    const segments = pathname.split("/");
    if (segments[1] === "guide" && segments[2]) {
      segments[2] = profile.code;
      router.push(`/${profile.code}/${segments.slice(3).join("/")}`.replace(/\/$/, ""));
    } else if (getTravelerProfile(segments[1] ?? "")) {
      segments[1] = profile.code;
      router.push(segments.join("/"));
    } else {
      router.push(`/${profile.code}`);
    }
  };

  return (
    <label className="relative inline-flex items-center gap-1.5">
      <span className="hidden text-xs font-medium text-gray-500 xl:inline">
        {locale === "ko" ? "국적" : "Nationality"}
      </span>
      <select
        value={nationality}
        onChange={(event) => handleChange(event.target.value)}
        aria-label={locale === "ko" ? "국적 선택" : "Select nationality"}
        className="h-10 w-[7.5rem] cursor-pointer rounded-full border border-[#173c32]/15 bg-white px-3 text-sm font-bold text-[#31443d] shadow-sm outline-none transition hover:border-[#0f766e]/40 focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10 min-[400px]:w-[8.5rem] sm:w-auto sm:max-w-none"
      >
        {travelerProfiles.map((item) => (
          <option key={item.countryCode} value={item.countryCode}>
            {item.flag} {item.nativeName}
          </option>
        ))}
      </select>
    </label>
  );
}
