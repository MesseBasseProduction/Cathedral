import { Component, OnInit, inject } from '@angular/core'
import { ArtistService } from '../../common/services/music/artist.service'
import { ArtistListComponent } from './artist-list/artist-list.component'
import { ArtistCreateComponent } from './artist-create/artist-create.component'

@Component({
    selector: 'app-artist',
    standalone: true,
    imports: [ArtistListComponent, ArtistCreateComponent],
    providers: [ArtistService],
    templateUrl: './artist.component.html',
    styleUrl: './artist.component.scss',
})
export class ArtistComponent implements OnInit {
    public readonly artistService = inject(ArtistService)

    ngOnInit(): void {
        this.artistService.loadArtists()
    }
}
