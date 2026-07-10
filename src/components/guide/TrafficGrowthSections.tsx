import Link from "next/link";
import type { CountryConfig, IncidentType } from "@/lib/site-config";
import type { TravelerProfile } from "@/lib/traveler-profiles";
import { travelerIncident, travelerName } from "@/lib/traveler-ui";

type Language = TravelerProfile["language"];
type Scope = "home" | "country" | "city";

const incidentQuestions: Record<Language, Record<IncidentType, (city: string) => string>> = {
  ko: {
    "lost-passport": (city) => `${city}에서 여권을 잃어버리면 어디부터 가야 하나요?`,
    "lost-phone": (city) => `${city}에서 휴대폰을 잃어버리면 위치 추적과 정지 중 무엇이 먼저인가요?`,
    "lost-wallet": (city) => `${city}에서 지갑을 잃어버리면 카드 정지와 경찰 신고가 필요한가요?`,
    hospital: (city) => `${city}에서 갑자기 아프면 응급번호와 병원 중 어디로 연락해야 하나요?`,
    "police-report": (city) => `${city}에서 보험용 경찰 신고서는 어디서 받을 수 있나요?`,
    scam: (city) => `${city}에서 여행 사기를 당하면 환불과 신고를 어떻게 시작하나요?`,
  },
  en: {
    "lost-passport": (city) => `Where should you go first after losing a passport in ${city}?`,
    "lost-phone": (city) => `Should you track or suspend a lost phone first in ${city}?`,
    "lost-wallet": (city) => `Do you need a police report after losing a wallet in ${city}?`,
    hospital: (city) => `Should you call emergency services or a hospital first in ${city}?`,
    "police-report": (city) => `Where can travelers get an insurance police report in ${city}?`,
    scam: (city) => `How do you start a dispute or report a travel scam in ${city}?`,
  },
  ja: {
    "lost-passport": (city) => `${city}でパスポートをなくしたら、最初にどこへ行くべきですか？`,
    "lost-phone": (city) => `${city}でスマホをなくしたら、位置確認と利用停止のどちらを先にしますか？`,
    "lost-wallet": (city) => `${city}で財布をなくしたら、カード停止や警察届は必要ですか？`,
    hospital: (city) => `${city}で急に具合が悪くなったら、救急番号と病院のどちらを使いますか？`,
    "police-report": (city) => `${city}で保険用の警察届はどこで取得できますか？`,
    scam: (city) => `${city}で旅行トラブルや詐欺に遭ったら、返金や届出をどう始めますか？`,
  },
  "zh-Hans": {
    "lost-passport": (city) => `在${city}丢失护照后，第一步应该去哪里？`,
    "lost-phone": (city) => `在${city}丢失手机后，应该先定位还是先停用？`,
    "lost-wallet": (city) => `在${city}丢失钱包后，需要先冻结银行卡还是报警？`,
    hospital: (city) => `在${city}突然生病时，应该先拨打急救电话还是去医院？`,
    "police-report": (city) => `在${city}哪里可以取得保险所需的警方记录？`,
    scam: (city) => `在${city}遇到旅游诈骗后，如何开始退款或报案？`,
  },
  "zh-Hant": {
    "lost-passport": (city) => `在${city}遺失護照後，第一步應該去哪裡？`,
    "lost-phone": (city) => `在${city}遺失手機後，應該先定位還是先停用？`,
    "lost-wallet": (city) => `在${city}遺失錢包後，需要先停卡還是報警？`,
    hospital: (city) => `在${city}突然不舒服時，應該先打急救電話還是去醫院？`,
    "police-report": (city) => `在${city}哪裡可以取得保險需要的警方紀錄？`,
    scam: (city) => `在${city}遇到旅遊詐騙後，退款或報案要怎麼開始？`,
  },
  th: {
    "lost-passport": (city) => `ถ้าพาสปอร์ตหายใน${city} ควรไปที่ไหนก่อน?`,
    "lost-phone": (city) => `ถ้าโทรศัพท์หายใน${city} ควรติดตามตำแหน่งหรือระงับซิมก่อน?`,
    "lost-wallet": (city) => `ถ้ากระเป๋าสตางค์หายใน${city} ต้องอายัดบัตรหรือแจ้งตำรวจก่อน?`,
    hospital: (city) => `ถ้าป่วยกะทันหันใน${city} ควรโทรฉุกเฉินหรือไปโรงพยาบาลก่อน?`,
    "police-report": (city) => `ใน${city} ขอรายงานตำรวจสำหรับประกันได้ที่ไหน?`,
    scam: (city) => `ถ้าเจอกลโกงระหว่างเที่ยวใน${city} ควรเริ่มขอคืนเงินหรือแจ้งเรื่องอย่างไร?`,
  },
  vi: {
    "lost-passport": (city) => `Mất hộ chiếu ở ${city} thì nên đến đâu trước?`,
    "lost-phone": (city) => `Mất điện thoại ở ${city} thì nên định vị hay khóa SIM trước?`,
    "lost-wallet": (city) => `Mất ví ở ${city} thì cần khóa thẻ hay trình báo cảnh sát?`,
    hospital: (city) => `Đột ngột bị bệnh ở ${city} thì nên gọi cấp cứu hay đến bệnh viện trước?`,
    "police-report": (city) => `Ở ${city}, lấy giấy trình báo cảnh sát cho bảo hiểm ở đâu?`,
    scam: (city) => `Bị lừa đảo du lịch ở ${city} thì bắt đầu hoàn tiền hoặc trình báo thế nào?`,
  },
};

const sectionCopies: Record<Language, Record<Scope, { eyebrow: string; title: string; description: string }>> = {
  ko: {
    home: {
      eyebrow: "검색 수요 지도",
      title: "여행자가 실제로 검색하는 긴급 상황",
      description: "목적지, 상황, 국적 정보를 함께 묶어 실제 여행 긴급 검색 의도에 맞는 상세 가이드로 연결합니다.",
    },
    country: {
      eyebrow: "검색 수요 지도",
      title: "도시별로 바로 확인할 긴급 질문",
      description: "같은 국가 안에서도 도시마다 먼저 연락할 기관과 필요한 문서가 달라질 수 있습니다.",
    },
    city: {
      eyebrow: "검색 수요 지도",
      title: "이 도시에서 바로 확인할 상황별 질문",
      description: "상황을 고르면 이 도시와 여행자 국적에 맞춘 상세 가이드로 이동합니다.",
    },
  },
  en: {
    home: {
      eyebrow: "Search demand map",
      title: "Emergency searches travelers actually make",
      description: "These links combine destination, incident, and nationality context into detailed guides that match real travel emergency searches.",
    },
    country: {
      eyebrow: "Search demand map",
      title: "City-specific emergency questions",
      description: "Within the same country, the first office and required document can change by city.",
    },
    city: {
      eyebrow: "Search demand map",
      title: "Situation questions for this city",
      description: "Choose the incident to open a guide built around this city and your nationality.",
    },
  },
  ja: {
    home: {
      eyebrow: "検索ニーズマップ",
      title: "旅行者が実際に検索する緊急トラブル",
      description: "目的地、トラブル内容、国籍別の確認事項を組み合わせ、実際の検索意図に合う詳しいガイドへつなげます。",
    },
    country: {
      eyebrow: "検索ニーズマップ",
      title: "都市別に確認したい緊急時の質問",
      description: "同じ国でも、最初に行く窓口や必要な書類は都市によって変わることがあります。",
    },
    city: {
      eyebrow: "検索ニーズマップ",
      title: "この都市で確認したい状況別の質問",
      description: "状況を選ぶと、この都市と旅行者の国籍に合わせた詳しいガイドを開けます。",
    },
  },
  "zh-Hans": {
    home: {
      eyebrow: "搜索需求地图",
      title: "旅行者真实会搜索的紧急情况",
      description: "把目的地、事件类型和国籍相关确认点结合起来，连接到符合真实搜索意图的详细指南。",
    },
    country: {
      eyebrow: "搜索需求地图",
      title: "按城市确认的紧急问题",
      description: "即使在同一个国家，不同城市的第一联系机构和所需文件也可能不同。",
    },
    city: {
      eyebrow: "搜索需求地图",
      title: "这个城市的情境问题",
      description: "选择事件后，可打开结合该城市和旅行者国籍的详细指南。",
    },
  },
  "zh-Hant": {
    home: {
      eyebrow: "搜尋需求地圖",
      title: "旅客真實會搜尋的緊急狀況",
      description: "把目的地、事件類型和國籍相關確認事項結合起來，連到符合真實搜尋意圖的詳細指南。",
    },
    country: {
      eyebrow: "搜尋需求地圖",
      title: "依城市確認的緊急問題",
      description: "即使在同一個國家，不同城市的第一聯絡單位和所需文件也可能不同。",
    },
    city: {
      eyebrow: "搜尋需求地圖",
      title: "這個城市的情境問題",
      description: "選擇事件後，可開啟結合此城市和旅客國籍的詳細指南。",
    },
  },
  th: {
    home: {
      eyebrow: "แผนที่ความต้องการค้นหา",
      title: "เหตุฉุกเฉินที่นักเดินทางค้นหาจริง",
      description: "รวมจุดหมาย เหตุการณ์ และบริบทตามสัญชาติ เพื่อพาไปยังคู่มือละเอียดที่ตรงกับเจตนาการค้นหาจริง",
    },
    country: {
      eyebrow: "แผนที่ความต้องการค้นหา",
      title: "คำถามฉุกเฉินแยกตามเมือง",
      description: "แม้อยู่ประเทศเดียวกัน หน่วยงานแรกที่ควรติดต่อและเอกสารที่ต้องใช้ต่างกันได้ในแต่ละเมือง",
    },
    city: {
      eyebrow: "แผนที่ความต้องการค้นหา",
      title: "คำถามตามสถานการณ์ในเมืองนี้",
      description: "เลือกเหตุการณ์เพื่อเปิดคู่มือที่ปรับตามเมืองนี้และสัญชาติของนักเดินทาง",
    },
  },
  vi: {
    home: {
      eyebrow: "Bản đồ nhu cầu tìm kiếm",
      title: "Các tình huống khẩn cấp du khách thật sự tìm kiếm",
      description: "Kết hợp điểm đến, sự cố và bối cảnh theo quốc tịch để dẫn tới hướng dẫn chi tiết đúng với nhu cầu tìm kiếm thực tế.",
    },
    country: {
      eyebrow: "Bản đồ nhu cầu tìm kiếm",
      title: "Câu hỏi khẩn cấp theo từng thành phố",
      description: "Trong cùng một quốc gia, cơ quan cần liên hệ trước và giấy tờ cần chuẩn bị có thể khác nhau theo thành phố.",
    },
    city: {
      eyebrow: "Bản đồ nhu cầu tìm kiếm",
      title: "Câu hỏi theo tình huống tại thành phố này",
      description: "Chọn sự cố để mở hướng dẫn phù hợp với thành phố này và quốc tịch của bạn.",
    },
  },
};

function questionFor(profile: TravelerProfile, incident: IncidentType, cityName: string) {
  return incidentQuestions[profile.language][incident](cityName);
}

function sectionCopy(profile: TravelerProfile, scope: Scope) {
  return sectionCopies[profile.language][scope];
}

interface HomeIntentClusterProps {
  profile: TravelerProfile;
  countries: CountryConfig[];
  incidents: readonly IncidentType[];
}

export function HomeIntentCluster({ profile, countries, incidents }: HomeIntentClusterProps) {
  const copy = sectionCopy(profile, "home");
  const featured = countries.flatMap((country) =>
    country.cities.slice(0, 2).flatMap((city) =>
      incidents.slice(0, 3).map((incident) => ({ country, city, incident })),
    ),
  ).slice(0, 12);

  return (
    <section className="mb-16 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-8">
      <p className="text-xs font-bold uppercase tracking-wide text-blue-700">{copy.eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 md:text-3xl">
        {copy.title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">{copy.description}</p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {featured.map(({ country, city, incident }) => {
          const cityName = travelerName(profile, city.slug, city.name.en);
          return (
            <Link
              key={`${country.slug}-${city.slug}-${incident}`}
              href={`/${profile.code}/${country.slug}/${city.slug}/${incident}`}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-xs font-semibold text-blue-700">
                {travelerName(profile, country.slug, country.name.en)} · {travelerIncident(profile, incident)}
              </p>
              <h3 className="mt-1 text-sm font-bold leading-6 text-gray-950">
                {questionFor(profile, incident, cityName)}
              </h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

interface CountryIntentClusterProps {
  profile: TravelerProfile;
  country: CountryConfig;
  incidents: readonly IncidentType[];
}

export function CountryIntentCluster({ profile, country, incidents }: CountryIntentClusterProps) {
  const copy = sectionCopy(profile, "country");
  const countryName = travelerName(profile, country.slug, country.name.en);

  return (
    <section className="mb-12 rounded-3xl border border-blue-100 bg-blue-50/60 p-5 md:p-8">
      <p className="text-xs font-bold uppercase tracking-wide text-blue-700">{copy.eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950">
        {countryName} · {copy.title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-700">{copy.description}</p>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {country.cities.map((city) => {
          const cityName = travelerName(profile, city.slug, city.name.en);
          return (
            <article key={city.slug} className="rounded-2xl border border-white bg-white p-4 shadow-sm">
              <Link href={`/${profile.code}/${country.slug}/${city.slug}`} className="font-bold text-gray-950 hover:text-blue-700">
                {cityName}
              </Link>
              <div className="mt-3 grid gap-2">
                {incidents.map((incident) => (
                  <Link
                    key={incident}
                    href={`/${profile.code}/${country.slug}/${city.slug}/${incident}`}
                    className="rounded-xl bg-gray-50 px-3 py-2 text-sm leading-5 text-gray-700 hover:bg-blue-50 hover:text-blue-800"
                  >
                    {questionFor(profile, incident, cityName)}
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

interface CityIntentClusterProps {
  profile: TravelerProfile;
  country: CountryConfig;
  city: CountryConfig["cities"][number];
  incidents: readonly IncidentType[];
}

export function CityIntentCluster({ profile, country, city, incidents }: CityIntentClusterProps) {
  const copy = sectionCopy(profile, "city");
  const cityName = travelerName(profile, city.slug, city.name.en);

  return (
    <section className="mb-12 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-8">
      <p className="text-xs font-bold uppercase tracking-wide text-blue-700">{copy.eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950">
        {cityName} · {copy.title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">{copy.description}</p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {incidents.map((incident) => (
          <Link
            key={incident}
            href={`/${profile.code}/${country.slug}/${city.slug}/${incident}`}
            className="rounded-2xl border border-gray-200 bg-gray-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
          >
            <p className="text-xs font-semibold text-blue-700">{travelerIncident(profile, incident)}</p>
            <h3 className="mt-1 text-sm font-bold leading-6 text-gray-950">
              {questionFor(profile, incident, cityName)}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
