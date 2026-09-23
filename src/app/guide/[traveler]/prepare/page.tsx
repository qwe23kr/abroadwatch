import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTravelerProfile } from "@/lib/traveler-profiles";
import { responseCopy } from "@/lib/response-copy";
import { travelChecklists } from "@/lib/travel-checklists";
import { travelerAlternateLanguages } from "@/lib/seo";
import { TravelChecklistPage } from "@/components/guide/TravelChecklistPage";
type Props = { params: Promise<{ traveler: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getTravelerProfile((await params).traveler);
  if (!p) return {};
  return { title: responseCopy[p.language].prep, description: travelChecklists[p.language].prepareIntro, alternates: { canonical: `/${p.code}/prepare`, languages: travelerAlternateLanguages(p, "/prepare") } };
}
export default async function PreparePage({ params }: Props) {
  const profile = getTravelerProfile((await params).traveler);
  if (!profile) notFound();
  return <TravelChecklistPage profile={profile} kind="prepare" />;
}
