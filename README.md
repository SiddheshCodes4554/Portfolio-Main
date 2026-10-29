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

Tailwind v4 exposes the semantic tokens from `src/app/globals.css` as utilities such as `bg-paper`, `text-cobalt`, `font-editorial`, and `shadow-paper`. Fonts use system stacks so builds do not depend on a font CDN. Most components render on the server; the Motion configuration is the only client boundary.

## Content and accessibility

Read `AGENTS.md` before making changes. The local resume is the factual source for future biography, projects, skills, education, and achievements. It is deliberately excluded from Git and public assets. A fresh checkout requires the owner to supply `reference/resume.pdf` before adding factual content.

The shell includes semantic landmarks, a skip link, visible keyboard focus, responsive layouts, decorative SVGs hidden from assistive technology, and reduced-motion support. No unnecessary entrance animations are included.

## Git workflow

Keep verified changes in coherent commits and push them to the configured origin as the portfolio develops. Never force-push or commit secrets. Hosting and deployment are outside this initial foundation milestone.
