import type { IncidentType } from "@/lib/site-config";
import type { TravelerProfile } from "@/lib/traveler-profiles";

interface NationalityProofSectionProps {
  profile: TravelerProfile;
  countryName: string;
  cityName: string;
  incidentName: string;
  incident: IncidentType;
  emergencyNumber?: string;
}

const authorityLabelByTraveler: Record<TravelerProfile["code"], string> = {
  kr: "Korean consular guidance",
  cn: "Chinese consular guidance",
  us: "U.S. State Department guidance",
  jp: "Japanese consular guidance",
  tw: "Taiwan BOCA guidance",
  au: "Australian Passport Office guidance",
  gb: "UK emergency travel document guidance",
  ca: "Canadian travel assistance guidance",
  th: "Thai consular guidance",
  vn: "Vietnamese consular guidance",
};

const travelerSpecificAction: Record<
  TravelerProfile["code"],
  Record<IncidentType, string>
> = {
  kr: {
    "lost-passport":
      "Use the Korean consular hotline first, then confirm whether a Korean emergency passport or travel certificate is available at the responsible mission.",
    "lost-phone":
      "Keep Korean carrier, payment app, and identity-verification recovery in mind because account access is often needed after returning home.",
    "lost-wallet":
      "Check Korean card issuer emergency blocking and keep any police report for Korean insurer or card dispute requests.",
    hospital:
      "Confirm Korean-language assistance options and keep original receipts for Korean travel insurance reimbursement.",
    "police-report":
      "Ask whether the document is sufficient for Korean insurance, airline, or embassy follow-up before leaving the police desk.",
    scam:
      "Keep evidence for Korean card chargeback, travel insurance, and consular consultation if the dispute involves threats or detention.",
  },
  cn: {
    "lost-passport":
      "Confirm the Chinese mission's replacement travel document process before visiting, because appointment and identity checks can vary by post.",
    "lost-phone":
      "Preserve access to Chinese payment, SIM, and identity apps before wiping the device or changing accounts.",
    "lost-wallet":
      "Block Chinese payment cards and wallets first, then prepare police documentation for card issuer disputes.",
    hospital:
      "Ask the hospital for documents that can be used with Chinese insurers or follow-up care after return.",
    "police-report":
      "Make sure the police record includes enough identifying detail for Chinese consular or insurer follow-up.",
    scam:
      "Collect payment records and merchant details before contacting the card issuer or Chinese consular channel.",
  },
  us: {
    "lost-passport":
      "For U.S. citizens, the key difference is emergency passport replacement through the nearest U.S. embassy or consulate, not a local immigration office.",
    "lost-phone":
      "Prioritize locking the device, preserving Apple or Google account access, and saving records for U.S. insurer or card disputes.",
    "lost-wallet":
      "Freeze U.S. bank cards quickly and keep the local police record for bank, TSA, or insurer follow-up.",
    hospital:
      "Ask for itemized English medical records and receipts that U.S. travel insurers commonly request.",
    "police-report":
      "For U.S. travelers, the report is usually evidence for insurance or card disputes rather than a U.S. government replacement document.",
    scam:
      "Save merchant names, card slips, and messages for a U.S. card issuer dispute before the evidence disappears.",
  },
  jp: {
    "lost-passport":
      "Confirm the Japanese mission's passport or return travel document process before visiting, because required photos and identity proof can vary.",
    "lost-phone":
      "Preserve Japanese carrier and payment app recovery routes before changing SIM or wiping the device.",
    "lost-wallet":
      "Stop Japanese cards and keep local documents for issuer, insurer, and identity recovery after return.",
    hospital:
      "Keep original receipts and medical records for Japanese insurer claims and later domestic treatment.",
    "police-report":
      "Confirm whether the police document is usable for Japanese insurance or embassy follow-up.",
    scam:
      "Keep receipts and messages for Japanese card dispute or travel insurance consultation.",
  },
  tw: {
    "lost-passport":
      "Taiwan travelers should confirm BOCA or mission guidance for replacement travel documents before moving across town.",
    "lost-phone":
      "Protect Taiwanese SIM, payment, and account verification access before device reset.",
    "lost-wallet":
      "Block Taiwanese cards and keep police evidence for issuer and insurer follow-up.",
    hospital:
      "Ask for receipts and diagnosis records that Taiwanese insurers can review after return.",
    "police-report":
      "Check that the police record has enough detail for Taiwan-side card, insurance, or identity follow-up.",
    scam:
      "Save payment records and merchant details for Taiwan card issuer disputes.",
  },
  au: {
    "lost-passport":
      "Australian travelers should use Australian Passport Office guidance and the nearest Australian mission for emergency passport options.",
    "lost-phone":
      "Keep MyGov, bank, and phone account recovery in mind before wiping or replacing the device.",
    "lost-wallet":
      "Freeze Australian bank cards and keep the local record for insurer or bank disputes.",
    hospital:
      "Ask for itemized medical documents and receipts suitable for Australian travel insurance claims.",
    "police-report":
      "For Australian travelers, the report is mainly supporting evidence for insurers and banks.",
    scam:
      "Document the merchant, amount, and communication for an Australian card chargeback or insurer claim.",
  },
  gb: {
    "lost-passport":
      "UK travelers should check emergency travel document eligibility through GOV.UK and the nearest British mission.",
    "lost-phone":
      "Preserve access to UK bank, SIM, and identity accounts before changing devices.",
    "lost-wallet":
      "Freeze UK cards and keep local evidence for bank disputes or insurer claims.",
    hospital:
      "Request itemized records and receipts that UK travel insurers can review.",
    "police-report":
      "For UK travelers, the police record usually supports insurance, bank, or emergency document follow-up.",
    scam:
      "Collect receipts, names, and messages for UK card chargeback or insurer follow-up.",
  },
  ca: {
    "lost-passport":
      "Canadian travelers should follow Government of Canada lost passport and emergency assistance guidance before visiting a mission.",
    "lost-phone":
      "Protect Canadian bank, SIM, and identity account recovery before wiping the device.",
    "lost-wallet":
      "Freeze Canadian cards and keep police evidence for card issuer and insurer follow-up.",
    hospital:
      "Ask for itemized medical records and receipts for Canadian travel insurance claims.",
    "police-report":
      "For Canadian travelers, the report usually supports insurance, bank, or passport follow-up.",
    scam:
      "Save payment proof and merchant details for Canadian card issuer disputes.",
  },
  th: {
    "lost-passport":
      "Thai travelers should confirm the Thai mission's emergency travel document process and identity requirements before visiting.",
    "lost-phone":
      "Preserve Thai SIM, bank, and identity app recovery before replacing or wiping the device.",
    "lost-wallet":
      "Block Thai cards and keep police evidence for issuer and insurer follow-up.",
    hospital:
      "Keep original medical records and receipts for Thai insurer or follow-up treatment.",
    "police-report":
      "Check that the police record is detailed enough for Thai insurer or consular follow-up.",
    scam:
      "Keep payment evidence for Thai bank dispute or travel insurance consultation.",
  },
  vn: {
    "lost-passport":
      "Vietnamese travelers should confirm the Vietnamese mission's travel document process and identity checks before visiting.",
    "lost-phone":
      "Preserve Vietnamese SIM, banking, and identity app access before reset or replacement.",
    "lost-wallet":
      "Block Vietnamese cards and keep police documents for issuer and insurer follow-up.",
    hospital:
      "Keep original medical documents and receipts for Vietnamese insurance or later care.",
    "police-report":
      "Confirm that the police record includes enough detail for Vietnamese insurer or consular use.",
    scam:
      "Save merchant and payment records for Vietnamese bank dispute follow-up.",
  },
};

export function getNationalityProofText(
  profile: TravelerProfile,
  incident: IncidentType,
  options: {
    countryName: string;
    cityName: string;
    incidentName: string;
    emergencyNumber?: string;
  },
) {
  return [
    authorityLabelByTraveler[profile.code],
    travelerSpecificAction[profile.code][incident],
    profile.nativeName,
    profile.consularHotline,
    profile.officialGuidance,
    options.countryName,
    options.cityName,
    options.incidentName,
    options.emergencyNumber ?? "",
  ].join(" ");
}

export function NationalityProofSection({
  profile,
  countryName,
  cityName,
  incidentName,
  incident,
  emergencyNumber,
}: NationalityProofSectionProps) {
  const isKo = profile.language === "ko";
  const authorityLabel = authorityLabelByTraveler[profile.code];
  const action = travelerSpecificAction[profile.code][incident];

  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {isKo ? "국적별 고유 확인" : "Nationality-specific verification"}
      </p>
      <h2 className="mt-2 text-xl font-bold leading-snug text-gray-950 md:text-2xl">
        {isKo
          ? `${profile.nativeName} 여행자가 ${cityName}에서 ${incidentName}을 처리할 때 다른 점`
          : `What is different for ${profile.nativeName} travelers handling ${incidentName} in ${cityName}`}
      </h2>
      <p className="mt-3 text-sm leading-6 text-gray-700">
        {action}
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <h3 className="text-sm font-bold text-gray-900">
            {isKo ? "공식 기준" : "Official baseline"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-700">{authorityLabel}</p>
          <a
            href={profile.officialGuidance}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex text-sm font-semibold text-blue-700 hover:underline"
          >
            {isKo ? "공식 안내 확인" : "Check official guidance"} →
          </a>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <h3 className="text-sm font-bold text-gray-900">
            {isKo ? "국적별 연락" : "Traveler hotline"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            {profile.consularHotline}
          </p>
          <p className="mt-2 text-xs leading-5 text-gray-500">
            {isKo
              ? "현지 기관 방문 전 접수 가능 여부와 필요 서류를 다시 확인하세요."
              : "Confirm opening status and required documents before traveling to an office."}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <h3 className="text-sm font-bold text-gray-900">
            {isKo ? "현지 목적지" : "Local destination context"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            {cityName}, {countryName}
          </p>
          <p className="mt-2 text-xs leading-5 text-gray-500">
            {emergencyNumber
              ? `${isKo ? "이 가이드의 현지 긴급번호" : "Local emergency number in this guide"}: ${emergencyNumber}`
              : isKo
                ? "현지 긴급번호는 상황별 가이드 본문에서 다시 확인하세요."
                : "Check the situation guide for the local emergency number."}
          </p>
        </div>
      </div>
    </section>
  );
}
