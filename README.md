# Filthy Casuals

A one-page website for **Filthy Casuals**, a player-run guild for *Warcraft Forever*
(launching November 4). The page introduces the guild, lays out its charter and weekly
schedule, and points visitors at the guild's Discord invite.

## What's on the page

- **Hero** — the guild wordmark over custom keep-at-dusk artwork, with a live countdown
  to the November 4 launch and the primary "Join the Discord" button.
- **The charter** — the three rules the guild actually holds to.
- **The week** — raid nights, Sunday runs, and the launch-week plan.
- **Join** — the guild crest and a second Discord button, so the invite is reachable
  from the top and the bottom of the page.

Every Discord button and link opens `https://discord.gg/NSd3EqPGaA` in a new tab.

## Editing the content

All guild copy lives in one file: **`src/data/guild.ts`**. Change the Discord invite,
launch date, tagline, charter tenets, or schedule there and the page follows. Nothing
else needs touching for routine updates.

The schedule times, roster count, and charter wording are a sensible starting point
rather than gospel — edit them to match how the guild actually runs.

## Tech

| Layer | Choice |
|-------|--------|
| Framework | TanStack Start (React 19) |
| Routing | TanStack Router (file-based) |
| Styling | Tailwind CSS 4, theme tokens in `src/styles.css` |
| Type | Grenze Gotisch (display) + Spectral (body), via Google Fonts |
| Images | Netlify Image CDN (`/.netlify/images`) |
| Hosting | Netlify |

## Running locally

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:3000. To run it with Netlify's local platform
emulation (needed if you want the Image CDN to behave as it does in production):

```bash
netlify dev
```

## Deploying

Netlify builds with `vite build` and publishes `dist/client`, as configured in
`netlify.toml`. Pushing to the connected branch is enough.
