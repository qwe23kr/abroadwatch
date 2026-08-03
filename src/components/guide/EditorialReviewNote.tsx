import Link from "next/link";
import type { TravelerProfile } from "@/lib/traveler-profiles";

interface EditorialReviewNoteProps {
  profile: TravelerProfile;
  publishedAt: string;
  reviewedAt: string;
}

export function EditorialReviewNote({
  profile,
  publishedAt,
  reviewedAt,
}: EditorialReviewNoteProps) {
  const isKo = profile.language === "ko";

  return (
    <aside className="mt-5 rounded-2xl border border-[#173c32]/10 bg-[#f1f5ef] p-4 text-sm leading-6 text-[#52645e]">
      <p className="font-black text-[#10221d]">
        {isKo ? "AbroadWatch 편집팀이 공식 자료를 기준으로 검토했습니다." : "Reviewed by the AbroadWatch editorial team against official sources."}
      </p>
      <p className="mt-1">
        {isKo ? "게시" : "Published"}{" "}
        <time dateTime={publishedAt}>{publishedAt}</time>
        <span aria-hidden="true"> · </span>
        {isKo ? "마지막 자료 검토" : "Sources last reviewed"}{" "}
        <time dateTime={reviewedAt}>{reviewedAt}</time>
      </p>
      <p className="mt-1">
        {isKo
          ? "공관·현지 기관의 공식 안내와 연락처를 우선 확인하며, 운영시간과 비용은 방문 전에 다시 확인해야 합니다."
          : "Official mission and local-authority guidance is prioritized. Reconfirm hours and fees before visiting."}{" "}
        <Link
          href={`/${profile.code}/editorial`}
          className="font-bold text-[#0f766e] underline decoration-[#0f766e]/30 underline-offset-4"
        >
          {isKo ? "검토 기준 보기" : "Editorial standards"}
        </Link>
      </p>
    </aside>
  );
}
