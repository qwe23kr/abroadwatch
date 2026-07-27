import Form from "next/form";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { EmergencyFab } from "@/components/layout/EmergencyFab";
import { HomeQualitySection } from "@/components/guide/HubQualitySections";
import { incidentIcons } from "@/lib/incident-ui";
import {
  buildFaqJsonLd,
  buildTravelerHomeMetadata,
  buildTravelerItemListJsonLd,
  buildWebsiteJsonLd,
} from "@/lib/seo";
import { incidentTypes, type IncidentType } from "@/lib/site-config";
import { getTravelerDestinations } from "@/lib/traveler-destinations";
import { getPopularTravelerGuides, type TravelerGuide } from "@/lib/traveler-content";
import { getTravelerProfile, travelerProfiles, type TravelerProfile } from "@/lib/traveler-profiles";
import { travelerIncident, travelerName, travelerUi } from "@/lib/traveler-ui";

export function generateStaticParams() {
  return travelerProfiles.map((profile) => ({ traveler: profile.code }));
}

export async function generateMetadata({ params }: { params: Promise<{ traveler: string }> }): Promise<Metadata> {
  const profile = getTravelerProfile((await params).traveler);
  return profile ? buildTravelerHomeMetadata(profile) : {};
}

const priorityIncidents: IncidentType[] = ["lost-phone", "scam", "police-report", "lost-passport", "hospital", "lost-wallet"];

function GuideCard({ guide, profile, index }: { guide: TravelerGuide; profile: TravelerProfile; index: number }) {
  return (
    <Link
      href={`/${profile.code}/${guide.country}/${guide.city}/${guide.incident}`}
      className="group relative flex min-h-56 flex-col overflow-hidden rounded-[1.75rem] border border-[#173c32]/10 bg-white p-6 shadow-[0_12px_40px_rgba(16,34,29,.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(16,34,29,.12)]"
    >
      <div className="mb-8 flex items-center justify-between">
        <span className="rounded-full bg-[#dff7ef] px-3 py-1.5 text-xs font-bold text-[#0f766e]">
          {travelerIncident(profile, guide.incident)}
        </span>
        <span className="text-xs font-black tabular-nums text-[#b7c3be]">0{index + 1}</span>
      </div>
      <h3 className="text-lg font-black leading-snug tracking-[-0.03em] text-[#10221d] group-hover:text-[#0f766e]">
        {guide.frontmatter.title}
      </h3>
      <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-[#61716b]">{guide.frontmatter.summary}</p>
      <span className="mt-5 flex items-center justify-between text-xs font-bold text-[#52645e]">
        {travelerName(profile, guide.city)}, {travelerName(profile, guide.country)}
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#10221d] text-[#c8f169] transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}

export default async function TravelerHomePage({ params }: { params: Promise<{ traveler: string }> }) {
  const profile = getTravelerProfile((await params).traveler);
  if (!profile) notFound();
  const ui = travelerUi(profile);
  const destinations = getTravelerDestinations(profile);
  const popularGuides = getPopularTravelerGuides(profile.code, 6);
  const cityCount = destinations.reduce((sum, country) => sum + country.cities.length, 0);
  const isKo = profile.language === "ko";
  const copy = isKo ? {
    eyebrow: "해외 문제 해결 가이드",
    hero: "당황한 순간에도,\n다음 행동은 선명하게.",
    subtitle: "국적과 현재 도시를 기준으로 긴급 연락처, 신고 절차, 필요한 서류와 보상 준비까지 한 번에 확인하세요.",
    search: "도시 또는 문제를 검색하세요",
    searchButton: "해결 방법 찾기",
    now: "지금 무슨 일이 생겼나요?",
    nowSub: "실제 검색에서 가장 많이 찾는 문제부터 정리했습니다.",
    tool: "60초 대응 도구",
    toolTitle: "휴대폰을 잃어버렸나요?",
    toolBody: "잠금, 유심 정지, 결제 차단, 경찰 신고, 보험 증거 보존 순서를 놓치지 마세요.",
    toolCta: "지금 대응 시작",
    browse: "목적지로 찾기",
    browseSub: "현재 있는 나라를 선택하면 도시별 절차와 공식 연락처를 보여드립니다.",
    popular: "여행자가 지금 찾는 가이드",
    trust: "정보를 믿을 수 있는 이유",
    claim: "귀국 후에도 끝까지",
    claimTitle: "보험 청구와 피해 복구까지 연결합니다.",
    claimBody: "현장에서 어떤 증거를 남겨야 하는지부터 귀국 후 제출할 서류까지 체크리스트로 정리했습니다.",
    claimCta: "보상·청구 가이드 보기",
  } : {
    eyebrow: "Travel problem solver",
    hero: "When plans break,\nyour next move stays clear.",
    subtitle: "Get the right contacts, local steps, documents, and recovery checklist for your nationality and current city.",
    search: "Search a city or travel problem",
    searchButton: "Find my next step",
    now: "What happened?",
    nowSub: "Start with the problems travelers need to solve most often.",
    tool: "60-second response tool",
    toolTitle: "Lost your phone abroad?",
    toolBody: "Lock the device, stop the SIM and payments, report it, and preserve evidence in the right order.",
    toolCta: "Start now",
    browse: "Browse by destination",
    browseSub: "Choose where you are for city-specific steps and official contacts.",
    popular: "Guides travelers are using",
    trust: "Why trust AbroadWatch",
    claim: "Recovery after you return",
    claimTitle: "From incident report to insurance claim.",
    claimBody: "Know what evidence to save on the ground and which documents to submit when you get home.",
    claimCta: "View claims checklist",
  };
  const faqJsonLd = buildFaqJsonLd([
    { question: ui.faq1q, answer: ui.faq1a },
    { question: ui.faq2q, answer: ui.faq2a },
    { question: ui.faq3q, answer: ui.faq3a },
  ]);

  return (
    <>
      <Script id="traveler-home-website-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebsiteJsonLd(profile)) }} />
      <Script id="traveler-home-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Script id="traveler-home-itemlist-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildTravelerItemListJsonLd(copy.popular, popularGuides.map((g) => ({ name: g.frontmatter.title, description: g.frontmatter.summary, path: `/${profile.code}/${g.country}/${g.city}/${g.incident}` })))) }} />

      <section className="relative isolate overflow-hidden bg-[#10221d] text-white">
        <div className="animate-soft-pulse absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#0f766e]/35 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-[#c8f169]/10 blur-3xl" />
        <div className="mx-auto grid min-h-[610px] max-w-7xl gap-12 px-4 py-16 sm:px-6 md:px-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:py-24">
          <div className="animate-fade-in-up relative z-10">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold tracking-[.12em] text-[#c8f169]">
              <span className="h-2 w-2 rounded-full bg-[#c8f169]" /> {profile.nativeName} · {copy.eyebrow}
            </p>
            <h1 className="text-balance break-keep whitespace-pre-line text-[clamp(2.55rem,5.8vw,4.9rem)] font-black leading-[.96] tracking-[-.06em]">
              {isKo ? <><span className="block">당황한 순간에도,</span><span className="block">다음 행동은</span><span className="block text-[#c8f169]">선명하게.</span></> : copy.hero}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-[#c6d3ce] md:text-lg">{copy.subtitle}</p>
            <Form action={`/${profile.code}/search`} className="mt-9 flex max-w-2xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-2xl shadow-black/20 sm:flex-row">
              <label htmlFor="traveler-guide-search" className="sr-only">{copy.search}</label>
              <input id="traveler-guide-search" name="query" type="search" required placeholder={copy.search} className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3.5 text-[#10221d] outline-none placeholder:text-[#84938e] focus:bg-[#f6f7f2]" />
              <button className="rounded-xl bg-[#c8f169] px-5 py-3.5 text-sm font-black text-[#10221d] transition hover:bg-[#d9ff82] active:scale-[.98]">{copy.searchButton}</button>
            </Form>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-[#93aaa2]">
              <span>● {destinations.length} countries</span><span>● {cityCount} cities</span><span>● {cityCount * 6} action guides</span>
            </div>
          </div>

          <Link href={`/${profile.code}/tools/lost-phone`} className="animate-float-slow group relative mx-auto w-full max-w-md rounded-[2rem] border border-white/15 bg-white/[.08] p-3 shadow-2xl backdrop-blur-md">
            <div className="rounded-[1.55rem] bg-[#f6f7f2] p-6 text-[#10221d]">
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-[#10221d] px-3 py-1.5 text-[10px] font-black tracking-[.12em] text-[#c8f169]">{copy.tool}</span>
                <span className="text-3xl">⌁</span>
              </div>
              <p className="mt-10 text-3xl font-black tracking-[-.045em]">{copy.toolTitle}</p>
              <p className="mt-3 text-sm leading-6 text-[#61716b]">{copy.toolBody}</p>
              <div className="mt-8 flex items-center justify-between rounded-2xl bg-[#10221d] px-5 py-4 text-sm font-black text-white">
                {copy.toolCta}<span className="text-[#c8f169] transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-8 md:py-24">
        <section>
          <p className="text-xs font-black tracking-[.16em] text-[#0f766e]">START HERE</p>
          <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div><h2 className="text-3xl font-black tracking-[-.045em] md:text-5xl">{copy.now}</h2><p className="mt-3 text-[#61716b]">{copy.nowSub}</p></div>
            <Link href={`/${profile.code}/search`} className="text-sm font-black text-[#0f766e] hover:underline">{ui.searchButton} →</Link>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {priorityIncidents.map((incident, index) => (
              <Link key={incident} href={`/${profile.code}/search?incident=${incident}`} className="group min-h-40 rounded-[1.5rem] border border-[#173c32]/10 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:bg-[#10221d] hover:text-white">
                <span className="text-2xl">{incidentIcons[incident]}</span>
                <span className="mt-10 block text-sm font-black leading-snug">{travelerIncident(profile, incident)}</span>
                <span className="mt-2 block text-[10px] font-bold text-[#9aaba4] group-hover:text-[#c8f169]">0{index + 1} · OPEN →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-black tracking-[.16em] text-[#0f766e]">DESTINATIONS</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-.045em] md:text-5xl">{copy.browse}</h2>
              <p className="mt-4 max-w-md leading-7 text-[#61716b]">{copy.browseSub}</p>
            </div>
            <div className="divide-y divide-[#173c32]/10 border-y border-[#173c32]/10">
              {destinations.map((country, index) => (
                <Link key={country.slug} href={`/${profile.code}/${country.slug}`} className="group grid grid-cols-[3rem_1fr_auto] items-center gap-3 py-6">
                  <span className="text-xs font-black text-[#9aaba4]">0{index + 1}</span>
                  <span><strong className="block text-xl font-black tracking-tight group-hover:text-[#0f766e]">{travelerName(profile, country.slug, country.name.en)}</strong><small className="mt-1 block text-[#788983]">{country.cities.map((c) => travelerName(profile, c.slug, c.name.en)).join(" · ")}</small></span>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-[#173c32]/15 transition group-hover:bg-[#c8f169]">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-24">
          <p className="text-xs font-black tracking-[.16em] text-[#0f766e]">TRENDING SOLUTIONS</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-.045em] md:text-5xl">{copy.popular}</h2>
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{popularGuides.map((guide, i) => <GuideCard key={`${guide.country}-${guide.city}-${guide.incident}`} guide={guide} profile={profile} index={i} />)}</div>
        </section>

        <section className="mt-24 overflow-hidden rounded-[2rem] bg-[#c8f169] p-6 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><p className="text-xs font-black tracking-[.16em] text-[#0f5e57]">{copy.claim}</p><h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-.05em] text-[#10221d] md:text-5xl">{copy.claimTitle}</h2><p className="mt-4 max-w-2xl leading-7 text-[#38554c]">{copy.claimBody}</p></div>
            <Link href={`/${profile.code}/claims`} className="inline-flex items-center justify-center rounded-2xl bg-[#10221d] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-1">{copy.claimCta} →</Link>
          </div>
        </section>

        <section className="mt-24">
          <p className="text-xs font-black tracking-[.16em] text-[#0f766e]">EDITORIAL STANDARD</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-.045em] md:text-5xl">{copy.trust}</h2>
          <div className="mt-8 rounded-[2rem] bg-white p-4 shadow-sm md:p-8"><HomeQualitySection profile={profile} countries={destinations} incidents={incidentTypes} /></div>
        </section>
      </div>
      <EmergencyFab locale={isKo ? "ko" : "en"} phone={profile.consularHotline} label={ui.emergency} />
    </>
  );
}
