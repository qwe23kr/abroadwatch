import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocaleHtmlLang } from "@/components/layout/LocaleHtmlLang";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { GoogleAdSense } from "@/components/analytics/GoogleAdSense";
import { isValidLocale, siteConfig, type Locale } from "@/lib/site-config";
import { notFound } from "next/navigation";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/** 로케일별 레이아웃 — 헤더, 푸터, GA */
export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();
  const locale = localeParam as Locale;

  return (
    <>
      <LocaleHtmlLang locale={locale} />
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
      <GoogleAnalytics />
      <GoogleAdSense />
    </>
  );
}

/** 로케일별 정적 params 생성 */
export function generateStaticParams() {
  return siteConfig.locales.map((locale) => ({ locale }));
}
