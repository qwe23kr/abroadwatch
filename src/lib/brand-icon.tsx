import type { Metadata } from "next";

/** AW 로고 마크 — favicon·헤더·OG 아이콘 공통 디자인 */
export const BRAND_BLUE = "#2563eb";

/** 전역 favicon·앱 아이콘 — 모든 페이지 탭에 동일 적용 */
export const siteIcons: Metadata["icons"] = {
  icon: [
    { url: "/favicon.ico", sizes: "16x16 32x32 48x48 256x256", type: "image/x-icon" },
    { url: "/icon", sizes: "96x96", type: "image/png" },
    { url: "/brand-icon/48", sizes: "48x48", type: "image/png" },
    { url: "/brand-icon/192", sizes: "192x192", type: "image/png" },
    { url: "/brand-icon/512", sizes: "512x512", type: "image/png" },
  ],
  apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  shortcut: "/favicon.ico",
};

/** ImageResponse용 AW 로고 JSX (size × size px) */
export function renderAwLogo(size: number) {
  const radius = Math.round(size * 0.25);
  const fontSize = Math.round(size * 0.4375);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius,
        background: BRAND_BLUE,
        color: "#ffffff",
        fontSize,
        fontWeight: 700,
        letterSpacing: "-0.04em",
      }}
    >
      AW
    </div>
  );
}

/** 절대 URL 로고 (JSON-LD·manifest용) */
export function brandLogoUrl(siteUrl: string, size: number): string {
  return `${siteUrl}/brand-icon/${size}`;
}
