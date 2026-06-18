/** 국가별 병원 가이드 문구 — 통화·결제 방식 혼용 방지 */

import type { Locale } from "../src/lib/site-config";

export interface HospitalCopy {
  onsetNote: string;
  insuranceNote: string;
  afterVisitNote: string;
  warningTitle: string;
  warningBody: string;
  estimatedCost: string;
  costTable: string[][];
  faqAnswer: string;
}

const KO: Record<string, HospitalCopy> = {
  vietnam: {
    onsetNote: "구급차 비용은 출동 기관에 확인",
    insuranceNote: "미연락 시 전액 선납 가능",
    afterVisitNote: "진료·검사·약 **단계별 선납** — 영수증 필수",
    warningTitle: "선납",
    warningBody: "베트남은 **진료·검사·약 모두 선납**. 현금+카드 준비.",
    estimatedCost: "1차 12.5만~110만 VND",
    costTable: [
      ["패밀리병원 1차", "40만 VND"],
      ["빈멕 예약/무예약", "69만/110만"],
      ["종합병원", "12.5만 VND"],
    ],
    faqAnswer:
      "방문 **전** 보험 콜센터 연락 — 미연락 시 전액 선납 후 사후 청구.",
  },
  japan: {
    onsetNote: "119는 일본어·영어 가능. 호텔 프론트 통역 요청",
    insuranceNote: "직접 청구 가능 병원·담보 범위 확인",
    afterVisitNote: "외국인 **자비 진료** — 영수증·영문 진단서 보관",
    warningTitle: "비용·결제",
    warningBody:
      "일본은 외국인 **자비 부담**이 일반적. 신용카드·여권·보험증 지참.",
    estimatedCost: "1차 5,000~30,000엔(병원·보험)",
    costTable: [
      ["응급실 1차", "5,000~30,000엔"],
      ["외래 예시", "3,000~15,000엔"],
      ["MRI 등", "병원별 견적"],
    ],
    faqAnswer:
      "방문 전 보험 콜센터에 **직접 청구 가능 여부** 확인 — 사후 청구 시 영수증·진단서 필요.",
  },
  thailand: {
    onsetNote: "1669 응급 · 1155 관광경찰",
    insuranceNote: "국제병원 direct billing 목록 확인",
    afterVisitNote: "국립·사립병원 **결제 방식 다름** — 영수증 보관",
    warningTitle: "비용·결제",
    warningBody:
      "국립병원 저렴·국제병원 비쌈. **보험 연결 병원** 사전 확인.",
    estimatedCost: "1차 2,000~15,000 THB",
    costTable: [
      ["국립병원 ER", "2,000~5,000 THB"],
      ["국제병원 ER", "10,000~15,000 THB"],
      ["약·검사", "별도"],
    ],
    faqAnswer: "보험 콜센터에서 **태국 내 직접 청구 병원** 확인 후 방문.",
  },
  taiwan: {
    onsetNote: "119 응급",
    insuranceNote: "건강보험 미가입 시 자비 — 보험 담보 확인",
    afterVisitNote: "**자비 진료** 후 보험 청구 — 영문 진단서 요청",
    warningTitle: "비용·결제",
    warningBody: "건강보험 미가입 외국인은 **전액 자비**. 카드·여권 지참.",
    estimatedCost: "1차 3,000~8,000 TWD",
    costTable: [
      ["응급실 1차", "3,000~8,000 TWD"],
      ["대형병원 ER", "병원별"],
      ["약·검사", "별도"],
    ],
    faqAnswer: "방문 전 보험사에 **대만 병원 직접 청구** 가능 여부 확인.",
  },
  philippines: {
    onsetNote: "911 긴급",
    insuranceNote: "deposit(보증금) 요구 병원 확인",
    afterVisitNote: "응급실 **deposit 후 진료** 흔함 — 영수증 보관",
    warningTitle: "비용·결제",
    warningBody: "일부 병원 **응급 deposit** 요구. 카드·여권·현금 준비.",
    estimatedCost: "1차 ₱5,000~50,000",
    costTable: [
      ["공립 ER", "₱5,000~15,000"],
      ["사립 ER", "₱20,000~50,000"],
      ["deposit", "병원별"],
    ],
    faqAnswer: "보험 콜센터에 **필리핀 병원 직접 청구** 및 담보 범위 확인.",
  },
};

const EN: Record<string, HospitalCopy> = {
  vietnam: {
    onsetNote: "Confirm ambulance cost with dispatch",
    insuranceNote: "Without prior approval, full prepayment is common",
    afterVisitNote: "Prepay at each step — keep all receipts",
    warningTitle: "Prepayment",
    warningBody: "In Vietnam, **consultation, tests, and meds are prepaid**. Bring cash and card.",
    estimatedCost: "125k–1.1M VND first visit",
    costTable: [
      ["Family Hospital first visit", "400k VND"],
      ["Vinmec booked/walk-in", "690k/1.1M"],
      ["General hospital", "125k VND"],
    ],
    faqAnswer: "Call your insurer **before** visiting — otherwise prepay and claim later.",
  },
  japan: {
    onsetNote: "119 supports Japanese/English; ask hotel front desk for help",
    insuranceNote: "Confirm direct-billing hospitals and coverage",
    afterVisitNote: "Foreign visitors usually pay **out of pocket** — keep receipts",
    warningTitle: "Costs & payment",
    warningBody: "Japan usually bills foreigners **directly**. Bring card, passport, and insurance card.",
    estimatedCost: "¥5,000–30,000 first visit (varies)",
    costTable: [
      ["ER first visit", "¥5,000–30,000"],
      ["Outpatient example", "¥3,000–15,000"],
      ["MRI etc.", "Hospital quote"],
    ],
    faqAnswer: "Check **direct billing** with your insurer before visiting; receipts needed for reimbursement.",
  },
  thailand: {
    onsetNote: "1669 medical emergency · 1155 tourist police",
    insuranceNote: "Confirm international hospitals with direct billing",
    afterVisitNote: "Public vs private hospitals bill differently — keep receipts",
    warningTitle: "Costs & payment",
    warningBody: "Public hospitals cost less; private/international cost more. Confirm insurer-linked hospitals.",
    estimatedCost: "2,000–15,000 THB first visit",
    costTable: [
      ["Public ER", "2,000–5,000 THB"],
      ["International ER", "10,000–15,000 THB"],
      ["Meds/tests", "Extra"],
    ],
    faqAnswer: "Ask your insurer for **direct-billing hospitals in Thailand** before you go.",
  },
  taiwan: {
    onsetNote: "119 emergency",
    insuranceNote: "Without NHI, expect self-pay — confirm coverage",
    afterVisitNote: "**Self-pay** then insurance claim — request English diagnosis",
    warningTitle: "Costs & payment",
    warningBody: "Foreign visitors without NHI usually pay **in full**. Bring card and passport.",
    estimatedCost: "3,000–8,000 TWD first visit",
    costTable: [
      ["ER first visit", "3,000–8,000 TWD"],
      ["Major hospital ER", "Varies"],
      ["Meds/tests", "Extra"],
    ],
    faqAnswer: "Confirm **direct billing in Taiwan** with your insurer before visiting.",
  },
  philippines: {
    onsetNote: "911 emergency",
    insuranceNote: "Some ERs require a deposit upfront",
    afterVisitNote: "**ER deposit** is common — keep receipts",
    warningTitle: "Costs & payment",
    warningBody: "Some hospitals require an **ER deposit**. Bring card, passport, and cash.",
    estimatedCost: "₱5,000–50,000 first visit",
    costTable: [
      ["Public ER", "₱5,000–15,000"],
      ["Private ER", "₱20,000–50,000"],
      ["Deposit", "Varies"],
    ],
    faqAnswer: "Confirm **direct billing and coverage in the Philippines** with your insurer.",
  },
};

const DEFAULT_KO: HospitalCopy = {
  onsetNote: "",
  insuranceNote: "직접 청구 가능 병원·담보 확인",
  afterVisitNote: "영수증·진단서 원본 보관",
  warningTitle: "준비물",
  warningBody: "신용카드·여권·여행자보험증 지참.",
  estimatedCost: "병원별 문의",
  costTable: [["ER 방문", "병원별 견적"]],
  faqAnswer: "방문 전 보험 콜센터 연락 — 직접 청구 또는 사후 청구 확인.",
};

const DEFAULT_EN: HospitalCopy = {
  onsetNote: "",
  insuranceNote: "Confirm direct-billing hospitals and coverage",
  afterVisitNote: "Keep original receipts and diagnosis",
  warningTitle: "What to bring",
  warningBody: "Bring card, passport, and travel insurance card.",
  estimatedCost: "Get a hospital quote",
  costTable: [["ER visit", "Varies by hospital"]],
  faqAnswer: "Call your insurer before visiting to confirm direct billing or reimbursement.",
};

/** 국가·로케일별 병원 가이드 문구 */
export function getHospitalCopy(country: string, locale: Locale): HospitalCopy {
  const table = locale === "ko" ? KO : EN;
  return table[country] ?? (locale === "ko" ? DEFAULT_KO : DEFAULT_EN);
}
