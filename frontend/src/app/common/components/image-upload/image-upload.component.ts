import { Component, OnInit, forwardRef, input, model } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload'
import { BehaviorSubject } from 'rxjs'

type Files = string | string[]

@Component({
    selector: 'app-image-upload',
    standalone: true,
    imports: [FileUploadModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImageUploadComponent),
            multi: true,
        },
    ],
    templateUrl: './image-upload.component.html',
    styleUrl: './image-upload.component.css',
})
export class ImageUploadComponent implements ControlValueAccessor, OnInit {
    multiple = input.required<boolean>()
    label = input.required<string>()
    disabled = model<boolean>(false)

    files$!: BehaviorSubject<Files>

    private readonly fr = new FileReader()

    ngOnInit() {
        if (this.multiple()) {
            this.files$ = new BehaviorSubject<Files>([])
        } else {
            this.files$ = new BehaviorSubject<Files>('')
        }
    }

    writeValue() {
        this.fr.onloadend = () => {
            if (this.fr.result) {
                const data = (this.fr.result as string).replace(/^data:\w*\/\w*;/, '')
                if (typeof this.files$.value !== 'string') {
                    this.files$.next([...this.files$.value, data])
                } else {
                    this.files$.next(data)
                }
            }
        }
    }

    registerOnChange(fn: (files: Files) => void) {
        this.files$.subscribe(fn)
    }

    onTouched = () => {}
    registerOnTouched(fn: () => void) {
        this.onTouched = fn
    }
    setDisabledState?(isDisabled: boolean) {
        this.disabled.update(() => isDisabled)
    }

    onSelect(event: FileSelectEvent) {
        const files = event.currentFiles
        for (const file of files) {
            this.fr.readAsDataURL(file)
        }
    }
}
