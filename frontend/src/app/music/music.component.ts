import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
    selector: 'app-music',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './music.component.html',
    styleUrl: './music.component.scss',
})
export class MusicComponent {}
