import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

@Component({
  selector: 'button[primary-button]',
  templateUrl: './primary-button.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'primary-button',
  }
})
export class PrimaryButtonComponent {

}
