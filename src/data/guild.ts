/**
 * Every editable detail about the guild lives here.
 * Change copy, times, or the Discord invite in this file and the page follows.
 */
export const guild = {
  name: 'Filthy Casuals',
  game: 'Warcraft Forever',
  discordUrl: 'https://discord.gg/filthycasuals',

  /** Warcraft Forever launch day. Adjust if Blizzard shifts the date or you want a local unlock time. */
  launchISO: '2026-11-04T23:00:00Z',
  launchLabel: 'November 4',

    intro:
    'A guild for Casuals, Raiders, Explorers, PVP, and Social events. ',

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
      when: 'Now until Release.',
      time: 'Every Day',
      what:
        'The Beta',
    },
    {
      when: 'November 4th',
      time: 'As long as it takes',
      what:
        'PVE Ruleset- Alliance - Waiting in queue!',
    },
    {
      when: 'Launch week',
      time: 'From November 4 onward',
      what:
        'Some members play a little and some members play a LOT. All are welcome!',
    },
  ],

  /** Realm and faction are unknown until Blizzard announces servers. */
  realmNote: 'PVE Ruleset - Alliance.',

  rosterNote: 'Hundreds of us signed on so far',
} as const
