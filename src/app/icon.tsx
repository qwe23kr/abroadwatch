import { ImageResponse } from "next/og";
import { renderAwLogo } from "@/lib/brand-icon";

export const size = { width: 96, height: 96 };
export const contentType = "image/png";

/** 기본 favicon — 96×96 AW 로고 */
export default function Icon() {
  return new ImageResponse(renderAwLogo(96), size);
}
