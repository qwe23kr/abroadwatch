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
    description: isKo ? "휴대폰·지갑 분실, 도난, 해외 병원과 수하물 지연 후 보험 청구에 필요한 현장 증거와 제출 서류를 순서대로 확인하세요." : "Build an evidence pack for loss, theft, hospital, baggage, and travel insurance claims.",
  };
}

export default async function ClaimsPage({ params }: { params: Promise<{ traveler: string }> }) {
  const profile = getTravelerProfile((await params).traveler);
  if (!profile) notFound();
  const isKo = profile.language === "ko";

  const claimTypes = isKo ? [
    { id: "electronics", icon: "⌁", title: "휴대폰·전자기기", lead: "기기 소유와 도난·분실 사실을 함께 증명", items: ["구매 영수증 또는 결제내역", "IMEI·일련번호 화면", "경찰 접수번호·확인서", "통신사 정지 확인", "마지막 위치 화면 캡처"], href: `/${profile.code}/search?incident=lost-phone` },
    { id: "wallet", icon: "□", title: "지갑·카드", lead: "분실 시각과 부정사용 시각을 분리해 기록", items: ["카드 정지 완료 시각", "부정 승인내역 캡처", "경찰 확인서", "ATM·현금 인출 기록", "피해 물품별 금액 목록"], href: `/${profile.code}/search?incident=lost-wallet` },
    { id: "medical", icon: "+", title: "병원·응급실", lead: "진료 이유와 실제 지출을 원본 서류로 연결", items: ["진단서·진료확인서", "진료비 영수증 원본", "처방전·약제비 영수증", "검사 결과와 의무기록", "보험사 연락 기록"], href: `/${profile.code}/search?incident=hospital` },
    { id: "baggage", icon: "↗", title: "수하물·항공 지연", lead: "항공사의 공식 확인과 합리적인 대체 지출 보존", items: ["PIR 또는 항공사 확인서", "수하물 태그·탑승권", "지연·결항 알림 캡처", "대체품 구매 영수증", "항공사 보상 답변"], href: `/${profile.code}/claims#baggage` },
  ] : [
    { id: "electronics", icon: "⌁", title: "Phone & electronics", lead: "Connect proof of ownership with the incident record.", items: ["Purchase receipt or statement", "IMEI or serial number", "Police case number", "Carrier suspension proof", "Last-location screenshots"], href: `/${profile.code}/search?incident=lost-phone` },
    { id: "wallet", icon: "□", title: "Wallet & cards", lead: "Separate the time of loss from any unauthorized use.", items: ["Card-block timestamp", "Transaction screenshots", "Police record", "ATM or cash record", "Itemized loss values"], href: `/${profile.code}/search?incident=lost-wallet` },
    { id: "medical", icon: "+", title: "Hospital & ER", lead: "Connect the reason for care to every original expense.", items: ["Medical report", "Original itemized receipts", "Prescription and pharmacy receipt", "Test results or records", "Insurer contact log"], href: `/${profile.code}/search?incident=hospital` },
    { id: "baggage", icon: "↗", title: "Baggage & delays", lead: "Preserve the carrier decision and reasonable replacement costs.", items: ["PIR or airline statement", "Bag tag and boarding pass", "Delay notification", "Replacement receipts", "Airline compensation reply"], href: `/${profile.code}/claims#baggage` },
  ];

  const phases = isKo ? [
    ["지금", "안전 확보", "추가 피해를 막고 분실·사고 시각을 메모합니다."],
    ["현장", "공식 기록", "경찰·병원·항공사에서 접수번호와 원본을 받습니다."],
    ["24시간 안", "보험사 통지", "보장 여부, 제출 형식, 사전승인 필요 여부를 확인합니다."],
    ["귀국 후", "한 묶음 제출", "원본은 보관하고 사본·번역·목록을 함께 제출합니다."],
  ] : [
    ["Now", "Stop further loss", "Get safe and write down the incident time."],
    ["On site", "Create an official record", "Get case numbers and originals from police, hospital, or carrier."],
    ["Within 24h", "Notify the insurer", "Confirm coverage, format, and pre-authorization rules."],
    ["After return", "Submit one evidence pack", "Keep originals and submit copies, translations, and an index."],
  ];

  const insurerQuestions = isKo ? [
    "이 사고가 내 증권에서 보장되는 항목인가요?",
    "현지 경찰·병원 원본이 반드시 필요한가요?",
    "번역이나 공증이 필요한 서류가 있나요?",
    "자기부담금과 항목별 한도는 얼마인가요?",
    "청구 접수기한과 추가서류 제출기한은 언제인가요?",
  ] : [
    "Which section of my policy covers this incident?",
    "Which police or medical originals are mandatory?",
    "Do any documents require translation or certification?",
    "What deductible and item limits apply?",
    "What are the claim and follow-up document deadlines?",
  ];

  return (
    <main className="overflow-hidden bg-[#f6f7f2]">
      <section className="relative isolate bg-[#10221d] px-4 py-14 text-white sm:px-6 md:px-8 md:py-24">
        <div className="animate-soft-pulse absolute -right-24 top-10 h-80 w-80 rounded-full bg-[#0f766e]/40 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-[#c8f169]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_22rem] lg:items-end">
          <div>
            <Link href={`/${profile.code}`} className="text-sm font-bold text-[#9db0aa] transition hover:text-[#c8f169]">← AbroadWatch</Link>
            <p className="mt-12 text-xs font-black tracking-[.16em] text-[#c8f169]">RECOVERY DESK</p>
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-black leading-[.98] tracking-[-.06em] md:text-7xl">
              {isKo ? "증거를 모으는 순서가 청구서를 완성합니다." : "Build the evidence before you build the claim."}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#bdccc7]">
              {isKo ? "보험사가 판단할 수 있도록 사고 사실, 소유·지출 증명, 현장 기관 기록을 하나의 묶음으로 준비하세요." : "Give the insurer one connected record of the incident, ownership or expense, and the official on-site response."}
            </p>
          </div>
          <div className="animate-float-slow rounded-[2rem] border border-white/15 bg-white/[.08] p-3 backdrop-blur">
            <div className="rounded-[1.5rem] bg-[#c8f169] p-6 text-[#10221d]">
              <p className="text-[10px] font-black tracking-[.14em]">CLAIM KIT</p>
              <p className="mt-8 text-3xl font-black tracking-[-.05em]">{isKo ? "원본은 보관하고,\n모든 장면은 복사하세요." : "Keep originals.\nCopy every scene."}</p>
              <div className="mt-7 grid grid-cols-3 gap-2 text-center">
                {(["현장", "기관", "지출"] as const).map((item, index) => (
                  <div key={item} className="rounded-xl bg-white/60 p-3"><strong className="block text-lg">0{index + 1}</strong><span className="text-xs font-bold">{isKo ? item : ["Scene", "Record", "Cost"][index]}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#173c32]/10 bg-white">
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-4 sm:px-6 md:px-8" aria-label={isKo ? "청구 유형 바로가기" : "Claim type shortcuts"}>
          {claimTypes.map((type) => <a key={type.id} href={`#${type.id}`} className="whitespace-nowrap rounded-full border border-[#173c32]/10 px-4 py-2 text-sm font-black text-[#52645e] transition hover:border-[#0f766e] hover:text-[#0f766e]">{type.title}</a>)}
        </nav>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="text-xs font-black tracking-[.16em] text-[#0f766e]">THE FIRST 24 HOURS</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-.05em] md:text-5xl">{isKo ? "청구보다 먼저 해야 할 일" : "What comes before the claim"}</h2>
            <p className="mt-5 max-w-md leading-7 text-[#61716b]">{isKo ? "보험 접수는 마지막 단계가 아닙니다. 현장에서 공식 기록을 남기는 순간부터 청구가 시작됩니다." : "The claim starts when you create an official record on the ground, not when you upload a form."}</p>
          </div>
          <ol className="divide-y divide-[#173c32]/10 border-y border-[#173c32]/10">
            {phases.map(([time, title, body], index) => (
              <li key={title} className="grid gap-3 py-6 sm:grid-cols-[4rem_8rem_1fr] sm:items-start">
                <span className="text-xs font-black text-[#9aaba4]">0{index + 1}</span>
                <strong className="text-sm text-[#0f766e]">{time}</strong>
                <div><h3 className="font-black text-[#10221d]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#61716b]">{body}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:px-8 md:pb-24">
        <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div><p className="text-xs font-black tracking-[.16em] text-[#0f766e]">EVIDENCE PACKS</p><h2 className="mt-3 text-3xl font-black tracking-[-.05em] md:text-5xl">{isKo ? "사고 유형별로 챙기기" : "Pack by incident type"}</h2></div>
          <p className="max-w-md text-sm leading-6 text-[#61716b]">{isKo ? "항목을 휴대폰으로 촬영하고 파일명 앞에 날짜와 접수번호를 붙이면 제출할 때 찾기 쉽습니다." : "Photograph each item and prefix filenames with the date and case number."}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {claimTypes.map((type, index) => (
            <article id={type.id} key={type.id} className="group scroll-mt-28 rounded-[1.75rem] border border-[#173c32]/10 bg-white p-6 shadow-[0_12px_40px_rgba(16,34,29,.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(16,34,29,.1)] md:p-8">
              <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#dff7ef] text-xl font-black text-[#0f766e]">{type.icon}</span><span className="text-xs font-black text-[#b0bdb8]">0{index + 1}</span></div>
              <h3 className="mt-8 text-2xl font-black tracking-[-.04em] text-[#10221d]">{type.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#61716b]">{type.lead}</p>
              <ul className="mt-6 space-y-3">
                {type.items.map((item) => <li key={item} className="flex gap-3 text-sm font-bold text-[#31443d]"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-[#0f766e]/30 text-[10px] text-[#0f766e]">✓</span>{item}</li>)}
              </ul>
              <Link href={type.href} className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#0f766e] hover:underline">{isKo ? "관련 현장 대응 보기" : "Open incident response"} <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#eaf2ed] px-4 py-16 sm:px-6 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <div className="rounded-[2rem] bg-[#10221d] p-7 text-white md:p-10">
            <p className="text-xs font-black tracking-[.14em] text-[#c8f169]">CALL SCRIPT</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-.05em]">{isKo ? "보험사에 이 다섯 가지를 물어보세요." : "Ask the insurer these five questions."}</h2>
            <ol className="mt-8 space-y-3">{insurerQuestions.map((question, index) => <li key={question} className="flex gap-4 rounded-2xl bg-white/[.07] p-4 text-sm leading-6"><strong className="text-[#c8f169]">0{index + 1}</strong><span>{question}</span></li>)}</ol>
          </div>
          <div className="rounded-[2rem] bg-[#c8f169] p-7 text-[#10221d] md:p-10">
            <p className="text-xs font-black tracking-[.14em] text-[#0f5e57]">FOLDER RULE</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-.05em]">{isKo ? "한 사고, 한 폴더,\n한 개의 문서 목록." : "One incident.\nOne folder. One index."}</h2>
            <div className="mt-8 space-y-3">
              {(isKo ? ["01_사고경위·시간순서", "02_경찰·병원·항공사 원본", "03_소유·결제·지출 증명", "04_보험사 연락·접수번호", "05_제출본·추가요청 기록"] : ["01_Incident timeline", "02_Official originals", "03_Ownership and expenses", "04_Insurer contact log", "05_Submission history"]).map((item) => <div key={item} className="rounded-xl bg-white/60 px-4 py-3 text-sm font-black">{item}</div>)}
            </div>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-6xl text-xs leading-5 text-[#61716b]">{isKo ? "일반 정보이며 보험금 지급을 보장하지 않습니다. 실제 보장 범위, 자기부담금, 신고·청구 기한과 원본 요건은 가입한 증권과 보험사 안내를 따르세요. 치료나 신체 위험이 있으면 보험 승인보다 현지 응급기관 이용이 먼저입니다." : "General information only; it does not guarantee reimbursement. Follow your policy for coverage, deductibles, deadlines, and original-document rules. In a medical emergency, seek care before waiting for authorization."}</p>
      </section>
    </main>
  );
}
