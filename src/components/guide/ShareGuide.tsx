"use client";

import { useState } from "react";
import type { Locale } from "@/lib/site-config";

interface ShareGuideProps {
  locale: Locale;
  title: string;
}

export function ShareGuide({ locale, title }: ShareGuideProps) {
  const [copied, setCopied] = useState(false);
  const shareLabel = locale === "ko" ? "가이드 공유" : "Share guide";
  const copyLabel = copied
    ? locale === "ko" ? "링크 복사됨" : "Link copied"
    : locale === "ko" ? "링크 복사" : "Copy link";

  async function share() {
    const data = { title, url: window.location.href };
    if (navigator.share) {
      await navigator.share(data).catch(() => undefined);
      return;
    }
    await copy();
  }

  async function copy() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-5 flex flex-wrap gap-2" aria-label={shareLabel}>
      <button
        type="button"
        onClick={share}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        {shareLabel}
      </button>
      <button
        type="button"
        onClick={copy}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
      >
        {copyLabel}
      </button>
    </div>
  );
}
