import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {

}
