import { redirect } from "next/navigation";
/** 루트 경로 → 기본 국적(대한민국)으로 리다이렉트 */
export default function RootPage() {
  redirect("/kr");
}
