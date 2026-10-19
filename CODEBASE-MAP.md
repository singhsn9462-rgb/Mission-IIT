# StudyOrbit IIT — Codebase & UI Map (S7.4.11)

This is a navigation guide for future targeted changes. It describes source structure and data flow; it is not a substitute for testing the live GitHub Pages deployment.

## Files and responsibilities

- `index.html`: original app shell, original tracker UI, inline CSS, original chapter/stage engine, summary, legacy Question Bank and Daily Log forms, localStorage persistence, snapshot export/import/reset, accordion interactions, and Service Worker registration.
- `studyorbit-features.js`: augments the existing page at runtime. It preserves old Question Bank/Daily Log DOM in hidden legacy containers and adds date-based practice records, subject-wise daily hours, leave management, test tracking, and analytics.
- `studyorbit-features.css`: layout and appearance for dynamically injected feature sections, responsive tables, forms, graphs, drawers, and charts.
- `sw.js`: PWA cache install/activation/fetch strategy. Current release cache: `studyorbit-tracker-v7410`.
- `manifest.json`: PWA name, start URL, scope, standalone display, theme, and icon declarations.
- `README.md`: release/deployment notes.
- `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`: app icons at declared pixel sizes.
- `studyorbit-logo.png`, `studyorbit-background.png`, `studyorbit-master.png`: visual assets; inspect their references before replacing/renaming.

## Main page order and orientation

The visible root page is a single vertically scrolling `<main class="wrap">` with a hero header. Main original sections appear in this order:

1. `#summary` — always-visible summary dashboard; total/completed chapters, progress bar, average study hours, consistency meter.
2. `#chapterPlanSection` — collapsible Chapter Plan; subject selector and dynamically generated Current Chapter, Backlog, Revision drawers. Each drawer has chapter selector, chapter-complete checkbox, stage selector, stage completion checkboxes, and ON/OFF state.
3. `#questionBankSection` — collapsible Integrated Question Bank. Feature JS keeps the old form mounted in a legacy drawer and injects a newer date-based form (`orbQB*` IDs).
4. `#dailyLogSection` — collapsible Daily Log. Feature JS keeps the original cumulative form mounted in a legacy container and injects a newer subject-hours/date form (`orbDaily*` IDs).
5. `#orbLeaveSection` — dynamically inserted after the summary: leave date range, reason, saved leave list/edit mode.
6. `#orbTestingSection` — dynamically inserted Testing section: test date/type/session, overall and subject marks, saved tests, selectable test-analysis charts.
7. `#orbAnalysisSection` — dynamically inserted Analysis section: analysis window, metrics, study/question/subject/speed/task/reality/stage/progress/leave analysis drawers.
8. Original Save / Export Tracker Snapshot card — copy/export JSON, restore JSON, reset local tracker data.
9. Footer/photo credit.

Original accordion sections are collapsed by default except the summary. Dynamically inserted feature sections use `.orbit-section.closed`; clicking their heading toggles the content. Many inner feature groups use native `<details class="orbit-drawer">` drawers. Test subject-mark drawers have an additional one-at-a-time opening behaviour.

## Important selectors for targeted UI changes

### Original page (`index.html`)
- Summary: `#summary`, `#totalChapters`, `#completedCount`, `#percent`, `#progressBar`, `#distribution`, `#medianStudyHours`, `#consistencyPercent`, `#consistencyBar`.
- Chapter planner: `#chapterPlanSection`, `#planSubject`, `#drawers`.
- Legacy Question Bank: `#questionBankSection`, `#qbSubject`, `#qbChapter`, `#qbCategory`, `#qbTotal`, `#qbSolved`, `#qbCorrect`, `#qbTheoryMinutes`, `#qbAvgTime`.
- Legacy Daily Log: `#dailyLogSection`, `#dailySubject`, `#dailyChapter`, `#dailyDate`, `#dailyExercise`, `#dailySolved`, `#dailyTheoryMinutes`, `#dailyTime`, `#dailyRevision`, `#dailyHW`, `#dailyNote`, `#dailyDoubts`.
- Backup/restore: `#copyAll`, `#exportJSON`, `#importJSON`, `#restoreJSON`, `#resetTracker`.
- Original state and persistence: `STORE`, `defaults()`, `load()`, `merge()`, `persist()`, `snapshot()`, restore handler, `renderSummary()`, `renderDrawers()`.

### Dynamically injected features (`studyorbit-features.js`)
- Exercise Question Bank: `#orbQBSubject`, `#orbQBChapter`, `#orbQBExercise`, `#orbQBDate`, `#orbQBSolved`, `#orbQBRepeat`, `#orbQBCorrect`, `#orbQBTime`, `#orbQBTheory`, `#orbQBSave`, `#orbQBList`.
- Revision Tracker: corresponding `orbRev*` IDs.
- Daily subject hours: `#orbDailySection`, `#orbDailyDate`, `#orbDailyMathsHours`, `#orbDailyPhysicsHours`, `#orbDailyPCHours`, `#orbDailyOCHours`, `#orbDailyIOCHours`, `#orbDailySave`.
- Leave management: `#orbLeaveSection`, `#orbLeaveFrom`, `#orbLeaveTo`, `#orbLeaveReason`, `#orbLeaveSave`, `#orbLeaveList`.
- Tests: `#orbTestingSection`, `#orbTestDate`, `#orbTestType`, `#orbTestSession`, `#orbTestScore`, `#orbTestMax`, `#orbTestSave`, `#orbTestList`, `#orbTestCharts`.
- Analytics: `#orbAnalysisSection`, `#orbWindow`, `#orbAnalysisOverview`, `#orbStudyCharts`, `#orbQuestionCharts`, `#orbSubjectCharts`, `#orbSpeedCharts`, `#orbTaskCharts`, `#orbRealityCharts`, `#orbStageTable`, `#orbProgressReport`, `#orbLeaveCharts`.

## Data flow and persistence

- Original state is stored under localStorage key `teraJEEAdvancedTracker_v3_51chapters` with state `version: 3`.
- New feature data lives under `state.orbit`; `ensure()` supplies missing containers for `daily`, `qb`, `rev`, `tests`, `leaves`, and `start`.
- `persist()` writes the whole state object to localStorage. Feature `save()` calls `persist()` then `renderAll()`.
- `snapshot()` exports original state plus `orbit` into a JSON snapshot. The restore handler validates core structure and migrates older chapter/stage key formats before applying state.
- Browser localStorage is device/browser-origin-specific; GitHub deployment does not sync user data. Export JSON before releases and test restoring a copy.
- Service Worker cache and localStorage are separate systems. Updating cached HTML/JS does not inherently migrate or erase localStorage records.

## Core function map

- Original planning: `chaptersFor()`, `stagesFor()`, `completionInfo()`, `renderDrawers()`, `renderSummary()`.
- Original question/daily: `getQB()`, `loadQB()`, `loadDaily()`, `syncDailyFromUI()`, daily submit handler.
- Snapshot/persistence: `load()`, `merge()`, `persist()`, `snapshot()`, export/restore/reset handlers.
- Feature setup: `ensure()`, `makeSection()`, `initStage()`, `refreshStage()`, `loadStageDate()`.
- Feature records: `renderDaily()`, `loadDay()`, `renderLeaves()`, `renderTests()`.
- Analytics: `activity()`, `effectiveDates()`, `analysisTargets()`, `dataFor()`, `points()`, `consistency()`, `renderAnalysis()`, `renderReality()`, `renderStageTable()`, `renderNewAnalytics()`, `renderAll()`.
- Graph engine: `graph()`, `drawGraphs()` and canvas interaction handlers.
- RACE fixed totals: `RACE_LIMITS`, `raceFixed()`, `raceStages()`.

## Change-safety rules

1. Before editing, identify whether the visible control belongs to the original form or the injected feature form; some old forms are intentionally preserved but hidden.
2. For UI changes, inspect both HTML-generated markup and CSS selectors. Feature sections are created in JS, not present as static HTML in the source file.
3. For data changes, preserve the existing localStorage key and state schema unless a deliberate migration is designed and tested.
4. For analytics changes, distinguish stored event date from any leave-adjusted analytical attribution date.
5. For RACE changes, inspect stage generation, fixed totals, total validation, and revision stage options together.
6. For PWA changes, keep Service Worker cache URLs aligned with the exact asset query strings in `index.html`; delete only project-owned caches.
7. Test backup/export/restore and offline launch after each relevant change. Syntax checks alone do not prove UI correctness.


## S7.4.11 UI update
- Integrated Question Bank form: Subject, Chapter, Exercise/PYQ Category, Practice Date, attempted/repeated/correct counts, solving time, and theory time are rendered as table rows. Existing IDs and event-driven data logic are retained.
- Testing form: test metadata uses label/input table rows; Maths, Physics, and Chemistry marks use a subject/score/out-of table. Saved Tests and Test Analysis drawers are unchanged.


## S7.4.11 cache/update hardening
- Service Worker uses `studyorbit-tracker-v7410`, revalidates app-shell files, and keeps offline cache fallback.
- Activation removes prior caches with the StudyOrbit cache prefix only.


## S7.4.11 update handling
- Service Worker update checks bypass the browser HTTP cache for the worker script.
- App-shell HTML/JS/CSS/JSON requests use network-first with cached offline fallback.
- Static images and icons remain cache-first for faster repeat loads.
- Existing localStorage study data is not cleared by this update code.


## S7.4.11 — Daily Log table layout
Daily Log entry fields are arranged in the shared two-column table style. Testing subject-score columns use equal widths for symmetry.


## S7.6 additions
- Test records now include manually entered percentile, negative marks, overall and subject question counts, and inline edit/delete actions.
- Test analysis includes selected/all/particular modes, efficiency calculations, subject comparisons, data-table modal controls, and legend-series visibility controls.
- Numeric blanks normalize to zero on save; metrics with invalid denominators are treated as unavailable rather than penalized.
- Header model label updated to S7.6 and service-worker cache namespace bumped.


## S7.6 correction pass
- Creator credit border styling is restored to the S7.5 gold glow.
- Test subject inputs are rendered as two separate tables (marks/negative marks; question counts).
- Test Analysis uses saved-test-only short date labels, preventing calendar holiday markers and gap connectors from being applied to test points.
