import type { IncidentType } from "@/lib/site-config";
import type { TravelerProfile } from "@/lib/traveler-profiles";

type Language = TravelerProfile["language"];

interface GuideQualitySectionProps {
  profile: TravelerProfile;
  countryName: string;
  cityName: string;
  incidentName: string;
  incident: IncidentType;
  emergencyNumber?: string;
}

const advice: Record<Language, Record<IncidentType, string[]>> = {
  ko: {
    "lost-passport": [
      "처음 한 시간은 서류 접수보다 증거 확보가 먼저입니다. 마지막으로 본 장소, 숙소, 교통기관 분실물 센터를 확인하고 누가 어디를 확인했는지 적어두세요.",
      "경찰 신고와 긴급 여권 발급은 같은 단계가 아닙니다. 경찰 확인서는 공관 접수, 보험 청구, 항공사 설명에 필요한 근거가 될 수 있습니다.",
      "공관까지 이동하기 전에 사진 규격, 신분 확인 자료, 결제 수단, 접수 마감 시간, 당일 예약 필요 여부를 전화로 확인하세요.",
    ],
    "lost-phone": [
      "기기 교체보다 계정 보호가 먼저입니다. 마지막 위치 화면을 저장하고 SIM/eSIM과 결제 앱을 정지하세요.",
      "보험 청구가 필요하면 IMEI, 구매 내역, 경찰 접수번호, 통신사 정지 확인 자료를 함께 보관하세요.",
      "임시 SIM은 은행, 지도, 호텔, 항공사 계정에 실제로 접속되는지 확인한 뒤 사용하세요.",
    ],
    "lost-wallet": [
      "카드 정지가 현금 회수보다 먼저입니다. 이후 도난, 보험, 카드 분쟁 중 어떤 목적 때문에 경찰 신고가 필요한지 판단하세요.",
      "지갑 문제와 신분증 문제를 분리하세요. 여권이나 신분증이 함께 있었다면 문서 재발급 절차를 별도로 진행해야 합니다.",
      "카드 승인 내역, ATM 시도, 상호명, 고객센터 상담 화면은 나중에 은행이나 보험사가 요구할 수 있습니다.",
    ],
    hospital: [
      "응급 가능성이 있으면 보험 승인보다 현지 응급 진료가 먼저입니다. 보상 문제보다 치료 지연이 더 위험할 수 있습니다.",
      "병원이나 클리닉을 떠나기 전에 항목별 영수증, 진단명, 처방약 이름, 퇴원 또는 진료 기록을 요청하세요.",
      "언어가 어렵다면 진단, 처치, 이동 제한, 재진 필요 여부를 짧은 문장으로 적어달라고 요청하세요.",
    ],
    "police-report": [
      "신고 목적을 분명히 말하세요. 분실 확인서, 도난 신고, 보험 증빙, 카드 분쟁 중 무엇인지에 따라 문서가 달라질 수 있습니다.",
      "창구를 떠나기 전에 날짜, 경찰서명, 접수번호, 본인 이름, 물품 설명이 들어갔는지 확인하세요.",
      "문서 발급이 어렵다면 어떤 확인번호나 서면 메모를 받을 수 있는지, 여행자는 보통 어디서 다시 요청하는지 물어보세요.",
    ],
    scam: [
      "현장에서 오래 다투기보다 안전한 장소로 이동하세요. 영수증, 카드 승인 내역, 사진, 메시지, 시간 순서가 가장 강한 증거입니다.",
      "카드 결제라면 카드사에 빨리 연락해 해외 분쟁, 승인 취소, 추가 부정사용 모니터링 중 무엇이 필요한지 확인하세요.",
      "협박, 억류, 여권 압박이 있었다면 단순 환불 문제가 아니라 안전 문제로 보고 경찰이나 공관 지원을 고려하세요.",
    ],
  },
  en: {
    "lost-passport": [
      "Treat the first hour as evidence collection, not paperwork. Search the last known location, ask the hotel or transport operator, and write down who checked which place.",
      "Do not assume a police report and an emergency passport are the same step. The police record usually supports the consular application, insurance claim, and airline explanation.",
      "Before crossing the city to a mission, call and ask about photo size, identity proof, payment method, intake cutoff, and whether an appointment is required that day.",
    ],
    "lost-phone": [
      "Secure accounts before replacing the device. Save screenshots of the last location, suspend the SIM or eSIM, and lock payment apps before recovery options can be reset.",
      "If travel insurance is involved, keep the IMEI, purchase record, police case number, and carrier suspension confirmation together.",
      "A temporary SIM is useful only if it preserves access to banking, maps, hotel bookings, and airline messages. Test those accounts before leaving the shop.",
    ],
    "lost-wallet": [
      "Freeze cards first, then decide whether a police report is needed for theft, insurance, or card disputes.",
      "Separate the wallet problem from identity documents. If passport or national ID was inside, follow the document replacement flow as a second track.",
      "Keep screenshots of card approvals, ATM attempts, merchant names, and support chats because banks often ask for a timeline later.",
    ],
    hospital: [
      "For symptoms that could become urgent, use local emergency care first and insurer approval second.",
      "Ask for itemized receipts, diagnosis notes, medicine names, and discharge records before leaving the clinic or hospital.",
      "If language is a problem, ask the provider to write the diagnosis, treatment, and follow-up restriction in short phrases that can be translated later.",
    ],
    "police-report": [
      "Explain the purpose of the report clearly: loss certificate, theft report, insurance evidence, or card dispute.",
      "Before leaving the desk, check the date, station name, case number, your name, and item description.",
      "If the office cannot issue a document, ask what written confirmation or reference number can be provided.",
    ],
    scam: [
      "Move to a safe place before arguing about a charge. The strongest case is usually built from receipts, card records, photos, messages, and a clean timeline.",
      "For card payments, contact the issuer quickly and ask whether the transaction should be disputed, cancelled, or monitored for follow-up fraud.",
      "If threats, forced detention, or identity document pressure were involved, treat it as a safety incident and contact police or consular support.",
    ],
  },
  ja: {
    "lost-passport": [
      "最初の1時間は手続きより証拠確認を優先します。最後に見た場所、宿泊先、交通機関の遺失物窓口を確認し、誰がどこを確認したか記録します。",
      "警察届と緊急旅券の申請は同じ手続きではありません。警察の記録は公館申請、保険請求、航空会社への説明に使うことがあります。",
      "在外公館へ移動する前に、写真規格、本人確認資料、支払い方法、受付締切、当日の予約要否を確認してください。",
    ],
    "lost-phone": [
      "端末の買い替えよりアカウント保護を先にします。最後の位置情報を保存し、SIM/eSIMと決済アプリを止めてください。",
      "保険を使う場合は、IMEI、購入記録、警察の受付番号、通信会社の停止確認をまとめて保管します。",
      "一時SIMを使う前に、銀行、地図、ホテル予約、航空会社通知に実際に入れるか確認してください。",
    ],
    "lost-wallet": [
      "現金の回収よりカード停止を優先します。その後、盗難、保険、カード異議申し立てのために警察届が必要か判断します。",
      "財布の問題と身分証の問題を分けて考えます。旅券や身分証が入っていた場合は、書類再発行を別の流れで進めます。",
      "カード利用履歴、ATMの試行、店名、サポートとのやり取りは後で求められることがあります。",
    ],
    hospital: [
      "緊急性がある症状では、保険会社の承認より現地の救急対応が先です。",
      "病院やクリニックを出る前に、明細付き領収書、診断名、薬名、診療記録を依頼してください。",
      "言語が難しい場合は、診断、処置、移動制限、再診の必要性を短い文で書いてもらいます。",
    ],
    "police-report": [
      "届出の目的を明確に伝えます。紛失証明、盗難届、保険資料、カード異議申し立てで必要な書類が変わることがあります。",
      "窓口を離れる前に、日付、警察署名、受付番号、氏名、物品説明が入っているか確認します。",
      "書類が出ない場合は、代わりの確認番号や書面メモをもらえるか確認してください。",
    ],
    scam: [
      "現場で長く争うより、安全な場所へ移動します。領収書、カード記録、写真、メッセージ、時系列が重要です。",
      "カード決済なら、早めにカード会社へ連絡し、異議申し立て、取消、追加不正利用の監視が必要か確認します。",
      "脅迫、拘束、身分証の圧力があった場合は、安全上の問題として警察や在外公館への相談を検討します。",
    ],
  },
  "zh-Hans": {
    "lost-passport": ["最初一小时先收集证据而不是只办手续。确认最后出现地点、酒店和交通机构失物处，并记录谁确认了哪里。", "警方记录和紧急旅行证件不是同一步。警方记录常用于领事申请、保险理赔和航空公司说明。", "前往使领馆前，先确认照片规格、身份证明、付款方式、受理截止时间和是否需要预约。"],
    "lost-phone": ["先保护账户，再更换设备。保存最后定位截图，停用 SIM/eSIM，并锁定支付应用。", "如需保险理赔，请把 IMEI、购买记录、警方案件编号和运营商停机确认放在一起。", "临时 SIM 只有在能继续使用银行、地图、酒店和航空信息时才有用，离店前请测试。"],
    "lost-wallet": ["先冻结银行卡，再判断是否因盗窃、保险或卡片争议需要报警记录。", "把钱包问题和身份证件问题分开。如果护照或身份证也在里面，应另走证件补办流程。", "保留交易记录、ATM 尝试、商户名称和客服聊天截图，银行之后常会要求时间线。"],
    hospital: ["可能紧急时，先使用当地急救或医疗服务，再处理保险批准。", "离开医院或诊所前索取明细收据、诊断记录、药名和出院或就诊记录。", "如果语言困难，请医生用简短句子写下诊断、治疗和后续限制，便于之后翻译。"],
    "police-report": ["明确说明报告用途：遗失证明、盗窃报案、保险证据或银行卡争议。", "离开窗口前确认日期、警局名称、案件编号、姓名和物品描述。", "如果无法出具文件，询问可否提供书面确认或参考编号。"],
    scam: ["先离开不安全现场，再争议收费。收据、卡片记录、照片、消息和清晰时间线最有用。", "刷卡付款时，尽快联系发卡行确认应发起争议、取消交易还是监控后续欺诈。", "如涉及威胁、强行滞留或扣押证件，应按安全事件处理并联系警方或领事支持。"],
  },
  "zh-Hant": {
    "lost-passport": ["最初一小時先收集證據，而不是只辦手續。確認最後出現地點、住宿處和交通機構失物處，並記錄誰確認了哪裡。", "警方紀錄和緊急旅行證件不是同一步。警方紀錄常用於領事申請、保險理賠和航空公司說明。", "前往駐外單位前，先確認照片規格、身分證明、付款方式、受理截止時間和是否需要預約。"],
    "lost-phone": ["先保護帳號，再更換裝置。保存最後定位截圖，停用 SIM/eSIM，並鎖定支付 App。", "如需保險理賠，請把 IMEI、購買紀錄、警方案件編號和電信停用確認放在一起。", "臨時 SIM 只有在能繼續使用銀行、地圖、住宿和航空資訊時才有用，離店前請測試。"],
    "lost-wallet": ["先停用卡片，再判斷是否因竊盜、保險或卡片爭議需要警方紀錄。", "把錢包問題和身分證件問題分開。如果護照或身分證也在裡面，應另走證件補辦流程。", "保留交易紀錄、ATM 嘗試、商戶名稱和客服對話截圖，銀行之後常會要求時間線。"],
    hospital: ["可能緊急時，先使用當地急救或醫療服務，再處理保險核准。", "離開醫院或診所前索取明細收據、診斷紀錄、藥名和出院或就診紀錄。", "如果語言困難，請醫師用簡短句子寫下診斷、治療和後續限制，方便之後翻譯。"],
    "police-report": ["明確說明報告用途：遺失證明、竊盜報案、保險證據或信用卡爭議。", "離開窗口前確認日期、警局名稱、案件編號、姓名和物品描述。", "如果無法出具文件，詢問可否提供書面確認或參考編號。"],
    scam: ["先離開不安全現場，再爭議收費。收據、卡片紀錄、照片、訊息和清楚時間線最有用。", "刷卡付款時，盡快聯絡發卡行確認應發起爭議、取消交易還是監控後續詐欺。", "如涉及威脅、強行滯留或扣押證件，應按安全事件處理並聯絡警方或領事支援。"],
  },
  th: {
    "lost-passport": ["ชั่วโมงแรกควรเก็บหลักฐานก่อนเอกสาร ตรวจสถานที่สุดท้าย โรงแรม และศูนย์ของหายของขนส่ง แล้วจดว่าใครตรวจที่ไหน", "ใบแจ้งความกับเอกสารเดินทางฉุกเฉินไม่ใช่ขั้นตอนเดียวกัน เอกสารตำรวจมักใช้ประกอบสถานทูต ประกัน และสายการบิน", "ก่อนเดินทางไปสถานทูต ให้โทรยืนยันขนาดรูป หลักฐานตัวตน วิธีชำระเงิน เวลาปิดรับ และการนัดหมาย"],
    "lost-phone": ["ปกป้องบัญชีก่อนซื้อเครื่องใหม่ บันทึกตำแหน่งล่าสุด ระงับ SIM/eSIM และล็อกแอปชำระเงิน", "ถ้าจะเคลมประกัน เก็บ IMEI หลักฐานซื้อ หมายเลขคดี และเอกสารระงับบริการไว้ด้วยกัน", "ซิมชั่วคราวมีประโยชน์เมื่อยังเข้าแอปธนาคาร แผนที่ โรงแรม และสายการบินได้ ทดสอบก่อนออกจากร้าน"],
    "lost-wallet": ["อายัดบัตรก่อน แล้วค่อยตัดสินใจว่าต้องแจ้งตำรวจเพื่อการโจรกรรม ประกัน หรือข้อพิพาทบัตรหรือไม่", "แยกปัญหากระเป๋าสตางค์ออกจากเอกสารตัวตน ถ้ามีพาสปอร์ตหรือบัตรประชาชนอยู่ด้วย ให้ทำขั้นตอนเอกสารอีกทาง", "เก็บประวัติอนุมัติบัตร การลองกด ATM ชื่อร้าน และแชตบริการลูกค้าไว้เป็นไทม์ไลน์"],
    hospital: ["ถ้าอาจฉุกเฉิน ให้ใช้บริการฉุกเฉินในพื้นที่ก่อน รออนุมัติประกันทีหลัง", "ก่อนออกจากคลินิกหรือโรงพยาบาล ขอใบเสร็จแยกรายการ บันทึกวินิจฉัย ชื่อยา และเอกสารจำหน่าย", "ถ้าภาษาเป็นปัญหา ขอให้ผู้ให้บริการเขียนวินิจฉัย การรักษา และข้อจำกัดสั้น ๆ เพื่อแปลภายหลัง"],
    "police-report": ["บอกวัตถุประสงค์ของรายงานให้ชัด: ของหาย ถูกขโมย ประกัน หรือข้อพิพาทบัตร", "ก่อนออกจากโต๊ะ ตรวจวันที่ ชื่อสถานี หมายเลขคดี ชื่อของคุณ และรายละเอียดสิ่งของ", "ถ้าออกเอกสารไม่ได้ ให้ถามว่ามีเลขอ้างอิงหรือบันทึกเป็นลายลักษณ์อักษรแบบใดได้บ้าง"],
    scam: ["ย้ายไปที่ปลอดภัยก่อนโต้แย้งค่าใช้จ่าย หลักฐานที่ดีคือใบเสร็จ รายการบัตร รูป ข้อความ และไทม์ไลน์ชัดเจน", "ถ้าจ่ายด้วยบัตร รีบติดต่อผู้ออกบัตรเพื่อถามว่าควรโต้แย้ง ยกเลิก หรือเฝ้าระวังรายการต่อไป", "ถ้ามีการข่มขู่ กักตัว หรือกดดันเรื่องเอกสาร ให้ถือเป็นเหตุด้านความปลอดภัยและติดต่อ警方หรือกงสุล"],
  },
  vi: {
    "lost-passport": ["Giờ đầu tiên nên thu thập bằng chứng trước khi làm giấy tờ. Kiểm tra nơi cuối cùng, khách sạn và bộ phận đồ thất lạc, rồi ghi lại ai đã kiểm tra đâu.", "Biên bản cảnh sát và giấy thông hành khẩn cấp không phải cùng một bước. Hồ sơ cảnh sát thường hỗ trợ lãnh sự, bảo hiểm và hãng bay.", "Trước khi đi tới cơ quan lãnh sự, hãy gọi xác nhận cỡ ảnh, giấy tờ định danh, cách thanh toán, giờ nhận hồ sơ và yêu cầu đặt lịch."],
    "lost-phone": ["Bảo vệ tài khoản trước khi thay máy. Lưu vị trí cuối cùng, khóa SIM/eSIM và khóa ứng dụng thanh toán.", "Nếu cần bảo hiểm, giữ IMEI, hóa đơn mua, số hồ sơ cảnh sát và xác nhận khóa dịch vụ cùng nhau.", "SIM tạm chỉ hữu ích nếu vẫn truy cập được ngân hàng, bản đồ, khách sạn và hãng bay. Hãy thử trước khi rời cửa hàng."],
    "lost-wallet": ["Khóa thẻ trước, rồi quyết định có cần biên bản cảnh sát cho trộm cắp, bảo hiểm hay tranh chấp thẻ không.", "Tách vấn đề ví khỏi giấy tờ tùy thân. Nếu hộ chiếu hoặc ID ở trong ví, hãy xử lý thay giấy tờ như một luồng riêng.", "Giữ ảnh giao dịch thẻ, lần thử ATM, tên cửa hàng và trao đổi với hỗ trợ vì ngân hàng thường cần dòng thời gian."],
    hospital: ["Nếu có thể khẩn cấp, dùng chăm sóc y tế địa phương trước rồi xử lý phê duyệt bảo hiểm sau.", "Trước khi rời bệnh viện hoặc phòng khám, xin hóa đơn chi tiết, chẩn đoán, tên thuốc và hồ sơ ra viện hoặc điều trị.", "Nếu khó về ngôn ngữ, nhờ bác sĩ viết chẩn đoán, điều trị và hạn chế theo câu ngắn để dịch sau."],
    "police-report": ["Nói rõ mục đích báo cáo: giấy xác nhận mất, báo trộm, bằng chứng bảo hiểm hay tranh chấp thẻ.", "Trước khi rời quầy, kiểm tra ngày, tên đồn, số hồ sơ, tên của bạn và mô tả đồ vật.", "Nếu không cấp giấy, hỏi có thể nhận xác nhận bằng văn bản hoặc số tham chiếu nào."],
    scam: ["Di chuyển đến nơi an toàn trước khi tranh cãi phí. Bằng chứng mạnh nhất là hóa đơn, giao dịch thẻ, ảnh, tin nhắn và dòng thời gian rõ.", "Nếu trả bằng thẻ, liên hệ đơn vị phát hành sớm để hỏi nên tranh chấp, hủy hay theo dõi gian lận tiếp theo.", "Nếu có đe dọa, giữ người hoặc ép về giấy tờ, hãy xem là vấn đề an toàn và liên hệ cảnh sát hoặc lãnh sự."],
  },
};

const labels: Record<Language, {
  eyebrow: string;
  heading: (city: string, incident: string) => string;
  intro: (country: string, city: string, incident: string) => string;
  check: (index: number) => string;
  emergency: string;
  localContacts: string;
  nationality: string;
  official: string;
  officialLink: string;
}> = {
  ko: {
    eyebrow: "현장 판단 가이드",
    heading: (city, incident) => `${city}에서 ${incident} 상황을 판단하는 기준`,
    intro: (country, city, incident) => `${country} ${city}에서 ${incident} 상황이 생기면 분실, 도난, 응급, 보험 청구, 공관 서류 목적에 따라 먼저 해야 할 일이 달라집니다. 아래 기준은 잘못된 기관이나 문서 때문에 시간을 잃지 않도록 정리한 보강 가이드입니다.`,
    check: (index) => `${index + 1}. 확인 포인트`,
    emergency: "긴급 연락",
    localContacts: "본문의 현지 기관 연락처를 먼저 확인하세요.",
    nationality: "국적별 확인",
    official: "공식 안내",
    officialLink: "출발 전 다시 확인",
  },
  en: {
    eyebrow: "Field decision guide",
    heading: (city) => `How to make the right call in ${city}`,
    intro: (country, city, incident) => `The right next step for ${incident.toLowerCase()} in ${city}, ${country} depends on whether the issue is loss, theft, medical urgency, insurance evidence, or consular documentation. Use these checks to avoid losing time on the wrong office or document.`,
    check: (index) => `Check ${index + 1}`,
    emergency: "Emergency contact",
    localContacts: "Check the local contacts listed in this guide.",
    nationality: "Nationality check",
    official: "Official source",
    officialLink: "Recheck before you go",
  },
  ja: {
    eyebrow: "現地判断ガイド",
    heading: (city, incident) => `${city}で${incident}に対応する判断基準`,
    intro: (country, city, incident) => `${country} ${city}で${incident}が起きた場合、紛失、盗難、医療の緊急性、保険資料、領事書類のどれに当たるかで次の行動が変わります。間違った窓口や書類で時間を失わないための確認ポイントです。`,
    check: (index) => `${index + 1}. 確認ポイント`,
    emergency: "緊急連絡先",
    localContacts: "本文の現地連絡先を確認してください。",
    nationality: "国籍別の確認",
    official: "公式情報",
    officialLink: "出発前に再確認",
  },
  "zh-Hans": {
    eyebrow: "现场判断指南",
    heading: (city, incident) => `在${city}处理${incident}的判断标准`,
    intro: (country, city, incident) => `在${country}${city}遇到${incident}时，下一步取决于是遗失、盗窃、医疗紧急、保险证据还是领事文件。以下检查点可帮助避免跑错机构或准备错文件。`,
    check: (index) => `${index + 1}. 检查点`,
    emergency: "紧急联系",
    localContacts: "请先查看本文列出的当地联系方式。",
    nationality: "国籍相关确认",
    official: "官方来源",
    officialLink: "出发前再次确认",
  },
  "zh-Hant": {
    eyebrow: "現場判斷指南",
    heading: (city, incident) => `在${city}處理${incident}的判斷標準`,
    intro: (country, city, incident) => `在${country}${city}遇到${incident}時，下一步取決於是遺失、竊盜、醫療緊急、保險證據還是領事文件。以下檢查點可避免跑錯機構或準備錯文件。`,
    check: (index) => `${index + 1}. 確認點`,
    emergency: "緊急聯絡",
    localContacts: "請先查看本文列出的當地聯絡方式。",
    nationality: "國籍相關確認",
    official: "官方來源",
    officialLink: "出發前再次確認",
  },
  th: {
    eyebrow: "คู่มือตัดสินใจหน้างาน",
    heading: (city, incident) => `เกณฑ์ตัดสินใจเมื่อเจอ${incident}ใน${city}`,
    intro: (country, city, incident) => `เมื่อเกิด${incident}ใน${city}, ${country} ขั้นตอนถัดไปขึ้นกับว่าเป็นของหาย การโจรกรรม เหตุแพทย์ฉุกเฉิน หลักฐานประกัน หรือเอกสารกงสุล ใช้จุดตรวจเหล่านี้เพื่อไม่เสียเวลากับหน่วยงานหรือเอกสารผิดประเภท`,
    check: (index) => `จุดตรวจ ${index + 1}`,
    emergency: "ติดต่อฉุกเฉิน",
    localContacts: "ตรวจช่องทางติดต่อในพื้นที่ที่ระบุในคู่มือนี้",
    nationality: "ตรวจตามสัญชาติ",
    official: "แหล่งทางการ",
    officialLink: "ตรวจอีกครั้งก่อนเดินทาง",
  },
  vi: {
    eyebrow: "Hướng dẫn quyết định tại chỗ",
    heading: (city, incident) => `Cách quyết định khi gặp ${incident} ở ${city}`,
    intro: (country, city, incident) => `Bước tiếp theo khi gặp ${incident} ở ${city}, ${country} phụ thuộc vào việc đó là mất đồ, trộm cắp, y tế khẩn cấp, bằng chứng bảo hiểm hay giấy tờ lãnh sự. Các điểm kiểm tra này giúp tránh mất thời gian vì sai cơ quan hoặc sai giấy tờ.`,
    check: (index) => `Điểm kiểm tra ${index + 1}`,
    emergency: "Liên hệ khẩn cấp",
    localContacts: "Kiểm tra liên hệ địa phương được liệt kê trong hướng dẫn này.",
    nationality: "Kiểm tra theo quốc tịch",
    official: "Nguồn chính thức",
    officialLink: "Kiểm tra lại trước khi đi",
  },
};

export function GuideQualitySection({
  profile,
  countryName,
  cityName,
  incidentName,
  incident,
  emergencyNumber,
}: GuideQualitySectionProps) {
  const l = labels[profile.language];
  const items = advice[profile.language][incident];

  return (
    <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
      <p className="text-xs font-bold uppercase tracking-wide text-blue-700">{l.eyebrow}</p>
      <h2 className="mt-2 text-xl font-bold leading-snug text-gray-950 md:text-2xl">
        {l.heading(cityName, incidentName)}
      </h2>
      <p className="mt-3 text-sm leading-6 text-gray-700">
        {l.intro(countryName, cityName, incidentName)}
      </p>

      <div className="mt-5 grid gap-3">
        {items.map((item, index) => (
          <article key={item} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <h3 className="text-sm font-bold text-gray-900">{l.check(index)}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-700">{item}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <h3 className="text-sm font-bold text-blue-950">{l.emergency}</h3>
          <p className="mt-2 text-sm leading-6 text-blue-900">
            {emergencyNumber ? `${cityName}: ${emergencyNumber}` : l.localContacts}
          </p>
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <h3 className="text-sm font-bold text-blue-950">{l.nationality}</h3>
          <p className="mt-2 text-sm leading-6 text-blue-900">
            {profile.nativeName} · {profile.consularHotline}
          </p>
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <h3 className="text-sm font-bold text-blue-950">{l.official}</h3>
          <a
            href={profile.officialGuidance}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex text-sm font-semibold text-blue-700 hover:underline"
          >
            {l.officialLink}
          </a>
        </div>
      </div>
    </section>
  );
}
