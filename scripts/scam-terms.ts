/** 국가·도시별 여행 사기 가이드 — 후기·관광경찰·여행 커뮤니티 기반 */

import type { Locale } from "../src/lib/site-config";

export interface ScamItem {
  label: { ko: string; en: string };
  value: { ko: string; en: string };
}

export interface ScamGuideCopy {
  reviewSource: { ko: string; en: string; url: string };
  reviewNote: { ko: string; en: string };
  hotspots: { ko: string; en: string };
  scams: ScamItem[];
  warning: { title: { ko: string; en: string }; body: { ko: string; en: string } };
  estimatedLoss: { ko: string; en: string };
}

const countryBase: Record<
  string,
  Omit<ScamGuideCopy, "hotspots"> & { defaultHotspots: { ko: string; en: string } }
> = {
  japan: {
    reviewSource: {
      ko: "네이버 여행 후기 · Reddit r/JapanTravel",
      en: "Naver travel reviews · Reddit r/JapanTravel",
      url: "https://www.reddit.com/r/JapanTravel/search/?q=bar+scam",
    },
    reviewNote: {
      ko: "도쿄·오사카 후기에서 **낯선 현지인 따라가기 → 바·클럽 고액 청구** 패턴이 가장 많이 보고됩니다. 메뉴·세금·서비스료 확인 후기가 반복됩니다.",
      en: "Tokyo/Osaka reviews repeatedly report **strangers leading tourists to bars with huge bills**. Check menu, tax, and service charge before ordering.",
    },
    defaultHotspots: {
      ko: "繁華街·역 주변 나이트라이프",
      en: "Nightlife districts near major stations",
    },
    scams: [
      {
        label: { ko: "바·클럽 사기", en: "Bar / club scam" },
        value: {
          ko: "「한잔만」→ 술값·입장료·동행료 합산 **수십~수백만 원**. 메뉴 미표시·카드 거절·ATM 유도.",
          en: "「One drink」→ **¥50,000–500,000+** with hidden fees. No menu shown; forced to pay cash at ATM.",
        },
      },
      {
        label: { ko: "가짜 경찰·공무원", en: "Fake police / official" },
        value: {
          ko: "「여권 확인」「마약 검사」명목으로 **지갑·카드** 요구. 진짜 일본 경찰은 길에서 무작정 지갑 검사하지 않음.",
          en: "「Passport check」「Drug test」to steal wallet/cards. Real police do not randomly search wallets on the street.",
        },
      },
      {
        label: { ko: "친절한 가이드·택시", en: "Friendly guide / taxi detour" },
        value: {
          ko: "「폐점」「행사」→ **폐업 가게·비싼 기념품점** 유도. 택시 미터기 OFF·우회 후기.",
          en: "「Closed today」「Special event」→ detour to **closed shops or overpriced stores**. Taxi meter off reported.",
        },
      },
      {
        label: { ko: "기부·스님 사칭", en: "Fake monk / donation" },
        value: {
          ko: "아사쿠사·교토 등 **스님·수행자 사칭** → 현금·QR 기부 요구.",
          en: "Fake monks near temples ask for cash/QR donations — not official temple boxes.",
        },
      },
    ],
    warning: {
      title: { ko: "절대 하지 마세요", en: "Never do this" },
      body: {
        ko: "**처음 본 사람과 다른 가게·골목·2층**으로 가지 마세요. 「지금만 특가」「VIP」는 고액 청구 신호입니다.",
        en: "**Do not follow strangers** to another bar, alley, or upstairs room. 「Special today」「VIP」often means a huge bill.",
      },
    },
    estimatedLoss: { ko: "10만~500만 원+", en: "¥10,000–500,000+" },
  },
  thailand: {
    reviewSource: {
      ko: "peunge.tistory · 태국 관광경찰 안내",
      en: "peunge.tistory · Thailand Tourist Police",
      url: "https://peunge.tistory.com/269",
    },
    reviewNote: {
      ko: "방콕·푸켓 후기에서 **젯스키·툭툭·쇼 바** 사기가 반복 언급됩니다. 「손상 수리비」「입장료 별도」 주의.",
      en: "Bangkok/Phuket reviews flag **jet ski, tuk-tuk, and show bar scams**. Watch for damage fees and hidden entry charges.",
    },
    defaultHotspots: { ko: "관광지·비치·야시장", en: "Tourist spots, beaches, night markets" },
    scams: [
      {
        label: { ko: "젯스키·스쿠터 손상 사기", en: "Jet ski / scooter damage scam" },
        value: {
          ko: "반납 시 **기존 흠집을 새 손상**으로 주장. 수리비 **수십~수백만 원** 요구. 대여 전 **360° 영상** 후기 필수.",
          en: "On return, claim **old scratches as new damage**. Demand **฿50,000–300,000+**. Film 360° video before rental.",
        },
      },
      {
        label: { ko: "툭툭·택시 루트 사기", en: "Tuk-tuk / taxi route scam" },
        value: {
          ko: "「왕궁 오늘 휴무」→ **보석·실크·마사지** 유도. 미터기 OFF. **1155** 또는 Grab 후기.",
          en: "「Palace closed today」→ **gem/silk/massage shops**. Meter off. Reviews recommend **1155** or Grab.",
        },
      },
      {
        label: { ko: "쇼·바 청구 사기", en: "Show / bar bill scam" },
        value: {
          ko: "Ping Pong Show·바 **입장료·Lady drink·서비스료** 누적. 나갈 때 **경비·위협** 후기.",
          en: "Shows/bars stack **entry, lady drinks, service**. Reports of **guards blocking exit** until paid.",
        },
      },
      {
        label: { ko: "소매치기·바가지", en: "Pickpocket / overcharge" },
        value: {
          ko: "송크란·풀문·야시장 **소매치기**. 택시·보트 **미터기 없이** 2~3배 요금.",
          en: "Pickpockets at Songkran, Full Moon, night markets. Taxis/boats charge 2–3× without meter.",
        },
      },
    ],
    warning: {
      title: { ko: "태국에서 특히", en: "Especially in Thailand" },
      body: {
        ko: "대여·투어는 **계약서·손상 사진** 없으면 하지 마세요. 문제 시 **1155 관광경찰** 영어·한국어 지원 후기 많음.",
        en: "Skip rentals/tours **without a written contract and damage photos**. **Tourist Police 1155** often helps in English/Korean.",
      },
    },
    estimatedLoss: { ko: "5만~300만 원+", en: "฿2,000–300,000+" },
  },
  vietnam: {
    reviewSource: {
      ko: "travelalltheway.tistory · 베트남 여행 후기",
      en: "travelalltheway.tistory · Vietnam travel blogs",
      url: "https://travelalltheway.tistory.com/8",
    },
    reviewNote: {
      ko: "하노이·호치민 후기에서 **택시 미터기·환전·신발 닦기** 사기가 자주 나옵니다. Grab·공항 공식 택시가 안전 대안.",
      en: "Hanoi/HCMC reviews cite **taxi meters, money exchange, and shoe-shine** scams. Grab and official airport taxis recommended.",
    },
    defaultHotspots: { ko: "구시가·공항·관광지", en: "Old Quarter, airports, tourist sites" },
    scams: [
      {
        label: { ko: "택시·그랩 사칭", en: "Fake taxi / Grab" },
        value: {
          ko: "공항·역 **미터기 조작·우회**. 가짜 Grab 명찰. **Grab 앱에서 직접 호출** 후기.",
          en: "Airport/station **rigged meters, long routes**. Fake Grab badges. Book only in official Grab app.",
        },
      },
      {
        label: { ko: "환전·카운터 사기", en: "Money exchange scam" },
        value: {
          ko: "거리 환전 **카운트 속임**·낡은 지폐. 은행·공항 환전 또는 ATM 후기.",
          en: "Street changers **short-count bills** or slip old notes. Use banks, airport counters, or ATMs.",
        },
      },
      {
        label: { ko: "신발 닦기·사진", en: "Shoe shine / photo fee" },
        value: {
          ko: "하노이 후기: **신발 닦기 후 고액**·사진 찍고 **팁 강요**. 미리 「No」.",
          en: "Hanoi reports: **shoe shine then huge fee**, or photo then **forced tip**. Say no early.",
        },
      },
      {
        label: { ko: "오토바이 소매치기", en: "Motorbike snatch" },
        value: {
          ko: "호치민 1군·벤탄: **가방·폰 낚아채기**. 길거리에서 폰 들고 걷지 않기.",
          en: "HCMC District 1/Ben Thanh: **bag/phone snatch** from bikes. Don't use phone while walking.",
        },
      },
    ],
    warning: {
      title: { ko: "베트남에서", en: "In Vietnam" },
      body: {
        ko: "**가격·통화(VND) 먼저 확인**. 「무료」 가이드·신발 닦기·사진은 유료로 바뀌는 경우 많음.",
        en: "**Confirm price in VND first**. 「Free」 guides, shoe shine, or photos often become paid traps.",
      },
    },
    estimatedLoss: { ko: "3만~200만 원+", en: "100k–5M VND+" },
  },
  taiwan: {
    reviewSource: {
      ko: "대만 여행 카페 · PTT",
      en: "Taiwan travel forums · PTT",
      url: "https://www.ptt.cc/bbs/Tour/index.html",
    },
    reviewNote: {
      ko: "타이베이 후기: **택시 미터기·야시장 바가지**가 주요 이슈. 차차(Grab Taiwan)·미터 택시 후기.",
      en: "Taipei reviews: **taxi meters and night-market overcharging**. Many use Uber Taiwan or metered taxis.",
    },
    defaultHotspots: { ko: "역·야시장·관광지", en: "Stations, night markets, sights" },
    scams: [
      {
        label: { ko: "택시 바가지", en: "Taxi overcharge" },
        value: {
          ko: "공항·역 **미터기 안 켬**·장거리 우회. 영수증 요청·앱 택시 후기.",
          en: "Airport/station **meter not on** or long detour. Ask for receipt; app rides recommended.",
        },
      },
      {
        label: { ko: "야시장·상점", en: "Night market / shop" },
        value: {
          ko: "**가격표 없음**·과일·해산물 무게 착각 유도. 가격 먼저 확인 후기.",
          en: "No price tags; **fruit/seafood weight tricks**. Ask price before accepting.",
        },
      },
      {
        label: { ko: "찻집 사기 (드묾)", en: "Tea house scam (rare)" },
        value: {
          ko: "과거 후기: **다정한 현지인 → 찻집** 고액 청구. 낯선 사람 유인은 동일 원칙.",
          en: "Older reports: **friendly local → tea house** huge bill. Don't follow strangers.",
        },
      },
      {
        label: { ko: "가짜 자원봉사·기부", en: "Fake charity" },
        value: {
          ko: "관광지 **서명·기부** 후 고액. 공식 기관 확인 없이 결제하지 않기.",
          en: "Tourist areas **petition/donation** then pressure to pay.",
        },
      },
    ],
    warning: {
      title: { ko: "대만에서", en: "In Taiwan" },
      body: {
        ko: "비교적 안전하지만 **택시·야시장 가격** 분쟁 후기 많음. **0800-024-111** 외국인 안내.",
        en: "Relatively safe, but **taxi and market pricing** disputes are common. Foreigner line **0800-024-111**.",
      },
    },
    estimatedLoss: { ko: "1만~100만 원+", en: "NT$500–30,000+" },
  },
  philippines: {
    reviewSource: {
      ko: "필리핀 여행 후기 · Reddit r/Philippines",
      en: "PH travel blogs · Reddit r/Philippines",
      url: "https://www.reddit.com/r/Philippines/search/?q=taxi+scam+tourist",
    },
    reviewNote: {
      ko: "마닐라·세부 후기: **공항 택시·Buy 1 Take 1**·ATM 스키밍. Grab·공항 공식 데스크 후기.",
      en: "Manila/Cebu reviews: **airport taxi, Buy 1 Take 1 drugs, ATM skimming**. Grab and official airport desks recommended.",
    },
    defaultHotspots: { ko: "공항·에르미타·관광지", en: "Airports, Ermita, tourist areas" },
    scams: [
      {
        label: { ko: "공항·택시", en: "Airport / taxi" },
        value: {
          ko: "「공식」사칭 **고정 요금 과다**. Grab·공항 **미터 택시** 창구 후기.",
          en: "Fake 「official」 desks with **inflated flat rates**. Use Grab or airport meter taxi counters.",
        },
      },
      {
        label: { ko: "Buy 1 Take 1", en: "Buy 1 Take 1 drug scam" },
        value: {
          ko: "마닐라 후기: **마약 판매 미끼** → 경찰 등장 연출·뇌물 요구. **절대 구매·소지 금지**.",
          en: "Manila reports: **drug sale setup** → fake police/shakedown. **Never buy or carry** — severe legal risk.",
        },
      },
      {
        label: { ko: "ATM·카드", en: "ATM / card skim" },
        value: {
          ko: "에르미타·마카티 **ATM skimmer** 후기. 실내 은행 ATM·현금 최소화.",
          en: "Ermita/Makati **ATM skimmers** reported. Use indoor bank ATMs; minimize card use.",
        },
      },
      {
        label: { ko: "투어·액티비티", en: "Tour / activity" },
        value: {
          ko: "보라카이·세부 **숨은 추가요금**·약속과 다른 보트. **서면 견적·리뷰** 확인.",
          en: "Boracay/Cebu **hidden fees** or wrong boats. Get **written quote and reviews** first.",
        },
      },
    ],
    warning: {
      title: { ko: "필리핀에서", en: "In the Philippines" },
      body: {
        ko: "**마약·경찰 사칭**은 형사처벌·뇌물 요구로 이어질 수 있음. 의심되면 **911**·대사관 연락.",
        en: "**Drugs and fake police** can lead to criminal charges or shakedowns. Call **911** or your embassy.",
      },
    },
    estimatedLoss: { ko: "5만~500만 원+", en: "₱2,000–200,000+" },
  },
};

const cityOverrides: Record<
  string,
  { hotspots?: { ko: string; en: string }; extraScams?: ScamItem[] }
> = {
  "japan/tokyo": {
    hotspots: { ko: "신주쿠·歌舞伎町, 록폰기, 아사쿠사", en: "Shinjuku/Kabukicho, Roppongi, Asakusa" },
    extraScams: [{
      label: { ko: "도쿄 특유", en: "Tokyo-specific" },
      value: {
        ko: "롯폰기 **저가 바 유인** → 수백만 엔 청구 후기 다수. 신주쿠 **호스트바·동행료** 주의.",
        en: "Roppongi 「cheap bars」→ **¥500,000+ bills** widely reported. Shinjuku host bars add companion fees.",
      },
    }],
  },
  "japan/osaka": {
    hotspots: { ko: "道頓堀·なんば", en: "Dotonbori, Namba" },
    extraScams: [{
      label: { ko: "오사카 특유", en: "Osaka-specific" },
      value: {
        ko: "道頓堀 **토우트(권유)** → 비싼 스시·바. 메뉴·세트 가격 확인 후기.",
        en: "Dotonbori **touts** to overpriced sushi/bars. Confirm menu/set price first.",
      },
    }],
  },
  "japan/kyoto": {
    hotspots: { ko: "祇園·清水寺·京都駅", en: "Gion, Kiyomizu, Kyoto Station" },
    extraScams: [{
      label: { ko: "교토 특유", en: "Kyoto-specific" },
      value: {
        ko: "祇園 **게이샤·마이코 사진** 후 고액 요금. 사찰 **특별 기도** 현금 요구.",
        en: "Gion **geisha/maiko photo** then huge fee. Temple 「special prayer」 cash demands reported.",
      },
    }],
  },
  "japan/fukuoka": { hotspots: { ko: "中洲·博多駅", en: "Nakasu, Hakata Station" } },
  "japan/sapporo": { hotspots: { ko: "薄野·すすきの", en: "Susukino, Sapporo Station" } },
  "thailand/bangkok": {
    hotspots: { ko: "카오산·왕궁·Chatuchak", en: "Khao San, Grand Palace, Chatuchak" },
    extraScams: [{
      label: { ko: "왕궁 루트 사기", en: "Grand Palace route" },
      value: {
        ko: "「오늘 휴무」→ **보석·택시 투어** — 네이버·Reddit **최다** 패턴.",
        en: "「Closed today」→ **gem shop/taxi tour** — one of the most reported Bangkok scams.",
      },
    }],
  },
  "thailand/phuket": {
    hotspots: { ko: "Patong·Kata·Karon", en: "Patong, Kata, Karon" },
    extraScams: [{
      label: { ko: "푸켓 젯스키", en: "Phuket jet ski" },
      value: {
        ko: "파통·카타 **젯스키 손상 사기** — peunge.tistory 한국 후기 **다수**.",
        en: "Patong/Kata **jet ski damage scams** — many Korean travel blog reports.",
      },
    }],
  },
  "thailand/chiang-mai": { hotspots: { ko: "古城·님만·週六夜市", en: "Old City, Nimman, Saturday Night Market" } },
  "thailand/pattaya": { hotspots: { ko: "Walking Street·비치로드", en: "Walking Street, Beach Rd" } },
  "vietnam/hanoi": { hotspots: { ko: "환경 호수·三十六行街", en: "Hoan Kiem, Old Quarter" } },
  "vietnam/ho-chi-minh-city": { hotspots: { ko: "벤탄·1군·范五老", en: "Ben Thanh, District 1, Pham Ngu Lao" } },
  "vietnam/danang": { hotspots: { ko: "미케비치·공항", en: "My Khe Beach, airport" } },
  "vietnam/nha-trang": { hotspots: { ko: "해변·섬 투어", en: "Beach, island tours" } },
  "taiwan/taipei": { hotspots: { ko: "西门町·士林夜市", en: "Ximending, Shilin Night Market" } },
  "taiwan/taichung": { hotspots: { ko: "逢甲夜市·高鐵台中", en: "Fengjia Night Market, HSR Taichung" } },
  "taiwan/kaohsiung": { hotspots: { ko: "六合夜市·駁二", en: "Liuhe Night Market, Pier-2" } },
  "philippines/manila": { hotspots: { ko: "에르미타·마카티·NAIA", en: "Ermita, Makati, NAIA" } },
  "philippines/cebu": { hotspots: { ko: "IT Park·マクタン", en: "IT Park, Mactan" } },
  "philippines/boracay": { hotspots: { ko: "Station 1~3·Caticlan", en: "Station 1–3, Caticlan port" } },
};

export function getScamGuide(country: string, citySlug: string): ScamGuideCopy {
  const base = countryBase[country];
  if (!base) throw new Error(`Missing scam data for country: ${country}`);

  const override = cityOverrides[`${country}/${citySlug}`];
  const hotspots = override?.hotspots ?? base.defaultHotspots;

  return {
    reviewSource: base.reviewSource,
    reviewNote: base.reviewNote,
    hotspots,
    scams: override?.extraScams ? [...base.scams, ...override.extraScams] : base.scams,
    warning: base.warning,
    estimatedLoss: base.estimatedLoss,
  };
}

export function scamReviewBlock(guide: ScamGuideCopy, locale: Locale): string {
  const label = locale === "ko" ? "📌 실제 후기·커뮤니티 기반" : "📌 Based on travel reviews & forums";
  const note = guide.reviewNote[locale];
  const source = guide.reviewSource[locale].replace(/"/g, '\\"');
  return `<ReviewNote label="${label}" source="${source}" url="${guide.reviewSource.url}">
  ${note}
</ReviewNote>`;
}
