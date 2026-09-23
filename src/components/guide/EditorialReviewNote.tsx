import Link from "next/link";
import type { TravelerProfile } from "@/lib/traveler-profiles";
import { responseCopy } from "@/lib/response-copy";
export function EditorialReviewNote({ profile, publishedAt, reviewedAt }: { profile: TravelerProfile; publishedAt: string; reviewedAt: string }) {
  const copy = responseCopy[profile.language];
  return <aside className="mt-5 rounded-2xl border border-[#173c32]/10 bg-[#f1f5ef] p-4 text-sm leading-6 text-[#52645e]"><p>{copy.scope}</p><p className="mt-2">{copy.published} <time dateTime={publishedAt}>{publishedAt}</time> · {copy.updated} <time dateTime={reviewedAt}>{reviewedAt}</time></p><div className="mt-2 flex flex-wrap gap-4 font-bold text-[#0f766e] underline underline-offset-4"><Link href={`/${profile.code}/editorial`}>{copy.policy}</Link><Link href={`/${profile.code}/contact`}>{copy.report}</Link></div></aside>;
}
