# The Internet Scrapbook

## Scope and source of truth
- Build incrementally. The initial milestone is architecture, tokens, and a basic page shell only.
- Owner: Siddhesh Gawade. Repository: https://github.com/SiddheshCodes4554/Portfolio-Main.
- Commit and push verified, coherent changes to this repository as work progresses. Never force-push or commit secrets.
- Use `reference/resume.pdf` as the factual source for experience, education, projects, skills, and achievements. Ask for the source if absent. Never invent claims, metrics, clients, testimonials, or availability.
- Keep the resume private and ignored by Git. Do not expose addresses or contact details without a deliberate content decision.
- Keep approved public copy in `src/content/`; distinguish editorial copy from factual claims.

## Design principles
- Contemporary editorial design meets a tactile personal scrapbook: premium first, playful second.
- Warm off-white paper, near-black ink, and cobalt accents. Use the semantic tokens in `src/app/globals.css`.
- Use strong typography, intentional asymmetry, generous space, and restrained paper overlap. Prefer square corners.
- Tape, hand-drawn SVG marks, and annotations should support hierarchy; hide decoration from assistive technology.
- Avoid dark futuristic dashboards, neon gradients, glowing orbs, pervasive glass effects, generic SaaS layouts, excessive emoji, and giant 3D scenes.
- Every animation must explain state, hierarchy, or navigation. Do not add GSAP unless Motion and CSS cannot reasonably handle the interaction.

## Architecture and coding
- Next.js App Router, strict TypeScript, Tailwind CSS, Motion for React, Lucide icons, and SVG doodles.
- Server Components by default. Keep client components small and use them only for state, browser APIs, or motion.
- `src/app/`: routes, metadata, global styles; `src/components/layout/`: site shell; `src/components/ui/`: reusable primitives; `src/content/`: approved content; `src/lib/`: shared configuration and utilities.
- Use semantic tokens instead of scattering arbitrary colors, shadows, spacing, or animation timings. Responsive layout should adapt naturally without device-specific hacks.
- Use typed props and descriptive names. Avoid unnecessary abstractions, dependencies, and speculative features.
- Keep assets local where practical; do not require remote font downloads for production builds.

## Accessibility and quality
- Use semantic landmarks, one page h1, logical heading order, real links/buttons, and a skip link.
- All controls must work with a keyboard and have clear visible focus. Aim for 44px touch targets.
- Preserve readable contrast and text sizing. Never convey meaning by color alone.
- Honor `prefers-reduced-motion` in CSS and Motion. Content must remain available without animation or JavaScript.
- Do not use hover as the only way to reveal essential content. Provide useful alt text; mark decorative icons and SVGs aria-hidden.
- Check mobile and desktop widths, text overflow, keyboard focus, and reduced motion when changing layout or interaction.
- Run `npm run typecheck` and `npm run build` before pushing meaningful implementation changes. Use focused tests when behavior warrants them.
- Report actual verification and remaining limitations; never claim checks that were not run.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
