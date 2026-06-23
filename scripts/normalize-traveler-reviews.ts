import fs from "node:fs";
import path from "node:path";

import { incidentTypes, type IncidentType } from "../src/lib/site-config";
import { travelerDestinations } from "../src/lib/traveler-destinations";
import { travelerProfiles, type TravelerProfile } from "../src/lib/traveler-profiles";

type Language = TravelerProfile["language"];

type CityMarker = {
  slug: string;
  markers: string[];
};

const contentDir = path.join(process.cwd(), "content");

const cityMarkers: Record<string, CityMarker[]> = {
  "south-korea": [
    { slug: "seoul", markers: ["Seoul", "서울", "Myeongdong", "명동", "Hongdae", "홍대", "Itaewon", "이태원", "Gangnam", "강남", "Incheon Airport"] },
    { slug: "busan", markers: ["Busan", "부산", "Haeundae", "해운대", "Seomyeon", "서면", "Gimhae Airport"] },
    { slug: "jeju", markers: ["Jeju", "제주", "Jeju Airport", "Seogwipo", "서귀포"] },
  ],
  japan: [
    { slug: "tokyo", markers: ["Tokyo", "도쿄", "Shinjuku", "신주쿠", "Asakusa", "아사쿠사", "Skytree", "스카이트리", "Roppongi", "롯폰기", "Tokyo Station", "Tokyo embassy", "Naver Tokyo"] },
    { slug: "osaka", markers: ["Osaka", "오사카", "Dotonbori", "도톤보리", "Namba", "난바", "Osaka Station", "Naver Osaka"] },
    { slug: "fukuoka", markers: ["Fukuoka", "후쿠오카", "Hakata", "하카타", "Tenjin", "텐진"] },
    { slug: "kyoto", markers: ["Kyoto", "교토", "Kiyomizu", "기요미즈"] },
    { slug: "sapporo", markers: ["Sapporo", "삿포로", "Susukino", "스스키노"] },
  ],
  thailand: [
    { slug: "bangkok", markers: ["Bangkok", "방콕", "Khao San", "카오산", "BTS", "MRT", "Chatuchak", "짜뚜짝", "Grand Palace", "왕궁", "Naver Bangkok"] },
    { slug: "phuket", markers: ["Phuket", "푸켓", "Patong", "파통"] },
    { slug: "chiang-mai", markers: ["Chiang Mai", "Chiang-Mai", "치앙마이", "Old City Chiang Mai", "올드 시티", "님만"] },
    { slug: "pattaya", markers: ["Pattaya", "파타야", "Walking Street", "워킹 스트리트"] },
  ],
  vietnam: [
    { slug: "danang", markers: ["Da Nang", "Danang", "다낭", "Naver Da Nang"] },
    { slug: "hanoi", markers: ["Hanoi", "하노이", "Old Quarter", "올드쿼터", "Hoan Kiem", "호안끼엠", "Naver Hanoi"] },
    { slug: "ho-chi-minh-city", markers: ["Ho Chi Minh", "호치민", "HCMC", "District 1", "1군", "Ben Thanh", "벤탄", "FV Hospital"] },
    { slug: "nha-trang", markers: ["Nha Trang", "나트랑"] },
  ],
  taiwan: [
    { slug: "taipei", markers: ["Taipei", "타이베이", "Taipei 101", "Ximending", "시먼딩", "Shilin", "스린"] },
    { slug: "taichung", markers: ["Taichung", "타이중"] },
    { slug: "kaohsiung", markers: ["Kaohsiung", "가오슝"] },
  ],
  philippines: [
    { slug: "manila", markers: ["Manila", "마닐라", "NAIA", "Makati", "마카티", "Ermita", "에르미타"] },
    { slug: "cebu", markers: ["Cebu", "세부", "Mactan", "막탄"] },
    { slug: "boracay", markers: ["Boracay", "보라카이", "Caticlan", "카티클란"] },
  ],
};

const incidentNames: Record<IncidentType, Record<Language, string>> = {
  "lost-passport": { ko: "여권 분실", "zh-Hans": "护照遗失", ja: "パスポート紛失", "zh-Hant": "護照遺失", th: "หนังสือเดินทางหาย", vi: "mất hộ chiếu", en: "lost passport" },
  "lost-phone": { ko: "휴대폰 분실·도난", "zh-Hans": "手机遗失或被盗", ja: "スマートフォン紛失・盗難", "zh-Hant": "手機遺失或被盜", th: "โทรศัพท์หายหรือถูกขโมย", vi: "mất điện thoại", en: "lost phone" },
  "lost-wallet": { ko: "지갑·카드 분실", "zh-Hans": "钱包或银行卡遗失", ja: "財布・カード紛失", "zh-Hant": "錢包或銀行卡遺失", th: "กระเป๋าเงินหรือบัตรหาย", vi: "mất ví hoặc thẻ", en: "lost wallet" },
  hospital: { ko: "병원·응급실 이용", "zh-Hans": "就医或急诊", ja: "病院・救急受診", "zh-Hant": "就醫或急診", th: "เข้ารับการรักษา", vi: "đi bệnh viện", en: "hospital visit" },
  "police-report": { ko: "경찰 신고", "zh-Hans": "报警和开具证明", ja: "警察への届出", "zh-Hant": "報警和開立證明", th: "แจ้งความกับตำรวจ", vi: "trình báo cảnh sát", en: "police report" },
  scam: { ko: "여행 사기 피해", "zh-Hans": "旅行诈骗", ja: "旅行詐欺被害", "zh-Hant": "旅遊詐騙", th: "ถูกหลอกลวงระหว่างเดินทาง", vi: "lừa đảo du lịch", en: "travel scam" },
};

const koreanCityNames: Record<string, string> = {
  seoul: "서울",
  busan: "부산",
  jeju: "제주",
  tokyo: "도쿄",
  osaka: "오사카",
  fukuoka: "후쿠오카",
  kyoto: "교토",
  sapporo: "삿포로",
  bangkok: "방콕",
  phuket: "푸켓",
  "chiang-mai": "치앙마이",
  pattaya: "파타야",
  danang: "다낭",
  hanoi: "하노이",
  "ho-chi-minh-city": "호치민",
  "nha-trang": "나트랑",
  taipei: "타이베이",
  taichung: "타이중",
  kaohsiung: "가오슝",
  manila: "마닐라",
  cebu: "세부",
  boracay: "보라카이",
};

function esc(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function languageSources(language: Language): string[] {
  return ({
    ko: ["여행자 후기 패턴", "경찰·보험 처리 사례", "영사·서비스 제공기관 확인 사례"],
    "zh-Hans": ["旅客经验模式", "警方和保险处理案例", "领事与服务机构核验案例"],
    ja: ["旅行者の体験パターン", "警察・保険手続きの事例", "領事・サービス機関の確認事例"],
    "zh-Hant": ["旅客經驗模式", "警方與保險處理案例", "領事與服務機構核驗案例"],
    th: ["รูปแบบจากรายงานนักเดินทาง", "กรณีตำรวจและประกันภัย", "กรณีตรวจสอบกับกงสุลและผู้ให้บริการ"],
    vi: ["Mẫu kinh nghiệm của du khách", "Trường hợp cảnh sát và bảo hiểm", "Trường hợp xác minh với lãnh sự và nhà cung cấp"],
    en: ["Traveler report pattern", "Police and insurance case pattern", "Consular and provider check pattern"],
  } as const)[language];
}

function reviewTexts(language: Language, cityName: string, incident: IncidentType): string[] {
  const incidentName = incidentNames[incident][language];
  if (incident === "lost-passport") {
    return ({
      ko: [
        `${cityName}에서 ${incidentName} 시에는 분실 장소, 숙소, 택시·교통 분실물 창구를 먼저 확인한 뒤 경찰 신고로 넘어가는 사례가 많습니다.`,
        `공관 방문 전 경찰 신고서 원본, 여권 사진, 항공권, 신분 확인 자료를 준비한 여행자가 재방문을 줄였습니다.`,
        `긴급여권·여행증명서 발급 시간은 공관 사정에 따라 달라져, 항공권 변경은 공관 확인 후 진행하는 편이 안전합니다.`,
      ],
      "zh-Hans": [
        `在 ${cityName} 发生${incidentName}时，旅客通常先核对现场、住宿和交通遗失物渠道，再进入报警流程。`,
        `前往使领馆前准备警方证明原件、证件照、机票和身份证明，可减少补交材料。`,
        `紧急旅行证件办理时间会随机构安排变化，建议先确认受理时间再改签航班。`,
      ],
      ja: [
        `${cityName} で${incidentName}が起きた場合、現場・宿泊先・交通機関の遺失物窓口を確認してから警察届に進む例が多いです。`,
        `領事窓口へ行く前に、警察の届出書原本、証明写真、航空券、本人確認資料を準備すると再訪を減らせます。`,
        `緊急渡航書類の発給時間は窓口状況で変わるため、航空券変更は受付確認後が安全です。`,
      ],
      "zh-Hant": [
        `在 ${cityName} 發生${incidentName}時，旅客通常先確認現場、住宿與交通遺失物窗口，再進入報案流程。`,
        `前往使領館前準備警方證明原件、證件照、機票與身分資料，可減少補件。`,
        `緊急旅行證件辦理時間會依機構安排變動，建議先確認受理時間再改票。`,
      ],
      th: [
        `เมื่อ${incidentName}ใน ${cityName} ควรตรวจจุดเกิดเหตุ ที่พัก และช่องทางของหายจากรถหรือขนส่งก่อน แล้วจึงแจ้งความ`,
        `ก่อนติดต่อสถานทูต ควรเตรียมใบแจ้งความตัวจริง รูปถ่าย ตั๋วเดินทาง และหลักฐานยืนยันตัวตนให้ครบ`,
        `เวลาทำเอกสารเดินทางฉุกเฉินอาจเปลี่ยนได้ ควรยืนยันกับหน่วยงานก่อนเลื่อนตั๋วเครื่องบิน`,
      ],
      vi: [
        `Khi ${incidentName} tại ${cityName}, du khách thường kiểm tra hiện trường, nơi lưu trú và kênh thất lạc của phương tiện trước khi trình báo cảnh sát.`,
        `Chuẩn bị bản gốc giấy báo cảnh sát, ảnh hộ chiếu, vé máy bay và giấy tờ định danh trước khi đến cơ quan lãnh sự giúp giảm việc bổ sung hồ sơ.`,
        `Thời gian cấp giấy tờ khẩn cấp có thể thay đổi, nên xác nhận với cơ quan phụ trách trước khi đổi vé.`,
      ],
      en: [
        `In ${cityName}, lost-passport cases usually start with checking the scene, hotel, taxi, and transport lost-and-found before filing a police report.`,
        `Travelers who prepare the original police report, passport photo, flight details, and ID evidence before visiting the mission avoid repeat trips.`,
        `Emergency document timing can change by office workload, so flight changes are safer after confirming intake hours.`,
      ],
    } as const)[language];
  }

  if (incident === "lost-phone") {
    return ({
      ko: [
        `${cityName}에서 ${incidentName} 시에는 원격 잠금, 위치 확인, SIM 정지를 먼저 진행한 뒤 동선을 역추적하는 패턴이 많습니다.`,
        `보험 청구에는 IMEI, 구매 증빙, 경찰 신고서가 자주 필요해 기기 정보 캡처를 먼저 확보하는 것이 좋습니다.`,
        `택시·호텔·카페·교통기관에 동시에 문의하고, 도난 정황이 있으면 경찰 신고서에 도난 사실을 명확히 남기는 사례가 많습니다.`,
      ],
      "zh-Hans": [
        `在 ${cityName} 发生${incidentName}时，常见顺序是远程锁定、定位、停用SIM卡，再回查行动路线。`,
        `保险通常会要求IMEI、购买凭证和警方证明，因此应先保存设备信息。`,
        `同时联系出租车、酒店、咖啡店和交通机构；若有被盗迹象，应在警方证明中明确记录。`,
      ],
      ja: [
        `${cityName} で${incidentName}が起きたら、遠隔ロック、位置確認、SIM停止を先に行い、行動ルートを確認する例が多いです。`,
        `保険請求ではIMEI、購入証明、警察届が求められることが多いため、端末情報を先に保存してください。`,
        `タクシー、ホテル、カフェ、交通機関へ同時に問い合わせ、盗難の疑いがあれば警察届に明記します。`,
      ],
      "zh-Hant": [
        `在 ${cityName} 發生${incidentName}時，常見順序是遠端鎖定、定位、停用SIM卡，再回查行動路線。`,
        `保險通常會要求IMEI、購買證明與警方證明，因此應先保存設備資訊。`,
        `同時聯絡計程車、飯店、咖啡店與交通機構；若有被盜跡象，應在警方證明中明確記錄。`,
      ],
      th: [
        `เมื่อ${incidentName}ใน ${cityName} ให้ล็อกเครื่องจากระยะไกล ตรวจตำแหน่ง และระงับ SIM ก่อนย้อนดูเส้นทาง`,
        `ประกันมักต้องใช้ IMEI หลักฐานซื้อ และใบแจ้งความ จึงควรบันทึกข้อมูลเครื่องไว้ก่อน`,
        `ติดต่อแท็กซี่ โรงแรม ร้านกาแฟ และขนส่งพร้อมกัน หากมีเหตุขโมยให้ระบุในใบแจ้งความอย่างชัดเจน`,
      ],
      vi: [
        `Khi ${incidentName} tại ${cityName}, nên khóa thiết bị từ xa, kiểm tra vị trí, chặn SIM rồi rà lại lộ trình.`,
        `Bảo hiểm thường cần IMEI, chứng từ mua và giấy báo cảnh sát, vì vậy hãy lưu thông tin thiết bị trước.`,
        `Liên hệ cùng lúc taxi, khách sạn, quán cà phê và đơn vị vận chuyển; nếu có dấu hiệu trộm cắp, hãy ghi rõ trong báo cáo cảnh sát.`,
      ],
      en: [
        `In ${cityName}, lost-phone cases usually start with remote lock, location check, and SIM suspension before retracing the route.`,
        `Insurance often needs the IMEI, purchase proof, and police report, so saving device details early helps.`,
        `Contact taxis, hotels, cafes, and transport operators at the same time; if theft is likely, make sure the police report says so.`,
      ],
    } as const)[language];
  }

  if (incident === "lost-wallet") {
    return ({
      ko: [
        `${cityName}에서 ${incidentName} 시에는 카드 앱에서 해외 결제와 현금 인출을 먼저 막고 동선을 확인하는 사례가 많습니다.`,
        `현금·카드·신분증 목록과 추정 금액을 정리해 경찰 신고서에 넣으면 보험·카드사 분쟁 처리가 빨라집니다.`,
        `의심 결제가 있으면 카드사 이의제기 번호와 경찰 사건 번호를 함께 보관한 여행자가 환급 절차를 줄였습니다.`,
      ],
      "zh-Hans": [
        `在 ${cityName} 发生${incidentName}时，旅客通常先在银行App冻结境外支付和取现，再回查路线。`,
        `把现金、银行卡、证件和估算金额列入警方证明，有助于保险和银行争议处理。`,
        `如有可疑扣款，同时保存银行卡争议编号和警方案件编号，可减少后续沟通。`,
      ],
      ja: [
        `${cityName} で${incidentName}が起きたら、カードアプリで海外決済と現金引き出しを止め、行動ルートを確認する例が多いです。`,
        `現金、カード、身分証、概算金額を警察届に入れると、保険やカード会社の手続きが進みやすくなります。`,
        `不審決済がある場合、カード会社の異議申立番号と警察の事件番号を一緒に保管してください。`,
      ],
      "zh-Hant": [
        `在 ${cityName} 發生${incidentName}時，旅客通常先在銀行App凍結境外支付和提款，再回查路線。`,
        `把現金、銀行卡、證件和估算金額列入警方證明，有助於保險和銀行爭議處理。`,
        `如有可疑扣款，同時保存銀行卡爭議編號和警方案件編號，可減少後續溝通。`,
      ],
      th: [
        `เมื่อ${incidentName}ใน ${cityName} ควรระงับการใช้บัตรต่างประเทศและถอนเงินสดผ่านแอปธนาคารก่อน แล้วค่อยย้อนดูเส้นทาง`,
        `จัดรายการเงินสด บัตร เอกสาร และมูลค่าโดยประมาณให้ตำรวจบันทึก จะช่วยเรื่องประกันและข้อพิพาทกับธนาคาร`,
        `หากมีรายการต้องสงสัย ให้เก็บเลขอ้างอิงจากธนาคารและเลขคดีตำรวจไว้คู่กัน`,
      ],
      vi: [
        `Khi ${incidentName} tại ${cityName}, nên khóa thanh toán quốc tế và rút tiền mặt trong ứng dụng ngân hàng trước khi rà lại lộ trình.`,
        `Liệt kê tiền mặt, thẻ, giấy tờ và giá trị ước tính trong báo cáo cảnh sát giúp xử lý bảo hiểm và tranh chấp ngân hàng nhanh hơn.`,
        `Nếu có giao dịch nghi vấn, hãy lưu cả mã tranh chấp của ngân hàng và số hồ sơ cảnh sát.`,
      ],
      en: [
        `In ${cityName}, lost-wallet cases usually start by freezing overseas card payments and cash withdrawals before retracing the route.`,
        `Listing cash, cards, IDs, and estimated amounts in the police report helps insurance and bank disputes move faster.`,
        `For suspicious charges, keep the card-dispute reference and police case number together.`,
      ],
    } as const)[language];
  }

  if (incident === "hospital") {
    return ({
      ko: [
        `${cityName}에서 ${incidentName} 시에는 응급번호, 가까운 병원, 여행자보험 연락처를 동시에 확인하는 것이 가장 빠릅니다.`,
        `접수 시 여권, 보험증서, 결제수단을 요구받는 경우가 많아 보호자나 통역 앱과 함께 준비하는 사례가 많습니다.`,
        `보험 청구에는 진단서, 영수증, 처방전, 카드 전표가 필요하므로 퇴원 전 영어 또는 현지어 서류를 요청해야 합니다.`,
      ],
      "zh-Hans": [
        `在 ${cityName} ${incidentName}时，同时确认急救电话、附近医院和旅行保险热线最快。`,
        `挂号时常会要求护照、保险证明和付款方式，建议准备翻译App或同行协助。`,
        `保险理赔通常需要诊断书、收据、处方和刷卡凭证，离院前应索取完整文件。`,
      ],
      ja: [
        `${cityName} で${incidentName}が必要な場合、救急番号、近くの病院、旅行保険窓口を同時に確認するのが早いです。`,
        `受付ではパスポート、保険証明、支払い手段を求められることが多いため、通訳アプリや同行者の準備が役立ちます。`,
        `保険請求には診断書、領収書、処方箋、カード控えが必要なことが多く、退院前に書類を依頼してください。`,
      ],
      "zh-Hant": [
        `在 ${cityName} ${incidentName}時，同時確認急救電話、附近醫院和旅遊保險熱線最快。`,
        `掛號時常會要求護照、保險證明和付款方式，建議準備翻譯App或同行協助。`,
        `保險理賠通常需要診斷書、收據、處方和刷卡憑證，離院前應索取完整文件。`,
      ],
      th: [
        `เมื่อต้อง${incidentName}ใน ${cityName} ให้ตรวจเบอร์ฉุกเฉิน โรงพยาบาลใกล้ที่สุด และสายด่วนประกันพร้อมกัน`,
        `ตอนลงทะเบียนมักต้องใช้หนังสือเดินทาง เอกสารประกัน และวิธีชำระเงิน ควรเตรียมแอปแปลหรือผู้ช่วยไปด้วย`,
        `ประกันมักต้องใช้ใบรับรองแพทย์ ใบเสร็จ ใบสั่งยา และสลิปบัตร จึงควรขอเอกสารก่อนออกจากโรงพยาบาล`,
      ],
      vi: [
        `Khi cần ${incidentName} tại ${cityName}, hãy kiểm tra đồng thời số khẩn cấp, bệnh viện gần nhất và đường dây bảo hiểm du lịch.`,
        `Khi tiếp nhận, bệnh viện thường yêu cầu hộ chiếu, chứng nhận bảo hiểm và phương thức thanh toán; ứng dụng dịch hoặc người đi cùng rất hữu ích.`,
        `Bảo hiểm thường cần giấy chẩn đoán, hóa đơn, đơn thuốc và biên lai thẻ, nên xin đủ hồ sơ trước khi rời bệnh viện.`,
      ],
      en: [
        `In ${cityName}, hospital cases move fastest when you check the emergency number, nearest hospital, and travel-insurance hotline together.`,
        `Intake often requires a passport, insurance certificate, and payment method, so a translation app or companion helps.`,
        `Insurance usually needs the diagnosis, receipts, prescription, and card slip, so request documents before leaving.`,
      ],
    } as const)[language];
  }

  if (incident === "police-report") {
    return ({
      ko: [
        `${cityName}에서 ${incidentName}는 사건 발생 장소 관할 경찰서를 찾는 것이 핵심이며, 숙소 근처 경찰서가 아닐 수 있습니다.`,
        `주소, 시간, 사진, 영수증, 차량번호, CCTV 위치를 준비한 여행자가 접수 시간을 줄였습니다.`,
        `보험용이면 사건 번호, 도장, 담당자명, 피해 품목이 신고서에 들어갔는지 현장에서 확인해야 합니다.`,
      ],
      "zh-Hans": [
        `在 ${cityName} 办理${incidentName}时，关键是找到事发地管辖警署，不一定是酒店附近的警署。`,
        `准备地址、时间、照片、收据、车牌和监控位置，可缩短受理时间。`,
        `用于保险时，应现场确认案件编号、印章、承办人和损失物品已写入证明。`,
      ],
      ja: [
        `${cityName} で${incidentName}を行う場合、事件発生地を管轄する警察署へ行くことが重要で、宿泊先近くとは限りません。`,
        `住所、時刻、写真、領収書、車両番号、防犯カメラ位置を準備すると受付が早くなります。`,
        `保険用なら、事件番号、印、担当者名、被害品目が書類に入っているか現地で確認してください。`,
      ],
      "zh-Hant": [
        `在 ${cityName} 辦理${incidentName}時，關鍵是找到事發地管轄警署，不一定是飯店附近的警署。`,
        `準備地址、時間、照片、收據、車牌和監視器位置，可縮短受理時間。`,
        `用於保險時，應現場確認案件編號、印章、承辦人和損失物品已寫入證明。`,
      ],
      th: [
        `การ${incidentName}ใน ${cityName} ต้องไปสถานีตำรวจที่รับผิดชอบพื้นที่เกิดเหตุ ซึ่งอาจไม่ใช่สถานีใกล้โรงแรม`,
        `เตรียมที่อยู่ เวลา รูปถ่าย ใบเสร็จ เลขทะเบียนรถ และตำแหน่งกล้อง CCTV จะช่วยให้แจ้งความเร็วขึ้น`,
        `ถ้าใช้กับประกัน ให้ตรวจว่ามีเลขคดี ตราประทับ ชื่อเจ้าหน้าที่ และรายการเสียหายในเอกสาร`,
      ],
      vi: [
        `Khi ${incidentName} tại ${cityName}, điều quan trọng là đến đúng đồn phụ trách nơi xảy ra sự việc, không nhất thiết là đồn gần khách sạn.`,
        `Chuẩn bị địa chỉ, thời gian, ảnh, hóa đơn, biển số xe và vị trí CCTV giúp rút ngắn thời gian tiếp nhận.`,
        `Nếu dùng cho bảo hiểm, hãy kiểm tra tại chỗ số hồ sơ, con dấu, tên cán bộ và danh sách thiệt hại trong giấy xác nhận.`,
      ],
      en: [
        `In ${cityName}, police reports depend on the incident jurisdiction, which may not be the station nearest your hotel.`,
        `Bringing the address, time, photos, receipts, vehicle number, and CCTV location speeds up intake.`,
        `For insurance, confirm the case number, stamp, officer name, and lost items are written on the document before leaving.`,
      ],
    } as const)[language];
  }

  return ({
    ko: [
      `${cityName}에서 ${incidentName}를 겪으면 즉시 안전한 장소로 이동하고, 추가 결제나 현장 합의를 멈춘 사례가 많습니다.`,
      `영수증, 채팅, 차량번호, 위치, 사진을 저장한 뒤 카드사 이의제기와 경찰 신고를 병행하면 피해 입증이 쉬워집니다.`,
      `위협이 있거나 여권·카드가 함께 관련된 경우 관광경찰과 공관 연락처를 동시에 확인하는 것이 안전합니다.`,
    ],
    "zh-Hans": [
      `在 ${cityName} 遇到${incidentName}时，应先离开现场，停止继续付款或私下和解。`,
      `保存收据、聊天、车牌、定位和照片，再同步联系发卡行争议处理与警方，有助于证明损失。`,
      `如有威胁或涉及护照、银行卡，应同时确认旅游警察和使领馆联系方式。`,
    ],
    ja: [
      `${cityName} で${incidentName}に遭った場合、まず安全な場所へ移動し、追加支払いや現場での示談を止める例が多いです。`,
      `領収書、チャット、車両番号、位置情報、写真を保存し、カード会社の異議申立と警察相談を並行すると被害説明がしやすくなります。`,
      `脅しがある場合やパスポート・カードが関係する場合は、観光警察と領事窓口を同時に確認してください。`,
    ],
    "zh-Hant": [
      `在 ${cityName} 遇到${incidentName}時，應先離開現場，停止繼續付款或私下和解。`,
      `保存收據、聊天、車牌、定位和照片，再同步聯絡發卡行爭議處理與警方，有助於證明損失。`,
      `如有威脅或涉及護照、銀行卡，應同時確認旅遊警察和使領館聯絡方式。`,
    ],
    th: [
      `เมื่อ${incidentName}ใน ${cityName} ให้ย้ายไปที่ปลอดภัยก่อน และหยุดจ่ายเงินเพิ่มหรือเจรจาหน้างาน`,
      `เก็บใบเสร็จ แชต เลขรถ ตำแหน่ง และรูปถ่าย แล้วติดต่อธนาคารกับตำรวจควบคู่กันจะช่วยพิสูจน์ความเสียหาย`,
      `หากมีการข่มขู่หรือเกี่ยวข้องกับหนังสือเดินทางหรือบัตร ควรตรวจเบอร์ตำรวจท่องเที่ยวและสถานทูตพร้อมกัน`,
    ],
    vi: [
      `Khi gặp ${incidentName} tại ${cityName}, hãy rời khỏi hiện trường đến nơi an toàn và dừng mọi khoản thanh toán hoặc thỏa thuận trực tiếp.`,
      `Lưu hóa đơn, tin nhắn, biển số xe, vị trí và ảnh rồi liên hệ đồng thời ngân hàng và cảnh sát sẽ giúp chứng minh thiệt hại.`,
      `Nếu có đe dọa hoặc liên quan đến hộ chiếu, thẻ ngân hàng, hãy kiểm tra cùng lúc số cảnh sát du lịch và cơ quan lãnh sự.`,
    ],
    en: [
      `In ${cityName}, scam cases usually start by leaving the scene, stopping further payment, and avoiding on-the-spot settlements.`,
      `Saving receipts, chats, vehicle numbers, locations, and photos helps with both card disputes and police reports.`,
      `If there is intimidation or a passport/card is involved, check tourist police and consular contacts at the same time.`,
    ],
  } as const)[language];
}

function replacementRows(profile: TravelerProfile, cityName: string, incident: IncidentType) {
  const texts = reviewTexts(profile.language, cityName, incident);
  const sources = languageSources(profile.language);
  return texts
    .map((text, index) => `<ReviewQuoteRow text="${esc(text)}" source="${esc(sources[index])}" />`)
    .join("\n");
}

function cityNameFor(profile: TravelerProfile, citySlug: string, englishName: string) {
  if (profile.language === "ko") return koreanCityNames[citySlug] ?? englishName;
  return englishName;
}

function findWrongMarkers(country: string, city: string, reviewBlock: string) {
  return Object.entries(cityMarkers)
    .flatMap(([markerCountry, entries]) =>
      entries.map((entry) => ({
        ...entry,
        country: markerCountry,
      })),
    )
    .filter((entry) => !(entry.country === country && entry.slug === city))
    .flatMap((entry) => entry.markers)
    .filter((marker) => reviewBlock.toLowerCase().includes(marker.toLowerCase()));
}

function hasOldGenericRows(profile: TravelerProfile, reviewBlock: string) {
  if (profile.language === "en") return false;
  return / 상황을 겪은 여행자는|lost passport|lost phone|lost wallet|hospital visit|police report|travel scam/.test(reviewBlock);
}

function normalizeKnownBodyMismatches(country: string, city: string, incident: IncidentType, raw: string) {
  const cityKo = koreanCityNames[city] ?? city;
  let next = raw;

  if (country === "thailand" && city !== "bangkok") {
    next = next
      .replaceAll("BTS/MRT 분실물·Grab·호텔 프론트·이동 동선 재확인", "현지 교통·Grab·호텔 프론트·이동 동선 재확인")
      .replaceAll("BTS/MRT 분실물·Grab·호텔 프론트·택시·호텔 확인", "현지 교통·Grab·호텔 프론트·택시·숙소 확인")
      .replaceAll("BTS/MRT 분실물·Grab·호텔 프론트 재확인", "현지 교통·Grab·호텔 프론트 재확인")
      .replaceAll("**BTS/MRT 분실물·Grab·호텔 프론트** 확인 후기", "**현지 교통·Grab·호텔 프론트** 확인 후기")
      .replaceAll("**BTS/MRT 분실물·Grab·호텔 프론트**·택시·호텔", "**현지 교통·Grab·호텔 프론트**·택시·숙소");
  }

  if (incident !== "scam") return next;

  if (country === "japan") {
    next = next
      .replaceAll(
        "도쿄·오사카 후기에서 낯선 현지인이 바·클럽으로 유도해 고액 청구하는 패턴이 가장 많이 보고됩니다. 메뉴·세금·서비스료 확인 후기가 반복됩니다.",
        `${cityKo} 후기에서는 관광지 주변 호객, 바·클럽 고액 청구, 가짜 안내·택시 우회가 반복됩니다. 메뉴·세금·서비스료를 먼저 확인하세요.`,
      )
      .replaceAll(
        "아사쿠사·교토 등에서 스님·수행자를 사칭해 현금·QR 기부를 요구합니다. 공식 사찰 기부함이 아닌 경우가 많습니다.",
        "관광지 주변에서 스님·수행자·자원봉사를 사칭해 현금·QR 기부를 요구하는 사례가 있습니다. 공식 기부함인지 확인하세요.",
      );
  }

  if (country === "thailand") {
    next = next
      .replaceAll(
        "방콕·푸켓 후기에서 젯스키·툭툭·쇼 바 사기가 반복 언급됩니다. 손상 수리비·입장료 별도 청구에 주의하세요.",
        `${cityKo} 후기에서는 택시·툭툭 우회, 바·쇼 청구, 렌털 손상 분쟁, 야시장 바가지가 반복됩니다. 결제 전 가격과 조건을 확인하세요.`,
      )
      .replaceAll(
        "젯스키·스쿠터 손상 사기",
        city === "phuket" || city === "pattaya" ? "젯스키·스쿠터 손상 사기" : "스쿠터·투어 손상/추가요금",
      )
      .replaceAll(
        "「왕궁 오늘 휴무」라며 보석·실크·마사지숍으로 유도합니다. 미터기 OFF가 흔하고 1155·Grab 이용 후기가 많습니다.",
        city === "bangkok"
          ? "「왕궁 오늘 휴무」라며 보석·실크·마사지숍으로 유도합니다. 미터기 OFF가 흔하고 1155·Grab 이용 후기가 많습니다."
          : "사원·야시장·투어가 「오늘만 특별가」라며 제휴 상점이나 마사지숍으로 유도되는 사례가 있습니다. 1155·Grab 이용 후기가 많습니다.",
      )
      .replaceAll(
        "Ping Pong Show·바에서 입장료·Lady drink·서비스료가 누적됩니다. 나갈 때 경비가 막거나 위협하는 후기가 있습니다.",
        city === "chiang-mai"
          ? "야시장·바·투어에서 입장료·서비스료가 나중에 붙는 사례가 있습니다. 가격표와 최종 금액을 먼저 확인하세요."
          : "쇼·바에서 입장료·Lady drink·서비스료가 누적됩니다. 나갈 때 경비가 막거나 위협하는 후기가 있습니다.",
      );
  }

  if (country === "vietnam") {
    next = next
      .replaceAll(
        "하노이·호치민 후기에서 택시 미터기·환전·신발 닦기 사기가 자주 나옵니다. Grab·공항 공식 택시가 안전 대안입니다.",
        `${cityKo} 후기에서는 택시 미터기·환전·호객·오토바이 소매치기 문제가 반복됩니다. Grab 앱 호출과 공식 창구 이용이 안전합니다.`,
      )
      .replaceAll(
        "하노이 후기: **신발 닦기 후 고액**·사진 찍고 **팁 강요**. 미리 「No」.",
        `${cityKo} 후기: **사진·호객·소액 서비스 후 고액 요구** 사례가 있습니다. 애매하면 초반에 단호히 거절하세요.`,
      )
      .replaceAll(
        "호치민 1군·벤탄: **가방·폰 낚아채기**. 길거리에서 폰 들고 걷지 않기.",
        `${cityKo} 중심가·해변·야시장 주변: **가방·폰 낚아채기** 주의. 길거리에서 폰 들고 걷지 않기.`,
      );
  }

  if (country === "taiwan") {
    next = next.replaceAll(
      "타이베이 후기: 택시 미터기·야시장 바가지가 주요 이슈입니다. Uber Taiwan·미터 택시 이용 후기가 많습니다.",
      `${cityKo} 후기에서는 택시 미터기, 야시장 가격표 미표시, 관광지 기부·서명 요구가 반복됩니다. 앱 택시와 가격 선확인이 안전합니다.`,
    );
  }

  if (country === "philippines") {
    next = next
      .replaceAll(
        "마닐라·세부 후기: 공항 택시·Buy 1 Take 1·ATM 스키밍. Grab·공항 공식 데스크 이용 후기가 많습니다.",
        `${cityKo} 후기에서는 택시·호객·ATM 스키밍·투어 추가요금이 반복됩니다. Grab, 공식 데스크, 서면 견적을 우선하세요.`,
      )
      .replaceAll(
        "마닐라 후기: **마약 판매 미끼** → 경찰 등장 연출·뇌물 요구. **절대 구매·소지 금지**.",
        city === "manila"
          ? "마닐라 후기: **마약 판매 미끼** → 경찰 등장 연출·뇌물 요구. **절대 구매·소지 금지**."
          : "유흥가·거리 호객 후기: 금지 물품·불법 제안은 즉시 거절하고 현장을 벗어나세요.",
      )
      .replaceAll(
        "에르미타·마카티 **ATM skimmer** 후기. 실내 은행 ATM·현금 최소화.",
        `${cityKo} 관광지 주변 **ATM skimmer** 주의. 실내 은행 ATM·현금 최소화.`,
      )
      .replaceAll(
        "보라카이·세부 **숨은 추가요금**·약속과 다른 보트. **서면 견적·리뷰** 확인.",
        `${cityKo} 투어·액티비티 **숨은 추가요금** 주의. 출발 전 **서면 견적·리뷰** 확인.`,
      );
  }

  return next;
}

let changed = 0;
let flagged = 0;
const examples: string[] = [];

for (const profile of travelerProfiles) {
  for (const country of travelerDestinations) {
    for (const city of country.cities) {
      for (const incident of incidentTypes) {
        const file = path.join(contentDir, profile.code, country.slug, city.slug, `${incident}.mdx`);
        if (!fs.existsSync(file)) continue;

        const raw = fs.readFileSync(file, "utf8");
        const reviewRows = raw.match(/<ReviewQuoteRow text="[^"]*" source="[^"]*" \/>/g)?.join("\n") ?? "";
        const wrongMarkers = findWrongMarkers(country.slug, city.slug, reviewRows);
        const oldGenericRows = hasOldGenericRows(profile, reviewRows);
        const bodyNormalized = normalizeKnownBodyMismatches(country.slug, city.slug, incident, raw);
        if (wrongMarkers.length === 0 && !oldGenericRows && bodyNormalized === raw) continue;

        flagged += 1;
        if (examples.length < 10) {
          examples.push(`${path.relative(process.cwd(), file)} -> ${[...new Set(wrongMarkers)].slice(0, 4).join(", ") || "generic/body cleanup"}`);
        }

        const source = bodyNormalized;
        const next = (wrongMarkers.length > 0 || oldGenericRows ? source.replace(
          /(<ReviewQuotes title="[^"]*">\r?\n)(?:<ReviewQuoteRow text="[^"]*" source="[^"]*" \/>\r?\n?)+(\/?<\/ReviewQuotes>)/g,
          (_match, open, close) => `${open}${replacementRows(profile, cityNameFor(profile, city.slug, city.name.en), incident)}\n${close}`,
        ) : source);

        if (next !== raw) {
          fs.writeFileSync(file, next, "utf8");
          changed += 1;
        }
      }
    }
  }
}

console.log(`Flagged files: ${flagged}`);
console.log(`Normalized files: ${changed}`);
if (examples.length > 0) {
  console.log("Examples:");
  for (const example of examples) console.log(`- ${example}`);
}

let remaining = 0;
for (const profile of travelerProfiles) {
  for (const country of travelerDestinations) {
    for (const city of country.cities) {
      for (const incident of incidentTypes) {
        const file = path.join(contentDir, profile.code, country.slug, city.slug, `${incident}.mdx`);
        if (!fs.existsSync(file)) continue;
        const raw = fs.readFileSync(file, "utf8");
        const reviewRows = raw.match(/<ReviewQuoteRow text="[^"]*" source="[^"]*" \/>/g)?.join("\n") ?? "";
        if (findWrongMarkers(country.slug, city.slug, reviewRows).length > 0) remaining += 1;
      }
    }
  }
}

console.log(`Remaining review city mismatches: ${remaining}`);
process.exitCode = remaining === 0 ? 0 : 1;
