/** 한국어 가이드용 순수 한국어 표현 — 한자·로마자 혼용 최소화 */

/** 일본 여권 분실 시 경찰서에서 쓸 일본어 — local-phrases.ts 로 이동됨, 하위 호환 re-export */
export {
  LOCAL_PHRASES,
  localPhraseBlock,
  renderLocalPhrase,
} from "./local-phrases";

/** 국가별 경찰 신고서 한국어 명칭 */
export function policeReportName(country: string): string {
  switch (country) {
    case "japan":
      return "분실신고 접수증 (유실물 신고 확인서)";
    case "taiwan":
      return "분실·도난 접수증";
    case "thailand":
    case "philippines":
    case "vietnam":
      return "경찰 신고 확인서";
    default:
      return "경찰 분실·도난 신고 확인서";
  }
}

/** 코반 설명 (최초 1회만) */
export const KOBAN_EXPLAIN =
  "경찰 파출소(일본어: 코반) — 길가 작은 경찰 상자, 대부분 24시간";

export function kobanAction(policeNameKo: string, phone?: string): string {
  const tel = phone ? ` · 전화 ${phone}` : "";
  return `${policeNameKo} 방문 → ${policeReportName("japan")} 발급${tel}`;
}

export function kobanActionDetail(policeNameKo: string, phone?: string): string {
  const tel = phone ? ` (${phone})` : "";
  return `${policeNameKo}${tel}에 가서 「여권 분실 신고서 발급」 요청. 접수 번호·도장 있는 원본 꼭 받기. 아래 「현지어」 박스의 한글 발음대로 읽거나 화면을 보여주세요.`;
}

/** 한국어 경찰 헤더 */
export function policeSectionHeader(country: string): string {
  if (country === "japan") return "경찰 파출소·경찰서";
  return "경찰서";
}

/** Find My 한국어 */
export const FIND_MY_KO =
  "아이폰 「찾기」 앱 / 구글 「기기 찾기」(android.com/find)";

/** 보험용 경찰 신고 요청 문장 */
export function insuranceReportRequest(country: string): string {
  if (country === "thailand") {
    return "「여행자 보험 청구용 경찰 신고 확인서가 필요합니다」라고 처음부터 말하기";
  }
  return "「보험 청구용 경찰 신고 확인서가 필요합니다」라고 처음부터 말하기";
}

/** 도난 vs 분실 */
export const THEFT_VS_LOST_KO =
  "보험 청구 시 **「도난」** 으로 기록 요청. 「분실」만 적히면 보험 거절되는 경우 많음.";

export const STOLEN_EN_NOTE = "(영문 기록 시 Stolen / Theft, Lost 아님)";
