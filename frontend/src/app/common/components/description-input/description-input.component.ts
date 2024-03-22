import { Component, forwardRef, inject } from '@angular/core'
import {
    ControlValueAccessor,
    FormBuilder,
    FormControl,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
} from '@angular/forms'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { Description } from '../../models/description.model'
import { TextInputComponent } from '../text-input/text-input.component'

type DescriptionForm = {
    lang: FormControl<string>
    description: FormControl<string>
}

@Component({
    selector: 'app-description-input',
    standalone: true,
    imports: [InputTextareaModule, ReactiveFormsModule, TextInputComponent],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DescriptionInputComponent),
            multi: true,
        },
    ],
    templateUrl: './description-input.component.html',
    styleUrl: './description-input.component.css',
})
export class DescriptionInputComponent implements ControlValueAccessor {
    private readonly fb = inject(FormBuilder)

    descriptionForm = this.fb.nonNullable.group<DescriptionForm>({
        lang: this.fb.nonNullable.control(''),
        description: this.fb.nonNullable.control(''),
    })

    writeValue(description: Description) {
        this.descriptionForm.setValue(description)
    }

    registerOnChange(fn: (description: Partial<Description>) => void) {
        this.descriptionForm.valueChanges.subscribe(fn)
    }

    onTouched = () => {}
    registerOnTouched(fn: () => void) {
        this.onTouched = fn
    }

    setDisabledState(isDisabled: boolean): void {
        isDisabled ? this.descriptionForm.disable() : this.descriptionForm.enable()
    }
}
