import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ContentChild, EventEmitter,
  Input, Output,
  ViewChild
} from '@angular/core';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { matSelectAnimations } from '@angular/material/select';
import { F_OVERLAY_PANEL, IFOverlayPanel } from './i-f-overlay-panel';
import { F_OVERLAY_PANEL_COMPONENT, IFOverlayPanelComponent } from './i-f-overlay-panel-component';
import { FIconButtonComponent } from '../f-icon-button';

@Component({
  selector: 'f-overlay-panel',
  templateUrl: './f-overlay-panel.component.html',
  styleUrls: [ './f-overlay-panel.component.scss' ],
  standalone: true,
  animations: [ matSelectAnimations.transformPanel ],
  imports: [ CdkConnectedOverlay, CdkOverlayOrigin, FIconButtonComponent ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ { provide: F_OVERLAY_PANEL, useExisting: FOverlayPanelComponent } ]
})
export class FOverlayPanelComponent<T = any> implements IFOverlayPanel<T> {

  public isPanelVisible: boolean = false;

  @Input()
  public disabled: boolean = false;

  public positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
    },
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      panelClass: 'mat-mdc-select-panel-above',
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      panelClass: 'mat-mdc-select-panel-above',
    },
  ];

  @ViewChild(CdkConnectedOverlay, { static: true })
  public overlay!: CdkConnectedOverlay;

  @ViewChild('origin', { static: true })
  public origin!: CdkOverlayOrigin;

  @Input({ required: true })
  public value!: T;

  @Output()
  public valueChange: EventEmitter<T> = new EventEmitter<T>();

  @ContentChild(F_OVERLAY_PANEL_COMPONENT, { static: true })
  public component: IFOverlayPanelComponent<T> | undefined;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public onOpen(): void {
    if (this.disabled) {
      return;
    }

    this.isPanelVisible = !this.isPanelVisible;
    this.changeDetectorRef.detectChanges();
  }

  public onAnimationDone(): void {

  }

  public onAttached(): void {
    setTimeout(() => {
      this.component?.setValue(this.value);
    });
  }

  public close(): void {
    this.overlay.backdropClick.emit();
  }

  public onClose(): void {
    this.isPanelVisible = false;
    this.changeDetectorRef.detectChanges();
  }

  public setValue(value: T): void {
    this.value = value;
    this.valueChange.emit(value);
    this.changeDetectorRef.detectChanges();
  }
}
