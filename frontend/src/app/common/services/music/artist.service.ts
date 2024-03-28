import { Injectable } from '@angular/core'
import { Artist, ArtistCreate, ArtistUpdate } from '../../models/artist.model'
import { CrudService } from '../crud.service'

@Injectable({
    providedIn: 'root',
})
export class ArtistService extends CrudService<Artist> {
    override readonly path = this.host + '/artist/'

    constructor() {
        super('Artist')
    }

    public loadArtists() {
        this.loadEntities$.next({})
    }

    public createArtist(artist: ArtistCreate) {
        this.createEntity$.next(artist)
    }

    public updateArtist(id: number, artist: ArtistUpdate) {
        this.updateEntity$.next([id, artist])
    }

    public deleteArtist(id: number) {
        this.deleteEntity$.next(id)
    }
}
