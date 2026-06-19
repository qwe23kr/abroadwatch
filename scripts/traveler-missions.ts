import type { TravelerCode } from "../src/lib/traveler-profiles";

export type DestinationCode =
  | "japan"
  | "thailand"
  | "vietnam"
  | "taiwan"
  | "philippines";

export interface TravelerMissionSource {
  traveler: TravelerCode;
  destination: DestinationCode;
  officialName: string;
  officialUrl: string;
  sourceCheckedAt: string;
  handling?: "consular-mission" | "domestic-authority" | "cross-strait-authority";
}

/**
 * 국적별 현지 공관의 공식 페이지.
 * URL 응답과 기관명을 확인한 항목만 추가한다. 전화·주소는 페이지 생성 시
 * 이 출처에서 별도로 검증하며, 미검증 값을 추정해서 넣지 않는다.
 */
export const travelerMissionSources: TravelerMissionSource[] = [
  {
    traveler: "kr",
    destination: "japan",
    officialName: "주일본 대한민국 대사관",
    officialUrl: "https://overseas.mofa.go.kr/jp-ko/index.do",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "kr",
    destination: "thailand",
    officialName: "주태국 대한민국 대사관",
    officialUrl: "https://overseas.mofa.go.kr/th-ko/index.do",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "kr",
    destination: "vietnam",
    officialName: "주베트남 대한민국 대사관",
    officialUrl: "https://overseas.mofa.go.kr/vn-ko/index.do",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "kr",
    destination: "taiwan",
    officialName: "주타이베이 대한민국 대표부",
    officialUrl: "https://overseas.mofa.go.kr/tw-ko/index.do",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "kr",
    destination: "philippines",
    officialName: "주필리핀 대한민국 대사관",
    officialUrl: "https://overseas.mofa.go.kr/ph-ko/index.do",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "cn",
    destination: "japan",
    officialName: "中华人民共和国驻日本国大使馆",
    officialUrl: "https://jp.china-embassy.gov.cn/chn/",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "cn",
    destination: "thailand",
    officialName: "中华人民共和国驻泰王国大使馆",
    officialUrl: "https://th.china-embassy.gov.cn/chn/",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "cn",
    destination: "vietnam",
    officialName: "中华人民共和国驻越南社会主义共和国大使馆",
    officialUrl: "https://vn.china-embassy.gov.cn/chn/",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "cn",
    destination: "taiwan",
    officialName: "台湾地区内政部移民署与大陆居民出入境机关",
    officialUrl: "https://www.immigration.gov.tw/",
    sourceCheckedAt: "2026-06-19",
    handling: "cross-strait-authority",
  },
  {
    traveler: "cn",
    destination: "philippines",
    officialName: "中华人民共和国驻菲律宾共和国大使馆",
    officialUrl: "https://ph.china-embassy.gov.cn/chn/",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "jp",
    destination: "japan",
    officialName: "都道府県旅券事務所",
    officialUrl: "https://www.mofa.go.jp/mofaj/toko/passport/pass_6.html",
    sourceCheckedAt: "2026-06-19",
    handling: "domestic-authority",
  },
  {
    traveler: "jp",
    destination: "thailand",
    officialName: "在タイ日本国大使館",
    officialUrl: "https://www.th.emb-japan.go.jp/itprtop_ja/index.html",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "jp",
    destination: "vietnam",
    officialName: "在ベトナム日本国大使館",
    officialUrl: "https://www.vn.emb-japan.go.jp/itprtop_ja/index.html",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "jp",
    destination: "taiwan",
    officialName: "公益財団法人日本台湾交流協会",
    officialUrl: "https://www.koryu.or.jp/",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "jp",
    destination: "philippines",
    officialName: "在フィリピン日本国大使館",
    officialUrl: "https://www.ph.emb-japan.go.jp/itprtop_ja/index.html",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "tw",
    destination: "japan",
    officialName: "臺北駐日經濟文化代表處",
    officialUrl: "https://www.roc-taiwan.org/jp_ja/index.html",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "tw",
    destination: "thailand",
    officialName: "駐泰國台北經濟文化辦事處",
    officialUrl: "https://www.roc-taiwan.org/th/",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "tw",
    destination: "vietnam",
    officialName: "駐越南台北經濟文化辦事處",
    officialUrl: "https://www.roc-taiwan.org/vn/",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "tw",
    destination: "taiwan",
    officialName: "外交部領事事務局",
    officialUrl: "https://www.boca.gov.tw/",
    sourceCheckedAt: "2026-06-19",
    handling: "domestic-authority",
  },
  {
    traveler: "tw",
    destination: "philippines",
    officialName: "駐菲律賓台北經濟文化辦事處",
    officialUrl: "https://www.roc-taiwan.org/ph/",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "us",
    destination: "japan",
    officialName: "U.S. Embassy & Consulates in Japan",
    officialUrl: "https://jp.usembassy.gov/",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "us",
    destination: "thailand",
    officialName: "U.S. Embassy & Consulate in Thailand",
    officialUrl: "https://th.usembassy.gov/",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "us",
    destination: "vietnam",
    officialName: "U.S. Embassy & Consulate in Vietnam",
    officialUrl: "https://vn.usembassy.gov/",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "us",
    destination: "taiwan",
    officialName: "American Institute in Taiwan",
    officialUrl: "https://www.ait.org.tw/",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "us",
    destination: "philippines",
    officialName: "U.S. Embassy in the Philippines",
    officialUrl: "https://ph.usembassy.gov/",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "gb",
    destination: "japan",
    officialName: "British Embassy Tokyo",
    officialUrl: "https://www.gov.uk/world/organisations/british-embassy-tokyo",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "gb",
    destination: "thailand",
    officialName: "British Embassy Bangkok",
    officialUrl: "https://www.gov.uk/world/organisations/british-embassy-bangkok",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "gb",
    destination: "vietnam",
    officialName: "British Embassy Hanoi",
    officialUrl: "https://www.gov.uk/world/organisations/british-embassy-hanoi",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "gb",
    destination: "taiwan",
    officialName: "British Office Taipei",
    officialUrl: "https://www.gov.uk/world/organisations/british-office-taipei",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "gb",
    destination: "philippines",
    officialName: "British Embassy Manila",
    officialUrl: "https://www.gov.uk/world/organisations/british-embassy-manila",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "au",
    destination: "japan",
    officialName: "Australian Embassy Tokyo",
    officialUrl: "https://japan.embassy.gov.au/",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "au",
    destination: "thailand",
    officialName: "Australian Embassy Thailand",
    officialUrl: "https://thailand.embassy.gov.au/",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "au",
    destination: "vietnam",
    officialName: "Australian Embassy Vietnam",
    officialUrl: "https://vietnam.embassy.gov.au/",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "au",
    destination: "taiwan",
    officialName: "Australian Office Taipei",
    officialUrl: "https://australia.org.tw/",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "au",
    destination: "philippines",
    officialName: "Australian Embassy in the Philippines",
    officialUrl: "https://philippines.embassy.gov.au/",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "ca",
    destination: "japan",
    officialName: "Embassy of Canada to Japan",
    officialUrl:
      "https://www.international.gc.ca/country-pays/japan-japon/tokyo.aspx?lang=eng",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "ca",
    destination: "thailand",
    officialName: "Embassy of Canada to Thailand",
    officialUrl:
      "https://www.international.gc.ca/country-pays/thailand-thailande/bangkok.aspx?lang=eng",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "ca",
    destination: "vietnam",
    officialName: "Embassy of Canada to Vietnam",
    officialUrl:
      "https://www.international.gc.ca/country-pays/vietnam/hanoi.aspx?lang=eng",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "ca",
    destination: "taiwan",
    officialName: "Canadian Trade Office in Taipei",
    officialUrl:
      "https://www.international.gc.ca/country-pays/taiwan/taipei.aspx?lang=eng",
    sourceCheckedAt: "2026-06-19",
  },
  {
    traveler: "ca",
    destination: "philippines",
    officialName: "Embassy of Canada to the Philippines",
    officialUrl:
      "https://www.international.gc.ca/country-pays/philippines/index.aspx?lang=eng",
    sourceCheckedAt: "2026-06-19",
  },
];

export function getTravelerMissionSource(
  traveler: TravelerCode,
  destination: DestinationCode,
): TravelerMissionSource | undefined {
  return travelerMissionSources.find(
    (source) =>
      source.traveler === traveler && source.destination === destination,
  );
}
