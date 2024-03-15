import { Routes } from '@angular/router'

export const routes: Routes = [
    {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent),
    },
    {
        path: 'settings',
        loadComponent: () => import('./settings/settings.component').then(c => c.SettingsComponent),
    },
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'prefix',
    },
]
