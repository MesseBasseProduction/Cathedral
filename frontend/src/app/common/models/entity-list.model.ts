export type EntityList<T> = {
    count: number
    page: number
    size: number
    first: boolean
    last: boolean
    content: T[]
}
