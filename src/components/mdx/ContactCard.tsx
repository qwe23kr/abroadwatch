import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/site-config";
import type { TravelerProfile } from "@/lib/traveler-profiles";

interface ContactCardProps {
  name: string;
  address?: string;
  phone?: string;
  hours?: string;
  website?: string;
  note?: string;
  locale?: Locale;
  uiLanguage?: TravelerProfile["language"];
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
  uiLanguage,
}: ContactCardProps) {
  const labels = {
    address: "address",
    phone: "phone",
    hours: "hours",
    website: "website",
  } as const;
  const nativeLabels = {
    ko: { address: "주소", phone: "전화", hours: "운영시간", website: "웹사이트" },
    "zh-Hans": { address: "地址", phone: "电话", hours: "受理时间", website: "官方网站" },
    ja: { address: "住所", phone: "電話", hours: "受付時間", website: "公式サイト" },
    "zh-Hant": { address: "地址", phone: "電話", hours: "受理時間", website: "官方網站" },
    th: { address: "ที่อยู่", phone: "โทรศัพท์", hours: "เวลาทำการ", website: "เว็บไซต์" },
    vi: { address: "Địa chỉ", phone: "Điện thoại", hours: "Giờ làm việc", website: "Trang web" },
    en: { address: "Address", phone: "Phone", hours: "Hours", website: "Website" },
  } as const;
  const label = (key: keyof typeof labels) =>
    uiLanguage ? nativeLabels[uiLanguage][key] : t(locale, labels[key]);

  return (
    <div className="my-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h4 className="mb-3 font-semibold text-gray-900">{name}</h4>
      <dl className="space-y-2 text-sm">
        {address && (
          <div>
            <dt className="inline font-medium text-gray-500">{label("address")}: </dt>
            <dd className="inline text-gray-700">{address}</dd>
          </div>
        )}
        {phone && (
          <div>
            <dt className="inline font-medium text-gray-500">{label("phone")}: </dt>
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
            <dt className="inline font-medium text-gray-500">{label("hours")}: </dt>
            <dd className="inline text-gray-700">{hours}</dd>
          </div>
        )}
        {website && (
          <div>
            <dt className="inline font-medium text-gray-500">{label("website")}: </dt>
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
