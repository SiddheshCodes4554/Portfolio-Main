# The Internet Scrapbook

Siddhesh Gawade's personal portfolio, built as a warm, tactile editorial scrapbook.

Repository: https://github.com/SiddheshCodes4554/Portfolio-Main

## Current milestone

Foundation only: App Router layout, responsive cover page, semantic design tokens, reusable paper and doodle components, metadata, and accessibility defaults. Project galleries, experience, skills, and other full portfolio sections are intentionally deferred.

## Development

Use Node.js 22 LTS or newer supported LTS and npm.

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm start
```

The local development URL is http://localhost:3000. `npm run lint` is available for explicit lint reviews.

Development and production scripts currently use Next.js's supported `--webpack` option because Turbopack's CSS worker fails to start in the current Windows environment. This can be revisited after a toolchain update. The restricted execution sandbox also requires elevated execution for Next.js workers and generated build output; this is an environment limitation.

## Structure

```text
src/
  app/                 Routes, global tokens, metadata, favicon
  components/layout/   Shared header and footer
  components/ui/       Paper card, SVG scribble, Motion configuration
  content/             Approved public copy
  lib/                 Shared configuration
reference/resume.pdf   Local factual source (ignored by Git)
```

Tailwind v4 exposes the semantic tokens from `src/app/globals.css` as utilities such as `bg-paper`, `text-cobalt`, `font-editorial`, and `shadow-paper`. Fonts are bundled locally so builds do not depend on a font CDN. Most components render on the server; the Motion configuration is the only client boundary.

## Content and accessibility

Read `AGENTS.md` before making changes. The local resume is the factual source for future biography, projects, skills, education, and achievements. It is deliberately excluded from Git and public assets. A fresh checkout requires the owner to supply `reference/resume.pdf` before adding factual content.

The shell includes semantic landmarks, a skip link, visible keyboard focus, responsive layouts, decorative SVGs hidden from assistive technology, and reduced-motion support. No unnecessary entrance animations are included.

## Git workflow

Keep verified changes in coherent commits and push them to the configured origin as the portfolio develops. Never force-push or commit secrets. Hosting and deployment are outside this initial foundation milestone.

## Design system preview

Visit `/design-lab` for the temporary, noindex component gallery. All ten primitives are exported from `src/components/ui/scrapbook.tsx`; the existing PaperCard import remains compatible. PaperCard supports surface, tilt, and elevation variants. PolaroidCard requires a caption; supply accessible image content as children. PaperTape and DoodleArrow are decorative. ScrapbookButton uses native button props and disabled/pressed semantics.

Fonts are now locally bundled Fontsource packages: Space Grotesk, DM Sans, IBM Plex Mono, and Caveat. Shared semantic colors and component styles live in `src/app/globals.css`; gallery-only layout lives in `src/app/design-lab/lab.css`. The focus-ring specimen is explicitly illustrative; keyboard focus also works on every enabled control. The bookmark demonstration is temporary page state, not persistent storage.


## Interactive homepage hero

The homepage remains a hero-only composition. `ScrapbookDesk` composes existing paper primitives; `ArtifactPreview` provides reusable native modal dialogs with focus containment, focus restoration, Escape, backdrop dismissal, and scroll locking. `EngineeringChecklist` and `HackathonTicket` keep state in React for this page only. Motion is limited to brief strokes, an unfolding preview, and a restrained ticket flip; reduced-motion preferences disable these movements. Hover movement is restricted to fine pointers.

The CampusOS print is visibly labeled as a screenshot placeholder. The small photo is also an explicit placeholder. Supply actual assets before replacing either. CampusOS has an in-preview case-study notes link; no external case-study URL has been invented. The architecture view is a conceptual summary of the resume, not a verified deployment diagram. Project facts live in `src/content/projects.ts`.

Verified in browser at 1440px, 1024px, 768px, 390px, and 320px, including modal opening/closing, keyboard activation, Escape focus restoration, case-study navigation, checklist toggling, ticket flipping, and page-local state reset. Reduced-motion handling is implemented in CSS and Motion; OS-level reduced-motion emulation was not available in this browser session.

## Inventor's desk milestone

The current hero uses `src/app/inventor.css` for a bounded desktop canvas and a compact 65px navigation. At 1440×900 and 1366×768 the document height equals the viewport height; no content is hidden to achieve this. Tablet/mobile layouts scroll naturally. Existing paper previews and the ticket are reused alongside the new `DeskLamp`, `MiniCircuit`, and `MiniTerminal` client components. Terminal commands are deterministic local responses, never shell execution. Circuit motion runs once per switch change; there are no continuous animations.

Browser QA for this milestone: actual screenshots at 1440×900, 1366×768, 768×1024, and 390×844; lamp click/keyboard toggle, circuit switch/LED, help/about/projects/clear commands, CampusOS and AERIS dialogs with Escape, and ticket flip. Screenshot artwork remains a labeled placeholder. Reduced-motion behavior is implemented; OS-level emulation remains untested.

## Connected workbench behavior

The lamp now illuminates the project papers and surrounding desk, rather than only its own drawing. Shared `WorkbenchPower` state connects the circuit switch, LED, cable, and terminal. The terminal starts in standby; either the circuit switch or its boot button powers it on. Booting from the terminal transfers focus to the command field. Power cycling preserves command history for the page session. The mobile cable is omitted, while the labels retain the causal connection. Verified with mouse and keyboard power cycling, history preservation, lamp on/off, mobile overflow, and desktop viewport fit.

## Project Archive — Vol. 02

The hero markup and hero styles are unchanged. The homepage appends `ProjectArchive` below the desk, with a separate transition into the notebooks. `src/content/projects.ts` provides typed archive content and the existing hero project facts. Three local `/projects/*` case-study routes use the same data; no external URLs or metrics are invented. Ingress Within has verified responsibility areas instead of an unsupported technology stack.

The archive uses a roving tab stop with Arrow keys, Home, and End. All panels stay mounted, so graph selection, journal position, and scan preference survive tab changes. Radar animation stops when its panel is inactive and under reduced motion. Journal boundary controls use aria-disabled with guarded actions to preserve keyboard focus. No-JavaScript visitors have links to all three case-study pages.

Browser checks: desktop 1440px, tablet 768px, mobile 390px; graph selection, topic/edge highlighting, radar start/pause, keyboard tab switching, journal forward/back/boundaries, state retention, and case-study navigation. All three routes return HTTP 200. Real project screenshots and an Ingress-specific technology list were not supplied; demos are labeled as illustrative, and no private product material is used. OS reduced-motion emulation was unavailable; reduced-motion handling was inspected in code.
