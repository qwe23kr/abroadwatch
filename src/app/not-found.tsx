import Link from "next/link";
import { t } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

/** 404 Not Found 페이지 */
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="mb-2 text-6xl font-bold text-blue-600">404</p>
      <h1 className="mb-4 text-2xl font-bold text-gray-900">
        {t(siteConfig.defaultLocale, "notFoundTitle")}
      </h1>
      <p className="mb-8 text-gray-600">
        {t(siteConfig.defaultLocale, "notFoundDescription")}
      </p>
      <Link
        href={`/${siteConfig.defaultLocale}`}
        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
      >
        {t(siteConfig.defaultLocale, "backToHome")}
      </Link>
    </div>
  );
}
