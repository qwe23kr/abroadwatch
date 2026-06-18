/**
 * 190개 MDX 가이드 페이지 일괄 생성 — TimelineStep / ActionStep (문자열 props)
 * 실행: npm run generate:content
 */
import fs from "fs";
import path from "path";
import {
  countries,
  incidentTypes,
  siteConfig,
  type IncidentType,
  type Locale,
} from "../src/lib/site-config";
import {
  cityDataRegistry,
  getCityData,
  getConsulate,
  type CityData,
  type Location,
} from "./city-data";
import {
  FIND_MY_KO,
  THEFT_VS_LOST_KO,
  insuranceReportRequest,
  kobanAction,
  kobanActionDetail,
  policeReportName,
  policeSectionHeader,
} from "./ko-terms";
import { localPhraseBlock } from "./local-phrases";

const CONTENT_DIR = path.join(process.cwd(), "content");

interface TimelineItem {
  time: string;
  action: string;
  note?: string;
}

interface ActionItem {
  title: string;
  detail: string;
  urgent?: boolean;
}

interface InfoItem {
  label: string;
  value: string;
}

function esc(str: string): string {
  return str.replace(/"/g, '\\"').replace(/\n/g, " ");
}

function locCard(loc: Location, locale: Locale): string {
  const l = locale;
  return `<ContactCard
  name="${esc(loc.name[l])}"
  address="${loc.address ? esc(loc.address[l]) : ""}"
  phone="${loc.phone ?? ""}"
  hours="${loc.hours ? esc(loc.hours[l]) : ""}"
  website="${loc.website ?? ""}"
  note="${loc.note ? esc(loc.note[l]) : ""}"
/>

<GoogleMap query="${esc(loc.mapQuery)}" title="${esc(loc.name[l])}" />`;
}

function sourceBlock(data: CityData, locale: Locale): string {
  const mission = getConsulate(data);
  const officialUrl = mission.website ?? data.embassy.website;
  const src = {
    ko: `${mission.name.ko} 공식 안내`,
    en: `${mission.name.en} official information`,
    url: officialUrl ?? "https://www.0404.go.kr/",
  };
  const note = locale === "ko"
    ? "현지 기관과 대한민국 공관의 공식 연락처를 기준으로 정리했습니다. 방문 전 전화로 운영 여부를 다시 확인하세요."
    : "Compiled from local authorities and the Korean mission. Call ahead to reconfirm hours and procedures.";
  const label =
    locale === "ko" ? "📌 출처 및 확인 안내" : "📌 Sources and verification";
  return `<ReviewNote label="${label}" source="${esc(src[locale])}" url="${src.url}">
  ${note}
</ReviewNote>`;
}

const medicalEmergencyNumbers: Record<
  string,
  { number: string; label: { ko: string; en: string } }
> = {
  japan: { number: "119", label: { ko: "일본 구급·소방 119", en: "Japan ambulance & fire 119" } },
  thailand: { number: "1669", label: { ko: "태국 응급의료 1669", en: "Thailand medical emergency 1669" } },
  vietnam: { number: "115", label: { ko: "베트남 구급 115", en: "Vietnam ambulance 115" } },
  taiwan: { number: "119", label: { ko: "대만 구급·소방 119", en: "Taiwan ambulance & fire 119" } },
  philippines: { number: "911", label: { ko: "필리핀 긴급 911", en: "Philippines emergency 911" } },
};

function getMedicalEmergency(data: CityData) {
  return medicalEmergencyNumbers[data.country];
}

function renderTimeline(title: string, items: TimelineItem[]): string {
  const steps = items
    .map((item) => {
      const noteAttr = item.note?.trim()
        ? ` note="${esc(item.note)}"`
        : "";
      return `<TimelineStep time="${esc(item.time)}" action="${esc(item.action)}"${noteAttr} />`;
    })
    .join("\n");
  return `<TimelineGroup title="${esc(title)}">
${steps}
</TimelineGroup>`;
}

function renderActions(items: ActionItem[]): string {
  const steps = items
    .map((item, i) => {
      const urgentAttr = item.urgent ? ` urgent="true"` : "";
      return `<ActionStep n="${i + 1}" title="${esc(item.title)}" detail="${esc(item.detail)}"${urgentAttr} />`;
    })
    .join("\n");
  return `<ActionGroup>
${steps}
</ActionGroup>`;
}

function renderInfoRows(items: InfoItem[]): string {
  const rows = items
    .map(
      (item) =>
        `<InfoRow label="${esc(item.label)}" value="${esc(item.value)}" />`,
    )
    .join("\n");
  return `<InfoRows>
${rows}
</InfoRows>`;
}

function generateLostPassport(
  locale: Locale,
  country: string,
  cityName: string,
  countryName: string,
  data: CityData,
): string {
  const consulate = getConsulate(data);
  const police = data.police[0];
  const isJapan = country === "japan";

  if (locale === "ko") {
    const reportName = policeReportName(country);
    const timeline: TimelineItem[] = [
      {
        time: "0~2시간",
        action: `${cityName} 분실 장소·숙소·카페·택시 재확인`,
        note: "영사관 신고 전 반드시! 신고 후 여권 즉시 무효화·국제 공유",
      },
      {
        time: "30분~1시간",
        action: kobanAction(police.name.ko, police.phone),
        note: "접수 번호·도장 확인 · 출국 시 입국 심사에서 제시 가능",
      },
      {
        time: "당일 오전",
        action: `항공사에 귀국 1~2일 연기 요청 (대한항공·저가항공 앱/고객센터)`,
        note: "공관 접수 전에 항공 변경 — 긴급여권 1~2일 소요",
      },
      {
        time: "당일",
        action: `${consulate.name.ko} ☎ ${consulate.phone} 전화 후 방문 접수`,
        note: isJapan ? "대기 인원·당일 발급 가능 여부 · 접수 마감시간 확인" : "운영시간·필요 서류·수수료를 전화로 확인",
      },
      {
        time: "1~2영업일",
        action: "긴급여권 수령 → 지정 시간 재방문",
        note: isJapan ? "공관과 신청 시점에 따라 소요시간이 달라질 수 있음" : "공관 안내에 따라 수령",
      },
      {
        time: "귀국 후",
        action: "한국에서 정식 여권 재발급 (긴급여권 반납)",
        note: "긴급여권 임의 폐기 금지",
      },
    ];

    const actions: ActionItem[] = [
      {
        title: "분실 장소·숙소·교통 분실물 센터 전화",
        detail: isJapan
          ? `${cityName}에서 잃어버린 곳, 호텔 프론트, JR 분실물 센터(050-2016-1603), 택시 회사에 즉시 연락`
          : `${cityName}에서 잃어버린 곳, 호텔 프론트, 현지 교통기관 분실물 센터, 택시 회사에 즉시 연락`,
        urgent: true,
      },
      {
        title: isJapan ? "경찰 파출소·경찰서에서 분실 신고" : "경찰서에서 분실 신고",
        detail: isJapan
          ? kobanActionDetail(police.name.ko, police.phone)
          : `${police.name.ko}${police.phone ? ` (${police.phone})` : ""} — ${reportName} 원본 발급 요청`,
      },
      {
        title: "항공권 날짜 변경",
        detail: "귀국편 1~2일 미루기. 영사관 접수 전 변경하면 재예약 비용·좌석 확보 유리",
      },
      {
        title: "한국 공관에 전화",
        detail: `${consulate.phone} — 서류·수수료·대기시간·당일 발급 가능 여부 확인 후 방문`,
      },
      {
        title: "서류 준비 후 공관 접수",
        detail: `${reportName}, 여권용 사진 1매, 신분증, 항공권 사본, 여권 사본(클라우드)`,
      },
      {
        title: "접수증 시간에 재방문 → 긴급여권 수령",
        detail: "수령 후 숙박·항공 일정 확정. 귀국 후 6개월 내 정식 여권 재발급",
      },
    ];

    return buildPage({
      locale: "ko",
      title: `${cityName} 여권 분실 — 실제 절차·소요시간·비용 (2026)`,
      summary: `${countryName} ${cityName} 여권 분실 시 ${police.name.ko} → ${consulate.name.ko} 긴급여권까지 단계별 가이드.`,
      cost: isJapan ? "약 6,500~6,890엔" : "공관 문의",
      time: isJapan ? "1~2영업일" : "1~3영업일",
      emergency: data.emergency,
      review: sourceBlock(data, "ko"),
      timelineTitle: `${cityName} 여권 분실 대응 타임라인`,
      timeline,
      actions,
      warning: {
        title: "⚠️ 순서를 지키세요",
        body: "① 찾기 → ② 경찰 → ③ 항공 변경 → ④ 공관 전화 → ⑤ 접수. 공관 신고를 먼저 하면 나중에 찾은 여권도 사용 불가.",
      },
      afterActions: localPhraseBlock("ko", country, "lost-passport"),
      info: [
        { label: "경찰 분실신고 확인서", value: `${reportName} 원본 — 필수` },
        { label: "여권용 사진", value: "6개월 이내 1매 · 규격은 공관에 확인" },
        { label: "신분증", value: "운전면허·주민등록증 또는 사본" },
        { label: "항공권", value: "변경된 귀국편 예약" },
        { label: "수수료", value: isJapan ? "6,500~6,890엔 현금" : "공관 확인" },
      ],
      costTable: [
        ["경찰 신고", "무료"],
        ["긴급여권", isJapan ? "6,500~6,890엔" : "공관 문의"],
        ["항공·숙박 연장", "별도"],
      ],
      locations: [consulate, ...data.police],
      locationHeaders: ["공관·영사관", ...data.police.map(() => policeSectionHeader(country))],
      faqs: [
        {
          q: `${cityName}에서 가장 가까운 한국 공관?`,
          a: `**${consulate.name.ko}** · ${consulate.phone} · 방문 전 전화 필수`,
        },
        {
          q: "몇 일 걸리나요?",
          a: isJapan ? "통상 **1~2영업일**이지만 공관에 현재 처리시간을 확인하세요." : "통상 **1~3영업일**이며 공관과 신청 시점에 따라 달라집니다.",
        },
      ],
    });
  }

  const timeline: TimelineItem[] = [
    {
      time: "0–2 hours",
      action: `Recheck loss site, hotel, cafe, taxi in ${cityName}`,
      note: "Search BEFORE consulate report — report voids passport permanently",
    },
    {
      time: "30–60 min",
      action: `${police.name.en} — Loss Report certificate`,
      note: "Keep original with acceptance number",
    },
    {
      time: "Same morning",
      action: "Reschedule return flight +1–2 days",
      note: "Before consulate visit",
    },
    {
      time: "Same day 9–16",
      action: `Call ${consulate.phone} → visit ${consulate.name.en}`,
      note: isJapan ? "Confirm intake cutoff and required documents" : "Confirm opening hours, documents, and fee by phone",
    },
    {
      time: "1–2 business days",
      action: "Pick up emergency passport at scheduled time",
      note: "Processing time varies by mission and application time",
    },
    {
      time: "After return",
      action: "Apply for full passport in Korea",
      note: "Do not discard emergency passport",
    },
  ];

  const actions: ActionItem[] = [
    {
      title: "Recheck everywhere",
      detail: `Hotel, transport lost-and-found, taxi company in ${cityName}`,
      urgent: true,
    },
    {
      title: "Police loss report",
      detail: isJapan
        ? `${police.name.en} — show the phrase below or ask for a Loss Report (ishitsutodoke). Keep the original with stamp and reference number.`
        : `${police.name.en} — request Loss Report certificate`,
    },
    {
      title: "Reschedule flight",
      detail: "Delay return 1–2 days before consulate intake",
    },
    {
      title: "Call Korean mission",
      detail: `${consulate.phone} — confirm documents and wait time`,
    },
    {
      title: "Consulate intake",
      detail: "Police report, photo, ID, flight copy, passport copy",
    },
    {
      title: "Pick up emergency passport",
      detail: "Return at time on receipt",
    },
  ];

  return buildPage({
    locale: "en",
    title: `Lost Passport in ${cityName} — Step-by-Step Guide (2026)`,
    summary: `Police report at ${police.name.en}, emergency passport at ${consulate.name.en} — ${cityName}, ${countryName}.`,
    cost: isJapan ? "~¥6,500–6,890" : "Contact mission",
    time: isJapan ? "1–2 business days" : "1–3 business days",
    emergency: data.emergency,
    review: sourceBlock(data, "en"),
    timelineTitle: `Lost passport timeline — ${cityName}`,
    timeline,
    actions,
    warning: {
      title: "⚠️ Follow this order",
      body: "Search → Police → Reschedule flight → Call mission → Apply. Consulate report voids recovered passport.",
    },
    info: [
      { label: "Police report", value: "Original loss report required" },
      { label: "Passport photo", value: "1 photo, within 6 months" },
      { label: "Photo ID", value: "License or copy" },
      { label: "Flight ticket", value: "Updated return booking" },
      { label: "Fee", value: isJapan ? "¥6,500–6,890 cash" : "Ask mission" },
    ],
    costTable: [
      ["Police report", "Free"],
      ["Emergency passport", isJapan ? "¥6,500–6,890" : "Ask mission"],
      ["Flight/hotel delay", "Extra"],
    ],
    locations: [consulate, ...data.police],
    locationHeaders: ["Mission", ...data.police.map(() => "Police")],
    afterActions: localPhraseBlock("en", country, "lost-passport"),
    faqs: [
      {
        q: `Nearest Korean mission from ${cityName}?`,
        a: `**${consulate.name.en}** — ${consulate.phone}`,
      },
      {
        q: "How long?",
        a: isJapan ? "Usually **1–2 business days**; confirm current processing time with the mission." : "Usually **1–3 business days**, depending on the mission and application time.",
      },
    ],
  });
}

function generateLostPhone(
  locale: Locale,
  cityName: string,
  countryName: string,
  data: CityData,
): string {
  const police = data.police[0];
  const isThailand = data.country === "thailand";
  const emergency = isThailand ? "1155" : data.emergency.number;

  if (locale === "ko") {
    const reportName = policeReportName(data.country);
    const timeline: TimelineItem[] = [
      {
        time: "5분 이내",
        action: `${FIND_MY_KO} — 위치 확인·원격 잠금·소리 재생`,
        note: "아직 켜져 있으면 위치 추적 가능",
      },
      {
        time: "30분 이내",
        action: "SIM 정지 + 은행·카카오·Google·Apple ID 비밀번호 변경",
        note: "도난 후 24시간이 2차 피해 방지 골든타임",
      },
      {
        time: "1~3시간",
        action: `${isThailand ? "1155 관광경찰 → " : ""}${police.name.ko} — ${reportName} 발급`,
        note: insuranceReportRequest(data.country) + " · " + THEFT_VS_LOST_KO,
      },
      {
        time: "당일~익일",
        action: "임시폰 구입 또는 렌탈 가능 여부 확인",
        note: isThailand ? "현지 판매점·통신사에서 가격 확인" : "숙소 또는 현지 통신사에 문의",
      },
      {
        time: "2~4주",
        action: "여행자보험 휴대품 손해 청구",
        note: "사건 번호·IMEI·구매영수증·경찰 확인서",
      },
    ];

    const actions: ActionItem[] = [
      {
        title: "아이폰 찾기 / 구글 기기 찾기에서 잠금",
        detail: "icloud.com/find 또는 android.com/find — 원격 잠금 + 메시지 표시",
        urgent: true,
      },
      {
        title: "SIM·eSIM 즉시 정지",
        detail: isThailand
          ? "AIS 1175 / True 1242 / DTAC 1678 — 여권 지참"
          : "통신사 해외 고객센터·로밍 정지",
      },
      {
        title: "카드·계정 비밀번호 전면 변경",
        detail: "은행 앱 해외결제 OFF, 카카오·이메일·Apple ID 2FA 재설정",
      },
      {
        title: "경찰서 방문 — 신고 확인서 발급",
        detail: `${police.name.ko} · 이름·여권번호·기종·IMEI(설정→정보)·구매가·이메일 적어가기 · ${reportName} 요청`,
      },
      {
        title: "보험사에 사건 번호 전달",
        detail: "경찰 확인서 사본·IMEI·영수증 제출 → 2~4주 보상",
      },
    ];

    return buildPage({
      locale: "ko",
      title: `${cityName} 휴대폰 분실·도난 — 실제 대처 절차 (2026)`,
      summary: `${countryName} ${cityName} 휴대폰 분실 시 기기 찾기, SIM 정지, 경찰 신고, 보험 청구까지.`,
      cost: "경찰 신고 0원",
      time: "경찰 1~3시간 · 보험 2~4주",
      emergency: { number: emergency, label: { ko: isThailand ? "관광경찰 1155" : data.emergency.label.ko, en: "" } },
      review: sourceBlock(data, "ko"),
      timelineTitle: `${cityName} 휴대폰 분실 타임라인`,
      timeline,
      actions,
      warning: { title: "보험 핵심", body: THEFT_VS_LOST_KO },
      info: [
        { label: "신원", value: "이름·생년월일·여권번호" },
        { label: "기기", value: "모델명·IMEI·색상" },
        { label: "사건", value: "일시·장소·경위" },
        { label: "금액", value: "구매가격(보험 한도)" },
      ],
      costTable: [["경찰 신고 확인서", "무료"], ["임시폰", "판매점·통신사 확인"], ["보험 보상", "가입 한도 내"]],
      locations: [...data.police, data.embassy],
      locationHeaders: [...data.police.map(() => "경찰"), "대사관"],
      afterActions: localPhraseBlock("ko", data.country, "lost-phone"),
      faqs: [{ q: "경찰 확인서 없이 보험 청구?", a: "**불가** — " + insuranceReportRequest(data.country) }],
    });
  }

  // English lost phone - similar structure
  const timeline: TimelineItem[] = [
    { time: "Within 5 min", action: "Find My — locate, lock, play sound", note: "Act while device is online" },
    { time: "Within 30 min", action: "Block SIM + change all passwords", note: "24hr golden window" },
    { time: "1–3 hours", action: `${police.name.en} — Police Report`, note: "Request Stolen not Lost" },
    { time: "2–4 weeks", action: "Insurance claim", note: "Case number + IMEI + receipt" },
  ];
  const actions: ActionItem[] = [
    { title: "Remote lock via Find My", detail: "icloud.com/find or google.com/android/find", urgent: true },
    { title: "Block SIM", detail: isThailand ? "AIS 1175 / True 1242 / DTAC 1678" : "Call carrier hotline", },
    { title: "Change passwords", detail: "Bank, email, messaging, Apple/Google ID", },
    { title: "Police report", detail: `${police.name.en} — use the phrase below if needed; bring passport, IMEI, purchase price`, },
    { title: "Insurance claim", detail: "Submit report copy + IMEI + receipt", },
  ];

  return buildPage({
    locale: "en",
    title: `Lost Phone in ${cityName} — What To Do (2026)`,
    summary: `Find My, SIM block, police report, insurance — ${cityName}, ${countryName}.`,
    cost: "Police report free",
    time: "Police 1–3 hrs · insurance 2–4 weeks",
    emergency: { number: emergency, label: { ko: "", en: isThailand ? "Tourist Police 1155" : data.emergency.label.en } },
    review: sourceBlock(data, "en"),
    timelineTitle: `Lost phone timeline — ${cityName}`,
    timeline, actions,
    warning: { title: "Insurance", body: "Request **Stolen** not **Lost** on police report." },
    info: [
      { label: "Identity", value: "Name, DOB, passport #" },
      { label: "Device", value: "Model, IMEI, color" },
      { label: "Incident", value: "Time, place, details" },
    ],
    costTable: [["Police report", "Free"], ["Temp phone", "Check local retailer/carrier"]],
    locations: [...data.police, data.embassy],
    locationHeaders: [...data.police.map(() => "Police"), "Embassy"],
    afterActions: localPhraseBlock("en", data.country, "lost-phone"),
    faqs: [{ q: "Insurance without report?", a: "Unlikely — explicitly request Police Report for insurance." }],
  });
}

function generateLostWallet(
  locale: Locale,
  cityName: string,
  countryName: string,
  data: CityData,
): string {
  const police = data.police[0];
  const consulate = getConsulate(data);

  if (locale === "ko") {
    const reportName = policeReportName(data.country);
    const timeline: TimelineItem[] = [
      { time: "즉시", action: "모든 카드 해외결제 차단 (앱·고객센터)", note: "24시간 내 2차 도용 방지" },
      { time: "30분", action: "분실 카드·계좌 일시정지 + Apple Pay/Google Pay 해제", note: "" },
      { time: "1~2시간", action: `${police.name.ko} — ${reportName}`, note: "현금·카드 목록·추정 금액 작성" },
      { time: "당일", action: "여권이 지갑에 있었는지 확인 → 있으면 여권 가이드 병행", note: "" },
      { time: "2~4주", action: "여행자보험 청구 (현금·카드재발급비)", note: "" },
    ];
    const actions: ActionItem[] = [
      { title: "카드사 앱 → 해외결제 OFF", detail: "신한·삼성·KB·하나 등 앱에서 즉시 분실신고·일시정지", urgent: true },
      { title: "은행 해외 고객센터", detail: "카드 뒷면 ☎ 번호 — 24시간 영어/한국어", },
      { title: "경찰서 신고 확인서", detail: `${police.name.ko} · 도난은 「도난」, 분실은 「분실」 (보험 조건 확인)`, },
      { title: "분실물 목록 작성", detail: "카드사·현금 금액·신분증·교통카드 — 한국어·현지어", },
      { title: "임시 현금 확보", detail: "일행·호텔 금고·해외송금(TransferWise 등)", },
    ];
    return buildPage({
      locale: "ko", title: `${cityName} 지갑 분실 — 카드 정지·경찰 신고 (2026)`,
      summary: `${countryName} ${cityName} 지갑·카드 분실 시 즉시 조치.`,
      cost: "경찰 0원", time: "카드 정지 즉시 · 경찰 1~2시간",
      emergency: data.emergency,
      review: sourceBlock(data, "ko"),
      timelineTitle: `${cityName} 지갑 분실 타임라인`, timeline, actions,
      warning: { title: "골든타임", body: "카드 정지는 **분실 발견 즉시**. 24시간 내 결제 도용 다수." },
      info: [{ label: "경찰 신고 확인서", value: "보험 청구 시 필수" }, { label: "카드사", value: "분실신고 접수번호" }],
      costTable: [["경찰", "0원"], ["현금 분실", "본인 부담(보험 담보 확인)"]],
      locations: [...data.police, consulate], locationHeaders: [...data.police.map(() => "경찰"), "공관"],
      afterActions: localPhraseBlock("ko", data.country, "lost-wallet"),
      faqs: [{ q: "현금만 잃었어요?", a: "보험 **현금 분실** 담보 있으면 경찰 확인서 필요. 없으면 카드 정지만으로 2차 피해 방지." }],
    });
  }

  const timeline: TimelineItem[] = [
    { time: "Immediately", action: "Block all cards — international transactions OFF", note: "24hr golden window" },
    { time: "1–2 hours", action: `${police.name.en} — police report`, note: "List cards and cash amount" },
    { time: "2–4 weeks", action: "Insurance claim if covered", note: "" },
  ];
  const actions: ActionItem[] = [
    { title: "Block cards via app", detail: "Turn off international payments immediately", urgent: true },
    { title: "Call bank hotline", detail: "Number on back of card — 24/7", },
    { title: "Police report", detail: `${police.name.en} — Stolen vs Lost for insurance`, },
    { title: "List lost items", detail: "Cards, cash amount, IDs", },
    { title: "Emergency cash", detail: "Travel companion, hotel, wire transfer", },
  ];
  return buildPage({
    locale: "en", title: `Lost Wallet in ${cityName} — Card Block Guide (2026)`,
    summary: `Block cards, police report — ${cityName}, ${countryName}.`,
    cost: "Police free", time: "Card block immediate",
    emergency: data.emergency,
    review: sourceBlock(data, "en"),
    timelineTitle: `Lost wallet timeline`, timeline, actions,
    warning: { title: "Golden window", body: "Block cards **immediately** upon discovery." },
    info: [{ label: "Police report", value: "Required for insurance" }],
    costTable: [["Police", "Free"]],
    locations: [...data.police, consulate], locationHeaders: [...data.police.map(() => "Police"), "Mission"],
    afterActions: localPhraseBlock("en", data.country, "lost-wallet"),
    faqs: [{ q: "Cash only?", a: "Insurance may require report if cash loss is covered." }],
  });
}

function generateHospital(
  locale: Locale,
  cityName: string,
  countryName: string,
  data: CityData,
): string {
  const hospitals = data.hospitals ?? [];
  const isVietnam = data.country === "vietnam";
  const h1 = hospitals[0];
  const medicalEmergency = getMedicalEmergency(data);

  if (locale === "ko") {
    const timeline: TimelineItem[] = [
      { time: "증상 발생", action: `생명 위험(의식·호흡·대출혈) → ${medicalEmergency.number} 즉시`, note: isVietnam ? "구급차 비용은 출동 기관에 확인" : "" },
      { time: "10분", action: "여행자보험 24시간 콜센터 — 병원 직접 청구 가능 여부 확인", note: "미연락 시 전액 선납" },
      { time: "30분~1시간", action: `${h1 ? h1.name.ko : "가까운 ER"} 이동 · 여권+보험증+카드`, note: "택시 또는 현지 교통수단" },
      { time: "접수~대기", action: "국제과/응급실 접수 — 증상 명확히 (번역 앱)", note: "대기 30분~2시간 · 중증 우선" },
      { time: "진료 후", action: "영수증·진단서(영문) 보관 → 보험 청구", note: "매 단계 선납(베트남)" },
    ];
    const actions: ActionItem[] = [
      { title: "증상 심각도 판단", detail: `경미: 약국/외래 · 중증: 응급실 · 생명위험: ${medicalEmergency.number}`, urgent: true },
      { title: "보험 콜센터 전화", detail: "카드 뒷면 24시간 번호 — 직접 청구 가능 병원·한국어 통역", },
      { title: "병원 이동", detail: `${h1 ? h1.name.ko + (h1.phone ? ` ${h1.phone}` : "") : cityName + " 응급실"} · 여권 필수`, },
      { title: "접수 시 말하기", detail: "「영어/한국어 통역 부탁합니다」· 증상·알레르기·복용약", },
      { title: "영수증·진단서 수령", detail: "모든 검사·약·처치 영수증 원본 — 보험사 제출용", },
    ];
    return buildPage({
      locale: "ko", title: `${cityName} 병원·응급실 — 비용·절차 (2026)`,
      summary: `${countryName} ${cityName} ER 이용, 보험, 한국어 통역.`,
      cost: isVietnam ? "1차 12.5만~110만 VND" : "병원별 문의",
      time: "대기 30분~2시간",
      emergency: medicalEmergency,
      review: sourceBlock(data, "ko"),
      timelineTitle: `${cityName} 병원 이용 타임라인`, timeline, actions,
      warning: { title: "선납", body: isVietnam ? "베트남은 **진료·검사·약 모두 선납**. 현금+카드 준비." : "신용카드·여권 지참." },
      info: [
        { label: "여권", value: "등록 필수" },
        { label: "보험증", value: "병원 직접 청구 가능 여부 확인" },
        { label: "카드", value: "Visa/Master 대부분 가능" },
      ],
      costTable: isVietnam
        ? [["패밀리병원 1차", "40만 VND"], ["빈멕 예약/무예약", "69만/110만"], ["종합병원", "12.5만 VND"]]
        : [["ER 방문", "병원별 견적"]],
      locations: hospitals.length > 0 ? hospitals : [data.embassy],
      locationHeaders: (hospitals.length > 0 ? hospitals : [data.embassy]).map(() => "병원"),
      faqs: [{ q: "병원 직접 청구?", a: "방문 **전** 보험 콜센터 연락 — 미연락 시 전액 선납 후 사후 청구." }],
    });
  }

  const timeline: TimelineItem[] = [
    { time: "Onset", action: `Life-threatening → call ${medicalEmergency.number}`, note: "" },
    { time: "10 min", action: "Insurance hotline — direct billing hospitals", note: "" },
    { time: "30–60 min", action: `Go to ${h1?.name.en ?? "nearest ER"} with passport`, note: "" },
    { time: "After visit", action: "Keep receipts and English diagnosis", note: "" },
  ];
  const actions: ActionItem[] = [
    { title: "Assess severity", detail: `Mild: clinic/pharmacy · Severe: ER · Emergency: call ${medicalEmergency.number}`, urgent: true },
    { title: "Call insurance", detail: "24hr hotline on insurance card", },
    { title: "Go to hospital", detail: h1 ? `${h1.name.en} ${h1.phone ?? ""}` : `Search ER near ${cityName}`, },
    { title: "Request interpreter", detail: "Ask for English/Korean support at registration", },
    { title: "Keep all receipts", detail: "For insurance claim", },
  ];
  return buildPage({
    locale: "en", title: `Hospital & ER in ${cityName} (2026)`,
    summary: `Emergency care, costs, insurance — ${cityName}, ${countryName}.`,
    cost: isVietnam ? "125k–1.1M VND first visit" : "Get quote",
    time: "Wait 30min–2hrs",
    emergency: medicalEmergency,
    review: sourceBlock(data, "en"),
    timelineTitle: `Hospital timeline — ${cityName}`, timeline, actions,
    warning: { title: "Prepay", body: isVietnam ? "All care prepaid in Vietnam." : "Bring passport and card." },
    info: [{ label: "Passport", value: "Required" }, { label: "Insurance", value: "Direct billing check" }],
    costTable: [["ER visit", "Varies by hospital"]],
    locations: hospitals.length > 0 ? hospitals : [data.embassy],
    locationHeaders: (hospitals.length > 0 ? hospitals : [data.embassy]).map(() => "Hospitals"),
    faqs: [{ q: "Direct billing?", a: "Call insurer before visit." }],
  });
}

function generatePoliceReport(
  locale: Locale,
  cityName: string,
  countryName: string,
  data: CityData,
): string {
  const police = data.police[0];
  const consulate = getConsulate(data);
  const isTaiwan = data.country === "taiwan";

  if (locale === "ko") {
    const reportName = policeReportName(data.country);
    const timeline: TimelineItem[] = [
      { time: "사건 직후", action: `안전한 곳으로 이동 · 인신위험 시 ${data.emergency.number}`, note: "" },
      { time: "30분", action: "카드·계정 즉시 정지", note: "2차 피해 방지" },
      { time: "1~2시간", action: `${police.name.ko} 방문 (사건 발생지 관할)`, note: isTaiwan ? "온라인만으론 불완전 — 대면 신고 권장" : "" },
      { time: "1~2시간", action: `진술·접수 — 번역 앱${isTaiwan ? "·0800-024-111" : ""}`, note: "피해 목록·증거 사진" },
      { time: "당일", action: `${reportName} 수령`, note: "보험·카드사 제출" },
    ];
    const actions: ActionItem[] = [
      { title: "안전 확보", detail: `강도·위협 → ${data.emergency.number} · 도난만 → 가까운 경찰서`, urgent: true },
      { title: "카드·계정 정지", detail: "해외결제 OFF · 이메일·SNS 비밀번호 변경", },
      { title: "관할 경찰서 방문", detail: `${police.name.ko} — 사건 **발생 장소** 기준 (숙소 X)`, },
      { title: "신고 확인서 명시적 요청", detail: insuranceReportRequest(data.country) + " · 사건 번호·도장 확인", },
      { title: "증거·목록 준비", detail: "여권·피해품 목록(한국어·현지어)·CCTV 위치·영수증", },
    ];
    return buildPage({
      locale: "ko", title: `${cityName} 경찰 신고 — 외국인 절차 (2026)`,
      summary: `${countryName} ${cityName} 도난·분실 경찰 신고, ${reportName}, 보험.`,
      cost: "무료", time: "1~3시간",
      emergency: data.emergency,
      review: sourceBlock(data, "ko"),
      timelineTitle: `${cityName} 경찰 신고 타임라인`, timeline, actions,
      warning: { title: "보험용 서류", body: insuranceReportRequest(data.country) + "라고 처음부터 요청하지 않으면 일반 접수로 끝날 수 있습니다." },
      info: [
        { label: "신분", value: "여권 원본+사본" },
        { label: "피해 목록", value: "품목·금액·한국어·현지어" },
        { label: "증거", value: "사진·메시지·CCTV 위치" },
      ],
      costTable: [["경찰 신고", "0원"]],
      locations: [...data.police, consulate], locationHeaders: [...data.police.map(() => "경찰"), "공관"],
      afterActions: localPhraseBlock("ko", data.country, "police-report"),
      faqs: [{ q: "언어가 통하지 않아요", a: isTaiwan ? "경찰 **번역 앱** · 외국인 안내 0800-024-111" : data.country === "thailand" ? "관광경찰 1155 · 호텔 직원 동행" : "번역 앱을 사용하고 호텔 직원에게 통역 도움을 요청하세요." }],
    });
  }

  const timeline: TimelineItem[] = [
    { time: "After incident", action: `Move to safety · call ${data.emergency.number} if threatened`, note: "" },
    { time: "30 min", action: "Block cards and accounts", note: "" },
    { time: "1–2 hours", action: `Visit ${police.name.en} — incident jurisdiction`, note: isTaiwan ? "In-person required" : "" },
    { time: "Same day", action: "Acceptance certificate / Police Report", note: "For insurance" },
  ];
  const actions: ActionItem[] = [
    { title: "Ensure safety", detail: "Call emergency if threatened", urgent: true },
    { title: "Block cards", detail: "International transactions OFF", },
    { title: "Visit police station", detail: `${police.name.en} — where incident occurred`, },
    { title: "Request Police Report", detail: "Use the phrase below or say: for travel insurance · verify case number and stamp", },
    { title: "Prepare evidence", detail: "Passport, item list, photos, receipts", },
  ];
  return buildPage({
    locale: "en", title: `Police Report in ${cityName} — Foreigner Guide (2026)`,
    summary: `Theft/loss report, insurance certificate — ${cityName}, ${countryName}.`,
    cost: "Free", time: "1–3 hours",
    emergency: data.emergency,
    review: sourceBlock(data, "en"),
    timelineTitle: `Police report timeline`, timeline, actions,
    warning: { title: "For insurance", body: "Say **Police Report for insurance** at the start." },
    info: [{ label: "Passport", value: "Original + copy" }, { label: "Item list", value: "English/local language" }],
    costTable: [["Police report", "Free"]],
    locations: [...data.police, consulate], locationHeaders: [...data.police.map(() => "Police"), "Mission"],
    afterActions: localPhraseBlock("en", data.country, "police-report"),
    faqs: [{ q: "Language barrier?", a: isTaiwan ? "Translation apps · foreigner assistance 0800-024-111" : data.country === "thailand" ? "Tourist Police 1155 or hotel staff" : "Use a translation app and ask hotel staff for interpretation help." }],
  });
}

interface PageBuildOpts {
  locale: Locale;
  title: string;
  summary: string;
  cost: string;
  time: string;
  emergency: { number: string; label: { ko: string; en: string } };
  review: string;
  timelineTitle: string;
  timeline: TimelineItem[];
  actions: ActionItem[];
  warning: { title: string; body: string };
  info: InfoItem[];
  costTable: string[][];
  locations: Location[];
  locationHeaders: string[];
  faqs: { q: string; a: string }[];
  afterActions?: string;
}

function buildPage(opts: PageBuildOpts): string {
  const L = opts.locale;
  const hTimeline = L === "ko" ? "대응 타임라인" : "Response Timeline";
  const hActions = L === "ko" ? "지금 당장 이렇게 하세요" : "Do This Right Now";
  const hDocs = L === "ko" ? "필요 서류·정보" : "Required Documents";
  const hCost = L === "ko" ? "실제 비용" : "Costs";
  const hFaq = L === "ko" ? "자주 묻는 질문" : "FAQ";
  const emLabel = opts.emergency.label[L];

  const costHeader =
    L === "ko" ? "| 항목 | 비용 |" : "| Item | Cost |";
  const costSep = "|------|------|";

  const costRows = opts.costTable
    .map(([k, v]) => `| ${k} | **${v}** |`)
    .join("\n");

  const locSections = opts.locations
    .map((loc, i) => {
      const header = opts.locationHeaders[i] ?? opts.locationHeaders[0] ?? "";
      return `## ${header}\n\n${locCard(loc, L)}`;
    })
    .join("\n\n");

  const faqs = opts.faqs
    .map((f) => `<FaqItem question="${esc(f.q)}">\n  ${f.a}\n</FaqItem>`)
    .join("\n\n");

  return `---
title: "${esc(opts.title)}"
summary: "${esc(opts.summary)}"
publishedAt: "2026-06-18"
updatedAt: "2026-06-18"
estimatedCost: "${esc(opts.cost)}"
estimatedTime: "${esc(opts.time)}"
emergencyNumber: "${opts.emergency.number}"
---

<EmergencyBanner number="${opts.emergency.number}" label="${esc(emLabel)}" />

${opts.review}

## ${hTimeline}

${renderTimeline(opts.timelineTitle, opts.timeline)}

## ${hActions}

<Callout variant="warning" title="${esc(opts.warning.title)}">
  ${opts.warning.body}
</Callout>

${renderActions(opts.actions)}

${opts.afterActions ?? ""}

## ${hDocs}

${renderInfoRows(opts.info)}

## ${hCost}

${costHeader}
${costSep}
${costRows}

${locSections}

## ${hFaq}

${faqs}
`;
}

function generateContent(
  locale: Locale,
  country: string,
  citySlug: string,
  incident: IncidentType,
): string {
  const countryConfig = countries.find((c) => c.slug === country)!;
  const cityConfig = countryConfig.cities.find((c) => c.slug === citySlug)!;
  const data = getCityData(country, citySlug);
  const cityName = cityConfig.name[locale];
  const countryName = countryConfig.name[locale];

  switch (incident) {
    case "lost-passport":
      return generateLostPassport(locale, country, cityName, countryName, data);
    case "lost-phone":
      return generateLostPhone(locale, cityName, countryName, data);
    case "lost-wallet":
      return generateLostWallet(locale, cityName, countryName, data);
    case "hospital":
      return generateHospital(locale, cityName, countryName, data);
    case "police-report":
      return generatePoliceReport(locale, cityName, countryName, data);
  }
}

function main() {
  let created = 0;

  for (const locale of siteConfig.locales) {
    for (const country of countries) {
      for (const city of country.cities) {
        const key = `${country.slug}/${city.slug}`;
        if (!cityDataRegistry[key]) continue;

        for (const incident of incidentTypes) {
          const dir = path.join(CONTENT_DIR, locale, country.slug, city.slug);
          const filePath = path.join(dir, `${incident}.mdx`);

          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

          fs.writeFileSync(
            filePath,
            generateContent(locale, country.slug, city.slug, incident),
            "utf-8",
          );
          created++;
        }
      }
    }
  }

  console.log(`✅ Regenerated ${created} pages (all 190)`);
}

main();
