import { HttpClient } from '@angular/common/http'
import { Injectable, computed, inject, signal } from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'
import { EMPTY, Observable, Subject, catchError, exhaustMap, switchMap } from 'rxjs'
import { environment } from '../../../environments/environment'
import { UserDetail } from '../models/user.model'
import { AuthService } from './auth.service'

type UserStatus = 'loading' | 'loggedin' | 'loggedout' | 'error' | undefined

type UserState = {
    status: UserStatus
    user: UserDetail | undefined | null
    err: Error | undefined | null
}

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly host = environment.apiHost
    private readonly path = this.host + '/auth/user'

    private readonly http = inject(HttpClient)
    private authService = inject(AuthService)

    // Sources
    private error$ = new Subject<Error>()

    private authState$ = toObservable(this.authService.creds)

    private loadUserDetail$ = new Subject<unknown>()
    private userDetailLoaded$ = this.loadUserDetail$.pipe(
        switchMap(() =>
            this.http.get<UserDetail>(this.path + '/me/').pipe(
                catchError(err => {
                    this.error$.next(err)
                    return EMPTY
                })
            )
        )
    )

    // State
    private state = signal<UserState>({
        status: undefined,
        user: undefined,
        err: undefined,
    })

    // Selectors
    public status = computed(() => this.state().status)
    public user = computed(() => this.state().user)
    public error = computed(() => this.state().err)

    constructor() {
        // Reducers
        this.error$
            .pipe(takeUntilDestroyed())
            .subscribe(err =>
                this.state.update(state => ({ ...state, status: 'error', err: err, user: null }))
            )

        this.loadUserDetail$
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.state.update(state => ({ ...state, status: 'loading' })))

        this.userDetailLoaded$.pipe(takeUntilDestroyed()).subscribe(user =>
            this.state.update(state => ({
                ...state,
                status: 'loggedin',
                user: user,
                err: null,
            }))
        )

        this.authState$
            .pipe(
                takeUntilDestroyed(),
                exhaustMap(creds => {
                    if (creds) {
                        this.loadUserDetail$.next({})
                    } else if (creds === null) {
                        this.state.update(state => ({ ...state, user: null, status: 'loggedout' }))
                    }
                    return EMPTY
                })
            )
            .subscribe({
                error: err => this.error$.next(err),
            })
    }

    public validateEmailUnique(email: string): Observable<{ unique: boolean }> {
        return this.http.get<{ unique: boolean }>(this.path + '/is-email-unique/', {
            params: { email: email },
        })
    }

    public validateUsernameUnique(
        username: string,
        excludeId: number
    ): Observable<{ unique: boolean }> {
        return this.http.get<{ unique: boolean }>(this.path + '/is-username-unique/', {
            params: { username: username, excludeId: excludeId },
        })
    }

    public getUserDetails() {
        this.loadUserDetail$.next({})
    }
}
