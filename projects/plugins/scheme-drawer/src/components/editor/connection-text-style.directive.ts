import { Directive, ElementRef, Input } from '@angular/core';
import { IBorderRadiusStyle, IBorderStyle, IPaddingStyle, ITextStyle } from '../configuration';

@Directive({
  selector: '[fConnectionCenter][tStyle]',
  standalone: true,
})
export class ConnectionTextStyleDirective {

  @Input()
  public set tStyle(value: ITextStyle) {
    this.refresh(value);
  };

  constructor(
    private elementReference: ElementRef<HTMLElement>
  ) {
  }

  private refresh(style: ITextStyle): void {
   // this.elementReference.nativeElement.style.color = style!.color;
    this.elementReference.nativeElement.style.fontSize = style!.size + 'px';
    this.elementReference.nativeElement.style.backgroundColor = style!.rect.background;
    this.elementReference.nativeElement.style.display = style!.text ? 'block' : 'none';

    this.drawSize(style!.rect.width, style!.rect.height);
    this.drawBorder(style!.rect.border);
    this.drawPadding(style!.rect.padding);
    this.drawBorderRadius(style!.rect.borderRadius);
  }

  private drawSize(width: number, height: number): void {
    if (width) {
      this.elementReference.nativeElement.style.width = width + 'px';
    } else {
      this.elementReference.nativeElement.style.width = 'auto';
    }
    if (height) {
      this.elementReference.nativeElement.style.height = height + 'px';
    } else {
      this.elementReference.nativeElement.style.height = 'auto';
    }
  }

  private drawBorder(style: IBorderStyle): void {
    if (style!.isBorder) {
      this.elementReference.nativeElement.style.border = style.width + 'px ' + style.style + ' ' + style.color;
    } else {
      this.elementReference.nativeElement.style.border = 'none';
    }
  }

  private drawPadding(padding: IPaddingStyle): void {
    this.elementReference.nativeElement.style.padding = padding.left + 'px ' + padding.top + 'px ' + padding.right + 'px ' + padding.bottom + 'px';
  }

  private drawBorderRadius(radius: IBorderRadiusStyle): void {
    this.elementReference.nativeElement.style.borderRadius = radius.topLeft + 'px ' + radius.topRight + 'px ' + radius.bottomRight + 'px ' + radius.bottomLeft + 'px';
  }
}
