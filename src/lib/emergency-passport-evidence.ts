export interface EmergencyPassportEvidence {
  feeLabel: string;
  feeAmount: number;
  currency: string;
  processing: string;
  extraFeeLabel?: string;
  extraFeeAmount?: number;
  fieldPattern: string;
  caveat: string;
  sourceLabel: string;
  sourceUrl: string;
  verifiedAt: string;
}

const japanBase = {
  feeLabel: "긴급여권 6,500엔",
  feeAmount: 6500,
  currency: "JPY",
  extraFeeLabel: undefined,
  extraFeeAmount: undefined,
  caveat: "일본 내 공관별 적용 환율과 접수 시점에 따라 금액이 달라질 수 있으므로 엔화 현금과 최신 수수료를 확인하세요.",
  verifiedAt: "2026-06-17",
} as const;

export function getEmergencyPassportEvidence(
  country: string,
  city: string,
): EmergencyPassportEvidence | null {
  if (country === "japan") {
    if (city === "osaka" || city === "kyoto") {
      return {
        ...japanBase,
        processing: "가급적 당일 발급",
        fieldPattern: "오사카 총영사관은 업무일 평일 09:00~16:00 접수, 가급적 당일 발급으로 안내합니다.",
        sourceLabel: "주오사카 대한민국 총영사관 긴급여권 안내",
        sourceUrl: "https://overseas.mofa.go.kr/jp-osaka-ko/brd/m_20228/view.do?seq=1295925",
        verifiedAt: "2026-07-04",
      };
    }
    if (city === "fukuoka") {
      return {
        ...japanBase,
        processing: "접수 후 1~2영업일",
        fieldPattern: "후쿠오카 총영사관은 관광객 긴급여권을 업무일 기준 접수 후 1~2일로 안내합니다.",
        sourceLabel: "주후쿠오카 대한민국 총영사관 여권 분실 안내",
        sourceUrl: "https://overseas.mofa.go.kr/jp-fukuoka-ko/brd/m_1590/view.do?page=1&seq=1141554",
      };
    }
    return {
      ...japanBase,
      processing: "접수 공관에 당일 확인",
      fieldPattern: "일본 공관별로 당일 발급 또는 1~2영업일 안내가 달라 항공편을 확정하기 전에 수령 예정 시각을 받아야 합니다.",
      sourceLabel: "주센다이 대한민국 총영사관 2026년 수수료 안내",
      sourceUrl: "https://overseas.mofa.go.kr/jp-sendai-ko/brd/m_659/view.do?page=1&seq=1334102",
    };
  }

  if (country === "thailand") {
    return {
      feeLabel: "긴급여권 1,666바트",
      feeAmount: 1666,
      currency: "THB",
      processing: "통상 약 1일",
      fieldPattern: "공식 안내는 오전 신청 시 오후, 오후 신청 시 다음 날 오전 교부를 예시로 들며 신원조회에 따라 약 1주까지 걸릴 수 있다고 명시합니다.",
      caveat: "방콕 외 도시에서는 방콕 대사관까지 본인이 이동해야 합니다. 여권 없이 태국 국내선 탑승이 제한될 수 있어 육로 이동 가능 여부도 확인해야 합니다.",
      sourceLabel: "주태국 대한민국 대사관 여권 분실 안내",
      sourceUrl: "https://overseas.mofa.go.kr/th-ko/brd/m_3172/view.do?page=1&seq=667992",
      verifiedAt: "2025-12-11",
    };
  }

  if (country === "philippines") {
    return {
      feeLabel: "긴급여권 2,500페소",
      feeAmount: 2500,
      currency: "PHP",
      processing: "공식 안내 1일",
      fieldPattern: "주필리핀 대사관은 여행객 여권 분실자를 포함한 긴급여권의 소요일을 1일로 안내합니다.",
      caveat: city === "manila"
        ? "신청인 본인 방문이 필요하며 영사과 접수시간과 추가 서류를 방문 전에 확인하세요."
        : "세부·보라카이에서는 관할 공관과 실제 접수 장소를 먼저 확인하세요. 다른 섬으로 이동해야 한다면 탑승 가능한 신분증과 이동편부터 확인해야 합니다.",
      sourceLabel: "주필리핀 대한민국 대사관 긴급여권 안내",
      sourceUrl: "https://overseas.mofa.go.kr/ph-ko/brd/m_3630/view.do?page=1&seq=916238",
      verifiedAt: "2026-05-22",
    };
  }

  if (country === "taiwan") {
    return {
      feeLabel: "긴급여권 약 NT$1,590",
      feeAmount: 1590,
      currency: "TWD",
      processing: "공식 안내 당일 발급",
      fieldPattern: "주타이베이 대표부는 구비서류가 갖춰진 긴급여권을 당일 발급으로 안내합니다.",
      caveat: city === "taipei"
        ? "대표부 영사민원 접수시간은 평일 08:30~11:30, 14:00~16:00입니다."
        : "신청 장소는 타이베이 대표부입니다. 타이중·가오슝에서 타이베이까지 왕복 교통비와 접수시간을 함께 계산해야 합니다.",
      sourceLabel: "주타이베이 대한민국 대표부 긴급여권 안내",
      sourceUrl: "https://overseas.mofa.go.kr/tw-ko/brd/m_1437/view.do?page=1&seq=1346570",
      verifiedAt: "2026-03-01 수수료 인상 반영",
    };
  }

  if (country === "vietnam") {
    return {
      feeLabel: "긴급여권 US$50",
      feeAmount: 50,
      currency: "USD",
      processing: "긴급여권 1일 + 출국승인 통상 5영업일",
      extraFeeLabel: "출국비자 안내금액 US$35",
      extraFeeAmount: 35,
      fieldPattern: "긴급여권 발급만으로 출국 절차가 끝나지 않습니다. 베트남 출입국기관의 별도 출국 승인 또는 비자 처리가 필요할 수 있습니다.",
      caveat: city === "hanoi" || city === "ho-chi-minh-city"
        ? "공관 접수 뒤 출입국기관 처리기간까지 포함해 항공편을 조정하세요."
        : "다낭·나트랑에서는 관할 공관과 출입국기관까지의 이동시간도 추가됩니다. 현지 공관에 실제 접수 장소부터 확인하세요.",
      sourceLabel: "주베트남 대한민국 대사관 2026 여권 FAQ",
      sourceUrl: "https://overseas.mofa.go.kr/vn-ko/brd/m_26405/view.do?seq=4",
      verifiedAt: "2026-07-13",
    };
  }

  return null;
}
