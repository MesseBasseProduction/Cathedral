import { Routes } from '@angular/router'

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./music.component').then(c => c.MusicComponent),
    },
    {
        path: 'artist',
        loadComponent: () => import('./artist/artist.component').then(c => c.ArtistComponent),
    },
]
