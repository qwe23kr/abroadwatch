/**
 * 국가·도시·사건별 실제 경험담·FAQ — 후기·공관 데이터 기반 동적 생성
 */

import type { IncidentType, Locale } from "../src/lib/site-config";
import { getConsulate, getCityData, type CityData } from "./city-data";
import { getIncidentReviewQuotes } from "./incident-reviews";
import { esc, reviewQuotesBlock, type ReviewQuoteItem } from "./review-blocks";

export interface ExperienceTimelineItem {
  time: { ko: string; en: string };
  action: { ko: string; en: string };
  note?: { ko: string; en: string };
}

export interface GuideFaqItem {
  q: { ko: string; en: string };
  a: { ko: string; en: string };
}

interface CountryContext {
  passportDays: { ko: string; en: string };
  policeLabel: { ko: string; en: string };
  policeHours: { ko: string; en: string };
  lostFound: { ko: string; en: string };
  photoTip: { ko: string; en: string };
  missionHours: { ko: string; en: string };
  medicalEmergency: string;
  touristPolice?: string;
  foreignerHotline?: { ko: string; en: string };
}

const countryContexts: Record<string, CountryContext> = {
  japan: {
    passportDays: { ko: "1~2영업일", en: "1–2 business days" },
    policeLabel: { ko: "경찰 파출소", en: "police koban" },
    policeHours: { ko: "24시간", en: "24/7" },
    lostFound: {
      ko: "JR 분실물 센터(050-2016-1603)·호텔·택시",
      en: "JR lost & found (050-2016-1603), hotel, taxi",
    },
    photoTip: {
      ko: "공관·역 인근 여권사진관 **당일 촬영** — 편의점 인화는 규격 미달 주의",
      en: "**Same-day** passport photo shops near mission/station — konbini prints often fail spec",
    },
    missionHours: { ko: "평일 09:00–16:00", en: "weekdays 09:00–16:00" },
    medicalEmergency: "119",
  },
  thailand: {
    passportDays: { ko: "2~3영업일", en: "2–3 business days" },
    policeLabel: { ko: "관광경찰·현지 경찰서", en: "Tourist Police or local station" },
    policeHours: { ko: "관광경찰 1155 24시간", en: "Tourist Police 1155 24/7" },
    lostFound: {
      ko: "BTS/MRT 분실물·Grab·호텔 프론트",
      en: "BTS/MRT lost & found, Grab, hotel front desk",
    },
    photoTip: {
      ko: "방콕·현지 대사관 인근 여권사진관 — 규격·배경색 공관에 확인",
      en: "Passport photo shops near embassy — confirm size and background with mission",
    },
    missionHours: { ko: "평일 09:00–12:00 접수(공관별 상이)", en: "weekday intake ~09:00–12:00 (varies by mission)" },
    medicalEmergency: "1669",
    touristPolice: "1155",
  },
  vietnam: {
    passportDays: { ko: "2~3영업일", en: "2–3 business days" },
    policeLabel: { ko: "113 경찰서", en: "police station (113)" },
    policeHours: { ko: "24시간(지역별 상이)", en: "24/7 in major cities (varies)" },
    lostFound: {
      ko: "Grab 분실물·호텔·카페·교통기관",
      en: "Grab lost & found, hotel, cafe, transport desk",
    },
    photoTip: {
      ko: "대사관 인근 사진관 — 4×6cm 규격·배경색 확인",
      en: "Photo shops near embassy — confirm 4×6 cm and background color",
    },
    missionHours: { ko: "평일 09:00–16:00(공관별 상이)", en: "weekdays ~09:00–16:00 (varies by mission)" },
    medicalEmergency: "115",
  },
  taiwan: {
    passportDays: { ko: "1~2영업일", en: "1–2 business days" },
    policeLabel: { ko: "110 지구 경찰서", en: "district police (110)" },
    policeHours: { ko: "24시간", en: "24/7" },
    lostFound: {
      ko: "MRT 분실물(02-2720-8889)·Uber·호텔",
      en: "MRT lost & found (02-2720-8889), Uber, hotel",
    },
    photoTip: {
      ko: "대표부 인근 사진관 — 2吋規格(3.5×4.5cm) 확인",
      en: "Photo shops near mission — confirm 2-inch (3.5×4.5 cm) spec",
    },
    missionHours: { ko: "평일 09:00–16:00", en: "weekdays 09:00–16:00" },
    medicalEmergency: "119",
    foreignerHotline: {
      ko: "0800-024-111 외국인 안내",
      en: "0800-024-111 foreigner hotline",
    },
  },
  philippines: {
    passportDays: { ko: "2~4영업일", en: "2–4 business days" },
    policeLabel: { ko: "911·현지 경찰서", en: "911 or local police" },
    policeHours: { ko: "24시간(911)", en: "911 24/7" },
    lostFound: {
      ko: "공항·호텔·택시·Grab 분실물",
      en: "Airport, hotel, taxi, Grab lost & found",
    },
    photoTip: {
      ko: "마닐라 대사관 인근 사진관 — 규격·배경색 전화 확인",
      en: "Photo shops near Manila embassy — confirm specs by phone",
    },
    missionHours: { ko: "평일 09:00–16:00(공관별 상이)", en: "weekdays ~09:00–16:00 (varies by mission)" },
    medicalEmergency: "911",
  },
};

function ctx(country: string): CountryContext {
  return countryContexts[country] ?? countryContexts.japan;
}

/** 사건별 실제 경험담 타임라인 생성 */
function buildExperienceTimeline(
  country: string,
  cityName: { ko: string; en: string },
  incident: IncidentType,
  data: CityData,
): ExperienceTimelineItem[] {
  const c = ctx(country);
  const consulate = getConsulate(data);
  const police = data.police[0]?.name ?? { ko: c.policeLabel.ko, en: c.policeLabel.en };

  switch (incident) {
    case "lost-passport":
      return [
        {
          time: { ko: "분실 직후", en: "Right after loss" },
          action: {
            ko: `${cityName.ko} 분실 장소·${c.lostFound.ko} 재확인`,
            en: `Recheck loss site and ${c.lostFound.en} in ${cityName.en}`,
          },
          note: {
            ko: "공관 신고 전 찾은 후기 다수",
            en: "Many recover items before consulate report",
          },
        },
        {
          time: { ko: "당일", en: "Same day" },
          action: {
            ko: `${police.ko} 분실신고 — 접수 번호·도장 원본`,
            en: `Loss report at ${police.en} — original with case number`,
          },
        },
        {
          time: { ko: "당일 저녁", en: "Same evening" },
          action: {
            ko: "항공사에 귀국편 1~2일 연기",
            en: "Reschedule return flight +1–2 days",
          },
        },
        {
          time: { ko: "다음 영업일", en: "Next business day" },
          action: {
            ko: `${consulate.name.ko} ${consulate.phone} 전화 → 접수`,
            en: `Call ${consulate.name.en} ${consulate.phone} → intake`,
          },
          note: {
            ko: `${c.missionHours.ko} · 대기 1~2시간 후기`,
            en: `${c.missionHours.en} · 1–2 hr wait reported`,
          },
        },
        {
          time: { ko: `접수 후 ${c.passportDays.ko}`, en: `After intake (${c.passportDays.en})` },
          action: {
            ko: "긴급여권 수령 → 공항",
            en: "Pick up emergency passport → airport",
          },
        },
      ];
    case "lost-phone":
      return [
        {
          time: { ko: "즉시", en: "Immediately" },
          action: {
            ko: "기기 원격 잠금·SIM·금융앱 차단",
            en: "Remote lock device, block SIM and banking apps",
          },
          note: { ko: "SIM 정지 지연 = 2차 피해", en: "Delayed SIM block = secondary fraud" },
        },
        {
          time: { ko: "1~2시간", en: "1–2 hours" },
          action: {
            ko: `${c.lostFound.ko}·택시·호텔 확인`,
            en: `Check ${c.lostFound.en}, taxi, hotel`,
          },
        },
        {
          time: { ko: "당일", en: "Same day" },
          action: {
            ko: `${c.policeLabel.ko} 분실·도난 신고 (IMEI·모델 기록)`,
            en: `Report loss/theft at ${c.policeLabel.en} (note IMEI)`,
          },
        },
        {
          time: { ko: "1~3일", en: "1–3 days" },
          action: {
            ko: "여행자보험 청구·대체 기기 준비",
            en: "Insurance claim and backup device",
          },
        },
      ];
    case "lost-wallet":
      return [
        {
          time: { ko: "즉시", en: "Immediately" },
          action: {
            ko: "카드사 앱으로 해외결제·ATM 정지",
            en: "Block intl payments and ATM via bank app",
          },
        },
        {
          time: { ko: "1~2시간", en: "1–2 hours" },
          action: {
            ko: `${c.lostFound.ko}·이동 동선 재확인`,
            en: `Recheck ${c.lostFound.en} and your route`,
          },
        },
        {
          time: { ko: "당일", en: "Same day" },
          action: {
            ko: `${c.policeLabel.ko} 분실신고 — 카드·현금 목록 포함`,
            en: `Loss report at ${c.policeLabel.en} — list cards and cash`,
          },
        },
        {
          time: { ko: "1~3일", en: "1–3 days" },
          action: {
            ko: "보험 청구·비상 현금 확보",
            en: "Insurance claim and emergency cash",
          },
        },
      ];
    case "hospital":
      return [
        {
          time: { ko: "응급 시", en: "Emergency" },
          action: {
            ko: `${c.medicalEmergency} 호출 또는 ER 직접 방문`,
            en: `Call ${c.medicalEmergency} or go to ER`,
          },
        },
        {
          time: { ko: "접수 전", en: "Before intake" },
          action: {
            ko: "여권·보험증서·카드·약 목록 준비",
            en: "Prepare passport, insurance, card, medication list",
          },
        },
        {
          time: { ko: "진료 중", en: "During care" },
          action: {
            ko: "통역 앱·보험사 해외 hotline 연결",
            en: "Translation app + insurer overseas hotline",
          },
        },
        {
          time: { ko: "퇴원 후", en: "After discharge" },
          action: {
            ko: "영수증·진단서 원본 보관 → 보험 청구",
            en: "Keep receipts and records → insurance claim",
          },
          note: {
            ko: "선납 후 청구 구조인 경우 많음",
            en: "Pay-first-then-claim is common",
          },
        },
      ];
    case "police-report":
      return [
        {
          time: { ko: "즉시", en: "Immediately" },
          action: {
            ko: "안전 확보·증거(사진·CCTV 위치) 보존",
            en: "Get safe, preserve evidence (photos, CCTV location)",
          },
        },
        {
          time: { ko: "당일", en: "Same day" },
          action: {
            ko: `사건 발생지 관할 ${c.policeLabel.ko} 방문`,
            en: `Visit ${c.policeLabel.en} in incident jurisdiction`,
          },
          note: {
            ko: "관할 아닌 경찰서는 거절 후기",
            en: "Wrong jurisdiction stations often turn people away",
          },
        },
        {
          time: { ko: "접수 후", en: "After filing" },
          action: {
            ko: "「여행자 보험용」확인서·사건번호·도장 확인",
            en: "Confirm insurance certificate, case number, stamp",
          },
        },
      ];
    case "scam":
      return [
        {
          time: { ko: "발견 즉시", en: "As soon as noticed" },
          action: {
            ko: "추가 결제·현금 지급 중단",
            en: "Stop further payment or cash transfer",
          },
        },
        {
          time: { ko: "30분 이내", en: "Within 30 min" },
          action: {
            ko: "영수증·채팅·차량번호·사진 저장",
            en: "Save receipts, chats, vehicle numbers, photos",
          },
        },
        {
          time: { ko: "당일", en: "Same day" },
          action: {
            ko: `카드사 분쟁 + ${c.policeLabel.ko} 신고`,
            en: `Card dispute + report to ${c.policeLabel.en}`,
          },
        },
        {
          time: { ko: "1~3일", en: "1–3 days" },
          action: {
            ko: "보험·대사관에 피해 경위 전달",
            en: "Notify insurer and mission with details",
          },
        },
      ];
  }
}

/** 사건별 FAQ 생성 */
export function buildGuideFaqs(
  incident: IncidentType,
  locale: Locale,
  country: string,
  cityName: string,
  data: CityData,
): { q: string; a: string }[] {
  const items = buildGuideFaqItems(incident, country, { ko: cityName, en: cityName }, data);
  return items.map((f) => ({ q: f.q[locale], a: f.a[locale] }));
}

function buildGuideFaqItems(
  incident: IncidentType,
  country: string,
  cityName: { ko: string; en: string },
  data: CityData,
): GuideFaqItem[] {
  const c = ctx(country);
  const consulate = getConsulate(data);

  switch (incident) {
    case "lost-passport":
      return [
        {
          q: {
            ko: `${cityName.ko}에서 여권 분실하면 당일 귀국 가능?`,
            en: `Can I fly home the same day I lose my passport in ${cityName.en}?`,
          },
          a: {
            ko: `**거의 불가능**합니다. 긴급여권은 통상 **${c.passportDays.ko}** 걸리고, **${consulate.name.ko}** 접수는 **${c.missionHours.ko}**에만 가능합니다. **항공편 1~2일 연기**를 먼저 잡으세요.`,
            en: `**Almost never.** Emergency passports take **${c.passportDays.en}**; **${consulate.name.en}** intake is **${c.missionHours.en}** only. **Reschedule your flight +1–2 days** first.`,
          },
        },
        {
          q: { ko: "긴급여권 발급시간은?", en: "How long does an emergency passport take?" },
          a: {
            ko: `접수 후 **${c.passportDays.ko}**이 일반적입니다. **${consulate.phone}**로 당일 처리 가능 여부를 반드시 확인하세요.`,
            en: `Usually **${c.passportDays.en}** after intake. Always call **${consulate.phone}** to confirm current processing time.`,
          },
        },
        {
          q: { ko: "사진 없으면?", en: "What if I don't have a passport photo?" },
          a: { ko: c.photoTip.ko, en: c.photoTip.en },
        },
        {
          q: { ko: "주말에도 가능한가?", en: "Can I get help on weekends?" },
          a: {
            ko: `**${c.policeLabel.ko}**는 ${c.policeHours.ko} 신고 가능. **${consulate.name.ko}** 여권 접수는 **${c.missionHours.ko}** — 주말·공휴일 휴무. 주말 분실 시 경찰 신고 → 항공 변경 → **다음 영업일 공관 전화** 순서.`,
            en: `**${c.policeLabel.en}**: ${c.policeHours.en} for reports. **${consulate.name.en}** passport intake: **${c.missionHours.en}** — closed weekends/holidays. Weekend loss: police report → reschedule flight → **call mission next business day**.`,
          },
        },
      ];
    case "lost-phone":
      return [
        {
          q: { ko: "폰 없이 SIM만 정지할 수 있나요?", en: "Can I block the SIM without the phone?" },
          a: {
            ko: `**가능합니다.** 통신사 해외 hotline${c.touristPolice ? `·관광경찰 ${c.touristPolice}` : ""}에 여권 정보로 SIM 정지 요청 — 후기에서 **최우선** 단계.`,
            en: `**Yes.** Call carrier overseas hotline${c.touristPolice ? ` or Tourist Police ${c.touristPolice}` : ""} with passport details — reviews say this is **top priority**.`,
          },
        },
        {
          q: { ko: "경찰 신고 없이 보험 청구?", en: "Insurance without a police report?" },
          a: {
            ko: "**어렵습니다.** 도난·분실 대부분 **경찰 사건번호·신고서 원본** 필요. IMEI·구매 영수증도 함께 준비.",
            en: "**Unlikely.** Theft/loss claims usually need **police case number and original report**, plus IMEI and receipt.",
          },
        },
        {
          q: {
            ko: `${cityName.ko}에서 분실물 찾을 가능성?`,
            en: `Can I recover a lost phone in ${cityName.en}?`,
          },
          a: {
            ko: `**${c.lostFound.ko}**·택시·호텔에 회수 후기 있음. **Find My** 위치 확인 후 경찰과 협조 사례도 — 찾기 전에 SIM 정지.`,
            en: `Recoveries reported via **${c.lostFound.en}**, taxi, hotel. **Find My** + police cooperation cases exist — block SIM first.`,
          },
        },
        {
          q: { ko: "주말에도 경찰 신고?", en: "Police report on weekends?" },
          a: {
            ko: `**${c.policeLabel.ko}** ${c.policeHours.ko} — 주말에도 신고 가능${c.touristPolice ? `(관광경찰 ${c.touristPolice})` : ""}.`,
            en: `**${c.policeLabel.en}** ${c.policeHours.en} — reports possible on weekends${c.touristPolice ? ` (Tourist Police ${c.touristPolice})` : ""}.`,
          },
        },
      ];
    case "lost-wallet":
      return [
        {
          q: { ko: "카드만 정지하면 되나요?", en: "Is blocking cards enough?" },
          a: {
            ko: "**카드 정지 + 경찰 분실신고**가 일반적. 보험 청구·ATM 부정사용 이의제기에 **신고서 원본** 필요 후기 많음.",
            en: "**Block cards + police loss report** is standard. Reviews say **original report** needed for insurance and ATM disputes.",
          },
        },
        {
          q: { ko: "현금만 잃었어요?", en: "Cash only — still need police?" },
          a: {
            ko: "현금 분실 **보험 담보**가 있으면 **경찰 확인서** 필요. 없어도 **2차 피해 방지** 위해 신고 권장.",
            en: "If cash loss is **covered by insurance**, you need a **police certificate**. Report anyway to prevent further loss.",
          },
        },
        {
          q: {
            ko: `${cityName.ko} 분실물 센터는?`,
            en: `Lost & found in ${cityName.en}?`,
          },
          a: {
            ko: `**${c.lostFound.ko}** 확인 후기 — 지갑 회수 사례 1~3일. 카드는 이미 정지해두세요.`,
            en: `Check **${c.lostFound.en}** — wallet returns in 1–3 days reported. Block cards first.`,
          },
        },
      ];
    case "hospital":
      return [
        {
          q: { ko: "영어·한국어 통역 가능?", en: "English or Korean available?" },
          a: {
            ko: `국제·사립병원 ER 후기 — 영어 가능 다수. **통역 앱 + 보험 hotline** 3자 통화가 수월.${c.foreignerHotline ? ` **${c.foreignerHotline.ko}**도 활용.` : ""}`,
            en: `International/private ERs often have English. **Translation app + insurer hotline** helps.${c.foreignerHotline ? ` Try **${c.foreignerHotline.en}**.` : ""}`,
          },
        },
        {
          q: { ko: "보험 직접 청구(直付)?", en: "Direct insurance billing?" },
          a: {
            ko: "**제휴 병원**이면 가능한 경우 많음. 아니면 **선납 후 청구** — 영수증·진단서 원본 필수.",
            en: "**Partner hospitals** may bill insurers directly. Otherwise **pay first, claim later** — keep all originals.",
          },
        },
        {
          q: { ko: "응급번호는?", en: "Emergency number?" },
          a: {
            ko: `**${c.medicalEmergency}** (구급·응급). 생명 위협 시 즉시 호출 — 여권·보험증서 챙기기.`,
            en: `**${c.medicalEmergency}** (ambulance/ER). Call immediately for life-threatening symptoms — bring passport and insurance.`,
          },
        },
      ];
    case "police-report":
      return [
        {
          q: { ko: "언어가 통하지 않아요", en: "Language barrier?" },
          a: {
            ko: c.foreignerHotline
              ? `**${c.foreignerHotline.ko}**·통역 앱·호텔 직원 동행. 「여행자 보험용」이라고 말하면 확인서 발급 후기.`
              : `**통역 앱**·호텔 직원 동행.${c.touristPolice ? ` **관광경찰 ${c.touristPolice}** 영어 지원.` : ""} Say **for travel insurance** for certificate.`,
            en: c.foreignerHotline
              ? `**${c.foreignerHotline.en}**, translation app, hotel staff.${c.touristPolice ? ` **Tourist Police ${c.touristPolice}** for English.` : ""} Say **for travel insurance**.`
              : `**Translation app**, hotel staff.${c.touristPolice ? ` **Tourist Police ${c.touristPolice}**.` : ""} Say **for travel insurance**.`,
          },
        },
        {
          q: { ko: "어느 경찰서로 가야 하나요?", en: "Which police station?" },
          a: {
            ko: "**사건 발생 장소 관할** 경찰서 — 숙소 근처가 아닌 **사건지 관할** 후기 반복.",
            en: "**Jurisdiction of the incident location** — not necessarily near your hotel.",
          },
        },
        {
          q: { ko: "당일 확인서 발급?", en: "Same-day certificate?" },
          a: {
            ko: "대면 접수 시 **당일** 사건번호·도장 확인서 받는 후기 많음. **온라인만**으로는 보험용 불가 사례(대만 등).",
            en: "In-person filing often gets **same-day** case number and stamp. Online-only often **not accepted** for insurance (e.g. Taiwan).",
          },
        },
      ];
    case "scam":
      return [
        {
          q: { ko: "현장에서 돈 더 주면 해결?", en: "Pay more on the spot to resolve?" },
          a: {
            ko: "**추가 지급 금지.** 후기 — 현장 논쟁보다 **안전한 곳 이동 → 증거 저장 → 카드사·경찰** 순서.",
            en: "**Do not pay more.** Reviews: move to safety, save evidence, then **card issuer and police**.",
          },
        },
        {
          q: {
            ko: `${cityName.ko}에서 흔한 사기?`,
            en: `Common scams in ${cityName.en}?`,
          },
          a: {
            ko: "바 호객·택시 미터기·환전·ATM·투어 추가요금·가짜 경찰 패턴 — 가이드 본문 **사기 유형** 참고.",
            en: "Bar touts, rigged taxis, exchange/ATM traps, tour upsells, fake police — see scam types in this guide.",
          },
        },
        {
          q: { ko: "돈 돌려받을 수 있나요?", en: "Can I get money back?" },
          a: {
            ko: "**카드 분쟁·보험**으로 일부 회수 후기. 현금은 어렵지만 **신고서·영수증** 있으면 가능성 ↑.",
            en: "**Card disputes and insurance** sometimes recover funds. Cash is harder but **reports and receipts** help.",
          },
        },
      ];
  }
}

/** 도시·사건별 보강 데이터 (동적 생성) */
export function getGuideExtra(
  country: string,
  citySlug: string,
  incident: IncidentType,
  cityName?: { ko: string; en: string },
): { reviews: ReviewQuoteItem[]; experienceTimeline: ExperienceTimelineItem[]; faqs: GuideFaqItem[] } | undefined {
  try {
    const data = getCityData(country, citySlug);
    const names = cityName ?? {
      ko: citySlug,
      en: citySlug.replace(/-/g, " "),
    };

    return {
      reviews: getIncidentReviewQuotes(country, citySlug, incident),
      experienceTimeline: buildExperienceTimeline(country, names, incident, data),
      faqs: buildGuideFaqItems(incident, country, names, data),
    };
  } catch {
    return undefined;
  }
}

/** 실제 후기 요약 MDX */
export function guideReviewQuotesBlock(
  country: string,
  citySlug: string,
  incident: IncidentType,
  locale: Locale,
  cityName?: { ko: string; en: string },
): string {
  const quotes = getGuideExtra(country, citySlug, incident, cityName)?.reviews;
  if (!quotes?.length) return "";
  return reviewQuotesBlock(quotes, locale);
}

/** 실제 경험담 타임라인 MDX */
export function experienceTimelineBlock(
  country: string,
  citySlug: string,
  incident: IncidentType,
  locale: Locale,
  cityName?: { ko: string; en: string },
): string {
  const items = getGuideExtra(country, citySlug, incident, cityName)?.experienceTimeline;
  if (!items?.length) return "";

  const title =
    locale === "ko" ? "실제 여행자 경험 패턴" : "Typical traveler experience pattern";
  const rows = items
    .map((item) => {
      const noteAttr = item.note ? ` note="${esc(item.note[locale])}"` : "";
      return `<RealTimelineStep time="${esc(item.time[locale])}" action="${esc(item.action[locale])}"${noteAttr} />`;
    })
    .join("\n");

  return `## ${locale === "ko" ? "실제 경험담" : "Real experiences"}

<RealTimeline title="${esc(title)}">
${rows}
</RealTimeline>`;
}

/** FAQ MDX 블록 */
export function guideFaqBlock(
  country: string,
  citySlug: string,
  incident: IncidentType,
  locale: Locale,
  cityName?: { ko: string; en: string },
): string {
  const faqs = getGuideExtra(country, citySlug, incident, cityName)?.faqs;
  if (!faqs?.length) return "";

  return faqs
    .map(
      (f) =>
        `<FaqItem question="${esc(f.q[locale])}">\n  ${f.a[locale]}\n</FaqItem>`,
    )
    .join("\n\n");
}

/** 후기 + 경험담 통합 섹션 */
export function buildExperienceSection(
  country: string,
  citySlug: string,
  incident: IncidentType,
  locale: Locale,
  cityName?: { ko: string; en: string },
): string {
  const quotes = guideReviewQuotesBlock(country, citySlug, incident, locale, cityName);
  const timeline = experienceTimelineBlock(country, citySlug, incident, locale, cityName);
  return [quotes, timeline].filter(Boolean).join("\n\n");
}
