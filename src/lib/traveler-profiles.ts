export const travelerProfiles = [
  {
    code: "kr",
    countryCode: "KR",
    flag: "🇰🇷",
    nativeName: "대한민국",
    language: "ko",
    htmlLang: "ko-KR",
    consularHotline: "+82-2-3210-0404",
    officialGuidance: "https://www.0404.go.kr/",
  },
  {
    code: "cn",
    countryCode: "CN",
    flag: "🇨🇳",
    nativeName: "中国",
    language: "zh-Hans",
    htmlLang: "zh-CN",
    consularHotline: "+86-10-12308",
    officialGuidance: "https://cs.mfa.gov.cn/",
  },
  {
    code: "us",
    countryCode: "US",
    flag: "🇺🇸",
    nativeName: "United States",
    language: "en",
    htmlLang: "en-US",
    consularHotline: "+1-202-501-4444",
    officialGuidance:
      "https://travel.state.gov/content/travel/en/passports/have-passport/lost-stolen.html",
  },
  {
    code: "jp",
    countryCode: "JP",
    flag: "🇯🇵",
    nativeName: "日本",
    language: "ja",
    htmlLang: "ja-JP",
    consularHotline: "+81-3-3580-3311",
    officialGuidance: "https://www.mofa.go.jp/mofaj/toko/passport/",
  },
  {
    code: "tw",
    countryCode: "TW",
    flag: "🇹🇼",
    nativeName: "台灣",
    language: "zh-Hant",
    htmlLang: "zh-TW",
    consularHotline: "+886-800-085-095",
    officialGuidance: "https://www.boca.gov.tw/",
  },
  {
    code: "au",
    countryCode: "AU",
    flag: "🇦🇺",
    nativeName: "Australia",
    language: "en",
    htmlLang: "en-AU",
    consularHotline: "+61-2-6261-3305",
    officialGuidance: "https://www.passports.gov.au/lost-and-stolen-passports",
  },
  {
    code: "gb",
    countryCode: "GB",
    flag: "🇬🇧",
    nativeName: "United Kingdom",
    language: "en",
    htmlLang: "en-GB",
    consularHotline: "+44-20-7008-5000",
    officialGuidance: "https://www.gov.uk/emergency-travel-document",
  },
  {
    code: "ca",
    countryCode: "CA",
    flag: "🇨🇦",
    nativeName: "Canada",
    language: "en",
    htmlLang: "en-CA",
    consularHotline: "+1-613-996-8885",
    officialGuidance: "https://travel.gc.ca/assistance/emergency-info/lost-stolen-passport",
  },
  {
    code: "th",
    countryCode: "TH",
    flag: "🇹🇭",
    nativeName: "ประเทศไทย",
    language: "th",
    htmlLang: "th-TH",
    consularHotline: "+66-2-572-8442",
    officialGuidance: "https://consular.mfa.go.th/",
  },
  {
    code: "vn",
    countryCode: "VN",
    flag: "🇻🇳",
    nativeName: "Việt Nam",
    language: "vi",
    htmlLang: "vi-VN",
    consularHotline: "+84-981-84-84-84",
    officialGuidance: "https://lanhsuvietnam.gov.vn/",
  },
] as const;

export type TravelerCode = (typeof travelerProfiles)[number]["code"];
export type TravelerCountryCode = (typeof travelerProfiles)[number]["countryCode"];
export type TravelerProfile = (typeof travelerProfiles)[number];

export function getTravelerProfile(code: string): TravelerProfile | undefined {
  return travelerProfiles.find((profile) => profile.code === code);
}

export function getTravelerByCountryCode(
  countryCode: string,
): TravelerProfile | undefined {
  return travelerProfiles.find((profile) => profile.countryCode === countryCode);
}
