"use client";

import { useEffect } from "react";
import { getHtmlLang } from "@/lib/i18n";
import type { Locale } from "@/lib/site-config";

interface LocaleHtmlLangProps {
  locale: Locale;
}

/** document.documentElement.lang 동적 설정 */
export function LocaleHtmlLang({ locale }: LocaleHtmlLangProps) {
  useEffect(() => {
    document.documentElement.lang = getHtmlLang(locale);
  }, [locale]);

  return null;
}
