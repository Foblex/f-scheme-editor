import { Directive, ElementRef, Input } from '@angular/core';
import { EResizableSize } from './domain/e-resizable-size';

@Directive({
  selector: '[resizable-box-handle]',
  standalone: true,
})
export class ResizableBoxHandleDirective {

  public get hostElement(): HTMLElement {
    return this.elementReference.nativeElement;
  }

  @Input()
  public resizableSize: EResizableSize = EResizableSize.RIGHT;

  constructor(
      private elementReference: ElementRef<HTMLElement>,
  ) {
  }
}
