import { Injectable } from '@angular/core'
import { Album, AlbumCreate, AlbumUpdate } from '../types/album.type'
import { CrudService } from '../../common/services/crud.service'

@Injectable({
    providedIn: 'root',
})
export class AlbumService extends CrudService<Album> {
    override path = this.host + '/album/'

    constructor() {
        super('Album')
    }

    public loadAlbums() {
        this.loadEntities$.next({})
    }

    public createAlbum(album: AlbumCreate) {
        this.createEntity$.next(album)
    }

    public updateAlbum(id: number, album: AlbumUpdate) {
        this.updateEntity$.next([id, album])
    }

    public deleteAlbum(id: number) {
        this.deleteEntity$.next(id)
    }
}
