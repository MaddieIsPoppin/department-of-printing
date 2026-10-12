# Department of Printing storefront V3

## V3.2 — interactive form and print reveal

This pass extends the uncommitted V3.1 work on `feature/v3-visual-system`; it preserves the archive, filters, product facts and four-act composition. No asset, dependency, route or major section was added. No GLB/glTF exists in the supplied assets.

1. **Hero:** `MotionFilm` now optionally seeks real turntable frames with eased pointer input, then resumes normal playback after settling. Explicit left/right buttons pause at the chosen view and support touch/keyboard. The film is not CSS-tilted or described as live 3D. `HeroHeadline` adds a single print-registration impression that aligns on hover/focus/activation; text and navigation stay in place.
2. **Featured collection:** `PrintReveal` adapts V2's artwork-detail enlargement into a continuous crop-to-garment transform on the same Growth render. Focal coordinates live in media data. The normal scroll crosses roughly 73% of a viewport; there is no pin or extra scroll spacer. Shopping controls remain usable, and selecting a product cancels the enhancement. Reduced motion and missing enhancement show the finished garment.
3. **Archive/product:** reuse GarmentResponse inside existing catalogue links; distinct alternate media reveals through a short mask. The product media entrance echoes that mask. This is a restrained routing fallback, not a true shared-element transition; browser history and native links remain intact.
4. **Custom:** preserve the existing drag/scale/rotation/reset component and bounds math. Adapt V2's four position buttons for accessible touch alternatives and expose the sample area while editing. Clarify that only the tee render is blank and the result is not a production specification.

V2 reuse: pointer frame coalescing/idle settling, scoped GSAP matchMedia cleanup, the zoomed artwork-to-finished-garment idea, registration aesthetics and MiniPrintLab direction controls. V1/V2 source remains unchanged.

Validation: lint, typecheck, all five existing tests and production build passed. Chrome at 1440×900 and 390×844 covered hero pointer/frame changes, settling, button/keyboard/touch turning, headline activation, crop/intermediate/resolved scroll states, featured selection, Ratio catalogue masking, product navigation and history, combined filters, mouse/touch artwork movement, scale/rotation/reset and reduced motion. No horizontal overflow, runtime errors or non-input layout shifts were observed in the measured full desktop scroll. One redundant zero-distance video seek was fixed during review. Final interaction checks ran after the build completed to avoid development refreshes interrupting state.

Files in this pass: `data/media.ts`, `data/products.ts`; new `features/storefront/hero-headline.tsx` and `print-reveal.tsx`; updated `motion-film.tsx`, `hero-campaign.tsx`, `featured-products.tsx`, `catalogue-grid.tsx`, `catalogue.module.css`, `custom-teaser.tsx`, `storefront.module.css`; this document and `CONTENT-GUIDE.md`.

Remaining refinement: assess seek/decode smoothness on physical mobile devices and slower hardware. A shorter-keyframe turntable export may improve seeking further. A genuine artwork-only source could make a future print reveal flatter at its starting point; the current detail deliberately retains the real fabric texture. Other browser engines and physical devices were not tested. No additional dependencies were installed.

## V3.1 — technical visual system and design archive

Implemented on `feature/v3-visual-system`, branched from the committed V3 checkpoint `b79ed29`. The unrelated ZIP and V1/V2/original homepage are untouched.

- The four-act structure remains. A CSS entrance assembles the identifier and masked headline before settling the hero film, within 750ms. It starts with the server-rendered composition, reserves all space, and never blocks navigation. Reduced motion removes it. Return visits use the same short entrance, not a prolonged splash sequence.
- V2's persistent registration-grid idea now supplies a large modular axis, horizontal divisions, crop marks and a quiet studio annotation. Existing scoped GSAP movement connects scenes without pins. Shared RegistrationFrame components frame the hero, featured garment, custom sample and product detail; mobile reduces grid density.
- GarmentResponse adapts V2 GarmentPlayground's requestAnimationFrame coalescing, fine-pointer/reduced-motion checks, two/four-degree movement and 650ms settle. It enhances still featured/product imagery only. Video remains the sole hero subject; no duplicate videos or new dependencies were introduced.
- The catalogue is a design archive: editorial heading, two independent filter rows, result count, stable source-order display references and a two-large/three-smaller desktop rhythm. Tablet uses two columns; mobile uses one. Product names, garment labels, pricing and availability remain visible. Existing distinct imagery supplies hover/focus alternates, with additional views on the product route for touch users.
- `data/genres.ts` defines stable typed IDs/labels; every product carries a genres array. Both dimensions intersect through server-rendered query links. Invalid/repeated parameters reset only that dimension, combinations with no results have clear recovery, and genre links on product pages return to the archive. Price, stock and supplier information remain unverified rather than invented.

Validation: lint and TypeScript passed; all five Node tests passed. Production build passed after allowing the existing Google Font downloads (the sandboxed attempt could not fetch them). Desktop 1440×900 and mobile 390×844 Chrome checks covered full storefront scrolling, archive/product/custom navigation, genre+garment combinations, empty results, one video, reduced motion, and horizontal overflow. The stale dev-server font fallback was corrected by restarting with network access; final visual review used the actual typefaces. A mobile frame-label overlap with the pause control was removed. Existing V1/V2/homepage routes returned 200 and their source remains unchanged. The development-only guard still intentionally excludes storefront routes from production use; build success is not publication.

Physical-device and other-browser checks remain future work. Real prices, available variants and the actual enquiry destination are still needed. See CONTENT-GUIDE.md for data, filters and visual tokens.

Additional checks verified actual keyboard filter activation, a combined filter without JavaScript, Ratio hover alternate imagery, pointer movement and idle reset, and mobile product framing. No browser runtime errors were reported.

Files for this pass: `data/products.ts`, new `data/genres.ts`; catalogue and product route pages; storefront `catalogue-grid.tsx`, new `catalogue-filters.ts` and `catalogue.module.css`; new `registration-frame.tsx` and `garment-response.tsx`; `hero-campaign.tsx`, `featured-products.tsx`, `custom-teaser.tsx`, `store-motion.tsx`, `storefront.module.css`; new `tests/catalogue-filters.test.mjs`; this document and `CONTENT-GUIDE.md`.

## Preservation and routes

Work began on the already-existing, active `feature/storefront-v3` branch. The working tree was clean and V2 was committed as `4195d49` (Complete V2 interactive design exploration). No V2, V1 or homepage files are modified by V3.

Routes share the isolated `app/(storefront)/` layout:

- `/storefront-v3`: four-act shopfront.
- `/catalogue`: product index with URL-based garment filters.
- `/product/[slug]`: reusable product-detail template and missing-piece state.
- `/custom`: service introduction, creation teaser and configurable enquiry action.

The route group does not alter URL paths. Its layout supplies the common font, navigation, footer, noindex metadata and development-only guard. The original `/` and `/design-experiments` remain separate.

## Four acts and visual hierarchy

1. **Look what's possible:** one moving tee, one anchored headline, two understated paths to shop or custom printing. Opaque video shares its charcoal with the surrounding campaign. No CSS rotation is added to the footage.
2. **Shop what we made:** four featured products, one dominant render at a time. Product name, garment type, price state and detail link stay in a consistent information column. Direct selection or previous/next controls trigger a short garment reveal; there is no automatic carousel or pinned scroll.
3. **Or make something we haven't:** a simple tee/hoodie/sweatshirt selector and add/move sample-artwork moment lead to custom printing as a service. The tee still is genuinely blank; existing finished hoodie/sweatshirt imagery is labelled as such.
4. **Make something that doesn't exist yet:** a typography-led finale with only shop and custom paths, followed by a compact shared business footer.

V2's independent slogans and process stages are not copied as chapters. Their ideas become product taglines, garment choice, and a brief custom service explanation. V2 itself remains intact for comparison.

## Content architecture

`data/products.ts` defines `Product`: slug, name, tagline, garmentType, collection, nullable price, currency, featured, nullable availability, verified colours/sizes, media and description. It also centralises price and availability presentation and slug lookup.

`data/garments.ts` defines real garment categories. `GarmentType` derives from that list, and catalogue filters only include categories represented by product data.

`data/media.ts` centralises image paths, dimensions and alt text. Product media supports cover, front, back, details, optional video and optional future model. Existing large assets are referenced in place. A front-facing JPEG extracted from the supplied tee film provides the blank creation canvas.

`data/site.ts` holds brand information, hero content/media and the nullable custom contact configuration. No fake price, verified inventory, supplier specification or contact destination is supplied. Previous V1 sample prices are not treated as verified prices.

The owner-facing instructions are in `docs/CONTENT-GUIDE.md`.

## Reusable UI and boundaries

`features/storefront/` owns focused shared storefront components:

- Header/Footer: consistent navigation and business identity.
- HeroCampaign/MotionFilm: native film presentation and playback lifecycle.
- ProductMedia/GarmentImage: optional video and image rendering with source-aware framing.
- FeaturedProducts: local selection state, predictable shopping information and direct transitions.
- CatalogueGrid: server-rendered product index with image hover/focus treatment.
- CustomTeaser: local garment/sample state and bounded pointer/keyboard placement.
- ContactAction: configured outbound enquiry link or explicit disabled preview state.
- FinalCTA: two-path finale.

Media lifecycle, direct interactions and the shared StoreMotion enhancement are client components. Catalogue filtering is server-rendered from async searchParams; links work without JavaScript and preserve browser navigation. Product pages await async params, handle unknown slugs with notFound, and suppress duplicate cover/additional images. No provider SDK is involved.

CSS is scoped to the storefront. The presentation uses paper, ink, muted olive, condensed type, fine rules and restrained registration/index marks. The motion integration pass uses the already-installed GSAP for a twelve-pixel registration-grid shift through each scene and short heading-rule entrances. Nothing is pinned, and content remains visible if enhancement fails. Reduced-motion preferences remove transitions and pause video.

## V2 motion integration

V2 MotionStage supplied the scoped matchMedia, async disposal and cleanup pattern for StoreMotion. Its technical environment now connects all four acts with the same restrained registration treatment. Navigation triggers a 280ms registration-line reveal; it never intercepts links or delays content. Shared header/footer routes stay within V3, catalogue, custom and product pages.

FeaturedProducts adapts V2's brief garment handoff into directional CSS exit/entry animations: 180ms exit and 400ms entrance with an 80ms overlap delay. Product information stays in its established column. The outgoing media is a still, so transitions do not duplicate video instances. Rapid selection replaces the outgoing layer, and animation completion removes it.

CustomTeaser adapts V2 MiniPrintLab's placement type, initial state, rotated-square constraint and partial placement updates in `print-placement.ts`. Existing V3 pointer/touch and keyboard placement remain; size, rotation and reset controls sit below the garment. The artwork is explicitly square so its rendered dimensions match the constraint math. No V2 component is imported wholesale or modified.

Ratio colour switching and extra hero pointer motion were not added: featured selection, existing catalogue hover/focus and the creation sample provide direct interaction without competing with the hero film. Full outgoing-page masks and a production editor remain later work.

## Commerce and 3D extension points

Product records can later come from a CMS or commerce adapter while preserving the presentation contract. Authoritative price, inventory, variant and order validation will belong on the future backend. The current availability field is display content only, not inventory management.

The media contract accepts `model` paths for future GLB/glTF support. Current components intentionally ignore that optional field and remain fully functional with images. A future renderer can consume it without making core shopping dependent on WebGL.

The custom action opens a configured email or HTTPS channel only after it is supplied. It does not send automatically, persist a brief or imply an order has been accepted. The mini interaction saves and uploads nothing.

## Verification and limits

The V2 motion integration was reviewed in Chrome at 1440×900 and 390×844, including a complete scroll at each size, all featured selections, desktop drag, mobile touch placement, native size/rotation controls and reset. Link clicks covered storefront → catalogue → product and storefront → custom → storefront. There was one video, no V2 navigation links, and no horizontal overflow. A rendered-size mismatch at maximum rotation/scale was corrected and the boundary case rechecked. Reduced motion removes garment animation and pauses film; the focused browser check reported no runtime errors. Lint, typecheck and two placement tests passed. Tests use Node 24's built-in TypeScript support (`node --test tests/print-placement.test.mjs`); Node emits a harmless module-type detection warning.

Lint and typecheck pass. Chrome desktop and mobile reviews covered the full V3 flow, all featured products, navigation, catalogue filtering, product links, custom page and final actions. No browser errors or horizontal overflow were observed in that pass. Reduced motion pauses the film. Browser review prompted a shorter catalogue introduction and moving creation controls next to the garment so mobile visitors can see their effect.

The follow-up check verified desktop drag, keyboard placement, mobile touch placement, all five product routes returning 200, and an unknown slug returning 404. The sweat filter still returned the correct single product with JavaScript disabled. Git comparison against the V2 checkpoint confirmed the old homepage, V1 and V2 files are unchanged. No production build or deployment was performed.

Only one hero video is instantiated; offscreen and background-tab playback pause. Catalogue thumbnails stay image-based even when product videos are later added. Native images use Next.js optimisation; below-fold imagery is lazy.

Database, inventory backend, authentication, cart, checkout, payments, uploads, saved designs, production artwork editing, live 3D and deployment are intentionally unimplemented. Physical devices and other browser engines require a later compatibility check. Real prices, options, availability, contact information and supplier specifications are still needed before launch.
