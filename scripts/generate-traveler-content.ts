import fs from "fs";
import path from "path";
import { countries, incidentTypes, type IncidentType } from "../src/lib/site-config";
import { travelerProfiles, type TravelerCode } from "../src/lib/traveler-profiles";
import { getCityData } from "./city-data";
import { getTravelerMissionSource, type DestinationCode } from "./traveler-missions";
import { localPhraseBlock } from "./local-phrases";

const contentDir = path.join(process.cwd(), "content");

type CopyLanguage = "ko" | "zh-Hans" | "ja" | "zh-Hant" | "en";

const destinationNames: Record<DestinationCode, Record<CopyLanguage, string>> = {
  japan: { ko: "일본", "zh-Hans": "日本", ja: "日本", "zh-Hant": "日本", en: "Japan" },
  thailand: { ko: "태국", "zh-Hans": "泰国", ja: "タイ", "zh-Hant": "泰國", en: "Thailand" },
  vietnam: { ko: "베트남", "zh-Hans": "越南", ja: "ベトナム", "zh-Hant": "越南", en: "Vietnam" },
  taiwan: { ko: "대만", "zh-Hans": "台湾", ja: "台湾", "zh-Hant": "臺灣", en: "Taiwan" },
  philippines: { ko: "필리핀", "zh-Hans": "菲律宾", ja: "フィリピン", "zh-Hant": "菲律賓", en: "Philippines" },
};

const cityNames: Record<string, Record<CopyLanguage, string>> = {
  tokyo: { ko: "도쿄", "zh-Hans": "东京", ja: "東京", "zh-Hant": "東京", en: "Tokyo" },
  osaka: { ko: "오사카", "zh-Hans": "大阪", ja: "大阪", "zh-Hant": "大阪", en: "Osaka" },
  fukuoka: { ko: "후쿠오카", "zh-Hans": "福冈", ja: "福岡", "zh-Hant": "福岡", en: "Fukuoka" },
  kyoto: { ko: "교토", "zh-Hans": "京都", ja: "京都", "zh-Hant": "京都", en: "Kyoto" },
  sapporo: { ko: "삿포로", "zh-Hans": "札幌", ja: "札幌", "zh-Hant": "札幌", en: "Sapporo" },
  bangkok: { ko: "방콕", "zh-Hans": "曼谷", ja: "バンコク", "zh-Hant": "曼谷", en: "Bangkok" },
  phuket: { ko: "푸켓", "zh-Hans": "普吉岛", ja: "プーケット", "zh-Hant": "普吉島", en: "Phuket" },
  "chiang-mai": { ko: "치앙마이", "zh-Hans": "清迈", ja: "チェンマイ", "zh-Hant": "清邁", en: "Chiang Mai" },
  pattaya: { ko: "파타야", "zh-Hans": "芭提雅", ja: "パタヤ", "zh-Hant": "芭達雅", en: "Pattaya" },
  danang: { ko: "다낭", "zh-Hans": "岘港", ja: "ダナン", "zh-Hant": "峴港", en: "Da Nang" },
  hanoi: { ko: "하노이", "zh-Hans": "河内", ja: "ハノイ", "zh-Hant": "河內", en: "Hanoi" },
  "ho-chi-minh-city": { ko: "호치민", "zh-Hans": "胡志明市", ja: "ホーチミン", "zh-Hant": "胡志明市", en: "Ho Chi Minh City" },
  "nha-trang": { ko: "나트랑", "zh-Hans": "芽庄", ja: "ニャチャン", "zh-Hant": "芽莊", en: "Nha Trang" },
  taipei: { ko: "타이베이", "zh-Hans": "台北", ja: "台北", "zh-Hant": "臺北", en: "Taipei" },
  taichung: { ko: "타이중", "zh-Hans": "台中", ja: "台中", "zh-Hant": "臺中", en: "Taichung" },
  kaohsiung: { ko: "가오슝", "zh-Hans": "高雄", ja: "高雄", "zh-Hant": "高雄", en: "Kaohsiung" },
  manila: { ko: "마닐라", "zh-Hans": "马尼拉", ja: "マニラ", "zh-Hant": "馬尼拉", en: "Manila" },
  cebu: { ko: "세부", "zh-Hans": "宿务", ja: "セブ", "zh-Hant": "宿霧", en: "Cebu" },
  boracay: { ko: "보라카이", "zh-Hans": "长滩岛", ja: "ボラカイ", "zh-Hant": "長灘島", en: "Boracay" },
};

const incidentNames: Record<IncidentType, Record<CopyLanguage, string>> = {
  "lost-passport": { ko: "여권 분실", "zh-Hans": "护照遗失", ja: "パスポート紛失", "zh-Hant": "護照遺失", en: "Lost passport" },
  "lost-phone": { ko: "휴대폰 분실", "zh-Hans": "手机遗失或被盗", ja: "スマートフォン紛失・盗難", "zh-Hant": "手機遺失或遭竊", en: "Lost or stolen phone" },
  "lost-wallet": { ko: "지갑 분실", "zh-Hans": "钱包遗失或被盗", ja: "財布紛失・盗難", "zh-Hant": "錢包遺失或遭竊", en: "Lost or stolen wallet" },
  hospital: { ko: "병원 이용", "zh-Hans": "就医与急诊", ja: "病院・救急受診", "zh-Hant": "就醫與急診", en: "Hospital and emergency care" },
  "police-report": { ko: "경찰 신고", "zh-Hans": "报警与报案证明", ja: "警察への届出", "zh-Hant": "報警與報案證明", en: "Police report" },
  scam: { ko: "여행 사기", "zh-Hans": "旅行诈骗", ja: "旅行詐欺", "zh-Hant": "旅遊詐騙", en: "Travel scams" },
};

const reviewUrls: Record<DestinationCode, string> = {
  japan: "https://www.reddit.com/r/JapanTravel/search/?q=lost%20passport&restrict_sr=1",
  thailand: "https://www.reddit.com/r/ThailandTourism/search/?q=lost%20passport&restrict_sr=1",
  vietnam: "https://www.reddit.com/r/VietNam/search/?q=lost%20passport&restrict_sr=1",
  taiwan: "https://www.reddit.com/r/taiwan/search/?q=lost%20passport&restrict_sr=1",
  philippines: "https://www.reddit.com/r/Philippines/search/?q=lost%20passport&restrict_sr=1",
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
  return "en";
}

function localizedMeta(language: CopyLanguage, profileName: string, country: string, city: string, incident: string) {
  return ({
    ko: { title: `${country} ${city} ${incident}: ${profileName} 여행자 가이드 (2026)`, summary: `${profileName} 여행자가 ${country} ${city}에서 ${incident} 상황을 겪었을 때 필요한 현지 대응, 담당기관, 긴급 연락처를 정리했습니다.`, cost: "담당기관 확인 필요", time: "상황과 기관에 따라 다름" },
    "zh-Hans": { title: `${country}${city}${incident}：${profileName}旅客指南（2026）`, summary: `${profileName}旅客在${country}${city}遇到${incident}时，可按本指南处理当地报案、主管机构联系和紧急求助。`, cost: "请向主管机构确认", time: "视事件和机构而定" },
    ja: { title: `${country}・${city}での${incident}：${profileName}旅行者ガイド（2026）`, summary: `${profileName}の旅行者が${country}・${city}で${incident}に直面した際の現地対応、担当機関、緊急連絡先をまとめています。`, cost: "担当機関へ要確認", time: "状況・機関により異なる" },
    "zh-Hant": { title: `${country}${city}${incident}：${profileName}旅客指南（2026）`, summary: `${profileName}旅客在${country}${city}遇到${incident}時，可依本指南處理當地報案、主管機構聯絡及緊急求助。`, cost: "請向主管機構確認", time: "依事件與機構而異" },
    en: { title: `${incident} in ${city}, ${country} — ${profileName} traveler guide (2026)`, summary: `Step-by-step local response and ${profileName} consular guidance for ${incident.toLowerCase()} in ${city}.`, cost: "Confirm with the responsible authority", time: "Varies by incident and authority" },
  } as const)[language];
}

function safeEnglish(value: string | undefined, fallback: string) {
  return value && !/[가-힣]/.test(value) ? value : fallback;
}

function fallbackPhrase(country: DestinationCode) {
  return ({
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
  };
  if (traveler === "kr") return ["경찰 분실신고서 원본", "여권 사진", "신분증·여권 사본", "변경된 항공 일정"];
  const specific = national[traveler];
  const common = {
    "zh-Hans": ["警方报失证明原件", specific ?? "身份与国籍材料", "证件照片", "航班与旅行计划"],
    ja: ["警察の紛失届証明原本", specific ?? "本人・国籍確認書類", "旅券用写真", "航空便・旅程資料"],
    "zh-Hant": ["警方遺失證明正本", specific ?? "身分與國籍資料", "證件照片", "航班與行程證明"],
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

function reviewPatterns(language: CopyLanguage): string[] {
  return ({
    ko: ["여러 후기에서 경찰 신고 전에 숙소·교통 분실물 센터를 확인해 물건을 되찾았다고 보고했습니다.", "보험 청구 시 도장이나 사건번호가 없는 서류 때문에 다시 경찰서를 방문했다는 사례가 반복됩니다.", "공관·병원·통신사에 미리 전화하지 않아 접수 마감이나 필요 서류가 달랐다는 후기가 있습니다."],
    "zh-Hans": ["多份旅客报告称，在报警前联系酒店和交通失物招领处后找回了物品。", "多起保险理赔经验提到，证明缺少印章或案件编号时需要再次前往警署。", "旅客经验显示，未提前致电使领馆、医院或运营商，容易遇到截止时间或材料不符。"],
    ja: ["警察への届出前に宿泊施設や交通機関の遺失物窓口へ連絡し、見つかったという報告が複数あります。", "保険請求で印や受理番号がなく、警察署へ再訪した事例が繰り返し報告されています。", "公館・病院・通信会社へ事前連絡せず、受付締切や必要書類が合わなかったという体験談があります。"],
    "zh-Hant": ["多則旅客報告指出，報警前聯絡住宿與交通失物招領處後找回了物品。", "多起保險理賠經驗提到，證明缺少印章或案件編號時必須再次前往警署。", "旅客經驗顯示，未先致電駐外館處、醫院或電信商，容易遇到截止時間或文件不符。"],
    en: ["Multiple traveler reports describe recovering items after checking hotels and transport lost-and-found before filing with police.", "Insurance reports repeatedly mention having to revisit police when the document lacked a stamp or case number.", "Travelers report missed cutoffs or wrong documents when they did not call the mission, hospital, or carrier first."],
  } as const)[language];
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
    ? ({ japan: "119", thailand: "1669", vietnam: "115", taiwan: "119", philippines: "911" } as const)[country]
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
  const reviews = reviewPatterns(language);
  const phrase = localPhraseBlock(language === "ko" ? "ko" : "en", country, incident) ?? fallbackPhrase(country);
  const table = ({
    ko: ["항목", "안내", "경찰", "담당기관·서비스", "추가 여행비", "보험 청구를 위해 모든 영수증을 보관하세요"],
    "zh-Hans": ["项目", "说明", "警方", "主管机构或服务商", "额外旅行费用", "保留全部收据以便申请保险理赔"],
    ja: ["項目", "案内", "警察", "担当機関・事業者", "追加の旅行費用", "保険請求のため領収書をすべて保管してください"],
    "zh-Hant": ["項目", "說明", "警方", "主管機構或服務商", "額外旅費", "保留所有收據以申請保險理賠"],
    en: ["Item", "Guidance", "Police", "Authority / provider", "Extra travel cost", "Keep every receipt for insurance"],
  } as const)[language];
  const reviewSources = ({ ko: ["여행자 후기 · Reddit", "경찰·보험 사례", "영사·서비스 제공기관 사례"], "zh-Hans": ["旅客报告 · Reddit", "警方与保险案例", "领事及服务机构案例"], ja: ["旅行者報告・Reddit", "警察・保険事例", "領事・事業者事例"], "zh-Hant": ["旅客報告 · Reddit", "警方與保險案例", "領事及服務機構案例"], en: ["Traveler reports · Reddit", "Police and insurance reports", "Consular and provider reports"] } as const)[language];

  return `---
title: "${esc(title)}"
summary: "${esc(summary)}"
publishedAt: "2026-06-19"
updatedAt: "2026-06-19"
estimatedCost: "${meta.cost}"
estimatedTime: "${meta.time}"
emergencyNumber: "${emergency}"
---

<EmergencyBanner number="${emergency}" label="${esc(cityData.emergency.label.en)}" />

<ReviewNote label="📌 ${esc(ui.source)}" source="${esc(mission.officialName)}" url="${mission.officialUrl}">
  ${ui.sourceNote}
</ReviewNote>

<ReviewNote label="💬 ${esc(ui.reviews)}" source="Traveler community reports" url="${reviewUrls[country]}">
  ${ui.reviewText}
</ReviewNote>

<ReviewQuotes title="${esc(ui.reviews)}">
${reviews.map((text, index) => `<ReviewQuoteRow text="${esc(text)}" source="${reviewSources[index]}" />`).join("\n")}
</ReviewQuotes>

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
  for (const country of countries) {
    for (const city of country.cities) {
      for (const incident of incidentTypes) {
        const target = path.join(contentDir, profile.code, country.slug, city.slug, `${incident}.mdx`);
        fs.mkdirSync(path.dirname(target), { recursive: true });

        if (profile.code === "kr") {
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
