import Link from "next/link";
import type { Locale } from "@/lib/site-config";
import type { TravelerProfile } from "@/lib/traveler-profiles";
import { responseCopy } from "@/lib/response-copy";
import { travelChecklists } from "@/lib/travel-checklists";

type CtaLanguage = Locale | TravelerProfile["language"];

interface TravelProblemCtaProps {
  language: CtaLanguage;
  travelerCode?: string;
  incident?: string;
}

export function TravelProblemCta({ language, travelerCode = language === "ko" ? "kr" : "us", incident }: TravelProblemCtaProps) {
  const copy = responseCopy[language];
  const claims = travelChecklists[language];
  const isPhone = incident === "lost-phone";
  return (
    <aside className="overflow-hidden rounded-2xl border border-[#173c32]/10 bg-white shadow-[0_12px_40px_rgba(16,34,29,.08)]">
      <div className="bg-[#10221d] p-5 text-white">
        <p className="text-[10px] font-black tracking-[.14em] text-[#c8f169]">AbroadWatch</p>
        <p className="mt-3 text-lg font-black leading-snug">{isPhone ? copy.title : claims.claimsTitle}</p>
      </div>
      <div className="p-4">
        <p className="text-sm leading-6 text-[#61716b]">{isPhone ? copy.saved : copy.honest}</p>
        <Link href={isPhone ? `/${travelerCode}/tools/lost-phone` : `/${travelerCode}/claims`} className="mt-4 flex items-center justify-between rounded-xl bg-[#c8f169] px-4 py-3 text-sm font-black text-[#10221d]">
          {isPhone ? copy.first : claims.claimsTitle}<span>→</span>
        </Link>
      </div>
    </aside>
  );
}
