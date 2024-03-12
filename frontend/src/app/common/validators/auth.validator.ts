import { Injectable, inject } from '@angular/core'
import { AbstractControl, ValidationErrors } from '@angular/forms'
import { Observable, map } from 'rxjs'
import { UserService } from '../services/user.service'

export const PASSWORD_PATTERN =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%*^?&])[a-zA-Z\d!@#$%*^&]{12,}$/gm

@Injectable()
export class AuthValidators {
    private readonly userService = inject(UserService)

    public emailUnique(control: AbstractControl): Observable<ValidationErrors | null> {
        return this.userService
            .validateEmailUnique(control.value)
            .pipe(map(res => (res.unique ? null : { emailUnique: true })))
    }

    public usernameUnique(control: AbstractControl): Observable<ValidationErrors | null> {
        return this.userService
            .validateUsernameUnique(control.value, 0)
            .pipe(map(res => (res.unique ? null : { usernameUnique: true })))
    }

    static passwordMatch(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value
        const confirm = control.get('confirm')?.value

        return password && confirm && password === confirm ? null : { passwordMatch: true }
    }
}
