import { Directive, HostListener, Input, Optional } from '@angular/core';
import { FImagePickerOverlayComponent } from './f-image-picker-overlay.component';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[fImageOverlay]',
  standalone: true
})
export class FImageOverlayDirective {

  @Input({ required: true })
  public fImageOverlay!: FImagePickerOverlayComponent;

  constructor(
    private control: NgControl
  ) {
  }

  @HostListener('blur')
  private onBlur(): void {
    this.fImageOverlay.updateValue(this.control.value);
  }
}
