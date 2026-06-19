import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { countries, incidentTypes, type IncidentType } from "./site-config";
import { travelerProfiles, type TravelerCode } from "./traveler-profiles";

export interface TravelerGuide {
  traveler: TravelerCode;
  country: string;
  city: string;
  incident: IncidentType;
  frontmatter: {
    title: string;
    summary: string;
    updatedAt: string;
    estimatedCost?: string;
    estimatedTime?: string;
    emergencyNumber?: string;
  };
  content: string;
}

const contentDir = path.join(process.cwd(), "content");

export function getTravelerGuide(
  traveler: TravelerCode,
  country: string,
  city: string,
  incident: IncidentType,
): TravelerGuide | null {
  const file = path.join(contentDir, traveler, country, city, `${incident}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return {
    traveler,
    country,
    city,
    incident,
    frontmatter: data as TravelerGuide["frontmatter"],
    content,
  };
}

export function getAllTravelerGuideParams() {
  return travelerProfiles.flatMap((traveler) =>
    countries.flatMap((country) =>
      country.cities.flatMap((city) =>
        incidentTypes.map((incident) => ({
          traveler: traveler.code,
          country: country.slug,
          city: city.slug,
          incident,
        })),
      ),
    ),
  );
}

export function getTravelerGuides(traveler: TravelerCode): TravelerGuide[] {
  return countries.flatMap((country) =>
    country.cities.flatMap((city) =>
      incidentTypes.flatMap((incident) => {
        const guide = getTravelerGuide(traveler, country.slug, city.slug, incident);
        return guide ? [guide] : [];
      }),
    ),
  );
}

const popularGuideKeys = [
  ["japan", "tokyo", "lost-passport"],
  ["thailand", "bangkok", "lost-phone"],
  ["japan", "tokyo", "scam"],
  ["thailand", "bangkok", "scam"],
  ["vietnam", "danang", "hospital"],
  ["philippines", "cebu", "lost-passport"],
  ["taiwan", "taipei", "police-report"],
] as const;

export function getPopularTravelerGuides(traveler: TravelerCode, limit = 7) {
  return popularGuideKeys.slice(0, limit).flatMap(([country, city, incident]) => {
    const guide = getTravelerGuide(traveler, country, city, incident);
    return guide ? [guide] : [];
  });
}

export function getLatestTravelerGuides(traveler: TravelerCode, limit = 6) {
  return getTravelerGuides(traveler)
    .sort((a, b) => b.frontmatter.updatedAt.localeCompare(a.frontmatter.updatedAt))
    .slice(0, limit);
}

export function searchTravelerGuides(traveler: TravelerCode, query: string) {
  const needle = query.trim().toLocaleLowerCase();
  if (!needle) return [];
  return getTravelerGuides(traveler).filter((guide) =>
    [guide.frontmatter.title, guide.frontmatter.summary, guide.content, guide.country, guide.city, guide.incident]
      .join(" ")
      .toLocaleLowerCase()
      .includes(needle),
  );
}
