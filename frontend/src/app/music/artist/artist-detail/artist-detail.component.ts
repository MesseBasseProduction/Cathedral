import { Component, input } from '@angular/core'
import { Artist } from '../../../common/models/artist.model'

@Component({
    selector: 'app-artist-detail',
    standalone: true,
    imports: [],
    templateUrl: './artist-detail.component.html',
    styleUrl: './artist-detail.component.css',
})
export class ArtistDetailComponent {
    artist = input.required<Artist>()
}
