/** 프로덕션에서만 외부 트래킹을 로드 */
export function isProductionRuntime(): boolean {
  return process.env.NODE_ENV === "production";
}
