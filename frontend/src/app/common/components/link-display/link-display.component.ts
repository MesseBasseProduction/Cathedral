import { Component, input } from '@angular/core'
import { Link } from '../../models/link.model'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-link-display',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './link-display.component.html',
    styleUrl: './link-display.component.scss',
})
export class LinkDisplayComponent {
    link = input.required<Link>()
}
