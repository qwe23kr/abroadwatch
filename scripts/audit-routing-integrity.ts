import sitemap from "../src/app/sitemap";
import { incidentTypes } from "../src/lib/site-config";
import {
  getAllTravelerGuideParams,
  getTravelerGuide,
} from "../src/lib/traveler-content";
import {
  getTravelerCity,
  getTravelerCountry,
  getTravelerDestinations,
  isDomesticTravelerDestination,
} from "../src/lib/traveler-destinations";
import {
  isAdsenseIndexableGuide,
  isAdsenseReadyTravelerCode,
} from "../src/lib/quality";
import { travelerProfiles } from "../src/lib/traveler-profiles";

const problems: string[] = [];
const profileCodes = new Set(travelerProfiles.map((profile) => profile.code));
const domesticExpected: Record<string, string> = {
  kr: "south-korea",
  jp: "japan",
  tw: "taiwan",
  th: "thailand",
  vn: "vietnam",
};

const allParams = getAllTravelerGuideParams();

console.log("PROFILE_COUNTS");
for (const profile of travelerProfiles) {
  const destinations = getTravelerDestinations(profile);
  const countries = destinations.map((destination) => destination.slug);
  const cityCount = destinations.reduce(
    (sum, destination) => sum + destination.cities.length,
    0,
  );
  const expectedGuides = cityCount * incidentTypes.length;
  const actualGuides = allParams.filter(
    (params) =>
      params.traveler === profile.code &&
      getTravelerGuide(
        params.traveler,
        params.country,
        params.city,
        params.incident,
      ),
  ).length;
  const domestic = domesticExpected[profile.code];
  const hasDomestic = domestic ? countries.includes(domestic) : false;

  console.log(
    `${profile.code}: countries=${countries.length} cities=${cityCount} expectedGuides=${expectedGuides} actualGuides=${actualGuides} domestic=${domestic ?? "none"} hasDomestic=${hasDomestic}`,
  );

  if (hasDomestic) {
    problems.push(`${profile.code} includes domestic destination ${domestic}`);
  }
}

const paramKeys = allParams.map(
  (params) =>
    `${params.traveler}/${params.country}/${params.city}/${params.incident}`,
);
const duplicateParamKeys = paramKeys.filter(
  (key, index) => paramKeys.indexOf(key) !== index,
);
if (duplicateParamKeys.length) {
  problems.push(
    `duplicate guide params: ${[...new Set(duplicateParamKeys)].slice(0, 20).join(", ")}`,
  );
}

for (const params of allParams) {
  if (!profileCodes.has(params.traveler)) {
    problems.push(`unknown traveler ${params.traveler}`);
  }
  if (isDomesticTravelerDestination(params.traveler, params.country)) {
    problems.push(
      `domestic guide param ${params.traveler}/${params.country}/${params.city}/${params.incident}`,
    );
  }
  if (!getTravelerCountry(params.country)) {
    problems.push(`unknown country ${params.country}`);
  }
  if (!getTravelerCity(params.country, params.city)) {
    problems.push(`unknown city ${params.country}/${params.city}`);
  }
  if (!incidentTypes.includes(params.incident)) {
    problems.push(`unknown incident ${params.incident}`);
  }
}

const existingGuides = allParams.filter((params) =>
  getTravelerGuide(
    params.traveler,
    params.country,
    params.city,
    params.incident,
  ),
);
console.log(
  `GUIDE_PARAMS total=${allParams.length} existing=${existingGuides.length} duplicates=${new Set(paramKeys).size !== paramKeys.length}`,
);

const entries = sitemap();
const urls = entries.map((entry) => entry.url);
const duplicateUrls = urls.filter((url, index) => urls.indexOf(url) !== index);
console.log(
  `SITEMAP entries=${entries.length} unique=${new Set(urls).size} duplicates=${new Set(duplicateUrls).size}`,
);
if (duplicateUrls.length) {
  problems.push(
    `duplicate sitemap urls: ${[...new Set(duplicateUrls)].slice(0, 20).join(", ")}`,
  );
}

const domesticUrls = urls.filter((url) =>
  Object.entries(domesticExpected).some(([traveler, country]) =>
    url.includes(`/${traveler}/${country}`),
  ),
);
console.log(`SITEMAP domesticUrls=${domesticUrls.length}`);
if (domesticUrls.length) {
  problems.push(`domestic URLs in sitemap: ${domesticUrls.slice(0, 20).join(", ")}`);
}

const indexableGuideUrlSet = new Set(
  existingGuides
    .filter((params) => {
      const profile = travelerProfiles.find((item) => item.code === params.traveler);
      return profile && isAdsenseIndexableGuide(profile, params.country, params.city);
    })
    .map(
      (params) =>
        `https://abroadwatch.com/${params.traveler}/${params.country}/${params.city}/${params.incident}`,
    ),
);
const missingGuideUrls = [...indexableGuideUrlSet].filter((url) => !urls.includes(url));
console.log(`SITEMAP missingIndexableGuideUrls=${missingGuideUrls.length}`);
if (missingGuideUrls.length) {
  problems.push(
    `missing indexable guide urls in sitemap: ${missingGuideUrls.slice(0, 20).join(", ")}`,
  );
}

const nonIndexableGuideUrls = urls.filter((url) => {
  const traveler = new URL(url).pathname.split("/")[1];
  return profileCodes.has(traveler) && !isAdsenseReadyTravelerCode(traveler);
});
console.log(`SITEMAP nonIndexableGuideUrls=${nonIndexableGuideUrls.length}`);
if (nonIndexableGuideUrls.length) {
  problems.push(
    `non-indexable traveler urls in sitemap: ${nonIndexableGuideUrls.slice(0, 20).join(", ")}`,
  );
}

console.log("PROBLEMS");
if (problems.length === 0) {
  console.log("none");
} else {
  for (const problem of problems.slice(0, 100)) {
    console.log(problem);
  }
  process.exitCode = 1;
}
