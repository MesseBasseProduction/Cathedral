import { Component, input, model } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { DataViewModule } from 'primeng/dataview'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { Artist } from '../../../common/models/artist.model'

@Component({
    selector: 'app-artist-list',
    standalone: true,
    imports: [
        ButtonModule,
        DataViewModule,
        FormsModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
    ],
    templateUrl: './artist-list.component.html',
    styleUrl: './artist-list.component.css',
})
export class ArtistListComponent {
    mode = model<'detail' | 'create' | 'update' | undefined>()
    artist = model<Artist>()

    public artists = input.required<Artist[]>()
    public search = ''

    onAdd() {
        this.mode.update(() => 'create')
    }

    onUpdate(artist: Artist) {
        this.mode.update(() => 'update')
        this.artist.update(() => artist)
    }

    onDetail(artist: Artist) {
        this.mode.update(() => 'detail')
        this.artist.update(() => artist)
    }

    onDelete(id: number) {
        // TODO implement deletion
        console.log(id)
    }
}
