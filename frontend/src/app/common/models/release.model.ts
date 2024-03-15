import { Link } from './link.model'

export type Release = {
    id: number
    artistNames: string[]
    name: string
    catalog: string
    date: string
    image: string
    mainLink: string
    artistId: number
    links: Link[]
}

export type ReleaseCreate = Omit<Release, 'id'>

export type ReleaseUpdate = Partial<ReleaseCreate>
