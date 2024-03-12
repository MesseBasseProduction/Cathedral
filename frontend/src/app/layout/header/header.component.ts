import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { MenuItem } from 'primeng/api'
import { MenuModule } from 'primeng/menu'
import { AuthService } from '../../common/services/auth.service'
import { DOCUMENT } from '@angular/common'

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, MenuModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    public readonly authService = inject(AuthService)
    private readonly document: Document = inject(DOCUMENT)

    public menuItems: MenuItem[] = [
        {
            routerLink: '/login',
            label: 'Logout',
            command: this.onLogout.bind(this),
        },
        {
            routerLink: '/profile',
            label: 'Profile',
        },
    ]

    onLogout() {
        this.authService.logout()
    }

    onTheme() {
        const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement
        const light = 'lara-blue-light.css'
        const dark = 'lara-blue-dark.css'

        if (themeLink.href === `http://localhost:4200/${light}`) {
            themeLink.href = dark
        } else {
            themeLink.href = light
        }
    }
}
