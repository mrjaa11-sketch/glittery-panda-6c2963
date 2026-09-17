# AGENTS.md

Context for AI agents and developers working on this codebase.

## What this is

A single-page marketing site for **Filthy Casuals**, a player-run *Warcraft Forever*
guild. Its job is to explain the guild's vibe and get visitors into the guild Discord.
There is no backend, no database, and no authentication — and it does not need any.

Scaffolded from the Netlify `marketing` template, then stripped down: the template's
product catalog, product detail route, and AI assistant were removed.

## Architecture

```
src/
├── data/guild.ts       # ALL editable guild content (see below)
├── routes/
│   ├── __root.tsx      # HTML shell, SEO + OG meta, Google Fonts links
│   └── index.tsx       # The entire page: header, hero, charter, schedule, join, footer
├── router.tsx          # TanStack Router setup (untouched from template)
└── styles.css          # Tailwind import, theme tokens, keyframes, grain overlay
public/img/
├── keep-at-dusk.png    # Hero artwork
└── crest.png           # Guild crest
```

Routing is file-based via TanStack Router. `src/routeTree.gen.ts` is generated at build
time and is not committed.

## Content is data, not markup

`src/data/guild.ts` is the single source of truth for guild name, Discord invite, launch
date, tagline, charter tenets, and schedule. **Put copy changes there, not in JSX.** Even
the hero wordmark is derived from `guild.name` (split on spaces into stacked lines), and
the page title and OG tags in `__root.tsx` read from the same object.

The invite URL (`guild.discordUrl`) is used by four elements: the header link, the hero
button, the join-section button, and the footer link. All open in a new tab with
`rel="noopener noreferrer"`.

## Design system

Aesthetic direction: **dark tavern heraldry** — tarnished brass and ember on warm ink,
medieval display type, with copy that has a wry, self-deprecating voice matching the
guild's name. Keep that voice in any new copy; it is the whole point of the brand.

Tokens are Tailwind 4 `@theme` variables in `src/styles.css`:

- Surfaces: `ink` (page), `ink-2` (alternating sections), `ink-3`
- Text: `parchment` (primary), `parchment-dim` (secondary)
- Accents: `brass`, `brass-bright` (headings, the CTA), `ember` (sparks, glow)
- Fonts: `font-display` (Grenze Gotisch), `font-body` (Spectral)

Use these tokens rather than raw hex or Tailwind's default palette, so the page stays one
cohesive temperature. There is no light mode; the design is dark-only by intent.

### Non-obvious decisions

- **Charter staircase.** The three tenets step diagonally across a 12-column grid using
  the `TENET_COL` array of `md:col-start-*` classes. These must stay as complete literal
  class strings — Tailwind scans source text, so a computed class name (e.g.
  `` `md:col-start-${n}` ``) would not be generated. The offsets are `md:`-prefixed so
  mobile stays single-column.
- **Embers** (`EMBERS` in `index.tsx`) use hardcoded positions and delays, not
  `Math.random()`, so server and client render identically and hydration does not
  mismatch.
- **Countdown** starts as `null` and fills in inside `useEffect`, for the same reason —
  the server cannot know the visitor's current time. It renders `––` placeholders and
  pre-launch copy until hydration, then ticks every 30s.
- **Grain overlay** is a `::after` on `<body class="grain">`: `position: fixed`,
  `pointer-events: none`. Keep it fixed and non-interactive — putting a noise filter on a
  scrolling container tanks scroll performance.
- Animations only touch `transform` and `opacity`, and everything is disabled under
  `prefers-reduced-motion`.

## Images

Source artwork in `public/img/` is full-resolution model output (~1.5 MB each) and is
**never referenced directly**. All `<img>` tags go through the Netlify Image CDN via the
`img()` helper in `index.tsx`:

```tsx
img('keep-at-dusk.png', 'w=1440&fm=webp&q=72')
// → /.netlify/images?url=/img/keep-at-dusk.png&w=1440&fm=webp&q=72
```

The hero ships a `srcSet` at 900/1440/1920px. The crest is square-center-cropped
(`fit=cover`) and masked to a circle; the laurel sits inside the inscribed circle, so
nothing clips.

The artwork was generated once with a Gemini image model through Netlify AI Gateway and
committed as static assets. The SDK is intentionally **not** a project dependency — there
is no runtime or build-time image generation. To make new art, install `@google/genai`
temporarily, generate, and remove it again.

## Conventions

- TypeScript strict, with `noUnusedLocals` and `noUnusedParameters` on — unused imports
  and unused map callback params are build errors.
- Imports from `src/` use the `@/` alias.
- Components: PascalCase. Section boundaries in `index.tsx` are marked with
  `{/* ---------- Name ---------- */}` comments.
- The page is one route by design. Resist splitting it into a component-per-section
  unless it actually grows a second page.

## Commands

```bash
npm run dev     # dev server on :3000
npm run build   # vite build → dist/client
```

Netlify config lives in `netlify.toml`.
