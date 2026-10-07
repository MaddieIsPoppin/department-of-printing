# Design Exploration V2

## Current refinement: garment film, clear choices and resolved scenes

Open /design-experiments with the development server running. This remains a development-only, noindex experiment. V1 and the homepage are unchanged. No dependencies or commerce services were added.

### Hero film and asset inspection

The supplied ratio-hoodie-hero.webm was inspected before integration. Despite its filename, it depicts a rotating black short-sleeve tee, not the Ratio hoodie. It is 2676 x 1588, approximately 2.7 MB, with an opaque charcoal background. The UI identifies it as a black tee form study.

One video instance forms the opening composition. Its charcoal is continued across the hero, with object-fit cropping and responsive object-position. It has autoplay, muted, loop and playsInline, with no native controls or CSS perspective on the film. An extracted first-frame JPEG supplies the loading fallback. A compact pause/resume button supports visitors who do not want continuous motion. IntersectionObserver, document visibility and reduced-motion preference pause playback when appropriate.

The headline uses the deliberate four-line WEAR / WHAT YOU / CAN / IMAGINE structure. Mobile uses a separate vertical composition and crop. No simulated recolouring or invented hoodie footage was introduced.

Ratio BLACK / WHITE remains in the first collection study, with its original selection, inversion and restrained settling pointer response. Black is front-view; white is back-view. It is not presented as one rotating garment.

### Spacing and collection rhythm

The persistent registration grid and marks still connect the page. Scene padding now uses one responsive spacing token. Faith, Growth and Study use contained layouts; garments no longer extend backwards into neighbouring scenes.

- Ratio: a contained interactive colour/view study, following the collection introduction.
- Faith / A Little Goes a Long Way: a small crop of the actual supplied artwork sits beside a full finished hoodie. The detail/result relationship gives the phrase a visual purpose. The crop is not fabricated artwork.
- Growth / Take Up Space: the garment dominates a broad column while smaller typography and a quieter action occupy their own space. Mobile stacks the heading and garment.
- Study: retains the existing typography-led idea, with the sweatshirt contained alongside it.
- Lab introduction: heading and garment occupy separate columns, then stack on mobile. The mini Lab follows after a clear gap rather than sitting beneath an overlapping garment.

Links remain prototype navigation, not checkout or real product pages.

### Choose Your Canvas and Wear It

Choose Your Canvas now shows a tee, hoodie and sweatshirt together, each labelled. The same composition is available in both the desktop enhanced sequence and the mobile/static version. Copy explicitly says the supplied images show finished examples, not blank product photography.

Wear It has a separate left-hand headline and right-hand sweatshirt on desktop. Detailed garment artwork is no longer covered by the headline. Mobile gives the headline, copy and garment sequential space.

The existing 280svh desktop process sequence remains. It still uses brief changes of state and one enlargement to reveal print detail, without reinstating arbitrary garment drift. Reduced-motion and mobile layouts remain unpinned.

### Not Just A Blank: garment explorer

The route-local GarmentExplorer uses data from garment-studies.ts and server-rendered garment slots. TEE, HOODIE and SWEAT buttons update the visible render, garment name, description and detail list. Native buttons support mouse, keyboard and touch, visible focus and selected-state semantics. Updates use a short opacity transition and a polite live region.

Data describes only verifiable imagery: garment type, elevation, colour shown and artwork study. The former illustrative 240 GSM, 100% cotton, relaxed fit and DTF-ready claims have been removed. Supplier-dependent fabric, fit, print methods and colour ranges are explicitly awaiting confirmation.

The data-driven list can accept future categories once real assets and details exist. No fake cap, tote or other product imagery is shown.

The existing MiniPrintLab remains a local sample-overlay teaser: drag, scale, rotate, keyboard positioning, touch position buttons and reset. Nothing is uploaded or saved.

### Implementation

New files:
- hero-film.tsx and hero-film.module.css
- garment-explorer.tsx and garment-explorer.module.css
- garment-studies.ts
- public/garments/ratio-hero-poster.jpg, extracted from the supplied video

Updated route composition, collection and process components, local styles, interaction presentation and motion setup. The source WebM and six transparent PNGs remain unchanged. The original black Ratio PNG filename includes a space before .png.

### Browser review and checks

Chrome desktop (1440 x 900) and mobile (390 x 844) passes traversed the full experience and captured the hero, Ratio, Faith, Growth, Study, Canvas choices, Wear It, explorer and Lab. A stylesheet encoding issue that prevented the new outer padding/background rules from applying was found and corrected; the corrected hero and explorer were rechecked at both widths.

Checks confirmed one muted inline video, advancing playback, no native controls, manual pause/resume, offscreen pause and reduced-motion pause. Actual mouse and keyboard category activation and mobile touch selection changed the correct garment and details. Ratio selection and Mini Lab drag, scale, rotation and keyboard reset passed. An initial synthetic Enter test lacked its keypress text; correcting the browser test verified keyboard selection. No application runtime errors or horizontal mobile overflow were observed.

Lint, typecheck and git diff --check pass. V1 and homepage files are unchanged. Physical devices, other browser engines and a production build were not tested.

### Useful next assets

A genuine Ratio hoodie motion render with a deliberate loop and matching neutral background; clean front/back blank tee, hoodie and sweatshirt renders; matching artwork-only exports for editorial details; verified supplier specifications. None is required for the current prototype to work.
