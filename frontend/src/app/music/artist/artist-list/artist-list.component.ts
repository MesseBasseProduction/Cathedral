import { Component, input } from '@angular/core'
import { DataViewModule } from 'primeng/dataview'
import { Artist } from '../../../common/models/artist.model'

@Component({
    selector: 'app-artist-list',
    standalone: true,
    imports: [DataViewModule],
    templateUrl: './artist-list.component.html',
    styleUrl: './artist-list.component.css',
})
export class ArtistListComponent {
    public artists = input.required<Artist[]>()
}
