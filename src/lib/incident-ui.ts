import type { IncidentType, Locale } from "./site-config";

/** 사건 유형 아이콘 */
export const incidentIcons: Record<IncidentType, string> = {
  "lost-passport": "📋",
  "lost-phone": "📱",
  "lost-wallet": "👛",
  hospital: "🏥",
  "police-report": "🚔",
  scam: "⚠️",
};

/** 홈·탐색용 상세 설명 — 모바일에서도 내용 파악 가능하도록 2문장 수준 */
export const incidentDescriptions: Record<IncidentType, Record<Locale, string>> = {
  "lost-passport": {
    ko: "여권을 잃어버렸을 때 경찰 신고서 발급, 항공편 변경, 대사관 긴급여권 신청까지 순서대로 안내합니다.",
    en: "Step-by-step: police report, flight changes, and emergency passport at your embassy after losing your passport.",
  },
  "lost-phone": {
    ko: "휴대폰 분실 시 원격 잠금, 통신사·카드사 정지, 경찰 신고, 여행자보험 청구 방법을 정리했습니다.",
    en: "Remote lock, carrier and card blocks, police report, and travel insurance claims after losing your phone.",
  },
  "lost-wallet": {
    ko: "지갑·카드 분실 시 즉시 카드 정지, 현지 경찰·대사관 연락, 보험용 분실 신고서 발급 절차입니다.",
    en: "Block cards immediately, contact police and embassy, and get a loss certificate for insurance.",
  },
  hospital: {
    ko: "응급실 위치, 현지 응급번호, 여권·보험 준비물, 한국어 통역 요청 방법을 도시별로 안내합니다.",
    en: "ER locations, local emergency numbers, documents to bring, and how to request a Korean interpreter.",
  },
  "police-report": {
    ko: "도난·분실 시 경찰서 신고 방법, 보험 청구용 확인서 발급, 외국인용 신고 멘트를 제공합니다.",
    en: "How to file theft or loss reports, get insurance certificates, and useful phrases at the police station.",
  },
  scam: {
    ko: "바·택시·환전 사기 등 현지 유형과 실제 후기 기반 예방법, 피해 발생 시 신고·연락처를 정리했습니다.",
    en: "Bar, taxi, and exchange scams — prevention tips from real reviews and what to do if you are scammed.",
  },
};
