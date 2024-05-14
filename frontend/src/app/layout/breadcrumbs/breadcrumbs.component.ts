import { TitleCasePipe } from '@angular/common'
import { Component, OnInit, inject, signal } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router'
import { MenuItem } from 'primeng/api'
import { BreadcrumbModule } from 'primeng/breadcrumb'
import { distinctUntilChanged, filter } from 'rxjs'

@Component({
    selector: 'app-breadcrumbs',
    standalone: true,
    imports: [RouterLink, BreadcrumbModule],
    templateUrl: './breadcrumbs.component.html',
    styleUrl: './breadcrumbs.component.css',
})
export class BreadcrumbsComponent implements OnInit {
    private router = inject(Router)
    private activatedRoute = inject(ActivatedRoute)

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
                    target: '_self',
                })
            }

            return this.createBreadcrumbs(child, url, breadCrumbs)
        }
        return breadCrumbs
    }
}
