import Link from "next/link";
import Form from "next/form";
import { t } from "@/lib/i18n";
import {
  countries,
  incidentLabels,
  incidentTypes,
  type IncidentType,
  type Locale,
} from "@/lib/site-config";

interface CountryGridProps {
  locale: Locale;
}

/** 국가별 탐색 그리드 */
export function CountryGrid({ locale }: CountryGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {countries.map((country) => (
        <div
          key={country.slug}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <h3 className="mb-3 text-lg font-semibold text-gray-900">
            {country.name[locale]}
          </h3>
          <ul className="space-y-1.5">
            {country.cities.map((city) => (
              <li key={city.slug}>
                <span className="text-sm font-medium text-gray-700">
                  {city.name[locale]}
                </span>
                <ul className="mt-1 flex flex-wrap gap-1.5 pl-2">
                  {incidentTypes.map((incident) => (
                    <li key={incident}>
                      <Link
                        href={`/${locale}/${country.slug}/${city.slug}/${incident}`}
                        className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {incidentLabels[incident][locale]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

interface IncidentGridProps {
  locale: Locale;
}

/** 사건 유형별 탐색 그리드 */
export function IncidentGrid({ locale }: IncidentGridProps) {
  const descriptions: Record<IncidentType, Record<Locale, string>> = {
    "lost-passport": {
      ko: "경찰 신고부터 긴급여권 발급까지",
      en: "From police report to emergency passport",
    },
    "lost-phone": {
      ko: "기기 잠금, SIM 정지, 보험 청구 순서",
      en: "Device lock, SIM block, and insurance steps",
    },
    "lost-wallet": {
      ko: "카드 정지와 현지 분실 신고 절차",
      en: "Card blocking and local loss reporting",
    },
    hospital: {
      ko: "응급번호, 병원 위치, 보험 준비사항",
      en: "Emergency numbers, hospitals, and insurance",
    },
    "police-report": {
      ko: "도난·분실 신고와 보험용 확인서 발급",
      en: "Theft reports and insurance certificates",
    },
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {incidentTypes.map((incident) => (
        <Link
          key={incident}
          href={`/${locale}/search?incident=${incident}`}
          className="group flex min-h-44 flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <IncidentIcon incident={incident} />
          </div>
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">
            {incidentLabels[incident][locale]}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">
            {descriptions[incident][locale]}
          </p>
          <span className="mt-4 text-sm font-semibold text-blue-600">
            {locale === "ko" ? "도시별 가이드 보기 →" : "View city guides →"}
          </span>
        </Link>
      ))}
    </div>
  );
}

/** 사건 유형별 아이콘 */
function IncidentIcon({ incident }: { incident: IncidentType }) {
  const icons: Record<IncidentType, string> = {
    "lost-passport": "📋",
    "lost-phone": "📱",
    "lost-wallet": "👛",
    hospital: "🏥",
    "police-report": "🚔",
  };
  return <span className="text-xl">{icons[incident]}</span>;
}

interface HeroProps {
  locale: Locale;
}

/** 홈페이지 히어로 섹션 */
export function Hero({ locale }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 px-4 py-16 text-white md:py-24">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <div className="relative mx-auto max-w-4xl text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
          {t(locale, "heroTitle")}
        </h1>
        <p className="mx-auto max-w-2xl text-base text-blue-100 md:text-lg">
          {t(locale, "heroSubtitle")}
        </p>
        <Form
          action={`/${locale}/search`}
          className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-2xl bg-white/10 p-2 backdrop-blur-sm sm:flex-row"
        >
          <label htmlFor="guide-search" className="sr-only">
            {t(locale, "searchPlaceholder")}
          </label>
          <input
            id="guide-search"
            name="query"
            type="search"
            required
            placeholder={t(locale, "searchPlaceholder")}
            className="min-w-0 flex-1 rounded-xl bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 sm:w-auto"
          >
            {t(locale, "searchButton")}
          </button>
        </Form>
      </div>
    </section>
  );
}

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

/** 섹션 제목 */
export function SectionHeading({ title, description, className }: SectionHeadingProps) {
  return (
    <div className={`mb-6 ${className ?? ""}`}>
      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">{title}</h2>
      {description && <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600 md:text-base">{description}</p>}
    </div>
  );
}

/** 지원 범위와 정보 운영 원칙 */
export function CoverageAndTrust({ locale }: { locale: Locale }) {
  const cityCount = countries.reduce((total, country) => total + country.cities.length, 0);
  const guideCount = cityCount * incidentTypes.length * 2;
  const stats = locale === "ko"
    ? [[countries.length, "지원 국가"], [cityCount, "주요 도시"], [guideCount, "한·영 가이드"]]
    : [[countries.length, "Countries"], [cityCount, "Major cities"], [guideCount, "KO/EN guides"]];

  return (
    <section className="mb-16 overflow-hidden rounded-2xl bg-slate-900 px-6 py-8 text-white md:px-10 md:py-10">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-blue-300">ABROADWATCH COVERAGE</p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">
            {locale === "ko" ? "필요한 순간 바로 찾는 여행 비상정보" : "Emergency travel information when it matters"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {locale === "ko"
              ? "모든 도시는 여권·휴대폰·지갑 분실, 병원, 경찰 신고의 5가지 상황을 동일하게 제공합니다. 연락처와 절차는 방문 전 해당 기관에 다시 확인하세요."
              : "Every city covers lost passports, phones, wallets, hospitals, and police reports. Reconfirm contacts and procedures with the relevant authority before visiting."}
          </p>
        </div>
        <dl className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-3">
          {stats.map(([value, label]) => (
            <div key={label} className="rounded-xl bg-white/10 p-4 text-center">
              <dt className="text-2xl font-bold md:text-3xl">{value}</dt>
              <dd className="mt-1 text-xs text-slate-300 md:text-sm">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

interface FaqSectionProps {
  locale: Locale;
}

/** 홈페이지 FAQ 섹션 */
export function FaqSection({ locale }: FaqSectionProps) {
  const faqs = [
    { q: t(locale, "faqHome1Q"), a: t(locale, "faqHome1A") },
    { q: t(locale, "faqHome2Q"), a: t(locale, "faqHome2A") },
    { q: t(locale, "faqHome3Q"), a: t(locale, "faqHome3A") },
  ];

  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details
          key={faq.q}
          className="group rounded-xl border border-gray-200 bg-white"
        >
          <summary className="cursor-pointer list-none px-5 py-4 font-medium text-gray-900 hover:bg-gray-50 [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-4">
              {faq.q}
              <span className="shrink-0 text-blue-600 transition-transform group-open:rotate-180">
                ▼
              </span>
            </span>
          </summary>
          <div className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-700">
            {faq.a}
          </div>
        </details>
      ))}
    </div>
  );
}
