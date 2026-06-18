/** 19개 도시별 실제 연락처·지도 데이터 — MDX 생성용 */

export interface Location {
  name: { ko: string; en: string };
  address?: { ko: string; en: string };
  phone?: string;
  hours?: { ko: string; en: string };
  website?: string;
  note?: { ko: string; en: string };
  mapQuery: string;
}

export interface CityData {
  country: string;
  slug: string;
  emergency: { number: string; label: { ko: string; en: string } };
  embassy: Location;
  police: Location[];
  hospitals?: Location[];
  /** 해당 도시 관할 한국 공관 (없으면 embassy 사용) */
  consulate?: Location;
  reviewSource?: { ko: string; en: string; url: string };
  reviewNote?: { ko: string; en: string };
  localTips?: { ko: string; en: string };
}

export const cityDataRegistry: Record<string, CityData> = {
  "japan/tokyo": {
    country: "japan",
    slug: "tokyo",
    emergency: { number: "110", label: { ko: "일본 경찰 · 관광 03-3501-0110", en: "Japan Police · Tourist 03-3501-0110" } },
    embassy: {
      name: { ko: "주일본 대한민국 대사관", en: "Embassy of Korea in Japan" },
      address: { ko: "107-0052 東京都港区三田2-5-10", en: "2-5-10 Mita, Minato-ku, Tokyo 107-0052" },
      phone: "+81-3-3455-2601",
      hours: { ko: "여권 접수 평일 09:00–16:00", en: "Passport intake weekdays 09:00–16:00" },
      website: "https://overseas.mofa.go.kr/jp-ko",
      note: { ko: "아자부주반역 10번 출구 · 당일 발급 후기(클린스마일)", en: "Azabu-Juban Stn · same-day cases reported" },
      mapQuery: "Embassy of South Korea Tokyo Mita 2-5-10",
    },
    police: [
      {
        name: { ko: "도쿄역 앞 경찰 파출소", en: "Tokyo Eki-mae Koban" },
        address: { ko: "東京都千代田区丸の内", en: "Marunouchi, Chiyoda-ku, Tokyo" },
        phone: "03-3212-4966",
        hours: { ko: "24시간", en: "24 hours" },
        mapQuery: "Tokyo Station Koban Marunouchi",
      },
      {
        name: { ko: "신주쿠 경찰 파출소", en: "Shinjuku Koban" },
        address: { ko: "東京都新宿区西新宿", en: "Nishi-Shinjuku, Tokyo" },
        phone: "03-3342-0110",
        hours: { ko: "24시간", en: "24 hours" },
        mapQuery: "Shinjuku Koban Tokyo",
      },
    ],
    hospitals: [
      {
        name: { ko: "도쿄 응급의료센터", en: "Tokyo Medical Center" },
        address: { ko: "東京都目黒区", en: "Meguro-ku, Tokyo" },
        phone: "03-3411-0111",
        hours: { ko: "24시간 ER", en: "24hr ER" },
        mapQuery: "Tokyo Medical Center Hospital",
      },
    ],
  },

  "japan/osaka": {
    country: "japan",
    slug: "osaka",
    emergency: { number: "110", label: { ko: "일본 경찰", en: "Japan Police" } },
    consulate: {
      name: { ko: "주오사카 대한민국 총영사관", en: "Consulate General of Korea in Osaka" },
      address: { ko: "541-0046 大阪府大阪市中央区平野町2-3-13", en: "2-3-13 Hirano-machi, Chuo-ku, Osaka" },
      phone: "+81-6-6212-8801",
      hours: { ko: "평일 09:00–16:00", en: "Weekdays 09:00–16:00" },
      website: "https://overseas.mofa.go.kr/jp-osaka-ko",
      note: { ko: "교토·나라·와카야마 관할 · 1~2영업일", en: "Covers Kyoto/Nara · 1–2 business days" },
      mapQuery: "Consulate General of Korea Osaka Hirano-machi",
    },
    embassy: {
      name: { ko: "주오사카 대한민국 총영사관", en: "Consulate General of Korea in Osaka" },
      address: { ko: "541-0046 大阪府大阪市中央区平野町2-3-13", en: "2-3-13 Hirano-machi, Chuo-ku, Osaka" },
      phone: "+81-6-6212-8801",
      hours: { ko: "평일 09:00–16:00", en: "Weekdays 09:00–16:00" },
      website: "https://overseas.mofa.go.kr/jp-osaka-ko",
      mapQuery: "Consulate General of Korea Osaka",
    },
    police: [
      {
        name: { ko: "난바 경찰 파출소", en: "Namba Koban" },
        address: { ko: "大阪府大阪市中央区難波", en: "Namba, Chuo-ku, Osaka" },
        phone: "06-6641-0110",
        hours: { ko: "24시간", en: "24 hours" },
        mapQuery: "Namba Koban Osaka",
      },
      {
        name: { ko: "오사카역 앞 경찰 파출소", en: "Osaka Eki-mae Koban" },
        address: { ko: "大阪府大阪市北区", en: "Kita-ku, Osaka" },
        phone: "06-6341-0110",
        mapQuery: "Osaka Station Koban",
      },
    ],
    hospitals: [
      {
        name: { ko: "오사카 종합의료센터", en: "Osaka General Medical Center" },
        address: { ko: "大阪府大阪市都島区", en: "Miyakojima-ku, Osaka" },
        phone: "06-6929-0111",
        hours: { ko: "24시간", en: "24 hours" },
        mapQuery: "Osaka General Medical Center",
      },
    ],
    reviewNote: {
      ko: "오사카·교토 여행객은 **주오사카 총영사관** 이용. 도쿄 대사관보다 대기 짧다는 후기 다수. 경찰 파출소 분실신고 후 **6,890엔** 긴급여권.",
      en: "Osaka/Kyoto travelers use **Osaka Consulate**. Shorter queues than Tokyo reported. Koban report then **¥6,890** emergency passport.",
    },
    reviewSource: { ko: "주오사카 총영사관 · 티스토리 후기", en: "Osaka Consulate · Tistory reviews", url: "https://overseas.mofa.go.kr/jp-osaka-ko" },
  },

  "japan/fukuoka": {
    country: "japan",
    slug: "fukuoka",
    emergency: { number: "110", label: { ko: "일본 경찰 110 · 파출소(코반)", en: "Japan Police (Koban)" } },
    embassy: {
      name: { ko: "주후쿠오카 대한민국 총영사관", en: "Consulate General of Korea in Fukuoka" },
      address: { ko: "810-0065 福岡県福岡市中央区地行浜1-1-3", en: "1-1-3 Jigyohama, Chuo-ku, Fukuoka" },
      phone: "+81-92-771-0461",
      hours: { ko: "평일 09:00–16:00", en: "Weekdays 09:00–16:00" },
      website: "https://overseas.mofa.go.kr/jp-fukuoka-ko",
      mapQuery: "Consulate General of Korea Fukuoka",
    },
    police: [
      {
        name: { ko: "하카타역 앞 경찰 파출소", en: "Hakata Ekimae Koban" },
        address: { ko: "福岡市博多区", en: "Hakata-ku, Fukuoka" },
        phone: "092-431-0110",
        mapQuery: "Hakata Ekimae Koban Fukuoka",
      },
    ],
  },

  "japan/kyoto": {
    country: "japan",
    slug: "kyoto",
    emergency: { number: "110", label: { ko: "일본 경찰", en: "Japan Police" } },
    consulate: {
      name: { ko: "주오사카 대한민국 총영사관 (교토 관할)", en: "Osaka Consulate (jurisdiction over Kyoto)" },
      address: { ko: "541-0046 大阪府大阪市中央区平野町2-3-13", en: "2-3-13 Hirano-machi, Osaka" },
      phone: "+81-6-6212-8801",
      hours: { ko: "평일 09:00–16:00 · JR 30분", en: "Weekdays 09:00–16:00 · 30min by JR" },
      website: "https://overseas.mofa.go.kr/jp-osaka-ko",
      note: { ko: "교토 분실 → 오사카 총영사관", en: "Kyoto loss → Osaka Consulate" },
      mapQuery: "Consulate General of Korea Osaka",
    },
    embassy: {
      name: { ko: "주오사카 대한민국 총영사관", en: "Consulate General of Korea in Osaka" },
      address: { ko: "541-0046 大阪府大阪市中央区平野町2-3-13", en: "2-3-13 Hirano-machi, Osaka" },
      phone: "+81-6-6212-8801",
      mapQuery: "Consulate General of Korea Osaka",
    },
    police: [
      {
        name: { ko: "교토역 앞 경찰 파출소", en: "Kyoto Eki-mae Koban" },
        address: { ko: "京都市下京区", en: "Shimogyo-ku, Kyoto" },
        phone: "075-371-0110",
        hours: { ko: "24시간", en: "24 hours" },
        note: { ko: "清水寺·祇園 관광객 분실 다발", en: "Gion/Kiyomizu area" },
        mapQuery: "Kyoto Station Koban",
      },
    ],
    reviewNote: {
      ko: "교토에서 여권 분실 시 **교토역 앞 경찰 파출소** 신고 → **오사카 총영사관** (JR 특급 30분). 후기: 당일 오사카 왕복 가능.",
      en: "Report at **Kyoto Station Koban** → **Osaka Consulate** (30min JR). Same-day round trip reported.",
    },
    reviewSource: { ko: "티스토리 · kim-japan", en: "Tistory · kim-japan", url: "https://kim-japan.tistory.com/78" },
  },

  "japan/sapporo": {
    country: "japan",
    slug: "sapporo",
    emergency: { number: "110", label: { ko: "일본 경찰", en: "Japan Police" } },
    embassy: {
      name: { ko: "주삿포로 대한민국 총영사관", en: "Consulate General of Korea in Sapporo" },
      address: { ko: "060-0003 北海道札幌市中央区北3条西7-1-1", en: "7-1-1 Kita 3-jo Nishi, Chuo-ku, Sapporo" },
      phone: "+81-11-512-4100",
      hours: { ko: "평일 09:00–16:00", en: "Weekdays 09:00–16:00" },
      website: "https://overseas.mofa.go.kr/jp-sapporo-ko",
      mapQuery: "Consulate General of Korea Sapporo",
    },
    police: [
      {
        name: { ko: "삿포로역 앞 경찰 파출소", en: "Sapporo Eki-mae Koban" },
        address: { ko: "札幌市中央区", en: "Chuo-ku, Sapporo" },
        phone: "011-221-0110",
        mapQuery: "Sapporo Station Koban",
      },
    ],
    reviewNote: {
      ko: "삿포로·홋카이도 여행객은 **주삿포로 총영사관**. 겨울 성수기 대기 2~3일 후기 — **전화 예약 필수**.",
      en: "Hokkaido travelers use **Sapporo Consulate**. Peak winter wait 2–3 days reported — **call ahead**.",
    },
    reviewSource: { ko: "주삿포로 총영사관", en: "Sapporo Consulate", url: "https://overseas.mofa.go.kr/jp-sapporo-ko" },
  },

  "thailand/bangkok": {
    country: "thailand",
    slug: "bangkok",
    emergency: { number: "1155", label: { ko: "태국 관광경찰", en: "Tourist Police" } },
    embassy: {
      name: { ko: "주태국 대한민국 대사관", en: "Embassy of Korea in Thailand" },
      address: { ko: "1777 New Petchburi Rd, Bangkok", en: "1777 New Petchburi Rd, Bangkok" },
      phone: "+66-2-247-7537",
      hours: { ko: "평일 09:00–17:00", en: "Weekdays 09:00–17:00" },
      website: "https://overseas.mofa.go.kr/th-ko",
      mapQuery: "Embassy of South Korea Bangkok Petchburi",
    },
    police: [
      {
        name: { ko: "태국 관광경찰 (1155)", en: "태국 관광경찰 (1155)" },
        phone: "1155",
        hours: { ko: "24시간 · 영어·한국어", en: "24hr · English/Korean" },
        address: { ko: "방콕 전역", en: "Bangkok" },
        mapQuery: "Tourist Police Bureau Bangkok",
      },
    ],
  },

  "thailand/phuket": {
    country: "thailand",
    slug: "phuket",
    emergency: { number: "1155", label: { ko: "관광경찰 1155", en: "Tourist Police 1155" } },
    embassy: {
      name: { ko: "주태국 대한민국 대사관 (방콕)", en: "Embassy of Korea in Bangkok" },
      address: { ko: "1777 New Petchburi Rd, Bangkok", en: "1777 New Petchburi Rd, Bangkok" },
      phone: "+66-2-247-7537",
      note: { ko: "여권 재발급은 방콕 대사관", en: "Passport reissue at Bangkok embassy" },
      mapQuery: "Embassy of South Korea Bangkok",
    },
    police: [
      {
        name: { ko: "푸켓 관광경찰", en: "푸켓 관광경찰" },
        address: { ko: "파통, 푸켓", en: "Patong, Phuket" },
        phone: "1155",
        hours: { ko: "24시간", en: "24 hours" },
        note: { ko: "아이폰 찾기+경찰 협조 폰 회수 후기(peunge.tistory)", en: "Find My + police recovery reported" },
        mapQuery: "푸켓 관광경찰 Patong",
      },
      {
        name: { ko: "파통 경찰서", en: "파통 경찰서" },
        address: { ko: "파통 비치 로드, 푸켓", en: "Patong Beach Rd, Phuket" },
        phone: "191",
        mapQuery: "파통 경찰서 Phuket",
      },
    ],
    hospitals: [
      {
        name: { ko: "방콕병원 푸켓", en: "방콕병원 푸켓" },
        address: { ko: "Phuket Town", en: "Phuket Town" },
        phone: "+66-76-254-425",
        hours: { ko: "24시간 ER", en: "24hr ER" },
        mapQuery: "방콕병원 푸켓",
      },
    ],
    reviewNote: {
      ko: "푸켓 파통·카타 비치 도난 다발. **1155** 먼저 → 파통 경찰서. 폰 분실 **아이폰 찾기/기기 찾기** + **1155** 회수 후기 있음.",
      en: "Theft common Patong/Kata. Call **1155** first. Phone recovery via Find My reported.",
    },
    reviewSource: { ko: "peunge.tistory", en: "peunge.tistory", url: "https://peunge.tistory.com/269" },
  },

  "thailand/chiang-mai": {
    country: "thailand",
    slug: "chiang-mai",
    emergency: { number: "1155", label: { ko: "관광경찰", en: "Tourist Police" } },
    embassy: {
      name: { ko: "주태국 대한민국 대사관 (방콕)", en: "Embassy of Korea in Bangkok" },
      phone: "+66-2-247-7537",
      address: { ko: "1777 New Petchburi Rd, Bangkok", en: "1777 New Petchburi Rd, Bangkok" },
      mapQuery: "Embassy of South Korea Bangkok",
    },
    police: [
      {
        name: { ko: "치앙마이 관광경찰", en: "치앙마이 관광경찰" },
        address: { ko: "Chiang Mai Old City", en: "Chiang Mai Old City" },
        phone: "1155",
        mapQuery: "치앙마이 관광경찰",
      },
    ],
    hospitals: [
      {
        name: { ko: "치앙마이 람 병원", en: "치앙마이 람 병원" },
        phone: "+66-53-920-300",
        address: { ko: "Chiang Mai", en: "Chiang Mai" },
        hours: { ko: "24시간", en: "24 hours" },
        mapQuery: "치앙마이 람 병원",
      },
    ],
    reviewNote: {
      ko: "치앙마이 **송크란·야시장** 소매치기 주의. 경찰 신고 **도난** 기록 요청(보험).",
      en: "Pickpockets at **Songkran/night markets**. Request **Stolen** on police report.",
    },
    reviewSource: { ko: "savasavasns.com", en: "savasavasns.com", url: "https://savasavasns.com/guide/travel-police-report-guide/" },
  },

  "thailand/pattaya": {
    country: "thailand",
    slug: "pattaya",
    emergency: { number: "1155", label: { ko: "관광경찰", en: "Tourist Police" } },
    embassy: {
      name: { ko: "주태국 대한민국 대사관", en: "Embassy of Korea in Bangkok" },
      phone: "+66-2-247-7537",
      address: { ko: "1777 New Petchburi Rd, Bangkok", en: "Bangkok" },
      mapQuery: "Embassy of South Korea Bangkok",
    },
    police: [
      {
        name: { ko: "파타야 관광경찰", en: "파타야 관광경찰" },
        address: { ko: "Pattaya Beach Rd", en: "Pattaya Beach Rd" },
        phone: "1155",
        mapQuery: "파타야 관광경찰 Station",
      },
    ],
    reviewNote: {
      ko: "파타야 버스·비치 로드 소매치기 후기. **1155** + 호텔 리셉션 대신 연락 가능.",
      en: "Beach road pickpockets reported. Hotel can call **1155** for you.",
    },
    reviewSource: { ko: "peunge.tistory", en: "peunge.tistory", url: "https://peunge.tistory.com/269" },
  },

  "vietnam/danang": {
    country: "vietnam",
    slug: "danang",
    emergency: { number: "115", label: { ko: "베트남 응급", en: "Vietnam Emergency" } },
    embassy: {
      name: { ko: "주베트남 대한민국 대사관 (하노이)", en: "Embassy of Korea in Vietnam (Hanoi)" },
      phone: "+84-24-3831-5111",
      address: { ko: "하노이", en: "Hanoi" },
      website: "https://overseas.mofa.go.kr/vn-ko",
      mapQuery: "Embassy of South Korea Hanoi",
    },
    police: [
      {
        name: { ko: "다낭 경찰서", en: "다낭 경찰서" },
        phone: "113",
        address: { ko: "Da Nang", en: "Da Nang" },
        mapQuery: "다낭 경찰서 Station Vietnam",
      },
    ],
    hospitals: [
      {
        name: { ko: "다낭 패밀리 병원", en: "다낭 패밀리 병원" },
        address: { ko: "73 Nguyễn Hữu Thọ", en: "73 Nguyen Huu Tho" },
        phone: "+84-236-365-0006",
        note: { ko: "한국어 091-142-4040 · 1차 40만동", en: "Korean 091-142-4040 · ~400k VND" },
        mapQuery: "다낭 패밀리 병원",
      },
    ],
  },

  "vietnam/hanoi": {
    country: "vietnam",
    slug: "hanoi",
    emergency: { number: "115", label: { ko: "베트남 응급 115", en: "Vietnam Emergency 115" } },
    embassy: {
      name: { ko: "주베트남 대한민국 대사관", en: "Embassy of Korea in Vietnam" },
      address: { ko: "4 Le Hong Phong, Ba Dinh, Hanoi", en: "4 Le Hong Phong, Ba Dinh, Hanoi" },
      phone: "+84-24-3831-5111",
      hours: { ko: "평일 09:00–17:00", en: "Weekdays 09:00–17:00" },
      website: "https://overseas.mofa.go.kr/vn-ko",
      mapQuery: "Embassy of South Korea Hanoi Le Hong Phong",
    },
    police: [
      {
        name: { ko: "하노이 환경 경찰서", en: "Hanoi Police Hoan Kiem" },
        address: { ko: "Hoan Kiem District", en: "Hoan Kiem, Hanoi" },
        phone: "113",
        mapQuery: "Hoan Kiem Police Station Hanoi",
      },
    ],
    hospitals: [
      {
        name: { ko: "빈멕 타임스시티 (하노이)", en: "빈멕 타임스시티 (하노이) Hanoi" },
        address: { ko: "458 Minh Khai, Hai Ba Trung, Hanoi", en: "458 Minh Khai, Hai Ba Trung, Hanoi" },
        phone: "+84-24-3974-3556",
        hours: { ko: "24시간", en: "24 hours" },
        mapQuery: "빈멕 타임스시티 (하노이) Hanoi",
      },
      {
        name: { ko: "하노이 프랑스 병원", en: "하노이 프랑스 병원" },
        address: { ko: "1 Phuong Mai, Dong Da, Hanoi", en: "1 Phuong Mai, Dong Da, Hanoi" },
        phone: "+84-24-3574-1111",
        mapQuery: "하노이 프랑스 병원",
      },
    ],
    reviewNote: {
      ko: "하노이 **Vinmec** 외국인 후기: 예약 69만동/무예약 110만동. **115** 구급차 현금 35~50만동.",
      en: "Hanoi **Vinmec**: booked 690k/walk-in 1.1M VND. Ambulance cash 350–500k.",
    },
    reviewSource: { ko: "travelalltheway.tistory", en: "travelalltheway.tistory", url: "https://travelalltheway.tistory.com/8" },
  },

  "vietnam/ho-chi-minh-city": {
    country: "vietnam",
    slug: "ho-chi-minh-city",
    emergency: { number: "115", label: { ko: "베트남 응급", en: "Vietnam Emergency" } },
    consulate: {
      name: { ko: "주호치민 대한민국 총영사관", en: "Consulate General of Korea in HCMC" },
      address: { ko: "107 Nguyen Du, District 1, HCMC", en: "107 Nguyen Du, District 1, Ho Chi Minh City" },
      phone: "+84-28-3822-5757",
      hours: { ko: "평일 09:00–17:00", en: "Weekdays 09:00–17:00" },
      website: "https://overseas.mofa.go.kr/vn-hochiminh-ko",
      mapQuery: "Consulate General of Korea Ho Chi Minh City Nguyen Du",
    },
    embassy: {
      name: { ko: "주호치민 대한민국 총영사관", en: "Consulate General of Korea in HCMC" },
      address: { ko: "107 Nguyen Du, District 1", en: "107 Nguyen Du, District 1, HCMC" },
      phone: "+84-28-3822-5757",
      mapQuery: "Consulate General of Korea Ho Chi Minh City",
    },
    police: [
      {
        name: { ko: "1군 벤탄 경찰서", en: "District 1 Police Ben Thanh" },
        address: { ko: "District 1, HCMC", en: "District 1, Ho Chi Minh City" },
        phone: "113",
        mapQuery: "Ben Thanh Police Station Ho Chi Minh City",
      },
    ],
    hospitals: [
      {
        name: { ko: "FV 병원 (호치민)", en: "FV 병원 (호치민) Ho Chi Minh" },
        phone: "+84-28-5411-3333",
        hours: { ko: "24시간 ER · 영어", en: "24hr ER · English" },
        mapQuery: "FV 병원 (호치민) Ho Chi Minh City",
      },
      {
        name: { ko: "빈멕 센트럴파크 (호치민)", en: "빈멕 센트럴파크 (호치민)" },
        phone: "+84-28-3622-1166",
        mapQuery: "빈멕 센트럴파크 (호치민) Ho Chi Minh",
      },
    ],
    reviewNote: {
      ko: "호치민 **벤탄·1군** 소매치기·오토바이 강도 후기. **FV 병원 (호치민)** 외국인 ER 후기 다수 — 보험 병원 직접 청구 확인.",
      en: "Pickpockets District 1. **FV 병원 (호치민)** popular for 외국인s — confirm insurance billing.",
    },
    reviewSource: { ko: "트래블러스 · 외국인 후기", en: "Travel blogs · 외국인 reviews", url: "https://travelalltheway.tistory.com/8" },
  },

  "vietnam/nha-trang": {
    country: "vietnam",
    slug: "nha-trang",
    emergency: { number: "115", label: { ko: "베트남 응급", en: "Vietnam Emergency" } },
    embassy: {
      name: { ko: "주호치민 총영사관 (나트랑)", en: "HCMC Consulate (Nha Trang area)" },
      phone: "+84-28-3822-5757",
      address: { ko: "107 Nguyen Du, HCMC", en: "107 Nguyen Du, HCMC" },
      note: { ko: "여권: 호치민 총영사관 또는 하노이 대사관", en: "Passport: HCMC or Hanoi" },
      mapQuery: "Consulate General of Korea Ho Chi Minh City",
    },
    police: [
      {
        name: { ko: "나트랑 경찰서", en: "나트랑 경찰서" },
        phone: "113",
        address: { ko: "Nha Trang, Khanh Hoa", en: "Nha Trang" },
        mapQuery: "나트랑 경찰서 Station Vietnam",
      },
    ],
    hospitals: [
      {
        name: { ko: "빈멕 나트랑 병원", en: "빈멕 나트랑 병원" },
        phone: "+84-258-3900-560",
        hours: { ko: "24시간", en: "24 hours" },
        mapQuery: "빈멕 나트랑 병원 International Hospital",
      },
    ],
    reviewNote: {
      ko: "나트랑 해변·섬 투어 중 분실 후기. **Vinmec** 1차 진료비 사전 문의 권장.",
      en: "Beach/island tour losses reported. Ask **Vinmec** for quote first.",
    },
    reviewSource: { ko: "네이버 여행 후기", en: "Naver travel reviews", url: "https://travelalltheway.tistory.com/8" },
  },

  "taiwan/taipei": {
    country: "taiwan",
    slug: "taipei",
    emergency: { number: "110", label: { ko: "대만 경찰 · 0800-024-111", en: "Taiwan Police · 0800-024-111" } },
    embassy: {
      name: { ko: "주타이베이 대한민국 대표부", en: "Korean Mission in Taipei" },
      address: { ko: "11047 台北市信義區基隆路一段333號1506室", en: "1506, 333 Keelung Rd Sec 1, Taipei" },
      phone: "+886-2-2758-8299",
      website: "https://overseas.mofa.go.kr/tw-ko",
      mapQuery: "Korean Mission in Taipei Keelung Road",
    },
    police: [
      {
        name: { ko: "타이베이 중정 제1경찰서", en: "Zhongzheng First Precinct" },
        phone: "02-2381-7494",
        address: { ko: "台北市中正區", en: "Zhongzheng, Taipei" },
        mapQuery: "Zhongzheng First Police Precinct Taipei",
      },
    ],
  },

  "taiwan/taichung": {
    country: "taiwan",
    slug: "taichung",
    emergency: { number: "110", label: { ko: "대만 경찰", en: "Taiwan Police" } },
    embassy: {
      name: { ko: "주타이베이 대한민국 대표부", en: "Korean Mission in Taipei" },
      phone: "+886-2-2758-8299",
      address: { ko: "台北市信義區基隆路一段333號", en: "333 Keelung Rd, Taipei" },
      note: { ko: "여권·영사 업무는 타이베이 대표부", en: "Consular services in Taipei" },
      mapQuery: "Korean Mission in Taipei",
    },
    police: [
      {
        name: { ko: "타이중 시 경찰청", en: "Taichung City Police" },
        phone: "110",
        address: { ko: "台中市", en: "Taichung" },
        note: { ko: "0800-024-111 외국인 전담", en: "Foreigner hotline 0800-024-111" },
        mapQuery: "Taichung City Police Department",
      },
      {
        name: { ko: "타이중 중강 파출소", en: "Zhonggang Police Station" },
        address: { ko: "台中市西區", en: "West District, Taichung" },
        mapQuery: "Zhonggang Police Station Taichung",
      },
    ],
    reviewNote: {
      ko: "타이중 **봉ga 야시장·고속철** 분실 후기 — 경찰 **번역앱** 사용(대만·한국 후기 공통).",
      en: "Fengjia Night Market losses — police use **translation apps**.",
    },
    reviewSource: { ko: "대만 경찰 뉴스", en: "Taiwan Police News", url: "https://www.tcpttw.com/" },
  },

  "taiwan/kaohsiung": {
    country: "taiwan",
    slug: "kaohsiung",
    emergency: { number: "110", label: { ko: "대만 경찰", en: "Taiwan Police" } },
    embassy: {
      name: { ko: "주타이베이 대한민국 대표부", en: "Korean Mission in Taipei" },
      address: { ko: "台北市信義區基隆路一段333號", en: "333 Keelung Rd Sec 1, Taipei" },
      phone: "+886-2-2758-8299",
      mapQuery: "Korean Mission in Taipei",
    },
    police: [
      {
        name: { ko: "가오슝 시 경찰청", en: "Kaohsiung City Police" },
        phone: "110",
        address: { ko: "高雄市", en: "Kaohsiung" },
        mapQuery: "Kaohsiung City Police Department",
      },
    ],
    hospitals: [
      {
        name: { ko: "장庚기념병원", en: "Chang Gung Memorial Hospital Kaohsiung" },
        phone: "+886-7-731-7123",
        hours: { ko: "24시간 ER", en: "24hr ER" },
        mapQuery: "Chang Gung Memorial Hospital Kaohsiung",
      },
    ],
  },

  "philippines/manila": {
    country: "philippines",
    slug: "manila",
    emergency: { number: "911", label: { ko: "필리핀 긴급 911", en: "Philippines Emergency 911" } },
    embassy: {
      name: { ko: "주필리핀 대한민국 대사관", en: "Embassy of Korea in Philippines" },
      address: { ko: "122 Upper McKinley Rd, Taguig, Metro Manila", en: "122 Upper McKinley Rd, Taguig, Metro Manila" },
      phone: "+63-2-8856-9000",
      hours: { ko: "평일 09:00–17:00", en: "Weekdays 09:00–17:00" },
      website: "https://overseas.mofa.go.kr/ph-ko",
      mapQuery: "Embassy of South Korea Taguig Manila",
    },
    police: [
      {
        name: { ko: "마닐라 관광경찰", en: "마닐라 관광경찰" },
        phone: "911",
        address: { ko: "Ermita, Manila", en: "Ermita, Manila" },
        mapQuery: "마닐라 관광경찰 Ermita",
      },
    ],
    hospitals: [
      {
        name: { ko: "세ント루크스 BGC 병원", en: "세ント루크스 BGC 병원" },
        phone: "+63-2-8789-7700",
        hours: { ko: "24시간 ER", en: "24hr ER" },
        mapQuery: "St Lukes Medical Center BGC Taguig",
      },
    ],
    reviewNote: {
      ko: "마닐라 **에르미타·마카티** 소매치기 후기. 여권 분실 → **타기그 대사관** · 경찰 **접수 기록(Blotter)** 필수.",
      en: "Pickpockets Ermita/Makati. Passport → **Taguig embassy** · police **blotter** required.",
    },
    reviewSource: { ko: "필리핀 여행 후기 · MOFA", en: "PH travel reviews · MOFA", url: "https://overseas.mofa.go.kr/ph-ko" },
  },

  "philippines/cebu": {
    country: "philippines",
    slug: "cebu",
    emergency: { number: "911", label: { ko: "필리핀 긴급 911", en: "Philippines Emergency 911" } },
    consulate: {
      name: { ko: "주세부 대한민국 총영사관", en: "Consulate General of Korea in Cebu" },
      address: { ko: "12th Floor, Cebu Holdings Center, Cebu City", en: "Cebu Holdings Center, Cebu City" },
      phone: "+63-32-231-0343",
      hours: { ko: "평일 09:00–17:00", en: "Weekdays 09:00–17:00" },
      website: "https://overseas.mofa.go.kr/ph-cebu-ko",
      mapQuery: "Consulate General of Korea Cebu City",
    },
    embassy: {
      name: { ko: "주세부 대한민국 총영사관", en: "Consulate General of Korea in Cebu" },
      address: { ko: "Cebu Holdings Center, Cebu City", en: "Cebu Holdings Center, Cebu City" },
      phone: "+63-32-231-0343",
      mapQuery: "Consulate General of Korea Cebu",
    },
    police: [
      {
        name: { ko: "세부 시 경찰서", en: "세부 시 경찰서" },
        phone: "911",
        address: { ko: "Cebu City", en: "Cebu City" },
        mapQuery: "Cebu City Police Office",
      },
    ],
    hospitals: [
      {
        name: { ko: "세부 종화병원", en: "세부 종화병원 Cebu" },
        address: { ko: "Don Mariano Cui St, Cebu City", en: "Don Mariano Cui St, Cebu City" },
        phone: "+63-32-255-8000",
        hours: { ko: "24시간", en: "24 hours" },
        mapQuery: "세부 종화병원 Cebu City",
      },
    ],
  },

  "philippines/boracay": {
    country: "philippines",
    slug: "boracay",
    emergency: { number: "911", label: { ko: "필리핀 긴급", en: "Philippines Emergency" } },
    embassy: {
      name: { ko: "주세부 총영사관 (보라카이)", en: "Cebu Consulate (Boracay area)" },
      phone: "+63-32-231-0343",
      address: { ko: "Cebu City", en: "Cebu City" },
      note: { ko: "보라카이 사건 → Malay 경찰 + 세부 총영사관", en: "Malay police + Cebu consulate" },
      mapQuery: "Consulate General of Korea Cebu",
    },
    police: [
      {
        name: { ko: "말레이 경찰서 (보라카이)", en: "Malay Police Station Boracay" },
        address: { ko: "Malay, Aklan", en: "Malay, Aklan (Boracay)" },
        phone: "911",
        note: { ko: "보라카이 현지 경찰", en: "Local Boracay jurisdiction" },
        mapQuery: "Malay Police Station Aklan Boracay",
      },
    ],
    hospitals: [
      {
        name: { ko: "보라카이 의료 클리닉", en: "보라카이 의료 클리닉" },
        phone: "+63-36-288-7688",
        mapQuery: "보라카이 의료 클리닉 Station 2",
      },
    ],
    reviewNote: {
      ko: "보라카이 **물놀이·비치** 분실·도난 후기. 섬 내 **말레이 경찰서** → 보트 터미널 카티클란 쪽.",
      en: "Beach/water activity losses. **Malay Police** has jurisdiction on island.",
    },
    reviewSource: { ko: "필리핀 여행 블로그", en: "PH travel blogs", url: "https://overseas.mofa.go.kr/ph-cebu-ko" },
  },
};

/** 프리미엄 수동 작성 페이지 — 덮어쓰기 방지 */
export const premiumPages = new Set([
  "ko/japan/fukuoka/lost-passport",
  "en/japan/fukuoka/lost-passport",
  "ko/japan/tokyo/lost-passport",
  "en/japan/tokyo/lost-passport",
  "ko/thailand/bangkok/lost-phone",
  "en/thailand/bangkok/lost-phone",
  "ko/vietnam/danang/hospital",
  "en/vietnam/danang/hospital",
  "ko/taiwan/taipei/police-report",
  "en/taiwan/taipei/police-report",
]);

export function getCityData(country: string, city: string): CityData {
  const key = `${country}/${city}`;
  const data = cityDataRegistry[key];
  if (!data) {
    throw new Error(`Missing city data: ${key}`);
  }
  return data;
}

export function getConsulate(data: CityData): Location {
  return data.consulate ?? data.embassy;
}
