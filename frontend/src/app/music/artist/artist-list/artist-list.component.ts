import { Component, input } from '@angular/core'
import { Artist } from '../../../common/models/artist.model'

@Component({
    selector: 'app-artist-list',
    standalone: true,
    imports: [],
    templateUrl: './artist-list.component.html',
    styleUrl: './artist-list.component.css',
})
export class ArtistListComponent {
    public artists = input.required<Artist[]>()
}
