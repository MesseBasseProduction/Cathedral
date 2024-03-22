import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { MenuItem } from 'primeng/api'
import { MenuModule } from 'primeng/menu'
import { ThemeVariantToggleComponent } from '../../common/components/theme-variant-toggle/theme-variant-toggle.component'
import { AuthService } from '../../common/services/auth.service'
import { NavigationComponent } from '../navigation/navigation.component'
import { ButtonModule } from 'primeng/button'

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        RouterLink,
        MenuModule,
        ThemeVariantToggleComponent,
        NavigationComponent,
        ButtonModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    public readonly authService = inject(AuthService)
    public menuItems: MenuItem[] = [
        {
            routerLink: '/login',
            label: 'Logout',
            command: this.onLogout.bind(this),
        },
        {
            routerLink: '/user/profile',
            label: 'Profile',
        },
        {
            routerLink: '/user/settings',
            label: 'Settings',
        },
    ]

    onLogout() {
        this.authService.logout()
    }
}
