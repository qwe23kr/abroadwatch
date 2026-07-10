import type { TravelerProfile } from "./traveler-profiles";

export const adsenseReadyTravelerCodes = [
  "kr",
  "cn",
  "us",
  "jp",
  "tw",
  "au",
  "gb",
  "ca",
  "th",
  "vn",
] as const;

export type AdsenseReadyTravelerCode = (typeof adsenseReadyTravelerCodes)[number];

export function isAdsenseReadyTravelerCode(
  code: string,
): code is AdsenseReadyTravelerCode {
  return adsenseReadyTravelerCodes.includes(code as AdsenseReadyTravelerCode);
}

export function isAdsenseReadyTravelerProfile(profile: TravelerProfile) {
  return isAdsenseReadyTravelerCode(profile.code);
}
