import type { CountryConfig, IncidentType } from "@/lib/site-config";
import type { TravelerProfile } from "@/lib/traveler-profiles";
import { travelerIncident, travelerName } from "@/lib/traveler-ui";

type Language = TravelerProfile["language"];

interface HomeQualitySectionProps {
  profile: TravelerProfile;
  countries: CountryConfig[];
  incidents: readonly IncidentType[];
}

interface CountryQualitySectionProps {
  profile: TravelerProfile;
  country: CountryConfig;
  incidents: readonly IncidentType[];
}

interface CityQualitySectionProps {
  profile: TravelerProfile;
  country: CountryConfig;
  city: CountryConfig["cities"][number];
  incidents: readonly IncidentType[];
}

const copy: Record<Language, {
  homeEyebrow: string;
  homeTitle: (name: string, count: number) => string;
  homeBody: (examples: string) => string;
  qualityCards: [string, string][];
  countryEyebrow: string;
  countryTitle: (country: string) => string;
  countryBody: (country: string, cities: string, examples: string) => string;
  commonQuestionsTitle: string;
  commonQuestions: string[];
  cityEyebrow: string;
  cityTitle: (city: string) => string;
  cityBody: (country: string, city: string) => string;
  detailCardBody: string;
}> = {
  ko: {
    homeEyebrow: "편집 품질 기준",
    homeTitle: (name, count) => `${name} 여행자를 위한 ${count}개 도시 긴급 가이드 제작 기준`,
    homeBody: (examples) =>
      `AbroadWatch는 목적지명과 사고명만 조합하지 않습니다. ${examples} 같은 상황에서 현지 대응 순서, 국적별 공관 안내, 보험·은행·항공사에 필요한 증거를 함께 확인하도록 구성합니다.`,
    qualityCards: [
      ["현지 우선순위", "응급, 경찰, 병원, 교통기관, 공관처럼 실제로 먼저 연락해야 할 곳을 상황별로 구분합니다."],
      ["국적별 차이", "같은 사고라도 여권, 신분 확인, 공관 절차가 국적에 따라 달라지므로 별도 층으로 보여줍니다."],
      ["재확인 안내", "운영시간, 수수료, 필요 서류처럼 바뀌는 정보는 방문 전 공식 안내로 다시 확인하도록 표시합니다."],
    ],
    countryEyebrow: "목적지 품질 가이드",
    countryTitle: (country) => `${country}에서 먼저 구분해야 할 상황`,
    countryBody: (country, cities, examples) =>
      `${country}의 ${cities}에서는 같은 ${examples} 상황이라도 공항, 숙소, 경찰서, 병원, 공관 중 먼저 가야 할 곳이 달라집니다. 이 허브는 도시별 상세 가이드로 이동하기 전에 목적을 좁히기 위한 페이지입니다.`,
    commonQuestionsTitle: "방문 전 확인할 공통 질문",
    commonQuestions: [
      "문서가 보험용인지, 공관 접수용인지, 카드 분쟁용인지",
      "원본 서류가 필요한지, 사진이나 접수번호로 충분한지",
      "오늘 운영시간과 접수 마감이 아직 유효한지",
      "응급 상황이면 보험 승인보다 현지 긴급번호가 먼저인지",
    ],
    cityEyebrow: "도시별 체크리스트",
    cityTitle: (city) => `${city}에서 시간을 잃지 않는 순서`,
    cityBody: (country, city) =>
      `${country} ${city} 가이드는 상황별 페이지로 나뉘지만 공통 원칙은 같습니다. 먼저 안전을 확보하고, 증거를 보관하고, 방문 전 담당 기관이 실제로 오늘 접수하는지 확인한 뒤 이동하세요.`,
    detailCardBody: "상세 페이지에서 현장 확인, 증거 보관, 담당 기관, 국적별 공식 확인 순서로 다시 정리합니다.",
  },
  en: {
    homeEyebrow: "Editorial quality baseline",
    homeTitle: (name, count) => `How these ${count} city guides are built for ${name} travelers`,
    homeBody: () =>
      "AbroadWatch does not rely on destination and incident names alone. Each guide connects local response steps, nationality-specific consular guidance, and the evidence travelers often need for insurers, banks, or airlines.",
    qualityCards: [
      ["Local priority", "Emergency care, police, hospitals, transport operators, and missions are separated by what the traveler needs first."],
      ["Nationality context", "Passport, identity, and consular steps vary by nationality, so they are handled as a separate layer."],
      ["Reconfirmation", "Changeable details such as hours, fees, and required documents are flagged for official reconfirmation."],
    ],
    countryEyebrow: "Destination quality guide",
    countryTitle: (country) => `What to decide first in ${country}`,
    countryBody: (_country, cities) =>
      `Across ${cities}, the right first stop can be an airport desk, hotel, police station, hospital, or mission depending on the incident. This hub helps narrow the purpose before opening a city guide.`,
    commonQuestionsTitle: "Common questions before you go",
    commonQuestions: [
      "Whether the document is for insurance, a mission, or a card dispute",
      "Whether an original paper is required or a case number is enough",
      "Whether today's opening hours and intake cutoff are still valid",
      "Whether emergency care should happen before insurer approval",
    ],
    cityEyebrow: "City checklist",
    cityTitle: (city) => `How to avoid losing time in ${city}`,
    cityBody: (country, city) =>
      `The ${city}, ${country} guides are split by situation, but the operating rule is the same: get safe, preserve evidence, confirm the responsible office is actually accepting cases today, then travel across town.`,
    detailCardBody: "The detail page separates on-site checks, evidence, responsible offices, and nationality-specific confirmation.",
  },
  ja: {
    homeEyebrow: "編集品質の基準",
    homeTitle: (name, count) => `${name}旅行者向け ${count}都市の緊急ガイドの作り方`,
    homeBody: (examples) =>
      `AbroadWatchは地名とトラブル名を並べるだけではありません。${examples}のような状況で、現地での対応順、国籍別の領事案内、保険・銀行・航空会社に必要な証拠を一緒に確認できるようにしています。`,
    qualityCards: [
      ["現地での優先順位", "救急、警察、病院、交通機関、在外公館など、最初に連絡すべき先を状況ごとに分けています。"],
      ["国籍別の違い", "同じトラブルでも旅券、本人確認、領事手続きは国籍で変わるため、別の層として扱います。"],
      ["再確認の案内", "営業時間、手数料、必要書類など変わりやすい情報は、訪問前に公式情報で再確認するよう示します。"],
    ],
    countryEyebrow: "目的地別の品質ガイド",
    countryTitle: (country) => `${country}で最初に切り分けるべきこと`,
    countryBody: (country, cities, examples) =>
      `${country}の${cities}では、同じ${examples}でも、空港、宿泊先、警察署、病院、在外公館のどこへ先に行くべきかが変わります。このページは都市別ガイドを開く前に目的を絞るためのハブです。`,
    commonQuestionsTitle: "出発前・訪問前によく確認すること",
    commonQuestions: [
      "その書類は保険用、公館手続き用、カード異議申し立て用のどれか",
      "原本が必要か、写真や受付番号で足りるか",
      "今日の営業時間と受付締切がまだ有効か",
      "緊急時は保険会社の承認より現地の緊急番号が先か",
    ],
    cityEyebrow: "都市別チェックリスト",
    cityTitle: (city) => `${city}で時間を失わないための順序`,
    cityBody: (country, city) =>
      `${country} ${city}のガイドは状況別に分かれていますが、基本は同じです。安全を確保し、証拠を残し、担当窓口が今日受付しているか確認してから移動してください。`,
    detailCardBody: "詳細ページでは、現地確認、証拠保全、担当機関、国籍別の公式確認の順に整理します。",
  },
  "zh-Hans": {
    homeEyebrow: "编辑质量基准",
    homeTitle: (name, count) => `面向${name}旅行者的 ${count} 个城市紧急指南`,
    homeBody: (examples) =>
      `AbroadWatch 不只是组合目的地和事件名称。对于${examples}等情况，页面会同时整理当地处理顺序、按国籍区分的领事信息，以及保险、银行或航空公司可能需要的证据。`,
    qualityCards: [
      ["当地优先顺序", "按紧急医疗、警察、医院、交通机构和使领馆等实际先后顺序区分。"],
      ["国籍差异", "护照、身份确认和领事手续会因国籍不同而变化，因此单独呈现。"],
      ["再次确认", "营业时间、费用、所需文件等易变信息会提示出发前通过官方渠道确认。"],
    ],
    countryEyebrow: "目的地质量指南",
    countryTitle: (country) => `在${country}要先判断的事项`,
    countryBody: (country, cities, examples) =>
      `在${country}的${cities}，即使是${examples}等相同情况，第一站也可能是机场柜台、酒店、警察局、医院或使领馆。本页用于在打开城市指南前先缩小处理目的。`,
    commonQuestionsTitle: "出发或前往机构前的常见问题",
    commonQuestions: [
      "文件是用于保险、领事手续还是银行卡争议",
      "是否必须原件，还是照片或案件编号即可",
      "今天的办公时间和受理截止时间是否仍有效",
      "紧急医疗是否应先于保险公司批准",
    ],
    cityEyebrow: "城市检查清单",
    cityTitle: (city) => `在${city}避免浪费时间的顺序`,
    cityBody: (country, city) =>
      `${country}${city}指南按情况拆分，但原则相同：先确保安全，保留证据，确认负责机构今天确实受理，再前往现场。`,
    detailCardBody: "详细页会按现场确认、证据保留、负责机构和国籍相关官方确认的顺序整理。",
  },
  "zh-Hant": {
    homeEyebrow: "編輯品質基準",
    homeTitle: (name, count) => `面向${name}旅客的 ${count} 個城市緊急指南`,
    homeBody: (examples) =>
      `AbroadWatch 不只是組合目的地和事件名稱。針對${examples}等情況，頁面會同時整理當地處理順序、按國籍區分的領事資訊，以及保險、銀行或航空公司可能需要的證據。`,
    qualityCards: [
      ["當地優先順序", "依緊急醫療、警察、醫院、交通機構和駐外單位等實際先後順序區分。"],
      ["國籍差異", "護照、身分確認和領事手續會因國籍不同而變化，因此單獨呈現。"],
      ["再次確認", "營業時間、費用、所需文件等易變資訊會提示出發前透過官方管道確認。"],
    ],
    countryEyebrow: "目的地品質指南",
    countryTitle: (country) => `在${country}要先判斷的事項`,
    countryBody: (country, cities, examples) =>
      `在${country}的${cities}，即使是${examples}等相同情況，第一站也可能是機場櫃台、住宿處、警察局、醫院或駐外單位。本頁用於在開啟城市指南前先縮小處理目的。`,
    commonQuestionsTitle: "出發或前往機構前的常見問題",
    commonQuestions: [
      "文件是用於保險、領事手續還是信用卡爭議",
      "是否必須原件，還是照片或案件編號即可",
      "今天的辦公時間和受理截止時間是否仍有效",
      "緊急醫療是否應先於保險公司核准",
    ],
    cityEyebrow: "城市檢查清單",
    cityTitle: (city) => `在${city}避免浪費時間的順序`,
    cityBody: (country, city) =>
      `${country}${city}指南按情況拆分，但原則相同：先確保安全，保留證據，確認負責單位今天確實受理，再前往現場。`,
    detailCardBody: "詳細頁會按現場確認、證據保留、負責機構和國籍相關官方確認的順序整理。",
  },
  th: {
    homeEyebrow: "มาตรฐานคุณภาพเนื้อหา",
    homeTitle: (name, count) => `วิธีจัดทำคู่มือฉุกเฉิน ${count} เมืองสำหรับนักเดินทาง${name}`,
    homeBody: (examples) =>
      `AbroadWatch ไม่ได้แค่จับคู่ชื่อเมืองกับเหตุการณ์เท่านั้น สำหรับกรณีอย่าง ${examples} เราจัดลำดับการรับมือในพื้นที่ คำแนะนำกงสุลตามสัญชาติ และหลักฐานที่มักต้องใช้กับประกัน ธนาคาร หรือสายการบินไว้ด้วยกัน`,
    qualityCards: [
      ["ลำดับความสำคัญในพื้นที่", "แยกเหตุฉุกเฉิน ตำรวจ โรงพยาบาล ผู้ให้บริการขนส่ง และสถานทูตตามสิ่งที่ควรทำก่อน"],
      ["บริบทตามสัญชาติ", "ขั้นตอนหนังสือเดินทาง การยืนยันตัวตน และกงสุลต่างกันตามสัญชาติ จึงแยกเป็นชั้นเฉพาะ"],
      ["การยืนยันซ้ำ", "ข้อมูลที่เปลี่ยนได้ เช่น เวลาเปิดทำการ ค่าธรรมเนียม และเอกสาร จะถูกเตือนให้ตรวจสอบกับแหล่งทางการก่อนเดินทาง"],
    ],
    countryEyebrow: "คู่มือคุณภาพตามจุดหมาย",
    countryTitle: (country) => `สิ่งที่ควรแยกแยะก่อนใน${country}`,
    countryBody: (country, cities, examples) =>
      `ใน${country} เช่น ${cities} แม้เป็นกรณี ${examples} เหมือนกัน จุดแรกที่ควรไปอาจเป็นสนามบิน โรงแรม ตำรวจ โรงพยาบาล หรือสถานทูต หน้านี้ช่วยจำกัดเป้าหมายก่อนเปิดคู่มือรายเมือง`,
    commonQuestionsTitle: "คำถามที่ควรเช็กก่อนออกเดินทาง",
    commonQuestions: [
      "เอกสารใช้สำหรับประกัน กงสุล หรือข้อพิพาทบัตร",
      "ต้องใช้ต้นฉบับหรือหมายเลขรับเรื่องก็พอ",
      "เวลาเปิดทำการและเวลาปิดรับวันนี้ยังถูกต้องหรือไม่",
      "ถ้าเป็นเหตุฉุกเฉินควรขอความช่วยเหลือก่อนรออนุมัติประกันหรือไม่",
    ],
    cityEyebrow: "เช็กลิสต์รายเมือง",
    cityTitle: (city) => `ลำดับที่ช่วยไม่ให้เสียเวลาใน${city}`,
    cityBody: (country, city) =>
      `คู่มือ ${city}, ${country} แยกตามสถานการณ์ แต่หลักการเหมือนกัน: ทำให้ปลอดภัย เก็บหลักฐาน ตรวจสอบว่าหน่วยงานรับเรื่องวันนี้จริง แล้วค่อยเดินทางไป`,
    detailCardBody: "หน้ารายละเอียดจะแยกการตรวจสอบหน้างาน หลักฐาน หน่วยงานรับผิดชอบ และการยืนยันตามสัญชาติ",
  },
  vi: {
    homeEyebrow: "Chuẩn chất lượng biên tập",
    homeTitle: (name, count) => `Cách xây dựng ${count} hướng dẫn thành phố cho du khách ${name}`,
    homeBody: (examples) =>
      `AbroadWatch không chỉ ghép tên điểm đến với sự cố. Với các tình huống như ${examples}, mỗi hướng dẫn liên kết thứ tự xử lý tại địa phương, hướng dẫn lãnh sự theo quốc tịch và bằng chứng thường cần cho bảo hiểm, ngân hàng hoặc hãng bay.`,
    qualityCards: [
      ["Ưu tiên tại địa phương", "Cấp cứu, cảnh sát, bệnh viện, đơn vị vận chuyển và cơ quan lãnh sự được tách theo việc cần làm trước."],
      ["Bối cảnh theo quốc tịch", "Hộ chiếu, xác minh danh tính và thủ tục lãnh sự khác nhau theo quốc tịch nên được xử lý riêng."],
      ["Xác nhận lại", "Giờ làm việc, lệ phí và giấy tờ cần thiết có thể thay đổi nên được nhắc kiểm tra lại qua nguồn chính thức."],
    ],
    countryEyebrow: "Hướng dẫn chất lượng theo điểm đến",
    countryTitle: (country) => `Điều cần xác định trước tại ${country}`,
    countryBody: (country, cities, examples) =>
      `Tại ${cities} ở ${country}, cùng một tình huống ${examples} nhưng điểm cần đến trước có thể là sân bay, khách sạn, cảnh sát, bệnh viện hoặc cơ quan lãnh sự. Trang này giúp thu hẹp mục đích trước khi mở hướng dẫn theo thành phố.`,
    commonQuestionsTitle: "Câu hỏi thường gặp trước khi đi",
    commonQuestions: [
      "Giấy tờ dùng cho bảo hiểm, cơ quan lãnh sự hay tranh chấp thẻ",
      "Có cần bản gốc hay chỉ cần ảnh hoặc mã hồ sơ",
      "Giờ mở cửa và hạn nhận hồ sơ hôm nay còn đúng không",
      "Nếu khẩn cấp, chăm sóc y tế có cần đi trước phê duyệt bảo hiểm không",
    ],
    cityEyebrow: "Danh sách kiểm tra theo thành phố",
    cityTitle: (city) => `Thứ tự giúp không mất thời gian ở ${city}`,
    cityBody: (country, city) =>
      `Các hướng dẫn ${city}, ${country} được chia theo tình huống, nhưng nguyên tắc giống nhau: an toàn trước, giữ bằng chứng, xác nhận cơ quan phụ trách thật sự nhận hồ sơ hôm nay rồi mới di chuyển.`,
    detailCardBody: "Trang chi tiết tách rõ kiểm tra tại chỗ, bằng chứng, cơ quan phụ trách và xác nhận chính thức theo quốc tịch.",
  },
};

function emergencyExamples(profile: TravelerProfile, incidents: readonly IncidentType[]) {
  return incidents.slice(0, 4).map((incident) => travelerIncident(profile, incident)).join(", ");
}

export function HomeQualitySection({
  profile,
  countries,
  incidents,
}: HomeQualitySectionProps) {
  const c = copy[profile.language];
  const cityCount = countries.reduce((sum, country) => sum + country.cities.length, 0);
  const examples = emergencyExamples(profile, incidents);

  return (
    <section className="mb-16 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-8">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{c.homeEyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 md:text-3xl">
        {c.homeTitle(profile.nativeName, cityCount)}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-700">{c.homeBody(examples)}</p>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {c.qualityCards.map(([title, body]) => (
          <article key={title} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <h3 className="text-sm font-bold text-gray-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-700">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CountryQualitySection({
  profile,
  country,
  incidents,
}: CountryQualitySectionProps) {
  const c = copy[profile.language];
  const countryName = travelerName(profile, country.slug, country.name.en);
  const cityNames = country.cities.map((city) => travelerName(profile, city.slug, city.name.en)).join(", ");
  const examples = emergencyExamples(profile, incidents);

  return (
    <section className="mb-12 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-8">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{c.countryEyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950">
        {c.countryTitle(countryName)}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-700">
        {c.countryBody(countryName, cityNames, examples)}
      </p>
      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
        <h3 className="text-sm font-bold text-blue-950">{c.commonQuestionsTitle}</h3>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-blue-900 md:grid-cols-2">
          {c.commonQuestions.map((item) => (
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

export function CityQualitySection({
  profile,
  country,
  city,
  incidents,
}: CityQualitySectionProps) {
  const c = copy[profile.language];
  const countryName = travelerName(profile, country.slug, country.name.en);
  const cityName = travelerName(profile, city.slug, city.name.en);

  return (
    <section className="mb-12 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-8">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{c.cityEyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950">
        {c.cityTitle(cityName)}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-700">
        {c.cityBody(countryName, cityName)}
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {incidents.map((incident) => (
          <article key={incident} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <h3 className="text-sm font-bold text-gray-950">
              {travelerIncident(profile, incident)}
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-700">{c.detailCardBody}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
