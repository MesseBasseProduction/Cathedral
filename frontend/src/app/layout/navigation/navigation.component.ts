import { Component, inject } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { UserService } from '../../common/services/user.service'

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
    public readonly userService = inject(UserService)

    public menuItems: {
        label: string
        url: string
        icon_name: string
    }[] = [
        {
            label: 'Music',
            url: '/music',
            icon_name: 'music_note',
        },
        {
            label: 'Apparel',
            url: '/apparel',
            icon_name: 'apparel',
        },
        {
            label: 'Software',
            url: '/software',
            icon_name: 'code',
        },
    ]
}
