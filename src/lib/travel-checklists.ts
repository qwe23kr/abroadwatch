import type { ResponseLanguage } from "./response-copy";
type Row = readonly [string, string];
interface ChecklistCopy { prepareIntro: string; prepare: readonly Row[]; claimsTitle: string; claimsIntro: string; claims: readonly Row[]; questionsTitle: string; questions: readonly string[]; }
export const travelChecklists: Record<ResponseLanguage, ChecklistCopy> = {
  ko: {
    prepareIntro: "휴대폰 하나를 잃어도 연락·결제·신원 확인을 이어갈 수 있도록 준비하세요.",
    prepare: [["서류를 분리 보관", "여권 사본, 보험증권, 숙소 주소, 항공권을 안전한 별도 저장소에 보관하세요. 공개 공유 링크에 올리지 마세요."], ["통신과 계정 복구", "로밍 요금, SMS 수신, 회선 정지 방법과 계정 복구 수단을 확인하세요. 인증 수단을 휴대폰 한 대에만 두지 마세요."], ["보험 약관 확인", "여행지·활동의 보장 여부, 휴대품 제외, 자기부담금, 사전승인 조건과 보험사 연락처를 확인하세요."], ["도착 경로와 결제", "숙소까지의 교통편·심야 대안을 저장하고 결제수단을 분리하세요. 예약의 취소 조건을 확인하세요."], ["비상 연락처", "현지 긴급번호, 담당 공관, 은행, 통신사, 보험사 연락처를 종이 또는 다른 기기에 보관하세요."]],
    claimsTitle: "보험 청구 자료 체크리스트", claimsIntro: "안전을 확보한 다음 사고 경위, 소유·지출 증명, 기관 기록을 모으세요. 서류를 모았다고 지급이 보장되는 것은 아닙니다. 신고·제출 기한은 보험사에 확인하세요.",
    claims: [["휴대폰·전자기기", "구매 내역, IMEI·일련번호, 마지막 확인 시각, 회선 정지 기록을 보관하세요. 경찰 신고 시 실제 경위를 설명하고 받을 수 있는 문서를 확인하세요."], ["지갑·카드", "카드 정지 시각, 본인이 승인하지 않은 거래, 현금·물품 목록을 구분하세요. 카드 결제 이의제기와 여행자보험 청구는 별도 절차일 수 있습니다."], ["병원·응급실", "진료기록, 항목별 영수증, 처방전과 약제비 내역을 보관하세요. 응급 진료를 보험 승인 대기 때문에 미루지 마세요."], ["수하물·항공 지연", "수하물 태그, 탑승권, 지연 안내, 항공사 접수번호·PIR, 필수품 구매 영수증을 보관하세요. 항공사와 보험사 각각의 제출 기한을 확인하세요."]],
    questionsTitle: "보험사에 확인할 질문", questions: ["어떤 담보가 적용되며 제외 항목과 자기부담금은 무엇인가요?", "원본·번역·사전승인이 필요한가요? 어떤 문서로 대체할 수 있나요?", "신고·청구·추가서류 기한과 안전한 제출 방법은 무엇인가요?"],
  },
  en: {
    prepareIntro: "Prepare to communicate, pay and prove your identity even if your phone goes missing.",
    prepare: [["Separate document backups", "Keep a passport copy, policy, accommodation address and tickets in separate secure storage. Avoid public sharing links."], ["Connectivity and recovery", "Check roaming charges, SMS access, line suspension and account recovery. Do not keep every authentication method on one phone."], ["Read your policy", "Check destinations and activities covered, belongings exclusions, excess, pre-authorization and the insurer's contact details."], ["Arrival and payments", "Save transport and late-night alternatives to your accommodation. Separate payment methods and check cancellation terms."], ["Emergency contacts", "Keep local emergency, mission, bank, carrier and insurer contacts on paper or a second device."]],
    claimsTitle: "Insurance evidence checklist", claimsIntro: "Get safe, then collect the incident timeline, ownership or expense evidence and institutional records. Having documents does not guarantee payment. Ask your insurer about reporting and submission deadlines.",
    claims: [["Phone and electronics", "Keep purchase records, IMEI or serial number, last-seen time and line-suspension record. Tell police the actual circumstances and ask what documents are available."], ["Wallet and cards", "Separate the card-block time, unauthorized transactions and missing cash or items. Card disputes and travel insurance may be separate processes."], ["Hospital and emergency care", "Keep medical records, itemized receipts, prescriptions and pharmacy expenses. Do not delay emergency care while awaiting insurance approval."], ["Baggage and flight delays", "Keep bag tags, boarding passes, delay notices, airline case number or PIR and essential-purchase receipts. Check airline and insurer deadlines separately."]],
    questionsTitle: "Questions for your insurer", questions: ["Which coverage applies, and what exclusions and excess apply?", "Are originals, translations or prior approval required? Which alternatives are accepted?", "What are the reporting, claim and further-document deadlines and secure submission methods?"],
  },
  "zh-Hans": {
    prepareIntro: "即使手机遗失，也要能继续联系、付款和证明身份。",
    prepare: [["分开备份文件", "将护照副本、保单、住宿地址和机票保存在独立的安全位置，不要使用公开分享链接。"], ["通信与账户恢复", "确认漫游费用、短信接收、停机和账户恢复方式。不要将所有验证方式都放在一部手机上。"], ["阅读保单", "确认目的地与活动是否受保、财物除外责任、自付额、预先批准要求及保险公司联系方式。"], ["抵达路线与付款", "保存前往住宿的交通与深夜替代方案，分开放置付款工具并确认取消条款。"], ["紧急联系", "将当地急救、使领馆、银行、运营商和保险公司的联系方式记录在纸上或另一台设备中。"]],
    claimsTitle: "保险申请材料清单", claimsIntro: "先确保安全，再整理事件经过、所有权或支出证明及机构记录。备齐材料不保证赔付。报案和提交期限请向保险公司确认。",
    claims: [["手机与电子设备", "保存购买记录、IMEI或序列号、最后见到的时间及停机记录。如实说明经过，并询问警方可出具哪些文件。"], ["钱包与银行卡", "分别记录停卡时间、未经授权的交易以及遗失现金或物品。银行卡争议和旅行保险可能是不同程序。"], ["医院与急诊", "保留病历、明细收据、处方和药费凭证。不要因等待保险批准而延误急诊。"], ["行李与航班延误", "保留行李牌、登机牌、延误通知、航空公司案件编号或PIR以及必需品收据，分别确认航空公司与保险公司的期限。"]],
    questionsTitle: "向保险公司确认", questions: ["适用哪项保障？有哪些除外责任和自付额？", "需要原件、翻译或预先批准吗？接受哪些替代文件？", "报案、索赔、补交材料的期限和安全提交方式是什么？"],
  },
  "zh-Hant": {
    prepareIntro: "即使手機遺失，也要能繼續聯絡、付款和證明身分。",
    prepare: [["分開備份文件", "將護照副本、保單、住宿地址與機票保存在獨立的安全位置，不要使用公開分享連結。"], ["通訊與帳戶復原", "確認漫遊費用、簡訊接收、停話和帳戶復原方式。不要將所有驗證方式都放在一支手機上。"], ["閱讀保單", "確認目的地與活動是否受保、財物除外責任、自負額、事前核准要求及保險公司聯絡資訊。"], ["抵達路線與付款", "保存前往住宿的交通與深夜替代方案，分開放置付款工具並確認取消條款。"], ["緊急聯絡", "將當地急救、駐外館處、銀行、電信業者與保險公司的聯絡資訊記在紙上或另一台裝置中。"]],
    claimsTitle: "保險申請資料清單", claimsIntro: "先確保安全，再整理事件經過、所有權或支出證明與機構紀錄。備齊資料不保證理賠。報案及申請期限請向保險公司確認。",
    claims: [["手機與電子裝置", "保留購買紀錄、IMEI或序號、最後看到的時間與停話紀錄。如實說明經過，並詢問警方可提供哪些文件。"], ["錢包與銀行卡", "分別記錄停卡時間、未授權交易及遺失現金或物品。信用卡爭議款與旅遊保險可能是不同程序。"], ["醫院與急診", "保留病歷、明細收據、處方及藥費憑證。不要因等待保險核准而延誤急診。"], ["行李與航班延誤", "保留行李牌、登機證、延誤通知、航空公司案件編號或PIR及必需品收據，分別確認航空公司與保險公司的期限。"]],
    questionsTitle: "向保險公司確認", questions: ["適用哪項保障？有哪些除外責任與自負額？", "需要正本、翻譯或事前核准嗎？接受哪些替代文件？", "報案、理賠、補件期限與安全提交方式為何？"],
  },
  ja: {
    prepareIntro: "スマートフォンを失っても連絡・支払い・本人確認ができるよう準備しましょう。",
    prepare: [["書類の分散保管", "旅券の写し、保険証券、宿泊先住所、航空券を別の安全な場所に保存します。公開共有リンクは避けます。"], ["通信とアカウント復旧", "ローミング料金、SMS受信、回線停止、アカウント復旧を確認します。認証手段を一台に集めないでください。"], ["保険約款", "渡航先・活動の補償、携行品の除外、免責、事前承認と保険会社の連絡先を確認します。"], ["到着経路と決済", "宿泊先までの交通と深夜の代替手段を保存し、決済手段を分散します。予約取消条件も確認します。"], ["緊急連絡先", "現地緊急機関、公館、銀行、通信会社、保険会社の連絡先を紙や別端末にも保管します。"]],
    claimsTitle: "保険請求の資料チェックリスト", claimsIntro: "安全確保後に経緯、所有・支出の証拠、機関の記録を集めます。書類があっても支払いは保証されません。通知・提出期限は保険会社に確認してください。",
    claims: [["スマートフォン・電子機器", "購入記録、IMEI・シリアル番号、最後に見た時刻、回線停止記録を保存します。警察には事実を説明し、発行可能な書類を確認します。"], ["財布・カード", "カード停止時刻、不正利用、紛失した現金や物品を区別します。カードの異議申立てと旅行保険は別手続きの場合があります。"], ["病院・救急", "診療記録、明細付き領収書、処方箋、薬代を保存します。保険承認待ちで救急受診を遅らせないでください。"], ["手荷物・航空便の遅延", "荷物タグ、搭乗券、遅延通知、航空会社の受付番号・PIR、必需品の領収書を保存します。航空会社と保険会社の期限を別々に確認します。"]],
    questionsTitle: "保険会社への確認事項", questions: ["どの補償が適用され、除外と免責は何ですか？", "原本・翻訳・事前承認は必要ですか？代替書類はありますか？", "通知・請求・追加書類の期限と安全な提出方法は何ですか？"],
  },
  th: {
    prepareIntro: "เตรียมให้ยังติดต่อ ชำระเงิน และยืนยันตัวตนได้แม้โทรศัพท์หาย",
    prepare: [["สำรองเอกสารแยกที่", "เก็บสำเนาหนังสือเดินทาง กรมธรรม์ ที่พักและตั๋วในที่ปลอดภัยอีกแห่ง ไม่ใช้ลิงก์สาธารณะ"], ["การสื่อสารและกู้บัญชี", "ตรวจค่าโรมมิง การรับ SMS การระงับซิมและการกู้บัญชี อย่ารวมวิธียืนยันทั้งหมดไว้ในเครื่องเดียว"], ["อ่านกรมธรรม์", "ตรวจพื้นที่และกิจกรรมที่คุ้มครอง ข้อยกเว้นทรัพย์สิน ค่าเสียหายส่วนแรก การอนุมัติล่วงหน้าและเบอร์ติดต่อ"], ["เส้นทางและการจ่ายเงิน", "บันทึกเส้นทางไปที่พักและทางเลือกยามดึก แยกวิธีชำระเงินและตรวจเงื่อนไขยกเลิก"], ["ข้อมูลติดต่อฉุกเฉิน", "เก็บเบอร์ฉุกเฉิน สถานทูต ธนาคาร เครือข่ายมือถือและประกันบนกระดาษหรืออีกเครื่อง"]],
    claimsTitle: "รายการเอกสารยื่นประกัน", claimsIntro: "อยู่ในที่ปลอดภัยก่อน แล้วรวบรวมเหตุการณ์ หลักฐานเจ้าของหรือค่าใช้จ่ายและบันทึกหน่วยงาน เอกสารครบไม่รับประกันการจ่าย ถามบริษัทประกันเรื่องกำหนดแจ้งและยื่น",
    claims: [["โทรศัพท์และอุปกรณ์", "เก็บหลักฐานซื้อ IMEI หรือหมายเลขเครื่อง เวลาที่เห็นล่าสุดและการระงับซิม แจ้งข้อเท็จจริงกับตำรวจและถามเอกสารที่ออกให้ได้"], ["กระเป๋าเงินและบัตร", "แยกเวลาระงับบัตร รายการที่ไม่ได้อนุมัติและทรัพย์สินที่หาย การโต้แย้งบัตรกับประกันอาจเป็นคนละขั้นตอน"], ["โรงพยาบาลและฉุกเฉิน", "เก็บบันทึกรักษา ใบเสร็จแยกรายการ ใบสั่งยาและค่ายา อย่ารอประกันอนุมัติจนชะลอการรักษาฉุกเฉิน"], ["สัมภาระและเที่ยวบินล่าช้า", "เก็บแท็กกระเป๋า บัตรขึ้นเครื่อง แจ้งล่าช้า เลขรับเรื่องหรือ PIR และใบเสร็จของจำเป็น ตรวจเส้นตายของสายการบินกับประกันแยกกัน"]],
    questionsTitle: "คำถามสำหรับบริษัทประกัน", questions: ["ใช้ความคุ้มครองข้อใด มีข้อยกเว้นและค่าเสียหายส่วนแรกอะไร?", "ต้องใช้ต้นฉบับ คำแปล หรืออนุมัติล่วงหน้าหรือไม่ มีเอกสารทดแทนไหม?", "กำหนดแจ้ง ยื่นเคลมและเอกสารเพิ่มเติมคือเมื่อใด และส่งอย่างปลอดภัยอย่างไร?"],
  },
  vi: {
    prepareIntro: "Chuẩn bị để vẫn liên lạc, thanh toán và xác minh danh tính khi mất điện thoại.",
    prepare: [["Sao lưu giấy tờ riêng", "Giữ bản sao hộ chiếu, hợp đồng bảo hiểm, địa chỉ chỗ ở và vé ở nơi an toàn riêng. Tránh liên kết chia sẻ công khai."], ["Liên lạc và khôi phục", "Kiểm tra phí chuyển vùng, nhận SMS, khóa SIM và khôi phục tài khoản. Không đặt mọi cách xác thực trên một máy."], ["Đọc hợp đồng", "Kiểm tra điểm đến, hoạt động được bảo hiểm, loại trừ tài sản, mức tự trả, phê duyệt trước và liên hệ bảo hiểm."], ["Di chuyển và thanh toán", "Lưu đường đến chỗ ở và phương án đêm muộn, tách phương tiện thanh toán và kiểm tra điều kiện hủy."], ["Liên hệ khẩn cấp", "Lưu số khẩn cấp, cơ quan đại diện, ngân hàng, nhà mạng và bảo hiểm trên giấy hoặc thiết bị khác."]],
    claimsTitle: "Danh sách hồ sơ bảo hiểm", claimsIntro: "Đảm bảo an toàn trước, rồi thu thập diễn biến, chứng minh sở hữu hoặc chi phí và hồ sơ cơ quan. Đủ giấy tờ không bảo đảm chi trả. Hỏi bảo hiểm về hạn thông báo và nộp hồ sơ.",
    claims: [["Điện thoại và thiết bị", "Lưu chứng từ mua, IMEI hoặc số sê-ri, thời điểm thấy lần cuối và khóa SIM. Trình báo đúng sự thật và hỏi giấy tờ cảnh sát có thể cấp."], ["Ví và thẻ", "Tách thời điểm khóa thẻ, giao dịch không được phép và tiền hoặc đồ bị mất. Khiếu nại thẻ và bảo hiểm có thể là hai thủ tục riêng."], ["Bệnh viện và cấp cứu", "Giữ hồ sơ khám, hóa đơn chi tiết, đơn thuốc và tiền thuốc. Không trì hoãn cấp cứu để chờ duyệt bảo hiểm."], ["Hành lý và chuyến bay chậm", "Giữ thẻ hành lý, thẻ lên máy bay, thông báo chậm, số vụ việc hoặc PIR và hóa đơn đồ thiết yếu. Kiểm tra riêng hạn của hãng bay và bảo hiểm."]],
    questionsTitle: "Hỏi công ty bảo hiểm", questions: ["Áp dụng quyền lợi nào, có loại trừ và mức tự trả gì?", "Cần bản gốc, bản dịch hay phê duyệt trước không? Chấp nhận giấy tờ thay thế nào?", "Hạn thông báo, yêu cầu chi trả, bổ sung hồ sơ và cách nộp an toàn là gì?"],
  },
};
