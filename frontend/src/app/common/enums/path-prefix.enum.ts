export const PathPrefixes = {
    MUSIC: 'music',
    APPAREL: 'apparel',
    SOFTWARE: 'software',
} as const

export type PathPrefixEnum = (typeof PathPrefixes)[keyof typeof PathPrefixes]
