# StudyOrbit IIT S7.8 — Codebase & UI Map

This map documents the S7.8 source, following the corrected S7.7 codebase and retaining the S7.6 Math Integrity Fix lineage. It is a navigation guide, not a substitute for testing the live GitHub Pages deployment.

## File responsibilities

- `index.html`: static app shell, original chapter/stage engine, summary dashboard, original Chapter Plan / Integrated Question Bank / Daily Log containers, snapshot/restore card, header, inline styling, and Service Worker registration.
- `studyorbit-features.js`: runtime enhancement layer. It preserves legacy QB/Daily Log DOM, injects dated practice forms and Leave/Testing/Analysis sections, loads/saves records through the existing tracker state, draws charts, and handles edit modes.
- `studyorbit-features.css`: dynamic section/table/modal/chart styling, responsive layouts, and Improvement Insights panel.
- `studyorbit-todo.js` / `studyorbit-todo.css`: To-Do List tasks, carry-forward, history/statistics, floating control, and parchment-panel styles.
- `sw.js`: PWA cache install, activation, and fetch behavior. Cache: `studyorbit-tracker-s78-todo1`.
- `manifest.json`: app metadata, start URL, scope, display mode, theme, and icons.
- `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`: declared PWA icons.
- `studyorbit-logo.png`, `studyorbit-background.png`, `studyorbit-master.png`: image assets referenced by the page/metadata.
- `inline0.js`–`inline3.js`: retained project files; current `index.html` does not directly reference them.
- `.nojekyll`: GitHub Pages processing marker.
- `README.md`: release notes and deployment/test guidance.

## Rendered section order

The HTML starts with these static sections:

1. `#summary` — summary metrics and study consistency.
2. `#questionBankSection` — Integrated Question Bank.
3. `#dailyLogSection` — Daily Log (heading uses the explicitly requested 🔖 marker).
4. `#chapterPlanSection` — Chapter Plan.
5. `#orbTestingSection` — Testing.
6. `#orbAnalysisSection` — Analysis.
7. `#orbLeaveSection` — Add Leave.
8. Red glowing `NOTE❗` divider message.
9. Snapshot/restore card.

At runtime, `studyorbit-features.js` moves existing section nodes into this order; IDs, forms, and handlers are preserved.

## Important IDs

### Static shell (`index.html`)
- Header: `.hero`, `.studyorbit-logo`, `.orbit-architect-credit`, `.orbit-model-label`.
- Summary: `#summary`, `#totalChapters`, `#completedCount`, `#percent`, `#progressBar`, `#distribution`, `#medianStudyHours`, `#consistencyPercent`, `#consistencyBar`.
- Chapter Plan: `#chapterPlanSection`, `#planSubject`, `#drawers`.
- Legacy QB/Daily: `#questionBankSection`, `#dailyLogSection` and their original input IDs.
- Backup/restore: `#copyAll`, `#exportJSON`, `#importJSON`, `#restoreJSON`, `#resetTracker`.

### Runtime feature layer (`studyorbit-features.js`)
- Dated QB: `#orbQBSubject`, `#orbQBChapter`, `#orbQBExercise`, `#orbQBDate`, `#orbQBSolved`, `#orbQBRepeat`, `#orbQBCorrect`, `#orbQBTime`, `#orbQBTheory`, `#orbQBSave`, `#orbQBList`.
- Revision: corresponding `orbRev*` IDs.
- Daily hours: `#orbDailySection`, `#orbDailyDate`, `#orbDailyMathsHours`, `#orbDailyPhysicsHours`, `#orbDailyPCHours`, `#orbDailyOCHours`, `#orbDailyIOCHours`, `#orbDailySave`.
- Leave: `#orbLeaveSection`, `#orbLeaveFrom`, `#orbLeaveTo`, `#orbLeaveReason`, `#orbLeaveSave`, `#orbLeaveList`.
- Testing: `#orbTestingSection`, `#orbTestDate`, `#orbTestType`, `#orbTestSession`, `#orbTestScore`, `#orbTestMax`, `#orbTestPercentile`, `#orbTestNegative`, `#orbTestTotalQ`, `#orbTestAttempted`, `#orbTestCorrect`, `#orbTestSave`, `#orbTestList`, `#orbTestCharts`.
- Analysis: `#orbAnalysisSection`, `#orbWindow`, `#orbAnalysisOverview`, `#orbStudyCharts`, `#orbQuestionCharts`, `#orbSubjectCharts`, `#orbSpeedCharts`, `#orbTaskCharts`, `#orbRealityCharts`, `#orbStageTable`, `#orbProgressReport`, `#orbLeaveCharts`.

## State and compatibility

- Original tracker state remains under localStorage key `teraJEEAdvancedTracker_v3_51chapters`.
- Feature records are stored under `state.orbit` (`daily`, `qb`, `rev`, `tests`, `leaves`, `start`). To-Do data is stored under `state.todo` (`tasks`, `events`, `position`, transient `undo` snapshots).
- `ensure()` supplies missing containers and normalizes legacy S7.5 test property names (`negative` → `negativeMarks`, `totalQ` → `totalQuestions`, including subject records) in memory. Existing values are preserved; normal persistence occurs through the existing save flow.
- Optional percentile is stored separately from whether it was actually supplied. A blank percentile must not be interpreted as an observed percentile of zero.
- Browser `localStorage` is device/browser-origin-specific. The Service Worker cache is separate from saved study data.

## Critical initialization order

`testSubjects` must be declared **before** the `testHTML` template is evaluated because that template calls `testSubjects.map(...)`. A temporal-dead-zone `ReferenceError` here aborts the whole feature script before Leave, Testing, and Analysis are inserted. This was the cause of the new header appearing above the old static tracker layout.

## Cache/link alignment (S7.8)

- `index.html` loads the feature and To-Do JavaScript/CSS assets with query version `v=7801`.
- `sw.js` caches those exact versioned URLs in `CORE`; its cache name `studyorbit-tracker-s78-todo1` and UI model label are versioned for S7.8.
- The HTML registers `./sw.js` with `updateViaCache: 'none'`.
- Cache cleanup is scoped to names beginning `studyorbit-tracker-`; localStorage is not cleared by cache activation.

## Change safety and testing

1. Build from the immediately preceding approved model unless the user explicitly selects another base.
2. Change only requested/approved areas; preserve unrelated UI, data schema, and behavior.
3. For runtime-injected sections, inspect HTML generation, CSS selectors, IDs, handlers, state shape, and render order together.
4. Before deployment, check JavaScript syntax, ZIP integrity, all referenced local assets, CSS/JS query versions, and Service Worker `CORE` URLs.
5. Test live section injection, saving/editing, JSON export/restore, graphs, and offline launch on the target browser. Static checks alone do not prove interactive correctness.
