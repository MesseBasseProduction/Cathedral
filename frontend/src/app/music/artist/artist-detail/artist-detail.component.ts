import { Component, input } from '@angular/core'
import { Artist } from '../../../common/models/artist.model'
import { CommonModule } from '@angular/common'
import { DividerModule } from 'primeng/divider'
import { LinkDisplayComponent } from '../../../common/components/link-display/link-display.component'

@Component({
    selector: 'app-artist-detail',
    standalone: true,
    imports: [CommonModule, DividerModule, LinkDisplayComponent],
    templateUrl: './artist-detail.component.html',
    styleUrl: './artist-detail.component.css',
})
export class ArtistDetailComponent {
    artist = input.required<Artist>()
}
