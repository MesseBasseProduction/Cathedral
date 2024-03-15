import { HttpClient } from '@angular/common/http'
import { computed, inject, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { EMPTY, Subject, catchError, map, merge, switchMap } from 'rxjs'
import { environment } from '../../../environments/environment'
import { EntityList } from '../models/entity-list.model'

type CrudState<TEntity> = {
    status: 'loading' | 'success' | 'error' | undefined
    error: Error | null
    entities: TEntity[]
}

/**
 * @abstract
 * Provides basic CRUD operations.
 * Should not be instantiated directly, but extended by other services.
 *
 * TEntity is a type parameter which must have an 'id' field.
 */
export class CrudService<TEntity extends { id: number }> {
    protected readonly http = inject(HttpClient)
    protected readonly host = environment.apiHost
    protected path = this.host + '/'

    // State
    /**
     * Internal state of the service.
     */
    protected state = signal<CrudState<TEntity>>({
        status: undefined,
        error: null,
        entities: [],
    })

    // Sources

    /** Error source which is updated when an error has occurred. */
    protected error$ = new Subject<Error>()

    /** Sources responsible for loading a list of TEntity. */
    protected loadEntities$ = new Subject<unknown>()
    protected entitiesLoaded$ = this.loadEntities$.pipe(
        switchMap(() =>
            this.http.get<EntityList<TEntity>>(this.path).pipe(
                catchError(err => {
                    this.error$.next(err)
                    return EMPTY
                })
            )
        )
    )

    /** Sources responsible for creating a new TEntity. */
    protected createEntity$ = new Subject<Omit<TEntity, 'id'>>()
    protected entityCreated$ = this.createEntity$.pipe(
        switchMap(entity =>
            this.http.post<TEntity>(this.path, entity).pipe(
                catchError(err => {
                    this.error$.next(err)
                    return EMPTY
                })
            )
        )
    )

    /** Sources responsible for updating an existing TEntity. */
    protected updateEntity$ = new Subject<[number, Partial<TEntity>]>()
    protected entityUpdated$ = this.updateEntity$.pipe(
        switchMap(([id, entity]) =>
            this.http.patch<TEntity>(this.path + `${id}/`, entity).pipe(
                catchError(err => {
                    this.error$.next(err)
                    return EMPTY
                })
            )
        )
    )

    /** Sources responsible for deleting a TEntity. */
    protected deleteEntity$ = new Subject<number>()
    protected entityDeleted$ = this.deleteEntity$.pipe(
        switchMap(id =>
            this.http.delete<unknown>(this.path + `${id}/`).pipe(
                map(() => id),
                catchError(err => {
                    this.error$.next(err)
                    return EMPTY
                })
            )
        )
    )

    // Selectors

    /** Public accessors for the state. */
    public status = computed(() => this.state().status)
    public error = computed(() => this.state().error)
    public entities = computed(() => this.state().entities)

    constructor() {
        // Reducers
        this.error$
            .pipe(takeUntilDestroyed())
            .subscribe(err =>
                this.state.update(state => ({ ...state, error: err, status: 'error' }))
            )

        merge(this.loadEntities$, this.createEntity$, this.updateEntity$, this.deleteEntity$)
            .pipe(takeUntilDestroyed())
            .subscribe(() =>
                this.state.update(state => ({ ...state, error: null, status: 'loading' }))
            )

        this.entitiesLoaded$.pipe(takeUntilDestroyed()).subscribe(entityList =>
            this.state.update(state => ({
                ...state,
                status: 'success',
                entities: entityList.content,
            }))
        )

        this.entityCreated$.pipe(takeUntilDestroyed()).subscribe(entity =>
            this.state.update(state => ({
                ...state,
                status: 'success',
                entities: [...this.entities(), entity],
            }))
        )

        this.entityUpdated$.pipe(takeUntilDestroyed()).subscribe(entity =>
            this.state.update(state => ({
                ...state,
                status: 'success',
                entities: [...this.entities().filter(item => item.id !== entity.id), entity],
            }))
        )

        this.entityDeleted$.pipe(takeUntilDestroyed()).subscribe(id =>
            this.state.update(state => ({
                ...state,
                status: 'success',
                entities: this.entities().filter(item => item.id !== id),
            }))
        )
    }
}
