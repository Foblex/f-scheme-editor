import { Directive, HostListener, Input, Optional } from '@angular/core';
import { FColorPickerOverlayComponent } from './f-color-picker-overlay.component';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[fColorOverlay]',
  standalone: true
})
export class FColorOverlayDirective {

  @Input({ required: true })
  public fColorOverlay!: FColorPickerOverlayComponent;

  constructor(
    private control: NgControl
  ) {
  }

  @HostListener('blur')
  private onBlur(): void {
    this.fColorOverlay.updateValue(this.control.value);
  }
}
