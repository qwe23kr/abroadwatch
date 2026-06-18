/** 프로덕션에서만 AdSense·트래킹·SW 로드 */
export function isProductionRuntime(): boolean {
  return process.env.NODE_ENV === "production";
}
