"use client";

import { useEffect } from "react";
import { getHtmlLang } from "@/lib/i18n";
import type { Locale } from "@/lib/site-config";

interface LocaleHtmlLangProps {
  locale: Locale;
  htmlLang?: string;
}

/** document.documentElement.lang 동적 설정 */
export function LocaleHtmlLang({ locale, htmlLang }: LocaleHtmlLangProps) {
  useEffect(() => {
    document.documentElement.lang = htmlLang ?? getHtmlLang(locale);
  }, [htmlLang, locale]);

  return null;
}
