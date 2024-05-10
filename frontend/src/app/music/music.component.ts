import { Component } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'

@Component({
    selector: 'app-music',
    standalone: true,
    imports: [RouterLink, RouterOutlet],
    templateUrl: './music.component.html',
    styleUrl: './music.component.css',
})
export class MusicComponent {}
