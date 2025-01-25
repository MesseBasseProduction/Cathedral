import { Routes } from '@angular/router'

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./software.component').then(c => c.SoftwareComponent),
    },
]
