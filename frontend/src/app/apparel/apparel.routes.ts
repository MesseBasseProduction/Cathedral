import { Routes } from '@angular/router'

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./apparel.component').then(c => c.ApparelComponent),
    },
]