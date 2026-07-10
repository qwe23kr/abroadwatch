import type { CountryConfig, IncidentType } from "@/lib/site-config";
import type { TravelerProfile } from "@/lib/traveler-profiles";
import { travelerIncident, travelerName } from "@/lib/traveler-ui";

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

function isKorean(profile: TravelerProfile) {
  return profile.language === "ko";
}

function emergencyExamples(profile: TravelerProfile, incidents: readonly IncidentType[]) {
  return incidents.slice(0, 4).map((incident) => travelerIncident(profile, incident));
}

export function HomeQualitySection({
  profile,
  countries,
  incidents,
}: HomeQualitySectionProps) {
  const ko = isKorean(profile);
  const cityCount = countries.reduce((sum, country) => sum + country.cities.length, 0);
  const examples = emergencyExamples(profile, incidents);

  return (
    <section className="mb-16 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-8">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {ko ? "편집 품질 기준" : "Editorial quality baseline"}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 md:text-3xl">
        {ko
          ? `${profile.nativeName} 여행자를 위한 ${cityCount}개 도시 긴급 대응 기준`
          : `How these ${cityCount} city guides are built for ${profile.nativeName} travelers`}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-700">
        {ko
          ? `AbroadWatch는 단순히 도시명과 사고명을 조합하지 않습니다. ${examples.join(", ")} 같은 상황에서 현지 기관, 국적별 공관 안내, 보험 또는 카드사에 필요한 증거를 함께 확인하도록 페이지를 구성합니다.`
          : `AbroadWatch does not rely on destination and incident names alone. Each guide connects local response steps, nationality-specific consular guidance, and the evidence travelers often need for insurers, banks, or airlines.`}
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {(ko
          ? [
              ["현지 우선순위", "응급, 경찰, 병원, 교통기관처럼 실제로 먼저 연락해야 할 곳을 상황별로 구분합니다."],
              ["국적별 차이", "같은 사고라도 여권, 신분 확인, 공관 절차는 국적에 따라 달라지므로 별도로 표시합니다."],
              ["재확인 안내", "운영시간, 수수료, 필요 서류처럼 바뀌는 정보는 방문 전 공식 안내로 다시 확인하도록 안내합니다."],
            ]
          : [
              ["Local priority", "Emergency care, police, hospitals, transport operators, and missions are separated by what the traveler needs first."],
              ["Nationality context", "Passport, identity, and consular steps vary by nationality, so they are handled as a separate layer."],
              ["Reconfirmation", "Changeable details such as hours, fees, and required documents are flagged for official reconfirmation."],
            ]
        ).map(([title, body]) => (
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
  const ko = isKorean(profile);
  const countryName = travelerName(profile, country.slug, country.name.en);
  const cityNames = country.cities.map((city) => travelerName(profile, city.slug, city.name.en));
  const examples = emergencyExamples(profile, incidents);

  return (
    <section className="mb-12 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-8">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {ko ? "국가별 사용 방법" : "Destination quality guide"}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950">
        {ko
          ? `${countryName}에서 먼저 구분해야 할 상황`
          : `What to decide first in ${countryName}`}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-700">
        {ko
          ? `${countryName}의 ${cityNames.join(", ")}에서는 같은 ${examples.join(", ")} 상황이라도 공항, 숙소, 경찰서, 병원, 공관 중 먼저 가야 할 곳이 달라집니다. 이 허브는 도시별 상세 가이드로 이동하기 전 사고 목적을 좁히기 위한 페이지입니다.`
          : `Across ${cityNames.join(", ")}, the right first stop can be an airport desk, hotel, police station, hospital, or mission depending on the incident. This hub helps narrow the purpose before opening a city guide.`}
      </p>
      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
        <h3 className="text-sm font-bold text-blue-950">
          {ko ? "방문 전 확인할 공통 질문" : "Common questions before you go"}
        </h3>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-blue-900 md:grid-cols-2">
          {(ko
            ? [
                "문서가 보험용인지, 공관 접수용인지, 카드 분쟁용인지",
                "원본 서류가 필요한지, 사진이나 접수번호로 충분한지",
                "현지 기관 운영시간과 접수 마감이 오늘 유효한지",
                "응급 상황이면 보험 승인보다 현지 긴급번호가 먼저인지",
              ]
            : [
                "Whether the document is for insurance, a mission, or a card dispute",
                "Whether an original paper is required or a case number is enough",
                "Whether today’s opening hours and intake cutoff are still valid",
                "Whether emergency care should happen before insurer approval",
              ]
          ).map((item) => (
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
  const ko = isKorean(profile);
  const countryName = travelerName(profile, country.slug, country.name.en);
  const cityName = travelerName(profile, city.slug, city.name.en);

  return (
    <section className="mb-12 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-8">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {ko ? "도시별 체크리스트" : "City checklist"}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950">
        {ko ? `${cityName}에서 시간을 잃지 않는 순서` : `How to avoid losing time in ${cityName}`}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-700">
        {ko
          ? `${countryName} ${cityName} 가이드는 상황별 페이지로 나뉘지만, 공통 원칙은 같습니다. 먼저 안전을 확보하고, 증거를 저장하고, 방문 전 담당 기관이 실제로 오늘 접수하는지 확인한 뒤 이동하세요.`
          : `The ${cityName}, ${countryName} guides are split by situation, but the operating rule is the same: get safe, preserve evidence, confirm the responsible office is actually accepting cases today, then travel across town.`}
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {incidents.map((incident) => (
          <article key={incident} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <h3 className="text-sm font-bold text-gray-950">
              {travelerIncident(profile, incident)}
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-700">
              {ko
                ? "상세 페이지에서 현장 확인, 증거 보관, 담당 기관, 국적별 공관 확인 순서로 다시 정리합니다."
                : "The detail page separates on-site checks, evidence, responsible offices, and nationality-specific confirmation."}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

