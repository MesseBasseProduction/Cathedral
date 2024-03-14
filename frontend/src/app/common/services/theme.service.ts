import { DOCUMENT } from '@angular/common'
import { Injectable, computed, effect, inject, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Subject } from 'rxjs'

type Theme = 'lara-blue'
type Variant = 'dark' | 'light'

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly document = inject(DOCUMENT)

    private state = signal<{ current: Theme; variant: Variant }>({
        current: 'lara-blue',
        variant: 'dark',
    })

    private changeTheme$ = new Subject<Theme>()
    private changeVariant$ = new Subject<Variant>()

    public currentTheme = computed(() => this.state().current)
    public variant = computed(() => this.state().variant)

    constructor() {
        this.changeTheme$
            .pipe(takeUntilDestroyed())
            .subscribe(theme => this.state.update(state => ({ ...state, current: theme })))

        this.changeVariant$
            .pipe(takeUntilDestroyed())
            .subscribe(variant => this.state.update(state => ({ ...state, variant: variant })))

        effect(() => {
            const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement
            themeLink.href = `${this.currentTheme()}-${this.variant()}.css`
        })
    }

    public switchTheme(theme: Theme): void {
        this.changeTheme$.next(theme)
    }

    public switchVariant(variant: Variant): void {
        this.changeVariant$.next(variant)
    }
}
