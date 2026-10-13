# Garment studio preview

Branch: `feature/3d-garment-studio`. Run `npm.cmd run dev`, then visit http://localhost:3000/custom/studio-preview. The existing `/custom` page is unchanged. The inherited storefront layout makes this a development-only, noindex preview.

## Working features

- Independent front/back designs, up to 12 layers each; local PNG/JPEG/WebP artwork and editable text.
- Mouse/touch dragging, keyboard arrows (Shift for larger steps), size, rotation, numeric X/Y, centre, layer ordering and removal.
- Rotated bounds enforcement; image aspect ratios retained; resets clear both sides.
- One renderer-independent design state drives the SVG editor and 1024px canvas textures in Three.js. Uploads stay in memory and are reduced to 1600px; no network upload, persistence, account, checkout or print export.
- React Three Fiber and Drei provide on-demand rendering, orbit, zoom, front/back camera controls and keyboard-accessible camera buttons. 3D is loaded only on request, with capped pixel ratio, resource disposal and a 2D fallback for unavailable/lost WebGL.

## Missing garment asset — explicit limitation

No suitable licensed oversized T-shirt GLB was present in the three supplied reference repositories or the application. External search did not establish an appropriate, directly reusable asset with adequate provenance. No third-party model, texture or mockup was copied.

The current 3D object is an original two-sided **flat texture test surface**, visibly labelled as such. It proves live front/back texture synchronisation, rotation and zoom; it does not demonstrate garment fit, drape or calibrated artwork placement on fabric. The colour picker recolours this surface. The 2D square is a generic preview zone, not a supplier-approved print specification. A real 3D garment viewer remains dependent on obtaining and validating the model.

To integrate the real tee, place an approved self-contained GLB under `public/`, retain its asset licence/source, and set `studioGarment.model` in `features/garment-studio/garment-config.ts`. The adapter expects a centred Y-up model, front at +Z, approximately two units tall, named garment meshes, and separate front/back print meshes with upright full-range 0..1 UVs. These surfaces must conform to the garment; do not simply paint a whole body UV atlas with the print-zone texture. Supply `url`, `licence`, `source`, `garmentMeshes` and `printMeshes`. Verify orientation, seams, positioning, materials, bounds and front/back readability against known artwork before enabling. The adapter checks mesh names; actual garment mapping remains untested without the asset.

## Architecture

- `design.ts`: plain TypeScript document and placement constraints, no rendering imports.
- `garment-config.ts`: garment identity, asset provenance and mapping contract. Extend with approved garment definitions later.
- `artwork.ts`: local decode/resize and shared texture composition. Accepts raster files only, 8 MB and 24 MP limits.
- `print-editor.tsx`: interactive SVG editor; pointer capture and keyboard placement.
- `scene.tsx`: isolated, dynamically loaded Fiber renderer, calibrated-model adapter, texture lifecycle, orbit and graphics failure handling.
- `studio.tsx`: local document state, front/back selection, uploads and controls.
- `studio.module.css`: scoped editorial layout and responsive panels; existing brand fonts and tokens.

## Reference review and licences

The three folders under `C:/Users/User/Desktop/garment-3d-references` were inspected read-only. No repository was copied or modified.

| Reference / dependency | Licence checked | Use |
| --- | --- | --- |
| React Three Fiber | MIT, local root LICENSE and published package metadata | Installed `@react-three/fiber` 9.8.1; React 19-compatible renderer; on-demand rendering guidance |
| Drei | MIT, local root LICENSE and installed LICENSE | Installed `@react-three/drei` 10.7.9; OrbitControls/useGLTF |
| OpenMerch Engine | MIT, local root LICENSE | Architecture reference only: separate design/zone/layer types; no source/assets reused. Editor package is private/workspace-coupled; 3D listed as post-MVP |
| Three.js | MIT, installed LICENSE | Installed 0.180.0; textures, lighting, model materials |
| `@types/three` | MIT, installed LICENSE | Development-only 0.180.0 definitions |

MIT grants use/modification/distribution/sale subject to preserving copyright and licence notices. Full direct-package notices are retained in [STUDIO-THIRD-PARTY-NOTICES.md](STUDIO-THIRD-PARTY-NOTICES.md); transitive packages retain their own notices. A repository's code licence was not treated as proof of rights to arbitrary third-party assets. Official references: [Fiber](https://github.com/pmndrs/react-three-fiber), [Drei](https://github.com/pmndrs/drei), [OpenMerch](https://github.com/osmaar/openmerch-engine), [Three.js licence](https://github.com/mrdoob/three.js/blob/dev/LICENSE).

## Validation and limitations

Lint, strict typecheck, nine Node tests and production build passed. Chromium checks exercised local image loading and visible texture synchronisation, front/back isolation, camera rotation, keyboard movement, touch dragging, reset, desktop/mobile overflow and console errors. Size, rotation, colour, invalid upload rejection, reduced-motion operation and simulated WebGL context loss also passed: the editor remained usable after losing 3D. Layout checks covered 1440×900, 768×1024, 390×844 and 360×800. Additional placement tests cover all rotation angles, immutable side separation and non-finite inputs.

No physical-device or cross-browser certification, formal GPU performance benchmark, supplier calibration, production-resolution export or real garment mapping is claimed. Drafts are not saved; refreshing discards them. Text uses a fixed Arial font and a single editable line. There is no undo history. The real model adapter is pending asset-based validation.

`npm audit` reported five high-severity entries in the existing development ESLint dependency chain (`braces` → `micromatch` → `fast-glob` → Next ESLint plugin/config). Its proposed fix downgrades ESLint configuration to Next 14; that incompatible change was not applied. No reported advisory in the added 3D runtime packages appeared in that audit.
