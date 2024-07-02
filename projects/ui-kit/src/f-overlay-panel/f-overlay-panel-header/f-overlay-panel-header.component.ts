import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FOverlayPanelComponent } from '../f-overlay-panel.component';
import { FIconButtonComponent } from '../../f-icon-button';

@Component({
  selector: 'f-overlay-panel-header',
  templateUrl: './f-overlay-panel-header.component.html',
  styleUrls: [ './f-overlay-panel-header.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    FIconButtonComponent
  ]
})
export class FOverlayPanelHeaderComponent {

  @Input()
  public title: string = '';

  constructor(
    private fOverlayPanel: FOverlayPanelComponent
  ) {
  }

  public onClose(): void {
    this.fOverlayPanel.close();
  }
}
