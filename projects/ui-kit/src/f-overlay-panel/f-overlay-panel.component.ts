import {
  ChangeDetectionStrategy,
  Component, ContentChild, EventEmitter,
  Input, Output,
} from '@angular/core';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { matSelectAnimations } from '@angular/material/select';
import { F_OVERLAY_PANEL_COMPONENT, IFOverlayPanelComponent } from './i-f-overlay-panel-component';
import { FIconButtonComponent } from '../f-icon-button';
import { FOverlayPanelBase } from './domain';

@Component({
  selector: 'f-overlay-panel',
  templateUrl: './f-overlay-panel.component.html',
  styleUrls: [ './f-overlay-panel.component.scss' ],
  standalone: true,
  animations: [ matSelectAnimations.transformPanel ],
  imports: [ CdkConnectedOverlay, CdkOverlayOrigin, FIconButtonComponent ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FOverlayPanelComponent<T = any> extends FOverlayPanelBase {

  @Input({ required: true })
  public value!: T;

  @Output()
  public valueChange: EventEmitter<T> = new EventEmitter<T>();

  @ContentChild(F_OVERLAY_PANEL_COMPONENT, { static: true })
  public component: IFOverlayPanelComponent<T> | undefined;

  constructor() {
    super();
  }

  public override onAttach(): void {
    this.component?.setValue(this.value);
  }

  public close(): void {
    this.overlay.backdropClick.emit();
  }

  public setValue(value: T): void {
    this.value = value;
    this.valueChange.emit(value);
    this.changeDetectorRef.detectChanges();
  }
}
