import { provideHttpClient, withRequestsMadeViaParent } from '@angular/common/http'
import { Routes } from '@angular/router'

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./music.component').then(c => c.MusicComponent),
        children: [
            {
                path: 'artist',
                title: 'Artists',
                loadComponent: () =>
                    import('./artist/artist.component').then(c => c.ArtistComponent),
                providers: [provideHttpClient(withRequestsMadeViaParent())],
            },
            {
                path: 'album',
                title: 'Albums',
                loadComponent: () => import('./album/album.component').then(c => c.AlbumComponent),
                providers: [provideHttpClient(withRequestsMadeViaParent())],
            },
            {
                path: 'release',
                title: 'Releases',
                loadComponent: () =>
                    import('./release/release.component').then(c => c.ReleaseComponent),
                providers: [provideHttpClient(withRequestsMadeViaParent())],
            },
        ],
    },
]
