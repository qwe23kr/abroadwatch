import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTravelerProfile } from "@/lib/traveler-profiles";

export async function generateMetadata({ params }: { params: Promise<{ traveler: string }> }): Promise<Metadata> {
  const profile = getTravelerProfile((await params).traveler);
  if (!profile) return {};
  const isKo = profile.language === "ko";
  return {
    title: isKo ? "여행자보험 청구 서류 체크리스트 | 분실·도난·병원" : "Travel Insurance Claim Checklist",
    description: isKo ? "휴대폰·여권·지갑 분실, 도난, 해외 병원 진료 후 보험 청구에 필요한 경찰서류·영수증·통신사 확인서를 확인하세요." : "Documents to preserve for loss, theft, hospital, and travel insurance claims.",
  };
}

export default async function ClaimsPage({ params }: { params: Promise<{ traveler: string }> }) {
  const profile = getTravelerProfile((await params).traveler);
  if (!profile) notFound();
  const isKo = profile.language === "ko";
  const cards = isKo ? [
    ["휴대폰·전자기기", "구매 영수증, IMEI, 경찰 접수번호, 통신사 정지 확인, 위치추적 화면"],
    ["지갑·현금·카드", "경찰 확인서, 카드 정지 시각, 승인내역, 현금 인출 기록, 피해 물품 목록"],
    ["병원·응급실", "진단서, 진료비 영수증 원본, 처방전, 검사 결과, 보험사 사전 연락 기록"],
    ["수하물·항공 지연", "PIR 또는 항공사 확인서, 수하물 태그, 탑승권, 대체품 구매 영수증"],
  ] : [
    ["Phone & electronics", "Receipt, IMEI, police case number, carrier suspension, tracking screenshots"],
    ["Wallet, cash & cards", "Police record, block time, transactions, ATM record, itemized loss"],
    ["Hospital & ER", "Medical report, original receipts, prescription, test results, insurer contact log"],
    ["Baggage & delays", "PIR or airline statement, baggage tag, boarding pass, replacement receipts"],
  ];
  return (
    <main>
      <section className="bg-[#10221d] px-4 py-16 text-white sm:px-6 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl"><Link href={`/${profile.code}`} className="text-sm font-bold text-[#9db0aa] hover:text-[#c8f169]">← AbroadWatch</Link><p className="mt-12 text-xs font-black tracking-[.16em] text-[#c8f169]">RECOVERY DESK</p><h1 className="mt-4 max-w-4xl text-balance text-4xl font-black leading-[1] tracking-[-.055em] md:text-7xl">{isKo ? "현장에서 남긴 증거가 보상 가능성을 바꿉니다." : "What you preserve on the ground can decide your claim."}</h1><p className="mt-6 max-w-2xl leading-7 text-[#bdccc7]">{isKo ? "보험사마다 보장 범위와 제출 양식은 다릅니다. 아래 자료를 먼저 확보하고 가입한 보험의 약관과 고객센터에서 최종 확인하세요." : "Coverage and forms vary by insurer. Preserve these materials first, then confirm against your own policy."}</p></div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-8 md:py-24">
        <div className="grid gap-4 md:grid-cols-2">{cards.map(([title, body], index) => <article key={title} className="rounded-[1.75rem] border border-[#173c32]/10 bg-white p-7 shadow-sm"><span className="text-xs font-black text-[#0f766e]">0{index + 1}</span><h2 className="mt-8 text-2xl font-black tracking-tight">{title}</h2><p className="mt-3 leading-7 text-[#61716b]">{body}</p></article>)}</div>
        <div className="mt-12 rounded-[2rem] bg-[#c8f169] p-7 md:p-10"><h2 className="text-2xl font-black tracking-tight">{isKo ? "공통 청구 순서" : "Common claim order"}</h2><ol className="mt-6 grid gap-4 md:grid-cols-4">{(isKo ? ["현장 안전 확보", "기관 신고와 증거 보존", "보험사에 사고 접수", "원본 서류 제출·보관"] : ["Get to safety", "Report and preserve", "Notify insurer", "Submit and retain originals"]).map((item, i) => <li key={item} className="rounded-2xl bg-white/70 p-5"><strong className="text-sm">0{i + 1}</strong><p className="mt-4 font-black">{item}</p></li>)}</ol></div>
        <p className="mt-8 text-sm leading-6 text-[#788983]">{isKo ? "본 페이지는 일반 정보이며 보험금 지급을 보장하지 않습니다. 치료나 신체 위험이 있는 경우 보험 승인보다 현지 응급기관 이용이 먼저입니다." : "General information only; it does not guarantee reimbursement. In a medical emergency, seek care before waiting for insurance authorization."}</p>
      </section>
    </main>
  );
}
