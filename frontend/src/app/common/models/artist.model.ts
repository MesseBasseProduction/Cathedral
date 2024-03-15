import { Link } from './link.model'

export type Artist = {
    id: number
    name: string
    image: string
    genres: string[]
    mainLink: string
    links: Link[]
    descriptions: ArtistDescription[]
}

export type ArtistCreate = Omit<Artist, 'id'>

export type ArtistUpdate = Partial<ArtistCreate>

export type ArtistDescription = {
    lang: string
    description: string
}
