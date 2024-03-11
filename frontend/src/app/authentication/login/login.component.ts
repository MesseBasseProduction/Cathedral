import { Component, effect, inject } from '@angular/core'
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../common/services/auth.service'

type LoginFormType = {
    email: FormControl<string>
    password: FormControl<string>
}

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    private readonly fb = inject(FormBuilder)
    private readonly router = inject(Router)

    public readonly authService = inject(AuthService)

    public loginForm = this.fb.nonNullable.group<LoginFormType>({
        email: this.fb.nonNullable.control('', [Validators.required]),
        password: this.fb.nonNullable.control('', [Validators.required]),
    })

    loginEffect = effect(() => {
        if (this.authService.status() === 'authenticated') {
            this.router.navigate(['/home'])
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
