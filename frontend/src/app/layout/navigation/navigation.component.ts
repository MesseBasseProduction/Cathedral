import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { UserService } from '../../common/services/user.service'

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
    public readonly userService = inject(UserService)
}
