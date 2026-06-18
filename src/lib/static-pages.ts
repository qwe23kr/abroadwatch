import type { Locale } from "@/lib/site-config";

interface StaticPageContent {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  content: Record<Locale, string>;
}

/** 정적 페이지 콘텐츠 정의 */
export const staticPages: Record<string, StaticPageContent> = {
  about: {
    title: {
      ko: "AbroadWatch 소개",
      en: "About AbroadWatch",
    },
    description: {
      ko: "AbroadWatch는 해외 여행자를 위한 비상 대처 가이드 플랫폼입니다.",
      en: "AbroadWatch is an emergency response guide platform for international travelers.",
    },
    content: {
      ko: `
AbroadWatch는 해외 여행 중 발생할 수 있는 비상 상황에 대한 실용적이고 신뢰할 수 있는 정보를 제공합니다.

## 우리의 미션

여권 분실, 휴대폰 도난, 지갑 분실, 병원 이용, 경찰 신고 등 해외에서 겪을 수 있는 다양한 비상 상황에 대해 명확하고 실행 가능한 가이드를 제공합니다.

## 제공 정보

- 단계별 대처 절차
- 대사관 및 영사관 연락처
- 경찰서 및 병원 정보
- 예상 비용 및 처리 시간
- 필요 서류 안내

## 정보의 정확성

모든 가이드는 공식 출처를 기반으로 작성되며 정기적으로 검토됩니다. 그러나 현지 상황에 따라 절차가 변경될 수 있으므로, 중요한 결정 전에는 반드시 해당 기관에 직접 확인하시기 바랍니다.
      `.trim(),
      en: `
AbroadWatch provides practical and trustworthy information for emergency situations that may occur during international travel.

## Our Mission

We offer clear, actionable guides for various emergencies abroad including lost passports, stolen phones, lost wallets, hospital visits, and police reports.

## What We Provide

- Step-by-step response procedures
- Embassy and consulate contact information
- Police station and hospital details
- Estimated costs and processing times
- Required document guidance

## Information Accuracy

All guides are written based on official sources and reviewed regularly. However, local procedures may change, so always verify with the relevant authorities before making important decisions.
      `.trim(),
    },
  },
  editorial: {
    title: { ko: "편집 원칙", en: "Editorial Policy" },
    description: {
      ko: "AbroadWatch의 자료 조사, 검수 및 수정 원칙입니다.",
      en: "How AbroadWatch researches, reviews, and corrects its guides.",
    },
    content: {
      ko: `
최종 업데이트: 2026년 6월 18일

## 작성 기준

AbroadWatch는 여행자가 긴급 상황에서 바로 실행할 수 있도록 절차, 연락처, 준비물과 예상 소요시간을 직접 정리합니다. 단순 번역이나 검색 결과 복사를 게시하지 않습니다.

## 출처 우선순위

대한민국 외교부와 재외공관, 현지 정부·경찰·응급기관, 병원 공식 안내를 우선 확인합니다. 각 가이드에는 확인 가능한 출처 링크와 최종 업데이트 날짜를 표시합니다.

## 검수 원칙

- 국가별 긴급번호와 통화가 다른 국가 정보와 섞이지 않는지 자동 검사
- 한국어와 영어 페이지의 지역·기관 정보 대조
- 전화번호, 운영시간, 비용처럼 변경 가능한 정보는 방문 전 공식 기관 재확인 안내
- 의료·법률·영사 업무를 전문 조언처럼 단정하지 않음

## 광고와 편집 독립성

광고는 콘텐츠의 결론, 기관 선정 또는 안내 순서에 영향을 주지 않습니다. 광고는 승인 이후 콘텐츠와 명확히 구분해 표시합니다.

## 오류 수정

오류를 발견하면 페이지 URL과 근거를 contact@abroadwatch.com으로 보내주세요. 접수된 내용은 공식 자료와 대조한 뒤 수정하고 업데이트 날짜를 변경합니다.
      `.trim(),
      en: `
Last updated: June 18, 2026

## Writing Standards

AbroadWatch independently organizes procedures, contacts, documents, and expected timelines so travelers can act quickly. We do not publish copied search results or simple translations as original reporting.

## Source Priority

We prioritize Korea's Ministry of Foreign Affairs and overseas missions, local government, police and emergency authorities, and official hospital information. Guides display a traceable source and last-updated date.

## Review Standards

- Automated checks prevent currencies and emergency numbers from leaking across countries
- Korean and English location and authority details are compared
- Changeable details such as hours, fees, and phone numbers include a reminder to reconfirm
- Medical, legal, and consular information is not presented as professional advice

## Advertising Independence

Advertising does not influence conclusions, institution selection, or the order of guidance. Ads will be clearly separated from editorial content after approval.

## Corrections

Send the page URL and supporting source to contact@abroadwatch.com. We compare reports against official information, correct confirmed errors, and update the review date.
      `.trim(),
    },
  },
  contact: {
    title: { ko: "문의하기", en: "Contact Us" },
    description: {
      ko: "AbroadWatch에 문의하세요.",
      en: "Get in touch with AbroadWatch.",
    },
    content: {
      ko: `
AbroadWatch에 관심을 가져주셔서 감사합니다.

## 일반 문의

이메일: contact@abroadwatch.com

## 콘텐츠 수정 요청

가이드 정보가 outdated되었거나 오류가 있는 경우, 해당 페이지 URL과 함께 위 이메일로 알려주시면 신속히 검토하겠습니다.

## 응답 시간

영업일 기준 2-3일 이내에 답변드립니다.
      `.trim(),
      en: `
Thank you for your interest in AbroadWatch.

## General Inquiries

Email: contact@abroadwatch.com

## Content Correction Requests

If you find outdated or incorrect information in our guides, please email us with the page URL and we will review it promptly.

## Response Time

We aim to respond within 2-3 business days.
      `.trim(),
    },
  },
  privacy: {
    title: { ko: "개인정보처리방침", en: "Privacy Policy" },
    description: {
      ko: "AbroadWatch 개인정보처리방침",
      en: "AbroadWatch Privacy Policy",
    },
    content: {
      ko: `
최종 업데이트: 2026년 6월 18일

## 수집하는 정보

AbroadWatch는 MVP 단계에서 사용자 계정을 운영하지 않으며, 개인정보를 직접 수집하지 않습니다.

## 자동 수집 정보

Google Analytics를 통해 다음 정보가 자동 수집될 수 있습니다:
- IP 주소 (익명화)
- 브라우저 유형
- 방문 페이지
- 방문 시간

## 쿠키

Google Analytics 및 Google AdSense(승인 후)가 쿠키를 사용할 수 있습니다.

## 광고 및 제3자 제공업체

Google을 포함한 제3자 광고 제공업체는 이전 방문 기록을 바탕으로 광고를 제공하기 위해 쿠키를 사용할 수 있습니다. 맞춤 광고 설정은 Google 광고 설정에서 관리할 수 있습니다. 관련 법률이 요구되는 지역에는 Google이 요구하는 동의 관리 절차를 적용합니다.

## 문의

개인정보 관련 문의: contact@abroadwatch.com
      `.trim(),
      en: `
Last updated: June 18, 2026

## Information We Collect

AbroadWatch does not operate user accounts during the MVP phase and does not directly collect personal information.

## Automatically Collected Information

Google Analytics may automatically collect:
- IP address (anonymized)
- Browser type
- Pages visited
- Visit timestamps

## Cookies

Google Analytics and Google AdSense (after approval) may use cookies.

## Advertising and Third-party Vendors

Third-party vendors, including Google, may use cookies to serve ads based on prior visits. Personalized advertising can be managed through Google Ads Settings. Where required by law, we use Google's required consent-management process.

## Contact

Privacy inquiries: contact@abroadwatch.com
      `.trim(),
    },
  },
  terms: {
    title: { ko: "이용약관", en: "Terms of Service" },
    description: {
      ko: "AbroadWatch 이용약관",
      en: "AbroadWatch Terms of Service",
    },
    content: {
      ko: `
최종 업데이트: 2026년 6월 18일

## 서비스 이용

AbroadWatch는 정보 제공 목적으로 운영됩니다. 제공된 정보는 참고용이며 법적 조언을 대체하지 않습니다.

## 면책

정보의 정확성을 위해 노력하나, 정보 오류로 인한 손해에 대해 책임지지 않습니다.

## 지적재산권

AbroadWatch의 모든 콘텐츠는 저작권법의 보호를 받습니다.

## 약관 변경

약관은 사전 공지 없이 변경될 수 있습니다.
      `.trim(),
      en: `
Last updated: June 18, 2026

## Service Use

AbroadWatch is operated for informational purposes. Information provided is for reference only and does not replace legal advice.

## Disclaimer

We strive for accuracy but are not liable for damages resulting from information errors.

## Intellectual Property

All AbroadWatch content is protected by copyright law.

## Changes to Terms

Terms may be changed without prior notice.
      `.trim(),
    },
  },
  disclaimer: {
    title: { ko: "면책조항", en: "Disclaimer" },
    description: {
      ko: "AbroadWatch 면책조항",
      en: "AbroadWatch Disclaimer",
    },
    content: {
      ko: `
## 정보의 성격

AbroadWatch에 게시된 모든 정보는 일반적인 참고 목적으로 제공됩니다. 법률, 의료, 또는 영사 업무에 대한 전문적 조언이 아닙니다.

## 정확성

정보는 작성 시점의 공식 출처를 기반으로 하며, 현지 절차, 연락처, 비용은 예고 없이 변경될 수 있습니다.

## 긴급 상황

생명이 위험한 긴급 상황에서는 현지 긴급번호(119, 110, 112 등)에 먼저 연락하십시오.

## 책임 제한

AbroadWatch 및 운영자는 본 사이트 정보 사용으로 인해 발생하는 직접적, 간접적 손해에 대해 책임을 지지 않습니다.
      `.trim(),
      en: `
## Nature of Information

All information on AbroadWatch is provided for general reference purposes only. It is not professional legal, medical, or consular advice.

## Accuracy

Information is based on official sources at the time of writing. Local procedures, contacts, and costs may change without notice.

## Emergencies

In life-threatening emergencies, contact local emergency numbers (119, 110, 112, etc.) first.

## Limitation of Liability

AbroadWatch and its operators are not liable for any direct or indirect damages resulting from use of this site's information.
      `.trim(),
    },
  },
};

/** 정적 페이지 slug 목록 */
export const staticPageSlugs = Object.keys(staticPages);
