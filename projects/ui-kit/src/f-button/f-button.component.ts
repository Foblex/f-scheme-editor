import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'button[f-button]',
  templateUrl: './f-button.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FButtonComponent {

}
