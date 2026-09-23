import type { TravelerProfile } from "./traveler-profiles";

export type ResponseLanguage = TravelerProfile["language"];
interface ResponseCopy {
  title: string; intro: string; first: string; prep: string; progress: string; reset: string; saved: string;
  steps: readonly string[]; details: readonly string[];
  sources: string; scope: string; updated: string; published: string; policy: string; report: string;
  honest: string; city: string;
}
export const responseCopy: Record<ResponseLanguage, ResponseCopy> = {
  ko: {
    title: "휴대폰 분실 대응 체크리스트", intro: "안전한 기기에서 계정을 보호하세요. 위치가 보여도 직접 찾아가 대면하지 마세요. 잠금이 풀려 있거나 금융앱이 노출됐다면 회선과 결제 차단을 우선하세요.",
    first: "지금 먼저 할 일", prep: "여행 준비", progress: "대응 진행률", reset: "진행 기록 지우기", saved: "완료 항목만 이 브라우저에 저장합니다. 공용 기기에서는 사용 후 기록을 지우세요.",
    steps: ["기기 찾기·원격 잠금", "SIM·eSIM 정지", "결제·계정 보호", "증거 보관", "사실대로 경찰 신고", "보험사에 보장 확인"],
    details: ["Apple 나의 찾기 또는 Google Find Hub에서 분실 모드를 설정하세요. 기기를 계정에서 제거하지 마세요.", "통신사에 회선 정지를 요청하세요. 문자 인증을 못 받으면 계정 복구 수단을 확인하세요.", "은행과 결제 서비스에 연락하고, 이메일과 주요 계정의 낯선 접속을 확인하세요.", "마지막 위치·시각, 일련번호, 구매 내역을 안전하게 보관하세요. 초기화는 되돌릴 수 없습니다.", "확인한 경위를 설명하고 접수번호와 받을 수 있는 서류를 확인하세요. 추측은 사실과 구분하세요.", "분실·도난 보장 범위, 자기부담금, 제출 기한을 약관과 보험사에서 확인하세요. 지급은 보장되지 않습니다."],
    sources: "직접 확인할 공식 안내", scope: "AbroadWatch가 정리한 대응 안내입니다. 아래 날짜는 문서 수정일이며 모든 기관의 연락처·수수료를 그날 재검증했다는 뜻은 아닙니다.", updated: "문서 수정", published: "게시", policy: "편집 원칙", report: "오류 제보", honest: "분실과 도난은 실제 경위대로 신고하세요. 보상 여부와 처리 기간은 약관과 담당 기관에 따라 다릅니다.", city: "도시별 신고 절차",
  },
  en: {
    title: "Lost phone response checklist", intro: "Use a trusted device to secure your accounts. Do not confront anyone at a tracked location. If the phone is unlocked or banking is exposed, block the line and payments first.",
    first: "What to do first", prep: "Trip preparation", progress: "Response progress", reset: "Clear progress", saved: "Only completed steps are saved in this browser. Clear them after using a shared device.",
    steps: ["Locate and lock", "Suspend SIM or eSIM", "Protect payments and accounts", "Keep evidence", "Report the facts", "Check insurance coverage"],
    details: ["Enable lost mode using Apple Find My or Google Find Hub. Do not remove the device from your account.", "Ask your carrier to suspend the line. Check account recovery options if SMS codes are unavailable.", "Contact your bank and payment providers; review unfamiliar sessions in email and key accounts.", "Keep the last location and time, serial number and purchase record securely. Erasing cannot be undone.", "Explain what happened and ask for a case number and available documents. Separate observations from assumptions.", "Check loss/theft coverage, excess and deadlines with your insurer. Payment is not guaranteed."],
    sources: "Official instructions to check", scope: "This is a response guide compiled by AbroadWatch. The date records document changes, not a fresh verification of every contact or fee.", updated: "Document updated", published: "Published", policy: "Editorial policy", report: "Report an error", honest: "Report loss or theft according to the facts. Coverage and processing times depend on the policy and responsible organization.", city: "City reporting steps",
  },
  "zh-Hans": {
    title: "手机遗失应对清单", intro: "使用可信设备保护账户。即使看到定位，也不要自行前往与他人对峙。如果手机未锁定或银行应用暴露，请优先停用号码和支付。",
    first: "现在先做什么", prep: "行前准备", progress: "处理进度", reset: "清除进度", saved: "仅在此浏览器保存已完成项目。使用公共设备后请清除。",
    steps: ["定位并锁定", "停用 SIM 或 eSIM", "保护支付与账户", "保存证据", "如实报警", "确认保险保障"],
    details: ["通过 Apple 查找或 Google Find Hub 开启丢失模式。不要从账户移除设备。", "联系运营商暂停号码；无法接收短信时，确认账户恢复方式。", "联系银行和支付平台，检查邮箱及重要账户的陌生登录。", "妥善保存最后位置、时间、序列号与购买记录。抹除操作无法撤销。", "说明实际经过，询问案件编号及可提供的证明，区分事实与推测。", "向保险公司确认遗失或盗窃保障、免赔额与提交期限；不保证赔付。"],
    sources: "可直接核对的官方说明", scope: "本指南由 AbroadWatch 整理。日期为文档修改日期，不代表当天重新核实了所有联系方式与费用。", updated: "文档修改", published: "发布", policy: "编辑原则", report: "报告错误", honest: "请按实际经过报告遗失或盗窃。保障范围与处理时间取决于条款和主管机构。", city: "各城市报案步骤",
  },
  "zh-Hant": {
    title: "手機遺失應對清單", intro: "使用可信任的裝置保護帳戶。即使看到定位，也不要自行前往與他人對峙。若手機未鎖定或銀行應用程式暴露，請優先停用門號與支付。",
    first: "現在先做什麼", prep: "行前準備", progress: "處理進度", reset: "清除進度", saved: "僅在此瀏覽器儲存已完成項目。使用公用裝置後請清除。",
    steps: ["定位並鎖定", "停用 SIM 或 eSIM", "保護支付與帳戶", "保存證據", "如實報案", "確認保險保障"],
    details: ["透過 Apple 尋找或 Google Find Hub 啟用遺失模式。不要從帳戶移除裝置。", "聯絡電信業者暫停門號；無法收取簡訊時，確認帳戶復原方式。", "聯絡銀行及支付平台，檢查電子郵件與重要帳戶的陌生登入。", "妥善保存最後位置、時間、序號與購買紀錄。清除操作無法復原。", "說明實際經過，詢問案件編號及可提供的證明，區分事實與推測。", "向保險公司確認遺失或竊盜保障、自負額與申請期限；不保證理賠。"],
    sources: "可直接核對的官方說明", scope: "本指南由 AbroadWatch 整理。日期為文件修改日期，不代表當天重新核實所有聯絡資訊與費用。", updated: "文件修改", published: "發布", policy: "編輯原則", report: "回報錯誤", honest: "請按實際經過報告遺失或竊盜。保障範圍與處理時間取決於條款和主管機關。", city: "各城市報案步驟",
  },
  ja: {
    title: "スマートフォン紛失時のチェックリスト", intro: "信頼できる端末からアカウントを保護してください。位置が表示されても相手に直接接触しないでください。ロックが解除されている場合は回線と決済の停止を優先します。",
    first: "まず行うこと", prep: "出発前の準備", progress: "対応の進捗", reset: "進捗を消去", saved: "完了項目のみこのブラウザに保存します。共用端末では使用後に消去してください。",
    steps: ["位置確認とロック", "SIM・eSIMの停止", "決済とアカウントの保護", "証拠の保存", "事実に沿った届出", "保険の補償確認"],
    details: ["Appleの「探す」またはGoogle Find Hubで紛失モードを有効にします。アカウントから端末を削除しないでください。", "通信会社に回線停止を依頼し、SMSが使えない場合のアカウント復旧方法を確認します。", "銀行と決済サービスに連絡し、メールなどの不審なログインを確認します。", "最後の位置と時刻、シリアル番号、購入記録を安全に保存します。初期化は取り消せません。", "実際の経緯を説明し、受理番号と発行可能な書類を確認します。推測は事実と区別します。", "紛失・盗難の補償範囲、免責金額、提出期限を保険会社に確認します。支払いは保証されません。"],
    sources: "確認できる公式案内", scope: "AbroadWatchが整理した対応案内です。日付は文書の更新日であり、すべての連絡先や料金を再確認した日ではありません。", updated: "文書更新", published: "公開", policy: "編集方針", report: "誤りを報告", honest: "紛失と盗難は事実に沿って届け出てください。補償と処理期間は約款や担当機関によって異なります。", city: "都市別の届出手順",
  },
  th: {
    title: "รายการรับมือเมื่อโทรศัพท์หาย", intro: "ใช้อุปกรณ์ที่เชื่อถือได้เพื่อป้องกันบัญชี อย่าไปเผชิญหน้าตามตำแหน่งที่พบ หากเครื่องไม่ล็อกหรือแอปธนาคารเข้าถึงได้ ให้ระงับซิมและการชำระเงินก่อน",
    first: "สิ่งที่ควรทำก่อน", prep: "เตรียมก่อนเดินทาง", progress: "ความคืบหน้า", reset: "ล้างความคืบหน้า", saved: "บันทึกเฉพาะขั้นตอนที่เสร็จในเบราว์เซอร์นี้ หากใช้เครื่องสาธารณะให้ล้างเมื่อเสร็จ",
    steps: ["ค้นหาและล็อกเครื่อง", "ระงับ SIM หรือ eSIM", "ป้องกันการชำระเงินและบัญชี", "เก็บหลักฐาน", "แจ้งตำรวจตามข้อเท็จจริง", "ตรวจสอบความคุ้มครอง"],
    details: ["เปิดโหมดสูญหายด้วย Apple Find My หรือ Google Find Hub อย่าลบเครื่องออกจากบัญชี", "ขอให้ผู้ให้บริการระงับซิม และตรวจสอบวิธีกู้บัญชีหากรับ SMS ไม่ได้", "ติดต่อธนาคารและผู้ให้บริการชำระเงิน ตรวจสอบการเข้าสู่ระบบที่ไม่รู้จัก", "เก็บตำแหน่งและเวลาล่าสุด หมายเลขเครื่อง และหลักฐานซื้ออย่างปลอดภัย การล้างเครื่องย้อนกลับไม่ได้", "เล่าเหตุการณ์จริง ขอเลขรับแจ้งและเอกสารที่ออกให้ได้ แยกข้อเท็จจริงจากการคาดเดา", "ถามบริษัทประกันเรื่องความคุ้มครองของหายหรือถูกขโมย ค่าเสียหายส่วนแรกและกำหนดยื่น ไม่รับประกันการจ่าย"],
    sources: "คำแนะนำจากแหล่งทางการ", scope: "AbroadWatch เรียบเรียงคำแนะนำนี้ วันที่คือวันที่แก้ไขเอกสาร ไม่ใช่วันที่ตรวจสอบข้อมูลติดต่อและค่าธรรมเนียมทั้งหมดใหม่", updated: "แก้ไขเอกสาร", published: "เผยแพร่", policy: "นโยบายบรรณาธิการ", report: "แจ้งข้อมูลผิด", honest: "แจ้งของหายหรือถูกขโมยตามข้อเท็จจริง ความคุ้มครองและระยะเวลาขึ้นกับกรมธรรม์และหน่วยงาน", city: "ขั้นตอนแจ้งเหตุรายเมือง",
  },
  vi: {
    title: "Danh sách xử lý khi mất điện thoại", intro: "Dùng thiết bị đáng tin cậy để bảo vệ tài khoản. Không tự đến đối chất tại vị trí định vị. Nếu máy không khóa hoặc ứng dụng ngân hàng bị lộ, ưu tiên khóa SIM và thanh toán.",
    first: "Việc cần làm trước", prep: "Chuẩn bị chuyến đi", progress: "Tiến độ xử lý", reset: "Xóa tiến độ", saved: "Chỉ lưu các bước đã hoàn thành trong trình duyệt này. Xóa sau khi dùng thiết bị công cộng.",
    steps: ["Định vị và khóa máy", "Khóa SIM hoặc eSIM", "Bảo vệ thanh toán và tài khoản", "Lưu bằng chứng", "Trình báo đúng sự thật", "Kiểm tra bảo hiểm"],
    details: ["Bật chế độ mất bằng Apple Find My hoặc Google Find Hub. Không xóa thiết bị khỏi tài khoản.", "Yêu cầu nhà mạng khóa SIM; kiểm tra cách khôi phục tài khoản nếu không nhận được SMS.", "Liên hệ ngân hàng và dịch vụ thanh toán, kiểm tra phiên đăng nhập lạ trong email và tài khoản quan trọng.", "Lưu an toàn vị trí, thời gian cuối, số sê-ri và chứng từ mua. Không thể hoàn tác việc xóa máy.", "Mô tả đúng diễn biến, hỏi số tiếp nhận và giấy tờ có thể cấp. Phân biệt quan sát với suy đoán.", "Hỏi công ty bảo hiểm về phạm vi mất hoặc trộm cắp, mức tự chi trả và hạn nộp. Không bảo đảm được bồi thường."],
    sources: "Hướng dẫn chính thức để đối chiếu", scope: "Hướng dẫn do AbroadWatch tổng hợp. Ngày hiển thị là ngày sửa tài liệu, không phải ngày xác minh lại mọi liên hệ và lệ phí.", updated: "Sửa tài liệu", published: "Xuất bản", policy: "Nguyên tắc biên tập", report: "Báo lỗi", honest: "Trình báo mất hoặc trộm cắp đúng sự thật. Bảo hiểm và thời gian xử lý phụ thuộc điều khoản và cơ quan phụ trách.", city: "Các bước trình báo theo thành phố",
  },
};
