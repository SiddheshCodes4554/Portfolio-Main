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

## Supplied project captures and repositories

All three archive notebooks and case-study pages now use owner-supplied local PNG captures under `public/images/projects/`, with descriptive alt text, responsive Next.js image optimization, uncropped proportions, and links to full-size originals. Repository URLs are stored alongside each typed project entry. The interactive graph/radar/journal remain distinct from the product captures. Hero composition and its placeholder are unchanged in this archive-only asset update. Repository links are owner-supplied destinations; no unverified implementation facts have been inferred from them. Ingress Within's project-specific stack remains unspecified.

## The Engineer’s Notebook — Vol. 03

The homepage now appends `EngineersNotebook` after the unchanged hero and archive. `src/content/notebook.ts` is the typed, editable source for three story entries, 22 toolbox tags, four journey connections, and three foldable notes. Facts and project attribution follow the local resume; generic technology descriptions are distinguished from personal project use. Personal interests and future plans remain explicitly labeled editable notes. The hackathon node has no fabricated date, and the circuit is explicitly not a chronological scale.

Desktop shows facing pages. At 900px and below, keyboard-operable page tabs reveal one wider leaf at a time. Both leaves, story pages, and tool categories remain mounted to preserve selections. Folded notes include no-JavaScript text fallbacks; additional no-JavaScript content includes the remaining story and skills. Paper turns and kit unfolding use reduced-motion-aware Motion; decorative SVGs are hidden from assistive technology.

QA: actual screenshots at 1440, 1024, 768, and 390px; all three story entries, all four journey nodes, all four toolbox categories and 22 tool tags, native note opening/closing, keyboard page/category navigation, tool attribution links, and selection retention across toolbox closure and mobile page switching. No horizontal overflow was observed. OS-level reduced-motion emulation was unavailable; the reduced-motion branches were inspected in source.


## Physical notebook motion refinement

Story changes now turn a temporary paper leaf over the incoming entry instead of fading/tilting the live text. The leaf has separate front/back faces, a spine hinge, paper shading, direction-aware rotation, and a 560ms turn contained within the story reading area. Previous/Next controls and the existing keyboard tabs both trigger it. The decorative leaf is aria-hidden and non-interactive; real content is available beneath it immediately. Interrupted turns clear only the latest animation. Every layout confines the moving leaf to its reading area, preserving the facing toolbox and preventing overflow. Story entries share a stable grid height so controls do not jump.

The toolbox starts open, with a compact illustrated header, readable category controls, and a gently hinged inner sheet; closed content is inert and aria-hidden without discarding tool state. All three personal notes use crease/height/rotation animations and native buttons with aria-expanded. The selected circuit connection draws its path. Reduced motion uses instant content changes and hides the decorative turning sheet. Quiet chapter tabs, a single paperclip, subtle graph paper, and restrained colored notes keep the notebook treatment readable. Tool explanations reveal in 200ms without shifting nearby controls.

QA captured actual mid-turn frames at desktop and mobile, checked 1440/1024/768/390px layouts, previous/next boundaries, keyboard Home navigation, interrupted turns, toolbox opening/closing, note controls, and overflow during rotation. The existing hero, archive, and factual copy were not modified. OS-level reduced-motion emulation is not available through the connected browser, so the reduced-motion branches were reviewed in source.


Latest usability QA: local headless Chrome screenshots at 1440, 1024, 768, and 390px, including a mid-turn frame; stable chapter heights, forward/reverse changes, keyboard Home, Space activation of a folded note, four journey selections, toolbox selection retention, tablet/mobile facing-page switching, and no horizontal overflow. Browser-emulated prefers-reduced-motion was tested: story changes omit the turning overlay. Lint, TypeScript, and production build passed. The connected browser tool was unavailable; a temporary local headless browser supplied these checks.

## The Little Lab — Vol. 04

`LittleLab` appends a server-rendered workbench after the existing three volumes. Hero, archive, and notebook components/styles are unchanged. Five independent client components under `src/components/lab/` share the semantic palette, native controls, local paper details, and responsive workbench styles. No dependencies, backend, remote assets, or sound were added. The 16×16 toy is prominent, alongside a marble peg board, a type distorter, an arcade cabinet, and a lever-operated receipt printer; mobile becomes a single-column sequence.

- Pixel Playground: captured primary pointer/touch strokes with integer interpolation, five inks, eraser, clear, a roving keyboard grid, and 512×512 PNG generation. Drawing alone disables touch scrolling. Export uses a temporary native download link; no upload occurs.
- Marble Mischief: a launch-position slider, a bounded randomized marble route, finite SVG motion, seven scored pockets, and a page-local points tally. Busy guards prevent duplicate drops; reduced motion resolves immediately. This is an illustrated chance toy, not a physics simulation.
- Glitch Machine: a 32-character phrase, native intensity slider and visual dial, short non-flashing displacement animation, working Freeze/Unfreeze, and Reset. No perpetual animation. Reduced motion hides the moving duplicate glyphs.
- Tiny Arcade: a three-round reaction challenge with a randomized 1.2–3.4 second wait, explicit GO signal, early-click retry without losing a round, performance.now() timing, per-round stamps, averaged run score, page-local best, replay, and a prize ticket with a single short confetti burst. Backgrounding cancels an active run; timers and frames clean up on unmount. Browser/device delay is disclosed.
- Idea Generator: local technology/problem/twist ingredients in `src/content/lab.ts`, no immediate ingredient repeats, keyboard/touch lever and Again, a paper output, and Copy with a selectable-text fallback. The first receipt is visible before animation; reduced motion makes generated receipts static.

Shared pure logic lives in `src/lib/lab.ts`. Run `npm run test:lab` on Node 22+ for five focused tests covering bounded marble routes and pocket scores, reaction averages, gap-free line interpolation, starter-grid independence, and bounded nonrepeating ingredient selection.

Verification: lint, typecheck, production build, and all four logic tests passed. Actual local headless Chrome screenshots were inspected at 1440, 1024, 768, and 390px. Browser checks covered mouse dragging, touch strokes (also at 390px without scrolling), keyboard pixel navigation/painting/erasing, clear, all Boolean cases and table highlighting, typed phrases, keyboard intensity adjustment, freeze/reset, early reaction/game completion with keyboard/replay, lever/Again, exact clipboard text, and emulated reduced motion. No horizontal page overflow was observed; all gadgets fit their viewports and the mobile lever clears the receipt. PNG output from the real export handler was intercepted and decoded to verify its PNG header and 512×512 dimensions; the browser's native download/save UI was not verified. Clipboard restrictions and unavailable Canvas have explicit fallbacks. No assets are missing; the section uses local CSS/SVG and data only. Reaction timing remains an illustrative browser game.


### Playful lab refinement

Removed the logic gate component, styles, and unused Boolean helpers. The replacement Marble Mischief and the upgraded Three-Spark arcade remain isolated to Vol. 04. Browser QA on a production preview checked keyboard launch selection, busy-drop protection, repeated drop scoring, immediate reduced-motion resolution, premature arcade presses without a consumed round, three completed rounds, correct mean score, reward ticket, replay reset and best-score retention. Actual screenshots at 1440/1024/768/390px showed both gadgets fitting without horizontal page overflow. Lint, typecheck, production build, and five logic tests passed. No extra dependencies or external assets were introduced.

## Send Me a Postcard — Vol. 05

`ContactSection` appends the final chapter without changing the first four volumes. The postcard is a native form with persistent message/name/email values, three original SVG stamps, a two-sided Motion flip, and a readable address/message preview. Inactive faces are inert and hidden from assistive technology. Reduced motion switches faces without rotation. Successful provider acceptance gates the mailbox/postmark animation; failure keeps the draft. Footer copy now includes the dynamic year and a back-to-top link.

The server-only `/api/contact` endpoint integrates Resend using native fetch, same-origin checks, strict length/type validation, a capped and timed body reader, honeypot, a supplemental minimum interaction time, shared atomic Upstash rate limiting, hashed client IP keys, and provider idempotency. It fails closed when configuration or rate storage is missing. No credentials were available or added, no emails were sent, and no deployment was performed. The public UI explicitly says the postbox is not connected and offers verified email/social links instead.

Setup: copy `.env.example` and follow [the contact deployment notes](docs/contact-setup.md). `npm run test:contact` uses only safe local mocks for success/failure/rate/validation paths. The public resume is a reflowed, phone-free derivative; the private source remains ignored. Actual postcard front/back layouts were inspected at 1440/1024/768/390px, with keyboard stamp selection/flip, draft retention, validation, duplicate prevention, mocked failure/retry/success/reset, focus, and reduced-motion checks. The live provider and deployed proxy configuration remain unverified until the owner configures and authorizes them.
