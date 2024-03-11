import { Routes } from '@angular/router'
import { authGuard } from './common/guard/auth.guard'

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
        canActivate: [authGuard],
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./authentication/login/login.component').then(c => c.LoginComponent),
        // component: LoginComponent
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./authentication/register/register.component').then(c => c.RegisterComponent),
        // component: RegisterComponent
    },
    {
        path: 'activate',
        loadComponent: () =>
            import('./authentication/activate/activate.component').then(c => c.ActivateComponent),
        // component: ActivateComponent
    },
    {
        path: 'profile',
        loadComponent: () =>
            import('./user/profile/profile.component').then(c => c.ProfileComponent),
        // component: ProfileComponent,
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
]
