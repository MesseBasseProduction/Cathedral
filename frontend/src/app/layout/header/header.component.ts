import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { MenuItem } from 'primeng/api'
import { MenuModule } from 'primeng/menu'
import { AuthService } from '../../common/services/auth.service'
import { ThemeVariantToggleComponent } from '../../common/components/theme-variant-toggle/theme-variant-toggle.component'

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, MenuModule, ThemeVariantToggleComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
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
