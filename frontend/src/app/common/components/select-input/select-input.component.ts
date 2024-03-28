import { Component, Input } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { DropdownModule } from 'primeng/dropdown'

@Component({
    selector: 'app-select-input',
    standalone: true,
    imports: [DropdownModule, ReactiveFormsModule],
    templateUrl: './select-input.component.html',
    styleUrl: './select-input.component.css',
})
export class SelectInputComponent {
    @Input({ required: true }) label!: string
    @Input({ required: true }) inputName!: string
    @Input({ required: true }) parentForm!: FormGroup
    @Input({ required: true }) options!: string[] | { [key: string]: string }[]
    @Input({ required: true }) placeholder!: string
    @Input() optionLabel: string | null = null
    @Input() optionValue: string | null = null
}
