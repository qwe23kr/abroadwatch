import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTravelerProfile } from "@/lib/traveler-profiles";
import { travelChecklists } from "@/lib/travel-checklists";
import { travelerAlternateLanguages } from "@/lib/seo";
import { TravelChecklistPage } from "@/components/guide/TravelChecklistPage";
type Props = { params: Promise<{ traveler: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getTravelerProfile((await params).traveler);
  if (!p) return {};
  const c = travelChecklists[p.language];
  return { title: c.claimsTitle, description: c.claimsIntro, alternates: { canonical: `/${p.code}/claims`, languages: travelerAlternateLanguages(p, "/claims") } };
}
export default async function ClaimsPage({ params }: Props) {
  const profile = getTravelerProfile((await params).traveler);
  if (!profile) notFound();
  return <TravelChecklistPage profile={profile} kind="claims" />;
}
