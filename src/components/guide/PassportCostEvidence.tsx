import {
  getEmergencyPassportEvidence,
  getTravelerPassportEvidence,
} from "@/lib/emergency-passport-evidence";
import type { TravelerProfile } from "@/lib/traveler-profiles";

interface Props {
  profile: TravelerProfile;
  country: string;
  city: string;
}

const copy = {
  en: { title: "Official document cost and timing", document: "Document", fee: "Official fee", time: "Processing guidance", note: "What to budget for", verified: "Checked", exact: "Official amount verified", local: "Local mission confirmation required", source: "Official source" },
  ko: { title: "공식 금액과 실제 필요한 시간", document: "발급 문서", fee: "공식 발급 수수료", time: "공식 처리 안내", note: "예산에서 빠지기 쉬운 부분", verified: "확인", exact: "공식 금액 확인", local: "현지 공관 금액 확인 필요", source: "공식 출처" },
  "zh-Hans": { title: "官方证件费用与办理时间", document: "证件类型", fee: "官方费用", time: "办理说明", note: "预算注意事项", verified: "核对", exact: "官方金额已核对", local: "须向当地使领馆确认", source: "官方来源" },
  ja: { title: "公的な発給手数料と所要時間", document: "発給書類", fee: "公的手数料", time: "処理案内", note: "予算上の注意", verified: "確認", exact: "公的金額を確認済み", local: "現地公館への確認が必要", source: "公式情報" },
  "zh-Hant": { title: "官方證件費用與辦理時間", document: "證件類型", fee: "官方費用", time: "辦理說明", note: "預算注意事項", verified: "核對", exact: "官方金額已核對", local: "須向當地館處確認", source: "官方來源" },
  th: { title: "ค่าธรรมเนียมและเวลาตามข้อมูลทางการ", document: "เอกสาร", fee: "ค่าธรรมเนียม", time: "ระยะเวลาดำเนินการ", note: "ค่าใช้จ่ายที่ควรเผื่อ", verified: "ตรวจสอบ", exact: "ยืนยันอัตราทางการแล้ว", local: "ต้องยืนยันกับสถานทูตในพื้นที่", source: "แหล่งข้อมูลทางการ" },
  vi: { title: "Lệ phí và thời gian theo nguồn chính thức", document: "Giấy tờ", fee: "Lệ phí chính thức", time: "Thời gian xử lý", note: "Khoản cần dự trù", verified: "Đã kiểm tra", exact: "Đã xác minh mức chính thức", local: "Cần xác nhận với cơ quan đại diện", source: "Nguồn chính thức" },
} as const;

export function PassportCostEvidence({ profile, country, city }: Props) {
  const evidence = getEmergencyPassportEvidence(country, city);
  const travelerEvidence = getTravelerPassportEvidence(profile.code);
  if (profile.language !== "ko" && !travelerEvidence) return null;
  const labels = copy[profile.language];

  if (profile.language !== "ko" && travelerEvidence) {
    return (
      <section className="my-10 rounded-[1.75rem] border border-[#0f766e]/20 bg-[#eef7f2] p-5 not-prose md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div><p className="text-xs font-black tracking-[.14em] text-[#0f766e]">OFFICIAL COST CHECK</p><h2 className="mt-2 text-2xl font-black tracking-[-.035em] text-[#10221d]">{labels.title}</h2></div>
          <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${travelerEvidence.feeVerified ? "bg-[#dff7ef] text-[#0f766e]" : "bg-[#fff4dc] text-[#8a5600]"}`}>{travelerEvidence.feeVerified ? labels.exact : labels.local}</span>
        </div>
        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          {([[labels.document, travelerEvidence.document], [labels.fee, travelerEvidence.fee], [labels.time, travelerEvidence.processing]] as const).map(([label, value]) => <div key={label} className="rounded-2xl bg-white p-5 shadow-sm"><dt className="text-xs font-bold text-[#788983]">{label}</dt><dd className="mt-2 text-base font-black leading-6 text-[#10221d]">{value}</dd></div>)}
        </dl>
        <p className="mt-4 text-sm leading-6 text-[#52645e]"><strong className="text-[#10221d]">{labels.note}:</strong> {travelerEvidence.note}</p>
        <p className="mt-4 text-xs leading-5 text-[#61716b]">{labels.verified} {travelerEvidence.verifiedAt} · <a href={travelerEvidence.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-black text-[#0f766e] underline underline-offset-2">{labels.source}: {travelerEvidence.sourceLabel} ↗</a></p>
      </section>
    );
  }
  if (!evidence) return null;

  return (
    <section className="my-10 rounded-[1.75rem] border border-[#0f766e]/20 bg-[#eef7f2] p-5 not-prose md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black tracking-[.14em] text-[#0f766e]">OFFICIAL COST CHECK</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-.035em] text-[#10221d]">공식 금액과 실제 필요한 시간</h2>
        </div>
        <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#61716b]">
          확인 {evidence.verifiedAt}
        </span>
      </div>

      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <dt className="text-xs font-bold text-[#788983]">공식 발급 수수료</dt>
          <dd className="mt-2 text-xl font-black text-[#10221d]">{evidence.feeLabel}</dd>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <dt className="text-xs font-bold text-[#788983]">공식 처리 안내</dt>
          <dd className="mt-2 text-xl font-black text-[#10221d]">{evidence.processing}</dd>
        </div>
        {evidence.extraFeeLabel && (
          <div className="rounded-2xl bg-[#fff4dc] p-5 shadow-sm sm:col-span-2">
            <dt className="text-xs font-bold text-[#9a5b00]">추가 현지 행정비용</dt>
            <dd className="mt-2 text-xl font-black text-[#6f4300]">{evidence.extraFeeLabel}</dd>
          </div>
        )}
      </dl>

      <div className="mt-4 space-y-3 text-sm leading-6 text-[#52645e]">
        <p><strong className="text-[#10221d]">공식 현장 안내:</strong> {evidence.fieldPattern}</p>
        <p><strong className="text-[#10221d]">예산에서 빠지기 쉬운 부분:</strong> {evidence.caveat}</p>
      </div>

      <div className="mt-6 rounded-2xl border border-[#173c32]/10 bg-white p-5">
        <h3 className="text-base font-black text-[#10221d]">총비용에 더해질 수 있는 항목</h3>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-[#52645e] sm:grid-cols-2">
          <li>• 여권사진 촬영비</li>
          <li>• 공관까지 왕복 교통비</li>
          <li>• 항공권 변경·재발권 수수료</li>
          <li>• 처리기간 동안의 추가 숙박비</li>
        </ul>
        <p className="mt-3 text-xs leading-5 text-[#788983]">
          위 비용은 일정과 예약 조건에 따라 차이가 커 평균값으로 단정하지 않습니다. 항공사 앱과 숙소 예약내역에서 본인에게 적용되는 금액을 확인하세요.
        </p>
      </div>

      <p className="mt-4 text-xs leading-5 text-[#61716b]">
        비공식 사례를 평균낸 값이 아니라 공관 공개자료를 기준으로 표시합니다. 숙박·교통·항공 변경비는 개인 일정에 따라 달라 계산기에 직접 입력합니다.{" "}
        <a
          href={evidence.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-black text-[#0f766e] underline underline-offset-2"
        >
          {evidence.sourceLabel} ↗
        </a>
      </p>
    </section>
  );
}
