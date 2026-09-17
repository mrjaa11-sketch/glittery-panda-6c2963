/**
 * Every editable detail about the guild lives here.
 * Change copy, times, or the Discord invite in this file and the page follows.
 */
export const guild = {
  name: 'Filthy Casuals',
  game: 'Warcraft Forever',
  discordUrl: 'https://discord.gg/NSd3EqPGaA',

  /** Warcraft Forever launch day. Adjust if Blizzard shifts the date or you want a local unlock time. */
  launchISO: '2026-11-04T00:00:00Z',
  launchLabel: 'November 4',

  tagline: 'TEST We raid on Tuesdays, we wipe with dignity, and we log off at eleven.',
  intro:
    'A guild for people with jobs, kids, and a fondness for the game that does not depend on being good at it. We clear the content. It just takes us a couple of extra pulls.',

  /** The guild charter — the three things we actually hold to. */
  tenets: [
    {
      title: 'Parses are private',
      body:
        'We clear the content without posting logs in chat to make a point about somebody’s uptime. If you want help squeezing more out of your rotation, ask and you will get it — quietly, and only because you asked.',
    },
    {
      title: 'We finish on time',
      body:
        'Raid ends at eleven. Mid-pull, mid-sentence, mid-boss — it ends. People have early alarms and small children, and nobody here gets guilted into a third night.',
    },
    {
      title: 'Ask the obvious question',
      body:
        'Nobody read the strategy guide either. Ask in voice and someone will walk you through it without sighing into their microphone first.',
    },
  ],

  /** When we are actually online. */
  schedule: [
    {
      when: 'Tuesday & Thursday',
      time: '8:30 – 11:00 PM ET',
      what:
        'Raid nights. Normal until the roster settles, Heroic once it has. Sign-ups go in Discord, and showing up late beats not showing up.',
    },
    {
      when: 'Sunday',
      time: 'Whenever people wander in',
      what:
        'Keys, alt runs, and at least one person stuck on a quest chain who needs two more bodies.',
    },
    {
      when: 'Launch week',
      time: 'From November 4 onward',
      what:
        'Server-first is not the plan. Getting the whole roster levelled together, with a queue full of people talking nonsense, is the plan.',
    },
  ],

  /** Realm and faction are unknown until Blizzard announces servers. */
  realmNote: 'Realm and faction get posted in Discord the moment servers are announced.',

  rosterNote: '41 of us signed on so far',
} as const
