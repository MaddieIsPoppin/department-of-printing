# Department of Printing: owner content guide

V3 is the storefront foundation, not a live ordering service yet. Preview it at **http://localhost:3000/storefront-v3** after running `npm run dev` (`npm.cmd run dev` in Windows PowerShell if needed).

The catalogue is `/catalogue`, custom printing is `/custom`, and each piece has a `/product/its-slug` page. The existing homepage, V1 and `/design-experiments` are preserved. V3 routes are currently available only in development and are marked not to be indexed.

## Where to edit

| What you want to change | File |
| --- | --- |
| Product names, descriptions, prices, options and featured status | `data/products.ts` |
| Image paths, dimensions and alternative text | `data/media.ts` |
| Garment types and custom-preview imagery | `data/garments.ts` |
| Hero headline/media, business description and contact channel | `data/site.ts` |

These files are the content source. You do not need to edit a React component to add a product, change its price or replace its media. Keep quotes, commas and brackets intact. Run `npm run lint` and `npm run typecheck` after editing, then inspect the affected pages.

## Add a product

1. Put its approved images in `public/products/your-product-name/`. Lowercase names with hyphens are easiest to maintain.
2. Add an image entry to the `media` list in `data/media.ts`, using the real image dimensions and a useful description. For example, describe the colour, garment and artwork shown. The public URL starts with `/products/`, not `/public/products/`.
3. Copy one object in the `products` array in `data/products.ts`. Give it a **unique** `slug`, using lowercase letters and hyphens. This becomes its web address. Avoid changing an established slug after launch without arranging a redirect.
4. Update its name, tagline, garment type, collection, description and media. Use a garment ID from `data/garments.ts`.
5. Leave unconfirmed commercial information unconfirmed: `price: null`, `available: null`, `colours: []`, `sizes: []`.
6. Set `featured` to `true` or `false`. Save and inspect `/catalogue` and `/product/your-slug`.

New product pages and catalogue entries are generated from the data; no separate page file is required. Array order controls catalogue order and the order of featured pieces. Aim for three to five featured pieces.

## Change a price

Find the product in `data/products.ts`. Replace `price: null` with the **verified numeric selling price**, in rand, without `R`, quotes or thousands separators. Keep `currency: "ZAR"` for South African rand.

One change updates the featured presentation, catalogue and product page. `null` deliberately displays **Price to be confirmed**. It does not mean free. Do not use zero as a placeholder. No shipping, tax, discount or checkout calculations are implemented.

The prices in the old V1 specimen sheet were illustrative and have not been reused as real product prices.

## Set availability, colours and sizes

- `available: null`: availability is not yet confirmed.
- `available: true`: available to order once the actual order channel is ready.
- `available: false`: currently unavailable; the product remains visible, with no product enquiry action.
- `colours` and `sizes`: lists of **verified purchasable options**. Empty lists display an intentional confirmation message.

A colour visible in a design render is not proof that it is an available product option. In particular, the Ratio black-front and white-back images are separate studies. These fields are content, not a stock database; they do not reserve stock.

## Change product images

Update the relevant `media` entry in `data/media.ts`, or point the product at another entry. Each image needs `src`, `alt`, `width` and `height`.

Product media supports:

```ts
media: {
  cover: media.yourCover,
  front: media.yourFront,       // optional
  back: media.yourBack,         // optional
  details: [media.yourDetail],  // optional
}
```

Only `cover` is required. The product page avoids showing the same image twice. Catalogue hover/focus can show the first detail image or a distinct front view. Touch visitors can open the product page to see additional images.

Existing transparent renders have large empty margins. The `garment` framing compensates for that. For a photograph or complete scene, set `framing: "scene"` on its image entry. Inspect the crop after replacing an image, especially when the new image has different transparent margins.

## Add a product video

Add a `video` object to that product's media:

```ts
video: {
  src: "/products/your-product-name/motion.webm",
  poster: "/products/your-product-name/motion-poster.jpg",
  label: "Describe the garment and movement shown",
  background: "#353a3d",
}
```

The featured presentation and product page will use it automatically. The catalogue keeps using the cover image so it does not start many videos at once. Without `video`, imagery remains the default. Supply a poster: it is the loading and autoplay fallback. Motion pauses offscreen, in hidden tabs and for reduced-motion preferences. There is a manual pause control.

## Feature or unfeature a product

Change `featured: true` to `featured: false`, or vice versa, in `data/products.ts`. This controls its inclusion in Act 02 and its catalogue featured label. It does not remove the product from the catalogue. If all products are unfeatured, the featured section is omitted.

## Add a garment type

Add an entry to the `garments` array in `data/garments.ts`. It needs a unique `id`, singular `label`, plural `plural`, an `image` from the media registry, `isBlank`, and a short `description`.

The type becomes available to product records and to the custom teaser. Catalogue filters appear only when at least one product uses that type. Set `isBlank: false` if the image already contains artwork; the teaser will label it as a finished study with a sample overlay.

Do not add caps, totes or other categories until suitable imagery exists. Different garment shapes may need their sample print-area positioning refined; the current demonstration is composed for torso garments, not a production placement tool.

## Replace the homepage hero video

The current hero uses `site.hero.media` in `data/site.ts`, which points to `garmentFilm` in `data/media.ts`. Update that entry's `src`, `poster`, `label` and `background`, or assign a different video object in site data.

The current `ratio-hoodie-hero.webm` actually shows a **black tee**. Keep its visible description accurate. Do not rename or move the original file: V2 still uses it. A future replacement can live at `public/hero/department-campaign.webm` with its poster beside it.

Change the two hero headline lines and caption under `site.hero` without changing layout code. Review long copy at mobile width. Match the CSS environment to the footage background when choosing a new campaign; an opaque video cannot behave like a transparent cutout.

## Set the real custom contact channel

Change `site.custom.contact` in `data/site.ts` from `null` to one verified channel:

```ts
// Use your actual confirmed address:
contact: { kind: "email", address: "YOUR_VERIFIED_ADDRESS" }

// Or your actual confirmed HTTPS enquiry/WhatsApp link:
contact: { kind: "link", url: "YOUR_VERIFIED_HTTPS_URL" }
```

The uppercase strings above are instructions, not working contact details. Replace them before use. Email addresses and HTTPS URLs are checked for basic validity. Invalid or missing configuration keeps the safe preview state; it does not silently send anything elsewhere.

This enables custom and product enquiry actions. It opens the configured channel; it does not create an order record, attach artwork, calculate a quote or send a message automatically. Test the destination before opening enquiries publicly.

## Media naming and preparation

For new assets, use these conventions only when you actually have files to add:

```text
public/products/growth-is-a-process/cover.webp
public/products/growth-is-a-process/back.webp
public/products/growth-is-a-process/detail-01.webp
public/products/growth-is-a-process/motion.webm
public/products/growth-is-a-process/motion-poster.jpg
public/garments/hoodie/blank-front.webp
public/hero/department-campaign.webm
```

- Use short, lowercase names with hyphens. Avoid spaces in new filenames.
- Use transparent PNG/WebP for garment cutouts. Use JPEG/WebP/AVIF for complete scenes or photographs.
- Keep consistent framing and preserve the garment's proportions. Do not export a tiny garment inside an unnecessarily enormous canvas.
- Export appropriately compressed images, generally around 1600–2400 pixels on the long side for large product views; inspect print detail before reducing further.
- Use a short, seamless, muted WebM or browser-compatible MP4 for motion. The video component takes one source URL; test the actual file on your target browsers.
- Always supply an image poster and readable alternative text. Background/lighting consistency helps footage integrate into the page.
- Reuse existing paths; do not duplicate large videos just to give each page a separate folder.

The existing `/public/garments/` assets are intentionally untouched for V2 compatibility. V3 adds one small front-facing tee still extracted from the supplied video, rather than inventing a blank garment image.

## Before going live

Confirm prices, purchasable sizes/colours, availability, product specifications, the enquiry channel and your actual order process. Commerce, stock, checkout, shipping, payment and policy work remain separate tasks. The development-only route guard and noindex metadata must be reviewed deliberately before publication; changing content does not publish the shop.
