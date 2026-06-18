interface ReviewNoteProps {
  source: string;
  url?: string;
  label?: string;
  children: React.ReactNode;
}

/** 실제 블로그·후기 인용 박스 */
export function ReviewNote({
  source,
  url,
  label = "📌 실제 후기 기반",
  children,
}: ReviewNoteProps) {
  return (
    <blockquote className="my-6 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-800">
        {label}
      </p>
      <div className="text-sm leading-relaxed text-gray-800">{children}</div>
      <footer className="mt-3 text-xs text-gray-500">
        출처:{" "}
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:underline"
          >
            {source}
          </a>
        ) : (
          source
        )}
      </footer>
    </blockquote>
  );
}
