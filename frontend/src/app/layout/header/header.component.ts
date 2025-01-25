import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { MenuModule } from 'primeng/menu'
import { AuthService } from '../../common/services/auth.service'
import { DividerModule } from 'primeng/divider'
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ThemeService } from '../../common/services/theme.service'

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        DividerModule,
        MenuModule,
        BreadcrumbsComponent,
        ReactiveFormsModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    public readonly authService = inject(AuthService)
    public readonly themeService = inject(ThemeService)
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

    onLogout(): void {
        this.authService.logout()
    }

    onVariantToggle(): void {
        this.themeService.switchVariant()
    }
}
