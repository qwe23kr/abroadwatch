import type { TravelerProfile } from "./traveler-profiles";

interface EditorialCopy { about: string; identity: string; policy: string; method: string; limits: string; funding: string; corrections: string; contact: string; }
export const editorialCopy: Record<TravelerProfile["language"], EditorialCopy> = {
  ko: {
    about: "AbroadWatch 소개", identity: "AbroadWatch는 국적과 여행지에 맞춰 긴급 대응 정보를 정리하는 독립 정보 사이트입니다. 정부·대사관·경찰·보험사가 아니며 신고나 여권 신청을 대행하지 않습니다.",
    policy: "편집 원칙", method: "정부·공관·경찰·서비스 제공자의 안내를 출처로 연결합니다. 기관 전체 홈페이지는 연락처 확인용이며 개별 수수료·처리 기간의 근거와 구분합니다. 다른 도시나 국적의 절차가 그대로 적용된다고 가정하지 않습니다.",
    limits: "방문 조사나 실제 이용 후기로 표시하지 않은 글은 자료를 정리한 안내입니다. 검색 결과나 출처를 추적할 수 없는 후기를 경험의 증거로 사용하지 않습니다. 문서 수정일과 특정 공식 자료의 확인일은 구분합니다. 비용·서류·업무시간은 기관의 최신 안내가 우선합니다.",
    funding: "관련 페이지에 제휴 링크가 있을 수 있으며 구매 시 수수료를 받을 수 있습니다. 해당 링크는 표시하고 공공기관의 공식 절차와 구분합니다. 광고나 제휴 상품 구매는 가이드 이용 조건이 아닙니다.",
    corrections: "페이지 주소, 잘못된 항목, 확인 가능한 공식 출처를 contact@abroadwatch.com으로 알려주세요. 여권번호, 계정 비밀번호, 의료기록 등 민감한 자료는 보내지 마세요. 확인한 오류는 해당 안내에 반영합니다. 이 메일은 긴급 신고 창구가 아닙니다.", contact: "문의 및 오류 제보",
  },
  en: {
    about: "About AbroadWatch", identity: "AbroadWatch is an independent information site organizing emergency steps by nationality and destination. We are not a government, embassy, police service or insurer and do not file reports or passport applications for you.",
    policy: "Editorial policy", method: "We link to guidance from governments, missions, police and service providers. A general institutional homepage is a contact reference, not evidence of a particular fee or turnaround time. Procedures must not be assumed to transfer between cities or nationalities.",
    limits: "Unless explicitly identified as field reporting or a firsthand account, a guide is a compilation of information. Search results and untraceable reviews are not evidence of experience. Document updates and checks of individual sources are different dates. Current official instructions take precedence for fees, documents and opening hours.",
    funding: "Relevant pages may contain disclosed affiliate links that earn a commission on purchases. These are separate from official public services. Buying an advertised or affiliate product is not required to use a guide.",
    corrections: "Email the page URL, the incorrect item and a traceable official source to contact@abroadwatch.com. Do not send passport numbers, passwords or medical records. Confirmed errors are reflected in the guidance. This inbox is not an emergency reporting service.", contact: "Contact and corrections",
  },
  "zh-Hans": {
    about: "关于 AbroadWatch", identity: "AbroadWatch 是按国籍和目的地整理应急步骤的独立信息网站，并非政府、使领馆、警方或保险公司，也不代办报案或护照申请。",
    policy: "编辑原则", method: "我们链接政府、使领馆、警方和服务商的说明。机构首页仅用于查找联系信息，不代表某项费用或办理时间的依据。不同城市或国籍的程序不能直接套用。",
    limits: "未注明实地采访或亲身经历的指南属于资料整理。搜索结果和无法追溯的评论不作为经历证据。文档修改日期与个别来源核对日期不同；费用、材料和办公时间以官方最新说明为准。",
    funding: "相关页面可能包含已标明的联盟链接，购买后我们可能获得佣金。这些链接与官方公共服务分开；阅读指南无需购买广告或联盟商品。",
    corrections: "请将页面网址、错误项目及可追溯的官方来源发送至 contact@abroadwatch.com。不要发送护照号码、密码或医疗记录。经确认的错误会反映在指南中。此邮箱不处理紧急报案。", contact: "联系与纠错",
  },
  "zh-Hant": {
    about: "關於 AbroadWatch", identity: "AbroadWatch 是依國籍與目的地整理應急步驟的獨立資訊網站，並非政府、駐外館處、警方或保險公司，也不代辦報案或護照申請。",
    policy: "編輯原則", method: "我們連結政府、駐外館處、警方與服務商的說明。機構首頁僅供查找聯絡資訊，不代表特定費用或辦理時間的依據。不同城市或國籍的程序不能直接套用。",
    limits: "未註明實地採訪或親身經歷的指南屬於資料整理。搜尋結果與無法追溯的評論不作為經歷證據。文件修改日期與個別來源核對日期不同；費用、文件與辦公時間以官方最新說明為準。",
    funding: "相關頁面可能包含已標示的聯盟連結，購買後我們可能獲得佣金。這些連結與官方公共服務分開；閱讀指南無須購買廣告或聯盟商品。",
    corrections: "請將頁面網址、錯誤項目與可追溯的官方來源寄至 contact@abroadwatch.com。不要寄送護照號碼、密碼或醫療紀錄。經確認的錯誤會反映在指南中。此信箱不處理緊急報案。", contact: "聯絡與更正",
  },
  ja: {
    about: "AbroadWatchについて", identity: "AbroadWatchは国籍と渡航先に応じた緊急対応を整理する独立した情報サイトです。政府、在外公館、警察、保険会社ではなく、届出や旅券申請の代行も行いません。",
    policy: "編集方針", method: "政府、在外公館、警察、サービス提供者の案内へリンクします。機関のトップページは連絡先の参考であり、個別の料金や所要時間の根拠とは区別します。都市や国籍が違う手続きをそのまま適用しません。",
    limits: "現地取材や本人の体験と明示していないガイドは資料の整理です。検索結果や出所不明の口コミを体験の証拠にしません。文書の更新日と個別資料の確認日は異なります。料金、書類、受付時間は最新の公式案内を優先します。",
    funding: "関連ページには明示したアフィリエイトリンクを掲載し、購入により手数料を受け取る場合があります。公的な手続きと区別し、ガイドの利用に商品の購入は必要ありません。",
    corrections: "ページURL、誤りの箇所、確認可能な公式資料をcontact@abroadwatch.comへお送りください。旅券番号、パスワード、医療記録は送らないでください。確認できた誤りを修正します。この窓口は緊急通報用ではありません。", contact: "お問い合わせ・訂正",
  },
  th: {
    about: "เกี่ยวกับ AbroadWatch", identity: "AbroadWatch เป็นเว็บไซต์ข้อมูลอิสระที่จัดขั้นตอนฉุกเฉินตามสัญชาติและจุดหมาย ไม่ใช่รัฐบาล สถานทูต ตำรวจ หรือบริษัทประกัน และไม่รับแจ้งความหรือยื่นหนังสือเดินทางแทนคุณ",
    policy: "นโยบายบรรณาธิการ", method: "เราเชื่อมโยงคำแนะนำของรัฐบาล สถานทูต ตำรวจ และผู้ให้บริการ หน้าแรกของหน่วยงานใช้หาข้อมูลติดต่อ ไม่ใช่หลักฐานค่าธรรมเนียมหรือเวลาของแต่ละขั้นตอน ไม่ควรนำขั้นตอนของเมืองหรือสัญชาติอื่นมาใช้โดยอัตโนมัติ",
    limits: "คู่มือที่ไม่ได้ระบุว่าเป็นการลงพื้นที่หรือประสบการณ์ตรงเป็นการเรียบเรียงข้อมูล ไม่ใช้ผลค้นหาหรือรีวิวที่ติดตามแหล่งไม่ได้เป็นหลักฐานประสบการณ์ วันที่แก้ไขเอกสารต่างจากวันตรวจแหล่งข้อมูล ให้ยึดประกาศล่าสุดเรื่องค่าธรรมเนียม เอกสาร และเวลาเปิดทำการ",
    funding: "บางหน้าอาจมีลิงก์พันธมิตรที่ระบุไว้และได้รับค่าคอมมิชชันเมื่อซื้อ แยกจากบริการทางการ การอ่านคู่มือไม่จำเป็นต้องซื้อสินค้า",
    corrections: "ส่ง URL รายการที่ผิด และแหล่งทางการที่ตรวจสอบได้ไปที่ contact@abroadwatch.com อย่าส่งเลขหนังสือเดินทาง รหัสผ่าน หรือประวัติการรักษา เราจะแก้ข้อมูลที่ยืนยันว่าผิด อีเมลนี้ไม่ใช่ช่องทางแจ้งเหตุฉุกเฉิน", contact: "ติดต่อและแจ้งข้อมูลผิด",
  },
  vi: {
    about: "Về AbroadWatch", identity: "AbroadWatch là trang thông tin độc lập sắp xếp các bước khẩn cấp theo quốc tịch và điểm đến. Chúng tôi không phải chính phủ, cơ quan đại diện, cảnh sát hay công ty bảo hiểm và không thay bạn trình báo hoặc xin hộ chiếu.",
    policy: "Nguyên tắc biên tập", method: "Chúng tôi liên kết hướng dẫn của chính phủ, cơ quan đại diện, cảnh sát và nhà cung cấp dịch vụ. Trang chủ cơ quan là nguồn liên hệ, không phải căn cứ cho lệ phí hoặc thời gian cụ thể. Không mặc định thủ tục áp dụng giống nhau giữa các thành phố hay quốc tịch.",
    limits: "Nếu không ghi rõ là khảo sát thực địa hoặc trải nghiệm trực tiếp, hướng dẫn là tài liệu tổng hợp. Kết quả tìm kiếm và đánh giá không truy được nguồn không chứng minh trải nghiệm. Ngày sửa tài liệu khác ngày kiểm tra nguồn cụ thể. Ưu tiên hướng dẫn chính thức mới nhất về phí, giấy tờ và giờ tiếp nhận.",
    funding: "Trang liên quan có thể có liên kết tiếp thị được ghi rõ và mang lại hoa hồng khi mua. Các liên kết này tách biệt với dịch vụ công. Không cần mua sản phẩm để đọc hướng dẫn.",
    corrections: "Gửi URL, mục sai và nguồn chính thức có thể kiểm tra đến contact@abroadwatch.com. Không gửi số hộ chiếu, mật khẩu hay hồ sơ y tế. Lỗi đã xác nhận sẽ được sửa trong hướng dẫn. Hộp thư này không tiếp nhận trình báo khẩn cấp.", contact: "Liên hệ và báo lỗi",
  },
};

export function getEditorialPage(profile: TravelerProfile, slug: string) {
  const c = editorialCopy[profile.language];
  if (slug === "about") return { title: c.about, description: c.identity, content: `${c.identity}\n\n${c.method}\n\n${c.funding}\n\n[${c.policy}](/${profile.code}/editorial) · [${c.contact}](/${profile.code}/contact)` };
  if (slug === "editorial") return { title: c.policy, description: c.method, content: `${c.identity}\n\n${c.method}\n\n${c.limits}\n\n${c.funding}\n\n## ${c.contact}\n\n${c.corrections}` };
  if (slug === "contact") return { title: c.contact, description: c.contact, content: `${c.corrections}\n\n[contact@abroadwatch.com](mailto:contact@abroadwatch.com)` };
  return undefined;
}
