import { Component, OnInit, effect, inject, input } from '@angular/core'
import { Router } from '@angular/router'
import { ActivateService } from '../../common/services/activate.service'

@Component({
    selector: 'app-activate',
    standalone: true,
    imports: [],
    providers: [ActivateService],
    templateUrl: './activate.component.html',
    styleUrl: './activate.component.scss',
})
export class ActivateComponent implements OnInit {
    // Inputs
    uidb64 = input.required<string>()
    token = input.required<string>()

    // Services
    private readonly router = inject(Router)
    public readonly activateService = inject(ActivateService)

    activationEffect = effect(() => {
        switch (this.activateService.status()) {
            case 'inprogress':
                break
            case 'success':
            case 'error':
                this.router.navigate(['/login'])
                break
        }
    })

    ngOnInit(): void {
        this.activateService.userActivation$.next({ uidb64: this.uidb64(), token: this.token() })
    }
}
