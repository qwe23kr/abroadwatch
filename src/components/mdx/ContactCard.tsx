import { t, type TranslationKey } from "@/lib/i18n";
import type { Locale } from "@/lib/site-config";

interface ContactCardProps {
  name: string;
  address?: string;
  phone?: string;
  hours?: string;
  website?: string;
  note?: string;
  locale?: Locale;
}

/** 연락처 정보 카드 — 대사관, 경찰, 병원 등 */
export function ContactCard({
  name,
  address,
  phone,
  hours,
  website,
  note,
  locale = "ko",
}: ContactCardProps) {
  const labels: Record<string, TranslationKey> = {
    address: "address",
    phone: "phone",
    hours: "hours",
    website: "website",
  };

  return (
    <div className="my-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h4 className="mb-3 font-semibold text-gray-900">{name}</h4>
      <dl className="space-y-2 text-sm">
        {address && (
          <div>
            <dt className="inline font-medium text-gray-500">{t(locale, labels.address)}: </dt>
            <dd className="inline text-gray-700">{address}</dd>
          </div>
        )}
        {phone && (
          <div>
            <dt className="inline font-medium text-gray-500">{t(locale, labels.phone)}: </dt>
            <dd className="inline">
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="break-all font-medium text-blue-600 hover:text-blue-800"
              >
                {phone}
              </a>
            </dd>
          </div>
        )}
        {hours && (
          <div>
            <dt className="inline font-medium text-gray-500">{t(locale, labels.hours)}: </dt>
            <dd className="inline text-gray-700">{hours}</dd>
          </div>
        )}
        {website && (
          <div>
            <dt className="inline font-medium text-gray-500">{t(locale, labels.website)}: </dt>
            <dd className="inline">
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:text-blue-800"
              >
                {website}
              </a>
            </dd>
          </div>
        )}
        {note && (
          <p className="mt-2 text-xs text-gray-500 italic">{note}</p>
        )}
      </dl>
    </div>
  );
}
