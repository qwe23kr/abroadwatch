import { getEmergencyPassportEvidence } from "@/lib/emergency-passport-evidence";

interface Props {
  country: string;
  city: string;
}

export function PassportCostEvidence({ country, city }: Props) {
  const evidence = getEmergencyPassportEvidence(country, city);
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
