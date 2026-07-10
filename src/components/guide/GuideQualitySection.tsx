import type { IncidentType } from "@/lib/site-config";
import type { TravelerProfile } from "@/lib/traveler-profiles";

interface GuideQualitySectionProps {
  profile: TravelerProfile;
  countryName: string;
  cityName: string;
  incidentName: string;
  incident: IncidentType;
  emergencyNumber?: string;
}

const incidentAdviceEn: Record<IncidentType, string[]> = {
  "lost-passport": [
    "Treat the first hour as evidence collection, not paperwork. Search the last known location, ask the hotel or transport operator, and write down who checked which place.",
    "Do not assume a police report and an emergency passport are the same step. The police record usually supports the consular application, insurance claim, and airline explanation.",
    "Before crossing the city to a mission, call and ask about photo size, identity proof, payment method, intake cutoff, and whether an appointment is required that day.",
  ],
  "lost-phone": [
    "Secure accounts before replacing the device. Save screenshots of the last location, suspend the SIM or eSIM, and lock payment apps before a thief can reset recovery options.",
    "If travel insurance is involved, keep the IMEI, purchase record, police case number, and carrier suspension confirmation together.",
    "A temporary SIM is useful only if it preserves access to banking, maps, hotel bookings, and airline messages. Test those accounts before leaving the shop.",
  ],
  "lost-wallet": [
    "Freeze cards first, then decide whether a police report is needed for theft, insurance, or card disputes. Cash recovery rarely matters more than blocking new charges.",
    "Separate the wallet problem from identity documents. If passport or national ID was inside, follow the document replacement flow as a second track.",
    "Keep screenshots of card approvals, ATM attempts, merchant names, and support chats because banks often ask for a timeline later.",
  ],
  hospital: [
    "For symptoms that could become urgent, use local emergency care first and insurer approval second. Delaying care can be more dangerous than a reimbursement dispute.",
    "Ask for itemized receipts, diagnosis notes, medicine names, and discharge records before leaving the clinic or hospital.",
    "If language is a problem, ask the provider to write the diagnosis, treatment, and follow-up restriction in short phrases that can be translated later.",
  ],
  "police-report": [
    "Explain the purpose of the report clearly: loss certificate, theft report, insurance evidence, or card dispute. The wording can change what document is issued.",
    "Before leaving the desk, check the date, station name, case number, your name, and item description. A photo of the paper is not always enough.",
    "If the office cannot issue a document, ask what written confirmation or reference number can be provided and where travelers usually request it.",
  ],
  scam: [
    "Move to a safe place before arguing about a charge. The strongest case is usually built from receipts, card records, photos, messages, and a clean timeline.",
    "For card payments, contact the issuer quickly and ask whether the transaction should be disputed, cancelled, or monitored for follow-up fraud.",
    "If threats, forced detention, or identity document pressure were involved, treat it as a safety incident and contact police or consular support.",
  ],
};

const incidentAdviceKo: Record<IncidentType, string[]> = {
  "lost-passport": [
    "처음 한 시간은 서류 접수보다 증거 확보가 먼저입니다. 마지막으로 여권을 본 장소, 숙소, 교통기관 분실물 센터를 확인하고 누가 어디를 확인했는지 적어두세요.",
    "경찰 신고와 긴급여권 발급은 같은 절차가 아닙니다. 경찰 확인서는 공관 접수, 보험 청구, 항공사 설명에 필요한 근거 자료가 되는 경우가 많습니다.",
    "공관까지 이동하기 전에 사진 규격, 신분 확인 자료, 결제 수단, 접수 마감 시간, 당일 예약 필요 여부를 전화로 확인하세요.",
  ],
  "lost-phone": [
    "기기 교체보다 계정 보호가 먼저입니다. 마지막 위치 화면을 저장하고, SIM/eSIM과 결제 앱을 정지한 뒤 원격 잠금을 실행하세요.",
    "보험 청구가 필요하면 IMEI, 구매 내역, 경찰 접수번호, 통신사 정지 확인 자료를 한 곳에 모아두는 것이 좋습니다.",
    "임시 SIM을 샀다면 은행, 지도, 호텔 예약, 항공사 알림 계정에 실제로 로그인되는지 매장을 떠나기 전에 확인하세요.",
  ],
  "lost-wallet": [
    "카드 정지가 현금 회수보다 먼저입니다. 이후 도난, 보험, 카드 분쟁 중 어떤 목적 때문에 경찰 신고가 필요한지 결정하세요.",
    "지갑 문제와 신분증 문제를 분리하세요. 여권이나 주민등록증이 같이 있었다면 문서 재발급 절차를 별도 트랙으로 진행해야 합니다.",
    "카드 승인 내역, ATM 시도, 상호명, 고객센터 대화 화면은 나중에 카드사와 보험사가 요구할 수 있으니 저장해두세요.",
  ],
  hospital: [
    "응급 가능성이 있으면 보험 승인보다 현지 응급 진료가 먼저입니다. 보상 문제보다 치료 지연이 더 큰 위험이 될 수 있습니다.",
    "병원이나 클리닉을 떠나기 전에 세부 영수증, 진단명, 처방약 이름, 퇴원 또는 진료 기록을 요청하세요.",
    "언어가 어렵다면 진단, 처치, 이동 제한, 재진 필요 여부를 짧은 문장으로 적어달라고 요청하면 이후 번역과 보험 청구가 쉬워집니다.",
  ],
  "police-report": [
    "신고 목적을 분명히 말하세요. 분실 확인서, 도난 신고, 보험 증빙, 카드 분쟁 중 무엇이 필요한지에 따라 문서가 달라질 수 있습니다.",
    "창구를 떠나기 전에 날짜, 경찰서명, 접수번호, 본인 이름, 물품 설명이 들어갔는지 확인하세요. 종이 사진만으로 부족할 수 있습니다.",
    "문서 발급이 어렵다면 어떤 확인번호나 서면 메모를 받을 수 있는지, 여행자가 보통 어디에서 다시 요청하는지 물어보세요.",
  ],
  scam: [
    "현장에서 오래 다투기보다 안전한 장소로 이동하세요. 영수증, 카드 승인 내역, 사진, 메시지, 시간 순서가 가장 강한 증거입니다.",
    "카드 결제라면 카드사에 빨리 연락해 해외 분쟁, 승인 취소, 추가 부정사용 모니터링 중 무엇을 해야 하는지 확인하세요.",
    "협박, 억류, 여권 압박이 있었다면 단순 환불 문제가 아니라 안전 문제로 보고 경찰이나 공관 지원을 함께 고려하세요.",
  ],
};

export function GuideQualitySection({
  profile,
  countryName,
  cityName,
  incidentName,
  incident,
  emergencyNumber,
}: GuideQualitySectionProps) {
  const isKo = profile.language === "ko";
  const advice = isKo ? incidentAdviceKo[incident] : incidentAdviceEn[incident];
  const heading = isKo
    ? `${cityName}에서 ${incidentName} 상황을 판단하는 기준`
    : `How to make the right call in ${cityName}`;
  const intro = isKo
    ? `${countryName} ${cityName}에서 같은 ${incidentName} 상황이라도 분실, 도난, 응급, 보험 청구 목적에 따라 먼저 해야 할 일이 달라집니다. 아래 기준은 사용자가 실제로 현장에서 시간을 잃는 지점을 줄이기 위해 정리한 보강 가이드입니다.`
    : `The right next step for ${incidentName.toLowerCase()} in ${cityName}, ${countryName} depends on whether the issue is loss, theft, medical urgency, insurance evidence, or consular documentation. Use these checks to avoid losing time on the wrong office or the wrong document.`;

  return (
    <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
      <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
        {isKo ? "현장 판단 가이드" : "Field decision guide"}
      </p>
      <h2 className="mt-2 text-xl font-bold leading-snug text-gray-950 md:text-2xl">
        {heading}
      </h2>
      <p className="mt-3 text-sm leading-6 text-gray-700">{intro}</p>

      <div className="mt-5 grid gap-3">
        {advice.map((item, index) => (
          <article key={item} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <h3 className="text-sm font-bold text-gray-900">
              {isKo ? `${index + 1}. 확인 포인트` : `Check ${index + 1}`}
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-700">{item}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <h3 className="text-sm font-bold text-blue-950">
            {isKo ? "긴급 연락" : "Emergency contact"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-blue-900">
            {emergencyNumber
              ? `${cityName}: ${emergencyNumber}`
              : isKo
                ? "본문의 현지 기관 연락처를 먼저 확인하세요."
                : "Check the local contacts listed in this guide."}
          </p>
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <h3 className="text-sm font-bold text-blue-950">
            {isKo ? "국적별 확인" : "Nationality check"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-blue-900">
            {profile.nativeName} · {profile.consularHotline}
          </p>
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <h3 className="text-sm font-bold text-blue-950">
            {isKo ? "공식 안내" : "Official source"}
          </h3>
          <a
            href={profile.officialGuidance}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex text-sm font-semibold text-blue-700 hover:underline"
          >
            {isKo ? "출발 전 다시 확인" : "Recheck before you go"}
          </a>
        </div>
      </div>
    </section>
  );
}

