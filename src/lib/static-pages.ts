import type { Locale } from "@/lib/site-config";

interface StaticPageContent {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  content: Record<Locale, string>;
}

export const staticPages: Record<string, StaticPageContent> = {
  about: {
    title: { ko: "AbroadWatch 소개", en: "About AbroadWatch" },
    description: {
      ko: "AbroadWatch는 해외 여행 중 긴급 상황에서 필요한 연락처와 절차를 정리하는 여행 안전 가이드입니다.",
      en: "AbroadWatch is a travel emergency guide that helps international travelers act quickly when something goes wrong abroad.",
    },
    content: {
      ko: `
AbroadWatch는 해외에서 여권 분실, 휴대폰 도난, 지갑 분실, 병원 이용, 경찰 신고, 여행 사기 같은 상황을 만났을 때 바로 실행할 수 있는 절차를 정리합니다.

## 제공하는 정보

- 국가와 도시별 긴급 대응 순서
- 대사관, 총영사관, 현지 경찰, 병원 연락처
- 필요 서류, 예상 소요시간, 비용 안내
- 현장에서 보여줄 수 있는 현지어 문장
- 공식 안내와 여행자 사례에서 반복되는 주의점

## 운영 원칙

AbroadWatch는 검색 결과를 단순 복사하지 않습니다. 공식기관 자료를 우선 확인하고, 여행자가 현장에서 자주 막히는 지점을 실행 순서로 정리합니다.

## 중요 안내

운영시간, 수수료, 필요 서류는 현지 사정에 따라 바뀔 수 있습니다. 이동 전에는 반드시 해당 기관의 공식 페이지와 전화로 다시 확인하세요.
      `.trim(),
      en: `
AbroadWatch organizes practical guidance for lost passports, stolen phones, lost wallets, hospital visits, police reports, and travel scams abroad.

## What We Provide

- Step-by-step emergency actions by country and city
- Embassy, consulate, police, and hospital contacts
- Required documents, expected timing, and cost notes
- Local-language phrases travelers can show on site
- Official guidance plus repeated patterns from traveler reports

## Operating Principle

AbroadWatch does not publish copied search results. We prioritize official sources and organize repeated traveler pain points so people can act faster in the field.

## Important Notice

Hours, fees, and document requirements can change. Always reconfirm with the official page and by phone before travelling across town.
      `.trim(),
    },
  },
  editorial: {
    title: { ko: "편집 원칙", en: "Editorial Policy" },
    description: {
      ko: "AbroadWatch가 자료를 조사, 검토, 수정하는 기준입니다.",
      en: "How AbroadWatch researches, reviews, and corrects its guides.",
    },
    content: {
      ko: `
최종 업데이트: 2026년 6월 18일

## 작성 기준

AbroadWatch는 여행자가 긴급 상황에서 바로 행동할 수 있도록 절차, 연락처, 준비물, 예상 소요시간을 직접 정리합니다. 단순 번역이나 검색 결과 복사를 원문처럼 게시하지 않습니다.

## 출처 우선순위

대한민국 외교부, 재외공관, 현지 정부, 경찰, 응급기관, 병원 공식 안내를 우선 확인합니다. 각 가이드에는 확인 가능한 출처와 최종 업데이트 날짜를 표시합니다.

## 검토 기준

- 국가별 긴급번호와 통화가 다른 국가 정보와 섞이지 않는지 확인
- 한국어와 영어의 장소명, 기관명, 연락처 비교
- 운영시간, 비용, 전화번호처럼 바뀔 수 있는 정보에는 재확인 안내 표시
- 의료, 법률, 영사 업무를 전문 조언처럼 단정하지 않음

## 광고와 편집 독립성

광고는 콘텐츠의 결론, 기관 선정, 안내 순서에 영향을 주지 않습니다. 광고가 승인되어 표시되더라도 편집 콘텐츠와 명확히 구분합니다.

## 오류 수정

오류를 발견하면 페이지 URL과 근거를 contact@abroadwatch.com으로 보내주세요. 공식 자료와 대조한 뒤 확인된 오류를 수정하고 업데이트 날짜를 변경합니다.
      `.trim(),
      en: `
Last updated: June 18, 2026

## Writing Standards

AbroadWatch independently organizes procedures, contacts, documents, and expected timelines so travelers can act quickly. We do not publish copied search results or simple translations as original reporting.

## Source Priority

We prioritize Korea's Ministry of Foreign Affairs and overseas missions, local government, police and emergency authorities, and official hospital information. Guides display traceable sources and last-updated dates.

## Review Standards

- Emergency numbers and currencies are checked by country
- Korean and English location and authority details are compared
- Changeable details such as hours, fees, and phone numbers include reconfirmation reminders
- Medical, legal, and consular information is not presented as professional advice

## Advertising Independence

Advertising does not influence conclusions, institution selection, or the order of guidance. Ads are separated from editorial content after approval.

## Corrections

Send the page URL and supporting source to contact@abroadwatch.com. We compare reports against official information, correct confirmed errors, and update the review date.
      `.trim(),
    },
  },
  contact: {
    title: { ko: "문의하기", en: "Contact Us" },
    description: {
      ko: "AbroadWatch 문의 및 오류 제보 안내입니다.",
      en: "Contact AbroadWatch or report outdated guide information.",
    },
    content: {
      ko: `
AbroadWatch에 관심을 가져주셔서 감사합니다.

## 일반 문의

이메일: contact@abroadwatch.com

## 콘텐츠 수정 요청

가이드의 연락처, 운영시간, 비용, 절차가 오래되었거나 잘못된 경우 페이지 URL과 확인 근거를 함께 보내주세요. 공식 자료와 대조해 확인된 내용은 수정합니다.

## 답변 시간

영업일 기준 2~3일 안에 답변하는 것을 목표로 합니다.
      `.trim(),
      en: `
Thank you for your interest in AbroadWatch.

## General Inquiries

Email: contact@abroadwatch.com

## Content Correction Requests

If guide contacts, hours, fees, or procedures are outdated or incorrect, email us with the page URL and supporting source. Confirmed corrections are reviewed against official information.

## Response Time

We aim to respond within 2-3 business days.
      `.trim(),
    },
  },
  privacy: {
    title: { ko: "개인정보처리방침", en: "Privacy Policy" },
    description: {
      ko: "AbroadWatch 개인정보처리방침입니다.",
      en: "AbroadWatch Privacy Policy.",
    },
    content: {
      ko: `
최종 업데이트: 2026년 6월 18일

## 수집하는 정보

AbroadWatch는 현재 사용자 계정을 운영하지 않으며 이름, 주소, 여권번호 같은 민감한 개인정보를 직접 입력받지 않습니다.

## 자동 수집 정보

서비스 개선을 위해 Google Analytics가 다음 정보를 자동 수집할 수 있습니다.

- 익명화된 IP 주소
- 브라우저와 기기 정보
- 방문 페이지
- 방문 시간

## 쿠키

Google Analytics는 방문 통계를 위해 쿠키를 사용할 수 있습니다. 브라우저 설정에서 쿠키 저장을 제한할 수 있습니다.

## 제3자 서비스

Google을 포함한 제3자 서비스 제공자는 방문 기록을 기반으로 광고 또는 분석 서비스를 제공할 수 있습니다. 관련 법령이 요구하는 지역에서는 필요한 동의 절차를 적용합니다.

## 문의

개인정보 관련 문의: contact@abroadwatch.com
      `.trim(),
      en: `
Last updated: June 18, 2026

## Information We Collect

AbroadWatch does not currently operate user accounts and does not directly collect sensitive personal information such as names, addresses, or passport numbers.

## Automatically Collected Information

Google Analytics may collect information for service improvement:

- Anonymized IP address
- Browser and device information
- Pages visited
- Visit timestamps

## Cookies

Google Analytics may use cookies for traffic measurement. You can restrict cookie storage in your browser settings.

## Third-party Services

Third-party vendors, including Google, may use cookies to serve ads or analytics based on prior visits. Where required by law, we apply the required consent process.

## Contact

Privacy inquiries: contact@abroadwatch.com
      `.trim(),
    },
  },
  terms: {
    title: { ko: "이용약관", en: "Terms of Service" },
    description: {
      ko: "AbroadWatch 이용약관입니다.",
      en: "AbroadWatch Terms of Service.",
    },
    content: {
      ko: `
최종 업데이트: 2026년 6월 18일

## 서비스 목적

AbroadWatch는 해외 여행 중 긴급 상황에 대한 참고 정보를 제공합니다. 제공 정보는 법률, 의료, 영사 업무에 대한 전문 조언을 대체하지 않습니다.

## 이용자의 책임

사용자는 현지 기관, 공관, 보험사, 항공사 또는 해당 기관의 최신 정보를 직접 확인해야 합니다.

## 정보의 정확성

정확한 정보를 제공하기 위해 노력하지만 현지 절차, 연락처, 비용은 예고 없이 바뀔 수 있습니다.

## 지식재산권

AbroadWatch의 콘텐츠와 디자인은 저작권 보호를 받습니다. 무단 복제, 재배포, 자동 수집을 금지합니다.

## 약관 변경

약관은 사전 고지 없이 변경될 수 있습니다.
      `.trim(),
      en: `
Last updated: June 18, 2026

## Service Purpose

AbroadWatch provides reference information for travel emergencies abroad. Information provided does not replace professional legal, medical, or consular advice.

## User Responsibility

Users should reconfirm current information directly with local authorities, missions, insurers, airlines, or other responsible organizations.

## Accuracy

We strive for accuracy, but local procedures, contacts, and costs may change without notice.

## Intellectual Property

AbroadWatch content and design are protected by copyright. Unauthorized copying, redistribution, or automated scraping is prohibited.

## Changes to Terms

Terms may be changed without prior notice.
      `.trim(),
    },
  },
  disclaimer: {
    title: { ko: "면책조항", en: "Disclaimer" },
    description: {
      ko: "AbroadWatch 정보 이용에 관한 면책조항입니다.",
      en: "AbroadWatch Disclaimer.",
    },
    content: {
      ko: `
## 정보의 성격

AbroadWatch의 모든 정보는 일반적인 참고 목적으로 제공됩니다. 법률, 의료, 보험, 영사 업무에 관한 전문 조언이 아닙니다.

## 정확성

정보는 작성 시점의 공식 출처와 공개 자료를 기반으로 정리합니다. 현지 절차, 연락처, 운영시간, 비용은 예고 없이 변경될 수 있습니다.

## 긴급 상황

생명이나 신체에 위험이 있는 경우에는 이 사이트를 읽기보다 현지 긴급번호, 경찰, 병원, 공관에 먼저 연락하세요.

## 책임 제한

AbroadWatch와 운영자는 사이트 정보 사용으로 발생한 직접 또는 간접 손해에 대해 책임을 지지 않습니다.
      `.trim(),
      en: `
## Nature of Information

All information on AbroadWatch is provided for general reference only. It is not professional legal, medical, insurance, or consular advice.

## Accuracy

Information is based on official sources and public materials available at the time of writing. Local procedures, contacts, hours, and costs may change without notice.

## Emergencies

In life-threatening or serious emergencies, contact local emergency numbers, police, hospitals, or the responsible mission before relying on this site.

## Limitation of Liability

AbroadWatch and its operators are not liable for any direct or indirect damages resulting from use of this site's information.
      `.trim(),
    },
  },
};

export const staticPageSlugs = Object.keys(staticPages);
