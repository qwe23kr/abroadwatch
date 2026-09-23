import assert from "node:assert/strict";
import { travelerProfiles } from "../src/lib/traveler-profiles";
import { responseCopy } from "../src/lib/response-copy";
import { travelChecklists } from "../src/lib/travel-checklists";
import { editorialCopy } from "../src/lib/editorial-copy";

async function main() {
const origin = process.env.QUALITY_CHECK_ORIGIN ?? "http://127.0.0.1:3040";
assert(["127.0.0.1", "localhost"].includes(new URL(origin).hostname), "Use a local test server");
let checked = 0;
for (const profile of travelerProfiles) {
  const r = responseCopy[profile.language];
  const e = editorialCopy[profile.language];
  const cases = [["prepare", r.prep], ["claims", travelChecklists[profile.language].claimsTitle], ["tools/lost-phone", r.title], ["about", e.about], ["editorial", e.policy], ["contact", e.contact]];
  for (const [suffix, expected] of cases) {
    const response = await fetch(`${origin}/${profile.code}/${suffix}`);
    assert.equal(response.status, 200, `${profile.code}/${suffix}`);
    const html = await response.text();
    const heading = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<!--.*?-->/g, "");
    assert.equal(heading, expected, `${profile.code}/${suffix}: native heading`);
    assert(!/<meta name="robots" content="[^"]*noindex/.test(html), `${profile.code}/${suffix}: unexpectedly noindex`);
    assert(!html.includes("TRAVEL DEALS"), `${profile.code}/${suffix}: header promotions remain`);
    checked++;
  }
}
for (const route of ["kr/japan/tokyo/lost-phone", "tw/south-korea/busan/lost-passport", "us/japan/osaka/lost-wallet", "vn/thailand/bangkok/police-report"]) {
  const response = await fetch(`${origin}/${route}`);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert(!html.includes("reddit.com"), `${route}: unsupported testimonial source`);
  assert(!html.includes("Request Stolen not Lost"), `${route}: misleading advice`);
  checked++;
}
console.log(`Quality route checks passed: ${checked} pages across all 10 profiles / 7 languages.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
