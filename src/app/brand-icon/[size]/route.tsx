import { ImageResponse } from "next/og";
import { renderAwLogo } from "@/lib/brand-icon";

const ALLOWED_SIZES = [48, 96, 192, 512] as const;

export function generateStaticParams() {
  return ALLOWED_SIZES.map((size) => ({ size: String(size) }));
}

/** 크기별 AW 로고 PNG — manifest·검색엔진 로고용 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ size: string }> },
) {
  const { size: sizeParam } = await params;
  const parsed = Number.parseInt(sizeParam, 10);
  const size = ALLOWED_SIZES.includes(parsed as (typeof ALLOWED_SIZES)[number])
    ? parsed
    : 96;

  return new ImageResponse(renderAwLogo(size), {
    width: size,
    height: size,
  });
}
