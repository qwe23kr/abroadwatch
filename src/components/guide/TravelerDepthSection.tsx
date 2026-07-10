import type { IncidentType } from "@/lib/site-config";
import type { TravelerProfile } from "@/lib/traveler-profiles";

type Language = TravelerProfile["language"];

interface TravelerDepthSectionProps {
  profile: TravelerProfile;
  countryName: string;
  cityName: string;
  incidentName: string;
  incident: IncidentType;
}

const localized: Record<Language, {
  title: string;
  intro: (name: string, country: string, city: string, incident: string) => string;
  cards: string[];
  checks: Record<IncidentType, string[]>;
  confirmTitle: string;
  officialTitle: string;
  officialBody: (hotline: string) => string;
  warningTitle: string;
  warnings: Record<IncidentType, string>;
  evidenceTitle: string;
  evidence: string[];
}> = {
  ko: {
    title: "여행자가 자주 막히는 부분을 한 번 더 확인",
    intro: (name, country, city, incident) => `${name} 여행자가 ${country} ${city}에서 ${incident} 상황을 겪을 때 반복해서 놓치기 쉬운 부분만 다시 정리했습니다.`,
    cards: ["반복되는 막힘", "서류와 증거", "시간 손실 방지"],
    checks: {
      "lost-passport": ["분실 장소, 숙소, 교통기관 분실물 센터를 먼저 확인", "경찰 신고 접수번호와 서면 확인서를 가능한 범위에서 확보", "공관 방문 전 사진 규격, 접수 마감, 수수료를 전화로 재확인"],
      "lost-phone": ["원격 잠금과 위치 확인을 먼저 실행", "SIM/eSIM과 결제 앱을 즉시 정지", "보험 청구를 위해 IMEI, 구매 내역, 경찰 신고 확인서를 보관"],
      "lost-wallet": ["카드 정지와 현금 인출 차단을 먼저 진행", "도난 가능성이 있으면 경찰 신고 확인서를 확보", "여권이나 신분증까지 함께 잃어버렸는지 분리 확인"],
      hospital: ["응급이면 보험사보다 현지 긴급번호가 먼저", "여권, 보험증권, 결제 가능한 카드를 준비", "진료기록과 영수증 원본은 보험 청구용으로 보관"],
      "police-report": ["신고 목적이 분실, 도난, 보험 중 무엇인지 명확히 설명", "접수번호, 담당 경찰서, 날짜가 문서에 있는지 확인", "번역 앱 화면과 물품 사진을 함께 보여주기"],
      scam: ["현장에서 오래 다투기보다 안전한 장소로 먼저 이동", "영수증, 카드 승인내역, 간판, 차량번호를 사진으로 보관", "카드 결제는 즉시 카드사에 해외분쟁 접수"],
    },
    confirmTitle: "현장에서 다시 확인할 것",
    officialTitle: "공식 확인",
    officialBody: (hotline) => `절차, 수수료, 접수 마감은 바뀔 수 있으니 이동 전 ${hotline} 또는 해당 기관 공식 안내로 재확인하세요.`,
    warningTitle: "이동하기 전 체크",
    warnings: {
      "lost-passport": "공관에 분실 신고부터 해버리면 나중에 여권을 찾아도 사용할 수 없는 경우가 있습니다. 찾기와 경찰 확인을 먼저 끝내세요.",
      "lost-phone": "위치 추적 화면을 저장하지 않고 로그아웃하거나 초기화하면 보험과 경찰 설명이 어려워질 수 있습니다.",
      "lost-wallet": "현금 회수에 매달리다 카드 정지가 늦어지는 경우가 많습니다. 결제 차단이 먼저입니다.",
      hospital: "응급 상황에서 보험사 승인만 기다리면 위험할 수 있습니다. 생명이나 신체 위험이 있으면 응급번호와 병원 접수가 먼저입니다.",
      "police-report": "구두 상담만 하고 나오면 보험 청구가 막힐 수 있습니다. 접수번호가 있는 문서가 필요한지 확인하세요.",
      scam: "현장에서 오래 맞서면 더 위험해질 수 있습니다. 안전한 장소로 이동하고 증거 보관을 먼저 하세요.",
    },
    evidenceTitle: "나중에 보험, 공관, 경찰에서 다시 요구하는 자료",
    evidence: ["여권/신분증 사본 또는 사진", "사건 발생 시간과 장소 메모", "영수증, 카드 승인내역, 예약번호", "경찰 접수번호 또는 해당 기관명"],
  },
  en: {
    title: "Double-check the points travelers keep running into",
    intro: (name, country, city, incident) => `These are the extra checks ${name} travelers often need when handling ${incident} in ${city}, ${country}.`,
    cards: ["Repeated pattern", "Documents and evidence", "Avoid lost time"],
    checks: {
      "lost-passport": ["Check the loss site, hotel, and transport lost-and-found first", "Get a police case number and written loss certificate if available", "Call the mission before visiting to confirm photo rules, cutoff time, and fees"],
      "lost-phone": ["Run remote lock and location checks first", "Suspend SIM/eSIM and payment apps immediately", "Keep IMEI, purchase evidence, and the police report for insurance"],
      "lost-wallet": ["Freeze cards and block cash withdrawals first", "Get a police report if theft is possible", "Check separately whether passport or ID was also lost"],
      hospital: ["For emergencies, call the local emergency number before waiting for insurer approval", "Prepare passport, insurance policy, and a working payment method", "Keep original medical records and receipts for insurance"],
      "police-report": ["State whether the report is for loss, theft, or insurance", "Check the case number, police station, and date", "Show translation app text and item photos together"],
      scam: ["Move to a safe place before arguing on site", "Photograph receipts, payment records, storefronts, and vehicle numbers", "For card payments, start a dispute with your issuer quickly"],
    },
    confirmTitle: "Confirm on the ground",
    officialTitle: "Official confirmation",
    officialBody: (hotline) => `Procedures, fees, and cut-off times can change. Reconfirm through ${hotline} or the responsible official office before traveling across town.`,
    warningTitle: "Check before you move",
    warnings: {
      "lost-passport": "Do not start by cancelling the passport unless necessary. If it is invalidated, a later-found passport may no longer work.",
      "lost-phone": "Do not wipe or sign out before saving location and device evidence.",
      "lost-wallet": "Do not delay card freezes while trying to recover cash.",
      hospital: "In an emergency, do not wait only for insurer approval. Contact emergency care first.",
      "police-report": "Do not leave after only a verbal conversation. Confirm whether a case number or written document exists.",
      scam: "Do not argue for too long on site. Move somewhere safe and preserve evidence first.",
    },
    evidenceTitle: "Details insurance, missions, or police often ask for later",
    evidence: ["Passport/ID copy or photo", "Time and place of the incident", "Receipts, card records, or booking numbers", "Police case number or office name"],
  },
  ja: {
    title: "旅行者がつまずきやすい点をもう一度確認",
    intro: (name, country, city, incident) => `${name}旅行者が${country} ${city}で${incident}に対応するとき、見落としやすい点だけを整理しました。`,
    cards: ["よくあるつまずき", "書類と証拠", "時間ロス防止"],
    checks: {
      "lost-passport": ["最後に見た場所、宿泊先、交通機関の遺失物窓口を先に確認", "警察の受付番号や書面確認を可能な範囲で取得", "公館訪問前に写真規格、受付締切、手数料を再確認"],
      "lost-phone": ["遠隔ロックと位置確認を先に実行", "SIM/eSIMと決済アプリをすぐ停止", "保険用にIMEI、購入記録、警察届を保管"],
      "lost-wallet": ["カード停止と現金引き出しブロックを先に実行", "盗難の可能性があれば警察届を取得", "旅券や身分証も一緒に失ったか分けて確認"],
      hospital: ["緊急時は保険会社より現地の緊急番号が先", "旅券、保険証券、支払い手段を準備", "診療記録と領収書原本を保険用に保管"],
      "police-report": ["目的が紛失、盗難、保険のどれかを明確に説明", "受付番号、警察署名、日付が文書にあるか確認", "翻訳アプリの文面と物品写真を一緒に提示"],
      scam: ["現場で長く争わず安全な場所へ移動", "領収書、カード記録、看板、車両番号を写真で保存", "カード決済は早めにカード会社へ相談"],
    },
    confirmTitle: "現地で再確認すること",
    officialTitle: "公式確認",
    officialBody: (hotline) => `手続き、手数料、受付締切は変わることがあります。移動前に${hotline}または担当機関の公式案内で再確認してください。`,
    warningTitle: "移動前のチェック",
    warnings: {
      "lost-passport": "旅券をすぐ失効させると、後で見つかっても使えないことがあります。捜索と警察確認を先に済ませてください。",
      "lost-phone": "位置情報や端末証拠を保存せず初期化すると、保険や警察への説明が難しくなります。",
      "lost-wallet": "現金回収にこだわってカード停止が遅れないようにしてください。",
      hospital: "緊急時に保険会社の承認だけを待つのは危険です。救急対応を優先してください。",
      "police-report": "口頭相談だけで帰ると保険請求に使えないことがあります。受付番号や書面の有無を確認してください。",
      scam: "現場で長く対立すると危険です。安全な場所へ移動し、証拠保全を優先してください。",
    },
    evidenceTitle: "後で保険・公館・警察から求められやすい資料",
    evidence: ["旅券/身分証のコピーまたは写真", "発生時刻と場所のメモ", "領収書、カード記録、予約番号", "警察の受付番号または機関名"],
  },
  "zh-Hans": {
    title: "再次确认旅行者常卡住的地方",
    intro: (name, country, city, incident) => `这里整理了${name}旅行者在${country}${city}处理${incident}时最容易漏掉的检查点。`,
    cards: ["常见卡点", "文件和证据", "避免浪费时间"],
    checks: {
      "lost-passport": ["先确认遗失地点、酒店和交通机构失物处", "尽量取得警方案件编号或书面证明", "前往使领馆前再次确认照片规格、受理截止和费用"],
      "lost-phone": ["先执行远程锁定和定位", "立即停用 SIM/eSIM 和支付应用", "为保险保留 IMEI、购买记录和警方记录"],
      "lost-wallet": ["先冻结银行卡并阻止取现", "如可能被盗，取得警方记录", "单独确认护照或身份证件是否也遗失"],
      hospital: ["紧急情况先联系当地急救电话", "准备护照、保险单和可用付款方式", "保留原始医疗记录和收据用于保险"],
      "police-report": ["明确说明报告用于遗失、盗窃还是保险", "确认案件编号、警局名称和日期", "同时出示翻译文字和物品照片"],
      scam: ["先离开现场到安全地点", "拍下收据、付款记录、店面和车辆号码", "刷卡付款时尽快联系发卡行发起争议"],
    },
    confirmTitle: "现场再次确认",
    officialTitle: "官方确认",
    officialBody: (hotline) => `流程、费用和受理截止时间可能变化。出发前请通过${hotline}或负责机构官方信息再次确认。`,
    warningTitle: "移动前检查",
    warnings: {
      "lost-passport": "不要在必要前先注销护照。护照失效后，即使后来找回也可能无法使用。",
      "lost-phone": "保存定位和设备证据前，不要清除设备或退出账户。",
      "lost-wallet": "不要为了追回现金而延误银行卡冻结。",
      hospital: "紧急时不要只等保险批准，应先联系急救或医疗服务。",
      "police-report": "不要只做口头咨询就离开，确认是否有案件编号或书面文件。",
      scam: "不要在现场争执太久，先到安全地点并保存证据。",
    },
    evidenceTitle: "保险、使领馆或警方之后常要求的资料",
    evidence: ["护照/身份证复印件或照片", "事件时间和地点记录", "收据、银行卡记录或预订号", "警方案件编号或机构名称"],
  },
  "zh-Hant": {
    title: "再次確認旅客常卡住的地方",
    intro: (name, country, city, incident) => `這裡整理了${name}旅客在${country}${city}處理${incident}時最容易漏掉的確認點。`,
    cards: ["常見卡點", "文件和證據", "避免浪費時間"],
    checks: {
      "lost-passport": ["先確認遺失地點、住宿處和交通機構失物處", "盡量取得警方案件編號或書面證明", "前往駐外單位前再次確認照片規格、受理截止和費用"],
      "lost-phone": ["先執行遠端鎖定和定位", "立即停用 SIM/eSIM 和支付 App", "為保險保留 IMEI、購買紀錄和警方紀錄"],
      "lost-wallet": ["先停用卡片並阻止提款", "如可能被盜，取得警方紀錄", "單獨確認護照或身分證件是否也遺失"],
      hospital: ["緊急情況先聯絡當地急救電話", "準備護照、保險單和可用付款方式", "保留原始醫療紀錄和收據用於保險"],
      "police-report": ["明確說明報告用於遺失、竊盜還是保險", "確認案件編號、警局名稱和日期", "同時出示翻譯文字和物品照片"],
      scam: ["先離開現場到安全地點", "拍下收據、付款紀錄、店面和車輛號碼", "刷卡付款時盡快聯絡發卡行提出爭議"],
    },
    confirmTitle: "現場再次確認",
    officialTitle: "官方確認",
    officialBody: (hotline) => `流程、費用和受理截止時間可能變化。出發前請透過${hotline}或負責機構官方資訊再次確認。`,
    warningTitle: "移動前檢查",
    warnings: {
      "lost-passport": "不要在必要前先註銷護照。護照失效後，即使後來找回也可能無法使用。",
      "lost-phone": "保存定位和裝置證據前，不要清除裝置或登出帳號。",
      "lost-wallet": "不要為了追回現金而延誤卡片停用。",
      hospital: "緊急時不要只等保險核准，應先聯絡急救或醫療服務。",
      "police-report": "不要只做口頭諮詢就離開，確認是否有案件編號或書面文件。",
      scam: "不要在現場爭執太久，先到安全地點並保存證據。",
    },
    evidenceTitle: "保險、駐外單位或警方之後常要求的資料",
    evidence: ["護照/身分證影本或照片", "事件時間和地點記錄", "收據、卡片紀錄或預訂號", "警方案件編號或機構名稱"],
  },
  th: {
    title: "ตรวจจุดที่นักเดินทางมักติดขัดอีกครั้ง",
    intro: (name, country, city, incident) => `นี่คือจุดตรวจเพิ่มเติมที่นักเดินทาง${name}มักต้องใช้เมื่อจัดการ${incident}ใน${city}, ${country}`,
    cards: ["จุดติดขัดซ้ำ", "เอกสารและหลักฐาน", "ลดเวลาสูญเสีย"],
    checks: {
      "lost-passport": ["ตรวจจุดที่หาย โรงแรม และศูนย์ของหายของขนส่งก่อน", "ขอหมายเลขคดีหรือเอกสารยืนยันเท่าที่ทำได้", "โทรยืนยันกฎรูปถ่าย เวลาปิดรับ และค่าธรรมเนียมก่อนเข้าพบสถานทูต"],
      "lost-phone": ["ล็อกเครื่องและตรวจตำแหน่งก่อน", "ระงับ SIM/eSIM และแอปชำระเงินทันที", "เก็บ IMEI หลักฐานซื้อ และรายงานตำรวจสำหรับประกัน"],
      "lost-wallet": ["อายัดบัตรและปิดการถอนเงินก่อน", "ขอรายงานตำรวจถ้ามีโอกาสถูกขโมย", "ตรวจแยกว่าพาสปอร์ตหรือบัตรประจำตัวหายด้วยหรือไม่"],
      hospital: ["เหตุฉุกเฉินให้โทรเบอร์ฉุกเฉินก่อนรอประกัน", "เตรียมพาสปอร์ต กรมธรรม์ และวิธีจ่ายเงิน", "เก็บเวชระเบียนและใบเสร็จต้นฉบับสำหรับประกัน"],
      "police-report": ["ระบุว่าแจ้งเพื่อของหาย ถูกขโมย หรือประกัน", "ตรวจหมายเลขคดี สถานีตำรวจ และวันที่", "แสดงข้อความแปลและรูปสิ่งของพร้อมกัน"],
      scam: ["ย้ายไปที่ปลอดภัยก่อนโต้แย้ง", "ถ่ายใบเสร็จ รายการจ่ายเงิน หน้าร้าน และเลขรถ", "ถ้าจ่ายด้วยบัตร ให้เริ่มข้อพิพาทกับผู้ออกบัตรโดยเร็ว"],
    },
    confirmTitle: "ยืนยันหน้างาน",
    officialTitle: "ยืนยันกับแหล่งทางการ",
    officialBody: (hotline) => `ขั้นตอน ค่าธรรมเนียม และเวลาปิดรับอาจเปลี่ยนได้ ยืนยันผ่าน ${hotline} หรือหน่วยงานทางการก่อนเดินทาง`,
    warningTitle: "ตรวจอีกครั้งก่อนเดินทาง",
    warnings: {
      "lost-passport": "อย่าเพิ่งยกเลิกพาสปอร์ตถ้าไม่จำเป็น เพราะถ้าพบภายหลังอาจใช้ไม่ได้แล้ว",
      "lost-phone": "อย่าล้างเครื่องหรือออกจากบัญชีก่อนบันทึกตำแหน่งและหลักฐานของเครื่อง",
      "lost-wallet": "อย่ารออายัดบัตรเพราะพยายามตามเงินสดคืน",
      hospital: "เหตุฉุกเฉินอย่ารออนุมัติประกันอย่างเดียว ให้ติดต่อบริการฉุกเฉินก่อน",
      "police-report": "อย่าออกจากสถานีหลังคุยปากเปล่า ตรวจว่ามีหมายเลขคดีหรือเอกสารหรือไม่",
      scam: "อย่าโต้เถียงนานในที่เกิดเหตุ ย้ายไปที่ปลอดภัยและเก็บหลักฐานก่อน",
    },
    evidenceTitle: "ข้อมูลที่ประกัน สถานทูต หรือตำรวจมักขอภายหลัง",
    evidence: ["สำเนาหรือรูปพาสปอร์ต/บัตรประจำตัว", "เวลาและสถานที่เกิดเหตุ", "ใบเสร็จ รายการบัตร หรือเลขจอง", "หมายเลขคดีหรือชื่อหน่วยงาน"],
  },
  vi: {
    title: "Kiểm tra lại các điểm du khách thường bị vướng",
    intro: (name, country, city, incident) => `Đây là các kiểm tra bổ sung mà du khách ${name} thường cần khi xử lý ${incident} ở ${city}, ${country}.`,
    cards: ["Vướng mắc lặp lại", "Giấy tờ và bằng chứng", "Tránh mất thời gian"],
    checks: {
      "lost-passport": ["Kiểm tra nơi mất, khách sạn và quầy đồ thất lạc trước", "Lấy số hồ sơ cảnh sát và giấy xác nhận nếu có", "Gọi cơ quan lãnh sự trước để xác nhận ảnh, giờ nhận và phí"],
      "lost-phone": ["Khóa từ xa và kiểm tra vị trí trước", "Khóa SIM/eSIM và ứng dụng thanh toán ngay", "Giữ IMEI, chứng từ mua và biên bản cảnh sát cho bảo hiểm"],
      "lost-wallet": ["Khóa thẻ và chặn rút tiền trước", "Lấy biên bản cảnh sát nếu có khả năng bị trộm", "Kiểm tra riêng xem hộ chiếu hoặc ID có bị mất cùng không"],
      hospital: ["Khẩn cấp thì gọi số khẩn cấp trước khi chờ bảo hiểm", "Chuẩn bị hộ chiếu, hợp đồng bảo hiểm và phương thức thanh toán", "Giữ hồ sơ y tế và hóa đơn gốc cho bảo hiểm"],
      "police-report": ["Nêu rõ báo cáo dùng cho mất đồ, trộm cắp hay bảo hiểm", "Kiểm tra số hồ sơ, đồn cảnh sát và ngày", "Đưa cả nội dung dịch và ảnh đồ vật"],
      scam: ["Di chuyển đến nơi an toàn trước khi tranh cãi", "Chụp hóa đơn, giao dịch, mặt tiền cửa hàng và biển số xe", "Nếu trả bằng thẻ, liên hệ đơn vị phát hành để tranh chấp sớm"],
    },
    confirmTitle: "Xác nhận tại chỗ",
    officialTitle: "Xác nhận chính thức",
    officialBody: (hotline) => `Thủ tục, phí và giờ nhận hồ sơ có thể thay đổi. Xác nhận qua ${hotline} hoặc cơ quan chính thức trước khi di chuyển.`,
    warningTitle: "Kiểm tra trước khi đi",
    warnings: {
      "lost-passport": "Đừng hủy hộ chiếu trước khi thật cần thiết. Nếu bị vô hiệu, hộ chiếu tìm lại có thể không dùng được.",
      "lost-phone": "Đừng xóa máy hoặc đăng xuất trước khi lưu vị trí và bằng chứng thiết bị.",
      "lost-wallet": "Đừng chậm khóa thẻ vì cố tìm lại tiền mặt.",
      hospital: "Trong tình huống khẩn cấp, đừng chỉ chờ bảo hiểm phê duyệt. Hãy liên hệ chăm sóc khẩn cấp trước.",
      "police-report": "Đừng rời đi sau khi chỉ trao đổi miệng. Xác nhận có số hồ sơ hoặc giấy tờ không.",
      scam: "Đừng tranh cãi quá lâu tại chỗ. Đến nơi an toàn và giữ bằng chứng trước.",
    },
    evidenceTitle: "Thông tin bảo hiểm, lãnh sự hoặc cảnh sát thường hỏi lại",
    evidence: ["Bản sao hoặc ảnh hộ chiếu/ID", "Thời gian và địa điểm sự cố", "Hóa đơn, giao dịch thẻ hoặc mã đặt chỗ", "Số hồ sơ cảnh sát hoặc tên cơ quan"],
  },
};

export function TravelerDepthSection({
  profile,
  countryName,
  cityName,
  incidentName,
  incident,
}: TravelerDepthSectionProps) {
  const l = localized[profile.language];
  const checks = l.checks[incident];

  return (
    <section className="mt-10 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 md:p-6">
      <h2 className="text-xl font-bold text-gray-950">{l.title}</h2>
      <p className="mt-2 text-sm leading-6 text-gray-700">
        {l.intro(profile.nativeName, countryName, cityName, incidentName)}
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {checks.map((item, index) => (
          <div key={item} className="rounded-xl border border-white bg-white p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700">{l.cards[index]}</p>
            <p className="mt-2 text-sm leading-6 text-gray-700">{item}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <h3 className="text-sm font-bold text-gray-900">{l.confirmTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            {cityName} · {countryName} · {incidentName}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <h3 className="text-sm font-bold text-gray-900">{l.officialTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-700">{l.officialBody(profile.consularHotline)}</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <h3 className="text-sm font-bold text-amber-950">{l.warningTitle}</h3>
        <p className="mt-2 text-sm leading-6 text-amber-900">{l.warnings[incident]}</p>
      </div>

      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4">
        <h3 className="text-sm font-bold text-gray-900">{l.evidenceTitle}</h3>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-gray-700 md:grid-cols-2">
          {l.evidence.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
