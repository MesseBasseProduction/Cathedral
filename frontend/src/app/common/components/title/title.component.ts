import { Component, input } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'

export type TitleType = 'main' | 'secondary' | 'tertiary'

@Component({
    selector: 'app-title',
    imports: [NgTemplateOutlet],
    templateUrl: './title.component.html',
    styleUrl: './title.component.scss',
})
export class TitleComponent {
    type = input.required<TitleType>()
}
