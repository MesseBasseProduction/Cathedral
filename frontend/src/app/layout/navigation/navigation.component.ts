import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { AuthService } from '../../common/services/auth.service'
import { UserService } from '../../common/services/user.service'

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
    private readonly authService = inject(AuthService)
    public readonly userService = inject(UserService)

    onLogout() {
        this.authService.logout()
    }
}
