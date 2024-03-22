import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
    selector: 'app-music',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './music.component.html',
    styleUrl: './music.component.css',
})
export class MusicComponent {}
