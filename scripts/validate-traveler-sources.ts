import { countries } from "../src/lib/site-config";
import { travelerProfiles } from "../src/lib/traveler-profiles";
import {
  getTravelerMissionSource,
  travelerMissionSources,
  type DestinationCode,
} from "./traveler-missions";

const errors: string[] = [];
const seen = new Set<string>();

for (const source of travelerMissionSources) {
  const key = `${source.traveler}/${source.destination}`;
  if (seen.has(key)) errors.push(`${key}: duplicate source`);
  seen.add(key);

  if (!source.officialUrl.startsWith("https://")) {
    errors.push(`${key}: official URL must use HTTPS`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(source.sourceCheckedAt)) {
    errors.push(`${key}: invalid sourceCheckedAt`);
  }
}

for (const traveler of travelerProfiles) {
  for (const country of countries) {
    const source = getTravelerMissionSource(
      traveler.code,
      country.slug as DestinationCode,
    );
    if (!source) errors.push(`${traveler.code}/${country.slug}: missing source`);
  }
}

if (errors.length) {
  console.error(`Traveler source validation failed (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `Traveler source validation passed: ${travelerMissionSources.length} nationality/destination pairs checked`,
  );
}
