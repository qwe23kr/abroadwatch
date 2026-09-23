import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LostPhoneChecklist } from "@/components/tools/LostPhoneChecklist";
import { getTravelerProfile } from "@/lib/traveler-profiles";
import { responseCopy } from "@/lib/response-copy";
import { travelerAlternateLanguages } from "@/lib/seo";
export async function generateMetadata({ params }: { params: Promise<{ traveler: string }> }): Promise<Metadata> {
  const profile = getTravelerProfile((await params).traveler);
  if (!profile) return {};
  const copy = responseCopy[profile.language];
  return { title: copy.title, description: copy.intro, alternates: { canonical: `/${profile.code}/tools/lost-phone`, languages: travelerAlternateLanguages(profile, "/tools/lost-phone") } };
}
export default async function LostPhoneToolPage({ params }: { params: Promise<{ traveler: string }> }) {
  const profile = getTravelerProfile((await params).traveler);
  if (!profile) notFound();
  const copy = responseCopy[profile.language];
  return <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-16"><nav className="mb-8 text-sm text-[#61716b]"><Link href={`/${profile.code}`}>AbroadWatch</Link> / {copy.title}</nav><header><h1 className="text-balance text-4xl font-black leading-tight tracking-tight md:text-5xl">{copy.title}</h1><p className="mt-5 max-w-3xl leading-8 text-[#61716b]">{copy.intro}</p></header><section className="mt-10 grid gap-8 lg:grid-cols-[1fr_18rem]"><LostPhoneChecklist language={profile.language} /><aside className="space-y-5 lg:sticky lg:top-28 lg:self-start"><div data-official-sources className="rounded-2xl bg-white p-5 shadow-sm"><h2 className="font-bold">{copy.sources}</h2><ul className="mt-4 space-y-4 text-sm text-[#0f766e] underline"><li><a href="https://support.apple.com/en-us/101593" target="_blank" rel="noopener noreferrer">Apple · Find My ↗</a></li><li><a href="https://support.google.com/accounts/answer/6160491" target="_blank" rel="noopener noreferrer">Google · Find Hub ↗</a></li></ul></div><p className="rounded-2xl bg-[#f1f5ef] p-5 text-sm leading-7">{copy.honest}</p><Link href={`/${profile.code}/search?incident=lost-phone`} className="block rounded-2xl bg-[#c8f169] p-5 text-sm font-bold">{copy.city} →</Link></aside></section></main>;
}
