# StudyOrbit IIT — S7.7

StudyOrbit IIT is a static, browser-based study tracker published through GitHub Pages and installable as a Progressive Web App (PWA). Study records are stored in browser `localStorage`; GitHub Pages does not sync them between devices.

## Build lineage

- S7.7 builds on the designated S7.6 Math Integrity Fix base.
- Existing StudyOrbit sections and the S7.6 Testing/Analysis features are retained.
- The S7.5 creator-credit golden glow and existing identity typography are preserved. The S7.7 label is placed at the hero's top-right without a surrounding badge.

## S7.7 changes and integration fixes

- Adds Testing analysis modes: Selected Tests, All Tests, and Particular Test.
- Adds the requested efficiency, accuracy, marks, subject-contribution graphs and per-graph data-table modal.
- Keeps the two separate subject-entry tables: marks/negative marks and question counts.
- Keeps manual percentile entry optional; blank percentile is not counted as a real percentile observation.
- Normalizes legacy S7.5 test record field names in memory so older saved test entries remain readable.
- Fixes a startup-order bug where `testHTML` referenced `testSubjects` before initialization. That ReferenceError stopped `studyorbit-features.js` before it could inject Leave, Testing, and Analysis sections; the static old layout therefore remained visible under the new header.
- Keeps saved-test edit/delete controls behind the existing settings-style toggle and uses the form for editing instead of sequential prompts.
- Aligns the versioned JavaScript/CSS URLs with the Service Worker cache URLs (`v=7701`) and keeps cache cleanup scoped to StudyOrbit caches.
- Preserves S7.5's no-forced-reload behavior when a new Service Worker takes control.

## S7.7 To-Do List addition

- Adds the parchment-style floating To-Do List entry point and 78% overlay panel.
- Adds Today's Plan, Pending From Past, completion/deletion actions, daily carry-forward, recent-change Undo, a seven-day History drawer, and aggregate task statistics.
- Saves task records and floating-button position in browser storage. The full JSON export/copy includes To-Do tasks, task-event history, and button position; restoring a backup rebinds the module to the restored state. Undo snapshots are intentionally transient and are not included in backups. This is browser/device-specific and does not automatically synchronize across devices.
- The History drawer shows event types and dates for the latest seven calendar days; completed task text is not displayed in history. Completion/deletion counts and rates are retained in aggregate data.
- Regularity returns “Not enough data” until at least one task is completed or deleted. It uses bounded per-task scoring; deleted tasks receive a strong penalty plus a capped pending-delay penalty.
- The new model label and Service Worker cache/versioned asset URLs are aligned to S7.7 (`v=7701`).

## Files

- `index.html` — app shell, original chapter/stage engine, summary, static sections, service-worker registration, and model/creator header.
- `studyorbit-features.js` — dynamically injects and operates Leave, date-based QB/Revision/Daily Log, Testing, Analysis, graphs, data tables, and saved-record editing.
- `studyorbit-features.css` — feature section layout, responsive tables, modal, graph controls, and Improvement Insights styling.
- `sw.js` — PWA cache install/activation/fetch behavior; cache name `studyorbit-tracker-s77-todo1`.
- `manifest.json` — app metadata and icon references.
- `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` — app icons.
- `studyorbit-logo.png`, `studyorbit-background.png`, `studyorbit-master.png` — visual assets.
- `inline0.js`–`inline3.js` — retained original project files; not directly referenced by the current HTML shell.
- `CODEBASE-MAP.md` — selector, insertion-order, data-flow, and deployment map.
- `.nojekyll` — disables GitHub Pages Jekyll processing.

## Deployment and data safety

1. Export a JSON tracker snapshot before replacing deployed files.
2. Upload the ZIP's **root files** to the same GitHub Pages source directory, preserving filenames and folder structure.
3. Ensure `index.html`, `studyorbit-features.js`, `studyorbit-features.css`, and `sw.js` are uploaded together. If the feature script is absent or fails before initialization, the static legacy layout can remain visible even though the header looks new.
4. Open the site online once to install the new Service Worker, then reload. If the UI still looks stale, verify the deployed files before clearing site data; clearing site data can delete local tracker records.
5. Test JSON export/restore and offline launch on the target browser.

## Verification status

- ZIP integrity, JavaScript syntax (including inline scripts), manifest JSON, internal asset references, and versioned CSS/JS-to-Service-Worker URL alignment checked.
- Simulated To-Do interactions passed for duplicate names, carry-forward, completion, deletion, Undo, persistence, and state rebinding after restore.
- A headless Chromium DOM run timed out in this environment, so full end-to-end visual/mobile/offline browser testing is **not verified**.
