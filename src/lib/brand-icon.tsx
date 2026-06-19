/** AW 로고 마크 — favicon·헤더·OG 아이콘 공통 디자인 */
export const BRAND_BLUE = "#2563eb";

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
