"use client";

import { useMemo, useState } from "react";

const koSteps = [
  { title: "기기 위치 확인·잠금", detail: "다른 기기에서 Apple 나의 찾기 또는 Google 내 기기 찾기를 열고 분실 모드와 연락 메시지를 설정하세요." },
  { title: "SIM·eSIM 정지", detail: "통신사 앱이나 고객센터에서 회선을 일시 정지하세요. 문자 인증 탈취를 막는 단계입니다." },
  { title: "결제와 금융앱 보호", detail: "등록된 교통카드·간편결제를 중지하고 은행 앱의 다른 기기 로그인을 확인하세요." },
  { title: "화면 증거 저장", detail: "마지막 위치, 기기 정보, IMEI, 연락 시각을 캡처하세요. 초기화 전에 먼저 보관합니다." },
  { title: "경찰 신고·접수번호 확보", detail: "도난 또는 보험 청구가 필요하면 기종, 색상, IMEI와 마지막 위치를 제시하고 접수번호를 받으세요." },
  { title: "보험 청구 자료 묶기", detail: "구매 내역, 경찰 확인서, 통신사 정지 내역, 위치 추적 화면을 한 폴더에 저장하세요." },
];

const enSteps = [
  { title: "Locate and lock the device", detail: "Use Find My or Find My Device, enable lost mode, and add a safe contact message." },
  { title: "Suspend the SIM or eSIM", detail: "Contact your carrier to prevent SMS verification and account takeover." },
  { title: "Protect payments and banking", detail: "Suspend wallet cards and review active sessions in banking apps." },
  { title: "Preserve screen evidence", detail: "Save the last location, device details, IMEI, and contact timeline before erasing anything." },
  { title: "File a police report", detail: "If theft or insurance is involved, provide the model, color, IMEI, and last location. Get a case number." },
  { title: "Build the claim file", detail: "Keep proof of purchase, police record, carrier suspension, and tracking screenshots together." },
];

export function LostPhoneChecklist({ isKo }: { isKo: boolean }) {
  const steps = isKo ? koSteps : enSteps;
  const [checked, setChecked] = useState<number[]>([]);
  const progress = useMemo(() => Math.round((checked.length / steps.length) * 100), [checked, steps.length]);
  const toggle = (index: number) => setChecked((value) => value.includes(index) ? value.filter((item) => item !== index) : [...value, index]);

  return (
    <div>
      <div className="mb-8 rounded-2xl bg-[#10221d] p-5 text-white">
        <div className="flex items-end justify-between"><span className="text-sm font-bold">{isKo ? "대응 진행률" : "Response progress"}</span><strong className="text-3xl font-black text-[#c8f169]">{progress}%</strong></div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#c8f169] transition-all duration-500" style={{ width: `${progress}%` }} /></div>
      </div>
      <ol className="space-y-3">
        {steps.map((step, index) => {
          const done = checked.includes(index);
          return (
            <li key={step.title}>
              <button type="button" onClick={() => toggle(index)} className={`w-full rounded-2xl border p-5 text-left transition ${done ? "border-[#0f766e] bg-[#dff7ef]" : "border-[#173c32]/10 bg-white hover:border-[#0f766e]/40"}`}>
                <span className="flex gap-4"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-black ${done ? "bg-[#0f766e] text-white" : "bg-[#eef1eb] text-[#52645e]"}`}>{done ? "✓" : index + 1}</span><span><strong className={`block ${done ? "text-[#0f5e57]" : "text-[#10221d]"}`}>{step.title}</strong><small className="mt-1.5 block text-sm leading-6 text-[#61716b]">{step.detail}</small></span></span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
