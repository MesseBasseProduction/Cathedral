import { Component, inject } from '@angular/core'
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { TextInputComponent } from '../../common/components/text-input/text-input.component'
import { RegisterService } from '../../common/services/register.service'
import { AuthValidators, PASSWORD_PATTERN } from '../../common/validators/auth.validator'

type RegisterFormType = {
    email: FormControl<string>
    username: FormControl<string>
    password: FormControl<string>
    confirm: FormControl<string>
}

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink,
        ProgressSpinnerModule,
        ButtonModule,
        TextInputComponent,
    ],
    providers: [RegisterService, AuthValidators],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent {
    public readonly registerService = inject(RegisterService)
    private readonly fb = inject(FormBuilder)
    private readonly authValidators = inject(AuthValidators)

    public registerForm = this.fb.nonNullable.group<RegisterFormType>(
        {
            email: this.fb.nonNullable.control(
                '',
                [Validators.required, Validators.email],
                [this.authValidators.emailUnique.bind(this.authValidators)]
            ),
            username: this.fb.nonNullable.control(
                '',
                [Validators.required],
                [this.authValidators.usernameUnique.bind(this.authValidators)]
            ),
            password: this.fb.nonNullable.control('', [
                Validators.required,
                Validators.pattern(PASSWORD_PATTERN),
            ]),
            confirm: this.fb.nonNullable.control('', [Validators.required]),
        },
        {
            updateOn: 'blur',
            validators: [AuthValidators.passwordMatch],
        }
    )

    get controls() {
        return this.registerForm.controls
    }

    onSubmit() {
        this.registerService.register({
            email: this.controls.email.value,
            username: this.controls.username.value,
            password: this.controls.password.value,
            confirmPassword: this.controls.confirm.value,
        })
    }
}
