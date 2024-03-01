import { Injectable, computed, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { EMPTY, Subject, catchError, switchMap } from 'rxjs'
import { UserCredentials, UserDetail } from '../model/user.model'
import { ApiService, RequestStatus } from './api.service'

type AuthState = {
    status: RequestStatus
    user: UserDetail | null | undefined
    err: Error | undefined
}

@Injectable()
export class AuthService extends ApiService {
    private readonly path = this.host + '/auth'

    // Source
    private error$ = new Subject<any>()

    private loginUser$ = new Subject<UserCredentials>()
    private userLoggedIn$ = this.loginUser$.pipe(
        switchMap(cred =>
            this.http.post<UserDetail>(this.path + '/login/', cred).pipe(
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
        user: undefined,
        err: undefined,
    })

    // Selector
    public status = computed(() => this.state().status)
    public user = computed(() => this.state().user)

    constructor() {
        super()

        // Reducers
        this.error$
            .pipe(takeUntilDestroyed())
            .subscribe(err =>
                this.state.update(state => ({ ...state, user: null, status: 'error', err: err }))
            )
        this.loginUser$
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.state.update(state => ({ ...state, status: 'inprogress' })))
        this.userLoggedIn$
            .pipe(takeUntilDestroyed())
            .subscribe(user =>
                this.state.update(state => ({ ...state, user: user, status: 'success' }))
            )
    }

    public login(credentials: UserCredentials) {
        this.loginUser$.next(credentials)
    }
}
