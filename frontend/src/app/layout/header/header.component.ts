import { CommonModule, TitleCasePipe } from '@angular/common'
import { Component, OnInit, inject, signal } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router'
import { MenuItem } from 'primeng/api'
import { BreadcrumbModule } from 'primeng/breadcrumb'
import { ButtonModule } from 'primeng/button'
import { MenuModule } from 'primeng/menu'
import { distinctUntilChanged, filter } from 'rxjs'
import { ThemeVariantToggleComponent } from '../../common/components/theme-variant-toggle/theme-variant-toggle.component'
import { AuthService } from '../../common/services/auth.service'
import { NavigationComponent } from '../navigation/navigation.component'

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        BreadcrumbModule,
        ButtonModule,
        MenuModule,
        NavigationComponent,
        ThemeVariantToggleComponent,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
    private readonly router = inject(Router)
    private readonly activatedRoute = inject(ActivatedRoute)
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
    public breadcrumbHome: MenuItem = {
        icon: 'pi pi-home',
        routerLink: '/home',
    }
    public breadcrumbItems = signal<MenuItem[]>([])

    ngOnInit() {
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                distinctUntilChanged()
            )
            .subscribe(() =>
                this.breadcrumbItems.update(() => this.createBreadcrumbs(this.activatedRoute.root))
            )
    }

    onLogout() {
        this.authService.logout()
    }

    private createBreadcrumbs(
        route: ActivatedRoute,
        url: string = '',
        breadCrumbs: MenuItem[] = []
    ): MenuItem[] {
        if (route.children.length === 0) {
            return breadCrumbs
        }

        for (const child of route.children) {
            const routeUrl = child.snapshot.url.map(segment => segment.path).join('/')
            if (routeUrl !== '' && routeUrl !== 'home') {
                url += `/${routeUrl}`
                const label = new TitleCasePipe().transform(routeUrl.split('/').at(-1)) ?? ''
                breadCrumbs.push({
                    label: label,
                    url: url,
                })
            }

            return this.createBreadcrumbs(child, url, breadCrumbs)
        }
        return breadCrumbs
    }
}
