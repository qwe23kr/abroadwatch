import Image from "next/image";

interface BrandMarkProps {
  size?: number;
  className?: string;
}

/** 헤더·푸터용 AW 로고 마크 — favicon과 동일한 이미지 */
export function BrandMark({ size = 32, className }: BrandMarkProps) {
  return (
    <Image
      src="/icon"
      alt=""
      width={size}
      height={size}
      className={className}
      priority
      unoptimized
    />
  );
}
