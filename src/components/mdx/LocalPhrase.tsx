type LocalPhraseLocale = "ko" | "zh-Hans" | "ja" | "zh-Hant" | "th" | "vi" | "en";

interface LocalPhraseProps {
  locale?: LocalPhraseLocale;
  uiLanguage?: LocalPhraseLocale;
  language: string;
  /** 발음 가이드 + 뜻 */
  reading?: string;
  children: React.ReactNode;
}

const UI: Record<
  LocalPhraseLocale,
  {
    title: (language: string) => string;
    readingLabel: string;
    hintWithReading: string;
    hint: string;
  }
> = {
  ko: {
    title: (language) => `🗣 현지에서 말할 때 (${language})`,
    readingLabel: "읽는 법 (한글 발음)",
    hintWithReading:
      "번역 앱 화면을 보여주거나, 위 한글 발음대로 천천히 읽어도 됩니다.",
    hint: "번역 앱 화면을 보여주거나, 아래 문장을 그대로 읽어도 됩니다.",
  },
  en: {
    title: (language) => `🗣 What to say (${language})`,
    readingLabel: "How to pronounce (romanized)",
    hintWithReading:
      "Show a translation app, or read slowly using the romanization above.",
    hint: "Show a translation app, or read the phrase above as written.",
  },
  "zh-Hans": {
    title: (language) => `🗣 当地沟通用语（${language}）`,
    readingLabel: "发音参考",
    hintWithReading: "可出示翻译软件，或按上方发音缓慢朗读。",
    hint: "可出示翻译软件，或直接展示上方句子。",
  },
  ja: {
    title: (language) => `🗣 現地で伝える表現（${language}）`,
    readingLabel: "発音の目安",
    hintWithReading: "翻訳アプリを見せるか、上の発音をゆっくり読んでください。",
    hint: "翻訳アプリまたは上の文をそのまま見せてください。",
  },
  "zh-Hant": {
    title: (language) => `🗣 當地溝通用語（${language}）`,
    readingLabel: "發音參考",
    hintWithReading: "可出示翻譯軟體，或依上方發音慢慢朗讀。",
    hint: "可出示翻譯軟體，或直接展示上方句子。",
  },
  th: {
    title: (language) => `🗣 ประโยคสำหรับสื่อสารในพื้นที่ (${language})`,
    readingLabel: "คำอ่าน",
    hintWithReading: "แสดงแอปแปลภาษา หรืออ่านช้า ๆ ตามคำอ่านด้านบน",
    hint: "แสดงแอปแปลภาษา หรือแสดงประโยคด้านบน",
  },
  vi: {
    title: (language) => `🗣 Câu dùng tại địa phương (${language})`,
    readingLabel: "Cách phát âm",
    hintWithReading: "Đưa ứng dụng dịch hoặc đọc chậm theo phần phát âm ở trên.",
    hint: "Đưa ứng dụng dịch hoặc cho xem nguyên câu ở trên.",
  },
};

/** 현지어 멘트 — 본문과 분리, 발음 가이드 포함 */
export function LocalPhrase({
  locale = "ko",
  uiLanguage,
  language,
  reading,
  children,
}: LocalPhraseProps) {
  const t = UI[uiLanguage ?? locale];

  return (
    <div className="my-4 rounded-lg border border-dashed border-gray-400 bg-gray-50 p-4">
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">
        {t.title(language)}
      </p>
      <div className="text-base font-medium leading-relaxed text-gray-800 [&>p]:mb-0">
        {children}
      </div>
      {reading ? (
        <div className="mt-3 rounded-md bg-white px-3 py-2.5 ring-1 ring-gray-200">
          <p className="mb-1 text-xs font-semibold text-gray-600">
            {t.readingLabel}
          </p>
          <p className="text-sm leading-relaxed text-gray-800">{reading}</p>
        </div>
      ) : null}
      <p className="mt-2 text-xs text-gray-500">
        {reading ? t.hintWithReading : t.hint}
      </p>
    </div>
  );
}
