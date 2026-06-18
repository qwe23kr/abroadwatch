/** 국가·통화·비상번호 혼용 감사 — npm run audit:content */
import fs from "fs";
import path from "path";
import { countries, incidentTypes, siteConfig } from "../src/lib/site-config";

const contentDir = path.join(process.cwd(), "content");

const forbiddenByCountry: Record<string, RegExp[]> = {
  japan: [
    /\bVND\b/i,
    /\bTHB\b/i,
    /바트/,
    /베트남은/,
    /선납\(베트남\)/,
    /관광경찰 1155/,
    /0800-024-111/,
    /\bTWD\b/,
    /₱/,
    /페소/i,
    /\bPHP\b/i,
    /All care prepaid in Vietnam/,
    /\bdollar\b/i,
    /\bUSD\b/,
  ],
  thailand: [
    /\bVND\b/i,
    /베트남은/,
    /선납\(베트남\)/,
    /6,890|6,500~6,890/,
    /050-2016-1603/,
    /\bJR\b/,
    /0800-024-111/,
    /₱/,
    /\bTWD\b/,
  ],
  vietnam: [
    /\bTHB\b/i,
    /바트/,
    /6,890|6,500~6,890/,
    /050-2016-1603/,
    /\bJR\b/,
    /관광경찰 1155/,
    /0800-024-111/,
    /₱/,
    /\bdollar\b/i,
    /\bUSD\b/,
  ],
  taiwan: [
    /\bVND\b/i,
    /\bTHB\b/i,
    /바트/,
    /베트남은/,
    /선납\(베트남\)/,
    /6,890|6,500~6,890/,
    /050-2016-1603/,
    /\bJR\b/,
    /관광경찰 1155/,
    /₱/,
  ],
  philippines: [
    /\bVND\b/i,
    /\bTHB\b/i,
    /바트/,
    /베트남은/,
    /선납\(베트남\)/,
    /6,890|6,500~6,890/,
    /050-2016-1603/,
    /\bJR\b/,
    /관광경찰 1155/,
    /0800-024-111/,
  ],
};

const medicalEmergency: Record<string, string> = {
  japan: "119",
  thailand: "1669",
  vietnam: "115",
  taiwan: "119",
  philippines: "911",
};

const issues: string[] = [];

for (const locale of siteConfig.locales) {
  for (const country of countries) {
    for (const city of country.cities) {
      for (const incident of incidentTypes) {
        const rel = path.join(
          locale,
          country.slug,
          city.slug,
          `${incident}.mdx`,
        );
        const raw = fs.readFileSync(path.join(contentDir, rel), "utf8");

        for (const re of forbiddenByCountry[country.slug] ?? []) {
          if (re.test(raw)) {
            issues.push(`${rel}: forbidden pattern ${re}`);
          }
        }

        const em = raw.match(/emergencyNumber: "(\d+)"/);
        if (incident === "hospital" && em && em[1] !== medicalEmergency[country.slug]) {
          issues.push(
            `${rel}: hospital emergency ${em[1]} (expected ${medicalEmergency[country.slug]})`,
          );
        }

        if (locale === "ko") {
          const titleMatch = raw.match(/^title: "([^"]+)"/m);
          const title = titleMatch?.[1] ?? "";
          for (const other of countries) {
            if (other.slug === country.slug) continue;
            for (const oc of other.cities) {
              const otherCity = oc.name.ko;
              if (
                otherCity.length >= 2 &&
                title.includes(otherCity) &&
                !title.includes(city.name.ko)
              ) {
                issues.push(
                  `${rel}: title mentions other city "${otherCity}" → ${title}`,
                );
              }
            }
          }
        }
      }
    }
  }
}

if (issues.length > 0) {
  console.error(`Audit found ${issues.length} issue(s):`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exitCode = 1;
} else {
  console.log("Audit passed: no cross-country currency or marker issues found.");
}
