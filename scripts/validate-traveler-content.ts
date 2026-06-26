import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { incidentTypes } from "../src/lib/site-config";
import { getTravelerDestinations } from "../src/lib/traveler-destinations";
import { travelerProfiles } from "../src/lib/traveler-profiles";
import { getTravelerMissionSource, type DestinationCode } from "./traveler-missions";

const contentDir = path.join(process.cwd(), "content");
const errors: string[] = [];
const reviewSignatures = new Map<string, Set<string>>();
let count = 0;

for (const profile of travelerProfiles) {
  for (const country of getTravelerDestinations(profile)) {
    const mission = getTravelerMissionSource(
      profile.code,
      country.slug as DestinationCode,
    )!;

    for (const city of country.cities) {
      for (const incident of incidentTypes) {
        const relative = path.join(
          profile.code,
          country.slug,
          city.slug,
          `${incident}.mdx`,
        );
        const file = path.join(contentDir, relative);
        if (!fs.existsSync(file)) {
          errors.push(`${relative}: missing file`);
          continue;
        }

        count += 1;
        const raw = fs.readFileSync(file, "utf8");
        const { data, content } = matter(raw);
        for (const key of ["title", "summary", "updatedAt", "emergencyNumber"]) {
          if (typeof data[key] !== "string" || !data[key].trim()) {
            errors.push(`${relative}: invalid ${key}`);
          }
        }
        const hasOfficialSource =
          profile.code === "kr" && country.slug !== "south-korea"
            ? /https:\/\/(?:overseas\.mofa\.go\.kr|www\.0404\.go\.kr)/.test(content)
            : content.includes(mission.officialUrl);
        if (!hasOfficialSource) {
          errors.push(`${relative}: missing official nationality source`);
        }
        if (!content.includes("<ReviewNote")) {
          errors.push(`${relative}: missing evidence note`);
        }
        if (/\bundefined\b|null/.test(content)) {
          errors.push(`${relative}: contains unresolved content value`);
        }
        const requiredComponents = profile.code === "kr"
          ? ["<EmergencyBanner", "<ReviewNote", "<ContactCard", "<GoogleMap"]
          : ["<EmergencyBanner", "<ReviewNote", "<ReviewQuotes", "<TimelineGroup", "<ActionGroup", "<Callout", "<InfoRows", "<LocalPhrase", "<ContactCard", "<GoogleMap", "<FaqItem"];
        for (const component of requiredComponents) {
          if (!content.includes(component)) errors.push(`${relative}: missing ${component.slice(1)}`);
        }
        if (profile.code !== "kr") {
          const mapCount = content.match(/<GoogleMap\b/g)?.length ?? 0;
          const contactCount = content.match(/<ContactCard\b/g)?.length ?? 0;
          const timelineCount = content.match(/<TimelineStep\b/g)?.length ?? 0;
          const actionCount = content.match(/<ActionStep\b/g)?.length ?? 0;
          if (mapCount < 2) errors.push(`${relative}: expected at least 2 maps, found ${mapCount}`);
          if (contactCount < 2) errors.push(`${relative}: expected at least 2 contacts, found ${contactCount}`);
          if (timelineCount < 6) errors.push(`${relative}: expected 6 timeline steps, found ${timelineCount}`);
          if (actionCount < 6) errors.push(`${relative}: expected 6 action steps, found ${actionCount}`);
          const reviewsAt = content.lastIndexOf("<ReviewQuotes");
          const faqAt = content.lastIndexOf("<FaqItem");
          if (reviewsAt < 0 || faqAt < reviewsAt) errors.push(`${relative}: footer reviews must appear before FAQ`);
          const reviewRows = [...content.matchAll(/<ReviewQuoteRow text="([^"]+)" source="([^"]+)" \/>/g)];
          if (reviewRows.length !== 3) errors.push(`${relative}: expected 3 incident reviews, found ${reviewRows.length}`);
          const reviewKey = `${profile.code}/${country.slug}/${city.slug}`;
          const signatures = reviewSignatures.get(reviewKey) ?? new Set<string>();
          signatures.add(reviewRows.map((row) => row[1]).join("|"));
          reviewSignatures.set(reviewKey, signatures);
          if (profile.code === "jp" && /旅行者在|遇到.+时的/.test(raw)) errors.push(`${relative}: Chinese grammar leaked into Japanese copy`);
        }
        if (profile.code !== "kr" && /대한민국 대사관|Korean mission|Embassy of Korea/.test(raw)) {
          errors.push(`${relative}: leaked Korean-national guidance`);
        }
      }
    }
  }
}

for (const [reviewKey, signatures] of reviewSignatures) {
  if (signatures.size !== incidentTypes.length) {
    errors.push(`${reviewKey}: reviews are duplicated across incidents (${signatures.size}/${incidentTypes.length} unique)`);
  }
}

const expected =
  travelerProfiles.reduce(
    (sum, profile) =>
      sum +
      getTravelerDestinations(profile).reduce(
        (profileSum, country) => profileSum + country.cities.length * incidentTypes.length,
        0,
      ),
    0,
  );

if (count !== expected) errors.push(`expected ${expected} files, found ${count}`);

if (errors.length) {
  console.error(`Traveler content validation failed (${errors.length})`);
  for (const error of errors.slice(0, 100)) console.error(`- ${error}`);
  if (errors.length > 100) console.error(`...and ${errors.length - 100} more`);
  process.exitCode = 1;
} else {
  console.log(`Traveler content validation passed: ${count} guides checked`);
}
