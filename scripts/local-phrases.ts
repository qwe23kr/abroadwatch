/** 현지어 멘트 — ko/en 발음·뜻 포함 */

import type { IncidentType, Locale } from "../src/lib/site-config";

export interface LocalPhraseEntry {
  language: { ko: string; en: string };
  phrase: string;
  reading: { ko: string; en: string };
}

/** country → incident → 멘트 */
export const LOCAL_PHRASES: Partial<
  Record<string, Partial<Record<IncidentType, LocalPhraseEntry>>>
> = {
  japan: {
    "lost-passport": {
      language: { ko: "일본어", en: "Japanese" },
      phrase: "パスポートをなくしました。遺失届を出したいです。",
      reading: {
        ko: "파스포토 오 나쿠시마시타 (여권을 잃어버렸습니다). 이시츠토도케 오 다시타이 데스 (분실신고를 내고 싶습니다).",
        en: "Pa-su-po-o-to o na-ku-shi-ma-shi-ta (I lost my passport). I-shi-tsu-to-do-ke o da-shi-ta-i de-su (I would like to file a loss report).",
      },
    },
  },
  thailand: {
    "lost-phone": {
      language: { ko: "태국어", en: "Thai" },
      phrase: "ต้องการใบแจ้งความเพื่อใช้กับประกันการเดินทาง",
      reading: {
        ko: "통 간 바이 장 간 프어 챠이 캅 쁘라칸 간 덴 탕 (여행자 보험 청구용 경찰 신고서가 필요합니다).",
        en: "Tong gaan bai jaang gaan phuea chai kap bprakan gaan doen taang (I need a police report for travel insurance).",
      },
    },
    "lost-wallet": {
      language: { ko: "태국어", en: "Thai" },
      phrase: "ต้องการใบแจ้งความเพื่อใช้กับประกันการเดินทาง",
      reading: {
        ko: "통 간 바이 장 간 프어 챠이 캅 쁘라칸 간 덴 탕 (여행자 보험 청구용 경찰 신고서가 필요합니다).",
        en: "Tong gaan bai jaang gaan phuea chai kap bprakan gaan doen taang (I need a police report for travel insurance).",
      },
    },
    "police-report": {
      language: { ko: "태국어", en: "Thai" },
      phrase: "ต้องการใบแจ้งความเพื่อใช้กับประกันการเดินทาง",
      reading: {
        ko: "통 간 바이 장 간 프어 챠이 캅 쁘라칸 간 덴 탕 (여행자 보험 청구용 경찰 신고서가 필요합니다).",
        en: "Tong gaan bai jaang gaan phuea chai kap bprakan gaan doen taang (I need a police report for travel insurance).",
      },
    },
  },
  taiwan: {
    "lost-passport": {
      language: { ko: "중국어(대만)", en: "Mandarin (Taiwan)" },
      phrase: "我的護照丟了，需要報案證明。",
      reading: {
        ko: "워더 후자오 diū le, xūyào bàoàn zhèngmíng (여권을 잃어버렸습니다. 신고 증명서가 필요합니다).",
        en: "Wǒ de hùzhào diū le, xūyào bàoàn zhèngmíng (I lost my passport. I need a police report certificate).",
      },
    },
    "police-report": {
      language: { ko: "중국어(대만)", en: "Mandarin (Taiwan)" },
      phrase: "我需要報案證明給保險公司。",
      reading: {
        ko: "Wǒ xūyào bàoàn zhèngmíng gěi bǎoxiǎn gōngsī (보험회사 제출용 신고 증명서가 필요합니다).",
        en: "Wǒ xūyào bàoàn zhèngmíng gěi bǎoxiǎn gōngsī (I need a police report certificate for my insurance company).",
      },
    },
    "lost-phone": {
      language: { ko: "중국어(대만)", en: "Mandarin (Taiwan)" },
      phrase: "我需要報案證明給保險公司。",
      reading: {
        ko: "Wǒ xūyào bàoàn zhèngmíng gěi bǎoxiǎn gōngsī (보험회사 제출용 신고 증명서가 필요합니다).",
        en: "Wǒ xūyào bàoàn zhèngmíng gěi bǎoxiǎn gōngsī (I need a police report certificate for my insurance company).",
      },
    },
    "lost-wallet": {
      language: { ko: "중국어(대만)", en: "Mandarin (Taiwan)" },
      phrase: "我需要報案證明給保險公司。",
      reading: {
        ko: "Wǒ xūyào bàoàn zhèngmíng gěi bǎoxiǎn gōngsī (보험회사 제출용 신고 증명서가 필요합니다).",
        en: "Wǒ xūyào bàoàn zhèngmíng gěi bǎoxiǎn gōngsī (I need a police report certificate for my insurance company).",
      },
    },
  },
};

function esc(str: string): string {
  return str.replace(/"/g, '\\"');
}

/** MDX LocalPhrase 블록 생성 */
export function renderLocalPhrase(
  locale: Locale,
  language: string,
  phrase: string,
  reading?: string,
): string {
  const readingAttr = reading ? ` reading="${esc(reading)}"` : "";
  return `<LocalPhrase locale="${locale}" language="${language}"${readingAttr}>
${phrase}
</LocalPhrase>`;
}

/** 국가·사건에 맞는 현지어 블록 (없으면 undefined) */
export function localPhraseBlock(
  locale: Locale,
  country: string,
  incident: IncidentType,
): string | undefined {
  const entry = LOCAL_PHRASES[country]?.[incident];
  if (!entry) return undefined;
  return renderLocalPhrase(
    locale,
    entry.language[locale],
    entry.phrase,
    entry.reading[locale],
  );
}
