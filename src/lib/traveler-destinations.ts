import { countries, type CountryConfig } from "./site-config";

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

export function getTravelerCountry(slug: string) {
  return travelerDestinations.find((country) => country.slug === slug);
}

export function getTravelerCity(country: string, city: string) {
  return getTravelerCountry(country)?.cities.find((item) => item.slug === city);
}
