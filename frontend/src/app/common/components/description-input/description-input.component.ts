import { Component, forwardRef, inject } from '@angular/core'
import {
    ControlValueAccessor,
    FormBuilder,
    FormControl,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { DropdownModule } from 'primeng/dropdown'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { DescriptionLangEnum, DescriptionLangs } from '../../enums/description-lang.enum'
import { Description } from '../../models/description.model'
import { TextInputComponent } from '../text-input/text-input.component'
import { SelectInputComponent } from '../select-input/select-input.component'

type DescriptionForm = {
    lang: FormControl<DescriptionLangEnum | null>
    description: FormControl<string>
}

@Component({
    selector: 'app-description-input',
    standalone: true,
    imports: [
        DropdownModule,
        InputTextareaModule,
        ReactiveFormsModule,
        SelectInputComponent,
        TextInputComponent,
    ],
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

    public readonly descriptionLangs = Object.values(DescriptionLangs)

    descriptionForm = this.fb.nonNullable.group<DescriptionForm>({
        lang: this.fb.nonNullable.control(null, [Validators.required]),
        description: this.fb.nonNullable.control('', [Validators.required]),
    })

    writeValue(description: Description) {
        this.descriptionForm.setValue(description)
    }

    registerOnChange(
        fn: (
            description: Partial<{
                lang: DescriptionLangEnum | null
                description: string
            }>
        ) => void
    ) {
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
