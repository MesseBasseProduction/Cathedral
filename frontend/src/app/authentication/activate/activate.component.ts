import { ChangeDetectionStrategy, Component, OnInit, effect, inject, input } from '@angular/core'
import { ActivateService } from '../../common/services/activate.service'
import { Router } from '@angular/router'
import { NotificationService } from '../../common/services/notification.service'

@Component({
    selector: 'app-activate',
    standalone: true,
    imports: [],
    providers: [ActivateService, Router, NotificationService],
    templateUrl: './activate.component.html',
    styleUrl: './activate.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivateComponent implements OnInit {
    // Inputs
    uidb64 = input.required<string>()
    token = input.required<string>()

    // Services
    private readonly router = inject(Router)
    private readonly notificationService = inject(NotificationService)
    public readonly activateService = inject(ActivateService)

    activationEffect = effect(() => {
        switch (this.activateService.status()) {
            case 'inprogress':
                break
            case 'success':
                this.router.navigate(['/auth/login'])
                this.notificationService.add({
                    message: 'Account activated successfully',
                    level: 'info',
                })
                break
            case 'error':
                this.router.navigate(['/auth/login'])
                this.notificationService.add({
                    message: this.activateService.error()?.message ?? 'Unexpected error',
                    level: 'error',
                })
                break
        }
    })

    ngOnInit(): void {
        this.activateService.userActivation$.next({ uidb64: this.uidb64(), token: this.token() })
    }
}
