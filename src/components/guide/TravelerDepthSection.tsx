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

const labels: Record<
  Language,
  {
    heading: string;
    intro: (args: { nationality: string; cityName: string; countryName: string; incidentName: string }) => string;
    fieldTitle: string;
    beforeTitle: string;
    officialTitle: string;
    officialText: (hotline: string) => string;
    cards: [string, string, string];
  }
> = {
  ko: {
    heading: "실제 여행자 패턴으로 한 번 더 확인",
    intro: ({ nationality, cityName, countryName, incidentName }) =>
      `${nationality} 여행자가 ${countryName} ${cityName}에서 ${incidentName} 상황을 겪을 때 반복해서 막히는 부분만 다시 정리했습니다.`,
    fieldTitle: "현장에서 특히 확인할 것",
    beforeTitle: "이동하기 전 체크",
    officialTitle: "공식 확인",
    officialText: (hotline) => `절차·수수료·접수 마감은 바뀔 수 있으니 이동 전 ${hotline} 또는 담당 공관 공식 안내로 재확인하세요.`,
    cards: ["후기 반복 포인트", "서류·증거", "시간 손실 방지"],
  },
  "zh-Hans": {
    heading: "根据旅客反复遇到的问题再确认",
    intro: ({ nationality, cityName, countryName, incidentName }) =>
      `以下是${nationality}旅客在${countryName}${cityName}处理${incidentName}时最容易耽误时间的重点。`,
    fieldTitle: "现场要重点确认",
    beforeTitle: "移动前检查",
    officialTitle: "官方确认",
    officialText: (hotline) => `流程、费用和受理截止时间可能变化。出发前请通过${hotline}或主管机构官方网站再次确认。`,
    cards: ["旅客反复提到", "文件与证据", "避免浪费时间"],
  },
  ja: {
    heading: "旅行者の体験で繰り返し出る注意点",
    intro: ({ nationality, cityName, countryName, incidentName }) =>
      `${nationality}の旅行者が${countryName}・${cityName}で${incidentName}に遭った時、特に時間を失いやすい点をまとめました。`,
    fieldTitle: "現地で必ず確認",
    beforeTitle: "移動前チェック",
    officialTitle: "公式確認",
    officialText: (hotline) => `手続き、料金、受付締切は変わることがあります。移動前に${hotline}または担当機関の公式案内で再確認してください。`,
    cards: ["体験談の共通点", "書類・証拠", "時間ロス防止"],
  },
  "zh-Hant": {
    heading: "依旅客常見經驗再次確認",
    intro: ({ nationality, cityName, countryName, incidentName }) =>
      `以下整理${nationality}旅客在${countryName}${cityName}處理${incidentName}時最常卡住的重點。`,
    fieldTitle: "現場務必確認",
    beforeTitle: "移動前檢查",
    officialTitle: "官方確認",
    officialText: (hotline) => `流程、費用與受理截止時間可能變動。出發前請透過${hotline}或主管機關官方資訊再次確認。`,
    cards: ["旅客反覆提到", "文件與證據", "避免浪費時間"],
  },
  th: {
    heading: "ตรวจซ้ำจากปัญหาที่นักเดินทางเจอบ่อย",
    intro: ({ nationality, cityName, countryName, incidentName }) =>
      `สรุปจุดที่${nationality}มักเสียเวลาเมื่อเจอเหตุการณ์${incidentName}ใน${cityName}, ${countryName}`,
    fieldTitle: "สิ่งที่ต้องยืนยันในพื้นที่",
    beforeTitle: "เช็กก่อนเดินทางไปหน่วยงาน",
    officialTitle: "ยืนยันกับหน่วยงานทางการ",
    officialText: (hotline) => `ขั้นตอน ค่าธรรมเนียม และเวลาปิดรับอาจเปลี่ยนได้ ควรโทร ${hotline} หรือตรวจเว็บไซต์ทางการก่อนออกเดินทาง`,
    cards: ["รูปแบบที่เจอบ่อย", "เอกสารและหลักฐาน", "ลดเวลาสูญเสีย"],
  },
  vi: {
    heading: "Kiểm tra lại theo các tình huống du khách hay gặp",
    intro: ({ nationality, cityName, countryName, incidentName }) =>
      `Đây là các điểm ${nationality} thường bị chậm khi xử lý ${incidentName} tại ${cityName}, ${countryName}.`,
    fieldTitle: "Cần xác nhận tại chỗ",
    beforeTitle: "Kiểm tra trước khi di chuyển",
    officialTitle: "Xác nhận chính thức",
    officialText: (hotline) => `Thủ tục, phí và giờ tiếp nhận có thể thay đổi. Trước khi đi, hãy xác nhận qua ${hotline} hoặc trang chính thức của cơ quan phụ trách.`,
    cards: ["Điểm lặp lại trong trải nghiệm", "Giấy tờ và bằng chứng", "Tránh mất thời gian"],
  },
  en: {
    heading: "Double-check the points travelers keep running into",
    intro: ({ nationality, cityName, countryName, incidentName }) =>
      `These are the extra checks ${nationality} travelers often need when handling ${incidentName} in ${cityName}, ${countryName}.`,
    fieldTitle: "Confirm on the ground",
    beforeTitle: "Check before you move",
    officialTitle: "Official confirmation",
    officialText: (hotline) => `Procedures, fees, and cut-off times can change. Reconfirm through ${hotline} or the responsible official office before you travel across town.`,
    cards: ["Repeated traveler pattern", "Documents and evidence", "Avoid lost time"],
  },
};

const incidentChecks: Record<IncidentType, Record<Language, string[]>> = {
  "lost-passport": {
    ko: ["분실 장소·숙소·교통 분실물센터를 먼저 확인", "경찰 신고는 접수번호와 원본 확인서까지 확보", "공관 방문 전 사진 규격·접수 마감·수수료 확인"],
    "zh-Hans": ["先联系遗失地点、酒店和交通失物招领处", "报警时确认案件编号和证明原件", "前往使领馆前确认照片规格、截止时间和费用"],
    ja: ["紛失場所・宿泊先・交通機関の遺失物窓口を先に確認", "警察では受付番号と証明書原本を確認", "公館へ行く前に写真規格・受付締切・手数料を確認"],
    "zh-Hant": ["先確認遺失地點、飯店與交通失物招領", "報警時確認受理編號與證明正本", "前往辦事處前確認照片規格、截止時間與費用"],
    th: ["ติดต่อสถานที่ที่หาย โรงแรม และศูนย์ของหายก่อน", "แจ้งตำรวจแล้วขอเลขรับแจ้งและเอกสารยืนยัน", "ก่อนเข้าสถานทูตให้เช็กขนาดรูป เวลาปิดรับ และค่าธรรมเนียม"],
    vi: ["Liên hệ nơi bị mất, khách sạn và bộ phận thất lạc trước", "Khi báo cảnh sát, lấy mã số tiếp nhận và giấy xác nhận", "Trước khi đến cơ quan lãnh sự, xác nhận ảnh, giờ nhận hồ sơ và phí"],
    en: ["Check the lost-property desk, hotel, and transport operator first", "Get a police case number and written loss certificate", "Confirm photo rules, cut-off time, and fees before visiting the mission"],
  },
  "lost-phone": {
    ko: ["원격 잠금·위치 추적을 먼저 실행", "SIM/eSIM과 결제앱을 즉시 정지", "보험 청구용 경찰 신고서와 구매·통신사 증빙 확보"],
    "zh-Hans": ["先启用远程锁定和定位", "立即停用SIM/eSIM和支付App", "为保险准备报警记录、购买凭证和运营商证明"],
    ja: ["リモートロックと位置確認を先に実行", "SIM/eSIMと決済アプリをすぐ停止", "保険用に警察届・購入証明・通信会社証明を保管"],
    "zh-Hant": ["先啟用遠端鎖定與定位", "立即停用SIM/eSIM與支付App", "為保險保留報案紀錄、購買證明與電信證明"],
    th: ["ล็อกเครื่องและเช็กตำแหน่งก่อน", "ระงับ SIM/eSIM และแอปจ่ายเงินทันที", "เก็บใบแจ้งความ หลักฐานซื้อ และเอกสารจากเครือข่ายเพื่อเคลมประกัน"],
    vi: ["Khóa máy từ xa và kiểm tra vị trí trước", "Khóa SIM/eSIM và ứng dụng thanh toán ngay", "Giữ báo cáo cảnh sát, hóa đơn mua máy và xác nhận nhà mạng cho bảo hiểm"],
    en: ["Run remote lock and location checks first", "Suspend SIM/eSIM and payment apps immediately", "Keep police, purchase, and carrier evidence for insurance"],
  },
  "lost-wallet": {
    ko: ["카드 정지와 현금 인출 차단이 먼저", "도난 가능성이 있으면 경찰 신고서 확보", "여권·신분증까지 함께 잃었는지 분리 확인"],
    "zh-Hans": ["先冻结银行卡并阻止取现", "如可能被盗，取得报警证明", "确认护照和身份证件是否也一起遗失"],
    ja: ["カード停止と現金引き出し停止を優先", "盗難の可能性があれば警察証明を取得", "旅券や身分証も一緒に失くしたか確認"],
    "zh-Hant": ["先停用信用卡並阻止提現", "若可能遭竊，取得報案證明", "確認護照與身分證件是否一併遺失"],
    th: ["อายัดบัตรและป้องกันการถอนเงินก่อน", "ถ้าอาจถูกขโมย ให้ขอใบแจ้งความ", "ตรวจว่าพาสปอร์ตหรือบัตรประจำตัวหายไปด้วยหรือไม่"],
    vi: ["Khóa thẻ và chặn rút tiền trước", "Nếu nghi bị trộm, lấy giấy báo cảnh sát", "Kiểm tra hộ chiếu hoặc giấy tờ tùy thân có mất cùng không"],
    en: ["Freeze cards and cash withdrawals first", "Get a police report if theft is possible", "Check separately whether passport or ID was also lost"],
  },
  hospital: {
    ko: ["응급이면 현지 응급번호가 먼저", "여권·보험증권·카드 결제 가능 여부 확인", "진료기록과 영수증은 보험 청구용으로 원본 보관"],
    "zh-Hans": ["紧急情况先拨当地急救电话", "确认护照、保险单和可用支付方式", "保存病历和收据原件用于保险理赔"],
    ja: ["緊急時はまず現地の救急番号へ", "旅券・保険証券・支払い手段を確認", "診療記録と領収書原本を保険請求用に保管"],
    "zh-Hant": ["緊急時先撥當地急救電話", "確認護照、保單與可用付款方式", "保留診療紀錄與收據正本以便保險理賠"],
    th: ["ฉุกเฉินให้โทรเบอร์ฉุกเฉินท้องถิ่นก่อน", "เตรียมพาสปอร์ต กรมธรรม์ และวิธีชำระเงิน", "เก็บใบรับรองแพทย์และใบเสร็จตัวจริงเพื่อเคลมประกัน"],
    vi: ["Khẩn cấp thì gọi số cấp cứu địa phương trước", "Chuẩn bị hộ chiếu, bảo hiểm và phương thức thanh toán", "Giữ hồ sơ khám và hóa đơn gốc để yêu cầu bảo hiểm"],
    en: ["For emergencies, call the local emergency number first", "Prepare passport, insurance policy, and payment method", "Keep original medical records and receipts for insurance"],
  },
  "police-report": {
    ko: ["신고 목적을 분실·도난·보험용 중 하나로 명확히 말하기", "접수번호·담당 경찰서·날짜가 있는지 확인", "번역앱 화면과 물품 사진을 함께 제시"],
    "zh-Hans": ["说明报案目的：遗失、被盗或保险", "确认有案件编号、警署名称和日期", "出示翻译App画面和物品照片"],
    ja: ["届出目的を紛失・盗難・保険用のどれかで明確に伝える", "受付番号・警察署名・日付を確認", "翻訳アプリ画面と物品写真を一緒に提示"],
    "zh-Hant": ["明確說明用途：遺失、遭竊或保險", "確認有受理編號、警局名稱與日期", "同時出示翻譯App畫面與物品照片"],
    th: ["บอกวัตถุประสงค์ให้ชัดว่า ของหาย ถูกขโมย หรือใช้ประกัน", "ตรวจเลขคดี ชื่อสถานีตำรวจ และวันที่", "แสดงหน้าจอแปลภาษาและรูปสิ่งของ"],
    vi: ["Nói rõ mục đích: thất lạc, bị trộm hay dùng cho bảo hiểm", "Kiểm tra mã số, tên đồn cảnh sát và ngày tháng", "Đưa màn hình dịch và ảnh đồ vật"],
    en: ["State whether the report is for loss, theft, or insurance", "Check the case number, police station, and date", "Show translation app text and item photos together"],
  },
  scam: {
    ko: ["현장 언쟁보다 안전한 장소 이동이 먼저", "영수증·결제내역·간판·차량번호를 사진으로 보관", "카드 결제는 즉시 카드사 해외분쟁 접수"],
    "zh-Hans": ["不要在现场长时间争执，先转移到安全地点", "保存收据、付款记录、店招和车牌照片", "信用卡付款应尽快联系发卡行提出争议"],
    ja: ["現場で長く争わず、まず安全な場所へ移動", "領収書・決済記録・看板・車両番号を写真で保存", "カード決済はすぐカード会社へ異議申立て"],
    "zh-Hant": ["不要在現場長時間爭執，先移到安全地點", "保存收據、付款紀錄、店招與車牌照片", "刷卡付款請儘快向發卡行提出爭議"],
    th: ["อย่าเถียงนานในที่เกิดเหตุ ให้ย้ายไปที่ปลอดภัยก่อน", "ถ่ายใบเสร็จ รายการจ่ายเงิน ป้ายร้าน และทะเบียนรถ", "ถ้าจ่ายด้วยบัตร ให้ติดต่อธนาคารเพื่อโต้แย้งรายการทันที"],
    vi: ["Không tranh cãi lâu tại chỗ, hãy đi đến nơi an toàn trước", "Chụp hóa đơn, giao dịch, biển hiệu và biển số xe", "Nếu trả bằng thẻ, liên hệ ngân hàng để tranh chấp giao dịch ngay"],
    en: ["Move to a safe place before arguing on site", "Photograph receipt, payment record, storefront, and vehicle number", "For card payments, start a dispute with your issuer quickly"],
  },
};

const proofChecklist: Record<Language, { title: string; items: string[] }> = {
  ko: {
    title: "나중에 보험·공관·경찰에서 다시 요구하는 자료",
    items: ["여권/신분증 사본 또는 사진", "사건 발생 시간·장소 메모", "영수증·카드 승인내역·예약번호", "경찰 접수번호 또는 담당 기관명"],
  },
  "zh-Hans": {
    title: "之后保险、使领馆或警方常会再次要求的资料",
    items: ["护照/身份证件复印件或照片", "发生时间和地点记录", "收据、付款记录、预约编号", "警方受理编号或机构名称"],
  },
  ja: {
    title: "後で保険・公館・警察から再提出を求められやすい資料",
    items: ["旅券/身分証のコピーまたは写真", "発生時刻と場所のメモ", "領収書・カード明細・予約番号", "警察の受付番号または担当機関名"],
  },
  "zh-Hant": {
    title: "之後保險、辦事處或警方常會再次要求的資料",
    items: ["護照/身分證件影本或照片", "發生時間與地點紀錄", "收據、付款紀錄、預約編號", "警方受理編號或機關名稱"],
  },
  th: {
    title: "ข้อมูลที่ประกัน สถานทูต หรือตำรวจมักขอซ้ำภายหลัง",
    items: ["สำเนาหรือรูปพาสปอร์ต/บัตรประจำตัว", "เวลาและสถานที่เกิดเหตุ", "ใบเสร็จ รายการบัตร หรือเลขจอง", "เลขรับแจ้งความหรือชื่อหน่วยงาน"],
  },
  vi: {
    title: "Tài liệu bảo hiểm, lãnh sự hoặc cảnh sát thường yêu cầu lại",
    items: ["Bản sao hoặc ảnh hộ chiếu/giấy tờ tùy thân", "Thời gian và địa điểm xảy ra", "Hóa đơn, giao dịch thẻ hoặc mã đặt chỗ", "Mã số cảnh sát hoặc tên cơ quan xử lý"],
  },
  en: {
    title: "Details insurance, missions, or police often ask for later",
    items: ["Passport/ID copy or photo", "Time and place of the incident", "Receipts, card records, or booking numbers", "Police case number or office name"],
  },
};

const mistakeWarnings: Record<IncidentType, Record<Language, string>> = {
  "lost-passport": {
    ko: "공관에 분실 신고부터 해버리면 나중에 여권을 찾아도 사용할 수 없는 경우가 있습니다. 찾기와 경찰 확인을 먼저 끝내세요.",
    "zh-Hans": "不要一开始就直接申请补办。原护照一旦被注销，即使后来找回也可能不能继续使用。",
    ja: "最初に公館で失効手続きを進めると、後で旅券が見つかっても使えない場合があります。",
    "zh-Hant": "不要一開始就直接申請補辦。原護照一旦註銷，之後找回也可能無法使用。",
    th: "อย่าเริ่มจากการแจ้งยกเลิกพาสปอร์ตทันที เพราะถ้าพบภายหลังอาจใช้ไม่ได้แล้ว",
    vi: "Đừng vội yêu cầu hủy hộ chiếu ngay. Nếu tìm thấy sau khi đã hủy, hộ chiếu cũ có thể không dùng được nữa.",
    en: "Do not start by cancelling the passport unless necessary. If it is invalidated, a later-found passport may no longer work.",
  },
  "lost-phone": {
    ko: "위치추적 화면을 캡처하지 않고 로그아웃·초기화부터 하면 보험과 경찰 설명이 어려워질 수 있습니다.",
    "zh-Hans": "不要在截图定位和设备信息前就退出账号或清除设备。",
    ja: "位置情報や端末情報を保存する前にログアウトや初期化をしないでください。",
    "zh-Hant": "不要在截圖定位與裝置資訊前就登出或清除裝置。",
    th: "อย่าเพิ่งล้างเครื่องหรือล็อกเอาต์ก่อนบันทึกตำแหน่งและข้อมูลเครื่อง",
    vi: "Đừng đăng xuất hoặc xóa máy trước khi lưu ảnh vị trí và thông tin thiết bị.",
    en: "Do not wipe or sign out before saving location and device evidence.",
  },
  "lost-wallet": {
    ko: "현금 회수에 매달리다 카드 정지가 늦어지는 경우가 많습니다. 결제 차단이 먼저입니다.",
    "zh-Hans": "不要只想着找回现金而延误银行卡冻结。",
    ja: "現金を探すことに集中しすぎてカード停止が遅れないようにしてください。",
    "zh-Hant": "不要只顧找回現金而延誤停卡。",
    th: "อย่ามัวตามหาเงินสดจนลืมอายัดบัตร",
    vi: "Đừng chỉ tìm tiền mặt mà chậm khóa thẻ.",
    en: "Do not delay card freezes while trying to recover cash.",
  },
  hospital: {
    ko: "응급 상황에서 보험사 승인만 기다리면 위험할 수 있습니다. 응급번호와 병원 접수가 먼저입니다.",
    "zh-Hans": "紧急情况不要只等待保险公司批准，先联系急救或医院。",
    ja: "緊急時に保険会社の承認だけを待たず、救急連絡と病院受付を優先してください。",
    "zh-Hant": "緊急情況不要只等待保險公司批准，先聯絡急救或醫院。",
    th: "กรณีฉุกเฉินอย่ารออนุมัติประกันอย่างเดียว ให้ติดต่อฉุกเฉินหรือโรงพยาบาลก่อน",
    vi: "Khi khẩn cấp, đừng chỉ chờ bảo hiểm duyệt. Hãy gọi cấp cứu hoặc đến bệnh viện trước.",
    en: "In an emergency, do not wait only for insurer approval. Contact emergency care first.",
  },
  "police-report": {
    ko: "구두 상담만 하고 나오면 보험 청구가 막힐 수 있습니다. 접수번호가 남는지 확인하세요.",
    "zh-Hans": "不要只做口头咨询就离开。请确认是否有受理编号。",
    ja: "口頭相談だけで帰らず、受付番号が残るか確認してください。",
    "zh-Hant": "不要只做口頭諮詢就離開。請確認是否有受理編號。",
    th: "อย่าออกมาหลังคุยปากเปล่าเท่านั้น ต้องถามว่ามีเลขรับแจ้งหรือไม่",
    vi: "Đừng chỉ hỏi miệng rồi rời đi. Hãy kiểm tra có mã số tiếp nhận không.",
    en: "Do not leave after only a verbal conversation. Confirm whether a case number exists.",
  },
  scam: {
    ko: "현장에서 오래 싸우면 더 위험해질 수 있습니다. 안전한 장소 이동과 증거 보관이 먼저입니다.",
    "zh-Hans": "不要在现场长时间争执。先离开到安全地点并保存证据。",
    ja: "現場で長く争うと危険が増えます。安全な場所への移動と証拠保存を優先してください。",
    "zh-Hant": "不要在現場長時間爭執。先移到安全地點並保存證據。",
    th: "อย่าเถียงนานในที่เกิดเหตุ ให้ไปที่ปลอดภัยและเก็บหลักฐานก่อน",
    vi: "Không tranh cãi lâu tại chỗ. Hãy đến nơi an toàn và lưu bằng chứng trước.",
    en: "Do not argue for too long on site. Move somewhere safe and preserve evidence first.",
  },
};

export function TravelerDepthSection({
  profile,
  countryName,
  cityName,
  incidentName,
  incident,
}: TravelerDepthSectionProps) {
  const copy = labels[profile.language];
  const checks = incidentChecks[incident][profile.language];

  return (
    <section className="mt-10 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 md:p-6">
      <h2 className="text-xl font-bold text-gray-950">{copy.heading}</h2>
      <p className="mt-2 text-sm leading-6 text-gray-700">
        {copy.intro({
          nationality: profile.nativeName,
          cityName,
          countryName,
          incidentName,
        })}
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {checks.map((item, index) => (
          <div key={item} className="rounded-xl border border-white bg-white p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
              {copy.cards[index]}
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-700">{item}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <h3 className="text-sm font-bold text-gray-900">{copy.fieldTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            {cityName} · {countryName} · {incidentName}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <h3 className="text-sm font-bold text-gray-900">{copy.officialTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            {copy.officialText(profile.consularHotline)}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <h3 className="text-sm font-bold text-amber-950">{copy.beforeTitle}</h3>
        <p className="mt-2 text-sm leading-6 text-amber-900">
          {mistakeWarnings[incident][profile.language]}
        </p>
      </div>

      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4">
        <h3 className="text-sm font-bold text-gray-900">
          {proofChecklist[profile.language].title}
        </h3>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-gray-700 md:grid-cols-2">
          {proofChecklist[profile.language].items.map((item) => (
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
