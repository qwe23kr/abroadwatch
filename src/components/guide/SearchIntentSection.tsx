import type { Locale, IncidentType } from "@/lib/site-config";

interface SearchIntentSectionProps {
  locale: Locale;
  cityName: string;
  countryName: string;
  incident: IncidentType;
  incidentLabel: string;
}

const koQuestions: Record<IncidentType, (city: string) => string> = {
  "lost-passport": (city) => `${city}에서 여권 잃어버리면 당일 귀국 가능?`,
  "lost-phone": (city) => `${city}에서 휴대폰 잃어버리면 먼저 무엇부터 해야 하나요?`,
  "lost-wallet": (city) => `${city}에서 지갑 잃어버리면 카드 정지와 경찰 신고 중 무엇이 먼저인가요?`,
  hospital: (city) => `${city}에서 갑자기 아프면 어느 병원이나 응급번호를 이용해야 하나요?`,
  "police-report": (city) => `${city}에서 경찰 신고가 필요하면 어디서 어떤 서류를 받아야 하나요?`,
  scam: (city) => `${city} 여행 사기를 당했을 때 환불이나 신고는 어떻게 하나요?`,
};

const enQuestions: Record<IncidentType, (city: string) => string> = {
  "lost-passport": (city) => `Can you fly home the same day after losing a passport in ${city}?`,
  "lost-phone": (city) => `What should you do first after losing a phone in ${city}?`,
  "lost-wallet": (city) => `Should you freeze cards or file a police report first in ${city}?`,
  hospital: (city) => `Which hospital or emergency number should you use in ${city}?`,
  "police-report": (city) => `Where do travelers get a police report in ${city}?`,
  scam: (city) => `How do you report or dispute a travel scam in ${city}?`,
};

export function SearchIntentSection({
  locale,
  cityName,
  countryName,
  incident,
  incidentLabel,
}: SearchIntentSectionProps) {
  const question =
    locale === "ko" ? koQuestions[incident](cityName) : enQuestions[incident](cityName);
  const answer =
    locale === "ko"
      ? `${countryName} ${cityName}에서 ${incidentLabel} 상황이 생기면, 현장 확인과 증거 확보를 먼저 하고 담당 기관 방문 전에 전화로 접수 가능 시간과 필요 서류를 다시 확인하는 것이 안전합니다. 아래 절차는 검색자가 가장 자주 막히는 순서대로 정리했습니다.`
      : `For ${incidentLabel.toLowerCase()} in ${cityName}, ${countryName}, confirm the situation on site, preserve evidence, and call the responsible office before travelling across town. The steps below are ordered around the points travelers most often get stuck on.`;

  return (
    <section className="my-8 rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
      <h2 className="text-xl font-bold leading-snug text-gray-950 md:text-2xl">
        {question}
      </h2>
      <p className="mt-3 text-sm leading-6 text-gray-700">{answer}</p>
    </section>
  );
}
