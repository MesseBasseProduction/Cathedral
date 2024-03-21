import { Component, inject } from '@angular/core'
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms'
import { ChipsModule } from 'primeng/chips'
import { InputTextModule } from 'primeng/inputtext'
import { DescriptionInputComponent } from '../../../common/components/description-input/description-input.component'
import { TextInputComponent } from '../../../common/components/text-input/text-input.component'
import { Description } from '../../../common/models/description.model'
import { Link } from '../../../common/models/link.model'
import { LinkInputComponent } from '../../../common/components/link-input/link-input.component'

type CreateForm = {
    name: FormControl<string>
    mainLink: FormControl<string>
    genres: FormControl<string[]>
    descriptions: FormArray<FormControl<Description>>
    links: FormArray<FormControl<Link>>
    image: FormControl<string>
}

@Component({
    selector: 'app-artist-create',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TextInputComponent,
        ChipsModule,
        InputTextModule,
        DescriptionInputComponent,
        LinkInputComponent,
    ],
    templateUrl: './artist-create.component.html',
    styleUrl: './artist-create.component.scss',
})
export class ArtistCreateComponent {
    private readonly fb = inject(FormBuilder)

    public createForm = this.fb.nonNullable.group<CreateForm>({
        name: this.fb.nonNullable.control(''),
        mainLink: this.fb.nonNullable.control(''),
        genres: this.fb.nonNullable.control<string[]>([]),
        descriptions: this.fb.nonNullable.array<FormControl<Description>>([
            this.fb.nonNullable.control<Description>({
                lang: '',
                description: '',
            }),
        ]),
        links: this.fb.nonNullable.array<FormControl<Link>>([
            this.fb.nonNullable.control<Link>({
                type: '',
                url: '',
            }),
        ]),
        image: this.fb.nonNullable.control(''),
    })

    get controls() {
        return this.createForm.controls
    }

    constructor() {
        this.createForm.valueChanges.subscribe(val => console.log(val))
    }
}
