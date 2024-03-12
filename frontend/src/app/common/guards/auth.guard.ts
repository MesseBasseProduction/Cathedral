import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { UserService } from '../services/user.service'

export const authGuard: CanActivateFn = () => {
    const userService = inject(UserService)
    const router = inject(Router)
    if (userService.status() === 'loading' || userService.status() === 'loggedin') {
        return true
    }
    router.navigate(['login'])
    return false
}
