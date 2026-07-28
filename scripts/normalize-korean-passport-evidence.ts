import fs from "node:fs";
import path from "node:path";

type Values = { cost: string; time: string };

const countryValues: Record<string, Values> = {
  japan: { cost: "긴급여권 6,500엔", time: "공관별 당일~1·2영업일" },
  thailand: { cost: "긴급여권 1,666바트", time: "통상 약 1일" },
  philippines: { cost: "긴급여권 2,500페소", time: "공식 안내 1일" },
  taiwan: { cost: "긴급여권 약 NT$1,590", time: "공식 안내 당일" },
  vietnam: { cost: "긴급여권 US$50 + 출국비자 US$35", time: "여권 1일 + 출국승인 통상 5영업일" },
};

const contentRoot = path.join(process.cwd(), "content", "kr");
let changed = 0;

for (const [country, values] of Object.entries(countryValues)) {
  const countryDir = path.join(contentRoot, country);
  if (!fs.existsSync(countryDir)) continue;

  for (const cityEntry of fs.readdirSync(countryDir, { withFileTypes: true })) {
    if (!cityEntry.isDirectory()) continue;
    const file = path.join(countryDir, cityEntry.name, "lost-passport.mdx");
    if (!fs.existsSync(file)) continue;

    const original = fs.readFileSync(file, "utf8");
    let source = original
      .replace(/title: "([^"]*?)실제 절차·소요시간·비용 \(2026\)"/, 'title: "$1공식 절차·소요시간·비용 (2026)"')
      .replace(/updatedAt: "[^"]+"/, 'updatedAt: "2026-07-28"')
      .replace(/estimatedCost: "[^"]+"/, `estimatedCost: "${values.cost}"`)
      .replace(/estimatedTime: "[^"]+"/, `estimatedTime: "${values.time}"`)
      .replace(
        /<InfoRow label="수수료" value="[^"]*" \/>/,
        `<InfoRow label="수수료" value="${values.cost} · 결제수단은 공관 확인" />`,
      )
      .replace(
        /(<ReviewNote[^>]*>\s*)[\s\S]*?(\s*<\/ReviewNote>)/,
        "$1공관이 공개한 수수료와 처리시간을 기준으로 2026년 7월 28일 다시 확인했습니다. 실제 교부시각과 현금 결제 여부는 방문 전 공관에 확인하세요.$2",
      )
      .replace(/\n## 실제 비용\n[\s\S]*?(?=\n## 공관·영사관)/, "")
      .replace(/\n<FaqItem question="[^"]*당일 귀국[^"]*">[\s\S]*?<\/FaqItem>\n/g, "\n")
      .replace(/\n<FaqItem question="긴급여권 발급시간은\?">[\s\S]*?<\/FaqItem>\n/g, "\n")
      .replace(/\n<FaqItem question="사진 없으면\?">[\s\S]*?<\/FaqItem>\n/g, "\n")
      .replace(/note="[^"]*후기[^"]*"/g, 'note="방문 전 접수 마감과 교부 예정시각 확인"');

    if (country === "japan" && cityEntry.name === "tokyo") {
      source = source
        .replace('address="107-0052 東京都港区三田2-5-10"', 'address="106-0047 東京都港区南麻布1-2-5"')
        .replace('note="아자부주반역 10번 출구 · 당일 발급 후기(클린스마일)"', 'note="아자부주반역 인근 · 방문 전 접수시간 확인"');
    }

    if (country === "thailand") {
      source = source
        .replace(/address="1777 New Petchburi Rd, Bangkok"/g, 'address="23 Thiam-Ruammit Rd, Huai Khwang, Bangkok"')
        .replace(/\+66-2-247-7537/g, "+66-2-481-6000");
    }

    if (country === "philippines") {
      source = source.replace(/\+63-2-8856-9000/g, "+63-2-8856-9210");
    }

    if (country === "vietnam" && (cityEntry.name === "hanoi" || cityEntry.name === "danang")) {
      source = source.replace(
        /address="4 Le Hong Phong, Ba Dinh, Hanoi"/g,
        'address="SQ4 Diplomatic Complex, Do Nhuan St, Xuan Dinh, Hanoi"',
      );
    }

    if (source.includes("후기")) {
      throw new Error(`Unverified review wording remains: ${path.relative(process.cwd(), file)}`);
    }
    if (source !== original) {
      fs.writeFileSync(file, source, "utf8");
      changed += 1;
    }
  }
}

console.log(`Normalized ${changed} Korean overseas lost-passport guides.`);
