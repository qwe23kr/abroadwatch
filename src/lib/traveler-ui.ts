import type { IncidentType } from "./site-config";
import type { TravelerProfile } from "./traveler-profiles";

type Language = TravelerProfile["language"];

const names: Record<string, Partial<Record<Language, string>>> = {
  "south-korea": { ko: "대한민국", "zh-Hans": "韩国", ja: "韓国", "zh-Hant": "韓國", th: "เกาหลีใต้", vi: "Hàn Quốc", en: "South Korea" },
  seoul: { ko: "서울", "zh-Hans": "首尔", ja: "ソウル", "zh-Hant": "首爾", th: "โซล", vi: "Seoul", en: "Seoul" },
  busan: { ko: "부산", "zh-Hans": "釜山", ja: "釜山", "zh-Hant": "釜山", th: "ปูซาน", vi: "Busan", en: "Busan" },
  jeju: { ko: "제주", "zh-Hans": "济州", ja: "済州", "zh-Hant": "濟州", th: "เชจู", vi: "Jeju", en: "Jeju" },
  japan: { ko: "일본", "zh-Hans": "日本", ja: "日本", "zh-Hant": "日本", th: "ญี่ปุ่น", vi: "Nhật Bản", en: "Japan" },
  thailand: { ko: "태국", "zh-Hans": "泰国", ja: "タイ", "zh-Hant": "泰國", th: "ประเทศไทย", vi: "Thái Lan", en: "Thailand" },
  vietnam: { ko: "베트남", "zh-Hans": "越南", ja: "ベトナム", "zh-Hant": "越南", th: "เวียดนาม", vi: "Việt Nam", en: "Vietnam" },
  taiwan: { ko: "대만", "zh-Hans": "台湾", ja: "台湾", "zh-Hant": "臺灣", th: "ไต้หวัน", vi: "Đài Loan", en: "Taiwan" },
  philippines: { ko: "필리핀", "zh-Hans": "菲律宾", ja: "フィリピン", "zh-Hant": "菲律賓", th: "ฟิลิปปินส์", vi: "Philippines", en: "Philippines" },
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

const incidents: Record<IncidentType, Record<Language, string>> = {
  "lost-passport": { ko: "여권 분실", "zh-Hans": "护照遗失", ja: "パスポート紛失", "zh-Hant": "護照遺失", th: "หนังสือเดินทางสูญหาย", vi: "Mất hộ chiếu", en: "Lost passport" },
  "lost-phone": { ko: "휴대폰 분실", "zh-Hans": "手机遗失", ja: "スマホ紛失", "zh-Hant": "手機遺失", th: "โทรศัพท์หาย", vi: "Mất điện thoại", en: "Lost phone" },
  "lost-wallet": { ko: "지갑 분실", "zh-Hans": "钱包遗失", ja: "財布紛失", "zh-Hant": "錢包遺失", th: "กระเป๋าสตางค์หาย", vi: "Mất ví", en: "Lost wallet" },
  hospital: { ko: "병원 이용", "zh-Hans": "就医急诊", ja: "病院・救急", "zh-Hant": "就醫急診", th: "โรงพยาบาลและฉุกเฉิน", vi: "Bệnh viện và cấp cứu", en: "Hospital" },
  "police-report": { ko: "경찰 신고", "zh-Hans": "警方报案", ja: "警察への届出", "zh-Hant": "警方報案", th: "แจ้งความกับตำรวจ", vi: "Trình báo cảnh sát", en: "Police report" },
  scam: { ko: "여행 사기", "zh-Hans": "旅行诈骗", ja: "旅行詐欺", "zh-Hant": "旅遊詐騙", th: "กลโกงการท่องเที่ยว", vi: "Lừa đảo du lịch", en: "Travel scams" },
};

const ui = {
  ko: { hub: "한국인 여행자를 위한 해외 비상 가이드", hero: "해외에서 문제가 생겼을 때, 한국인에게 맞는 해결 방법", subtitle: "여권·휴대폰·지갑 분실, 병원, 경찰 신고, 여행 사기까지 현지 절차와 대한민국 공관 정보를 한곳에서 확인하세요.", coverage: "5개국 19개 도시 · 상황별 912개 국적 가이드", browseCountry: "여행 국가와 도시 선택", browseCountryDescription: "도시를 고른 뒤 필요한 상황 가이드를 바로 확인하세요.", browseIncident: "상황별 빠른 찾기", official: "공식기관 출처와 실제 여행 후기 패턴을 함께 검증했습니다.", searchPlaceholder: "도시 또는 상황 검색", searchButton: "검색", popular: "인기 가이드", latest: "최신 여행 안전 가이드", faq: "자주 묻는 질문", faq1q: "정보는 내 국적에 맞게 표시되나요?", faq1a: "네. 선택한 국적의 언어, 여권 절차, 담당 공관과 영사 긴급 연락처를 기준으로 표시합니다.", faq2q: "현지 경찰·병원 정보도 확인했나요?", faq2a: "현지 공식기관 정보와 실제 여행자 후기에서 반복 확인된 패턴을 함께 검증했습니다.", faq3q: "방문 전에 다시 전화해야 하나요?", faq3a: "운영시간, 필요 서류와 비용은 바뀔 수 있으므로 반드시 공식 페이지와 전화로 재확인하세요.", emergency: "긴급번호", updated: "최종 업데이트", nationality: "국적", other: "이 도시의 다른 상황" },
  "zh-Hans": { hub: "中国公民海外旅行应急指南", hero: "在海外遇到问题时，查看适合中国公民的解决方法", subtitle: "护照、手机、钱包遗失，就医、报警和旅行诈骗：用中文查看当地流程及中国公民主管机构。", coverage: "5个国家、19座城市 · 912份国籍专属指南", browseCountry: "选择旅行国家和城市", browseCountryDescription: "选择城市后，直接打开所需的应急指南。", browseIncident: "按紧急情况快速查找", official: "内容结合官方机构资料与真实旅客经验中的重复模式进行核验。", searchPlaceholder: "搜索城市或紧急情况", searchButton: "搜索", popular: "热门指南", latest: "最新旅行安全指南", faq: "常见问题", faq1q: "内容会根据我的国籍显示吗？", faq1a: "会。页面使用所选国籍的语言、护照流程、负责机构和领事紧急联系方式。", faq2q: "当地警方和医院信息经过核验吗？", faq2a: "我们同时核验当地官方机构信息和真实旅客报告中反复出现的模式。", faq3q: "前往前还需要打电话确认吗？", faq3a: "需要。受理时间、材料和费用可能变化，请通过官方网站和电话再次确认。", emergency: "紧急电话", updated: "最后更新", nationality: "国籍", other: "本城市的其他情况" },
  ja: { hub: "日本人旅行者向け海外緊急ガイド", hero: "海外で困ったとき、日本人に合った解決方法を確認", subtitle: "旅券・スマートフォン・財布の紛失、病院、警察への届出、旅行詐欺まで、現地手続きと日本の担当機関を日本語で確認できます。", coverage: "5か国19都市 · 国籍別ガイド912件", browseCountry: "旅行先の国と都市を選択", browseCountryDescription: "都市を選び、必要な状況別ガイドをすぐに開けます。", browseIncident: "状況からすばやく探す", official: "公的機関の情報と実際の旅行者報告で繰り返された傾向を照合しています。", searchPlaceholder: "都市または状況を検索", searchButton: "検索", popular: "人気ガイド", latest: "最新の旅行安全ガイド", faq: "よくある質問", faq1q: "国籍に合わせて表示されますか？", faq1a: "はい。選択した国籍の言語、旅券手続き、担当機関、領事緊急連絡先を表示します。", faq2q: "現地警察と病院の情報も確認済みですか？", faq2a: "現地公的機関の情報と、実際の旅行者報告で繰り返された傾向を照合しています。", faq3q: "訪問前に電話確認が必要ですか？", faq3a: "必要です。受付時間、書類、費用は変わるため、公式サイトと電話で再確認してください。", emergency: "緊急番号", updated: "最終更新", nationality: "国籍", other: "この都市のその他の状況" },
  "zh-Hant": { hub: "臺灣旅客海外緊急應變指南", hero: "在海外遇到問題時，查看適合臺灣旅客的解決方式", subtitle: "護照、手機、錢包遺失，就醫、報警與旅遊詐騙：以繁體中文查看當地流程及臺灣主管機關資訊。", coverage: "5個國家、19座城市 · 912份國籍專屬指南", browseCountry: "選擇旅遊國家與城市", browseCountryDescription: "選擇城市後，直接開啟所需的緊急指南。", browseIncident: "依緊急狀況快速查找", official: "內容交叉查核官方機構資料與真實旅客經驗中反覆出現的模式。", searchPlaceholder: "搜尋城市或緊急狀況", searchButton: "搜尋", popular: "熱門指南", latest: "最新旅遊安全指南", faq: "常見問題", faq1q: "內容會依我的國籍顯示嗎？", faq1a: "會。頁面使用所選國籍的語言、護照流程、負責機構與領事緊急聯絡方式。", faq2q: "當地警方與醫院資訊有查核嗎？", faq2a: "我們同時查核當地官方機構資訊及真實旅客報告中反覆出現的模式。", faq3q: "前往前還需要電話確認嗎？", faq3a: "需要。受理時間、文件與費用可能變動，請透過官方網站及電話再次確認。", emergency: "緊急電話", updated: "最後更新", nationality: "國籍", other: "此城市的其他狀況" },
  th: { hub: "คู่มือฉุกเฉินสำหรับนักเดินทางชาวไทย", hero: "เมื่อเกิดปัญหาในต่างประเทศ ใช้แนวทางที่จัดทำสำหรับคนไทย", subtitle: "หนังสือเดินทาง โทรศัพท์ หรือกระเป๋าสตางค์หาย การรักษาพยาบาล การแจ้งตำรวจ และกลโกง พร้อมขั้นตอนท้องถิ่นและข้อมูลกงสุลไทย", coverage: "6 ประเทศ 22 เมือง · คู่มือตามสัญชาติ 1,320 รายการ", browseCountry: "เลือกประเทศและเมืองปลายทาง", browseCountryDescription: "เลือกเมืองแล้วเปิดคู่มือตามเหตุการณ์ที่ต้องการ", browseIncident: "ค้นหาตามเหตุฉุกเฉิน", official: "ตรวจสอบข้อมูลหน่วยงานทางการควบคู่กับรูปแบบที่พบซ้ำในประสบการณ์จริงของนักเดินทาง", searchPlaceholder: "ค้นหาเมืองหรือเหตุการณ์", searchButton: "ค้นหา", popular: "คู่มือยอดนิยม", latest: "คู่มือความปลอดภัยล่าสุด", faq: "คำถามที่พบบ่อย", faq1q: "ข้อมูลปรับตามสัญชาติของฉันหรือไม่?", faq1a: "ใช่ ใช้ภาษา ขั้นตอนหนังสือเดินทาง หน่วยงานรับผิดชอบ และช่องทางฉุกเฉินของสัญชาติที่เลือก", faq2q: "ข้อมูลตำรวจและโรงพยาบาลตรวจสอบแล้วหรือไม่?", faq2a: "ตรวจสอบข้อมูลทางการและประสบการณ์จริงที่รายงานซ้ำ", faq3q: "ควรโทรยืนยันก่อนเดินทางไปหรือไม่?", faq3a: "ควร เพราะเวลา เอกสาร และค่าธรรมเนียมอาจเปลี่ยนแปลง", emergency: "ฉุกเฉิน", updated: "อัปเดต", nationality: "สัญชาติ", other: "เหตุการณ์อื่นในเมืองนี้" },
  vi: { hub: "Hướng dẫn khẩn cấp cho du khách Việt Nam", hero: "Khi gặp sự cố ở nước ngoài, làm theo hướng dẫn dành cho người Việt", subtitle: "Mất hộ chiếu, điện thoại hoặc ví, đi bệnh viện, trình báo cảnh sát và lừa đảo — gồm quy trình địa phương và hỗ trợ lãnh sự Việt Nam.", coverage: "6 quốc gia, 22 thành phố · 1.320 hướng dẫn theo quốc tịch", browseCountry: "Chọn quốc gia và thành phố", browseCountryDescription: "Chọn thành phố rồi mở hướng dẫn cho tình huống cần xử lý.", browseIncident: "Tìm theo tình huống khẩn cấp", official: "Thông tin chính thức được đối chiếu với các mẫu lặp lại trong trải nghiệm thực tế của du khách.", searchPlaceholder: "Tìm thành phố hoặc tình huống", searchButton: "Tìm kiếm", popular: "Hướng dẫn phổ biến", latest: "Hướng dẫn an toàn mới nhất", faq: "Câu hỏi thường gặp", faq1q: "Thông tin có phù hợp với quốc tịch của tôi không?", faq1a: "Có. Trang dùng ngôn ngữ, thủ tục hộ chiếu, cơ quan phụ trách và liên hệ khẩn cấp của quốc tịch đã chọn.", faq2q: "Thông tin cảnh sát và bệnh viện đã được kiểm tra chưa?", faq2a: "Thông tin chính thức được đối chiếu với các báo cáo thực tế lặp lại.", faq3q: "Tôi có nên gọi xác nhận trước khi đến không?", faq3a: "Có. Giờ làm việc, giấy tờ và phí có thể thay đổi.", emergency: "Khẩn cấp", updated: "Cập nhật", nationality: "Quốc tịch", other: "Tình huống khác tại thành phố này" },
  en: { hub: "Travel emergency guides for your nationality", hero: "When something goes wrong abroad, follow guidance built for your nationality", subtitle: "Lost passport, phone or wallet, hospital care, police reports, and scams — local steps plus your own government's consular guidance.", coverage: "5 countries, 19 cities · 912 nationality-specific guides", browseCountry: "Choose a destination and city", browseCountryDescription: "Pick a city, then open the guide for the situation you need.", browseIncident: "Find by emergency situation", official: "Official authority sources are checked alongside recurring patterns in real traveler reports.", searchPlaceholder: "Search city or situation", searchButton: "Search", popular: "Popular guides", latest: "Latest travel safety guides", faq: "Frequently asked questions", faq1q: "Is the information tailored to my nationality?", faq1a: "Yes. It uses the selected nationality's language, passport process, responsible mission, and consular emergency contacts.", faq2q: "Are local police and hospital details checked?", faq2a: "Local official information is checked alongside recurring patterns in real traveler reports.", faq3q: "Should I still call before visiting?", faq3a: "Yes. Hours, documents, and fees can change, so reconfirm on the official site and by phone.", emergency: "Emergency", updated: "Updated", nationality: "Nationality", other: "Other situations in this city" },
} satisfies Record<Language, Record<string, string>>;

export function travelerName(profile: TravelerProfile, slug: string, fallback = slug) {
  return names[slug]?.[profile.language] ?? fallback;
}

export function travelerIncident(profile: TravelerProfile, incident: IncidentType) {
  return incidents[incident][profile.language];
}

export function travelerUi(profile: TravelerProfile) {
  const coverage = ({
    ko: "6개국 22개 도시 · 상황별 1,320개 국적 가이드",
    "zh-Hans": "6个国家、22座城市 · 1,320份国籍专属指南",
    ja: "6か国22都市 · 国籍別ガイド1,320件",
    "zh-Hant": "6個國家、22座城市 · 1,320份國籍專屬指南",
    th: "6 ประเทศ 22 เมือง · คู่มือตามสัญชาติ 1,320 รายการ",
    vi: "6 quốc gia, 22 thành phố · 1.320 hướng dẫn theo quốc tịch",
    en: "6 countries, 22 cities · 1,320 nationality-specific guides",
  } as const)[profile.language];
  return { ...ui[profile.language], coverage };
}

export function travelerNav(profile: TravelerProfile) {
  return ({
    ko: { home: "홈", about: "소개", contact: "문의", search: "검색" },
    "zh-Hans": { home: "首页", about: "关于", contact: "联系", search: "搜索" },
    ja: { home: "ホーム", about: "サイトについて", contact: "お問い合わせ", search: "検索" },
    "zh-Hant": { home: "首頁", about: "關於", contact: "聯絡", search: "搜尋" },
    th: { home: "หน้าหลัก", about: "เกี่ยวกับ", contact: "ติดต่อ", search: "ค้นหา" },
    vi: { home: "Trang chủ", about: "Giới thiệu", contact: "Liên hệ", search: "Tìm kiếm" },
    en: { home: "Home", about: "About", contact: "Contact", search: "Search" },
  } as const)[profile.language];
}

export function travelerFooter(profile: TravelerProfile) {
  return ({
    ko: { about: "소개", contact: "문의", privacy: "개인정보처리방침", terms: "이용약관", disclaimer: "면책조항", editorial: "편집 원칙", tagline: "국적과 여행지에 맞춘 해외 비상 대처 가이드" },
    "zh-Hans": { about: "关于", contact: "联系", privacy: "隐私政策", terms: "使用条款", disclaimer: "免责声明", editorial: "编辑原则", tagline: "根据国籍和目的地提供的海外应急指南" },
    ja: { about: "サイトについて", contact: "お問い合わせ", privacy: "プライバシー", terms: "利用規約", disclaimer: "免責事項", editorial: "編集方針", tagline: "国籍と旅行先に合わせた海外緊急対応ガイド" },
    "zh-Hant": { about: "關於", contact: "聯絡", privacy: "隱私權政策", terms: "使用條款", disclaimer: "免責聲明", editorial: "編輯原則", tagline: "依國籍與目的地提供的海外緊急應變指南" },
    th: { about: "เกี่ยวกับ", contact: "ติดต่อ", privacy: "ความเป็นส่วนตัว", terms: "ข้อกำหนด", disclaimer: "ข้อจำกัดความรับผิด", editorial: "นโยบายบรรณาธิการ", tagline: "คู่มือฉุกเฉินที่ปรับตามสัญชาติและจุดหมาย" },
    vi: { about: "Giới thiệu", contact: "Liên hệ", privacy: "Quyền riêng tư", terms: "Điều khoản", disclaimer: "Miễn trừ", editorial: "Chính sách biên tập", tagline: "Hướng dẫn khẩn cấp theo quốc tịch và điểm đến" },
    en: { about: "About", contact: "Contact", privacy: "Privacy", terms: "Terms", disclaimer: "Disclaimer", editorial: "Editorial policy", tagline: "Emergency travel guidance tailored to nationality and destination" },
  } as const)[profile.language];
}
