import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

@Component({
  selector: 'button[primary-button-outline]',
  templateUrl: './primary-button-outline.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'primary-button-outline',
  }
})
export class PrimaryButtonOutlineComponent {

}
