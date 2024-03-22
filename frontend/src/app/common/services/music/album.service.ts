import { Injectable } from '@angular/core'
import { Album, AlbumCreate, AlbumUpdate } from '../../models/album.model'
import { CrudService } from '../crud.service'

@Injectable({
    providedIn: 'root',
})
export class AlbumService extends CrudService<Album> {
    override path = this.host + '/album/'

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
