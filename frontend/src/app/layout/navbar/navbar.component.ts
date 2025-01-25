import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { Menu } from 'primeng/menu'
import { MenuItem } from 'primeng/api'

@Component({
    selector: 'app-navbar',
    imports: [RouterLinkActive, RouterLink, Menu],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
    public menuItems: MenuItem[] = [
        { separator: true },
        {
            label: 'Organisation',
            expanded: false,
            items: [
                {
                    label: 'Association',
                },
                {
                    label: 'Members',
                },
                {
                    label: 'Documents',
                },
            ],
        },
        {
            label: 'Creation',
            items: [
                {
                    label: 'Artists',
                    routerLink: '/music/artist',
                },
                {
                    label: 'Releases',
                    routerLink: '/music/release',
                },
                {
                    label: 'Podcast',
                },
                {
                    label: 'Software',
                    routerLink: '/software',
                },
                {
                    label: 'Artist Software',
                },

                {
                    label: 'Photo Exposition',
                },
                {
                    label: 'Video',
                },
            ],
        },
        {
            label: 'Event',
            items: [
                {
                    label: 'Organized Event',
                },
                {
                    label: 'Photo Report',
                },
            ],
        },
        {
            label: 'Merch',
            items: [
                {
                    label: 'Apparel',
                    routerLink: '/apparel',
                },
                {
                    label: 'Albums',
                    routerLink: '/music/album',
                },
            ],
        },
    ]

    menuStyle = {
        background: 'none',
        list: { padding: '4px 4px 16px 4px' },
        // border: { radius: 0 },
    }
}
