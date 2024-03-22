import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { ToggleButtonModule } from 'primeng/togglebutton'
import { ThemeService } from '../../services/theme.service'
import { map, tap } from 'rxjs'

@Component({
    selector: 'app-theme-variant-toggle',
    standalone: true,
    imports: [ToggleButtonModule, ReactiveFormsModule],
    templateUrl: './theme-variant-toggle.component.html',
    styleUrl: './theme-variant-toggle.component.css',
})
export class ThemeVariantToggleComponent {
    public readonly themeService = inject(ThemeService)
    private readonly fb = inject(FormBuilder)

    variantForm = this.fb.nonNullable.group({
        variant: this.fb.nonNullable.control(true),
    })

    constructor() {
        this.variantForm.controls.variant.valueChanges
            .pipe(
                map(val => (val ? 'dark' : 'light')),
                tap(val => this.onVariantToggle(val))
            )
            .subscribe()
    }

    onVariantToggle(variant: 'dark' | 'light') {
        this.themeService.switchVariant(variant)
    }
}
