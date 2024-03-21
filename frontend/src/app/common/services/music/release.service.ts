import { Injectable } from '@angular/core'
import { CrudService } from '../crud.service'
import { Release, ReleaseCreate, ReleaseUpdate } from '../../models/release.model'

@Injectable()
export class ReleaseService extends CrudService<Release> {
    override path = this.host + '/release/'

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
