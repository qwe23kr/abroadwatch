import Link from "next/link";
import { responseCopy } from "@/lib/response-copy";
import { travelChecklists } from "@/lib/travel-checklists";
import { travelerIncident } from "@/lib/traveler-ui";
import type { TravelerProfile } from "@/lib/traveler-profiles";

export function TravelChecklistPage({ profile, kind }: { profile: TravelerProfile; kind: "prepare" | "claims" }) {
  const c = travelChecklists[profile.language];
  const r = responseCopy[profile.language];
  const claims = kind === "claims";
  const rows = claims ? c.claims : c.prepare;
  const ids = claims ? ["electronics", "wallet", "medical", "baggage"] : ["documents", "connectivity", "insurance", "arrival", "contacts"];
  return <main>
    <header className="bg-[#10221d] px-4 py-14 text-white md:py-20"><div className="mx-auto max-w-5xl"><Link href={`/${profile.code}`} className="text-sm text-[#c8f169]">← AbroadWatch</Link><h1 className="mt-8 text-4xl font-black leading-tight md:text-6xl">{claims ? c.claimsTitle : r.prep}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-[#c6d3ce]">{claims ? c.claimsIntro : c.prepareIntro}</p></div></header>
    <div className="mx-auto max-w-5xl px-4 py-12">
      <nav className="mb-8 flex flex-wrap gap-3">{rows.map(([title], index) => <a key={ids[index]} href={`#${ids[index]}`} className="rounded-full border px-4 py-2 text-sm font-semibold">{title}</a>)}</nav>
      <div className="grid gap-5 md:grid-cols-2">{rows.map(([title, body], index) => <section id={ids[index]} key={title} className="scroll-mt-24 rounded-2xl border border-[#173c32]/10 bg-white p-6"><span className="text-sm font-bold text-[#0f766e]">0{index + 1}</span><h2 className="mt-4 text-2xl font-bold">{title}</h2><p className="mt-3 leading-7 text-[#61716b]">{body}</p>{claims && index < 3 && <Link href={`/${profile.code}/search?incident=${["lost-phone", "lost-wallet", "hospital"][index]}`} className="mt-5 inline-block font-bold text-[#0f766e]">{travelerIncident(profile, (["lost-phone", "lost-wallet", "hospital"] as const)[index])} →</Link>}</section>)}</div>
      <section className="mt-8 rounded-2xl bg-[#eaf2ed] p-6"><h2 className="text-xl font-bold">{c.questionsTitle}</h2><ul className="mt-4 list-disc space-y-3 pl-5 leading-7">{c.questions.map(question => <li key={question}>{question}</li>)}</ul><p className="mt-5 text-sm leading-7">{r.honest}</p></section>
      <section data-official-sources className="mt-8 rounded-2xl border p-6"><h2 className="font-bold">{r.sources}</h2><a href="https://www.smartraveller.gov.au/travel-essentials/travel-insurance" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-[#0f766e] underline">Smartraveller · Travel insurance (Australia) ↗</a></section>
      <nav className="mt-8 flex flex-wrap gap-4 font-semibold text-[#0f766e]"><Link href={`/${profile.code}/tools/lost-phone`}>{r.title} →</Link><Link href={`/${profile.code}/${claims ? "prepare" : "claims"}`}>{claims ? r.prep : c.claimsTitle} →</Link><Link href={`/${profile.code}/editorial`}>{r.policy} →</Link></nav>
    </div>
  </main>;
}
