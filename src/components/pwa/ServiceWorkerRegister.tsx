"use client";

import { useEffect } from "react";

/** 오프라인 캐시용 서비스 워커 등록 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* 등록 실패 시 무시 */
    });
  }, []);

  return null;
}
