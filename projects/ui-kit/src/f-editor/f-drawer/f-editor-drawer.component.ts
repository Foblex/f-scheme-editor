import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { IHasHostElement } from '@foblex/core';
import { ILocalConfiguration, LocalConfigurationService } from '@core';
import { IPointerEvent } from '../../resizable-box/domain/i-pointer-event';
import { EResizableSize, ResizableBoxDirective, ResizableBoxHandleDirective } from '../../resizable-box';

@Component({
  selector: 'f-editor-drawer',
  templateUrl: './f-editor-drawer.component.html',
  styleUrls: [ './f-editor-drawer.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ResizableBoxHandleDirective
  ]
})
export class FEditorDrawerComponent extends ResizableBoxDirective implements OnInit, IHasHostElement {

  @ViewChild(ResizableBoxHandleDirective, { static: true })
  public override handle!: ResizableBoxHandleDirective;

  @Input()
  public override minWidth: number = 100;

  public resizableSide: EResizableSize = EResizableSize.LEFT;

  public configuration!: ILocalConfiguration;

  constructor(
    elementReference: ElementRef<HTMLElement>,
    renderer: Renderer2,
    zone: NgZone,
    private configurationService: LocalConfigurationService,
  ) {
    super(elementReference, renderer, zone);
  }

  public ngOnInit(): void {
    this.initialWidth = this.configurationService.getState().editorDrawer.width;
  }

  public override onPointerUp(event: IPointerEvent): void {
    super.disposeListeners();

    const model = this.configurationService.getState();
    model.editorDrawer.width = this.hostElement.offsetWidth;
    this.configurationService.setState(model, false);
  }
}
