interface GoogleMapProps {
  /** Google Maps 검색 쿼리 (주소 또는 장소명) */
  query: string;
  /** iframe 접근성 제목 */
  title?: string;
  /** 지도 높이(px) */
  height?: number;
}

/** Google Maps 임베드 — API 키 없이 place 검색 기반 */
export function GoogleMap({
  query,
  title = "Location map",
  height = 280,
}: GoogleMapProps) {
  const encoded = encodeURIComponent(query);
  const src = `https://maps.google.com/maps?q=${encoded}&z=16&output=embed&hl=ko`;

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <iframe
        title={title}
        src={src}
        width="100%"
        height={height}
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="w-full"
      />
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-gray-50 px-4 py-2 text-center text-sm font-medium text-blue-600 hover:bg-gray-100"
      >
        Google Maps에서 길찾기 →
      </a>
    </div>
  );
}
