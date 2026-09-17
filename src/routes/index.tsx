import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { guild } from '@/data/guild'

export const Route = createFileRoute('/')({
  component: GuildHome,
})

const img = (file: string, params: string) =>
  `/.netlify/images?url=/img/${file}&${params}`

const ROMAN = ['I', 'II', 'III', 'IV', 'V']

/** Staircase offsets for the charter, md and up only. */
const TENET_COL = ['md:col-start-1', 'md:col-start-3', 'md:col-start-5']

/** Deterministic so the server and client render the same embers. */
const EMBERS = [
  { left: '8%', bottom: '12%', size: 3, dur: 11, delay: 0 },
  { left: '19%', bottom: '4%', size: 2, dur: 14, delay: 2.5 },
  { left: '27%', bottom: '18%', size: 4, dur: 9, delay: 5 },
  { left: '38%', bottom: '8%', size: 2, dur: 13, delay: 1.2 },
  { left: '52%', bottom: '14%', size: 3, dur: 16, delay: 6.4 },
  { left: '68%', bottom: '6%', size: 2, dur: 12, delay: 3.8 },
  { left: '81%', bottom: '16%', size: 3, dur: 15, delay: 8 },
]

function DiscordGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.319 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.398 2.727.078.078 0 0 0 .084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.873-.892.077.077 0 0 1-.007-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.011c3.928 1.794 8.18 1.794 12.061 0a.074.074 0 0 1 .079.01c.12.099.246.198.373.292a.077.077 0 0 1-.007.128 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.029 19.84 19.84 0 0 0 5.406-2.727.077.077 0 0 0 .031-.055c.5-5.177-.838-9.674-3.548-13.66a.06.06 0 0 0-.031-.029ZM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.211 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.175 1.095 2.156 2.42 0 1.333-.945 2.418-2.156 2.418Z" />
    </svg>
  )
}

function DiscordButton() {
  return (
    <a
      href={guild.discordUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 rounded-sm bg-gradient-to-b from-brass-bright to-brass px-8 py-4 font-display text-xl font-semibold tracking-wide text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-parchment/40 transition-[transform,filter] duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass-bright active:translate-y-0.5"
    >
      <DiscordGlyph className="h-6 w-6" />
      Join the Discord
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </a>
  )
}

function Countdown() {
  const [left, setLeft] = useState<
    { days: number; hours: number; minutes: number } | null
  >(null)

  useEffect(() => {
    const target = new Date(guild.launchISO).getTime()

    const tick = () => {
      const diff = target - Date.now()
      if (diff <= 0) {
        setLeft({ days: 0, hours: 0, minutes: 0 })
        return
      }
      setLeft({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff / 3_600_000) % 24),
        minutes: Math.floor((diff / 60_000) % 60),
      })
    }

    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  const live = !left || left.days + left.hours + left.minutes > 0

  return (
    <div className="flex items-end gap-6">
      {(
        [
          ['days', left?.days],
          ['hours', left?.hours],
          ['minutes', left?.minutes],
        ] as const
      ).map(([label, value]) => (
        <div key={label}>
          <div className="font-display text-4xl leading-none text-brass-bright tabular-nums sm:text-5xl">
            {value === undefined || value === null
              ? '––'
              : String(value).padStart(2, '0')}
          </div>
          <div className="mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-parchment-dim">
            {label}
          </div>
        </div>
      ))}
      <p className="max-w-[14rem] pb-1 text-sm leading-snug text-parchment-dim">
        {live
          ? `until ${guild.game} opens on ${guild.launchLabel}.`
          : `${guild.game} is live. Come find us.`}
      </p>
    </div>
  )
}

function GuildHome() {
  return (
    <div className="relative overflow-x-hidden">
      {/* ---------- Header ---------- */}
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
          <a href="#top" className="flex items-center gap-3">
            <img
              src={img('crest.png', 'w=80&h=80&fit=cover&fm=webp&q=80')}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full ring-1 ring-brass/40"
            />
            <span className="font-display text-xl tracking-wide text-parchment">
              {guild.name}
            </span>
          </a>
          <a
            href={guild.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 border-b border-brass/40 pb-0.5 text-sm uppercase tracking-[0.2em] text-parchment-dim transition-colors hover:border-brass-bright hover:text-brass-bright sm:inline-flex"
          >
            <DiscordGlyph className="h-4 w-4" />
            Discord
          </a>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section id="top" className="relative isolate min-h-[92vh] overflow-hidden">
        <img
          src={img('keep-at-dusk.png', 'w=1920&fm=webp&q=72')}
          srcSet={`${img('keep-at-dusk.png', 'w=900&fm=webp&q=70')} 900w, ${img(
            'keep-at-dusk.png',
            'w=1440&fm=webp&q=72',
          )} 1440w, ${img('keep-at-dusk.png', 'w=1920&fm=webp&q=72')} 1920w`}
          sizes="100vw"
          alt="A mountain keep at dusk, one tavern window lit against the valley mist"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[60%_center]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/20 to-ink/70"
        />

        {/* Drifting embers from the valley floor. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {EMBERS.map((e, i) => (
            <span
              key={i}
              className="ember absolute rounded-full bg-ember"
              style={{
                left: e.left,
                bottom: e.bottom,
                width: e.size,
                height: e.size,
                animationDuration: `${e.dur}s`,
                animationDelay: `${e.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-6 pt-32 pb-20 sm:px-10">
          <div className="max-w-2xl">
            <p
              className="rise text-xs uppercase tracking-[0.35em] text-brass"
              style={{ animationDelay: '0.05s' }}
            >
              A {guild.game} guild
            </p>

            <h1
              className="rise mt-5 bg-gradient-to-b from-parchment via-brass-bright to-brass bg-clip-text font-display text-6xl leading-[0.92] text-transparent sm:text-7xl lg:text-8xl"
              style={{ animationDelay: '0.15s' }}
            >
              {guild.name.split(' ').map((word) => (
                <span key={word} className="block">
                  {word}
                </span>
              ))}
            </h1>

            <p
              className="rise mt-7 max-w-xl font-display text-2xl leading-snug text-parchment sm:text-3xl"
              style={{ animationDelay: '0.3s' }}
            >
              {guild.tagline}
            </p>

            <p
              className="rise mt-5 max-w-xl text-lg leading-relaxed text-parchment-dim"
              style={{ animationDelay: '0.4s' }}
            >
              {guild.intro}
            </p>

            <div
              className="rise mt-10 flex flex-wrap items-center gap-5"
              style={{ animationDelay: '0.5s' }}
            >
              <DiscordButton />
              <a
                href="#charter"
                className="font-display text-lg tracking-wide text-parchment-dim underline decoration-brass/40 decoration-1 underline-offset-8 transition-colors hover:text-brass-bright hover:decoration-brass-bright"
              >
                Read the charter
              </a>
            </div>

            <div
              className="rise mt-14 border-t border-brass/20 pt-7"
              style={{ animationDelay: '0.65s' }}
            >
              <Countdown />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Charter ---------- */}
      <section id="charter" className="relative border-t border-brass/15 bg-ink-2">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
            <h2 className="md:col-span-5">
              <span className="block text-xs uppercase tracking-[0.35em] text-brass">
                The charter
              </span>
              <span className="mt-4 block font-display text-4xl leading-tight text-parchment sm:text-5xl">
                Three things we
                <br className="hidden sm:block" /> actually hold to
              </span>
            </h2>
            <p className="self-end text-base leading-relaxed text-parchment-dim md:col-span-6 md:col-start-7">
              Guild rules are usually a wall of text nobody reads. Ours fit on the back of
              a tabard.
            </p>
          </div>

          <ol className="mt-20 grid grid-cols-1 gap-y-16 md:grid-cols-12">
            {guild.tenets.map((tenet, i) => (
              <li
                key={tenet.title}
                className={`border-t border-brass/20 pt-8 md:col-span-7 ${TENET_COL[i]}`}
              >
                <div className="flex items-start gap-6 sm:gap-10">
                  <span
                    aria-hidden="true"
                    className="font-display text-5xl leading-none text-brass/35 sm:text-6xl"
                  >
                    {ROMAN[i]}
                  </span>
                  <div>
                    <h3 className="font-display text-3xl leading-tight text-brass-bright sm:text-4xl">
                      {tenet.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-lg leading-relaxed text-parchment-dim">
                      {tenet.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Schedule ---------- */}
      <section id="schedule" className="relative border-t border-brass/15">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="block text-xs uppercase tracking-[0.35em] text-brass">
                The week
              </span>
              <h2 className="mt-4 font-display text-4xl leading-tight text-parchment sm:text-5xl">
                When we are
                <br /> actually online
              </h2>
              <p className="mt-6 text-base leading-relaxed text-parchment-dim">
                {guild.realmNote}
              </p>
            </div>

            <dl className="md:col-span-7 md:col-start-6">
              {guild.schedule.map((slot) => (
                <div
                  key={slot.when}
                  className="grid grid-cols-1 gap-2 border-t border-brass/20 py-8 first:border-t-0 first:pt-0 sm:grid-cols-[13rem_1fr] sm:gap-8"
                >
                  <dt>
                    <span className="block font-display text-2xl leading-tight text-brass-bright">
                      {slot.when}
                    </span>
                    <span className="mt-1 block text-sm uppercase tracking-[0.15em] text-parchment-dim">
                      {slot.time}
                    </span>
                  </dt>
                  <dd className="text-lg leading-relaxed text-parchment-dim">
                    {slot.what}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------- Join ---------- */}
      <section
        id="join"
        className="relative isolate overflow-hidden border-t border-brass/15 bg-ink-2"
      >
        <div
          aria-hidden="true"
          className="absolute -top-40 left-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-ember/10 blur-3xl"
        />
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
          <img
            src={img('crest.png', 'w=440&h=440&fit=cover&fm=webp&q=85')}
            alt={`The ${guild.name} crest: a battered tankard crossed with a worn sword`}
            width={176}
            height={176}
            className="mx-auto h-40 w-40 rounded-full ring-1 ring-brass/30 sm:h-44 sm:w-44"
          />

          <h2 className="mt-10 font-display text-4xl leading-tight text-parchment sm:text-5xl">
            There is room at the table
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-parchment-dim">
            No application form, no interview, no logs to submit. Come into the Discord,
            say hello, and tell us what you are planning to roll on{' '}
            {guild.launchLabel}.
          </p>

          <div className="mt-10 flex justify-center">
            <DiscordButton />
          </div>

          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-parchment-dim">
            {guild.rosterNote}
          </p>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-brass/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div>
            <p className="font-display text-lg tracking-wide text-parchment">
              {guild.name}
            </p>
            <p className="mt-1 text-sm text-parchment-dim">
              A player-run {guild.game} guild. Not affiliated with or endorsed by
              Blizzard Entertainment.
            </p>
          </div>
          <a
            href={guild.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start border-b border-brass/40 pb-0.5 text-sm uppercase tracking-[0.2em] text-parchment-dim transition-colors hover:border-brass-bright hover:text-brass-bright sm:self-auto"
          >
            <DiscordGlyph className="h-4 w-4" />
            discord.gg
          </a>
        </div>
      </footer>
    </div>
  )
}
