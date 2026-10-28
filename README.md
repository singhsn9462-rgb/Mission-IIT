# StudyOrbit IIT — C 1.1 (Completed)

C 1.1 is the completed model based on C 1.0, which was built on the accepted S7.9.3 Summary Graph Fit-to-Screen baseline. C 1.0 and S7.x notes below are retained as historical lineage.

StudyOrbit IIT is a static, browser-based study tracker published through GitHub Pages and installable as a Progressive Web App (PWA). Study records are stored in browser `localStorage`; GitHub Pages does not sync them between devices.

## Build lineage

- S7.8 is the next feature release after the corrected S7.7 codebase and retains the S7.6 Math Integrity Fix lineage.
- Existing StudyOrbit sections and the S7.6 Testing/Analysis features are retained.
- Historical S7.9 baseline note: S7.5 creator-credit styling/typography remained preserved and the label was then S7.9. The current C 1.1 visible label is updated in `index.html`.

## Retained Testing/Analysis features and integration fixes

- Adds Testing analysis modes: Selected Tests, All Tests, and Particular Test.
- Adds the requested efficiency, accuracy, marks, subject-contribution graphs and per-graph data-table modal.
- Keeps the two separate subject-entry tables: marks/negative marks and question counts.
- Keeps manual percentile entry optional; blank percentile is not counted as a real percentile observation.
- Normalizes legacy S7.5 test record field names in memory so older saved test entries remain readable.
- Fixes a startup-order bug where `testHTML` referenced `testSubjects` before initialization. That ReferenceError stopped `studyorbit-features.js` before it could inject Leave, Testing, and Analysis sections; the static old layout therefore remained visible under the new header.
- Keeps saved-test edit/delete controls behind the existing settings-style toggle and uses the form for editing instead of sequential prompts.
- At the S7.8 release, aligned the versioned JavaScript/CSS URLs with that release’s Service Worker cache URLs (`v=7802`); the S7.9 release below bumps the feature assets separately.
- Preserves S7.5's no-forced-reload behavior when a new Service Worker takes control.

## To-Do List and S7.8 refinements

- Adds the parchment-style floating To-Do List entry point and 90vw wide, 70dvh tall overlay panel.
- Adds Today's Plan, Pending From Past, completion/deletion actions, daily carry-forward, recent-change Undo, a seven-day History drawer, and aggregate task statistics.
- Saves task records and floating-button position in browser storage. The full JSON export/copy includes To-Do tasks, task-event history, and button position; restoring a backup rebinds the module to the restored state. Undo snapshots are intentionally transient and are not included in backups. This is browser/device-specific and does not automatically synchronize across devices.
- The History drawer shows only completed task names and dates for the latest seven calendar days; event-type labels are excluded. Completion/deletion counts and rates are retained in aggregate data.
- Regularity returns “Not enough data” until at least one task is completed or deleted. It uses bounded per-task scoring; deleted tasks receive a strong penalty plus a capped pending-delay penalty.
- S7.8 restores the original section names except for the explicitly requested Daily Log heading, keeps the requested section order, adds the red glowing NOTE❗ divider box, and updates the visible model label plus Service Worker cache/versioned asset URLs to S7.8 (`v=7802`).

## Files

- `index.html` — app shell, original chapter/stage engine, summary, static sections, service-worker registration, and model/creator header.
- `studyorbit-features.js` — dynamically injects and operates Leave, date-based QB/Revision/Daily Log, Testing, Analysis, graphs, data tables, and saved-record editing.
- `studyorbit-features.css` — feature section layout, responsive tables, modal, graph controls, and Improvement Insights styling.
- `sw.js` — PWA cache install/activation/fetch behavior; Current C 1.1 cache name: `studyorbit-tracker-c110-graph-interaction-1`; earlier S7.9/S7.8 names are historical lineage.
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

## Historical S7.9 baseline verification (not a C 1.0 runtime test)

- The earlier S7.9 baseline recorded ZIP integrity, JavaScript syntax, manifest JSON, internal asset references, CSS/JS-to-Service-Worker URL alignment, and a headless Chromium interaction simulation for Testing and Analysis. These historical checks do not certify the new C 1.0 changes.
- For C 1.0, see the verification notes below: this build’s static syntax, manifest, asset/cache alignment, and 20-file inventory are checked. Live interaction and real-device behavior remain unverified in this environment.

- S7.8 visual refinement: compacted the NOTE❗ divider box and message typography; separated the plain “To DO List” label below the floating parchment icon so the label and icon move as one control; Integrated Question Bank retains only the 🏅 emoji. Asset query version is `v=7802`.


## S7.9 — Test Type Analysis and JEE MAIN Fixed Inputs

- Based directly on the updated S7.8 Compact Note and Floating To-Do Label package.
- Test Type Filter now offers only JEE ADV and JEE MAIN. Analysis data is filtered to the selected type.
- Generated test-analysis graphs are organised into four single-open category drawers in the requested order. Existing graph construction and calculation functions are retained.
- JEE MAIN uses fixed overall values (Out Of 300, 75 questions), subject maxima (100 each), and subject question counts (25 each); fixed input rows/columns are hidden only while JEE MAIN is selected.
- Saved Tests are shown in two tables: JEE ADV first, then JEE MAIN. Existing test edit/delete controls and test-analysis modes remain.
- Updated feature asset query versions to `v=7901` and service-worker cache name to `studyorbit-tracker-s79-test-analysis1`.
- Startup audit note: the selected S7.8 archive was missing the S7.8-era dynamic QB/Daily form mounting, `makeSection`/`analysisHTML`, and Add Leave mounting code referenced elsewhere in the same script. These baseline connections were restored minimally so the existing sections and requested Testing features load; the later S7.9 focused-main-section redesign was not imported.


## C 1.0 — requested tracker completion updates (historical)

- Summary chapter list: `☑` appears after completed chapter names only in the Total Chapters list; the Completed Chapters list shows `🔖 🎗` when that chapter's entire Revision stage set is complete. Chapter Plan lists show only `🎗` when all stages (including optional stages) are complete.
- Summary sublabels are compacted to eligible stage ticks and recorded study-day count only.
- Consistency uses a damped running comparison against the previous recorded average (first overall reference: 4 h), with per-day score movement capped to a smooth maximum of 6 points. Subject consistency starts at 100 on the first positive subject-study day, then compares each subsequent calendar day with that subject's prior average. Subject values marked N/A have no positive subject-study record in the selected window. High vacant-time penalties remain part of the overall Summary/Analysis study consistency score.
- Analysis labels and explanatory boilerplate are compacted; subject-wise hours/consistency and each Speed & Accuracy graph have table-style data strips. Subject Reality Check adds Avg Time/Que and Consistency. Leave Analysis uses the same saved leave periods as My Leaves.
- Chapter Plan drawers marked OFF are hidden and cannot be expanded or edited until switched ON.
- Assets/Service Worker references use `v=c100`; cache is `studyorbit-tracker-c100-completed-1`.

## C 1.0 deployment and verification notes (historical)

- Upload the ZIP's root files into the same GitHub Pages source directory, replacing matching files in place. No files were removed from the 20-file base package.
- `inline0.js`–`inline3.js` are retained source/reference copies and are not loaded by the current HTML shell; `index.html` remains the active chapter engine and `studyorbit-features.js` the active injected Analysis/Leave/QB layer.
- Static syntax, asset/cache version alignment, ZIP integrity and file-count checks are performed for this build. Live GitHub Pages/PWA visual behavior and on-device saved-data regression still require deployment testing.


## C 1.1 — requested graph and test-analysis interaction updates

- Test Analysis: choosing `Selected Tests` opens a page-style selection panel. Checkbox edits remain pending until `Yes Select`; the circular X closes without applying pending choices. The `Select Test` button remains available to reopen the panel.
- `Marks & Accuracy (OVERALL)`: long per-test Out Of text was replaced with `Know more!`, opening a date/type/session table with Out Of and Scored columns. The Particular Test details table renames `% of overall obtained marks` to `Contribution in Total` and lightly highlights the Overall row.
- All feature-analysis graph panels receive side-by-side `Open data table` and `Show Marking` controls. Show Marking allows per-series label selection and only commits after `Select`; closing/crossing cancels. Legend clicks hide/show lines without automatically adding labels.
- Tapped data points on feature-analysis canvas graphs keep their numeric annotations until a tracker drawer/section changes. Summary Dashboard metric graph points similarly retain selected annotations for the lifetime of that graph modal. Transient markings are cleared on drawer/section transitions, not saved to tracker data.
- Percentage-based table columns are normalized to display `%` on numeric readings when not already present. `Contribution in Total` is centered beneath its wrapped heading.
- Feature asset query versions use `v=c110`; Service Worker cache name is `studyorbit-tracker-c110-graph-interaction-1`.
- Static syntax, inventory, asset/cache alignment and archive checks are run for C 1.1. This environment may block browser-driven interaction, so real-device/GitHub Pages verification must be done after deployment.
