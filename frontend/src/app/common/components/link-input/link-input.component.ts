import { Component, forwardRef, inject } from '@angular/core'
import {
    ControlValueAccessor,
    FormBuilder,
    FormControl,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
} from '@angular/forms'
import { Link } from '../../models/link.model'
import { SelectInputComponent } from '../select-input/select-input.component'
import { TextInputComponent } from '../text-input/text-input.component'
import { LinkTypes } from '../../enums/link-type.enum'

type LinkForm = {
    type: FormControl<string | null>
    url: FormControl<string>
}

@Component({
    selector: 'app-link-input',
    standalone: true,
    imports: [ReactiveFormsModule, SelectInputComponent, TextInputComponent],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LinkInputComponent),
            multi: true,
        },
    ],
    templateUrl: './link-input.component.html',
    styleUrl: './link-input.component.css',
})
export class LinkInputComponent implements ControlValueAccessor {
    private readonly fb = inject(FormBuilder)

    options = Object.entries(LinkTypes).map(([label, code]) => ({ label: label, code: code }))

    linkForm = this.fb.group<LinkForm>({
        type: this.fb.nonNullable.control(''),
        url: this.fb.nonNullable.control(''),
    })

    writeValue(description: Link) {
        this.linkForm.setValue(description)
    }

    registerOnChange(
        fn: (
            description: Partial<{
                type: string | null
                url: string
            }>
        ) => void
    ) {
        this.linkForm.valueChanges.subscribe(fn)
    }

    onTouched = () => {}
    registerOnTouched(fn: () => void) {
        this.onTouched = fn
    }

    setDisabledState(isDisabled: boolean): void {
        isDisabled ? this.linkForm.disable() : this.linkForm.enable()
    }
}
