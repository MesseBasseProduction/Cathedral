import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ActivateComponent } from "./activate/activate.component";
import { AuthenticationComponent } from "./authentication.component";

export const routes: Route[] = [
    {
        path: '',
        component: AuthenticationComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'activate',
        component: ActivateComponent,
    }
];