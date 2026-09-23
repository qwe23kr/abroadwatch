"use client";
import { useSyncExternalStore } from "react";
import { responseCopy, type ResponseLanguage } from "@/lib/response-copy";
import { trackEvent } from "@/lib/analytics-events";
const key = "abroadwatch:lost-phone:v2";
const changeEvent = "abroadwatch:checklist-change";
let memory = "[]";
let storageFailed = false;
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(changeEvent, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(changeEvent, callback); };
}
function snapshot() { if (storageFailed) return memory; try { return localStorage.getItem(key) ?? "[]"; } catch { return memory; } }
function save(next: number[]) {
  memory = JSON.stringify(next);
  try { if (next.length) localStorage.setItem(key, memory); else localStorage.removeItem(key); storageFailed = false; } catch { storageFailed = true; }
  window.dispatchEvent(new Event(changeEvent));
}
function readChecked(raw: string): number[] {
  try { const value: unknown = JSON.parse(raw); return Array.isArray(value) ? [...new Set(value.filter((item): item is number => Number.isInteger(item) && item >= 0 && item < 6))] : []; } catch { return []; }
}
export function LostPhoneChecklist({ language }: { language: ResponseLanguage }) {
  const copy = responseCopy[language];
  const raw = useSyncExternalStore(subscribe, snapshot, () => "[]");
  const checked = readChecked(raw);
  const progress = Math.round(checked.length / copy.steps.length * 100);
  function toggle(index: number) {
    const done = !checked.includes(index);
    const next = done ? [...checked, index] : checked.filter((item) => item !== index);
    save(next);
    trackEvent("checklist_step", { tool: "lost_phone", language, step: index + 1, completed: done });
    if (done && next.length === copy.steps.length) trackEvent("checklist_complete", { tool: "lost_phone", language });
  }
  return <div>
    <div className="mb-6 rounded-2xl bg-[#10221d] p-5 text-white"><div className="flex items-end justify-between"><span className="text-sm font-bold">{copy.progress}</span><strong className="text-3xl font-black text-[#c8f169]" aria-live="polite">{progress}%</strong></div><div role="progressbar" aria-label={copy.progress} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-[#c8f169] transition-all" style={{ width: `${progress}%` }} /></div></div>
    <ol className="space-y-3">{copy.steps.map((step, index) => { const done = checked.includes(index); return <li key={step}><button type="button" aria-pressed={done} onClick={() => toggle(index)} className={`w-full rounded-2xl border p-5 text-left transition ${done ? "border-[#0f766e] bg-[#dff7ef]" : "border-[#173c32]/10 bg-white hover:border-[#0f766e]/40"}`}><span className="flex gap-4"><span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#eef1eb] text-sm font-black">{done ? "✓" : index + 1}</span><span><strong className="block text-[#10221d]">{step}</strong><small className="mt-1.5 block text-sm leading-6 text-[#61716b]">{copy.details[index]}</small></span></span></button></li>; })}</ol>
    <p className="mt-5 text-sm text-[#61716b]">{copy.saved}</p><button type="button" onClick={() => save([])} className="mt-3 rounded-lg border px-4 py-2 text-sm font-semibold">{copy.reset}</button>
  </div>;
}
