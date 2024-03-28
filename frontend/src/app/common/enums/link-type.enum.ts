export const LinkTypes = {
    AMAZON: 'AM',
    APPLE: 'AP',
    BANDCAMP: 'BC',
    DEEZER: 'DZ',
    DISCOGS: 'DC',
    FACEBOOK: 'FB',
    FLICKR: 'FL',
    GITHUB: 'GH',
    INSTAGRAM: 'IG',
    LINKEDIN: 'LI',
    MIXCLOUD: 'MC',
    SOUNDCLOUD: 'SC',
    SPOTIFY: 'SP',
    TIDAL: 'TD',
    TWITTER: 'TW',
    YOUTUBE: 'YT',
} as const

export type LinkTypeEnum = (typeof LinkTypes)[keyof typeof LinkTypes]
