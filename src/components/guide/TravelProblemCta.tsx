import Image from "next/image";
import type { Locale } from "@/lib/site-config";
import type { TravelerProfile } from "@/lib/traveler-profiles";

type CtaLanguage = Locale | TravelerProfile["language"];

const headlineByLanguage: Record<CtaLanguage, string> = {
  ko: "여행중 문제가 생겼나요?!",
  en: "Something went wrong during your trip?!",
  "zh-Hans": "旅行中遇到问题了吗？！",
  ja: "旅行中にトラブルが起きましたか？！",
  "zh-Hant": "旅途中遇到問題了嗎？！",
  th: "เกิดปัญหาระหว่างเดินทางใช่ไหม?!",
  vi: "Bạn gặp vấn đề khi đang du lịch?!",
};

interface TravelProblemCtaProps {
  language: CtaLanguage;
}

export function TravelProblemCta({ language }: TravelProblemCtaProps) {
  const headline = headlineByLanguage[language] ?? headlineByLanguage.en;

  return (
    <aside className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
      <p className="text-base font-bold leading-snug text-gray-900">{headline}</p>
      <div className="mt-4 overflow-hidden rounded-md border border-gray-100 bg-gray-50">
        <Image
          src="/tp-qr-code.jpeg"
          alt={headline}
          width={1600}
          height={900}
          className="h-auto w-full"
          sizes="(min-width: 1024px) 240px, 100vw"
        />
      </div>
      <a
        href="https://airhelp.tpo.li/mVx4XhSs"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-blue-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-800"
      >
        바로가기
      </a>
    </aside>
  );
}
