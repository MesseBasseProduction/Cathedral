import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FooterComponent } from './layout/footer/footer.component'
import { HeaderComponent } from './layout/header/header.component'
import { NavigationComponent } from './layout/navigation/navigation.component'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, FooterComponent, NavigationComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {}
