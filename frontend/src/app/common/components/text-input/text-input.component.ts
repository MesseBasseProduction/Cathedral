import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'

@Component({
    selector: 'app-text-input',
    standalone: true,
    imports: [CommonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './text-input.component.html',
    styleUrl: './text-input.component.scss',
})
export class TextInputComponent {
    @Input({ required: true }) label!: string
    @Input({ required: true }) inputName!: string
    @Input({ required: true }) parentForm!: FormGroup
    @Input({ required: true }) type!: 'text' | 'password' | 'email' | 'url'
}
