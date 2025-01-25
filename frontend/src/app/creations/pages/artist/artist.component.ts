import { Component, inject, OnInit } from '@angular/core'
import { Artist } from '../../types/artist.type'
import { ArtistService } from '../../services/artist.service'
import { ArtistCreateComponent } from './artist-create/artist-create.component'
import { ArtistDetailComponent } from './artist-detail/artist-detail.component'
import { ArtistListComponent } from './artist-list/artist-list.component'
import { TitleComponent } from '../../../common/components/title/title.component'

@Component({
    selector: 'app-artist',
    standalone: true,
    imports: [ArtistListComponent, ArtistCreateComponent, ArtistDetailComponent, TitleComponent],
    templateUrl: './artist.component.html',
    styleUrl: './artist.component.scss',
})
export class ArtistComponent implements OnInit {
    public readonly artistService = inject(ArtistService)

    mode: 'create' | 'update' | 'detail' | undefined = undefined
    artist: Artist | undefined = undefined

    ngOnInit(): void {
        this.artistService.loadArtists()
    }
}
