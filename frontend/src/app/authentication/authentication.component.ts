import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationComponent {

}
