/**
 * Every editable detail about the guild lives here.
 * Change copy, times, or the Discord invite in this file and the page follows.
 */
export const guild = {
  name: 'Filthy Casuals',
  game: 'Warcraft Forever',
  discordUrl: 'https://discord.gg/NSd3EqPGaA',

  /** Warcraft Forever launch day. Adjust if Blizzard shifts the date or you want a local unlock time. */
  launchISO: '2026-11-04T23:00:00Z',
  launchLabel: 'November 4',

    intro:
    'A guild for people with jobs, kids, and a fondness for the game that does not depend on being good at it. We clear the content. It just takes us a couple of extra pulls.',

  /** The guild charter — the three things we actually hold to. */
  tenets: [
    {
      title: 'Our Mission',
      body:
        'The mission of Filthy Casuals is to build an enduring community of World of Warcraft Classic gamers founded on friendship, fun, honor, and mutual respect.',
    },
    {
      title: 'Our Vision',
      body:
        'The vision of Filthy Casuals is to treat others as you would want to be treated.',
    },
    {
      title: 'Filthy Casuals is for anyone, not for everyone.',
      body:
        `We're here to game, so keep guild chat free of controversial topics such as politics, religion, or cultural issues. Sexual harassment and racism will not be tolerated. Character names that are vulgar will be removed from the guild. Keep guild chat family friendly.`,
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
