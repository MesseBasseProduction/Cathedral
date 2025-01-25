import { Injectable } from '@angular/core'
import { CrudService } from '../../common/services/crud.service'
import { Release, ReleaseCreate, ReleaseUpdate } from '../types/release.type'

@Injectable({
    providedIn: 'root',
})
export class ReleaseService extends CrudService<Release> {
    override path = this.host + '/release/'

    constructor() {
        super('Release')
    }

    public loadReleases() {
        this.loadEntities$.next({})
    }

    public createRelease(release: ReleaseCreate) {
        this.createEntity$.next(release)
    }

    public updateRelease(id: number, release: ReleaseUpdate) {
        this.updateEntity$.next([id, release])
    }

    public deleteRelease(id: number) {
        this.deleteEntity$.next(id)
    }
}
