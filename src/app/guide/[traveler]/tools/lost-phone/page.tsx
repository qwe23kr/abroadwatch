import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LostPhoneChecklist } from "@/components/tools/LostPhoneChecklist";
import { getTravelerProfile } from "@/lib/traveler-profiles";

export async function generateMetadata({ params }: { params: Promise<{ traveler: string }> }): Promise<Metadata> {
  const profile = getTravelerProfile((await params).traveler);
  if (!profile) return {};
  const isKo = profile.language === "ko";
  return {
    title: isKo ? "해외에서 휴대폰 분실 시 60초 대응 체크리스트" : "Lost Phone Abroad: 60-Second Response Checklist",
    description: isKo ? "해외 휴대폰 분실 시 원격 잠금, 유심 정지, 금융앱 보호, 경찰 신고, 여행자보험 증거 확보 순서를 체크하세요." : "Follow the right order to lock your phone, suspend the SIM, protect payments, report the loss, and preserve insurance evidence.",
  };
}

export default async function LostPhoneToolPage({ params }: { params: Promise<{ traveler: string }> }) {
  const profile = getTravelerProfile((await params).traveler);
  if (!profile) notFound();
  const isKo = profile.language === "ko";
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:px-8 md:py-16">
      <nav className="mb-8 text-sm font-semibold text-[#61716b]"><Link href={`/${profile.code}`} className="hover:text-[#0f766e]">AbroadWatch</Link><span className="mx-2">/</span>{isKo ? "휴대폰 분실 대응" : "Lost phone response"}</nav>
      <header className="grid gap-8 lg:grid-cols-[1fr_.65fr] lg:items-end">
        <div><p className="text-xs font-black tracking-[.16em] text-[#0f766e]">60-SECOND ACTION PLAN</p><h1 className="mt-4 text-balance text-4xl font-black leading-[1.02] tracking-[-.055em] md:text-6xl">{isKo ? "휴대폰을 잃어버렸다면, 초기화부터 하지 마세요." : "Lost your phone? Don’t erase it first."}</h1></div>
        <p className="leading-7 text-[#61716b]">{isKo ? "위치와 기기 정보는 경찰 신고와 보험 청구에 필요한 증거가 될 수 있습니다. 아래 순서대로 처리하고 완료한 항목을 눌러 기록하세요." : "Location and device details may become evidence for police and insurance. Follow the order below and mark each step complete."}</p>
      </header>
      <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_18rem]">
        <LostPhoneChecklist isKo={isKo} />
        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl bg-[#ffe9e8] p-5"><p className="text-xs font-black tracking-[.12em] text-[#b4232b]">{isKo ? "즉시 위험" : "IMMEDIATE RISK"}</p><p className="mt-2 text-sm font-bold leading-6 text-[#702329]">{isKo ? "금융앱이 열려 있거나 잠금이 없다면 위치 확인보다 회선과 결제 차단이 먼저입니다." : "If banking apps are exposed or there is no screen lock, block the line and payments before tracking."}</p></div>
          <div className="rounded-2xl bg-white p-5 shadow-sm"><h2 className="font-black">{isKo ? "준비할 정보" : "Information to prepare"}</h2><ul className="mt-3 space-y-2 text-sm text-[#61716b]"><li>• IMEI / serial number</li><li>• {isKo ? "기종·색상·케이스" : "Model, color, case"}</li><li>• {isKo ? "마지막 확인 장소와 시각" : "Last seen place and time"}</li><li>• {isKo ? "구매 영수증" : "Proof of purchase"}</li></ul></div>
          <Link href={`/${profile.code}/search?incident=lost-phone`} className="flex items-center justify-between rounded-2xl bg-[#c8f169] p-5 text-sm font-black text-[#10221d]">{isKo ? "도시별 신고 절차 찾기" : "Find city-specific steps"}<span>→</span></Link>
          <Link href={`/${profile.code}/claims`} className="flex items-center justify-between rounded-2xl border border-[#173c32]/10 bg-white p-5 text-sm font-black">{isKo ? "보험 청구 준비" : "Prepare a claim"}<span>→</span></Link>
        </aside>
      </section>
    </main>
  );
}
