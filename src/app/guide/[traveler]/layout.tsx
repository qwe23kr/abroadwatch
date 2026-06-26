import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocaleHtmlLang } from "@/components/layout/LocaleHtmlLang";
import { GoogleAdSense } from "@/components/analytics/GoogleAdSense";
import { EmrldTracker } from "@/components/analytics/EmrldTracker";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import { isProductionRuntime } from "@/lib/runtime";
import { getTravelerProfile, travelerProfiles } from "@/lib/traveler-profiles";
import type { Locale } from "@/lib/site-config";

export function generateStaticParams() {
  return travelerProfiles.map((profile) => ({ traveler: profile.code }));
}

export default async function TravelerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ traveler: string }>;
}) {
  const { traveler } = await params;
  const profile = getTravelerProfile(traveler);
  if (!profile) notFound();
  const locale: Locale = traveler === "kr" ? "ko" : "en";
  const enableThirdParty = isProductionRuntime();

  return (
    <>
      <LocaleHtmlLang locale={locale} htmlLang={profile.htmlLang} />
      <Header locale={locale} traveler={profile} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} traveler={profile} />
      {enableThirdParty && <GoogleAdSense />}
      {enableThirdParty && <EmrldTracker />}
      <ServiceWorkerRegister />
    </>
  );
}
