import { Injectable, computed, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { EMPTY, Subject, catchError, switchMap } from 'rxjs'
import { UserDetail, UserRegistration } from '../model/user.model'
import { ApiService, RequestStatus } from './api.service'

type RegisterState = {
    status: RequestStatus
    err: Error | null
}

@Injectable()
export class RegisterService extends ApiService {
    private readonly path = this.host + '/auth/register/'

    // Source
    private error$ = new Subject<any>()

    private createUser$ = new Subject<UserRegistration>()
    private userCreated$ = this.createUser$.pipe(
        switchMap(reg =>
            this.http.post<UserDetail>(this.path, reg).pipe(
                catchError(err => {
                    this.error$.next(err)
                    return EMPTY
                })
            )
        )
    )

    // State
    private state = signal<RegisterState>({
        status: undefined,
        err: null,
    })

    // Selector
    public status = computed(() => this.state().status)
    public error = computed(() => this.state().err)

    constructor() {
        super()

        // Reducers
        this.createUser$
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.state.update(state => ({ ...state, status: 'inprogress' })))
        this.error$
            .pipe(takeUntilDestroyed())
            .subscribe(err => this.state.update(state => ({ ...state, status: 'error', err: err })))
        this.userCreated$
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.state.update(state => ({ ...state, status: 'success' })))
    }

    public register(userRegistration: UserRegistration) {
        this.createUser$.next(userRegistration)
    }
}
