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
import { TitleCasePipe } from '@angular/common'

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
    styleUrl: './link-input.component.scss',
})
export class LinkInputComponent implements ControlValueAccessor {
    private readonly fb = inject(FormBuilder)

    private readonly titleCase = new TitleCasePipe()

    options = Object.entries(LinkTypes).map(([label, code]) => ({
        label: this.titleCase.transform(label),
        code: code,
    }))

    linkForm = this.fb.group<LinkForm>({
        type: this.fb.nonNullable.control(''),
        url: this.fb.nonNullable.control(''),
    })

    writeValue(link: Link) {
        console.log(link)
        this.linkForm.setValue(link)
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
        if (isDisabled) this.linkForm.disable()
        else this.linkForm.enable()
    }
}
