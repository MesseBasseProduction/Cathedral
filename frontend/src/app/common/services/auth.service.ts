import { HttpClient } from '@angular/common/http'
import { Injectable, computed, effect, inject, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { EMPTY, Subject, catchError, startWith, switchMap, filter } from 'rxjs'
import { environment } from '../../../environments/environment'
import {
    LOCAL_STORAGE_ID_TOKEN_EXP_KEY,
    LOCAL_STORAGE_ID_TOKEN_KEY,
} from '../constants/auth.constants'
import { LoginResult, UserCredentials } from '../models/user.model'

type AuthStatus = 'authenticating' | 'authenticated' | 'error' | undefined

type AuthState = {
    status: AuthStatus
    creds: LoginResult | null | undefined
    err: Error | undefined
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly http = inject(HttpClient)

    private readonly host = environment.apiHost
    private readonly path = this.host + '/auth'

    // Source
    private error$ = new Subject<Error>()

    private loginUser$ = new Subject<UserCredentials>()
    private userLoggedIn$ = this.loginUser$.pipe(
        switchMap(cred =>
            this.http.post<LoginResult>(this.path + '/login/', cred).pipe(
                catchError(err => {
                    this.error$.next(err)
                    return EMPTY
                })
            )
        )
    )

    private logoutUser$ = new Subject<unknown>()
    private userLoggedOut$ = this.logoutUser$.pipe(
        switchMap(() =>
            this.http.post(this.path + '/logout/', null).pipe(
                catchError(err => {
                    this.error$.next(err)
                    return EMPTY
                })
            )
        )
    )
    // State
    private state = signal<AuthState>({
        status: undefined,
        creds: undefined,
        err: undefined,
    })

    // Selector
    public status = computed(() => this.state().status)
    public error = computed(() => this.state().err)
    public creds = computed(() => this.state().creds)

    constructor() {
        // Reducers
        this.error$
            .pipe(takeUntilDestroyed())
            .subscribe(err => this.state.update(state => ({ ...state, status: 'error', err: err })))

        this.loginUser$
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.state.update(state => ({ ...state, status: 'authenticating' })))
        this.userLoggedIn$
            .pipe(
                takeUntilDestroyed(),
                startWith(this.getCredsFromLocalStorage()),
                filter(val => val !== null)
            )
            .subscribe(creds =>
                this.state.update(state => ({ ...state, creds: creds, status: 'authenticated' }))
            )

        this.logoutUser$
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.state.update(state => ({ ...state, status: undefined })))
        this.userLoggedOut$
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.state.update(state => ({ ...state, creds: null })))

        // Effects
        effect(() => {
            const creds = this.creds()
            if (creds) {
                localStorage.setItem(LOCAL_STORAGE_ID_TOKEN_KEY, creds.token)
                localStorage.setItem(LOCAL_STORAGE_ID_TOKEN_EXP_KEY, creds.expiry)
            } else if (creds === null) {
                localStorage.removeItem(LOCAL_STORAGE_ID_TOKEN_KEY)
                localStorage.removeItem(LOCAL_STORAGE_ID_TOKEN_EXP_KEY)
            }
        })
    }

    private getCredsFromLocalStorage(): LoginResult | null {
        const token = localStorage.getItem(LOCAL_STORAGE_ID_TOKEN_KEY)
        const expiry = localStorage.getItem(LOCAL_STORAGE_ID_TOKEN_EXP_KEY)
        if (token && expiry) {
            return { token: token, expiry: expiry }
        }
        return null
    }

    public login(credentials: UserCredentials) {
        this.loginUser$.next(credentials)
    }

    public logout() {
        this.logoutUser$.next({})
    }
}
