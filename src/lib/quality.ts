import type { TravelerProfile } from "./traveler-profiles";

export const adsenseReadyTravelerCodes = ["kr", "us", "gb", "ca", "au"] as const;

export type AdsenseReadyTravelerCode = (typeof adsenseReadyTravelerCodes)[number];

export function isAdsenseReadyTravelerCode(
  code: string,
): code is AdsenseReadyTravelerCode {
  return adsenseReadyTravelerCodes.includes(code as AdsenseReadyTravelerCode);
}

export function isAdsenseReadyTravelerProfile(profile: TravelerProfile) {
  return isAdsenseReadyTravelerCode(profile.code);
}

