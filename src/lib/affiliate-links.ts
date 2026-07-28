export const affiliateLinks = {
  flightCompensation: {
    href: "https://airhelp.tpo.li/mVx4XhSs",
    ko: "항공편 보상",
    en: "Flight compensation",
    partner: "AirHelp",
  },
  airportTransfer: {
    href: "https://kiwitaxi.tpo.li/JdgcoBat",
    ko: "공항 픽업",
    en: "Airport transfer",
    partner: "KiwiTaxi",
  },
  esim: {
    href: "https://yesim.tpo.li/JIIfPw5S",
    ko: "여행 eSIM",
    en: "Travel eSIM",
    partner: "Yesim",
  },
  activities: {
    href: "https://klook.tpo.li/R3lugzrF",
    ko: "투어·티켓",
    en: "Tours & tickets",
    partner: "Klook",
  },
} as const;

export type AffiliateKey = keyof typeof affiliateLinks;
