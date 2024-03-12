import { Injectable, computed, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { EMPTY, Subject, catchError, switchMap } from 'rxjs'
import { UserActivation } from '../models/user.model'
import { ApiService, RequestStatus } from './api.service'

type ActivationState = {
    status: RequestStatus
    error: Error | null
}

@Injectable()
export class ActivateService extends ApiService {
    private readonly path = this.host + '/auth/activate/'

    // State
    private state = signal<ActivationState>({
        status: undefined,
        error: null,
    })

    // Sources
    private error$ = new Subject<Error>()

    public userActivation$ = new Subject<UserActivation>()
    private userActivated$ = this.userActivation$.pipe(
        switchMap(act =>
            this.http.post<unknown>(this.path, act).pipe(
                catchError(err => {
                    this.error$.next(err)
                    return EMPTY
                })
            )
        )
    )

    // Selectors
    public status = computed(() => this.state().status)
    public error = computed(() => this.state().error)

    constructor() {
        super()

        // Reducers
        this.error$
            .pipe(takeUntilDestroyed())
            .subscribe(err =>
                this.state.update(state => ({ ...state, status: 'error', user: null, err: err }))
            )
        this.userActivation$
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.state.update(state => ({ ...state, status: 'inprogress' })))
        this.userActivated$
            .pipe(takeUntilDestroyed())
            .subscribe(user =>
                this.state.update(state => ({ ...state, status: 'success', user: user }))
            )
    }
}
