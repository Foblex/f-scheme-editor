import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { MatFormField } from '@angular/material/form-field';
import { AbstractControlDirective, NgControl } from '@angular/forms';
import { matSelectAnimations } from '@angular/material/select';
import { FColorPickerComponent } from './f-color-picker/f-color-picker.component';
import { FColorPickerRectComponent } from './f-color-picker-rect/f-color-picker-rect.component';

@Component({
  selector: 'f-color-picker-overlay',
  templateUrl: './f-color-picker-overlay.component.html',
  styleUrls: [ './f-color-picker-overlay.component.scss' ],
  standalone: true,
  animations: [ matSelectAnimations.transformPanel ],
  imports: [ CdkConnectedOverlay, CdkOverlayOrigin, FColorPickerComponent, FColorPickerRectComponent ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FColorPickerOverlayComponent implements AfterViewInit {

  public isPanelVisible: boolean = false;

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

  @ViewChild(FColorPickerComponent, { static: false })
  protected fColorPicker!: FColorPickerComponent;

  @ViewChild(CdkConnectedOverlay, { static: true })
  protected overlay!: CdkConnectedOverlay;

  private get ngControl(): NgControl | AbstractControlDirective {
    return this.inputContainer!._formFieldControl.ngControl!;
  }

  public color: string = '#000000';

  public preferredOverlayOrigin: CdkOverlayOrigin | ElementRef | undefined;

  constructor(
    private inputContainer: MatFormField,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public ngAfterViewInit(): void {
    this.color = this.ngControl.value;
    this.changeDetectorRef.detectChanges();
  }

  public onOpen(): void {
    if (this.inputContainer._control.ngControl?.disabled) {
      return;
    }
    if (this.inputContainer) {
      this.preferredOverlayOrigin = this.inputContainer.getConnectedOverlayOrigin();
    }

    this.isPanelVisible = !this.isPanelVisible;
    this.changeDetectorRef.detectChanges();
  }

  public onAnimationDone(): void {

  }

  public onAttached(): void {
    setTimeout(() => {
      this.color = this.ngControl.value;
      this.fColorPicker.color = this.color;

      this.fColorPicker.setPresets([
        '#FF4B4B', '#FF8282', '#B32323', '#1594EF',
        '#FFC329', '#F75826', '#D5C2C2', '#000000',
        '#A04EE1', '#19CD6C', '#4EA882', '#15B442',
        '#249566', '#15CCC1', '#68D525', '#2A6C29',
        '#00A0A0', '#FFAC4B', '#694DDB', '#2648FE',
        '#F9F9F9', '#735F51', '#786848', '#88776D',
      ]);
    });
  }

  public onColorSelect(color: string): void {
    this.overlay.backdropClick.emit();
  }

  public onClose(): void {
    this.setValue(this.fColorPicker.color);
    this.isPanelVisible = false;
    this.changeDetectorRef.detectChanges();
  }

  public updateValue(color: string): void {
    this.setValue(color);
    this.changeDetectorRef.detectChanges();
  }

  private setValue(color: string): void {
    this.color = color;
    this.ngControl.control!.setValue(this.color);
  }
}
