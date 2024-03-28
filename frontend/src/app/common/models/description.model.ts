import { DescriptionLangEnum } from '../enums/description-lang.enum'

export type Description = {
    lang: DescriptionLangEnum | null
    description: string
}
