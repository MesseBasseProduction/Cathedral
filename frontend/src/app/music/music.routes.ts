import { Routes } from '@angular/router'

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./music.component').then(c => c.MusicComponent),
    },
]
