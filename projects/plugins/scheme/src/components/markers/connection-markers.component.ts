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

  @ViewChild('start_arrow', { static: true })
  public start_arrow!: TemplateRef<any>;

  @ViewChild('start_back_arrow', { static: true })
  public start_back_arrow!: TemplateRef<any>;

  @ViewChild('start_circle', { static: true })
  public start_circle!: TemplateRef<any>;

  @ViewChild('start_rhombus', { static: true })
  public start_rhombus!: TemplateRef<any>;



  @ViewChild('end_arrow', { static: true })
  public end_arrow!: TemplateRef<any>;

  @ViewChild('end_back_arrow', { static: true })
  public end_back_arrow!: TemplateRef<any>;

  @ViewChild('end_circle', { static: true })
  public end_circle!: TemplateRef<any>;

  @ViewChild('end_rhombus', { static: true })
  public end_rhombus!: TemplateRef<any>;
}
