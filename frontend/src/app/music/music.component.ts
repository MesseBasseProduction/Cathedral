import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
    selector: 'app-music',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './music.component.html',
    styleUrl: './music.component.scss',
})
export class MusicComponent {}
