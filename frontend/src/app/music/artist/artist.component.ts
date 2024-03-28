import { Component, OnInit, inject } from '@angular/core'
import { Artist } from '../../common/models/artist.model'
import { ArtistService } from '../../common/services/music/artist.service'
import { ArtistCreateComponent } from './artist-create/artist-create.component'
import { ArtistDetailComponent } from './artist-detail/artist-detail.component'
import { ArtistListComponent } from './artist-list/artist-list.component'

@Component({
    selector: 'app-artist',
    standalone: true,
    imports: [ArtistListComponent, ArtistCreateComponent, ArtistDetailComponent],
    templateUrl: './artist.component.html',
    styleUrl: './artist.component.css',
})
export class ArtistComponent implements OnInit {
    public readonly artistService = inject(ArtistService)

    mode: 'create' | 'update' | 'detail' | undefined = undefined
    artist: Artist | undefined = undefined

    ngOnInit(): void {
        this.artistService.loadArtists()
    }
}
