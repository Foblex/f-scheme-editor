import {
  ChangeDetectionStrategy,
  Component, Input
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'button[icon-button]',
  templateUrl: './icon-button.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule
  ],
  host: {
    'class': 'icon-button',
  }
})
export class IconButtonComponent {

  @Input()
  public icon: string = '' ;
}
