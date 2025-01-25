import { Routes } from '@angular/router'
import { authGuard } from './authentication/guards/auth.guard'

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
        canActivate: [authGuard],
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./authentication/pages/login/login.component').then(c => c.LoginComponent),
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./authentication/pages/register/register.component').then(
                c => c.RegisterComponent
            ),
    },
    {
        path: 'activate',
        loadComponent: () =>
            import('./authentication/pages/activate/activate.component').then(
                c => c.ActivateComponent
            ),
    },
    {
        path: 'user',
        loadChildren: () => import('./user/user.routes').then(r => r.routes),
        canActivate: [authGuard],
    },
    {
        path: 'music',
        title: 'Music',
        loadChildren: () => import('./creations/music.routes').then(r => r.routes),
        canActivate: [authGuard],
    },
    {
        path: 'apparel',
        loadChildren: () => import('./merch/pages/apparel/apparel.routes').then(r => r.routes),
        canActivate: [authGuard],
    },
    {
        path: 'software',
        loadChildren: () =>
            import('./creations/pages/software/software.routes').then(r => r.routes),
        canActivate: [authGuard],
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
]
