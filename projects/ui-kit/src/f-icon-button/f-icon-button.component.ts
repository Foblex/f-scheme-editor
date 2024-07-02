import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'button[f-icon-button]',
  templateUrl: './f-icon-button.component.html',
  styleUrls: [ './f-icon-button.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FIconButtonComponent {

}
