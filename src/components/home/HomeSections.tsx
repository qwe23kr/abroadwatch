import Link from "next/link";
import Form from "next/form";
import { CountryGrid } from "@/components/home/CountryGrid";
import { incidentDescriptions, incidentIcons } from "@/lib/incident-ui";
import { t } from "@/lib/i18n";
import {
  countries,
  incidentLabels,
  incidentTypes,
  type Locale,
} from "@/lib/site-config";

export { CountryGrid };

interface IncidentGridProps {
  locale: Locale;
}

/** 사건 유형별 탐색 그리드 */
export function IncidentGrid({ locale }: IncidentGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {incidentTypes.map((incident) => (
        <Link
          key={incident}
          href={`/${locale}/search?incident=${incident}`}
          className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xl">
              {incidentIcons[incident]}
            </div>
            <h3 className="text-base font-bold leading-snug text-gray-900 group-hover:text-blue-700 sm:text-lg">
              {incidentLabels[incident][locale]}
            </h3>
          </div>
          <p className="flex-1 text-sm leading-relaxed text-gray-600">
            {incidentDescriptions[incident][locale]}
          </p>
          <span className="mt-4 text-sm font-semibold text-blue-600">
            {locale === "ko" ? "19개 도시 가이드 보기 →" : "View guides in 19 cities →"}
          </span>
        </Link>
      ))}
    </div>
  );
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
              ? "모든 도시는 여권·휴대폰·지갑 분실, 병원, 경찰 신고, 여행 사기의 6가지 상황을 동일하게 제공합니다. 연락처와 절차는 방문 전 해당 기관에 다시 확인하세요."
              : "Every city covers lost passports, phones, wallets, hospitals, police reports, and travel scams. Reconfirm contacts and procedures with the relevant authority before visiting."}
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
