import type { TravelerProfile } from "./traveler-profiles";

export const adsenseReadyTravelerCodes = [
  "kr",
] as const;

/**
 * 애드센스 재심사 동안 검색 색인을 집중할 대표 도시입니다.
 * 각 국가에서 콘텐츠·공식 출처가 가장 충실한 도시 한 곳만 공개 색인합니다.
 */
export const adsensePriorityCities = {
  japan: "tokyo",
  thailand: "bangkok",
  vietnam: "ho-chi-minh-city",
  taiwan: "taipei",
  philippines: "manila",
} as const;

export type AdsenseReadyTravelerCode = (typeof adsenseReadyTravelerCodes)[number];

export function isAdsenseReadyTravelerCode(
  code: string,
): code is AdsenseReadyTravelerCode {
  return adsenseReadyTravelerCodes.includes(code as AdsenseReadyTravelerCode);
}

export function isAdsenseReadyTravelerProfile(profile: TravelerProfile) {
  return isAdsenseReadyTravelerCode(profile.code);
}

export function isAdsensePriorityCity(country: string, city: string) {
  return adsensePriorityCities[country as keyof typeof adsensePriorityCities] === city;
}

export function isAdsenseIndexableGuide(
  profile: TravelerProfile,
  country: string,
  city: string,
) {
  return isAdsenseReadyTravelerProfile(profile) && isAdsensePriorityCity(country, city);
}
