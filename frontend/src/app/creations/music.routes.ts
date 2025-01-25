import { provideHttpClient, withRequestsMadeViaParent } from '@angular/common/http'
import { Routes } from '@angular/router'

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'artist',
                title: 'Artists',
                loadComponent: () =>
                    import('./pages/artist/artist.component').then(c => c.ArtistComponent),
                providers: [provideHttpClient(withRequestsMadeViaParent())],
            },
            {
                path: 'album',
                title: 'Albums',
                loadComponent: () =>
                    import('../merch/pages/album/album.component').then(c => c.AlbumComponent),
                providers: [provideHttpClient(withRequestsMadeViaParent())],
            },
            {
                path: 'release',
                title: 'Releases',
                loadComponent: () =>
                    import('./pages/release/release.component').then(c => c.ReleaseComponent),
                providers: [provideHttpClient(withRequestsMadeViaParent())],
            },
        ],
    },
]
