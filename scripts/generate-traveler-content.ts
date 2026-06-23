import fs from "fs";
import path from "path";
import { incidentTypes, type IncidentType } from "../src/lib/site-config";
import { travelerDestinations } from "../src/lib/traveler-destinations";
import { travelerProfiles, type TravelerCode } from "../src/lib/traveler-profiles";
import { getCityData } from "./city-data";
import { getTravelerMissionSource, type DestinationCode } from "./traveler-missions";
import { localPhraseBlock } from "./local-phrases";

const contentDir = path.join(process.cwd(), "content");

type CopyLanguage = "ko" | "zh-Hans" | "ja" | "zh-Hant" | "th" | "vi" | "en";

const destinationNames: Record<DestinationCode, Record<CopyLanguage, string>> = {
  "south-korea": { ko: "대한민국", "zh-Hans": "韩国", ja: "韓国", "zh-Hant": "韓國", th: "เกาหลีใต้", vi: "Hàn Quốc", en: "South Korea" },
  japan: { ko: "일본", "zh-Hans": "日本", ja: "日本", "zh-Hant": "日本", th: "ญี่ปุ่น", vi: "Nhật Bản", en: "Japan" },
  thailand: { ko: "태국", "zh-Hans": "泰国", ja: "タイ", "zh-Hant": "泰國", th: "ประเทศไทย", vi: "Thái Lan", en: "Thailand" },
  vietnam: { ko: "베트남", "zh-Hans": "越南", ja: "ベトナム", "zh-Hant": "越南", th: "เวียดนาม", vi: "Việt Nam", en: "Vietnam" },
  taiwan: { ko: "대만", "zh-Hans": "台湾", ja: "台湾", "zh-Hant": "臺灣", th: "ไต้หวัน", vi: "Đài Loan", en: "Taiwan" },
  philippines: { ko: "필리핀", "zh-Hans": "菲律宾", ja: "フィリピン", "zh-Hant": "菲律賓", th: "ฟิลิปปินส์", vi: "Philippines", en: "Philippines" },
};

const cityNames: Record<string, Record<CopyLanguage, string>> = {
  seoul: { ko: "서울", "zh-Hans": "首尔", ja: "ソウル", "zh-Hant": "首爾", th: "โซล", vi: "Seoul", en: "Seoul" },
  busan: { ko: "부산", "zh-Hans": "釜山", ja: "釜山", "zh-Hant": "釜山", th: "ปูซาน", vi: "Busan", en: "Busan" },
  jeju: { ko: "제주", "zh-Hans": "济州", ja: "済州", "zh-Hant": "濟州", th: "เชจู", vi: "Jeju", en: "Jeju" },
  tokyo: { ko: "도쿄", "zh-Hans": "东京", ja: "東京", "zh-Hant": "東京", th: "โตเกียว", vi: "Tokyo", en: "Tokyo" },
  osaka: { ko: "오사카", "zh-Hans": "大阪", ja: "大阪", "zh-Hant": "大阪", th: "โอซาก้า", vi: "Osaka", en: "Osaka" },
  fukuoka: { ko: "후쿠오카", "zh-Hans": "福冈", ja: "福岡", "zh-Hant": "福岡", th: "ฟุกุโอกะ", vi: "Fukuoka", en: "Fukuoka" },
  kyoto: { ko: "교토", "zh-Hans": "京都", ja: "京都", "zh-Hant": "京都", th: "เกียวโต", vi: "Kyoto", en: "Kyoto" },
  sapporo: { ko: "삿포로", "zh-Hans": "札幌", ja: "札幌", "zh-Hant": "札幌", th: "ซัปโปโร", vi: "Sapporo", en: "Sapporo" },
  bangkok: { ko: "방콕", "zh-Hans": "曼谷", ja: "バンコク", "zh-Hant": "曼谷", th: "กรุงเทพฯ", vi: "Bangkok", en: "Bangkok" },
  phuket: { ko: "푸켓", "zh-Hans": "普吉岛", ja: "プーケット", "zh-Hant": "普吉島", th: "ภูเก็ต", vi: "Phuket", en: "Phuket" },
  "chiang-mai": { ko: "치앙마이", "zh-Hans": "清迈", ja: "チェンマイ", "zh-Hant": "清邁", th: "เชียงใหม่", vi: "Chiang Mai", en: "Chiang Mai" },
  pattaya: { ko: "파타야", "zh-Hans": "芭提雅", ja: "パタヤ", "zh-Hant": "芭達雅", th: "พัทยา", vi: "Pattaya", en: "Pattaya" },
  danang: { ko: "다낭", "zh-Hans": "岘港", ja: "ダナン", "zh-Hant": "峴港", th: "ดานัง", vi: "Đà Nẵng", en: "Da Nang" },
  hanoi: { ko: "하노이", "zh-Hans": "河内", ja: "ハノイ", "zh-Hant": "河內", th: "ฮานอย", vi: "Hà Nội", en: "Hanoi" },
  "ho-chi-minh-city": { ko: "호치민", "zh-Hans": "胡志明市", ja: "ホーチミン", "zh-Hant": "胡志明市", th: "โฮจิมินห์ซิตี้", vi: "TP. Hồ Chí Minh", en: "Ho Chi Minh City" },
  "nha-trang": { ko: "나트랑", "zh-Hans": "芽庄", ja: "ニャチャン", "zh-Hant": "芽莊", th: "ญาจาง", vi: "Nha Trang", en: "Nha Trang" },
  taipei: { ko: "타이베이", "zh-Hans": "台北", ja: "台北", "zh-Hant": "臺北", th: "ไทเป", vi: "Đài Bắc", en: "Taipei" },
  taichung: { ko: "타이중", "zh-Hans": "台中", ja: "台中", "zh-Hant": "臺中", th: "ไถจง", vi: "Đài Trung", en: "Taichung" },
  kaohsiung: { ko: "가오슝", "zh-Hans": "高雄", ja: "高雄", "zh-Hant": "高雄", th: "เกาสง", vi: "Cao Hùng", en: "Kaohsiung" },
  manila: { ko: "마닐라", "zh-Hans": "马尼拉", ja: "マニラ", "zh-Hant": "馬尼拉", th: "มะนิลา", vi: "Manila", en: "Manila" },
  cebu: { ko: "세부", "zh-Hans": "宿务", ja: "セブ", "zh-Hant": "宿霧", th: "เซบู", vi: "Cebu", en: "Cebu" },
  boracay: { ko: "보라카이", "zh-Hans": "长滩岛", ja: "ボラカイ", "zh-Hant": "長灘島", th: "โบราไกย์", vi: "Boracay", en: "Boracay" },
};

const incidentNames: Record<IncidentType, Record<CopyLanguage, string>> = {
  "lost-passport": { ko: "여권 분실", "zh-Hans": "护照遗失", ja: "パスポート紛失", "zh-Hant": "護照遺失", th: "หนังสือเดินทางสูญหาย", vi: "Mất hộ chiếu", en: "Lost passport" },
  "lost-phone": { ko: "휴대폰 분실", "zh-Hans": "手机遗失或被盗", ja: "スマートフォン紛失・盗難", "zh-Hant": "手機遺失或遭竊", th: "โทรศัพท์หายหรือถูกขโมย", vi: "Mất hoặc bị trộm điện thoại", en: "Lost or stolen phone" },
  "lost-wallet": { ko: "지갑 분실", "zh-Hans": "钱包遗失或被盗", ja: "財布紛失・盗難", "zh-Hant": "錢包遺失或遭竊", th: "กระเป๋าสตางค์หายหรือถูกขโมย", vi: "Mất hoặc bị trộm ví", en: "Lost or stolen wallet" },
  hospital: { ko: "병원 이용", "zh-Hans": "就医与急诊", ja: "病院・救急受診", "zh-Hant": "就醫與急診", th: "โรงพยาบาลและฉุกเฉิน", vi: "Bệnh viện và cấp cứu", en: "Hospital and emergency care" },
  "police-report": { ko: "경찰 신고", "zh-Hans": "报警与报案证明", ja: "警察への届出", "zh-Hant": "報警與報案證明", th: "การแจ้งความกับตำรวจ", vi: "Trình báo cảnh sát", en: "Police report" },
  scam: { ko: "여행 사기", "zh-Hans": "旅行诈骗", ja: "旅行詐欺", "zh-Hant": "旅遊詐騙", th: "กลโกงการท่องเที่ยว", vi: "Lừa đảo du lịch", en: "Travel scams" },
};

const reviewCommunities: Record<DestinationCode, string> = {
  "south-korea": "koreatravel",
  japan: "JapanTravel",
  thailand: "ThailandTourism",
  vietnam: "VietNam",
  taiwan: "taiwan",
  philippines: "Philippines",
};

const copy = {
  ko: {
    source: "공식 출처와 확인 기준",
    sourceNote: "본국 정부의 여권 안내와 현지 공식기관 정보를 기준으로 작성했습니다. 방문 전 전화로 접수시간과 필요서류를 다시 확인하세요.",
    reviews: "여행자 후기에서 반복 확인된 점",
    reviewText: "후기에서는 사건번호가 적힌 경찰 확인서 원본, 공관 방문 전 전화 확인, 항공편 변경을 서두르지 않는 것이 반복해서 강조됩니다.",
    timeline: "해결 순서",
    now: "지금 해야 할 일",
    warning: "중요",
    warningBody: "여권·카드·휴대폰은 신고 시각과 사건번호를 기록하고 모든 서류를 사진으로 백업하세요.",
    mission: "국적별 담당기관",
    police: "현지 경찰",
    hospital: "현지 의료기관",
  },
  "zh-Hans": {
    source: "官方来源与核验说明",
    sourceNote: "本指南依据本国政府护照规定和当地官方机构信息整理。前往前请电话确认受理时间、材料和费用。",
    reviews: "旅客经验中反复出现的要点",
    reviewText: "多份旅客经验都强调：取得带案件编号的警方证明原件、去使领馆前先电话确认，并在确认证件办理时间后再更改航班。",
    timeline: "处理顺序",
    now: "现在立即处理",
    warning: "重要提醒",
    warningBody: "记录护照、银行卡或手机的报失时间和案件编号，并把所有证明拍照备份。",
    mission: "本国主管机构",
    police: "当地警方",
    hospital: "当地医疗机构",
  },
  ja: {
    source: "公式情報と確認方針",
    sourceNote: "本国政府の旅券案内と現地公的機関の情報を基に作成しています。訪問前に受付時間・必要書類・手数料を電話で再確認してください。",
    reviews: "旅行者の体験談で繰り返し確認された点",
    reviewText: "体験談では、受理番号入りの警察証明書の原本を受け取ること、在外公館へ行く前に電話すること、発給見込みを確認してから航空便を変更することが繰り返し挙げられています。",
    timeline: "解決までの順序",
    now: "今すぐ行うこと",
    warning: "重要",
    warningBody: "旅券・カード・携帯電話の届出時刻と受理番号を記録し、書類はすべて写真でバックアップしてください。",
    mission: "国籍別の担当機関",
    police: "現地警察",
    hospital: "現地医療機関",
  },
  "zh-Hant": {
    source: "官方來源與查核說明",
    sourceNote: "本指南依據本國政府護照規定及當地官方機構資訊整理。前往前請電話確認受理時間、文件與費用。",
    reviews: "旅客經驗中反覆出現的重點",
    reviewText: "多則旅客經驗都強調：取得載有案件編號的警方證明正本、前往駐外館處前先電話確認，並在確認證件辦理時間後再更改航班。",
    timeline: "處理順序",
    now: "現在立即處理",
    warning: "重要提醒",
    warningBody: "記錄護照、銀行卡或手機的報失時間與案件編號，並將所有證明拍照備份。",
    mission: "本國主管機構",
    police: "當地警方",
    hospital: "當地醫療機構",
  },
  th: {
    source: "แหล่งข้อมูลทางการและเกณฑ์ตรวจสอบ",
    sourceNote: "คู่มือนี้อ้างอิงคำแนะนำด้านหนังสือเดินทางของรัฐบาลไทยและข้อมูลหน่วยงานท้องถิ่น โปรดโทรยืนยันเวลารับเรื่อง เอกสาร และค่าธรรมเนียมก่อนเดินทางไป",
    reviews: "ประเด็นที่พบซ้ำในประสบการณ์จริงของนักเดินทาง",
    reviewText: "รีวิวของนักเดินทางย้ำให้ขอเอกสารตำรวจฉบับจริงที่มีเลขคดี โทรหาสถานทูตก่อนไป และยืนยันระยะเวลาออกเอกสารก่อนเปลี่ยนเที่ยวบิน",
    timeline: "ลำดับการแก้ไข",
    now: "สิ่งที่ต้องทำตอนนี้",
    warning: "สำคัญ",
    warningBody: "จดเวลาแจ้งเหตุและเลขคดีของหนังสือเดินทาง บัตร หรือโทรศัพท์ และถ่ายรูปเอกสารทุกฉบับเก็บสำรอง",
    mission: "หน่วยงานรับผิดชอบตามสัญชาติ",
    police: "ตำรวจท้องถิ่น",
    hospital: "สถานพยาบาลท้องถิ่น",
  },
  vi: {
    source: "Nguồn chính thức và tiêu chí kiểm chứng",
    sourceNote: "Hướng dẫn này dựa trên quy định hộ chiếu của Việt Nam và thông tin chính thức tại địa phương. Hãy gọi xác nhận giờ tiếp nhận, giấy tờ và lệ phí trước khi đến.",
    reviews: "Các điểm lặp lại trong trải nghiệm thực tế",
    reviewText: "Nhiều du khách nhấn mạnh cần lấy bản gốc giấy xác nhận có số vụ việc, gọi cơ quan đại diện trước khi đến và xác nhận thời gian cấp giấy tờ trước khi đổi chuyến bay.",
    timeline: "Trình tự xử lý",
    now: "Việc cần làm ngay",
    warning: "Quan trọng",
    warningBody: "Ghi lại thời gian trình báo và số vụ việc đối với hộ chiếu, thẻ hoặc điện thoại; chụp lại mọi giấy tờ để dự phòng.",
    mission: "Cơ quan phụ trách theo quốc tịch",
    police: "Cảnh sát địa phương",
    hospital: "Cơ sở y tế địa phương",
  },
  en: {
    source: "Official sources and verification",
    sourceNote: "This guide uses your government's passport guidance and local official information. Call ahead to reconfirm hours, documents, and fees.",
    reviews: "Patterns repeated in traveler reports",
    reviewText: "Traveler reports repeatedly stress getting the original police document with a case number, calling the mission before visiting, and confirming document timing before changing flights.",
    timeline: "Resolution timeline",
    now: "What to do now",
    warning: "Important",
    warningBody: "Record the report time and case number for passports, cards, or phones, and photograph every document as a backup.",
    mission: "Your nationality's responsible authority",
    police: "Local police",
    hospital: "Local medical provider",
  },
} satisfies Record<CopyLanguage, Record<string, string>>;

function esc(value: string): string {
  return value.replace(/"/g, "&quot;").replace(/\n/g, " ");
}

function languageFor(traveler: TravelerCode): CopyLanguage {
  if (traveler === "kr") return "ko";
  if (traveler === "cn") return "zh-Hans";
  if (traveler === "jp") return "ja";
  if (traveler === "tw") return "zh-Hant";
  if (traveler === "th") return "th";
  if (traveler === "vn") return "vi";
  return "en";
}

function localizedMeta(language: CopyLanguage, profileName: string, country: string, city: string, incident: string) {
  return ({
    ko: { title: `${country} ${city} ${incident}: ${profileName} 여행자 가이드 (2026)`, summary: `${profileName} 여행자가 ${country} ${city}에서 ${incident} 상황을 겪었을 때 필요한 현지 대응, 담당기관, 긴급 연락처를 정리했습니다.`, cost: "담당기관 확인 필요", time: "상황과 기관에 따라 다름" },
    "zh-Hans": { title: `${country}${city}${incident}：${profileName}旅客指南（2026）`, summary: `${profileName}旅客在${country}${city}遇到${incident}时，可按本指南处理当地报案、主管机构联系和紧急求助。`, cost: "请向主管机构确认", time: "视事件和机构而定" },
    ja: { title: `${country}・${city}での${incident}：${profileName}旅行者ガイド（2026）`, summary: `${profileName}の旅行者が${country}・${city}で${incident}に直面した際の現地対応、担当機関、緊急連絡先をまとめています。`, cost: "担当機関へ要確認", time: "状況・機関により異なる" },
    "zh-Hant": { title: `${country}${city}${incident}：${profileName}旅客指南（2026）`, summary: `${profileName}旅客在${country}${city}遇到${incident}時，可依本指南處理當地報案、主管機構聯絡及緊急求助。`, cost: "請向主管機構確認", time: "依事件與機構而異" },
    th: { title: `${incident}ใน${city} ${country}: คู่มือสำหรับนักเดินทาง${profileName} (2026)`, summary: `ขั้นตอนรับมือในพื้นที่ หน่วยงานรับผิดชอบ และช่องทางฉุกเฉินสำหรับนักเดินทาง${profileName}ที่พบเหตุ${incident}ใน${city} ${country}`, cost: "โปรดตรวจสอบกับหน่วยงานรับผิดชอบ", time: "ขึ้นอยู่กับเหตุการณ์และหน่วยงาน" },
    vi: { title: `${incident} tại ${city}, ${country}: hướng dẫn cho du khách ${profileName} (2026)`, summary: `Các bước xử lý tại địa phương, cơ quan phụ trách và liên hệ khẩn cấp dành cho du khách ${profileName} gặp tình huống ${incident} tại ${city}, ${country}.`, cost: "Xác nhận với cơ quan phụ trách", time: "Tùy tình huống và cơ quan" },
    en: { title: `${incident} in ${city}, ${country} — ${profileName} traveler guide (2026)`, summary: `Step-by-step local response and ${profileName} consular guidance for ${incident.toLowerCase()} in ${city}.`, cost: "Confirm with the responsible authority", time: "Varies by incident and authority" },
  } as const)[language];
}

function safeEnglish(value: string | undefined, fallback: string) {
  return value && !/[가-힣]/.test(value) ? value : fallback;
}

function fallbackPhrase(country: DestinationCode) {
  return ({
    "south-korea": '<LocalPhrase locale="en" language="Korean" reading="Dowajuseyo. Gyeongchare yeollakhae juseyo.">도와주세요. 경찰에 연락해 주세요.</LocalPhrase>',
    japan: '<LocalPhrase locale="en" language="Japanese" reading="Tasukete kudasai. Keisatsu ni renraku shite kudasai.">助けてください。警察に連絡してください。</LocalPhrase>',
    thailand: '<LocalPhrase locale="en" language="Thai" reading="Chuai duai. Karuna thora ha tamruat.">ช่วยด้วย กรุณาโทรหาตำรวจ</LocalPhrase>',
    vietnam: '<LocalPhrase locale="en" language="Vietnamese" reading="Xin hãy giúp tôi. Vui lòng gọi cảnh sát.">Xin hãy giúp tôi. Vui lòng gọi cảnh sát.</LocalPhrase>',
    taiwan: '<LocalPhrase locale="en" language="Mandarin (Taiwan)" reading="Qǐng bāngzhù wǒ. Qǐng bāng wǒ bàojǐng.">請幫助我。請幫我報警。</LocalPhrase>',
    philippines: '<LocalPhrase locale="en" language="Filipino / English">Kailangan ko ng tulong. Pakitawag ang pulis.</LocalPhrase>',
  } as const)[country];
}

function incidentSteps(incident: IncidentType, language: CopyLanguage, missionName: string) {
  const steps: Record<CopyLanguage, Record<IncidentType, string[]>> = {
    ko: {
      "lost-passport": ["분실 장소와 교통기관 분실물 센터 재확인", "현지 경찰에서 분실신고서와 사건번호 받기", `${missionName}에 전화해 긴급여권 절차 확인`, "발급 일정 확인 후 항공편 변경"],
      "lost-phone": ["기기 찾기에서 위치 확인·원격 잠금", "SIM과 금융앱 즉시 정지", "경찰 신고서와 사건번호 받기", "IMEI·영수증으로 보험 접수"],
      "lost-wallet": ["카드 해외결제와 현금 인출 차단", "분실물 센터와 이동 경로 확인", "경찰 신고서 받기", "보험사에 사건번호 제출"],
      hospital: ["생명이 위급하면 현지 응급번호 호출", "여권·보험증서·복용약 정보 준비", "통역 가능 여부와 선결제 조건 확인", "진단서·영수증 원본 보관"],
      "police-report": ["사건 장소와 시간을 메모", "관할 경찰서에서 신고", "사건번호·도장·담당자 확인", "보험·공관 제출용 원본 보관"],
      scam: ["추가 결제와 현금 인출 즉시 중단", "영수증·채팅·차량번호 증거 저장", "경찰과 카드사에 신고", "신체 위협이 있으면 안전한 장소로 이동"],
    },
    "zh-Hans": {
      "lost-passport": ["再次检查遗失地点和交通失物招领处", "向当地警方报失并取得案件编号和证明原件", `致电${missionName}确认旅行证件办理要求`, "确认证件签发时间后再改签航班"],
      "lost-phone": ["使用查找设备功能定位并远程锁定", "立即停用SIM卡和金融应用", "向警方报案并取得案件编号", "凭IMEI、购买凭证和报案证明申请保险"],
      "lost-wallet": ["立即冻结银行卡和境外取现", "联系失物招领并回查行动路线", "取得警方报案证明", "向保险公司提交案件编号"],
      hospital: ["危及生命时立即拨打当地急救电话", "准备护照、保险凭证和用药信息", "确认翻译服务和预付款要求", "保留诊断书和收据原件"],
      "police-report": ["记录事发地点、时间和经过", "前往有管辖权的警署报案", "确认案件编号、印章和承办人员", "保留供保险和主管机构使用的原件"],
      scam: ["立即停止继续付款或取现", "保存收据、聊天记录、车牌和照片", "向警方及发卡行报案", "受到威胁时先前往安全地点"],
    },
    ja: {
      "lost-passport": ["紛失場所と交通機関の遺失物窓口を再確認", "現地警察で紛失届を出し受理番号と原本を受領", `${missionName}へ電話し渡航書類の要件を確認`, "発給予定を確認してから航空便を変更"],
      "lost-phone": ["端末を探す機能で位置確認・遠隔ロック", "SIMと金融アプリを直ちに停止", "警察へ届け出て受理番号を取得", "IMEI・領収書・証明書で保険請求"],
      "lost-wallet": ["カードの海外決済と出金を停止", "遺失物窓口と移動経路を確認", "警察の届出証明を取得", "保険会社へ受理番号を提出"],
      hospital: ["生命に危険があれば現地の救急番号へ通報", "旅券・保険証券・服薬情報を準備", "通訳と前払い条件を確認", "診断書と領収書の原本を保管"],
      "police-report": ["発生場所・時刻・経緯を記録", "管轄警察署で届け出", "受理番号・印・担当者を確認", "保険・公館提出用の原本を保管"],
      scam: ["追加支払い・現金引き出しを直ちに停止", "領収書・チャット・車両番号を保存", "警察とカード会社へ連絡", "脅迫された場合は安全な場所へ移動"],
    },
    "zh-Hant": {
      "lost-passport": ["再次確認遺失地點及交通失物招領處", "向當地警方報失並取得案件編號與證明正本", `致電${missionName}確認旅行證件辦理要求`, "確認證件核發時間後再更改航班"],
      "lost-phone": ["使用尋找裝置功能定位並遠端鎖定", "立即停用SIM卡與金融應用程式", "向警方報案並取得案件編號", "憑IMEI、購買證明與報案證明申請保險"],
      "lost-wallet": ["立即凍結銀行卡與海外提款", "聯絡失物招領並回查移動路線", "取得警方報案證明", "向保險公司提交案件編號"],
      hospital: ["有生命危險時立即撥打當地急救電話", "準備護照、保險證明與用藥資訊", "確認翻譯服務與預付款要求", "保留診斷書與收據正本"],
      "police-report": ["記錄事發地點、時間與經過", "前往有管轄權的警署報案", "確認案件編號、印章與承辦人員", "保留供保險及主管機關使用的正本"],
      scam: ["立即停止繼續付款或提款", "保存收據、聊天紀錄、車牌與照片", "向警方及發卡銀行報案", "受到威脅時先前往安全地點"],
    },
    th: {
      "lost-passport": ["ตรวจสอบจุดที่ทำหายและศูนย์ของหายของระบบขนส่งอีกครั้ง", "แจ้งตำรวจและขอเอกสารฉบับจริงพร้อมเลขคดี", `โทรหา${missionName}เพื่อยืนยันขั้นตอนเอกสารเดินทางฉุกเฉิน`, "ยืนยันเวลาออกเอกสารก่อนเปลี่ยนเที่ยวบิน"],
      "lost-phone": ["ใช้ระบบค้นหาอุปกรณ์และล็อกจากระยะไกล", "ระงับซิมและแอปการเงินทันที", "แจ้งตำรวจและรับเลขคดี", "ยื่นประกันด้วย IMEI ใบเสร็จ และใบแจ้งความ"],
      "lost-wallet": ["ระงับบัตรและการถอนเงินต่างประเทศ", "ตรวจศูนย์ของหายและย้อนเส้นทาง", "ขอใบแจ้งความจากตำรวจ", "ส่งเลขคดีให้บริษัทประกัน"],
      hospital: ["กรณีอันตรายถึงชีวิตให้โทรฉุกเฉินในพื้นที่", "เตรียมหนังสือเดินทาง ประกัน และข้อมูลยา", "ยืนยันล่ามและเงื่อนไขมัดจำ", "เก็บใบวินิจฉัยและใบเสร็จฉบับจริง"],
      "police-report": ["จดสถานที่ เวลา และลำดับเหตุการณ์", "แจ้งสถานีตำรวจที่มีเขตอำนาจ", "ตรวจเลขคดี ตราประทับ และชื่อเจ้าหน้าที่", "เก็บต้นฉบับสำหรับประกันและงานกงสุล"],
      scam: ["หยุดชำระเงินหรือถอนเงินเพิ่มเติม", "เก็บใบเสร็จ แชต ทะเบียนรถ และรูปภาพ", "แจ้งตำรวจและผู้ออกบัตร", "หากถูกคุกคามให้ไปยังจุดปลอดภัยก่อน"],
    },
    vi: {
      "lost-passport": ["Kiểm tra lại nơi làm mất và bộ phận đồ thất lạc của phương tiện", "Trình báo cảnh sát và lấy bản gốc có số vụ việc", `Gọi ${missionName} để xác nhận thủ tục giấy tờ đi lại khẩn cấp`, "Xác nhận thời gian cấp trước khi đổi chuyến bay"],
      "lost-phone": ["Dùng tính năng tìm thiết bị và khóa từ xa", "Khóa SIM và ứng dụng tài chính ngay", "Trình báo cảnh sát và lấy số vụ việc", "Yêu cầu bảo hiểm bằng IMEI, hóa đơn và biên bản"],
      "lost-wallet": ["Khóa thẻ và giao dịch rút tiền ở nước ngoài", "Kiểm tra nơi thất lạc và lộ trình di chuyển", "Lấy biên bản cảnh sát", "Gửi số vụ việc cho công ty bảo hiểm"],
      hospital: ["Nếu nguy hiểm tính mạng, gọi số cấp cứu địa phương", "Chuẩn bị hộ chiếu, bảo hiểm và thông tin thuốc", "Xác nhận phiên dịch và yêu cầu đặt cọc", "Giữ bản gốc chẩn đoán và hóa đơn"],
      "police-report": ["Ghi địa điểm, thời gian và diễn biến", "Trình báo tại đồn cảnh sát có thẩm quyền", "Kiểm tra số vụ việc, con dấu và cán bộ phụ trách", "Giữ bản gốc cho bảo hiểm và lãnh sự"],
      scam: ["Ngừng thanh toán hoặc rút thêm tiền", "Lưu hóa đơn, tin nhắn, biển số xe và ảnh", "Báo cảnh sát và đơn vị phát hành thẻ", "Nếu bị đe dọa, ưu tiên đến nơi an toàn"],
    },
    en: {
      "lost-passport": ["Recheck the loss site and transport lost-and-found", "File with local police and obtain the original report with case number", `Call ${missionName} and confirm emergency-document requirements`, "Confirm issue timing before changing the flight"],
      "lost-phone": ["Locate and remotely lock the device", "Block the SIM and financial apps immediately", "Get a police report and case number", "Claim insurance with IMEI, receipt, and report"],
      "lost-wallet": ["Freeze cards and overseas cash withdrawals", "Check lost-and-found and retrace the route", "Obtain a police report", "Give the case number to the insurer"],
      hospital: ["Call the local emergency number for life-threatening symptoms", "Prepare passport, insurance certificate, and medication list", "Confirm interpretation and deposit requirements", "Keep original medical records and receipts"],
      "police-report": ["Write down the place, time, and sequence of events", "Report at the station with jurisdiction", "Confirm case number, stamp, and officer", "Keep the original for insurance and consular use"],
      scam: ["Stop further payment or cash withdrawal", "Save receipts, chats, vehicle number, and photos", "Report to police and card issuer", "Move to safety first if threatened"],
    },
  };
  return steps[language][incident];
}

function extendedLabels(language: CopyLanguage) {
  return ({
    ko: { docs: "필요 서류·증거", costs: "비용과 소요시간", phrase: "현지에서 보여줄 표현", faq: "자주 묻는 질문", report: "경찰 신고서·사건번호", identity: "신분·소유 증명", evidence: "사진·영수증·화면 캡처", insurance: "보험·결제 자료", free: "경찰 신고는 통상 무료", variable: "발급·진료·통신 비용은 공식기관에 확인", q1: "가장 먼저 무엇을 해야 하나요?", a1: "안전을 확보한 뒤 결제·통신·증거를 보존하고 관할 경찰의 사건번호를 받으세요.", q2: "공식기관 방문 전에 확인할 것은?", a2: "예약 여부, 접수 마감, 원본 서류, 사진 규격, 결제수단을 공식 웹사이트와 전화로 확인하세요." },
    "zh-Hans": { docs: "所需材料与证据", costs: "费用与处理时间", phrase: "可向当地人员出示的表达", faq: "常见问题", report: "警方证明与案件编号", identity: "身份或所有权证明", evidence: "照片、收据与截图", insurance: "保险与付款资料", free: "警方报案通常免费", variable: "证件、医疗或通信费用请向官方机构确认", q1: "第一步应该做什么？", a1: "先确保人身安全，停止付款或通信风险，保存证据并取得警方案件编号。", q2: "前往官方机构前要确认什么？", a2: "通过官方网站和电话确认预约、截止时间、原件、照片规格和付款方式。" },
    ja: { docs: "必要書類・証拠", costs: "費用と所要時間", phrase: "現地で見せる表現", faq: "よくある質問", report: "警察証明書・受理番号", identity: "本人・所有者確認書類", evidence: "写真・領収書・画面保存", insurance: "保険・決済資料", free: "警察への届出は通常無料", variable: "旅券・診療・通信費用は公式機関に確認", q1: "最初に何をすべきですか？", a1: "身の安全を確保し、決済・通信リスクを止め、証拠を保存して警察の受理番号を取得してください。", q2: "公的機関へ行く前の確認事項は？", a2: "予約、受付締切、原本、写真規格、支払方法を公式サイトと電話で確認してください。" },
    "zh-Hant": { docs: "所需文件與證據", costs: "費用與處理時間", phrase: "可向當地人員出示的說法", faq: "常見問題", report: "警方證明與案件編號", identity: "身分或所有權證明", evidence: "照片、收據與截圖", insurance: "保險與付款資料", free: "警方報案通常免費", variable: "證件、醫療或通訊費用請向官方機構確認", q1: "第一步應該做什麼？", a1: "先確保人身安全，停止付款或通訊風險，保存證據並取得警方案件編號。", q2: "前往官方機構前要確認什麼？", a2: "透過官方網站與電話確認預約、截止時間、正本、照片規格及付款方式。" },
    th: { docs: "เอกสารและหลักฐานที่ต้องใช้", costs: "ค่าใช้จ่ายและระยะเวลา", phrase: "ประโยคสำหรับแสดงให้เจ้าหน้าที่ท้องถิ่น", faq: "คำถามที่พบบ่อย", report: "ใบแจ้งความและเลขคดี", identity: "หลักฐานยืนยันตัวตนหรือความเป็นเจ้าของ", evidence: "รูปภาพ ใบเสร็จ และภาพหน้าจอ", insurance: "เอกสารประกันและการชำระเงิน", free: "โดยทั่วไปการแจ้งตำรวจไม่มีค่าใช้จ่าย", variable: "ตรวจสอบค่าธรรมเนียมเอกสาร การแพทย์ หรือโทรคมนาคมกับหน่วยงานทางการ", q1: "ควรทำอะไรเป็นอันดับแรก?", a1: "ไปยังที่ปลอดภัย หยุดความเสี่ยงด้านการชำระเงินหรือบัญชี เก็บหลักฐาน และขอเลขคดีจากตำรวจ", q2: "ควรยืนยันอะไรบ้างก่อนไปหน่วยงาน?", a2: "ตรวจสอบการนัดหมาย เวลาปิดรับ เอกสารต้นฉบับ รูปถ่าย และวิธีชำระเงินจากเว็บไซต์และโทรศัพท์" },
    vi: { docs: "Giấy tờ và bằng chứng cần thiết", costs: "Chi phí và thời gian xử lý", phrase: "Câu để đưa cho người địa phương", faq: "Câu hỏi thường gặp", report: "Biên bản cảnh sát và số vụ việc", identity: "Bằng chứng danh tính hoặc quyền sở hữu", evidence: "Ảnh, hóa đơn và ảnh chụp màn hình", insurance: "Hồ sơ bảo hiểm và thanh toán", free: "Trình báo cảnh sát thường miễn phí", variable: "Xác nhận phí giấy tờ, y tế hoặc viễn thông với đơn vị chính thức", q1: "Việc đầu tiên cần làm là gì?", a1: "Đến nơi an toàn, ngăn rủi ro thanh toán hoặc tài khoản, lưu bằng chứng và lấy số vụ việc của cảnh sát.", q2: "Cần xác nhận gì trước khi đến cơ quan?", a2: "Kiểm tra lịch hẹn, giờ ngừng tiếp nhận, bản gốc, quy cách ảnh và cách thanh toán trên trang chính thức và qua điện thoại." },
    en: { docs: "Required documents and evidence", costs: "Costs and timing", phrase: "Phrase to show locally", faq: "Frequently asked questions", report: "Police report and case number", identity: "Identity or ownership evidence", evidence: "Photos, receipts, and screenshots", insurance: "Insurance and payment records", free: "Police reports are normally free", variable: "Confirm document, medical, or telecom fees with the official provider", q1: "What should I do first?", a1: "Get to safety, stop payment or account risks, preserve evidence, and obtain a police case number.", q2: "What should I confirm before visiting an authority?", a2: "Check appointments, intake cutoff, originals, photo specifications, and payment method on the official site and by phone." },
  } as const)[language];
}

function passportDocuments(traveler: TravelerCode, language: CopyLanguage): string[] {
  const national: Partial<Record<TravelerCode, string>> = {
    cn: "中国领事APP申请记录、国籍与身份材料、证件照片、行程证明",
    us: "Forms DS-11 and DS-64, passport photo, citizenship evidence, photo ID, itinerary",
    jp: "紛失一般旅券等届出書、警察証明、写真、本人確認・国籍資料、旅程表",
    tw: "護照遺失申報、警方證明、照片、身分與國籍資料、行程證明",
    au: "Passport application and B11 declaration, photos, citizenship/identity evidence, police report, itinerary",
    gb: "Emergency Travel Document online application, digital photo, itinerary, identity details, local police report when required",
    ca: "PPTC 203 declaration, passport application, citizenship and ID evidence, photos, itinerary",
    th: "แบบคำร้องหนังสือเดินทาง เอกสารยืนยันสัญชาติและตัวตน ใบแจ้งความ รูปถ่าย และกำหนดการเดินทาง",
    vn: "Tờ khai báo mất hộ chiếu, giấy xác nhận của cảnh sát, giấy tờ quốc tịch và nhân thân, ảnh và lịch trình",
  };
  if (traveler === "kr") return ["경찰 분실신고서 원본", "여권 사진", "신분증·여권 사본", "변경된 항공 일정"];
  const specific = national[traveler];
  const common = {
    "zh-Hans": ["警方报失证明原件", specific ?? "身份与国籍材料", "证件照片", "航班与旅行计划"],
    ja: ["警察の紛失届証明原本", specific ?? "本人・国籍確認書類", "旅券用写真", "航空便・旅程資料"],
    "zh-Hant": ["警方遺失證明正本", specific ?? "身分與國籍資料", "證件照片", "航班與行程證明"],
    th: ["ใบแจ้งความฉบับจริง", specific ?? "หลักฐานสัญชาติและตัวตน", "รูปถ่ายหนังสือเดินทาง", "กำหนดการเดินทาง"],
    vi: ["Bản gốc giấy xác nhận mất của cảnh sát", specific ?? "Giấy tờ quốc tịch và nhân thân", "Ảnh hộ chiếu", "Lịch trình chuyến bay"],
    en: ["Original police loss report", specific ?? "Identity and nationality evidence", "Passport photos", "Flight itinerary"],
    ko: ["경찰 분실신고서 원본", specific ?? "신분·국적 자료", "여권 사진", "항공 일정"],
  } as const;
  return [...common[language]];
}

function requirementRows(traveler: TravelerCode, incident: IncidentType, language: CopyLanguage) {
  const labels = extendedLabels(language);
  if (incident === "lost-passport") return passportDocuments(traveler, language);
  return [labels.report, labels.identity, labels.evidence, labels.insurance];
}

function reviewPatterns(language: CopyLanguage, incident: IncidentType, city: string): string[] {
  const patterns: Record<CopyLanguage, Record<IncidentType, string[]>> = {
    ko: {
      "lost-passport": [`${city} 후기에서는 경찰 신고 전에 호텔·역·공항 분실물 센터를 확인해 여권을 되찾은 사례가 있습니다.`, "여권 분실신고서에 사건번호나 관할 서명이 없어 공관 접수가 지연됐다는 사례가 반복됩니다.", "공관 접수 마감과 사진 규격을 전화로 확인하지 않아 다음 날 다시 방문했다는 후기가 있습니다."],
      "lost-phone": [`${city}에서 ‘기기 찾기’로 위치를 확인한 뒤 원격 잠금해 회수하거나 추가 피해를 막았다는 후기가 있습니다.`, "SIM 정지를 늦춰 문자 인증과 금융앱 위험이 커졌다는 사례가 있어 통신사 차단을 최우선으로 권합니다.", "보험 청구 때 IMEI·구매 영수증·경찰 사건번호를 요구받았다는 경험이 반복됩니다."],
      "lost-wallet": [`${city} 후기에서는 카드사 앱으로 해외결제와 현금 인출을 먼저 막은 뒤 동선을 역추적한 경우가 많습니다.`, "경찰 신고서에 분실 카드와 현금 금액이 빠져 보험 보완 요청을 받았다는 사례가 있습니다.", "ATM 부정사용 의심 시 카드사 이의제기와 경찰 사건번호를 함께 제출해 환급받았다는 후기가 있습니다."],
      hospital: [`${city} 사립·국제병원 후기에서는 접수 전에 보험사에 연락해 제휴병원과 직접청구 가능 여부를 확인했습니다.`, "여권·보험증서·카드를 요구하고 진료 단계마다 보증금이나 선결제를 받았다는 경험이 많습니다.", "귀국 후 보험 청구를 위해 영문 진단서와 항목별 영수증 원본을 요청해야 했다는 후기가 반복됩니다."],
      "police-report": [`${city}에서는 사건 발생지 관할 경찰서를 다시 찾아가야 했다는 후기가 있어 위치를 먼저 확인하는 편이 안전합니다.`, "보험 제출용 문서에 사건번호·도장·담당자 정보가 없으면 재방문하게 된다는 사례가 많습니다.", "가게 주소·CCTV 위치·차량번호·사진을 준비하니 신고 접수가 빨랐다는 경험이 있습니다."],
      scam: [`${city} 후기에서는 바 호객, 택시 우회, 환전·ATM 또는 투어 추가요금처럼 처음 안내와 다른 결제를 요구한 사례가 보고됩니다.`, "현장에서 논쟁하기보다 안전한 곳으로 이동해 영수증·채팅·차량번호를 저장한 경우 카드 분쟁에 도움이 됐습니다.", "현금 추가지급을 중단하고 즉시 카드사와 경찰에 신고해야 후속 결제 피해를 줄였다는 후기가 많습니다."],
    },
    "zh-Hans": {
      "lost-passport": [`${city}旅客报告中，有人在报警前联系酒店、车站或机场失物招领处找回护照。`, "报失证明缺少案件编号或辖区签字，导致主管机构不受理或延误的情况反复出现。", "未提前电话确认受理截止时间和照片规格，次日再次前往的经历较多。"],
      "lost-phone": [`在${city}，旅客使用“查找设备”定位并远程锁定后找回手机或阻止进一步损失。`, "延迟停用SIM卡会增加短信验证码和金融应用风险，因此应优先联系运营商。", "保险理赔通常要求IMEI、购买凭证和警方案件编号。"],
      "lost-wallet": [`${city}旅客通常先通过发卡行应用冻结境外支付和取现，再回查行动路线。`, "报案证明未列明银行卡和现金金额时，保险公司常要求补充材料。", "怀疑ATM盗刷时，同时提交银行卡争议和警方案件编号后成功退款的案例较多。"],
      hospital: [`${city}私立或国际医院的经历显示，就诊前联系保险公司确认合作医院和直付最有效。`, "登记时常要求护照、保险和银行卡，并可能在各治疗阶段收取押金或预付款。", "回国理赔通常需要英文诊断书和分项收据原件。"],
      "police-report": [`${city}有旅客因前往错误辖区而被要求到事发地所属警署重新报案。`, "保险文件缺少案件编号、印章或承办人员信息时，往往需要再次前往警署。", "准备店铺地址、监控位置、车牌和照片后，报案处理更快。"],
      scam: [`${city}旅客报告包括酒吧招揽、出租车绕路、换汇或ATM以及旅游项目临时加价。`, "先离开现场并保存收据、聊天和车牌，比继续争执更有利于后续银行卡争议。", "立即停止继续付款并联系发卡行和警方，可减少后续扣款损失。"],
    },
    ja: {
      "lost-passport": [`${city}では、警察へ届ける前にホテル・駅・空港の遺失物窓口へ連絡して旅券が見つかった事例があります。`, "紛失届に受理番号や管轄署の署名がなく、担当機関での手続きが遅れた例が繰り返されています。", "受付締切と写真規格を電話確認せず、翌日に再訪したという体験談があります。"],
      "lost-phone": [`${city}で端末検索と遠隔ロックを行い、回収または追加被害を防いだ報告があります。`, "SIM停止が遅れてSMS認証や金融アプリの危険が増えた例があり、通信会社への連絡が最優先です。", "保険請求ではIMEI・購入証明・警察の受理番号を求められた例が多くあります。"],
      "lost-wallet": [`${city}ではカードアプリで海外決済と出金を止めてから移動経路を確認した例が多くあります。`, "届出書にカードや現金額が記載されず、保険会社から補足を求められた事例があります。", "ATM不正利用ではカード会社の異議申立てと警察の受理番号を併せて提出した報告があります。"],
      hospital: [`${city}の私立・国際病院では、受診前に保険会社へ提携先とキャッシュレス診療を確認した例が多くあります。`, "受付で旅券・保険証券・カードを求められ、診療ごとに保証金や前払いが必要だったという報告があります。", "帰国後の請求には英文診断書と明細付き領収書の原本が必要だった例が繰り返されています。"],
      "police-report": [`${city}では発生場所の管轄外へ行き、別の警察署へ案内された体験談があります。`, "受理番号・印・担当者情報がない書類は保険に使えず、再訪した例が多くあります。", "店舗住所・防犯カメラ位置・車両番号・写真を準備すると届出が早かったという報告があります。"],
      scam: [`${city}ではバーの客引き、タクシーの遠回り、両替・ATM、ツアー追加料金の報告があります。`, "現場を離れて領収書・チャット・車両番号を保存したことがカード紛争に役立った例があります。", "追加支払いを止め、カード会社と警察へ直ちに連絡して二次被害を抑えた報告があります。"],
    },
    "zh-Hant": {
      "lost-passport": [`${city}旅客回報中，有人在報警前聯絡飯店、車站或機場失物招領處找回護照。`, "遺失證明缺少案件編號或轄區簽章，導致主管機關延誤受理的情況反覆出現。", "未先電話確認受理截止時間與照片規格，隔日再次前往的經驗不少。"],
      "lost-phone": [`在${city}使用尋找裝置與遠端鎖定後找回手機或阻止後續損失的回報不少。`, "延遲停用SIM卡會增加簡訊驗證與金融App風險，因此應優先聯絡電信商。", "保險理賠常要求IMEI、購買證明及警方案件編號。"],
      "lost-wallet": [`${city}旅客多先用發卡銀行App凍結海外交易與提款，再回查移動路線。`, "報案證明未列明卡片與現金金額時，保險公司常要求補件。", "疑似ATM盜刷時，同時提交信用卡爭議與警方案件編號後獲得退款的案例較多。"],
      hospital: [`${city}私立或國際醫院經驗顯示，就診前聯絡保險公司確認合作醫院與直接理賠最有效。`, "掛號時常要求護照、保險與信用卡，並可能在各治療階段收取押金或預付款。", "返國理賠通常需要英文診斷書與分項收據正本。"],
      "police-report": [`${city}有旅客因前往錯誤轄區，被要求到事發地所屬警署重新報案。`, "保險文件缺少案件編號、印章或承辦人資訊時，往往必須再次前往警署。", "準備店家地址、監視器位置、車牌與照片後，報案處理更快。"],
      scam: [`${city}旅客回報包括酒吧攬客、計程車繞路、換匯或ATM，以及旅遊項目臨時加價。`, "先離開現場並保存收據、對話與車牌，比繼續爭執更有利於後續信用卡爭議。", "立即停止付款並聯絡發卡銀行與警方，可減少後續扣款損失。"],
    },
    th: {
      "lost-passport": [`รีวิวใน${city}มีกรณีพบหนังสือเดินทางหลังติดต่อโรงแรม สถานี หรือศูนย์ของหายสนามบินก่อนแจ้งตำรวจ`, "เอกสารแจ้งหายที่ไม่มีเลขคดีหรือลายเซ็นเขตอำนาจทำให้การยื่นกับหน่วยงานล่าช้า", "ผู้เดินทางบางรายต้องกลับมาอีกวันเพราะไม่ได้โทรยืนยันเวลาปิดรับและขนาดรูปถ่าย"],
      "lost-phone": [`ใน${city}มีผู้ใช้ระบบค้นหาและล็อกระยะไกลจนได้โทรศัพท์คืนหรือหยุดความเสียหายเพิ่มเติม`, "การระงับ SIM ล่าช้าเพิ่มความเสี่ยง SMS และแอปการเงิน จึงควรโทรหาผู้ให้บริการก่อน", "การเคลมประกันมักต้องใช้ IMEI หลักฐานซื้อ และเลขคดีตำรวจ"],
      "lost-wallet": [`นักเดินทางใน${city}มักระงับการใช้บัตรและถอนเงินต่างประเทศผ่านแอปก่อนย้อนเส้นทาง`, "หากใบแจ้งความไม่ระบุบัตรและจำนวนเงินสด บริษัทประกันมักขอเอกสารเพิ่ม", "กรณีสงสัย ATM มีการยื่นข้อพิพาทบัตรพร้อมเลขคดีและได้รับเงินคืน"],
      hospital: [`รีวิวโรงพยาบาลเอกชนและนานาชาติใน${city}แนะนำให้โทรหาประกันเพื่อยืนยันโรงพยาบาลคู่สัญญาและ direct billing ก่อน`, "จุดลงทะเบียนมักขอหนังสือเดินทาง ประกัน และบัตร พร้อมเรียกมัดจำหรือชำระล่วงหน้า", "การเคลมหลังกลับประเทศต้องใช้ใบวินิจฉัยภาษาอังกฤษและใบเสร็จแยกรายการฉบับจริง"],
      "police-report": [`ใน${city}มีผู้ไปผิดเขตและถูกส่งต่อไปสถานีที่รับผิดชอบจุดเกิดเหตุ`, "เอกสารที่ไม่มีเลขคดี ตราประทับ หรือชื่อเจ้าหน้าที่มักใช้เคลมไม่ได้และต้องกลับไปใหม่", "การเตรียมที่อยู่ร้าน จุดกล้องวงจรปิด ทะเบียนรถ และรูปภาพช่วยให้รับแจ้งเร็วขึ้น"],
      scam: [`รีวิวใน${city}กล่าวถึงการชวนเข้าบาร์ แท็กซี่อ้อม การแลกเงินหรือATM และค่าใช้จ่ายทัวร์ที่เพิ่มภายหลัง`, "การออกจากจุดเกิดเหตุแล้วเก็บใบเสร็จ แชต และทะเบียนรถช่วยในการโต้แย้งรายการบัตร", "การหยุดจ่ายและติดต่อผู้ออกบัตรกับตำรวจทันทีช่วยลดการตัดเงินต่อเนื่อง"],
    },
    vi: {
      "lost-passport": [`Tại ${city}, có người tìm lại hộ chiếu sau khi hỏi khách sạn, nhà ga hoặc bộ phận thất lạc sân bay trước khi báo cảnh sát.`, "Giấy báo mất thiếu số vụ việc hoặc xác nhận đúng thẩm quyền đã làm chậm thủ tục tại cơ quan đại diện.", "Một số du khách phải quay lại hôm sau vì không gọi xác nhận giờ ngừng tiếp nhận và quy cách ảnh."],
      "lost-phone": [`Tại ${city}, tính năng tìm thiết bị và khóa từ xa đã giúp thu hồi điện thoại hoặc ngăn thiệt hại tiếp theo.`, "Chậm khóa SIM làm tăng rủi ro SMS và ứng dụng tài chính, vì vậy cần liên hệ nhà mạng trước.", "Hồ sơ bảo hiểm thường yêu cầu IMEI, chứng từ mua và số vụ việc của cảnh sát."],
      "lost-wallet": [`Du khách tại ${city} thường khóa thanh toán và rút tiền quốc tế trên ứng dụng trước khi kiểm tra lại lộ trình.`, "Nếu biên bản không liệt kê thẻ và số tiền mặt, công ty bảo hiểm thường yêu cầu bổ sung.", "Khi nghi ngờ giao dịch ATM, việc nộp khiếu nại thẻ cùng số vụ việc đã giúp hoàn tiền trong nhiều trường hợp."],
      hospital: [`Trải nghiệm tại bệnh viện tư hoặc quốc tế ở ${city} cho thấy nên gọi bảo hiểm để xác nhận bệnh viện liên kết và thanh toán trực tiếp.`, "Quầy tiếp nhận thường yêu cầu hộ chiếu, bảo hiểm, thẻ và có thể thu đặt cọc hoặc trả trước từng bước.", "Yêu cầu bồi thường sau khi về nước thường cần chẩn đoán tiếng Anh và hóa đơn chi tiết bản gốc."],
      "police-report": [`Tại ${city}, có du khách đến sai địa bàn và phải chuyển sang đồn phụ trách nơi xảy ra vụ việc.`, "Giấy tờ thiếu số vụ việc, con dấu hoặc thông tin cán bộ thường không dùng được cho bảo hiểm và phải quay lại.", "Chuẩn bị địa chỉ cửa hàng, vị trí camera, biển số xe và ảnh giúp việc tiếp nhận nhanh hơn."],
      scam: [`Tại ${city}, du khách báo cáo về mời chào vào quán bar, taxi đi vòng, đổi tiền hoặc ATM và phụ phí tour phát sinh.`, "Rời khỏi hiện trường và lưu hóa đơn, tin nhắn, biển số xe hữu ích hơn cho khiếu nại thẻ.", "Ngừng trả thêm và liên hệ ngay đơn vị phát hành thẻ cùng cảnh sát giúp giảm thiệt hại tiếp theo."],
    },
    en: {
      "lost-passport": [`In ${city}, travelers report recovering passports after checking hotels, stations, or airport lost-and-found before filing with police.`, "Reports without a case number or jurisdiction signature repeatedly delayed consular processing.", "Travelers who did not confirm intake cutoffs and photo rules by phone often had to return the next day."],
      "lost-phone": [`In ${city}, Find My and remote lock helped recover phones or prevent follow-on loss.`, "Delaying the SIM block increased SMS and banking-app risk, so travelers recommend calling the carrier first.", "Insurance claims repeatedly required the IMEI, purchase receipt, and police case number."],
      "lost-wallet": [`Travelers in ${city} commonly froze overseas payments and ATM withdrawals before retracing their route.`, "Insurers asked for corrections when police reports omitted the cards or amount of cash lost.", "For suspected ATM misuse, travelers paired a card dispute with the police case number and reported successful refunds."],
      hospital: [`Private and international hospital reports in ${city} recommend calling the insurer first to confirm direct billing.`, "Registration often required a passport, insurance certificate, card, and a deposit or staged prepayment.", "Travelers repeatedly needed an English diagnosis and itemized original receipts for claims after returning home."],
      "police-report": [`In ${city}, travelers who visited the wrong jurisdiction were redirected to the station covering the incident location.`, "Documents without a case number, stamp, or officer details often required a second police visit.", "Bringing the shop address, CCTV location, vehicle number, and photos made reports faster."],
      scam: [`Reports in ${city} include bar touts, taxi detours, exchange or ATM issues, and tour charges that changed after booking.`, "Leaving the scene and saving receipts, chats, and vehicle numbers helped later card disputes.", "Stopping further payment and contacting the issuer and police immediately reduced follow-on charges."],
    },
  };
  return patterns[language][incident];
}

function completionSteps(incident: IncidentType, language: CopyLanguage): string[] {
  const byLanguage: Record<CopyLanguage, Record<IncidentType, string[]>> = {
    ko: {
      "lost-passport": ["필요 서류와 사진을 준비해 긴급여권·여행증명서 신청", "수령 후 항공사와 입국요건을 다시 확인"],
      "lost-phone": ["임시 SIM·eSIM과 대체 기기를 준비", "계정 접속 기록을 확인하고 보험 청구"],
      "lost-wallet": ["비상 현금·대체 결제수단 확보", "부정결제를 모니터링하고 보험·카드 분쟁 접수"],
      hospital: ["보험사와 본국 지원기관에 진료 내용을 공유", "퇴원 후 진단서·영수증으로 보험 청구"],
      "police-report": ["원본과 사본·번역본을 각각 보관", "보험사·공관·카드사에 제출하고 사건 진행 확인"],
      scam: ["카드 결제 취소·차지백 가능 여부 확인", "계정과 거래를 모니터링하고 추가 피해 신고"],
    },
    "zh-Hans": {
      "lost-passport": ["准备材料和照片，申请旅行证或紧急旅行证件", "领取后再次向航空公司确认登机和入境要求"],
      "lost-phone": ["办理临时SIM或eSIM并准备备用设备", "检查账户登录记录并提交保险理赔"],
      "lost-wallet": ["准备应急现金或替代付款方式", "持续监控盗刷并提交保险或银行卡争议"],
      hospital: ["向保险公司和本国支援机构通报就诊情况", "出院后凭诊断书和收据申请理赔"],
      "police-report": ["分别保存证明正本、复印件和翻译件", "提交给保险、主管机构或发卡行并追踪案件"],
      scam: ["确认撤销交易或拒付的可行性", "监控账户与交易并报告后续损失"],
    },
    ja: {
      "lost-passport": ["必要書類と写真を準備し、緊急旅券・帰国用渡航書を申請", "受領後に航空会社と入国条件を再確認"],
      "lost-phone": ["一時SIM・eSIMと代替端末を準備", "アカウント履歴を確認し保険請求"],
      "lost-wallet": ["緊急現金または代替決済手段を確保", "不正利用を監視し保険・カード紛争を申請"],
      hospital: ["保険会社と本国支援機関へ受診内容を共有", "退院後に診断書と領収書で保険請求"],
      "police-report": ["原本・写し・翻訳を分けて保管", "保険会社・公館・カード会社へ提出し進捗確認"],
      scam: ["決済取消し・チャージバックの可否を確認", "口座と取引を監視し追加被害を届け出"],
    },
    "zh-Hant": {
      "lost-passport": ["準備文件與照片，申請緊急護照或返國旅行文件", "領取後再次向航空公司確認登機與入境要求"],
      "lost-phone": ["辦理臨時SIM或eSIM並準備替代裝置", "檢查帳戶登入紀錄並申請保險理賠"],
      "lost-wallet": ["準備緊急現金或替代付款方式", "持續監控盜刷並提出保險或信用卡爭議"],
      hospital: ["向保險公司及本國支援機構通報就診情況", "出院後憑診斷書與收據申請理賠"],
      "police-report": ["分別保存證明正本、影本與翻譯", "提交保險、主管機關或發卡銀行並追蹤案件"],
      scam: ["確認取消交易或拒付的可行性", "監控帳戶與交易並通報後續損失"],
    },
    th: {
      "lost-passport": ["เตรียมเอกสารและรูปถ่ายเพื่อขอเอกสารเดินทางฉุกเฉิน", "หลังรับเอกสารให้ยืนยันเงื่อนไขขึ้นเครื่องและเข้าเมืองกับสายการบิน"],
      "lost-phone": ["เตรียม SIM/eSIM ชั่วคราวและเครื่องสำรอง", "ตรวจประวัติการเข้าใช้บัญชีและยื่นเคลมประกัน"],
      "lost-wallet": ["จัดหาเงินฉุกเฉินหรือวิธีชำระเงินอื่น", "เฝ้าระวังรายการผิดปกติและยื่นข้อพิพาทกับบัตรหรือประกัน"],
      hospital: ["แจ้งบริษัทประกันและหน่วยงานช่วยเหลือของไทย", "ใช้ใบวินิจฉัยและใบเสร็จต้นฉบับยื่นเคลมหลังออกจากโรงพยาบาล"],
      "police-report": ["เก็บต้นฉบับ สำเนา และคำแปลแยกกัน", "ส่งให้ประกัน สถานทูต หรือผู้ออกบัตรและติดตามคดี"],
      scam: ["สอบถามการยกเลิกรายการหรือ chargeback", "ติดตามบัญชีและแจ้งความเสียหายที่เกิดตามมา"],
    },
    vi: {
      "lost-passport": ["Chuẩn bị giấy tờ và ảnh để xin giấy tờ đi lại khẩn cấp", "Sau khi nhận, xác nhận lại điều kiện lên máy bay và nhập cảnh với hãng bay"],
      "lost-phone": ["Chuẩn bị SIM/eSIM tạm thời và thiết bị thay thế", "Kiểm tra lịch sử truy cập tài khoản và nộp hồ sơ bảo hiểm"],
      "lost-wallet": ["Chuẩn bị tiền mặt khẩn cấp hoặc phương thức thanh toán khác", "Theo dõi giao dịch trái phép và khiếu nại với bảo hiểm hoặc thẻ"],
      hospital: ["Thông báo tình hình điều trị cho bảo hiểm và cơ quan hỗ trợ Việt Nam", "Dùng chẩn đoán và hóa đơn gốc để yêu cầu bồi thường sau khi xuất viện"],
      "police-report": ["Giữ riêng bản gốc, bản sao và bản dịch", "Nộp cho bảo hiểm, cơ quan đại diện hoặc đơn vị phát hành và theo dõi vụ việc"],
      scam: ["Hỏi về hủy giao dịch hoặc chargeback", "Theo dõi tài khoản và báo cáo thiệt hại phát sinh"],
    },
    en: {
      "lost-passport": ["Prepare documents and photos, then apply for the nationality-specific emergency document", "After collection, reconfirm boarding and entry rules with the airline"],
      "lost-phone": ["Arrange a temporary SIM/eSIM and replacement device", "Review account access and submit the insurance claim"],
      "lost-wallet": ["Secure emergency cash or another payment method", "Monitor unauthorized charges and file insurance or card disputes"],
      hospital: ["Update the insurer and your national assistance service", "Claim with the discharge record, diagnosis, and original receipts"],
      "police-report": ["Keep the original, copies, and any translation separately", "Submit to insurer, mission, or issuer and track the case"],
      scam: ["Ask the issuer about cancellation or chargeback", "Monitor accounts and report any follow-on loss"],
    },
  };
  return byLanguage[language][incident];
}

function generateGuide(traveler: TravelerCode, country: DestinationCode, city: string, incident: IncidentType): string {
  const profile = travelerProfiles.find((item) => item.code === traveler)!;
  const language = languageFor(traveler);
  const ui = copy[language];
  const mission = getTravelerMissionSource(traveler, country)!;
  const cityData = getCityData(country, city);
  const cityName = cityNames[city][language];
  const countryName = destinationNames[country][language];
  const incidentName = incidentNames[incident][language];
  const emergency = incident === "hospital"
    ? ({ "south-korea": "119", japan: "119", thailand: "1669", vietnam: "115", taiwan: "119", philippines: "911" } as const)[country]
    : cityData.emergency.number;
  const steps = [
    ...incidentSteps(incident, language, mission.officialName),
    ...completionSteps(incident, language),
  ];
  const meta = localizedMeta(language, profile.nativeName, countryName, cityName, incidentName);
  const title = meta.title;
  const summary = meta.summary;
  const hospital = cityData.hospitals?.[0];
  const extended = extendedLabels(language);
  const requirements = requirementRows(traveler, incident, language);
  const translatedReviews = reviewPatterns(language, incident, cityName);
  const phrase = localPhraseBlock(language === "ko" ? "ko" : "en", country, incident) ?? fallbackPhrase(country);
  const table = ({
    ko: ["항목", "안내", "경찰", "담당기관·서비스", "추가 여행비", "보험 청구를 위해 모든 영수증을 보관하세요"],
    "zh-Hans": ["项目", "说明", "警方", "主管机构或服务商", "额外旅行费用", "保留全部收据以便申请保险理赔"],
    ja: ["項目", "案内", "警察", "担当機関・事業者", "追加の旅行費用", "保険請求のため領収書をすべて保管してください"],
    "zh-Hant": ["項目", "說明", "警方", "主管機構或服務商", "額外旅費", "保留所有收據以申請保險理賠"],
    th: ["รายการ", "คำแนะนำ", "ตำรวจ", "หน่วยงานหรือผู้ให้บริการ", "ค่าเดินทางเพิ่มเติม", "เก็บใบเสร็จทั้งหมดเพื่อยื่นประกัน"],
    vi: ["Hạng mục", "Hướng dẫn", "Cảnh sát", "Cơ quan hoặc nhà cung cấp", "Chi phí đi lại phát sinh", "Giữ mọi hóa đơn để yêu cầu bảo hiểm"],
    en: ["Item", "Guidance", "Police", "Authority / provider", "Extra travel cost", "Keep every receipt for insurance"],
  } as const)[language];
  const reviewSources = ({ ko: ["여행자 후기 · Reddit", "경찰·보험 사례", "영사·서비스 제공기관 사례"], "zh-Hans": ["旅客报告 · Reddit", "警方与保险案例", "领事及服务机构案例"], ja: ["旅行者報告・Reddit", "警察・保険事例", "領事・事業者事例"], "zh-Hant": ["旅客報告 · Reddit", "警方與保險案例", "領事及服務機構案例"], th: ["รีวิวนักเดินทาง · Reddit", "กรณีตำรวจและประกัน", "กรณีกงสุลและผู้ให้บริการ"], vi: ["Trải nghiệm du khách · Reddit", "Trường hợp cảnh sát và bảo hiểm", "Trường hợp lãnh sự và nhà cung cấp"], en: ["Traveler reports · Reddit", "Police and insurance reports", "Consular and provider reports"] } as const)[language];
  const reviews = translatedReviews.map((text, index) => ({
    text,
    source: reviewSources[index],
  }));
  const communitySource = ({ ko: "여행자 커뮤니티 후기", "zh-Hans": "旅客社区报告", ja: "旅行者コミュニティ報告", "zh-Hant": "旅客社群報告", th: "รายงานจากชุมชนนักเดินทาง", vi: "Báo cáo từ cộng đồng du khách", en: "Traveler community reports" } as const)[language];
  const reviewUrl = `https://www.reddit.com/r/${reviewCommunities[country]}/search/?q=${encodeURIComponent(incidentNames[incident].en)}&restrict_sr=1`;

  return `---
title: "${esc(title)}"
summary: "${esc(summary)}"
publishedAt: "2026-06-22"
updatedAt: "2026-06-22"
estimatedCost: "${meta.cost}"
estimatedTime: "${meta.time}"
emergencyNumber: "${emergency}"
---

<EmergencyBanner number="${emergency}" label="${esc(cityData.emergency.label.en)}" />

<ReviewNote label="📌 ${esc(ui.source)}" source="${esc(mission.officialName)}" url="${mission.officialUrl}">
  ${ui.sourceNote}
</ReviewNote>

<ReviewNote label="💬 ${esc(ui.reviews)}" source="${communitySource}" url="${reviewUrl}">
  ${ui.reviewText}
</ReviewNote>

## ${ui.timeline}

<TimelineGroup title="${esc(title)}">
${steps.map((step, index) => `<TimelineStep time="${index + 1}" action="${esc(step)}" />`).join("\n")}
</TimelineGroup>

## ${ui.now}

<ActionGroup>
${steps.map((step, index) => `<ActionStep n="${index + 1}" title="${esc(step)}" detail="${esc(step)}"${index === 0 ? ' urgent="true"' : ""} />`).join("\n")}
</ActionGroup>

<Callout variant="warning" title="${esc(ui.warning)}">
  ${ui.warningBody}
</Callout>

## ${extended.docs}

<InfoRows>
${requirements.map((item, index) => `<InfoRow label="${index + 1}" value="${esc(item)}" />`).join("\n")}
</InfoRows>

## ${extended.costs}

| ${table[0]} | ${table[1]} |
|---|---|
| ${table[2]} | ${extended.free} |
| ${table[3]} | ${extended.variable} |
| ${table[4]} | ${table[5]} | 

## ${extended.phrase}

${phrase}

## ${ui.mission}

<ContactCard
  name="${esc(mission.officialName)}"
  phone="${profile.consularHotline}"
  website="${mission.officialUrl}"
  note="${esc(ui.sourceNote)}"
/>

<GoogleMap query="${esc(`${mission.officialName} ${cityName} ${countryName}`)}" title="${esc(mission.officialName)}" />

## ${ui.police}

${cityData.police.map((station) => `<ContactCard
  name="${esc(language === "ko" ? station.name.ko : safeEnglish(station.name.en, "Local police station"))}"
  address="${esc(language === "ko" ? station.address?.ko ?? "" : safeEnglish(station.address?.en, ""))}" 
  phone="${station.phone ?? emergency}"
  note="${esc(station.note?.en ?? "")}" 
/>

<GoogleMap query="${esc(station.mapQuery)}" title="${esc(language === "ko" ? station.name.ko : safeEnglish(station.name.en, "Local police station"))}" />`).join("\n\n")}
${hospital ? `
## ${ui.hospital}

<ContactCard
  name="${esc(language === "ko" ? hospital.name.ko : safeEnglish(hospital.name.en, "Local medical provider"))}"
  address="${esc(language === "ko" ? hospital.address?.ko ?? "" : safeEnglish(hospital.address?.en, ""))}" 
  phone="${hospital.phone ?? emergency}"
  website="${hospital.website ?? ""}"
/>

<GoogleMap query="${esc(hospital.mapQuery)}" title="${esc(language === "ko" ? hospital.name.ko : safeEnglish(hospital.name.en, "Local medical provider"))}" />
` : ""}

## ${ui.reviews}

<ReviewQuotes title="${esc(ui.reviews)}">
${reviews.map((review) => `<ReviewQuoteRow text="${esc(review.text)}" source="${esc(review.source)}" />`).join("\n")}
</ReviewQuotes>

## ${extended.faq}

<FaqItem question="${esc(extended.q1)}">
  ${extended.a1}
</FaqItem>

<FaqItem question="${esc(extended.q2)}">
  ${extended.a2}
</FaqItem>`;
}

let generated = 0;
for (const profile of travelerProfiles) {
  for (const country of travelerDestinations) {
    for (const city of country.cities) {
      for (const incident of incidentTypes) {
        const target = path.join(contentDir, profile.code, country.slug, city.slug, `${incident}.mdx`);
        fs.mkdirSync(path.dirname(target), { recursive: true });

        if (profile.code === "kr" && country.slug !== "south-korea") {
          const source = path.join(contentDir, "ko", country.slug, city.slug, `${incident}.mdx`);
          let raw = fs.readFileSync(source, "utf8");
          if (!/https:\/\/(?:overseas\.mofa\.go\.kr|www\.0404\.go\.kr)/.test(raw)) {
            const mission = getTravelerMissionSource(
              "kr",
              country.slug as DestinationCode,
            )!;
            const frontmatterEnd = raw.indexOf("\n---\n", 4);
            const evidence = `\n<ReviewNote label="📌 대한민국 공관 공식 출처" source="${mission.officialName}" url="${mission.officialUrl}">\n  공관 연락처와 영사 지원 범위는 방문 전 공식 페이지와 전화로 다시 확인하세요.\n</ReviewNote>\n`;
            raw = `${raw.slice(0, frontmatterEnd + 5)}${evidence}${raw.slice(frontmatterEnd + 5)}`;
          }
          fs.writeFileSync(target, raw, "utf8");
        } else {
          fs.writeFileSync(
            target,
            generateGuide(profile.code, country.slug as DestinationCode, city.slug, incident),
            "utf8",
          );
        }
        generated += 1;
      }
    }
  }
}

console.log(`Generated ${generated} nationality-specific guides`);
