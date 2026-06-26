import { countries, type CountryConfig } from "./site-config";
import type { TravelerProfile } from "./traveler-profiles";

export const southKoreaDestination: CountryConfig = {
  slug: "south-korea",
  name: { ko: "대한민국", en: "South Korea" },
  cities: [
    { slug: "seoul", name: { ko: "서울", en: "Seoul" } },
    { slug: "busan", name: { ko: "부산", en: "Busan" } },
    { slug: "jeju", name: { ko: "제주", en: "Jeju" } },
  ],
};

export const travelerDestinations = [southKoreaDestination, ...countries];

const domesticDestinationByTraveler: Partial<Record<TravelerProfile["code"], string>> = {
  kr: "south-korea",
  jp: "japan",
  tw: "taiwan",
  th: "thailand",
  vn: "vietnam",
};

export function isDomesticTravelerDestination(
  traveler: TravelerProfile["code"],
  destination: string,
) {
  return domesticDestinationByTraveler[traveler] === destination;
}

export function getTravelerDestinations(profile: TravelerProfile) {
  return travelerDestinations.filter(
    (country) => !isDomesticTravelerDestination(profile.code, country.slug),
  );
}

export function getTravelerCountry(slug: string) {
  return travelerDestinations.find((country) => country.slug === slug);
}

export function getTravelerCity(country: string, city: string) {
  return getTravelerCountry(country)?.cities.find((item) => item.slug === city);
}
