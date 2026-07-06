import { getNationalityProofText } from "../src/components/guide/NationalityProofSection";
import {
  getAllTravelerGuideParams,
  getTravelerGuide,
} from "../src/lib/traveler-content";
import {
  getTravelerCity,
  getTravelerCountry,
} from "../src/lib/traveler-destinations";
import { getTravelerProfile } from "../src/lib/traveler-profiles";
import { travelerIncident, travelerName } from "../src/lib/traveler-ui";

const THRESHOLD = Number(process.env.SIMILARITY_THRESHOLD ?? "0.86");

function normalizeText(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_#[\]()>~|{}:;,.!?'"“”‘’·\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase();
}

function shingles(value: string, size = 5) {
  const words = normalizeText(value).split(" ").filter(Boolean);
  const result = new Set<string>();
  for (let index = 0; index <= words.length - size; index += 1) {
    result.add(words.slice(index, index + size).join(" "));
  }
  return result;
}

function jaccard(left: Set<string>, right: Set<string>) {
  let intersection = 0;
  for (const item of left) {
    if (right.has(item)) intersection += 1;
  }
  const union = left.size + right.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

interface PageSample {
  key: string;
  groupKey: string;
  text: string;
  shingles: Set<string>;
}

const samples: PageSample[] = [];

for (const params of getAllTravelerGuideParams()) {
  const profile = getTravelerProfile(params.traveler);
  if (!profile) continue;

  const guide = getTravelerGuide(
    params.traveler,
    params.country,
    params.city,
    params.incident,
  );
  if (!guide) continue;

  const country = getTravelerCountry(params.country);
  const city = getTravelerCity(params.country, params.city);
  const countryName = travelerName(profile, params.country, country?.name.en ?? params.country);
  const cityName = travelerName(profile, params.city, city?.name.en ?? params.city);
  const incidentName = travelerIncident(profile, params.incident);
  const proofText = getNationalityProofText(profile, params.incident, {
    countryName,
    cityName,
    incidentName,
    emergencyNumber: guide.frontmatter.emergencyNumber,
  });
  const text = [
    guide.frontmatter.title,
    guide.frontmatter.summary,
    guide.content,
    proofText,
  ].join(" ");

  samples.push({
    key: `${params.traveler}/${params.country}/${params.city}/${params.incident}`,
    groupKey: `${params.country}/${params.city}/${params.incident}`,
    text,
    shingles: shingles(text),
  });
}

const riskyPairs: Array<{ left: string; right: string; score: number }> = [];
const groups = new Map<string, PageSample[]>();
for (const sample of samples) {
  const group = groups.get(sample.groupKey) ?? [];
  group.push(sample);
  groups.set(sample.groupKey, group);
}

for (const group of groups.values()) {
  for (let leftIndex = 0; leftIndex < group.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < group.length; rightIndex += 1) {
      const left = group[leftIndex];
      const right = group[rightIndex];
      const score = jaccard(left.shingles, right.shingles);
      if (score >= THRESHOLD) {
        riskyPairs.push({ left: left.key, right: right.key, score });
      }
    }
  }
}

riskyPairs.sort((left, right) => right.score - left.score);

console.log(`samples=${samples.length}`);
console.log(`threshold=${THRESHOLD}`);
console.log(`riskyPairs=${riskyPairs.length}`);
for (const pair of riskyPairs.slice(0, 50)) {
  console.log(`${pair.score.toFixed(3)} ${pair.left} <> ${pair.right}`);
}

if (riskyPairs.length > 0) {
  process.exitCode = 1;
}
