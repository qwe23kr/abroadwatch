import { ImageResponse } from "next/og";
import { renderAwLogo } from "@/lib/brand-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple Touch Icon — 180×180 AW 로고 */
export default function AppleIcon() {
  return new ImageResponse(renderAwLogo(180), size);
}
