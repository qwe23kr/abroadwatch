import Link from "next/link";
import type { Locale } from "@/lib/site-config";
import type { TravelerProfile } from "@/lib/traveler-profiles";

type CtaLanguage = Locale | TravelerProfile["language"];

interface TravelProblemCtaProps {
  language: CtaLanguage;
  travelerCode?: string;
  incident?: string;
}

export function TravelProblemCta({ language, travelerCode = language === "ko" ? "kr" : "us", incident }: TravelProblemCtaProps) {
  const isKo = language === "ko";
  const isPhone = incident === "lost-phone";
  return (
    <aside className="overflow-hidden rounded-2xl border border-[#173c32]/10 bg-white shadow-[0_12px_40px_rgba(16,34,29,.08)]">
      <div className="bg-[#10221d] p-5 text-white">
        <p className="text-[10px] font-black tracking-[.14em] text-[#c8f169]">{isPhone ? "60-SECOND TOOL" : "RECOVERY DESK"}</p>
        <p className="mt-3 text-lg font-black leading-snug">{isPhone ? (isKo ? "휴대폰 분실 대응 순서를 체크하세요." : "Check your lost-phone response.") : (isKo ? "보험 청구에 필요한 증거를 확인하세요." : "Preserve evidence for your claim.")}</p>
      </div>
      <div className="p-4">
        <p className="text-sm leading-6 text-[#61716b]">{isPhone ? (isKo ? "잠금부터 경찰 신고까지 완료한 항목을 바로 기록할 수 있습니다." : "Track every step from device lock to police report.") : (isKo ? "현장에서 놓치기 쉬운 서류를 사고 유형별로 정리했습니다." : "See the documents commonly missed at the scene.")}</p>
        <Link href={isPhone ? `/${travelerCode}/tools/lost-phone` : `/${travelerCode}/claims`} className="mt-4 flex items-center justify-between rounded-xl bg-[#c8f169] px-4 py-3 text-sm font-black text-[#10221d]">
          {isPhone ? (isKo ? "60초 대응 시작" : "Start the checklist") : (isKo ? "청구 체크리스트" : "Claims checklist")}<span>→</span>
        </Link>
      </div>
    </aside>
  );
}
