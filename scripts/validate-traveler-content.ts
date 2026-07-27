import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { incidentTypes } from "../src/lib/site-config";
import { getTravelerDestinations } from "../src/lib/traveler-destinations";
import { travelerProfiles } from "../src/lib/traveler-profiles";
import { getTravelerMissionSource, type DestinationCode } from "./traveler-missions";

const contentDir = path.join(process.cwd(), "content");
const errors: string[] = [];
const reviewSignatures = new Map<string, string>();
const missionWords = /embassy|consulate|mission|representative|대사관|영사관|대표부|大使館|領事館|駐|สถานทูต|đại sứ|lãnh sự/i;
let count = 0;

for (const profile of travelerProfiles) {
  for (const country of getTravelerDestinations(profile)) {
    const mission = getTravelerMissionSource(profile.code, country.slug as DestinationCode)!;
    for (const city of country.cities) {
      const currentNames = [city.slug, city.slug.replace(/-/g, " "), city.name.en, city.name.ko]
        .filter(Boolean).map((name) => name.toLocaleLowerCase());
      const otherCities = country.cities.filter((other) => other.slug !== city.slug)
        .flatMap((other) => [other.slug, other.slug.replace(/-/g, " "), other.name.en, other.name.ko]).filter(Boolean);

      for (const incident of incidentTypes) {
        const relative = path.join(profile.code, country.slug, city.slug, `${incident}.mdx`);
        const file = path.join(contentDir, relative);
        if (!fs.existsSync(file)) {
          errors.push(`${relative}: missing file`);
          continue;
        }
        count += 1;
        const raw = fs.readFileSync(file, "utf8");
        const { data, content } = matter(raw);
        for (const key of ["title", "summary", "updatedAt", "emergencyNumber"]) {
          if (typeof data[key] !== "string" || !data[key].trim()) errors.push(`${relative}: invalid ${key}`);
        }
        const hasOfficialSource = profile.code === "kr" && country.slug !== "south-korea"
          ? /https:\/\/(?:overseas\.mofa\.go\.kr|www\.0404\.go\.kr)/.test(content)
          : content.includes(mission.officialUrl);
        if (!hasOfficialSource) errors.push(`${relative}: missing official nationality source`);
        if (!content.includes("<ReviewNote")) errors.push(`${relative}: missing evidence note`);
        if (/\bundefined\b|null/.test(content)) errors.push(`${relative}: contains unresolved content value`);

        const required = profile.code === "kr"
          ? ["<EmergencyBanner", "<ReviewNote", "<ContactCard", "<GoogleMap"]
          : ["<EmergencyBanner", "<ReviewNote", "<TimelineGroup", "<ActionGroup", "<Callout", "<InfoRows", "<LocalPhrase", "<ContactCard", "<GoogleMap", "<FaqItem"];
        for (const component of required) {
          if (!content.includes(component)) errors.push(`${relative}: missing ${component.slice(1)}`);
        }
        if (/<ReviewQuotes\b|<ReviewQuoteRow\b|<RealTimeline\b|<RealTimelineStep\b|실제 후기 기반|##\s*실제 경험담/.test(content)) {
          errors.push(`${relative}: contains unverifiable review or real-experience claim`);
        }
        for (const row of content.matchAll(/<ReviewQuoteRow\s+text="([^"]+)"/g)) {
          const signature = row[1].replace(/\s+/g, " ").trim();
          const previous = reviewSignatures.get(signature);
          if (previous && previous !== relative) errors.push(`${relative}: duplicate review also used in ${previous}`);
          else reviewSignatures.set(signature, relative);
        }

        const maps = [...content.matchAll(/<GoogleMap\s+query="([^"]+)"\s+title="([^"]+)"/g)];
        for (const map of maps) {
          const label = `${map[1]} ${map[2]}`.toLocaleLowerCase();
          if (missionWords.test(label)) continue;
          const leaked = otherCities.find((name) =>
            label.includes(name.toLocaleLowerCase()) && !currentNames.some((current) => label.includes(current)));
          if (leaked) errors.push(`${relative}: map contains another city (${leaked})`);
        }
        if (profile.code === "kr" && incident === "lost-passport") {
          const remoteMission = maps.some((map) => {
            const label = `${map[1]} ${map[2]}`.toLocaleLowerCase();
            return missionWords.test(label)
              && !currentNames.some((current) => label.includes(current))
              && otherCities.some((name) => label.includes(name.toLocaleLowerCase()));
          });
          if (remoteMission && !content.includes('title="공관 방문 전 이동 경로 확인"')) {
            errors.push(`${relative}: remote mission requires travel notice`);
          }
        }
        if (profile.code !== "kr") {
          const mapCount = maps.length;
          const contactCount = content.match(/<ContactCard\b/g)?.length ?? 0;
          const timelineCount = content.match(/<TimelineStep\b/g)?.length ?? 0;
          const actionCount = content.match(/<ActionStep\b/g)?.length ?? 0;
          if (mapCount < 2) errors.push(`${relative}: expected at least 2 maps, found ${mapCount}`);
          if (contactCount < 2) errors.push(`${relative}: expected at least 2 contacts, found ${contactCount}`);
          if (timelineCount < 6) errors.push(`${relative}: expected 6 timeline steps, found ${timelineCount}`);
          if (actionCount < 6) errors.push(`${relative}: expected 6 action steps, found ${actionCount}`);
        }
        if (profile.code !== "kr" && /Korean mission|Embassy of Korea/.test(raw)) {
          errors.push(`${relative}: leaked Korean-national guidance`);
        }
      }
    }
  }
}

const expected = travelerProfiles.reduce((sum, profile) =>
  sum + getTravelerDestinations(profile).reduce((subtotal, country) =>
    subtotal + country.cities.length * incidentTypes.length, 0), 0);
if (count !== expected) errors.push(`expected ${expected} files, found ${count}`);

if (errors.length) {
  console.error(`Traveler content validation failed (${errors.length})`);
  for (const error of errors.slice(0, 100)) console.error(`- ${error}`);
  if (errors.length > 100) console.error(`...and ${errors.length - 100} more`);
  process.exitCode = 1;
} else {
  console.log(`Traveler content validation passed: ${count} guides checked`);
}
