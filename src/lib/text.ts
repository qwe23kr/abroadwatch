/** 카드·검색용 마크다운/HTML 제거 */
export function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** 검색용 본문 텍스트 추출 */
export function stripMdxContent(content: string): string {
  return stripMarkdown(
    content
      .replace(/<[^>]+\/>/g, " ")
      .replace(/<[^>]+>[\s\S]*?<\/[^>]+>/g, " ")
      .replace(/<[^>]+>/g, " "),
  );
}
