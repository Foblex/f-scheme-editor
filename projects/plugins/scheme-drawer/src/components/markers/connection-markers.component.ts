import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';
import { FFlowModule } from '@foblex/flow';

@Component({
  selector: 'connection-markers',
  templateUrl: './connection-markers.component.html',
  standalone: true,
  imports: [
    FFlowModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectionMarkersComponent {

  @ViewChild('arrow', { static: true })
  public arrow!: TemplateRef<any>;

  @ViewChild('circle', { static: true })
  public circle!: TemplateRef<any>;
}
