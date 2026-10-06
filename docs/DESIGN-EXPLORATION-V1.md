# Design Exploration V1

View `/design-system` with `npm run dev`. This is a development-only specimen sheet, not the homepage. Outside `NODE_ENV=development`, the page calls `notFound()`. Search indexing is disabled in route metadata as an additional precaution.

## Files and boundaries

- `app/design-system/page.tsx` composes the specimens and guards access.
- `tokens.module.css` centralises the exploratory palette, spacing, widths, radii, typography and transition duration. Its variables are scoped to the playground, preserving the starter page.
- `playground.module.css` contains scoped composition, responsive and interaction styles.
- `specimens.tsx` contains small route-local presentation helpers, including vector garment placeholders; none is promoted to the shared UI library yet.
- `specimens-data.ts` supplies explicit mock garment examples and palette labels separately from visual components.

## Temporary decisions

Oswald 600 via `next/font` is the condensed display candidate. Existing Geist and Geist Mono provide body and technical text. Warm off-white, charcoal and square corners are starting points. The lichen accent is optional and used only for the exploration marker; core controls do not depend on it. All tokens, type scales, spacing, layouts and button treatments remain open to revision.

Inline SVG garment illustrations are placeholders, not product photography or production mockups. Garment prices are only the three supplied examples (R199, R249, R399); technical specifications are illustrative. Other prices remain `R___`. “No minimum order” is explicitly labelled as copy awaiting policy confirmation.

## Behaviour and review

Buttons are labelled visual specimens with no commerce actions. Native section links support navigation. CSS supplies hover scale, arrow movement, underline reveal, press feedback and visible keyboard focus. Reduced-motion preferences remove transitions and movement. Tablet layouts use two garment columns and simplified technical callouts; mobile uses one garment column and callouts below the illustration.

Review typography, whitespace, imagery proportions and price hierarchy at narrow, tablet and wide viewport sizes. Inspect keyboard focus, zoom and reduced motion before promoting any treatment into production. No animation dependency, backend, API, cart, checkout or designer functionality is introduced.
