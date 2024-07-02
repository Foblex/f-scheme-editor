import { Directive, ElementRef, Input } from '@angular/core';
import { ISchemeNodeViewModel } from '../../domain';
import { IBorderRadiusStyle, IBorderStyle, IPaddingStyle } from '../configuration';

@Directive({
  selector: '[sNodeStyle]',
  standalone: true,
})
export class SNodeStyleDirective {

  @Input()
  public set sNodeStyle(value: ISchemeNodeViewModel) {
    this.refresh(value);
  };

  private get hostElement(): HTMLElement {
    return this.elementReference.nativeElement;
  }

  constructor(
    private elementReference: ElementRef<HTMLElement>
  ) {
  }

  private refresh(style: ISchemeNodeViewModel): void {
    this.hostElement.style.backgroundColor = style!.rectStyle.background;
    this.drawBorder(style!.rectStyle.border);
    this.drawPadding(style!.rectStyle.padding);
    this.drawBorderRadius(style!.rectStyle.borderRadius);
    this.hostElement.style.overflow = style.rectStyle.isClipContent ? 'hidden' : 'visible';
  }

  private drawBorder(style: IBorderStyle): void {
    this.hostElement.style.outline = style.width + 'px ' + style.style + ' ' + style.color;
    if (!style!.isBorder) {
      this.hostElement.style.outline = 'none';
    }
  }

  private drawPadding(padding: IPaddingStyle): void {
    this.hostElement.style.padding = padding.top + 'px ' + padding.right + 'px ' + padding.bottom + 'px ' + padding.left + 'px';
  }

  private drawBorderRadius(radius: IBorderRadiusStyle): void {
    this.hostElement.style.borderRadius = radius.topLeft + 'px ' + radius.topRight + 'px ' + radius.bottomRight + 'px ' + radius.bottomLeft + 'px';
  }
}
