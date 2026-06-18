import { redirect } from "next/navigation";
import { siteConfig } from "@/lib/site-config";

/** 루트 경로 → 기본 로케일(ko)로 리다이렉트 */
export default function RootPage() {
  redirect(`/${siteConfig.defaultLocale}`);
}
