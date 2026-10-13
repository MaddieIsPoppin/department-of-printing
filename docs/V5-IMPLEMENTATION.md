# V5 unified application — implementation and launch handoff

## Branch and recovery

Work stays on `feature/v5-unified-launch`. The V4.1 baseline is `a7006b4`; staged studio work was committed as `225ccc3` before integration. No historical branches were merged, no production branch pushed, and nothing was deployed.

## Authoritative routes

| Route | Purpose |
| --- | --- |
| `/` | Promoted V4.1 Ratio opening, featured exhibition and interactive custom teaser |
| `/catalogue` | V4.1 editorial masonry with real products and combined genre/garment filters |
| `/product/[slug]` | V4 gallery, description, options, quantity, bag/enquiry action and related pieces |
| `/custom` | Custom printing introduction, studio entry and quotation form |
| `/custom/studio` | Existing local 2D editor and experimental 3D texture test, in the public shell |
| `/about` | Business positioning and the two customer paths |
| `/contact` | General or product-specific enquiries and configured contact channels |
| `/cart` | Persistent shopping bag, quantities, totals and order enquiries |
| `/policies` | Explicitly pending owner-approved policies and factual handling information |
| `/api/enquiries` | Validated server-side enquiry recording and notification |

`/custom/studio-preview` redirects to `/custom/studio`. V1 `/design-system`, V2 `/design-experiments`, V3 `/storefront-v3` and V4 `/experience-lab/*` remain development references, outside public navigation. The V3 page and layout moved together into `app/(legacy)` so their old shell does not govern V5. The former starter homepage is recoverable in Git; the public homepage is now V4.1. The expanded demo archive remains development-only under `/experience-lab/catalogue-preview`; it never becomes inventory.

## Design and component boundaries

V4.1 remains authoritative: `features/experience-lab/lab.module.css` supplies brand tokens, bounded layouts, display type, stage compositions and motion easing; `archive.module.css` supplies the editorial archive. Reusable V4 components now accept route-prefix props with defaults preserving the historical exploration. No parallel copy of the hero/archive was introduced.

`features/site/` supplies the unified shell, navigation configuration, responsive accessible menu, footer, bag link, shared control/form styles and information-page layouts. `app/(storefront)` composes all public routes with this shell. Existing low-level font/reset styles, registration frames, garment media, placement constraints and print/pointer interactions remain reused where useful; the V3 page compositions and StoreMotion wrapper no longer drive public pages.

Homepage links lead to the real catalogue and custom paths, and its working teaser opens the studio. The collection retains the V4 print reveal and selectable garments. Catalogue filters remain URL-based and work without JS; related products reuse the same archive. Native navigation/history remains intact. The existing scoped LabMotion lifecycle and reduced-motion handling are reused without adding an animation library. Loading, error and missing-product states provide recovery links.

## Shopping rules

`features/commerce/bag.ts` owns variants, validation, merging and integer-cent totals. A purchasable product must come from the real dataset, have `available: true`, a finite non-negative verified ZAR price and valid options. Demo/source-backed objects are excluded. Real records remain unchanged; **none currently have enough verified information to enter the bag**. They show product-specific enquiry actions instead.

For independently available combinations, populate `Product.variants` with stable IDs, size, colour and availability. When this optional field is absent, supplying `sizes` and `colours` declares their entire cross-product verified and available; do not use that shorthand if combinations differ. Keep a variant ID stable when its display label changes. Prices remain product-level, not per-variant; extend the pricing contract before using different prices for variants.

`BagProvider` validates hydration and updates, persists under `dop-bag-v1`, synchronises storage events across tabs and reports storage failures. Invalid/stale stored bags are rejected with an explanation. Quantities are whole numbers 1–99; distinct items are capped at 30 (application limits, not claimed stock). Customers can update/remove items and see a subtotal excluding unconfirmed delivery. There is no fake checkout. The bag is not cleared on enquiry because that is not a confirmed purchase.

## Enquiries and external configuration

General, product, custom and bag enquiries share `EnquiryForm`. Product names/options/prices are resolved again on the server from submitted IDs, not trusted from the client. Input length/type checks, explicit acknowledgement, honeypot, same-origin JSON enforcement, a streamed 16 KB request cap and a shared-volume rate limiter protect the endpoint. No attachment or arbitrary URL is fetched.

Email uses the [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email), via server-side fetch, with a verified sender and a per-record idempotency key. A private enquiry record is written and flushed before contacting the provider. The original is retained even if delivery or its separate receipt fails. The UI distinguishes submitted/awaiting confirmation from recorded/notification delayed. Neither state means paid, accepted by the business, stock reserved or email delivered to an inbox.

Records are `<uuid>.json`; notification receipts are `<uuid>.delivery.json`. `accepted` means the provider accepted the API request. Failed/missing receipts require operator review and manual follow-up. There is no automatic retry worker, staff dashboard or transactional order database. Monitor this directory and provider delivery status before enabling the service; do not treat storing a file as an operational support process.

WhatsApp requires a configured business number. It opens a prepared message and the customer sends it explicitly. Long messages fall back to copy/paste. Email addresses, phone numbers, provider credentials and sender identities are not fabricated. Without configuration, prepare/copy remains usable and API submission returns 503. No message is silently sent.

## Studio and quotation

The studio remains lazy-loaded on its own route; unrelated shopping does not import Three.js. Its 2D editing, local raster loading, text, front/back state, transformations and context-loss fallback remain operational. A quotation action stores only a bounded text summary in this tab's session storage and navigates to `/custom#quotation`. The form accepts garment, requested colour, size breakdown, quantity, placement, reference, instructions and contact details.

There is no secure artwork upload service yet. Artwork stays in the browser; no base64 payload or public storage URL is included in email/WhatsApp. Users must keep original files and arrange transfer separately. Leaving the studio discards editable layers; this is disclosed before the quotation action.

**No real garment model is available.** The renderer continues to show the labelled two-sided texture test surface. A licensed oversized tee and validated mapping are required for real garment visualisation. See [GARMENT-STUDIO.md](GARMENT-STUDIO.md) and [third-party notices](STUDIO-THIRD-PARTY-NOTICES.md). V5 adds no runtime dependencies; existing Three.js/Fiber/Drei MIT notices are retained. The Resend integration uses HTTP, not a copied SDK or proprietary reference implementation.

## Configuration and operations

Use Node 24 for the supplied Node tests. Install with `npm ci`; run `npm run dev` (Windows: `npm.cmd run dev`). Copy `.env.example` to `.env.local` and fill only verified values. Restart the server after changing environment configuration.

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Canonical origin, also required to match the form request Origin |
| `SITE_INDEXABLE` | Keep false until launch approval; true enables indexing/sitemap |
| `BUSINESS_EMAIL` | Optional public email contact |
| `BUSINESS_WHATSAPP` | Optional verified international number, digits only |
| `RESEND_API_KEY` | Server-only email credential |
| `ENQUIRY_FROM_EMAIL` | Verified sender address, plain email |
| `ENQUIRY_TO_EMAIL` | Private notification recipient |
| `ENQUIRY_DATA_DIR` | Absolute private persistent-volume directory, outside public assets |
| `ENQUIRY_HASH_SECRET` | Random secret of at least 32 characters for rate-limit identity hashes |
| `ENQUIRY_IP_HEADER` | Optional header overwritten by a trusted proxy with the real client IP |

Storage requires a persistent shared filesystem with exclusive-create semantics, backups, restricted OS permissions/ACLs and operational monitoring. Do not use ephemeral/serverless disk. A serverless deployment needs a durable store adapter first. No database or storage service is assumed. Never place this directory in `public/` or commit it to Git. Production must use HTTPS and restrict the data directory to the application/operator account.

Default rate limiting is globally three requests per five-minute bucket, plus three per email, until a trusted IP header is configured. With the trusted header, the first limit applies per identity. Do not trust a freely client-supplied forwarded header. An operator may remove old `limit-*` files outside the current bucket; agree and document a personal-data retention policy before deleting enquiry records or enabling public collection. No retention promise was invented.

Basic metadata, robots and sitemap are present. Indexing is off by default. Owner-approved privacy, delivery, returns, cancellation and business terms are still required. `/policies` explicitly explains that these are pending; it is not legal-policy boilerplate.

## Verification and actual status

- Lint, strict typecheck, 14 Node tests and production build passed.
- Tests cover filtering, unique real slugs/media existence, verified and unavailable variants, duplicate/demo rejection, bag merging/cent totals/serialisation, server-side price derivation, invalid enquiry inputs, durable recording before notification, delivery failure and shared rate limiting, plus existing studio placement tests.
- Chromium reviewed all public routes. Combined filters led to the matching product; history restored the query; Ratio led to a prefilled enquiry; prepare/copy clearly reported unsent status; the unconfigured endpoint returned 503; studio text transferred to the custom quotation; tampered stored demo entries were rejected.
- Responsive checks: 1920×1080, 1440×900, 1366×768, 1024×768, 768×1024, 390×844 and 360×800. No detected horizontal overflow/broken loaded images; mobile menu and reduced motion worked. A desktop menu specificity issue was found and fixed.
- Positive bag/variant logic and provider success/failure were tested with isolated fixtures/mocked delivery, never published as fake merchandise. A real add-to-bag browser journey cannot complete with today's unverified product records. No actual customer email or WhatsApp message was sent. End-to-end configured delivery is **not verified**.

## Launch blockers

1. Verify product prices, availability and options; then exercise actual add/update/remove/refresh and order enquiries with approved inventory.
2. Supply real contact channels, configure Resend/verified sender and durable private storage, and test real delivery plus operational failure recovery.
3. Approve business policies and private-data handling/retention; enable indexing only after launch review.
4. Supply and calibrate a commercially licensed garment model; configure secure artwork transfer if that is to be offered.

Payments, accounts, stock reservation, automatic fulfilment, background mail retry, secure artwork hosting and a production garment proof are not implemented. Physical-device/cross-browser certification and formal performance profiling remain future checks. Existing ESLint-chain advisories documented in the studio handoff are not resolved by this iteration. Nothing has been publicly deployed and the application is not claimed ready to accept real orders.
