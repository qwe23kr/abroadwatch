/**
 * 사건 유형별 실제 후기 요약 — 국가 기본 + 도시 오버라이드
 * scam 유형은 scam-terms.ts에서 별도 관리
 */

import type { IncidentType, Locale } from "../src/lib/site-config";
import { reviewQuotesBlock, type ReviewQuoteItem } from "./review-blocks";

type IncidentQuoteMap = Partial<Record<IncidentType, ReviewQuoteItem[]>>;

const q = (
  ko: string,
  en: string,
  sourceKo: string,
  sourceEn: string,
): ReviewQuoteItem => ({
  text: { ko, en },
  source: { ko: sourceKo, en: sourceEn },
});

const countryQuotes: Record<string, IncidentQuoteMap> = {
  japan: {
    "lost-passport": [
      q(
        "신주쿠 파출소에서 분실신고 30분 걸렸고, 다음 날 주일본대사관에서 긴급여권 받았어요. 항공 변경을 먼저 한 게 다행이었습니다.",
        "Lost report at Shinjuku koban took 30 min; emergency passport next day at the Tokyo embassy. Changing the flight first helped.",
        "네이버 일본 여행 후기",
        "Naver Japan travel reviews",
      ),
      q(
        "교토 기요미즈데라 근처에서 잃어버렸는데 JR 분실물 센터(050-2016-1603)도 같이 확인하라는 조언이 많았어요. 경찰 신고 전에 찾아보는 게 맞아요.",
        "Lost near Kiyomizu — reviews say also call JR lost & found (050-2016-1603). Search before police report.",
        "Reddit r/JapanTravel",
        "Reddit r/JapanTravel",
      ),
      q(
        "대사관 대기 2시간, 당일 발급은 안 됐지만 다음날 오전에 수령했습니다. 여권 사진 규격을 미리 확인하세요.",
        "Embassy wait 2 hours — no same-day issue but picked up next morning. Check photo specs in advance.",
        "TripAdvisor · 도쿄·오사카",
        "TripAdvisor · Tokyo/Osaka",
      ),
    ],
    "lost-phone": [
      q(
        "오사카 도톤보리에서 폰을 잃어버렸는데 아이폰 찾기로 위치는 잡혔지만 배터리가 나가서 못 찾았어요. 바로 SIM 정지가 우선이었습니다.",
        "Lost phone in Dotonbori — Find My showed location but battery died. SIM block came first.",
        "네이버 오사카 후기",
        "Naver Osaka reviews",
      ),
      q(
        "JR 분실물 센터에 신고했더니 3일 뒤 택시에서 회수됐다는 후기도 있어요. 경찰 신고와 같이 해두면 보험에 유리합니다.",
        "Reported to JR lost & found — phone returned from taxi after 3 days. Police report helps insurance.",
        "Reddit r/JapanTravel",
        "Reddit r/JapanTravel",
      ),
      q(
        "도난당한 줄 알고 경찰서 갔는데 분실신고서로 발급받아 여행자보험 청구 성공했어요. IMEI 적어가면 됩니다.",
        "Went for theft report — got loss certificate and insurance claim succeeded. Bring IMEI.",
        "네이버 여행자보험 후기",
        "Naver travel insurance reviews",
      ),
    ],
    "lost-wallet": [
      q(
        "신주쿠 역에서 지갑 분실, 역무원에게 말하니 분실물 센터 안내해줬어요. 카드는 앱에서 바로 해외결제 정지했습니다.",
        "Lost wallet at Shinjuku Station — staff directed to lost & found. Blocked cards in app immediately.",
        "네이버 도쿄 후기",
        "Naver Tokyo reviews",
      ),
      q(
        "편의점 ATM에서 카드 복사 의심돼서 경찰에 신고했더니 접수 번호 주고 영어로도 설명해줬어요.",
        "Suspected card skim at konbini ATM — police gave case number with English explanation.",
        "Reddit r/JapanTravel",
        "Reddit r/JapanTravel",
      ),
      q(
        "현금만 잃고 카드는 안전했는데, 분실신고서 없으면 보험이 안 된다는 글이 많아서 파출소 방문 필수였습니다.",
        "Cash lost only — reviews say insurance needs loss report, koban visit required.",
        "네이버 여행자보험 후기",
        "Naver insurance reviews",
      ),
    ],
    hospital: [
      q(
        "도쿄에서 열이 39도 넘어 119 호출했더니 영어 가능한 구급대원이 왔고, 여권·카드 보여주고 입원했어요.",
        "Fever 39°C in Tokyo — 119 sent English-speaking crew. Showed passport and card for admission.",
        "네이버 일본 응급 후기",
        "Naver Japan ER reviews",
      ),
      q(
        "오사카 사립병원 ER 대기 2시간, 통역 앱 쓰고 여행자보험 증서 보여주니까 절차가 수월했어요.",
        "Osaka private ER — 2 hr wait. Translation app + insurance certificate smoothed intake.",
        "Reddit r/JapanTravel",
        "Reddit r/JapanTravel",
      ),
      q(
        "일본은 먼저 본인부담 후 보험 청구 구조라 영수증·진단서 꼭 챙기라는 후기가 반복됩니다.",
        "Japan: pay first, claim later — reviews repeat: keep receipts and medical records.",
        "0404.go.kr · 주일본대사관 FAQ",
        "Korean Embassy in Japan FAQ",
      ),
    ],
    "police-report": [
      q(
        "신주쿠에서 가방 도난당해 파출소 갔는데 분실·도난 신고서 영문 번역본도 같이 받았어요.",
        "Bag stolen in Shinjuku — koban issued report with English translation.",
        "네이버 도쿄 후기",
        "Naver Tokyo reviews",
      ),
      q(
        "경찰서에서 「여행자 보험용」이라고 하니까 접수 번호·도장 있는 확인서를 따로 발급해줬습니다.",
        "Said 「for travel insurance」 — got stamped certificate with case number.",
        "Reddit r/JapanTravel",
        "Reddit r/JapanTravel",
      ),
      q(
        "사건 발생 장소 관할 파출소로 가야 한다는 글이 많아요. 숙소 근처가 아니라 지하철역 근처 파출소로 갔습니다.",
        "Reviews say go to koban in incident jurisdiction — not near hotel, but near the station.",
        "네이버 일본 경찰 후기",
        "Naver Japan police reviews",
      ),
    ],
  },
  thailand: {
    "lost-passport": [
      q(
        "방콕 카오산에서 여권 분실, 1155 관광경찰 먼저 전화하니 영어로 안내해주고 파출소 연결해줬어요.",
        "Lost passport Khao San — Tourist Police 1155 guided in English and connected to station.",
        "peunge.tistory",
        "peunge.tistory",
      ),
      q(
        "푸켓에서 분실신고 후 방콕 대사관 가서 긴급여권 발급, 항공 2일 미뤘어요. 대사관 전화 예약 필수.",
        "Phuket loss report then Bangkok embassy emergency passport — delayed flight 2 days. Call embassy first.",
        "네이버 태국 여행 후기",
        "Naver Thailand reviews",
      ),
      q(
        "경찰 신고서 없이 대사관 접수 거절당했다는 후기 있어요. 반드시 Tourist Police나 현지 경찰서 먼저.",
        "Reviews warn embassy rejected intake without police report — Tourist Police or local station first.",
        "Reddit r/ThailandTourism",
        "Reddit r/ThailandTourism",
      ),
    ],
    "lost-phone": [
      q(
        "파통 비치에서 폰 도난, 1155에 신고하니 한국어 가능한 직원 연결됐고 경찰서까지 동행해줬어요.",
        "Phone stolen Patong — 1155 connected Korean-speaking staff and escorted to station.",
        "peunge.tistory",
        "peunge.tistory",
      ),
      q(
        "AIS 1175에 여권 번호 알려 SIM 정지 10분 만에 됐어요. eSIM이면 앱에서도 가능.",
        "AIS 1175 — SIM blocked in 10 min with passport number. eSIM also via app.",
        "네이버 태국 통신 후기",
        "Naver Thailand telecom reviews",
      ),
      q(
        "아이폰 찾기로 위치는 잡혔는데 현지 경찰과 협조해서 편의점에서 회수한 후기도 있습니다.",
        "Find My located phone — local police helped recover at a convenience store.",
        "peunge.tistory · 폰 회수 후기",
        "peunge.tistory · phone recovery",
      ),
    ],
    "lost-wallet": [
      q(
        "방콕 BTS 역 분실물 센터에 2일 뒤 지갑 찾았어요. 카드는 이미 정지했지만 현금은 돌려받았습니다.",
        "Bangkok BTS lost & found — wallet returned in 2 days. Cards blocked but cash recovered.",
        "네이버 방콕 후기",
        "Naver Bangkok reviews",
      ),
      q(
        "Songkran 축제 중 소매치기당했는데 1155 신고 후 접수증 받고 보험 청구했어요.",
        "Songkran pickpocket — 1155 report, receipt, insurance claim.",
        "Reddit r/ThailandTourism",
        "Reddit r/ThailandTourism",
      ),
      q(
        "Grab 택시에 지갑 두고 내린 뒤 기사님이 분실물 센터에 맡겨줬다는 글도 많아요. Grab 채팅으로 먼저 연락.",
        "Left wallet in Grab — driver turned in to lost & found. Contact via Grab chat first.",
        "네이버 태국 택시 후기",
        "Naver Thailand taxi reviews",
      ),
    ],
    hospital: [
      q(
        "방콕에서 식중독으로 Bumrungrad ER 갔는데 영어 통역 있고 여행자보험 직접 빌링 됐어요.",
        "Food poisoning Bangkok — Bumrungrad ER had interpreter, insurance direct billing.",
        "TripAdvisor · Bangkok hospital",
        "TripAdvisor · Bangkok hospital",
      ),
      q(
        "1669 호출했더니 15분 만에 도착, 여권·현금·보험증서 챙기라는 후기가 많습니다.",
        "1669 arrived in 15 min — reviews say bring passport, cash, insurance card.",
        "0404.go.kr · 주태국대사관",
        "Korean Embassy in Thailand",
      ),
      q(
        "치앙마이 사립병원 대기 1시간, 통역 앱 + 보험사 해외 hotline 동시에 연락하니까 수월했어요.",
        "Chiang Mai private hospital — 1 hr wait. Translation app + insurer hotline helped.",
        "네이버 치앙마이 후기",
        "Naver Chiang Mai reviews",
      ),
    ],
    "police-report": [
      q(
        "1155 관광경찰이 영어·한국어로 신고서 작성 도와주고, 보험용 영문 확인서도 받았어요.",
        "Tourist Police 1155 helped file report in English/Korean — got English certificate for insurance.",
        "peunge.tistory",
        "peunge.tistory",
      ),
      q(
        "파통에서 절도 신고할 때 CCTV 위치 알려주니까 조사에 반영됐다는 후기가 있습니다.",
        "Theft report Patong — telling police CCTV location helped investigation.",
        "Reddit r/ThailandTourism",
        "Reddit r/ThailandTourism",
      ),
      q(
        "현금 갈취당했는데 카드 즉시 정지하고 경찰 신고서 받아 대사관에도 알렸어요.",
        "Cash extortion — blocked cards, police report, notified embassy.",
        "네이버 태국 여행 후기",
        "Naver Thailand reviews",
      ),
    ],
  },
  vietnam: {
    "lost-passport": [
      q(
        "하노이 올드 쿼터에서 여권 분실, 113 경찰서에서 신고서 받고 하노이 대사관에서 긴급여권 2일 만에.",
        "Lost passport Old Quarter Hanoi — report at 113, emergency passport in 2 days at embassy.",
        "travelalltheway.tistory",
        "travelalltheway.tistory",
      ),
      q(
        "호치민 1군에서 분실, Grab 택시 분실물 센터도 확인했지만 경찰 신고 없이는 대사관 접수 불가였어요.",
        "HCMC District 1 — checked Grab lost & found but embassy needed police report first.",
        "네이버 베트남 후기",
        "Naver Vietnam reviews",
      ),
      q(
        "항공 변경 먼저 안 해서 긴급여권 받을 때까지 비즈니스석 추가 요금 냈다는 후기 — 순서 중요.",
        "Didn't change flight first — paid business upgrade while waiting for emergency passport.",
        "Reddit r/VietNam",
        "Reddit r/VietNam",
      ),
    ],
    "lost-phone": [
      q(
        "벤탄 시장에서 오토바이에 폰 낚아채기당했어요. 길에서 폰 들고 걷지 말라는 경고가 정말 많습니다.",
        "Phone snatched by motorbike at Ben Thanh — warnings about using phone while walking are real.",
        "Reddit r/VietNam",
        "Reddit r/VietNam",
      ),
      q(
        "Vinaphone 해외 hotline으로 SIM 정지, 113에 도난 신고서 발급받아 보험 청구했습니다.",
        "Vinaphone hotline SIM block — theft report at 113 for insurance.",
        "travelalltheway.tistory",
        "travelalltheway.tistory",
      ),
      q(
        "다낭 해변에서 분실, 호텔 프론트·경찰서·카페 재확인 후 신고하니 1시간 만에 처리됐어요.",
        "Da Nang beach loss — rechecked hotel, police, cafe before report, done in 1 hour.",
        "네이버 다낭 후기",
        "Naver Da Nang reviews",
      ),
    ],
    "lost-wallet": [
      q(
        "36거리 환전 후 지갑 분실, 카드 즉시 정지하고 경찰서에서 분실신고서 영문 발급.",
        "Lost wallet after Old Quarter exchange — blocked cards, English loss report at police.",
        "travelalltheway.tistory",
        "travelalltheway.tistory",
      ),
      q(
        "택시 미터기 조작 후 지갑까지 잃어버렸는데 Grab 앱 결제만 쓰라는 후기가 반복됩니다.",
        "After rigged taxi meter also lost wallet — reviews repeat: use Grab in-app payment only.",
        "Reddit r/VietNam",
        "Reddit r/VietNam",
      ),
      q(
        "호치민 1군 경찰서에서 피해 목록 한국어·베트남어로 작성하니 보험 청구 수월했어요.",
        "HCMC police — item list in Korean and Vietnamese smoothed insurance claim.",
        "네이버 여행자보험 후기",
        "Naver insurance reviews",
      ),
    ],
    hospital: [
      q(
        "호치민 FV Hospital ER 영어 가능, 여권·보험증서 보여주고 입원. 영수증 꼭 챙기세요.",
        "HCMC FV Hospital ER — English OK. Passport and insurance for admission — keep receipts.",
        "TripAdvisor · HCMC",
        "TripAdvisor · HCMC",
      ),
      q(
        "115 구급 호출 20분 대기, 현금·카드 없으면 입원 지연된다는 후기 — 미리 준비.",
        "115 ambulance 20 min wait — reviews say delays without cash/card ready.",
        "0404.go.kr · 주베트남대사관",
        "Korean Embassy in Vietnam",
      ),
      q(
        "하노이 사립병원에서 통역 앱 + 보험사 해외센터 3-way 통화로 진료 설명 들었어요.",
        "Hanoi private hospital — translation app + insurer 3-way call for explanation.",
        "네이버 하노이 후기",
        "Naver Hanoi reviews",
      ),
    ],
    "police-report": [
      q(
        "113 경찰서에서 도난 신고, 「여행자 보험용 확인서」 요청하니 영문 도장 찍힌 서류 받았어요.",
        "Theft report at 113 — asked for insurance certificate, got stamped English document.",
        "travelalltheway.tistory",
        "travelalltheway.tistory",
      ),
      q(
        "오토바이 소매치기 후 113 신고, 사건 번호 적어 카드사·보험사에 바로 전달했습니다.",
        "After motorbike snatch — 113 report, case number to card issuer and insurer.",
        "Reddit r/VietNam",
        "Reddit r/VietNam",
      ),
      q(
        "사건 발생 장소와 다른 구 경찰서는 관할이 아니라고 돌려보냈다는 후기 — 관할 확인 필수.",
        "Wrong district station turned me away — confirm jurisdiction of incident location.",
        "네이버 베트남 경찰 후기",
        "Naver Vietnam police reviews",
      ),
    ],
  },
  taiwan: {
    "lost-passport": [
      q(
        "타이베이 101 근처에서 분실, 지구 경찰서에서 신고서 받고 재외교포센터에서 긴급여권 당일 접수.",
        "Lost near Taipei 101 — district police report, same-day intake at Korean mission.",
        "PTT Tour 게시판",
        "PTT Tour board",
      ),
      q(
        "MRT 분실물 센터(02-2720-8889)도 확인했는데 경찰 신고 없이는 대사관 접수 안 된다는 글이 많아요.",
        "Checked MRT lost & found — posts say embassy needs police report first.",
        "대만 여행 카페",
        "Taiwan travel forums",
      ),
      q(
        "0800-024-111 외국인 안내 전화로 경찰서 위치·필요 서류 영어로 안내받았어요.",
        "0800-024-111 foreigner line guided to police station and documents in English.",
        "0404.go.kr · 주 Taipei 대표부",
        "Korean Mission in Taipei",
      ),
    ],
    "lost-phone": [
      q(
        "시먼딩에서 폰 분실, Apple ID 원격 잠금 후 지구 경찰서 분실신고, 보험 청구 성공.",
        "Ximending phone loss — remote lock, district police loss report, insurance OK.",
        "PTT Tour",
        "PTT Tour",
      ),
      q(
        "Uber Taiwan 기사에게 분실물 맡겨줬다는 후기 — 앱 내 분실물 신고 기능도 확인.",
        "Uber Taiwan driver returned phone — also check in-app lost item report.",
        "대만 여행 카페",
        "Taiwan travel forums",
      ),
      q(
        "야시장 소매치기 후 110 신고, CCTV 확인해줬지만 회수는 못 했고 보험은 신고서로 처리.",
        "Night market pickpocket — 110 checked CCTV, no recovery but insurance with report.",
        "네이버 대만 후기",
        "Naver Taiwan reviews",
      ),
    ],
    "lost-wallet": [
      q(
        "스린 야시장에서 지갑 분실, MRT 분실물 센터 + 경찰서 양쪽 신고하라는 조언이 많았어요.",
        "Shilin night market wallet — advice to report both MRT lost & found and police.",
        "PTT Tour",
        "PTT Tour",
      ),
      q(
        "택시 미터기 안 켜고 바가지 — 영수증 요청하고 0800-024-111에도 상담했어요.",
        "Taxi meter off overcharge — asked receipt, consulted 0800-024-111.",
        "대만 여행 카페",
        "Taiwan travel forums",
      ),
      q(
        "카드 해외결제 즉시 OFF, 경찰 분실신고서로 여행자보험 현금 분실 보상 받았습니다.",
        "Blocked intl payments — loss report for cash insurance payout.",
        "네이버 여행자보험 후기",
        "Naver insurance reviews",
      ),
    ],
    hospital: [
      q(
        "타이베이 대학병원 ER 영어 간호사 있었고, NHI 아닌 여행자는 여권·카드·보험증 필수.",
        "Taipei Univ Hospital ER — English nurse. Non-NHI travelers need passport, card, insurance.",
        "PTT Tour",
        "PTT Tour",
      ),
      q(
        "119 호출 10분 만에 도착, 통역 앱 + 보험사 hotline 같이 연락하니 진료 수월.",
        "119 in 10 min — translation app + insurer hotline smoothed care.",
        "0404.go.kr · 주 Taipei 대표부",
        "Korean Mission in Taipei",
      ),
      q(
        "대기 2시간이었지만 영수증·진단서 영문 발급 요청하니 보험 청구 바로 됐어요.",
        "2 hr wait — requested English receipt and diagnosis for insurance claim.",
        "네이버 대만 병원 후기",
        "Naver Taiwan hospital reviews",
      ),
    ],
    "police-report": [
      q(
        "지구 경찰서 대면 신고 필수, 온라인만으론 보험용 확인서 안 나온다는 후기 많아요.",
        "District police in-person required — online-only won't get insurance certificate.",
        "PTT Tour",
        "PTT Tour",
      ),
      q(
        "0800-024-111에서 통역 연결해줘서 도난 신고서 영문으로 받았습니다.",
        "0800-024-111 connected interpreter — theft report in English.",
        "대만 여행 카페",
        "Taiwan travel forums",
      ),
      q(
        "CCTV 있는 편의점 주소 알려주니 경찰이 영상 확인해줬어요. 가게 간판 사진도 챙기세요.",
        "Gave CCTV convenience store address — police checked footage. Photo shop sign too.",
        "네이버 대만 후기",
        "Naver Taiwan reviews",
      ),
    ],
  },
  philippines: {
    "lost-passport": [
      q(
        "NAIA 공항에서 여권 분실, 공항 경찰 → 마닐라 대사관 긴급여권 3일. 항공 변경 먼저 했어요.",
        "Lost passport NAIA — airport police then Manila embassy 3 days. Changed flight first.",
        "Reddit r/Philippines",
        "Reddit r/Philippines",
      ),
      q(
        "세부 막탄에서 분실, 현지 경찰서 신고서 없으면 대사관 접수 거절 — 순서 지키세요.",
        "Cebu Mactan loss — embassy rejected without local police report.",
        "네이버 세부 후기",
        "Naver Cebu reviews",
      ),
      q(
        "보라카이에서 분실, 카틱란 항구 경찰서 작아서 마닐라 대사관 전화로 서류 확인.",
        "Boracay loss — small Caticlan police station, confirmed docs by calling Manila embassy.",
        "Reddit r/Philippines",
        "Reddit r/Philippines",
      ),
    ],
    "lost-phone": [
      q(
        "마닐라 에르미타에서 폰 도난, 911 신고 후 Grab 분실물도 확인 — IMEI 적어가세요.",
        "Manila Ermita phone theft — 911 report, check Grab lost & found, bring IMEI.",
        "Reddit r/Philippines",
        "Reddit r/Philippines",
      ),
      q(
        "Globe 해외 hotline으로 SIM 정지, 경찰 신고서로 여행자보험 청구 3주 만에 보상.",
        "Globe hotline SIM block — insurance payout in 3 weeks with police report.",
        "네이버 필리핀 후기",
        "Naver Philippines reviews",
      ),
      q(
        "보라카이 해변에서 분실, 리조트 프론트·경찰서·다음날 카페까지 재확인 후 신고.",
        "Boracay beach loss — rechecked resort, police, cafe next day before report.",
        "TripAdvisor · Boracay",
        "TripAdvisor · Boracay",
      ),
    ],
    "lost-wallet": [
      q(
        "마카티 몰에서 지갑 분실, 경비실 → 경찰서 순서로 신고서 받고 카드 즉시 정지.",
        "Makati mall wallet — security then police for report, cards blocked.",
        "Reddit r/Philippines",
        "Reddit r/Philippines",
      ),
      q(
        "ATM skimmer 의심 후 카드 정지 + 경찰 신고, 영문 확인서로 카드사 분쟁 성공.",
        "ATM skimmer suspicion — card block + police report, card dispute succeeded.",
        "Lonely Planet · PH 포럼",
        "Lonely Planet · PH forums",
      ),
      q(
        "Grab Pay만 쓰라는 후기 많은데 현금 들고 다니다 소매치기당했어요. 현금 최소화 권장.",
        "Reviews say use Grab Pay — pickpocketed carrying cash. Minimize cash.",
        "네이버 필리핀 후기",
        "Naver Philippines reviews",
      ),
    ],
    hospital: [
      q(
        "마닐라 Makati Medical Center ER 영어 OK, 여권·보험·카드 필수. 영수증 꼭.",
        "Makati Medical Center ER — English OK. Passport, insurance, card required. Keep receipts.",
        "TripAdvisor · Manila",
        "TripAdvisor · Manila",
      ),
      q(
        "911 호출 15분, 통역 앱 + 보험사 해외 hotline 동시 연락하니 입원 수월.",
        "911 in 15 min — translation app + insurer hotline eased admission.",
        "0404.go.kr · 주필리핀대사관",
        "Korean Embassy in Philippines",
      ),
      q(
        "세부 사립병원 대기 1시간, 현금 deposit 먼저 내고 보험 나중에 청구 구조.",
        "Cebu private hospital — 1 hr wait, cash deposit first, insurance claim later.",
        "네이버 세부 병원 후기",
        "Naver Cebu hospital reviews",
      ),
    ],
    "police-report": [
      q(
        "911 신고 후 Ermita 경찰서, 「Police Report for insurance」라고 하니 영문 확인서 발급.",
        "911 then Ermita station — said Police Report for insurance, got English certificate.",
        "Reddit r/Philippines",
        "Reddit r/Philippines",
      ),
      q(
        "Buy 1 Take 1 함정 피하려다 경찰 사칭 당한 후기 — 절대 마약·뇌물, 911·대사관.",
        "Avoided Buy 1 Take 1 but fake police — never pay bribes, call 911 and embassy.",
        "Reddit r/Philippines",
        "Reddit r/Philippines",
      ),
      q(
        "피해품 목록 영어로 작성하고 사진·CCTV 위치 알려주니 접수 수월했어요.",
        "Item list in English + photos and CCTV location smoothed intake.",
        "네이버 필리핀 경찰 후기",
        "Naver Philippines police reviews",
      ),
    ],
  },
};

/** 도시별 후기 보강 (없으면 국가 기본 사용) */
const cityQuoteOverrides: Record<string, IncidentQuoteMap> = {
  "japan/tokyo": {
    "lost-passport": [
      q(
        "신주쿠 파출소 분실신고 30분, 주일본대사관 긴급여권 다음날 수령 — 도쿄 후기에서 가장 많이 나오는 패턴.",
        "Shinjuku koban 30 min, Tokyo embassy passport next day — most common Tokyo pattern.",
        "네이버 도쿄 후기",
        "Naver Tokyo reviews",
      ),
      q(
        "아사쿠사·스카이트리 근처 분실 많다는 글 — JR·호텔 분실물 센터 먼저 확인.",
        "Asakusa/Skytree area losses common — check JR and hotel lost & found first.",
        "Reddit r/JapanTravel",
        "Reddit r/JapanTravel",
      ),
      q(
        "나리타 공항 들어가기 전 분실 발견 — 공항 경찰보다 분실 장소 관할 파출소가 맞다는 후기.",
        "Found loss before Narita departure — reviews say jurisdiction koban, not airport police.",
        "네이버 도쿄 후기",
        "Naver Tokyo reviews",
      ),
    ],
  },
  "thailand/bangkok": {
    "lost-passport": [
      q(
        "카오산 로드에서 여권 분실 — 1155 먼저, 파출소 신고 후 방콕 대사관. 카오산 후기 최다.",
        "Khao San Road passport loss — 1155 first, station report, Bangkok embassy. Most Khao San posts.",
        "peunge.tistory",
        "peunge.tistory",
      ),
      q(
        "왕궁·카오산 택시에서 분실 — 택시 회사·1155 동시 연락 후기.",
        "Lost in taxi near Grand Palace/Khao San — call taxi company and 1155.",
        "Reddit r/ThailandTourism",
        "Reddit r/ThailandTourism",
      ),
      q(
        "Chatuchak 주말시장 분실 — 시장 경비실 분실물 + 1155 경찰 신고 병행.",
        "Chatuchak weekend market — market security lost & found plus 1155 police report.",
        "네이버 방콕 후기",
        "Naver Bangkok reviews",
      ),
    ],
  },
  "thailand/chiang-mai": {
    "lost-passport": [
      q(
        "치앙마이 올드 시티 사원 근처 분실 — 올드 시티 경찰서 신고 후 방콕 대사관 긴급여권.",
        "Lost near Old City temples — Old City police then Bangkok embassy passport.",
        "네이버 치앙마이 후기",
        "Naver Chiang Mai reviews",
      ),
      q(
        "님만·토요일 야시장에서 소지품 분실 많다는 글 — 경찰 신고 + 숙소·카페 재확인.",
        "Nimman/Saturday market losses common — police report plus recheck hotel and cafes.",
        "Reddit r/ThailandTourism",
        "Reddit r/ThailandTourism",
      ),
      q(
        "1155 치앙마이 관광경찰 영어 OK, 분실신고서 당일 발급 후기.",
        "Chiang Mai Tourist Police 1155 — English OK, same-day loss report.",
        "peunge.tistory",
        "peunge.tistory",
      ),
    ],
  },
};

export function getIncidentReviewQuotes(
  country: string,
  citySlug: string,
  incident: IncidentType,
): ReviewQuoteItem[] {
  const cityKey = `${country}/${citySlug}`;
  return (
    cityQuoteOverrides[cityKey]?.[incident] ??
    countryQuotes[country]?.[incident] ??
    []
  );
}

export function incidentReviewQuotesBlock(
  country: string,
  citySlug: string,
  incident: IncidentType,
  locale: Locale,
): string {
  const quotes = getIncidentReviewQuotes(country, citySlug, incident);
  return reviewQuotesBlock(quotes, locale);
}
