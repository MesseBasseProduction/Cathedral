import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { ApplicationConfig } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter, withComponentInputBinding } from '@angular/router'
import { routes } from './app.routes'
import { AuthInterceptor } from './common/auth.interceptor'
import { MessageService } from 'primeng/api'
import { providePrimeNG } from 'primeng/config'
import Aura from '@primeng/themes/aura'

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(withInterceptors([AuthInterceptor])),
        provideAnimationsAsync(),
        {
            provide: MessageService,
        },
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.dark-mode',
                },
            },
        }),
    ],
}
