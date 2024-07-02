import { Component, ChangeDetectionStrategy, Renderer2, ElementRef } from '@angular/core';
import { IPoint, IRect, RectExtensions } from '@foblex/core';

@Component({
  selector: `div[f-color-picker-handle]`,
  templateUrl: `./f-color-picker-handle.component.html`,
  styleUrls: [ 'f-color-picker-handle.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class FColorPickerHandleComponent {

  public get rect(): IRect {
    return RectExtensions.fromElement(this.elementReference.nativeElement);
  }

  constructor(
    private elementReference: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {
  }

  public setPosition(position: IPoint): void {
    this.renderer.setStyle(this.elementReference.nativeElement, 'top', `${ position.y }px`);
    this.renderer.setStyle(this.elementReference.nativeElement, 'left', `${ position.x }px`);
  }

  public setColor(color: string): void {
    this.renderer.setStyle(this.elementReference.nativeElement, 'background-color', color);
  }
}
