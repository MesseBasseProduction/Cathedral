import { Component } from '@angular/core'
import { ToastModule } from 'primeng/toast'

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [ToastModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent {}
