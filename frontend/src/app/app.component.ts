import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FooterComponent } from './layout/footer/footer.component'
import { HeaderComponent } from './layout/header/header.component'
import { BreadcrumbsComponent } from './layout/breadcrumbs/breadcrumbs.component'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, BreadcrumbsComponent, HeaderComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {}
