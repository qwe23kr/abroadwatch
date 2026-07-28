import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { NationalityProofSection } from "@/components/guide/NationalityProofSection";
import { GuideQualitySection } from "@/components/guide/GuideQualitySection";
import { SearchIntentSection } from "@/components/guide/SearchIntentSection";
import { TravelerDepthSection } from "@/components/guide/TravelerDepthSection";
import { TravelProblemCta } from "@/components/guide/TravelProblemCta";
import { PassportCostEvidence } from "@/components/guide/PassportCostEvidence";
import { MdxContent } from "@/components/mdx/MdxContent";
import { EmergencyFab } from "@/components/layout/EmergencyFab";
import { getAllTravelerGuideParams, getTravelerGuide } from "@/lib/traveler-content";
import { getTravelerProfile } from "@/lib/traveler-profiles";
import { getTravelerCity, getTravelerCountry } from "@/lib/traveler-destinations";
import { travelerIncident, travelerName, travelerTagCopy, travelerUi } from "@/lib/traveler-ui";
import {
  buildFaqJsonLd,
  buildTravelerArticleJsonLd,
  buildTravelerBreadcrumbJsonLd,
  buildTravelerGuideMetadata,
} from "@/lib/seo";
import { isValidIncident, type IncidentType, type Locale } from "@/lib/site-config";

interface Props {
  params: Promise<{ traveler: string; country: string; city: string; incident: string }>;
}

export function generateStaticParams() {
  return getAllTravelerGuideParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { traveler, country, city, incident } = await params;
  const profile = getTravelerProfile(traveler);
  if (!profile || !isValidIncident(incident)) return {};
  const guide = getTravelerGuide(profile.code, country, city, incident);
  if (!guide) return {};
  return buildTravelerGuideMetadata(profile, country, city, incident, guide.frontmatter);
}

export default async function TravelerGuidePage({ params }: Props) {
  const { traveler, country, city, incident } = await params;
  const profile = getTravelerProfile(traveler);
  if (!profile || !isValidIncident(incident) || !getTravelerCountry(country) || !getTravelerCity(country, city)) notFound();
  const guide = getTravelerGuide(profile.code, country, city, incident as IncidentType);
  if (!guide) notFound();
  const locale: Locale = traveler === "kr" ? "ko" : "en";
  const ui = travelerUi(profile);
  const tagCopy = travelerTagCopy(profile);
  const cityName = travelerName(profile, city, getTravelerCity(country, city)?.name.en ?? city);
  const countryName = travelerName(profile, country, getTravelerCountry(country)?.name.en ?? country);
  const incidentName = travelerIncident(profile, incident as IncidentType);
  const displayTitle = profile.language === "ko"
    ? ({
        "lost-passport": `${cityName}에서 여권을 잃어버렸다면?`,
        "lost-phone": `${cityName}에서 휴대폰을 잃어버렸다면?`,
        "lost-wallet": `${cityName}에서 지갑을 잃어버렸다면?`,
        hospital: `${cityName}에서 병원에 가야 한다면?`,
        "police-report": `${cityName}에서 경찰 신고가 필요하다면?`,
        scam: `${cityName}에서 여행 사기를 당했다면?`,
      } satisfies Record<IncidentType, string>)[incident as IncidentType]
    : guide.frontmatter.title;
  const firstActions = profile.language === "ko"
    ? ({
        "lost-passport": ["마지막으로 본 장소와 분실물 센터 확인", "경찰 접수번호와 서면 확인 확보", "한국 공관에 긴급여권 접수조건 확인"],
        "lost-phone": ["원격 위치 확인 후 분실 모드 설정", "SIM·eSIM과 간편결제 즉시 정지", "IMEI와 위치 화면을 저장한 뒤 신고"],
        "lost-wallet": ["카드와 모바일 결제 즉시 정지", "부정결제 내역과 시각 캡처", "보험 목적이면 경찰 확인서 확보"],
        hospital: ["위급하면 보험사보다 긴급번호가 먼저", "여권·보험증권·결제수단 준비", "진단서와 영수증 원본 요청"],
        "police-report": ["신고 목적을 분실·도난·보험으로 구분", "물품 정보와 발생 시각 정리", "접수번호가 적힌 문서 요청"],
        scam: ["추가 결제와 상대방 연락 차단", "대화·영수증·위치 등 증거 저장", "카드사와 현지 경찰에 시간순 신고"],
      } satisfies Record<IncidentType, string[]>)[incident as IncidentType]
    : [];
  const canonicalPath = `/${traveler}/${country}/${city}/${incident}`;
  const breadcrumbJsonLd = buildTravelerBreadcrumbJsonLd([
    { name: profile.nativeName, path: `/${traveler}` },
    { name: countryName, path: `/${traveler}/${country}` },
    { name: cityName, path: `/${traveler}/${country}/${city}` },
    { name: incidentName, path: canonicalPath },
  ]);
  const articleJsonLd = buildTravelerArticleJsonLd(profile, {
    countryName,
    cityName,
    incidentName,
    path: canonicalPath,
    title: guide.frontmatter.title,
    description: guide.frontmatter.summary,
    updatedAt: guide.frontmatter.updatedAt,
  });
  const faqItems = Array.from(
    guide.content.matchAll(/<FaqItem question="([^"]+)">\s*([\s\S]*?)\s*<\/FaqItem>/g),
    (match) => ({ question: match[1], answer: match[2].replace(/[*_`]/g, "").trim() }),
  );
  const hashtag = (value: string) => `#${value.replace(/[\s·・,.'’/()\-]/g, "")}`;
  const tags = [
    { label: hashtag(`${cityName}${tagCopy.city}`), href: `/${traveler}/search?query=${encodeURIComponent(cityName)}` },
    { label: hashtag(incidentName), href: `/${traveler}/search?incident=${incident}` },
    { label: hashtag(`${countryName}${tagCopy.country}`), href: `/${traveler}/search?query=${encodeURIComponent(countryName)}` },
    { label: hashtag(`${profile.nativeName}${tagCopy.traveler}`), href: `/${traveler}` },
    { label: hashtag(tagCopy.guide), href: `/${traveler}/search?incident=${incident}` },
  ];
  const relatedCitiesLabel = ({
    ko: "관련 도시 가이드",
    "zh-Hans": "相关城市指南",
    ja: "関連都市のガイド",
    "zh-Hant": "相關城市指南",
    th: "คู่มือเมืองที่เกี่ยวข้อง",
    vi: "Hướng dẫn thành phố liên quan",
    en: "Related city guides",
  } as const)[profile.language];
  const relatedCities = getTravelerCountry(country)!.cities.filter((item) => item.slug !== city);

  return (
    <>
      <Script
        id="traveler-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="traveler-article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqItems.length > 0 && (
        <Script
          id="traveler-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(faqItems)) }}
        />
      )}
      <main className="relative mx-auto max-w-4xl px-4 py-8 pb-24 md:px-6 md:py-14">
      <article>
        <nav className="mb-8 text-sm font-semibold text-[#788983]" aria-label="Breadcrumb">
          <Link href={`/${traveler}`} className="hover:text-[#0f766e]">{profile.flag} {profile.nativeName}</Link>
          <span className="mx-2">/</span>
          <Link href={`/${traveler}/${country}`} className="hover:text-blue-700">{countryName}</Link>
          <span className="mx-2">/</span>
          <Link href={`/${traveler}/${country}/${city}`} className="hover:text-blue-700">{cityName}</Link>
          <span className="mx-2">/</span>
          <span>{incidentName}</span>
        </nav>

        <header className="mb-10">
          <div className="mb-5 flex flex-wrap items-center gap-2"><span className="rounded-full bg-[#dff7ef] px-3 py-1.5 text-xs font-black text-[#0f766e]">{incidentName}</span><span className="text-xs font-bold text-[#788983]">{cityName} · {countryName}</span></div>
          <h1 className="text-balance text-4xl font-black leading-[1.03] tracking-[-.055em] text-[#10221d] md:text-6xl">{displayTitle}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#61716b]">{guide.frontmatter.summary}</p>
          {firstActions.length > 0 && (
            <section className="mt-8 overflow-hidden rounded-[1.75rem] bg-[#10221d] p-6 text-white md:p-8">
              <p className="text-xs font-black tracking-[.14em] text-[#c8f169]">FIRST 10 MINUTES</p>
              <h2 className="mt-3 text-xl font-black">지금 먼저 할 일</h2>
              <ol className="mt-5 grid gap-3 md:grid-cols-3">
                {firstActions.map((action, index) => <li key={action} className="rounded-2xl bg-white/[.08] p-4 text-sm leading-6"><strong className="mr-2 text-[#c8f169]">0{index + 1}</strong>{action}</li>)}
              </ol>
            </section>
          )}
          <dl className="mt-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
            <div className="rounded-2xl bg-[#ffe9e8] p-4"><dt className="text-xs font-bold text-[#b4232b]">{ui.emergency}</dt><dd className="mt-1 font-black text-[#7a2529]">{guide.frontmatter.emergencyNumber}</dd></div>
            <div className="rounded-2xl bg-white p-4 shadow-sm"><dt className="text-xs font-bold text-[#788983]">{ui.updated}</dt><dd className="mt-1 font-black">{guide.frontmatter.updatedAt}</dd></div>
            <div className="rounded-2xl bg-white p-4 shadow-sm"><dt className="text-xs font-bold text-[#788983]">{ui.nationality}</dt><dd className="mt-1 font-black">{profile.nativeName}</dd></div>
          </dl>
          <nav className="mt-5" aria-label={tagCopy.heading}>
            <p className="sr-only">{tagCopy.heading}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  className="rounded-full border border-[#173c32]/10 bg-white px-3 py-1.5 text-sm font-bold text-[#52645e] transition hover:border-[#0f766e] hover:text-[#0f766e]"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        <div className="prose-guide">
          <SearchIntentSection
            locale={locale}
            uiLanguage={profile.language}
            cityName={cityName}
            countryName={countryName}
            incident={incident as IncidentType}
            incidentLabel={incidentName}
          />
          {incident === "lost-passport" && (
            <PassportCostEvidence profile={profile} country={country} city={city} />
          )}
          <MdxContent source={guide.content} locale={locale} uiLanguage={profile.language} />
        </div>

        <GuideQualitySection
          profile={profile}
          countryName={countryName}
          cityName={cityName}
          incidentName={incidentName}
          incident={incident as IncidentType}
          emergencyNumber={guide.frontmatter.emergencyNumber}
        />

        <TravelerDepthSection
          profile={profile}
          countryName={countryName}
          cityName={cityName}
          incidentName={incidentName}
          incident={incident as IncidentType}
        />

        <NationalityProofSection
          profile={profile}
          countryName={countryName}
          cityName={cityName}
          incidentName={incidentName}
          incident={incident as IncidentType}
          emergencyNumber={guide.frontmatter.emergencyNumber}
        />

        <section className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="mb-4 text-lg font-bold">{ui.other}</h2>
          <div className="flex flex-wrap gap-2">
            {(["lost-passport", "lost-phone", "lost-wallet", "hospital", "police-report", "scam"] as const).filter((item) => item !== incident).map((item) => (
              <TrackedLink
                key={item}
                href={`/${traveler}/${country}/${city}/${item}`}
                eventName="related_page_click"
                eventParams={{ from: canonicalPath, to_incident: item, relation: "same_city" }}
                className="rounded-full border border-gray-200 px-3 py-2 text-sm hover:bg-blue-50"
              >
                {travelerIncident(profile, item)}
              </TrackedLink>
            ))}
          </div>
        </section>

        {relatedCities.length > 0 && (
          <section className="mt-10 border-t border-gray-200 pt-8">
            <h2 className="mb-4 text-lg font-bold">{relatedCitiesLabel}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedCities.map((relatedCity) => (
                <TrackedLink
                  key={relatedCity.slug}
                  href={`/${traveler}/${country}/${relatedCity.slug}/${incident}`}
                  eventName="related_page_click"
                  eventParams={{ from: canonicalPath, to_city: relatedCity.slug, relation: "same_incident" }}
                  className="rounded-xl border border-gray-200 bg-white p-4 font-semibold text-gray-800 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
                >
                  {travelerName(profile, relatedCity.slug, relatedCity.name.en)} · {travelerIncident(profile, incident as IncidentType)} →
                </TrackedLink>
              ))}
            </div>
          </section>
        )}
      </article>
      <div className="mt-8 2xl:absolute 2xl:left-[calc(100%+1rem)] 2xl:top-12 2xl:mt-0 2xl:w-[260px]">
        <TravelProblemCta language={profile.language} travelerCode={profile.code} incident={incident} />
      </div>
      </main>
      <EmergencyFab locale={locale} phone={guide.frontmatter.emergencyNumber} label={guide.frontmatter.title} />
    </>
  );
}
