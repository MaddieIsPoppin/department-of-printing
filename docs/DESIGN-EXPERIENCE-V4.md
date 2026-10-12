# V4: Experience Lab

## V4.1 refinement

Completed V4 is recoverable at `a5ee09f` on `design/v4-experience-lab`. V4.1 adds bounded responsive stages, smaller secondary display type, an intentional tablet stack and a separate 40-item development archive at `/experience-lab/catalogue-preview`. Both real and demo V4 catalogues use the editorial masonry component; the real dataset and historical routes are unchanged.

The archive uses one to five CSS columns, with two compact columns on standard phones. Reading and keyboard order run down each column. Fixed-ratio image plates prevent image-loading shifts, vary deterministically, and keep product information visible. No masonry measuring script, per-card scroll effect or catalogue video is used. The supplied attachment contained no Pinterest screenshot; the written density/proportion direction guided the implementation.

V4.1 checks: lint, typecheck, six Node tests and production build passed. Chromium emulation covered landing, catalogue, demo archive, Ratio detail and custom printing at 1920×1080, 1440×900, 1366×768, 1024×768, 768×1024, 390×844 and 360×800. Checked overflow, loaded media, combined filters (eight faith/hoodie demo matches), empty-state recovery, source-product links, back navigation and reduced motion. No captured runtime errors. Physical devices, other browser engines and formal performance profiling remain outside these checks.

## Review and preservation

Branch: `design/v4-experience-lab`. The branch was clean and already existed when this iteration began. V3.2 checkpoint: `0c3a2535f530300d21c9318871f3ff2a4ec376d9`, annotated tag `checkpoint/v3.2-before-v4`, pushed to origin. V4 implementation is left in the working tree for review; it has not been merged or deployed.

Run `npm.cmd run dev` on Windows (or `npm run dev`) and visit:

- http://localhost:3000/experience-lab
- http://localhost:3000/experience-lab/catalogue
- http://localhost:3000/experience-lab/product/ratio
- http://localhost:3000/experience-lab/custom

These are development-only, noindex routes, consistent with the earlier explorations. The starter homepage, V1, V2, V3 routes and shared product data remain unchanged.

## Direction and interactions

The live opening and scrolled composition of [SANTAL](https://santalarch.com/) were inspected in Chrome. V4 interprets its oversized typography, architectural registration lines, controlled whitespace and strong scene contrast through garment photography and printing references. No reference source code or copy was imported.

The Ratio opening combines outlined display type, immediate black-front/white-back switching, scene inversion and restrained pointer response. These assets are distinct design studies, not confirmed purchasable colour variants. The featured collection presents an indexed exhibition with selectable pieces and previous/next controls.

The first featured piece reuses the continuous print-detail-to-whole-garment reveal: one image changes scale and framing during a short section of ordinary scrolling. This is the coherent crop alternative to an artwork-only transformation; there is no fabricated flat artwork asset or 3D model. No pinned sequence or synthetic scroll height was added.

Catalogue genre and garment filters keep their combined URL state, counts and native navigation. Product pages add explicit alternate-image selection, detail inspection, genre links and related pieces. The custom preview reuses garment selection, sample artwork, mouse/touch dragging, keyboard positioning, scale, rotation and reset. Nothing is uploaded or saved.

Motion uses existing GSAP with scoped cleanup, brief CSS entrances, native route navigation and reduced-motion fallbacks. The V2 interaction work is reused through the established storefront components rather than modifying the V2 route.

## Implementation map

- `app/experience-lab/`: isolated layout, landing, catalogue, custom, product and missing-product pages.
- `features/experience-lab/`: hero, collection stage, product gallery, scoped motion and visual styles.
- `features/storefront/catalogue-grid.tsx`: optional route prefix; default V3 links unchanged.
- `features/storefront/custom-teaser.tsx`: optional custom destination; default V3 destination unchanged.
- Shared product/media/genre/garment data, image rendering, print reveal, pointer response, registration frames, filtering and placement calculations are reused.

No dependencies were added.

## Verification

- `npm.cmd run lint`, `npm.cmd run typecheck` and `npm.cmd run build` passed.
- Existing tests run directly with `node --experimental-strip-types --test tests/catalogue-filters.test.mjs tests/print-placement.test.mjs`; there is no npm test script.
- Chrome review at 1440 x 900 and 390 x 844: full landing scroll, Ratio switching, featured selection, combined filters, empty result, product views/detail inspection, custom preview and route navigation.
- Actual keyboard switching and touch switching/dragging checked; scale, rotation and reset checked. Back/forward preserved the filtered URL. JavaScript-disabled filtered catalogue rendered one matching product with no broken loaded images.
- Reduced motion disabled entrance animation and print transform. No horizontal overflow or captured console/runtime errors in the reviewed flows.
- Prior routes returned 200, unknown V4 product returned 404. Git comparison confirmed the homepage, historical route directories and data were unchanged.
- Browser review caught and corrected invisible outline lettering, overly cropped desktop hero imagery and an overlapping mobile caption.

## Limits

Prices, availability, sizes, colours and contact configuration remain unconfirmed where the source data says so. There is no checkout, backend, upload, saved design or full editor. Detail inspection magnifies existing imagery. Production builds succeed but experimental routes intentionally remain unavailable outside development. Browser checks used Chromium emulation, not physical mobile devices or a cross-browser lab; no formal performance score is claimed.
