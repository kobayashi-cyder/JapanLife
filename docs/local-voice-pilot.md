# JapanLife — Local & Voice pilot specification

Updated 2026-11-12. Status: pilot only; no municipality integration.

## Purpose

JapanLife connects Learn → Live → Voice → Local. It helps residents find current, primary-source information and distinguish legal rules from social customs, contract terms and personal experiences. Existing romaji-first Japanese lessons, furigana, five-language UI and independent character-learning courses stay intact.

## Local pilot

Yonago City is an optional example area, not a detected residence. Nationwide information stays visible in all areas. Sources are links to the original websites. Translated headings/descriptions are beta, not official translations.

| Registry ID | Source | Original URL |
| --- | --- | --- |
| isa-portal | Immigration Services Agency, foreign-resident portal | https://www.moj.go.jp/isa/support/portal/ |
| yonago-multicultural | Yonago City, multicultural coexistence | https://www.city.yonago.lg.jp/37531.htm |
| yonago-waste | Yonago City, district waste calendars | https://www.city.yonago.lg.jp/45368.htm |
| yonago-hazard | Yonago City, flood hazard maps | https://www.city.yonago.lg.jp/8061.htm |
| tottori-foundation | Tottori Prefectural International Exchange Foundation, Yonago office | https://www.torisakyu.or.jp/ja/1/aboutus/127/ |

Link check date: 2026-11-12. Recheck periodically; do not treat a link date as verification of every underlying deadline, opening hour, procedure or emergency alert. For each future source, record a stable ID, scope, category, provider type, original URL, title, short guidance and check date. Prefer primary, authoritative government pages and distinguish support organizations from policy issuers.

## Voice: private drafts only

Storage: browser localStorage key japanlife-voice-drafts-v1; 30 drafts maximum. Fields: id, createdAt, region, category, problem (600 characters max), proposal (400 max), status=draft, sourceType=self-report. The user may delete a draft or export the drafts as an unredacted JSON file.

No server, network submission, consent to publication, government forwarding, identity verification or analytics. Do not call this anonymous feedback: locally stored text can contain identifying details and may be readable by other users of a shared device. A rudimentary phone/email pattern check is not reliable de-identification. Tell the user to omit personal, employer and medical details. Exported files should be reviewed before sharing.

## Research and governance

Public surveys and consultation summaries may inform priorities after checking source, permitted reuse, methodology, aggregate counts and the risk of reidentification. Do not ingest nonpublic consultation records. Raw individual case data should not be shared with municipalities or third parties without lawful basis, purpose specification, and suitable safeguards.

Before hosting a feedback service: privacy/legal assessment, informed opt-in, retention and deletion, moderator/abuse response, sensitive-data redaction, correction and takedown process, data ownership and emergency escalation. User-generated issue drafts are NOT proof of a population-level trend.

## Next validation

1. Manual keyboard, accessibility, offline and Android WebView tests.
2. Native-speaker review of Chinese/Vietnamese/Nepali drafts.
3. Recheck source links before distributing; test scenario-based task completion.
4. Only after governance review, design opt-in, aggregated issue analysis with no automatic transfer of raw drafts.

Suggested pilot success criteria, NOT measured results: 80% find a relevant original source in assigned scenarios; zero automatic transmissions of Voice drafts; users can correctly distinguish government rules from personal experiences.
