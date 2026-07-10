import type { IncidentType } from "@/lib/site-config";
import type { TravelerProfile } from "@/lib/traveler-profiles";

type Language = TravelerProfile["language"];

interface NationalityProofSectionProps {
  profile: TravelerProfile;
  countryName: string;
  cityName: string;
  incidentName: string;
  incident: IncidentType;
  emergencyNumber?: string;
}

const authorityLabelByTraveler: Record<TravelerProfile["code"], string> = {
  kr: "대한민국 영사 안내",
  cn: "中国领事服务指南",
  us: "U.S. State Department guidance",
  jp: "日本の領事案内",
  tw: "外交部領事事務局案内",
  au: "Australian Passport Office guidance",
  gb: "UK emergency travel document guidance",
  ca: "Canadian travel assistance guidance",
  th: "คำแนะนำด้านกงสุลของไทย",
  vn: "Hướng dẫn lãnh sự Việt Nam",
};

const localized: Record<Language, {
  eyebrow: string;
  title: (name: string, city: string, incident: string) => string;
  actions: Record<IncidentType, (name: string) => string>;
  officialTitle: string;
  officialLink: string;
  hotlineTitle: string;
  hotlineNote: string;
  destinationTitle: string;
  emergencyLabel: string;
  emergencyFallback: string;
}> = {
  ko: {
    eyebrow: "국적별 고유 확인",
    title: (name, city, incident) => `${name} 여행자가 ${city}에서 ${incident}을 처리할 때 다른 점`,
    actions: {
      "lost-passport": (name) => `${name} 여행자는 현지 경찰 기록과 별개로 본국 공관의 긴급 여권·여행증명서 절차를 확인해야 합니다.`,
      "lost-phone": (name) => `${name} 여행자는 통신사, 결제 앱, 본인 인증 복구가 귀국 후 계정 접근에 영향을 줄 수 있습니다.`,
      "lost-wallet": (name) => `${name} 여행자는 카드사 긴급 정지와 보험·분쟁용 현지 증빙을 함께 챙겨야 합니다.`,
      hospital: (name) => `${name} 여행자는 본국 보험 청구에 맞는 영수증, 진단서, 진료 기록을 현장에서 요청해야 합니다.`,
      "police-report": (name) => `${name} 여행자는 경찰 문서가 보험, 항공사, 공관 후속 절차에 충분한지 확인해야 합니다.`,
      scam: (name) => `${name} 여행자는 카드 분쟁, 여행자 보험, 공관 상담에 필요한 증거를 같은 타임라인으로 정리해야 합니다.`,
    },
    officialTitle: "공식 기준",
    officialLink: "공식 안내 확인",
    hotlineTitle: "여행자 핫라인",
    hotlineNote: "현지 기관 방문 전 접수 가능 여부와 필요 서류를 다시 확인하세요.",
    destinationTitle: "현지 목적지",
    emergencyLabel: "이 가이드의 현지 긴급번호",
    emergencyFallback: "상황별 가이드 본문에서 현지 긴급번호를 다시 확인하세요.",
  },
  en: {
    eyebrow: "Nationality-specific verification",
    title: (name, city, incident) => `What is different for ${name} travelers handling ${incident} in ${city}`,
    actions: {
      "lost-passport": (name) => `${name} travelers should confirm the responsible mission's emergency passport or travel document process before crossing town.`,
      "lost-phone": (name) => `${name} travelers should protect carrier, payment, and identity-verification recovery before replacing or wiping the device.`,
      "lost-wallet": (name) => `${name} travelers should block cards quickly and keep local evidence for issuers, insurers, or identity recovery.`,
      hospital: (name) => `${name} travelers should request itemized medical documents and receipts that their insurer can review later.`,
      "police-report": (name) => `${name} travelers should confirm that the police record is detailed enough for insurance, bank, or consular follow-up.`,
      scam: (name) => `${name} travelers should save payment proof, merchant details, and messages for card disputes, insurance, or consular consultation.`,
    },
    officialTitle: "Official baseline",
    officialLink: "Check official guidance",
    hotlineTitle: "Traveler hotline",
    hotlineNote: "Confirm opening status and required documents before traveling to an office.",
    destinationTitle: "Local destination context",
    emergencyLabel: "Local emergency number in this guide",
    emergencyFallback: "Check the situation guide for the local emergency number.",
  },
  ja: {
    eyebrow: "国籍別の確認",
    title: (name, city, incident) => `${name}旅行者が${city}で${incident}に対応するときの違い`,
    actions: {
      "lost-passport": (name) => `${name}旅行者は、現地の警察記録とは別に、担当する在外公館の緊急旅券・帰国用書類の手続きを確認してください。`,
      "lost-phone": (name) => `${name}旅行者は、端末の交換や初期化の前に、通信会社、決済アプリ、本人確認の復旧手段を守る必要があります。`,
      "lost-wallet": (name) => `${name}旅行者は、カード停止を早めに行い、発行会社・保険・身分証回復に使う現地証拠を保管してください。`,
      hospital: (name) => `${name}旅行者は、保険請求や帰国後の治療に使える明細付き領収書と診療記録を依頼してください。`,
      "police-report": (name) => `${name}旅行者は、警察の記録が保険、銀行、公館で使える内容か確認してください。`,
      scam: (name) => `${name}旅行者は、カード異議申し立て、保険、領事相談に使う支払い証拠、店名、メッセージを保存してください。`,
    },
    officialTitle: "公式基準",
    officialLink: "公式案内を確認",
    hotlineTitle: "旅行者向けホットライン",
    hotlineNote: "窓口へ移動する前に、受付状況と必要書類を確認してください。",
    destinationTitle: "現地の状況",
    emergencyLabel: "このガイドの現地緊急番号",
    emergencyFallback: "状況別ガイド本文で現地緊急番号を確認してください。",
  },
  "zh-Hans": {
    eyebrow: "按国籍确认",
    title: (name, city, incident) => `${name}旅行者在${city}处理${incident}时的不同点`,
    actions: {
      "lost-passport": (name) => `${name}旅行者应在前往使领馆前确认紧急护照或旅行证件流程。`,
      "lost-phone": (name) => `${name}旅行者在更换或清除设备前，应保护运营商、支付和身份验证恢复渠道。`,
      "lost-wallet": (name) => `${name}旅行者应尽快冻结银行卡，并保留给发卡行、保险或身份恢复使用的当地证据。`,
      hospital: (name) => `${name}旅行者应索取可供保险审核的明细医疗文件和收据。`,
      "police-report": (name) => `${name}旅行者应确认警方记录是否足以用于保险、银行或领事后续处理。`,
      scam: (name) => `${name}旅行者应保存付款证明、商户信息和消息记录，用于银行卡争议、保险或领事咨询。`,
    },
    officialTitle: "官方基准",
    officialLink: "查看官方指南",
    hotlineTitle: "旅行者热线",
    hotlineNote: "前往机构前，请确认开放状态和所需文件。",
    destinationTitle: "当地目的地信息",
    emergencyLabel: "本指南的当地紧急电话",
    emergencyFallback: "请在情境指南中确认当地紧急电话。",
  },
  "zh-Hant": {
    eyebrow: "按國籍確認",
    title: (name, city, incident) => `${name}旅客在${city}處理${incident}時的不同點`,
    actions: {
      "lost-passport": (name) => `${name}旅客應在前往駐外單位前確認緊急護照或旅行文件流程。`,
      "lost-phone": (name) => `${name}旅客在更換或清除裝置前，應保護電信、支付和身分驗證恢復管道。`,
      "lost-wallet": (name) => `${name}旅客應盡快停用卡片，並保留給發卡行、保險或身分恢復使用的當地證據。`,
      hospital: (name) => `${name}旅客應索取可供保險審核的明細醫療文件和收據。`,
      "police-report": (name) => `${name}旅客應確認警方紀錄是否足以用於保險、銀行或領事後續處理。`,
      scam: (name) => `${name}旅客應保存付款證明、商戶資訊和訊息紀錄，用於信用卡爭議、保險或領事諮詢。`,
    },
    officialTitle: "官方基準",
    officialLink: "查看官方指南",
    hotlineTitle: "旅客熱線",
    hotlineNote: "前往機構前，請確認開放狀態和所需文件。",
    destinationTitle: "當地目的地資訊",
    emergencyLabel: "本指南的當地緊急電話",
    emergencyFallback: "請在情境指南中確認當地緊急電話。",
  },
  th: {
    eyebrow: "การตรวจสอบตามสัญชาติ",
    title: (name, city, incident) => `สิ่งที่ต่างสำหรับนักเดินทาง${name}เมื่อจัดการ${incident}ใน${city}`,
    actions: {
      "lost-passport": (name) => `นักเดินทาง${name}ควรยืนยันขั้นตอนเอกสารเดินทางฉุกเฉินกับสถานทูตหรือหน่วยงานที่รับผิดชอบก่อนเดินทางข้ามเมือง`,
      "lost-phone": (name) => `นักเดินทาง${name}ควรรักษาการเข้าถึงซิม แอปชำระเงิน และการยืนยันตัวตนก่อนเปลี่ยนหรือล้างเครื่อง`,
      "lost-wallet": (name) => `นักเดินทาง${name}ควรอายัดบัตรเร็วและเก็บหลักฐานในพื้นที่สำหรับธนาคาร ประกัน หรือการกู้คืนตัวตน`,
      hospital: (name) => `นักเดินทาง${name}ควรขอเอกสารแพทย์และใบเสร็จแยกรายการที่ประกันตรวจสอบได้`,
      "police-report": (name) => `นักเดินทาง${name}ควรตรวจว่ารายงานตำรวจมีรายละเอียดพอสำหรับประกัน ธนาคาร หรือกงสุลหรือไม่`,
      scam: (name) => `นักเดินทาง${name}ควรเก็บหลักฐานชำระเงิน รายละเอียดร้าน และข้อความไว้ใช้กับข้อพิพาทบัตร ประกัน หรือกงสุล`,
    },
    officialTitle: "เกณฑ์ทางการ",
    officialLink: "ตรวจคำแนะนำทางการ",
    hotlineTitle: "สายด่วนนักเดินทาง",
    hotlineNote: "ยืนยันสถานะเปิดรับและเอกสารที่ต้องใช้ก่อนเดินทางไปหน่วยงาน",
    destinationTitle: "บริบทปลายทาง",
    emergencyLabel: "เบอร์ฉุกเฉินในคู่มือนี้",
    emergencyFallback: "ตรวจเบอร์ฉุกเฉินในคู่มือตามสถานการณ์",
  },
  vi: {
    eyebrow: "Xác minh theo quốc tịch",
    title: (name, city, incident) => `Điểm khác cho du khách ${name} khi xử lý ${incident} ở ${city}`,
    actions: {
      "lost-passport": (name) => `Du khách ${name} nên xác nhận quy trình hộ chiếu hoặc giấy thông hành khẩn cấp với cơ quan phụ trách trước khi di chuyển.`,
      "lost-phone": (name) => `Du khách ${name} nên bảo vệ nhà mạng, thanh toán và khôi phục xác minh danh tính trước khi thay hoặc xóa thiết bị.`,
      "lost-wallet": (name) => `Du khách ${name} nên khóa thẻ nhanh và giữ bằng chứng địa phương cho ngân hàng, bảo hiểm hoặc khôi phục danh tính.`,
      hospital: (name) => `Du khách ${name} nên xin hồ sơ y tế và hóa đơn chi tiết để bảo hiểm có thể xem xét sau.`,
      "police-report": (name) => `Du khách ${name} nên xác nhận biên bản cảnh sát đủ chi tiết cho bảo hiểm, ngân hàng hoặc lãnh sự.`,
      scam: (name) => `Du khách ${name} nên lưu chứng từ thanh toán, thông tin người bán và tin nhắn cho tranh chấp thẻ, bảo hiểm hoặc tư vấn lãnh sự.`,
    },
    officialTitle: "Cơ sở chính thức",
    officialLink: "Kiểm tra hướng dẫn chính thức",
    hotlineTitle: "Đường dây hỗ trợ du khách",
    hotlineNote: "Xác nhận tình trạng mở cửa và giấy tờ cần thiết trước khi đến cơ quan.",
    destinationTitle: "Bối cảnh điểm đến",
    emergencyLabel: "Số khẩn cấp địa phương trong hướng dẫn này",
    emergencyFallback: "Kiểm tra số khẩn cấp địa phương trong hướng dẫn tình huống.",
  },
};

export function getNationalityProofText(
  profile: TravelerProfile,
  incident: IncidentType,
  options: {
    countryName: string;
    cityName: string;
    incidentName: string;
    emergencyNumber?: string;
  },
) {
  const l = localized[profile.language];
  return [
    authorityLabelByTraveler[profile.code],
    l.actions[incident](profile.nativeName),
    profile.nativeName,
    profile.consularHotline,
    profile.officialGuidance,
    options.countryName,
    options.cityName,
    options.incidentName,
    options.emergencyNumber ?? "",
  ].join(" ");
}

export function NationalityProofSection({
  profile,
  countryName,
  cityName,
  incidentName,
  incident,
  emergencyNumber,
}: NationalityProofSectionProps) {
  const l = localized[profile.language];
  const authorityLabel = authorityLabelByTraveler[profile.code];
  const action = l.actions[incident](profile.nativeName);

  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{l.eyebrow}</p>
      <h2 className="mt-2 text-xl font-bold leading-snug text-gray-950 md:text-2xl">
        {l.title(profile.nativeName, cityName, incidentName)}
      </h2>
      <p className="mt-3 text-sm leading-6 text-gray-700">{action}</p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <h3 className="text-sm font-bold text-gray-900">{l.officialTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-700">{authorityLabel}</p>
          <a
            href={profile.officialGuidance}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex text-sm font-semibold text-blue-700 hover:underline"
          >
            {l.officialLink} →
          </a>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <h3 className="text-sm font-bold text-gray-900">{l.hotlineTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-700">{profile.consularHotline}</p>
          <p className="mt-2 text-xs leading-5 text-gray-500">{l.hotlineNote}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <h3 className="text-sm font-bold text-gray-900">{l.destinationTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            {cityName}, {countryName}
          </p>
          <p className="mt-2 text-xs leading-5 text-gray-500">
            {emergencyNumber ? `${l.emergencyLabel}: ${emergencyNumber}` : l.emergencyFallback}
          </p>
        </div>
      </div>
    </section>
  );
}
