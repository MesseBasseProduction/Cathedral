export type Album = {
    id: number
    name: string
    catalog: string
    image: string
    price: AlbumPrice
}

export type AlbumPrice = {
    regular: number
    signed: number
}

export type AlbumCreate = Omit<Album, 'id'>

export type AlbumUpdate = Partial<AlbumCreate>
