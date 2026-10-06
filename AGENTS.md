<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Department of Printing engineering instructions

Read `docs/BRAND.md`, `docs/DESIGN.md` and `docs/ARCHITECTURE.md` before relevant work. The business prints customer artwork on supplier-sourced blank garments; it does not manufacture custom garments. The visual direction is exploratory.

## Scope and structure

- Preserve the existing Next.js App Router setup and root `app/` structure unless an explicit task requires a justified change.
- Implement only requested features. The current foundation phase preserves the starter page and excludes homepage design, ecommerce, databases, authentication, payments, backend services, external APIs, canvas editing and 3D.
- Do not install animation libraries until visual experiments inform that decision.
- Avoid unnecessary dependencies; prefer existing capabilities and justify additions.
- Create modules when needed, not speculative folders, empty files or premature abstractions.

## Implementation principles

- Keep TypeScript strict. Do not suppress type errors or relax compiler settings to bypass a problem.
- Prefer reusable, loosely coupled components with focused responsibilities. Split giant components along meaningful boundaries.
- Keep business logic separate from presentation. Do not hard-code products, prices, supplier data or production rules into visual components.
- Keep shared presentation primitives in `components/ui/`; colocate feature-specific UI with its owner.
- Preserve modularity: optional capabilities must not make core shopping or the eventual 2D Print Lab dependent on a particular renderer or provider.
- Follow installed Next.js guidance for server/client boundaries; keep client-side JavaScript focused on the interactions that require it.
- Maintain responsive behaviour and accessibility, including semantic markup, labelled inputs, keyboard operation, visible focus and reduced-motion support. Check narrow and wide layouts when changing UI.

## Verification

- Run `npm run lint` and `npm run typecheck` after meaningful changes and report results and any limitations.
- Add focused tests when warranted by business logic or interaction risk; avoid tests that merely mirror trivial implementation details.
- Do not manually edit generated `.next/` files or `next-env.d.ts`.
- Keep the generated Next.js instruction block above intact.
