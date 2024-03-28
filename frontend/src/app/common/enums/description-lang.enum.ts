export const DescriptionLangs = {
    FR: 'FR',
    EN: 'EN',
} as const

export type DescriptionLangEnum = (typeof DescriptionLangs)[keyof typeof DescriptionLangs]
