import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core'
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../common/services/auth.service'
import { Router } from '@angular/router'
import { NotificationService } from '../../common/services/notification.service'

type LoginFormType = {
    email: FormControl<string>
    password: FormControl<string>
}

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule],
    providers: [AuthService, NotificationService, Router],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    private readonly fb = inject(FormBuilder)
    private readonly router = inject(Router)
    private readonly notificationService = inject(NotificationService)

    public readonly authService = inject(AuthService)

    public loginForm = this.fb.nonNullable.group<LoginFormType>({
        email: this.fb.nonNullable.control('', [Validators.required]),
        password: this.fb.nonNullable.control('', [Validators.required]),
    })

    loginEffect = effect(() => {
        switch (this.authService.status()) {
            case 'inprogress':
                break
            case 'success':
                this.router.navigate(['/auth/user/me'])
                break
            case 'error':
                this.notificationService.add({
                    message: 'Unable to login',
                    level: 'error',
                })
        }
    })

    get controls() {
        return this.loginForm.controls
    }

    onSubmit() {
        this.authService.login({
            email: this.controls.email.value,
            password: this.controls.password.value,
        })
    }
}
