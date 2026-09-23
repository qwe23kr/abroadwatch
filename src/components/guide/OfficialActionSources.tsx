import Link from "next/link";
import { responseCopy } from "@/lib/response-copy";
import type { TravelerProfile } from "@/lib/traveler-profiles";
import type { IncidentType } from "@/lib/site-config";

const localSources: Record<string, { name: string; url: string }> = {
  tokyo: { name: "警視庁 · Lost and Found", url: "https://www.keishicho.metro.tokyo.lg.jp/multilingual/english/finding_services/lost_and_found/lost_found.html" },
  osaka: { name: "大阪府警察 · Lost Articles", url: "https://www.police.pref.osaka.lg.jp/foreign_languag_selection/english/1/2/1/1/index.html" },
};
const tokyoNotes: Record<TravelerProfile["language"], string> = {
  ko: "도쿄 경시청은 분실 신고서를 경찰서·파출소에 방문 제출하도록 안내합니다. 이메일 접수는 받지 않으며, 연락받을 일본 전화번호를 준비해야 합니다. 교통기관이 물건을 보관할 수도 있으므로 이용한 철도·버스에도 확인하세요.",
  en: "Tokyo police ask you to submit the lost-property form in person, not by email, and provide a Japanese callback number. Check the transport operator too: it may still hold the item.",
  "zh-Hans": "东京警视厅要求到警署或派出所提交遗失报告，不接受邮件，并提供日本联系电话。也请联系乘坐的交通机构，物品可能仍由其保管。",
  "zh-Hant": "東京警視廳要求到警署或派出所提交遺失報告，不接受電子郵件，並提供日本聯絡電話。也請聯絡搭乘的交通機構，物品可能仍由其保管。",
  ja: "警視庁の案内では遺失届を警察署・交番に持参します。メールでは受理されず、日本国内の連絡先が必要です。交通機関が保管している場合もあるため、利用した事業者にも確認してください。",
  th: "ตำรวจโตเกียวให้ยื่นแบบแจ้งของหายที่สถานีหรือป้อมตำรวจ ไม่รับทางอีเมล และให้หมายเลขติดต่อในญี่ปุ่น ควรถามผู้ให้บริการขนส่งด้วย เพราะอาจยังเก็บสิ่งของไว้",
  vi: "Cảnh sát Tokyo yêu cầu nộp đơn báo mất trực tiếp, không qua email, và cung cấp số liên hệ tại Nhật. Hãy hỏi cả đơn vị vận tải vì họ có thể vẫn giữ đồ.",
};

export function OfficialActionSources({ profile, country, city, incident }: { profile: TravelerProfile; country: string; city: string; incident: IncidentType }) {
  const copy = responseCopy[profile.language];
  const lostProperty = ["lost-phone", "lost-wallet", "lost-passport", "police-report"].includes(incident);
  const local = lostProperty ? localSources[city] : undefined;
  const links = [
    ...(local ? [local] : []),
    ...(lostProperty && country === "south-korea" ? [{ name: "경찰청 · LOST112", url: "https://lost112.go.kr/manyLanguage.do?langType=en" }] : []),
    ...(incident === "lost-phone" ? [{ name: "Apple · Find My", url: "https://support.apple.com/en-us/101593" }, { name: "Google · Find Hub", url: "https://support.google.com/accounts/answer/6160491" }] : []),
  ];
  if (!links.length) return null;
  return <section data-official-sources className="my-8 rounded-2xl border border-[#0f766e]/20 bg-[#eef7f2] p-5 not-prose">
    <h2 className="text-xl font-bold">{copy.sources}</h2>
    {city === "tokyo" && lostProperty && <p className="mt-3 text-sm leading-7">{tokyoNotes[profile.language]}</p>}
    <ul className="mt-4 space-y-3">{links.map(link => <li key={link.url}><a href={link.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0f766e] underline underline-offset-4">{link.name} ↗</a></li>)}</ul>
    {incident === "lost-phone" && <Link href={`/${profile.code}/tools/lost-phone`} className="mt-5 inline-block rounded-xl bg-[#10221d] px-4 py-3 text-sm font-bold text-white">{copy.title} →</Link>}
  </section>;
}
