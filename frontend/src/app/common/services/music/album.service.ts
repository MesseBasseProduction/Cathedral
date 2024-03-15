import { HttpClient } from '@angular/common/http'
import { Injectable, computed, inject, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { EMPTY, Subject, catchError, map, switchMap } from 'rxjs'
import { environment } from '../../../../environments/environment'
import { Album, AlbumCreate, AlbumUpdate } from '../../models/album.model'
import { EntityList } from '../../models/entity-list.model'

type AlbumState = {
    status: 'loading' | 'success' | 'error' | undefined
    albums: Album[]
    error: Error | null
}

@Injectable()
export class AlbumService {
    private readonly host = environment.apiHost
    private readonly path = this.host + '/album/'
    private readonly http = inject(HttpClient)
    // State
    private state = signal<AlbumState>({
        status: undefined,
        albums: [],
        error: null,
    })

    // Sources
    private error$ = new Subject<Error>()

    private loadAlbums$ = new Subject<unknown>()
    private albumsLoaded$ = this.loadAlbums$.pipe(
        switchMap(() =>
            this.http.get<EntityList<Album>>(this.path).pipe(
                catchError(err => {
                    this.error$.next(err)
                    return EMPTY
                })
            )
        )
    )

    private createAlbum$ = new Subject<AlbumCreate>()
    private albumCreated$ = this.createAlbum$.pipe(
        switchMap(album =>
            this.http.post<Album>(this.path, album).pipe(
                catchError(err => {
                    this.error$.next(err)
                    return EMPTY
                })
            )
        )
    )

    private updateAlbum$ = new Subject<[number, AlbumUpdate]>()
    private albumUpdated$ = this.updateAlbum$.pipe(
        switchMap(([id, album]) =>
            this.http.patch<Album>(this.path + `${id}/`, album).pipe(
                catchError(err => {
                    this.error$.next(err)
                    return EMPTY
                })
            )
        )
    )

    private deleteAlbum$ = new Subject<number>()
    private albumDeleted$ = this.deleteAlbum$.pipe(
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
    public status = computed(() => this.state().status)
    public albums = computed(() => this.state().albums)
    public error = computed(() => this.state().error)

    constructor() {
        this.error$
            .pipe(takeUntilDestroyed())
            .subscribe(err =>
                this.state.update(state => ({ ...state, error: err, status: 'error' }))
            )

        this.loadAlbums$
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.state.update(state => ({ ...state, status: 'loading' })))
        this.albumsLoaded$.pipe(takeUntilDestroyed()).subscribe(albums =>
            this.state.update(state => ({
                ...state,
                status: 'success',
                albums: albums.content,
            }))
        )

        this.createAlbum$
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.state.update(state => ({ ...state, status: 'loading' })))
        this.albumCreated$.pipe(takeUntilDestroyed()).subscribe(album =>
            this.state.update(state => ({
                ...state,
                status: 'success',
                albums: [...this.albums(), album],
            }))
        )

        this.updateAlbum$
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.state.update(state => ({ ...state, status: 'loading' })))
        this.albumUpdated$.pipe(takeUntilDestroyed()).subscribe(album => {
            const updated = [...this.albums().filter(item => item.id !== album.id), album]
            this.state.update(state => ({ ...state, status: 'success', albums: updated }))
        })

        this.deleteAlbum$
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.state.update(state => ({ ...state, status: 'loading' })))
        this.albumDeleted$.pipe(takeUntilDestroyed()).subscribe(id =>
            this.state.update(state => ({
                ...state,
                status: 'success',
                albums: this.albums().filter(item => item.id !== id),
            }))
        )
    }
}
