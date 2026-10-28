# StudyOrbit IIT C 1.1 — Codebase & UI Map

This map documents completed C 1.1, based on C 1.0 and the accepted S7.9.3 Summary Graph Fit-to-Screen build. C 1.0 and S7.x details are retained as historical lineage. It is a navigation guide, not a substitute for testing the live GitHub Pages deployment.

## File responsibilities

- `index.html`: static app shell, original chapter/stage engine, summary dashboard, original Chapter Plan / Integrated Question Bank / Daily Log containers, snapshot/restore card, header, inline styling, and Service Worker registration.
- `studyorbit-features.js`: runtime enhancement layer. It preserves legacy QB/Daily Log DOM, injects dated practice forms and Leave/Testing/Analysis sections, loads/saves records through the existing tracker state, draws charts, and handles edit modes.
- `studyorbit-features.css`: dynamic section/table/modal/chart styling, responsive layouts, and Improvement Insights panel.
- `studyorbit-todo.js` / `studyorbit-todo.css`: To-Do List tasks, carry-forward, history/statistics, floating control, and parchment-panel styles.
- `sw.js`: PWA cache install, activation, and fetch behavior. Current cache: `studyorbit-tracker-c110-graph-interaction-1`.
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

## Cache/link alignment (C 1.1)

- `index.html` loads the changed feature JavaScript/CSS assets with `v=c110` for feature and To-Do JS/CSS assets.
- `sw.js` caches the corresponding versioned URLs in `CORE`; its cache name is `studyorbit-tracker-c110-graph-interaction-1` and the UI model label is C 1.1.
- The HTML registers `./sw.js` with `updateViaCache: 'none'`.
- Cache cleanup is scoped to names beginning `studyorbit-tracker-`; localStorage is not cleared by cache activation.

## Change safety and testing

1. Build from the immediately preceding approved model unless the user explicitly selects another base.
2. Change only requested/approved areas; preserve unrelated UI, data schema, and behavior.
3. For runtime-injected sections, inspect HTML generation, CSS selectors, IDs, handlers, state shape, and render order together.
4. Before deployment, check JavaScript syntax, ZIP integrity, all referenced local assets, CSS/JS query versions, and Service Worker `CORE` URLs.
5. Test live section injection, saving/editing, JSON export/restore, graphs, and offline launch on the target browser. Static checks alone do not prove interactive correctness.


## S7.9 Testing changes

- `studyorbit-features.js`: Test Type Filter options, JEE MAIN fixed-value enforcement, separate Saved Tests tables, and graph grouping are implemented here. The graph calculation routines remain unchanged; existing graph DOM nodes are moved into category drawers after generation.
- `studyorbit-features.css`: styles added only for the new test list headings and analysis drawers.
- `index.html`: visible model label and changed feature asset query version updated.
- `sw.js`: cache identity and changed feature asset URLs updated.
- Startup wiring audit: restored the missing existing S7.8 dynamic entry-form mounting and generated-section helper because the supplied base ZIP referenced them but did not define/execute them. The focused-main-section navigation from the S7.9 reference package was not copied.


## C 1.1 current behavior map

- The summary's Total Chapters modal adds `☑` after completed chapter names only. The Completed Chapters modal adds `🔖 🎗` before a chapter only when every Revision stage, including its ribbon stages, is complete. Chapter Plan dropdowns show only `🎗` when all configured stages (including optional stages) are complete.
- Study consistency is a damped running score, not a count of days above the mean. Its update is `score += 6 × tanh(1.25 × relativeDeviation)`, clamped to 0–100; overall scoring begins with a 4-hour reference, and average vacant-time penalties remain applied. Subject-level scoring starts from the first positive subject-study day at 100 and compares later days to that subject's previous mean.
- `#orbAnalysisOverview` uses the same overall scoring method within the chosen Analysis Window; the dashboard score is all recorded days, so Last 7/Last 30 Days can correctly differ from the all-time dashboard. The small caption now says `Study-hour consistency · selected window`, not the incorrect `Days ≥ average study hours`.
- `#orbStudyCharts` contains an average/consistency line for Daily Study Hours and a table beneath Subject-wise Daily Study Hours. Each Speed & Accuracy graph has an adjacent table strip for accuracy and average time/question.
- Leave Analysis displays the same From/To/Reason/Days entries held in `o.leaves`, matching My Leaves.
- OFF Chapter Plan drawers are hidden and ignore edit events until switched ON.


## C 1.1 additions

- `studyorbit-features.js` renders the page-style Selected Tests panel, pending selection state, Know more! Out Of/Scored panel, and per-graph Show Marking modal.
- Graph series selection controls only which series are drawn. Separate Show Marking selections control numeric labels. Tapped point annotations are temporary graph UI state stored on each canvas element (not in the tracker JSON), and `clearGraphTransientState()` clears them when graph drawers or sections transition.
- Summary Dashboard metric graph annotations are managed by the local `pinnedMetricPoints` set and are discarded when that modal is removed.
- `analysisTable()` and the table-normalization pass ensure numeric readings in percentage-labelled columns display `%`; this is presentation-only and does not alter stored numeric values.
- Global modal close controls are enlarged while `orbit-focus` Back controls are deliberately untouched.
- Current runtime query versions are `v=c110`; `inline0.js` and `inline3.js` remain retained reference copies and are not runtime entry points.
