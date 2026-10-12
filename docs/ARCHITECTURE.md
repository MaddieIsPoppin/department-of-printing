# Application architecture

## Implemented V4.1 boundaries

The foundation proposals below are historical context; the development-only V4 storefront now lives under `app/experience-lab/`. V1/V2/V3 and the starter route remain separate references. V4 was checkpointed at `a5ee09f` before V4.1 refinement.

- `data/products.ts`, `media.ts`, `genres.ts` and `garments.ts` remain the real content registries. No demo records are appended to them.
- `data/demo-products.ts` exports a deterministic generator with explicit source input. Only `/experience-lab/catalogue-preview` imports it at runtime. Removing this route and generator removes the demo capability without changing shopping.
- `features/experience-lab/catalogue-experience.tsx` owns the shared real/demo archive composition. Existing pure catalogue helpers validate URL state and combine filters; route pages supply the dataset.
- `editorial-archive.tsx` and `archive.module.css` render server-side masonry columns with reserved image proportions, native links and lazy images. DOM, reading and keyboard order flow down each column. CSS hover/focus enhancement replaces per-card animation listeners; no catalogue videos or new client dependency is introduced.
- `navigation.ts` supplies header/footer SHOP and CUSTOM destinations. Historical references remain reachable by URL, outside active navigation.
- `lab.module.css` owns V4 colour, gutter, section-space and section-type tokens. Scoped overrides of the existing custom preview use explicit data attributes, leaving historical visual styles intact.
- Existing garment response, print reveal and placement logic remain reused. Hero, collection and product-gallery state stay local; no global store or renderer dependency was added.

The audit deliberately retained historical components rather than consolidating incompatible visual generations. The useful extraction was the shared catalogue experience and navigation, not a replacement design framework. No new dependencies were needed.

## Current foundation

The project uses Next.js 16.3.8, the App Router, React, strict TypeScript, Tailwind CSS 4 and ESLint. Keep the root `app/` structure and existing `@/*` alias. No move to `src/`, template replacement or additional runtime dependencies is needed.

The foundation adds documentation and a documented `components/ui/` location only. Everything described below as future architecture is a proposal, not implemented functionality or a requirement to scaffold empty modules.

## Component and dependency philosophy

Keep `app/` responsible for routing, layouts and composing features. Follow the installed Next.js documentation; use Server Components by default and introduce focused Client Components for interaction where needed. Keep browser-only rendering and eventual server-only integrations behind their appropriate boundaries.

Use `components/ui/` for reusable presentation primitives with small typed interfaces. Keep feature-specific components near the feature that owns them. Extract reusable code when an actual shared responsibility appears; do not build a universal component framework in advance. Avoid giant components, speculative abstractions and a catch-all utilities layer.

Presentation receives data and callbacks; it does not own supplier catalogues, price tables or production rules. Business calculations and validation should be independently testable TypeScript, without depending on React or a particular rendering engine. Feature orchestration connects those rules to UI and data access. Data adapters translate provider-specific formats at the boundary rather than exposing them throughout the application.

## Proposed future modules

Create feature directories only when requested work needs them. A root `features/` directory can eventually group cohesive modules without changing the current route structure.

| Module | Responsibility and boundary |
| --- | --- |
| Marketing | Editorial content and discovery; consumes presentation components without owning commerce rules. |
| Catalogue | Supplier-sourced garment options, colours, sizes and availability; separates product data from its visual presentation. |
| Print Lab | Artwork placement, scaling and print-location selection; produces a portable design description. |
| Pricing | Garment, quantity and print-option calculations shared by previews and order validation. |
| Cart and checkout | Purchase selections and checkout flow; consumes design and pricing contracts without depending on editor internals. |
| Artwork | Upload validation, asset references and eventual storage lifecycle; keeps file handling separate from editing and display. |
| Orders and tracking | Confirmed order snapshots, production progress and customer-facing status. |
| Admin and suppliers | Product/supplier management and production workflows; shares domain rules while keeping administrative UI and access boundaries separate. |
| Data/integrations | Future persistence, storage and external-provider adapters; no provider is selected in this phase. |

The future customer journey is: choose garment → choose colour → upload artwork → position/scale artwork → choose print locations → choose size and quantity → see live pricing → add to cart → checkout → payment → order production.

## Separation of concerns

Ecommerce owns purchase state; Print Lab owns editing state. Exchange a typed design description and garment selection rather than sharing renderer objects or importing each other's internal UI. The admin interface should consume the same product and production rules through an appropriate service boundary, not import storefront pages.

Keep transient interaction state local to the relevant interface. Choose broader state management only when demonstrated cross-feature needs justify it. When a backend is requested, validate authoritative prices, availability and order inputs on the server rather than trusting browser previews. These are future responsibilities, not a reason to add backend infrastructure now.

## Replaceable designer capabilities

A high-quality 2D designer must remain a complete experience even if 3D viewing is added. The eventual canonical design description should express garment/variant references, artwork references, print-location identifiers and placement/scale in documented coordinates independent of canvas or 3D library objects. Define exact units and production constraints when implementing the designer.

Treat 2D and optional 3D as views/adapters over that description. Keep renderer-specific textures, meshes and interaction state inside the relevant adapter. Adding or removing 3D must not change cart, pricing or order contracts; the 2D experience should remain usable if 3D is unavailable.

Future text editing, background removal, AI image generation, multiple print locations and other customisation capabilities should enter through focused operations on supported artwork/design data. Capability-specific dependencies belong with that feature. Avoid hard-coded assumptions that every garment has the same print locations. Introduce concrete interfaces as real capabilities arrive, not an elaborate plugin registry now.

## Validation and deferred decisions

Run `npm run lint` and `npm run typecheck` after meaningful changes. The latter runs `next typegen` before `tsc --noEmit` so the starter's generated `LayoutProps` helper is available on a fresh checkout. Do not manually edit generated Next.js type files. Add focused tests for real business rules and interaction risks when those features exist.

No homepage design, ecommerce flow, backend, database, authentication, payments, artwork storage, admin UI, external API, animation library, canvas editor or 3D implementation is included. Provider choices, final design tokens, editor tooling and application-wide state libraries remain undecided.
