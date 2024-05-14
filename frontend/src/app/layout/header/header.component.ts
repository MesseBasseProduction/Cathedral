import { CommonModule } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { MenuModule } from 'primeng/menu'
import { ThemeVariantToggleComponent } from '../../common/components/theme-variant-toggle/theme-variant-toggle.component'
import { AuthService } from '../../common/services/auth.service'
import { NavigationComponent } from '../navigation/navigation.component'
import { DividerModule } from 'primeng/divider'
import { SecondaryNavigationComponent } from '../navigation/secondary-navigation/secondary-navigation.component'

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        DividerModule,
        MenuModule,
        NavigationComponent,
        SecondaryNavigationComponent,
        ThemeVariantToggleComponent,
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
    public secondaryItems = signal<{ label: string; url: string; icon_name: string }[]>([])

    onLogout() {
        this.authService.logout()
    }
}
