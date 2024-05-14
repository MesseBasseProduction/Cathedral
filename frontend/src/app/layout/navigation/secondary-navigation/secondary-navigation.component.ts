import { Component, OnInit, inject, model } from '@angular/core'
import {
    ActivatedRoute,
    NavigationEnd,
    Router,
    RouterLink,
    RouterLinkActive,
} from '@angular/router'
import { distinctUntilChanged, filter, tap } from 'rxjs'
import { PathPrefixes } from '../../../common/enums/path-prefix.enum'

type MenuItem = {
    label: string
    url: string
    icon_name: string
}

@Component({
    selector: 'app-secondary-navigation',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './secondary-navigation.component.html',
    styleUrl: './secondary-navigation.component.css',
})
export class SecondaryNavigationComponent implements OnInit {
    private router = inject(Router)
    public activatedRoute = inject(ActivatedRoute)
    public menuItems = model<MenuItem[]>([])

    ngOnInit(): void {
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                distinctUntilChanged(),
                tap(() => this.menuItems.set(this.getMenuItemsFromRoute(this.activatedRoute)))
            )
            .subscribe()
    }

    private getMenuItemsFromRoute(route: ActivatedRoute): MenuItem[] {
        const root = route.root.snapshot

        if (root.children.length === 0) {
            return []
        }

        if (root.children.length === 1) {
            switch (root.children[0].url[0].path) {
                case PathPrefixes.MUSIC:
                    return [
                        {
                            label: 'Artists',
                            url: './artist',
                            icon_name: 'artist',
                        },
                        {
                            label: 'Albums',
                            url: './album',
                            icon_name: 'album',
                        },
                        {
                            label: 'Releases',
                            url: './release',
                            icon_name: 'new_releases',
                        },
                    ]
                case PathPrefixes.APPAREL:
                    return []
                case PathPrefixes.SOFTWARE:
                    return []
                default:
                    return []
            }
        }

        return []
    }
}
