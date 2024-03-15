import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { MenuItem } from 'primeng/api'
import { TabMenuModule } from 'primeng/tabmenu'
import { UserService } from '../../common/services/user.service'

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [RouterLink, TabMenuModule],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
    public readonly userService = inject(UserService)

    public menuItems: MenuItem[] = [
        {
            label: 'Music',
            routerLink: '/music',
        },
        {
            label: 'Apparel',
            routerLink: '/apparel',
        },
        {
            label: 'Software',
            routerLink: '/software',
        },
    ]
}
