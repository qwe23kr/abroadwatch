import fs from "fs";
import path from "path";

function filesIn(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? filesIn(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
}
const replacements = [
  ["보험 청구 시 **「도난」** 으로 기록 요청. 「분실」만 적히면 보험 거절되는 경우 많음.", "분실·도난은 실제 경위대로 신고하세요. 보험 보장 범위와 제출 서류는 가입 약관과 보험사에 확인하세요."],
  ["(영문 기록 시 Stolen / Theft, Lost 아님)", "(영문 신고도 실제 분실·도난 경위에 맞게 작성)"],
  ["경찰 신고 **도난** 기록 요청(보험).", "경찰에 실제 경위를 설명하고 보험사에 보장 범위를 확인하세요."],
  ["Request Stolen not Lost", "Report the facts accurately; confirm coverage with your insurer"],
  ["Request **Stolen** not **Lost** on police report.", "Describe the actual circumstances to police. Ask your insurer which documents and coverage apply."],
  ["24hr golden window", "Secure accounts as soon as possible"],
  ["도난 후 24시간이 2차 피해 방지 골든타임", "지체하지 말고 회선과 결제 수단을 보호하세요"],
  ["경찰 확인서 사본·IMEI·영수증 제출 → 2~4주 보상", "경찰 확인서·IMEI·영수증 제출 후 보장 여부와 처리 기간을 보험사에 확인"],
  ["경찰 1~3시간 · 보험 2~4주", "접수 대기와 보험 처리 기간은 기관별 확인"],
  ["Police 1–3 hrs · insurance 2–4 weeks", "Confirm police waiting times and claim processing with each provider"],
  ['time="2~4주"', 'time="보험사 확인"'],
  ['time="2–4 weeks"', 'time="Confirm with insurer"'],
  ['time: "2~4주"', 'time: "보험사 확인"'],
  ['time: "2–4 weeks"', 'time: "Confirm with insurer"'],
] as const;
let changed = 0;
for (const file of [...filesIn("content").filter((file) => file.endsWith(".mdx")), "scripts/ko-terms.ts", "scripts/city-data.ts", "scripts/generate-mdx.ts"]) {
  const original = fs.readFileSync(file, "utf8");
  let next = original;
  for (const [from, to] of replacements) next = next.replaceAll(from, to);
  // A search results page does not establish a reported experience.
  next = next.replace(/<ReviewNote\b[^>]*url="https:\/\/(?:www\.)?reddit\.com\/[^"\n]*"[^>]*>[\s\S]*?<\/ReviewNote>\s*/g, "");
  // A national mission directory plus the reader's city is not a verified office location.
  if (file.endsWith(".mdx") && !/[\\/](ko|kr|en)[\\/]/.test(file)) {
    next = next.replace(/(<ContactCard\s+name="([^"]+)"\s+phone="[^"]+"\s+website="[^"]+"\s+note="[^"]*"\s*\/>\s*)<GoogleMap\s+query="[^"]+"\s+title="\2"\s*\/>/g, "$1");
    // The country-wide hotline is already labeled in NationalityProofSection.
    next = next.replace(/(<ContactCard\s+name="[^"]+"\s*)phone="[^"]+"\s*(website="[^"]+"\s+note="[^"]*"\s*\/>)/g, "$1$2");
  }
  if (file.endsWith("scam.mdx") && !next.includes("<ReviewNote")) {
    const country = file.includes("japan") ? "japan" : file.includes("philippines") ? "philippines" : undefined;
    if (country) {
      const ko = /[\\/](ko|kr)[\\/]/.test(file);
      const note = `<ReviewNote label="${ko ? "국가별 안전 참고 자료" : "Country safety reference"}" source="Smartraveller · ${country}" url="https://www.smartraveller.gov.au/destinations/asia/${country}">\n${ko ? "호주 외교부의 현지 범죄·사기 주의 안내입니다. 국적별 영사 업무와 개별 피해액·처리 기간의 근거는 별도로 확인해야 합니다." : "Australian government advice on local crime and scams. Nationality-specific consular procedures, individual loss amounts and processing times need separate confirmation."}\n</ReviewNote>\n\n`;
      next = next.replace(/(<EmergencyBanner[^>]+\/>\s*)/, `$1${note}`);
    }
  }
  if (next !== original) {
    if (file.endsWith(".mdx")) next = next.replace(/updatedAt: "[^"]+"/, `updatedAt: "${new Date().toISOString().slice(0, 10)}"`);
    fs.writeFileSync(file, next, "utf8"); changed++;
  }
}
console.log(`Refined ${changed} content and generator files.`);
