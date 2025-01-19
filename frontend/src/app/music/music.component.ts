import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
    selector: 'app-music',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './music.component.html',
    styleUrl: './music.component.css',
})
export class MusicComponent {}
