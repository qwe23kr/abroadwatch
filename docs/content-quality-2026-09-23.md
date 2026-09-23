# Content quality update — 2026-09-23

Scope: all 10 traveler profiles and 7 languages. Existing public guide URLs are preserved. This is a quality improvement, not a claim of AdSense approval or an audit of every institution's current contact details.

## Changes

- Remove untraceable Reddit search-result testimonials across the content library.
- Correct instructions that encouraged recording a loss as theft and unsubstantiated insurance turnaround promises, including generator inputs.
- Remove mission maps made by combining a national mission name with an arbitrary destination city. Remove a national hotline from the local mission card; the nationality section still identifies the consular hotline separately.
- Show the first three actions from each guide's own language, and remove two repetitive supplemental sections from guide pages.
- Localize home, preparation, insurance document checklist, lost-phone tool, about, editorial and contact pages in all seven languages.
- Keep guide search and trip preparation in the header; restore the existing travel deals menu with affiliate disclosures. Keep the phone response checklist on the home card and relevant guides.
- Persist checklist completion locally, support clearing shared-device records, and expose accessible progress and toggle states.
- Label document dates honestly rather than presenting every edit as full source re-verification.
- Add procedure-specific official links for Apple, Google, Tokyo police, Osaka police and Korean lost property, where relevant. General national safety sources are explicitly distinguished from evidence for individual costs and timings.

## Measurement

New events: `help_phone_click`, `official_source_click`, `checklist_step`, `checklist_complete`.
These measure a click or a self-marked completion, not a connected call, successful recovery or insurance payment. The new events omit telephone numbers and personal case details. Existing analytics events remain in place.

The owner-provided monthly snapshot reports 243 active users, 240 new users and 28 seconds average engagement. Naver-related first-user sources total 141 active users (125 referral + 16 organic); this is a source grouping, not proof of a particular search ranking. Page samples are too small to infer that an individual bounce rate caused the AdSense rejection. No access to the AdSense decision details or GA administration was used. Designating an event as a GA4 key event requires a separate account setting.

## Maintenance

`npm run refine:content` is idempotent. Both content-generation commands run it afterward so removed language does not return on regeneration. `npm run check` validates content, sources and TypeScript; `npx tsx scripts/verify-quality-pages.ts` checks localized routes against a running local server (default port 3040).

Specific institution addresses, opening hours, fees, translations and nationality-specific edge cases still warrant ongoing source review. No invented author credentials, field visits, testimonials or blanket verification dates were added.
