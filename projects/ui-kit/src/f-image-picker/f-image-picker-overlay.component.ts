import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { MatFormField } from '@angular/material/form-field';
import { AbstractControlDirective, NgControl } from '@angular/forms';
import { matSelectAnimations } from '@angular/material/select';
import { FImagePickerComponent } from './f-image-picker/f-image-picker.component';
import { FOverlayPanelBase, IFImage } from '@ui-kit';
import { FImagePickerPrefixComponent } from './f-image-picker-prefix/f-image-picker-prefix.component';

@Component({
  selector: 'f-image-picker-overlay',
  templateUrl: './f-image-picker-overlay.component.html',
  styleUrls: [ './f-image-picker-overlay.component.scss' ],
  standalone: true,
  animations: [ matSelectAnimations.transformPanel ],
  imports: [ CdkConnectedOverlay, CdkOverlayOrigin, FImagePickerComponent, FImagePickerPrefixComponent ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FImagePickerOverlayComponent extends FOverlayPanelBase implements AfterViewInit {

  @ViewChild(FImagePickerComponent, { static: false })
  protected fPickerComponent!: FImagePickerComponent;

  @ViewChild(FImagePickerPrefixComponent, { static: true })
  protected fPrefixComponent!: FImagePickerPrefixComponent;

  private get ngControl(): NgControl | AbstractControlDirective {
    return this.inputContainer!._formFieldControl.ngControl!;
  }

  private image: IFImage | undefined;

  constructor(
    private inputContainer: MatFormField
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    this.fPrefixComponent.draw(this.ngControl.value);
    this.changeDetectorRef.detectChanges();
  }

  public override getConnectedOverlayOrigin(): ElementRef {
    return this.inputContainer.getConnectedOverlayOrigin()!;
  }

  public override onAttach(): void {
    this.fPickerComponent.image = this.ngControl.value;
  }

  public override onBackdropClick(): void {
    this.ngControl.control!.setValue(this.image);
  }

  public updateValue(value: IFImage): void {
    this.image = value;
    this.fPrefixComponent.draw(this.image);
  }
}
