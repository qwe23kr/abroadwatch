import { responseCopy } from "./response-copy";
import { travelerUi } from "./traveler-ui";
import type { TravelerProfile } from "./traveler-profiles";

const extra = {
  ko: ["상황에 맞는 가이드를 선택하세요.", "대응 체크리스트", "대응 시작", "대표 가이드", "자료와 편집 원칙", "귀국 후 준비", "보험 청구에 필요한 기록", "사고 경위와 지출 증빙을 정리하고 약관을 확인하세요.", "청구 준비 보기", "국가", "도시", "가이드"],
  en: ["Choose the guide for your situation.", "Response checklist", "Start checklist", "Selected guides", "Sources and editorial policy", "After your trip", "Records for an insurance claim", "Organize the incident record and receipts, and check your policy.", "Prepare a claim", "countries", "cities", "guides"],
  "zh-Hans": ["选择符合当前情况的指南。", "应对清单", "开始处理", "精选指南", "资料与编辑原则", "返程后准备", "保险申请所需记录", "整理事件经过及费用凭证，并核对保险条款。", "查看理赔准备", "个国家", "座城市", "份指南"],
  "zh-Hant": ["選擇符合目前情況的指南。", "應對清單", "開始處理", "精選指南", "資料與編輯原則", "返程後準備", "保險申請所需紀錄", "整理事件經過及費用憑證，並核對保險條款。", "查看理賠準備", "個國家", "座城市", "份指南"],
  ja: ["状況に合うガイドを選んでください。", "対応チェックリスト", "対応を始める", "ピックアップガイド", "資料と編集方針", "帰国後の準備", "保険請求に必要な記録", "経緯と支払いの証拠を整理し、保険約款を確認します。", "請求の準備を見る", "か国", "都市", "ガイド"],
  th: ["เลือกคู่มือให้ตรงกับสถานการณ์", "รายการรับมือ", "เริ่มดำเนินการ", "คู่มือที่คัดเลือก", "แหล่งข้อมูลและนโยบายบรรณาธิการ", "หลังเดินทางกลับ", "เอกสารสำหรับยื่นประกัน", "รวบรวมเหตุการณ์และใบเสร็จ แล้วตรวจสอบกรมธรรม์", "เตรียมยื่นประกัน", "ประเทศ", "เมือง", "คู่มือ"],
  vi: ["Chọn hướng dẫn phù hợp với tình huống.", "Danh sách xử lý", "Bắt đầu", "Hướng dẫn chọn lọc", "Nguồn và nguyên tắc biên tập", "Sau chuyến đi", "Hồ sơ yêu cầu bảo hiểm", "Sắp xếp diễn biến, chứng từ chi phí và kiểm tra hợp đồng bảo hiểm.", "Chuẩn bị hồ sơ", "quốc gia", "thành phố", "hướng dẫn"],
} as const;

export function homeCopy(profile: TravelerProfile) {
  const ui = travelerUi(profile);
  const response = responseCopy[profile.language];
  const x = extra[profile.language];
  return { eyebrow: ui.hub, hero: ui.hero, subtitle: ui.subtitle, search: ui.searchPlaceholder, searchButton: ui.searchButton,
    now: ui.browseIncident, nowSub: x[0], tool: x[1], toolTitle: response.title, toolBody: response.intro, toolCta: x[2],
    browse: ui.browseCountry, browseSub: ui.browseCountryDescription, popular: x[3], trust: x[4], claim: x[5], claimTitle: x[6], claimBody: x[7], claimCta: x[8], countries: x[9], cities: x[10], guides: x[11] };
}
