import { Link } from './link.model'
import { Description } from './description.model'

export type Artist = {
    id: number
    name: string
    image: string
    genres: string[]
    mainLink: string
    links: Link[]
    descriptions: Description[]
}

export type ArtistCreate = Omit<Artist, 'id'>

export type ArtistUpdate = Partial<ArtistCreate>
