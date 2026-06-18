"use client";

import { useEffect } from "react";

/** 오프라인 캐시용 서비스 워커 — 프로덕션에서만 등록 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        for (const reg of regs) reg.unregister();
      });
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* 등록 실패 시 무시 */
    });
  }, []);

  return null;
}
