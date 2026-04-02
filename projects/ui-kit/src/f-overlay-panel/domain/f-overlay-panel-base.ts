import { ChangeDetectorRef, Directive, ElementRef, inject, Input, signal, ViewChild } from '@angular/core';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { F_OVERLAY_POSITIONS } from './f-overlay-positions';

@Directive()
export class FOverlayPanelBase {

  public isPanelVisible = signal(false);

  @Input()
  public disabled: boolean = false;

  public positions: ConnectedPosition[] = F_OVERLAY_POSITIONS;

  @ViewChild(CdkConnectedOverlay, { static: true })
  public overlay!: CdkConnectedOverlay;

  public preferredOverlayOrigin: CdkOverlayOrigin | ElementRef | undefined;
    protected changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);


  public onOpen(): void {
    if (this.disabled) {
      return;
    }
    this.preferredOverlayOrigin = this.getConnectedOverlayOrigin?.();
    this.isPanelVisible.set(!this.isPanelVisible());

  }

  public getConnectedOverlayOrigin?(): ElementRef;

  public onAnimationDone(): void {

  }

  public attach(): void {
    setTimeout(() => {
      this.onAttach?.();
    });
  }

  public onAttach?(): void;

  // public close(): void {
  //   this.overlay.backdropClick.emit();
  // }

  public backdropClick(): void {
    this.onBackdropClick?.();
    this.isPanelVisible.set(false);
  }

  public onBackdropClick?(): void;
}
