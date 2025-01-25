import { Component, input } from '@angular/core'
import { Artist } from '../../../types/artist.type'
import { CommonModule } from '@angular/common'
import { DividerModule } from 'primeng/divider'
import { LinkDisplayComponent } from '../../../../common/components/link-display/link-display.component'

@Component({
    selector: 'app-artist-detail',
    standalone: true,
    imports: [CommonModule, DividerModule, LinkDisplayComponent],
    templateUrl: './artist-detail.component.html',
    styleUrl: './artist-detail.component.scss',
})
export class ArtistDetailComponent {
    artist = input.required<Artist>()
}
