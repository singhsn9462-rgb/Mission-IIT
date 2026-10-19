# StudyOrbit IIT S7.4.11

Static, browser-based study tracker published with GitHub Pages and installable as a Progressive Web App (PWA). Application records are stored locally in the browser; publishing files to GitHub does not synchronize study records between devices.

## S7.4.11 form-layout update
- Integrated Question Bank selectors and practice inputs now use compact label/input tables.
- Testing metadata and subject-wise marks now use table-based forms while preserving existing element IDs and save logic.
- Added responsive table-form styling for narrow mobile screens.
- Updated stylesheet/script query versions and Service Worker cache to `v7410`.

## V7.4.7 maintenance changes
- Aligned feature stylesheet and JavaScript query-string versions to `v=747`.
- Scoped Service Worker cache cleanup to StudyOrbit-owned cache names so unrelated origin caches are not deleted.
- Cached the exact versioned CSS/JavaScript asset URLs used by `index.html` to improve offline cache matching.
- Added snapshot root, version, section-type, and core-section validation before restoring tracker data.
- Resized app icons to the dimensions declared by the web app manifest and optimized PNG encoding.
- Preserved the existing tracker state format and existing features; no storage key or data schema version change was made.

## Data safety and deployment
1. Export a JSON tracker snapshot before deploying any update.
2. Test the extracted root files on a test GitHub Pages repository before replacing production.
3. After deployment, open the site online once so the current Service Worker can install and cache its core resources.
4. Test app launch, offline launch, JSON export, and JSON restore on the target Android browser.

The application uses browser `localStorage` for saved records. Clearing browser/site data can remove those records. A GitHub Pages update does not automatically upload or sync them.

## Verification status
- ZIP archive integrity verified.
- Inline and external JavaScript syntax checked with Node.js.
- Manifest JSON parsed successfully.
- Icon pixel dimensions aligned with manifest declarations.
- Full interactive Android browser testing has not been performed in this environment.

## S7.4.11 safer update handling
- Bumped app asset versions and the Service Worker cache name.
- App-shell requests use a reload/revalidation fetch strategy, with cached fallback for offline use.
- Old StudyOrbit-prefixed caches are cleaned on activation; browser localStorage study records are not touched by this code.


## S7.4.11 update handling
- Service Worker update checks bypass the browser HTTP cache for the worker script.
- App-shell HTML/JS/CSS/JSON requests use network-first with cached offline fallback.
- Static images and icons remain cache-first for faster repeat loads.
- Existing localStorage study data is not cleared by this update code.


## S7.4.11 — Daily Log table layout
Daily Log entry fields are arranged in the shared two-column table style. Testing subject-score columns use equal widths for symmetry.


## S7.5 release notes (2026-10-19)
- Built from the S7.4.15 foundation.
- Added manual percentile and test question-count fields, subject negative-mark/question-count tables, My Tests management, session filtering, and test-analysis charts.
- Removed forced page reload on Service Worker controller changes to reduce old-UI/new-UI flashes during updates.
- Test data remains in this browser's existing localStorage store; export a JSON backup before restoring large snapshots.
