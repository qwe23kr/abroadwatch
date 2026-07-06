import type { IncidentType } from "@/lib/site-config";
import type { TravelerProfile } from "@/lib/traveler-profiles";

interface TravelerDepthSectionProps {
  profile: TravelerProfile;
  countryName: string;
  cityName: string;
  incidentName: string;
  incident: IncidentType;
}

const checksKo: Record<IncidentType, string[]> = {
  "lost-passport": [
    "분실 장소, 숙소, 교통기관 분실물 센터를 먼저 확인",
    "경찰 신고 접수번호와 서면 확인서를 가능한 범위에서 확보",
    "공관 방문 전 사진 규격, 접수 마감, 수수료를 전화로 재확인",
  ],
  "lost-phone": [
    "원격 잠금과 위치 확인을 먼저 실행",
    "SIM/eSIM과 결제 앱을 즉시 정지",
    "보험 청구를 위해 IMEI, 구매 내역, 경찰 신고 확인서를 보관",
  ],
  "lost-wallet": [
    "카드 정지와 현금 인출 차단을 먼저 진행",
    "도난 가능성이 있으면 경찰 신고 확인서를 확보",
    "여권이나 신분증까지 함께 잃어버렸는지 분리 확인",
  ],
  hospital: [
    "응급이면 보험사보다 현지 긴급번호가 먼저",
    "여권, 보험증권, 결제 가능한 카드를 준비",
    "진료기록과 영수증 원본은 보험 청구용으로 보관",
  ],
  "police-report": [
    "신고 목적이 분실, 도난, 보험 중 무엇인지 명확히 설명",
    "접수번호, 담당 경찰서, 날짜가 문서에 있는지 확인",
    "번역 앱 화면과 물품 사진을 함께 보여주기",
  ],
  scam: [
    "현장에서 오래 다투기보다 안전한 장소로 먼저 이동",
    "영수증, 카드 승인내역, 간판, 차량번호를 사진으로 보관",
    "카드 결제는 즉시 카드사에 해외분쟁 접수",
  ],
};

const checksEn: Record<IncidentType, string[]> = {
  "lost-passport": [
    "Check the loss site, hotel, and transport lost-and-found first",
    "Get a police case number and written loss certificate if available",
    "Call the mission before visiting to confirm photo rules, cutoff time, and fees",
  ],
  "lost-phone": [
    "Run remote lock and location checks first",
    "Suspend SIM/eSIM and payment apps immediately",
    "Keep IMEI, purchase evidence, and the police report for insurance",
  ],
  "lost-wallet": [
    "Freeze cards and block cash withdrawals first",
    "Get a police report if theft is possible",
    "Check separately whether passport or ID was also lost",
  ],
  hospital: [
    "For emergencies, call the local emergency number before waiting for insurer approval",
    "Prepare passport, insurance policy, and a working payment method",
    "Keep original medical records and receipts for insurance",
  ],
  "police-report": [
    "State whether the report is for loss, theft, or insurance",
    "Check the case number, police station, and date",
    "Show translation app text and item photos together",
  ],
  scam: [
    "Move to a safe place before arguing on site",
    "Photograph receipts, payment records, storefronts, and vehicle numbers",
    "For card payments, start a dispute with your issuer quickly",
  ],
};

const warningKo: Record<IncidentType, string> = {
  "lost-passport":
    "공관에 분실 신고부터 해버리면 나중에 여권을 찾아도 사용할 수 없는 경우가 있습니다. 찾기와 경찰 확인을 먼저 끝내세요.",
  "lost-phone":
    "위치 추적 화면을 저장하지 않고 로그아웃하거나 초기화하면 보험과 경찰 설명이 어려워질 수 있습니다.",
  "lost-wallet":
    "현금 회수에 매달리다 카드 정지가 늦어지는 경우가 많습니다. 결제 차단이 먼저입니다.",
  hospital:
    "응급 상황에서 보험사 승인만 기다리면 위험할 수 있습니다. 생명이나 신체 위험이 있으면 응급번호와 병원 접수가 먼저입니다.",
  "police-report":
    "구두 상담만 하고 나오면 보험 청구가 막힐 수 있습니다. 접수번호가 있는 문서가 필요한지 확인하세요.",
  scam:
    "현장에서 오래 맞서면 더 위험해질 수 있습니다. 안전한 장소로 이동하고 증거 보관을 먼저 하세요.",
};

const warningEn: Record<IncidentType, string> = {
  "lost-passport":
    "Do not start by cancelling the passport unless necessary. If it is invalidated, a later-found passport may no longer work.",
  "lost-phone":
    "Do not wipe or sign out before saving location and device evidence.",
  "lost-wallet":
    "Do not delay card freezes while trying to recover cash.",
  hospital:
    "In an emergency, do not wait only for insurer approval. Contact emergency care first.",
  "police-report":
    "Do not leave after only a verbal conversation. Confirm whether a case number or written document exists.",
  scam:
    "Do not argue for too long on site. Move somewhere safe and preserve evidence first.",
};

export function TravelerDepthSection({
  profile,
  countryName,
  cityName,
  incidentName,
  incident,
}: TravelerDepthSectionProps) {
  const isKo = profile.language === "ko";
  const checks = isKo ? checksKo[incident] : checksEn[incident];
  const warning = isKo ? warningKo[incident] : warningEn[incident];
  const cards = isKo
    ? ["반복되는 막힘", "서류와 증거", "시간 손실 방지"]
    : ["Repeated pattern", "Documents and evidence", "Avoid lost time"];

  return (
    <section className="mt-10 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 md:p-6">
      <h2 className="text-xl font-bold text-gray-950">
        {isKo
          ? "여행자가 자주 막히는 부분을 한 번 더 확인"
          : "Double-check the points travelers keep running into"}
      </h2>
      <p className="mt-2 text-sm leading-6 text-gray-700">
        {isKo
          ? `${profile.nativeName} 여행자가 ${countryName} ${cityName}에서 ${incidentName} 상황을 겪을 때 반복해서 놓치기 쉬운 부분만 다시 정리했습니다.`
          : `These are the extra checks ${profile.nativeName} travelers often need when handling ${incidentName} in ${cityName}, ${countryName}.`}
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {checks.map((item, index) => (
          <div key={item} className="rounded-xl border border-white bg-white p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
              {cards[index]}
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-700">{item}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <h3 className="text-sm font-bold text-gray-900">
            {isKo ? "현장에서 다시 확인할 것" : "Confirm on the ground"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            {cityName} · {countryName} · {incidentName}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <h3 className="text-sm font-bold text-gray-900">
            {isKo ? "공식 확인" : "Official confirmation"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            {isKo
              ? `절차, 수수료, 접수 마감은 바뀔 수 있으니 이동 전 ${profile.consularHotline} 또는 해당 기관 공식 안내로 재확인하세요.`
              : `Procedures, fees, and cut-off times can change. Reconfirm through ${profile.consularHotline} or the responsible official office before traveling across town.`}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <h3 className="text-sm font-bold text-amber-950">
          {isKo ? "이동하기 전 체크" : "Check before you move"}
        </h3>
        <p className="mt-2 text-sm leading-6 text-amber-900">{warning}</p>
      </div>

      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4">
        <h3 className="text-sm font-bold text-gray-900">
          {isKo
            ? "나중에 보험, 공관, 경찰에서 다시 요구하는 자료"
            : "Details insurance, missions, or police often ask for later"}
        </h3>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-gray-700 md:grid-cols-2">
          {(isKo
            ? ["여권/신분증 사본 또는 사진", "사건 발생 시간과 장소 메모", "영수증, 카드 승인내역, 예약번호", "경찰 접수번호 또는 해당 기관명"]
            : ["Passport/ID copy or photo", "Time and place of the incident", "Receipts, card records, or booking numbers", "Police case number or office name"]
          ).map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
