import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INDEXABLE_ROBOTS, NOINDEX_ROBOTS } from "@/lib/seo";
import { getTravelerProfile } from "@/lib/traveler-profiles";
import { affiliateLinks, type AffiliateKey } from "@/lib/affiliate-links";
import { TrackedLink } from "@/components/analytics/TrackedLink";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ traveler: string }>;
}): Promise<Metadata> {
  const profile = getTravelerProfile((await params).traveler);
  if (!profile) return {};
  const indexable = profile.code === "kr";
  return {
    title: indexable ? "해외여행 준비 체크리스트 | 통신·보험·공항 이동" : "Travel preparation checklist",
    description: indexable
      ? "출국 전 통신, 여행자보험, 공항 이동, 비상 연락처와 서류 백업을 한 번에 확인하는 해외여행 준비 체크리스트."
      : "A practical pre-trip checklist for connectivity, insurance, arrival, documents, and emergency contacts.",
    alternates: { canonical: `https://abroadwatch.com/${profile.code}/prepare` },
    robots: indexable ? INDEXABLE_ROBOTS : NOINDEX_ROBOTS,
  };
}

export default async function PreparePage({
  params,
}: {
  params: Promise<{ traveler: string }>;
}) {
  const profile = getTravelerProfile((await params).traveler);
  if (!profile) notFound();
  const isKo = profile.code === "kr";
  const checks: Array<[string, string, string, AffiliateKey?]> = [
    ["documents", "서류 백업", "여권 사진면, 보험증권, 항공권과 숙소 주소를 휴대전화와 별도 저장소에 보관합니다."],
    ["connectivity", "통신 준비", "데이터 개통 시점, 한국 번호 문자 수신, 로밍 요금과 긴급 통화 방법을 확인합니다.", "esim"],
    ["insurance", "보험 확인", "보장 지역, 자기부담금, 휴대품·의료비 제외 항목과 사고 접수 방법을 확인합니다."],
    ["arrival", "도착 동선", "공항에서 숙소까지 첫 이동 수단과 심야 대안을 오프라인으로 저장합니다.", "airportTransfer"],
    ["contacts", "비상 연락처", "현지 긴급번호, 카드사, 보험사, 통신사와 담당 공관 번호를 저장합니다."],
    ["flight", "항공편 문제", "항공편이 크게 지연되거나 결항되면 탑승권과 항공사 안내를 보관하고 보상 대상인지 확인합니다.", "flightCompensation"],
    ["money", "현지 예약", "카드와 현금을 분산하고, 입장권과 현지 투어의 취소 조건을 예약 전에 확인합니다.", "activities"],
  ];

  return (
    <main>
      <section className="overflow-hidden bg-[#10221d] px-4 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl">
          <Link href={`/${profile.code}`} className="text-sm font-bold text-[#a9bbb5] hover:text-[#c8f169]">← AbroadWatch</Link>
          <p className="mt-12 text-xs font-black tracking-[.18em] text-[#c8f169]">TRAVEL READY SYSTEM</p>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-black leading-none tracking-[-.055em] md:text-7xl">
            {isKo ? "문제가 생긴 뒤 찾기 전에, 출국 전에 막아두세요." : "Prevent the avoidable before you depart."}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#bdccc7]">
            {isKo ? "통신·보험·서류·첫 이동을 10분 안에 점검하는 AbroadWatch 여행 준비 허브입니다." : "Check connectivity, coverage, documents, and your first arrival route."}
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="grid gap-4 md:grid-cols-2">
          {checks.map(([id, title, body, affiliateKey], index) => (
            <article id={id} key={id} className="scroll-mt-24 rounded-[1.75rem] border border-[#173c32]/10 bg-white p-7 shadow-sm">
              <span className="text-xs font-black text-[#0f766e]">0{index + 1}</span>
              <h2 className="mt-6 text-2xl font-black">{title}</h2>
              <p className="mt-3 leading-7 text-[#61716b]">{body}</p>
              {affiliateKey && (() => {
                const item = affiliateLinks[affiliateKey];
                return (
                  <TrackedLink
                    href={item.href}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    eventName="affiliate_click"
                    eventParams={{ placement: "prepare_card", partner: item.partner, product: affiliateKey }}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#10221d] px-4 py-2.5 text-sm font-black text-[#c8f169] transition hover:-translate-y-0.5"
                  >
                    {isKo ? item.ko : item.en} 확인하기 <span aria-hidden="true">↗</span>
                  </TrackedLink>
                );
              })()}
            </article>
          ))}
        </div>
        <p className="mt-5 text-xs leading-5 text-[#788983]">
          {isKo
            ? "제휴 링크가 포함되어 있으며, 링크를 통해 예약하거나 구매하면 AbroadWatch가 수수료를 받을 수 있습니다. 이용자 가격에는 영향을 주지 않습니다."
            : "This page contains affiliate links. AbroadWatch may earn a commission at no extra cost to you."}
        </p>
      </section>
    </main>
  );
}
