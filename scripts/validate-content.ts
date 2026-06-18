import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { countries, incidentTypes, siteConfig } from "../src/lib/site-config";

const contentDir = path.join(process.cwd(), "content");
const expectedCount = siteConfig.locales.length * countries.reduce(
  (total, country) => total + country.cities.length * incidentTypes.length,
  0,
);

const medicalNumbers: Record<string, string> = {
  japan: "119",
  thailand: "1669",
  vietnam: "115",
  taiwan: "119",
  philippines: "911",
};

const foreignMarkers: Record<string, RegExp[]> = {
  japan: [/\bTHB\b|바트|\bVND\b|베트남 동|\bTWD\b|대만달러|\bPHP\b|페소|₱/i, /관광경찰 1155/i, /Tourist Police 1155/i, /0800-024-111/],
  thailand: [/엔|¥|\bJPY\b|\bVND\b|\bTWD\b|\bPHP\b|페소|₱/i, /050-2016-1603/, /\bJR\b/, /0800-024-111/],
  vietnam: [/엔|¥|\bJPY\b|\bTHB\b|바트|\bTWD\b|\bPHP\b|페소|₱/i, /050-2016-1603/, /\bJR\b/, /관광경찰 1155/i, /Tourist Police 1155/i, /0800-024-111/],
  taiwan: [/엔|¥|\bJPY\b|\bTHB\b|바트|\bVND\b|\bPHP\b|페소|₱/i, /050-2016-1603/, /\bJR\b/, /관광경찰 1155/i, /Tourist Police 1155/i],
  philippines: [/엔|¥|\bJPY\b|\bTHB\b|바트|\bVND\b|\bTWD\b/i, /050-2016-1603/, /\bJR\b/, /관광경찰 1155/i, /Tourist Police 1155/i, /0800-024-111/],
};

const errors: string[] = [];
let fileCount = 0;

for (const locale of siteConfig.locales) {
  for (const country of countries) {
    for (const city of country.cities) {
      for (const incident of incidentTypes) {
        const relativePath = path.join(locale, country.slug, city.slug, `${incident}.mdx`);
        const filePath = path.join(contentDir, relativePath);
        if (!fs.existsSync(filePath)) {
          errors.push(`${relativePath}: missing file`);
          continue;
        }

        fileCount += 1;
        const raw = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(raw);

        for (const key of ["title", "summary", "publishedAt", "updatedAt", "emergencyNumber"]) {
          if (typeof data[key] !== "string" || !data[key].trim()) {
            errors.push(`${relativePath}: invalid frontmatter ${key}`);
          }
        }

        if (!content.includes("<ReviewNote") || !content.includes("url=\"https://")) {
          errors.push(`${relativePath}: missing source URL`);
        }

        for (const marker of foreignMarkers[country.slug] ?? []) {
          if (marker.test(raw)) errors.push(`${relativePath}: foreign-country marker ${marker}`);
        }

        if (incident === "hospital" && data.emergencyNumber !== medicalNumbers[country.slug]) {
          errors.push(
            `${relativePath}: hospital emergency number must be ${medicalNumbers[country.slug]}`,
          );
        }
      }
    }
  }
}

if (fileCount !== expectedCount) {
  errors.push(`expected ${expectedCount} MDX files, found ${fileCount}`);
}

if (errors.length > 0) {
  console.error(`Content validation failed (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Content validation passed: ${fileCount} guides checked`);
}
