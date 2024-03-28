import { Component, effect, inject, input } from '@angular/core'
import {
    FormArray,
    FormBuilder,
    FormControl,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { ChipsModule } from 'primeng/chips'
import { DividerModule } from 'primeng/divider'
import { FieldsetModule } from 'primeng/fieldset'
import { InputTextModule } from 'primeng/inputtext'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { DescriptionInputComponent } from '../../../common/components/description-input/description-input.component'
import { ImageUploadComponent } from '../../../common/components/image-upload/image-upload.component'
import { LinkInputComponent } from '../../../common/components/link-input/link-input.component'
import { TextInputComponent } from '../../../common/components/text-input/text-input.component'
import { Artist } from '../../../common/models/artist.model'
import { Description } from '../../../common/models/description.model'
import { Link } from '../../../common/models/link.model'
import { ArtistService } from '../../../common/services/music/artist.service'

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
        FieldsetModule,
        DividerModule,
        DescriptionInputComponent,
        LinkInputComponent,
        ButtonModule,
        ImageUploadComponent,
        ProgressSpinnerModule,
    ],
    templateUrl: './artist-create.component.html',
    styleUrl: './artist-create.component.css',
})
export class ArtistCreateComponent {
    mode = input.required<'create' | 'update'>()
    artist = input<Artist>()

    private readonly fb = inject(FormBuilder)
    public readonly artistService = inject(ArtistService)

    public createForm = this.fb.nonNullable.group<CreateForm>({
        name: this.fb.nonNullable.control('', [Validators.required]),
        mainLink: this.fb.nonNullable.control('', [Validators.required]),
        genres: this.fb.nonNullable.control<string[]>([], [Validators.required]),
        descriptions: this.fb.nonNullable.array<FormControl<Description>>([
            this.fb.nonNullable.control<Description>(
                {
                    lang: '',
                    description: '',
                },
                [Validators.required]
            ),
        ]),
        links: this.fb.nonNullable.array<FormControl<Link>>([
            this.fb.nonNullable.control<Link>(
                {
                    type: '',
                    url: '',
                },
                [Validators.required]
            ),
        ]),
        image: this.fb.nonNullable.control('', [Validators.required]),
    })

    get controls() {
        return this.createForm.controls
    }

    constructor() {
        effect(() => {
            const artist = this.artist()
            if (artist) {
                this.controls.name.setValue(artist.name)
                this.controls.mainLink.setValue(artist.mainLink)
                this.controls.genres.setValue(artist.genres)
                this.createForm.setControl(
                    'descriptions',
                    this.fb.nonNullable.array(artist.descriptions)
                )
                this.createForm.setControl('links', this.fb.nonNullable.array(artist.links))
            }
        })
        effect(() => {
            if (this.artistService.status() === 'success') {
                this.createForm.reset()
            }
        })
    }

    addDescription() {
        this.controls.descriptions.push(
            this.fb.nonNullable.control<Description>({
                lang: '',
                description: '',
            })
        )
    }

    removeDescription(idx: number) {
        this.controls.descriptions.removeAt(idx)
    }

    addLink() {
        this.controls.links.push(
            this.fb.nonNullable.control<Link>({
                type: '',
                url: '',
            })
        )
    }

    removeLink(idx: number) {
        this.controls.links.removeAt(idx)
    }

    onSubmit() {
        if (this.mode() === 'create') {
            this.artistService.createArtist({
                name: this.controls.name.value,
                mainLink: this.controls.mainLink.value,
                genres: this.controls.genres.value,
                descriptions: this.controls.descriptions.value,
                links: this.controls.links.value,
                image: this.controls.image.value,
            })
        } else if (this.mode() === 'update' && this.artist()) {
            this.artistService.updateArtist(this.artist()!.id, this.createForm.value)
        }
    }
}
