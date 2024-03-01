import { HttpClient, HttpHandler, HttpXhrBackend } from '@angular/common/http'
import { Injector } from '@angular/core'
import { AbstractControl, ValidationErrors } from '@angular/forms'
import { Observable, map } from 'rxjs'
import { UserService } from '../services/user.service'

export const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%*^?&])[a-zA-Z\d!@#$%*^&]{12,}$/gm

export class AuthValidators {
    static emailUnique(control: AbstractControl): Observable<ValidationErrors | null> {
        return emailUniqueValidator(control)
    }

    static usernameUnique(control: AbstractControl): Observable<ValidationErrors | null> {
        return usernameUniqueValidator(control)
    }

    static passwordMatch(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value
        const confirm = control.get('confirm')?.value

        return password && confirm && password === confirm ? null : { passwordMatch: true }
    }
}

function emailUniqueValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const userService = Injector.create({
        providers: [
            { provide: UserService, deps: [HttpClient] },
            { provide: HttpClient, deps: [HttpHandler] },
            {
                provide: HttpHandler,
                useValue: new HttpXhrBackend({ build: () => new XMLHttpRequest() }),
            },
        ],
    }).get(UserService)
    return userService
        .validateEmailUnique(control.value)
        .pipe(map(res => (res.unique ? null : { emailUnique: true })))
}

function usernameUniqueValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const userService = Injector.create({
        providers: [
            { provide: UserService, deps: [HttpClient] },
            { provide: HttpClient, deps: [HttpHandler] },
            {
                provide: HttpHandler,
                useValue: new HttpXhrBackend({ build: () => new XMLHttpRequest() }),
            },
        ],
    }).get(UserService)
    return userService
        .validateUsernameUnique(control.value, 0)
        .pipe(map(res => (res.unique ? null : { usernameUnique: true })))
}
