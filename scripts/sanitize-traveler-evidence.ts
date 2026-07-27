import fs from "fs";
import path from "path";
import { getTravelerDestinations } from "../src/lib/traveler-destinations";
import { travelerProfiles } from "../src/lib/traveler-profiles";

const contentDir = path.join(process.cwd(), "content");
const missionWords = /embassy|consulate|mission|representative|대사관|영사관|대표부|大使館|領事館|駐|สถานทูต|đại sứ|lãnh sự/i;
const notice = `<Callout variant="info" title="공관 방문 전 이동 경로 확인">
  담당 공관은 현재 도시가 아닌 다른 도시에 있습니다. 출발 전에 전화로 방문 필요 여부와 원격 안내 가능 여부를 확인하고, 공관까지의 이동 시간과 교통편을 일정에 반영하세요.
</Callout>`;
const koreanCities = new Map<string, { names: string[]; others: string[] }>();
const korean = travelerProfiles.find((profile) => profile.code === "kr");

if (korean) {
  for (const country of getTravelerDestinations(korean)) {
    const all = country.cities.flatMap((city) => [city.slug, city.slug.replace(/-/g, " "), city.name.en, city.name.ko]).filter(Boolean);
    for (const city of country.cities) {
      const names = [city.slug, city.slug.replace(/-/g, " "), city.name.en, city.name.ko].filter(Boolean);
      koreanCities.set(path.normalize(path.join("kr", country.slug, city.slug, "lost-passport.mdx")), {
        names,
        others: all.filter((name) => !names.includes(name)),
      });
    }
  }
}

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : entry.name.endsWith(".mdx") ? [full] : [];
  });
}

let changed = 0;
let reviews = 0;
let timelines = 0;
let notices = 0;

for (const file of walk(contentDir)) {
  const relative = path.normalize(path.relative(contentDir, file));
  const original = fs.readFileSync(file, "utf8");
  let content = original;
  content = content.replace(
    /(?:^##[^\r\n]*(?:후기|리뷰|Review|Reviews|経験|體驗|评价|評價|รีวิว|đánh giá)[^\r\n]*\r?\n\r?\n)?<ReviewQuotes\b[\s\S]*?<\/ReviewQuotes>\s*/gim,
    () => { reviews += 1; return ""; },
  );
  content = content.replace(
    /(?:^##[^\r\n]*(?:실제 경험담|Real experiences|experience pattern)[^\r\n]*\r?\n\r?\n)?<RealTimeline\b[\s\S]*?<\/RealTimeline>\s*/gim,
    () => { timelines += 1; return ""; },
  );
  content = content
    .replace(/실제 후기[·ㆍ]?커뮤니티 기반/g, "공식 안내와 일반적인 대응 절차를 바탕으로 정리한")
    .replace(/실제 후기 기반/g, "공식 안내를 바탕으로 정리한")
    .replace(/Review-based scam types/g, "Common scam patterns");

  const city = koreanCities.get(relative);
  if (city && !content.includes('title="공관 방문 전 이동 경로 확인"')) {
    const remote = [...content.matchAll(/<GoogleMap\s+query="([^"]+)"\s+title="([^"]+)"\s*\/>/g)].find((match) => {
      const label = `${match[1]} ${match[2]}`.toLocaleLowerCase();
      return missionWords.test(label)
        && !city.names.some((name) => label.includes(name.toLocaleLowerCase()))
        && city.others.some((name) => label.includes(name.toLocaleLowerCase()));
    });
    if (remote?.index !== undefined) {
      const contactAt = content.lastIndexOf("<ContactCard", remote.index);
      if (contactAt >= 0) {
        content = `${content.slice(0, contactAt)}${notice}\n\n${content.slice(contactAt)}`;
        notices += 1;
      }
    }
  }
  if (content !== original) {
    fs.writeFileSync(file, content.replace(/\n{4,}/g, "\n\n\n"), "utf8");
    changed += 1;
  }
}

console.log(`Sanitized ${changed} files: removed ${reviews} reviews and ${timelines} timelines; added ${notices} remote-mission notices.`);
