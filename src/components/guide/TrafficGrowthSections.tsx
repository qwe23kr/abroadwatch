import Link from "next/link";
import type { IncidentType } from "@/lib/site-config";
import type { CountryConfig } from "@/lib/site-config";
import type { TravelerProfile } from "@/lib/traveler-profiles";
import { travelerIncident, travelerName } from "@/lib/traveler-ui";

const incidentQuestionsKo: Record<IncidentType, (city: string) => string> = {
  "lost-passport": (city) => `${city}에서 여권을 잃어버리면 어디부터 가야 하나요?`,
  "lost-phone": (city) => `${city}에서 휴대폰을 잃어버리면 위치 추적과 정지 중 무엇이 먼저인가요?`,
  "lost-wallet": (city) => `${city}에서 지갑을 잃어버리면 카드 정지 후 경찰 신고가 필요한가요?`,
  hospital: (city) => `${city}에서 갑자기 아프면 응급번호와 병원 중 어디로 연락해야 하나요?`,
  "police-report": (city) => `${city}에서 보험용 경찰 신고서는 어디서 받을 수 있나요?`,
  scam: (city) => `${city}에서 여행 사기를 당하면 환불과 신고를 어떻게 시작하나요?`,
};

const incidentQuestionsEn: Record<IncidentType, (city: string) => string> = {
  "lost-passport": (city) => `Where should you go first after losing a passport in ${city}?`,
  "lost-phone": (city) => `Should you track or suspend a lost phone first in ${city}?`,
  "lost-wallet": (city) => `Do you need a police report after losing a wallet in ${city}?`,
  hospital: (city) => `Should you call emergency services or a hospital first in ${city}?`,
  "police-report": (city) => `Where can travelers get an insurance police report in ${city}?`,
  scam: (city) => `How do you start a dispute or report a travel scam in ${city}?`,
};

function questionFor(profile: TravelerProfile, incident: IncidentType, cityName: string) {
  return profile.language === "ko"
    ? incidentQuestionsKo[incident](cityName)
    : incidentQuestionsEn[incident](cityName);
}

function sectionCopy(profile: TravelerProfile, scope: "home" | "country" | "city") {
  if (profile.language === "ko") {
    return {
      eyebrow: "검색 수요 우선순위",
      title:
        scope === "home"
          ? "여행자가 실제로 검색하는 긴급 상황"
          : scope === "country"
            ? "도시별로 바로 확인할 긴급 상황"
            : "이 도시에서 바로 확인할 상황별 질문",
      description:
        "광고보다 먼저 필요한 것은 검색자가 막히는 질문을 정확히 받는 것입니다. 아래 링크는 도시, 상황, 국적을 함께 묶어 상세 가이드로 연결합니다.",
      allGuides: "전체 가이드 보기",
    };
  }

  return {
    eyebrow: "Search demand map",
    title:
      scope === "home"
        ? "Emergency searches travelers actually make"
        : scope === "country"
          ? "City-specific emergency questions"
          : "Situation questions for this city",
    description:
      "Before ads, the site needs pages that match real search intent. These links combine destination, incident, and nationality context into the detailed guides.",
    allGuides: "View all guides",
  };
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
        {countryName} {copy.title}
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
        {cityName} {copy.title}
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
