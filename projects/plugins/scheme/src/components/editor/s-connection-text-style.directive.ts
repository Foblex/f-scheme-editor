import { Directive, ElementRef, Input } from '@angular/core';
import { IBorderRadiusStyle, IBorderStyle, IPaddingStyle, ITextStyle } from '../configuration';

@Directive({
  selector: '[fConnectionCenter][sConnectionTextStyle]',
  standalone: true,
})
export class SConnectionTextStyleDirective {

  @Input()
  public set sConnectionTextStyle(value: ITextStyle) {
    this.refresh(value);
  };

  private get hostElement(): HTMLElement {
    return this.elementReference.nativeElement;
  }

  constructor(
    private elementReference: ElementRef<HTMLElement>
  ) {
  }

  private refresh(style: ITextStyle): void {
    this.hostElement.style.color = style!.color;
    this.hostElement.style.fontSize = style!.size + 'px';
    this.hostElement.style.backgroundColor = style!.rect.background;
    this.hostElement.style.display = style!.text ? 'block' : 'none';

    this.drawSize(style!.rect.width, style!.rect.height);
    this.drawBorder(style!.rect.border);
    this.drawPadding(style!.rect.padding);
    this.drawBorderRadius(style!.rect.borderRadius);
    console.log('style', style.rect.isClipContent);
    this.hostElement.style.overflow = style.rect.isClipContent ? 'hidden' : 'visible';
  }

  private drawSize(width: number, height: number): void {
    if (width) {
      this.hostElement.style.width = width + 'px';
    } else {
      this.hostElement.style.width = 'auto';
    }
    if (height) {
      this.hostElement.style.height = height + 'px';
    } else {
      this.hostElement.style.height = 'auto';
    }
  }

  private drawBorder(style: IBorderStyle): void {
    if (style!.isBorder) {
      this.hostElement.style.border = style.width + 'px ' + style.style + ' ' + style.color;
    } else {
      this.hostElement.style.border = 'none';
    }
  }

  private drawPadding(padding: IPaddingStyle): void {
    this.hostElement.style.padding = padding.left + 'px ' + padding.top + 'px ' + padding.right + 'px ' + padding.bottom + 'px';
  }

  private drawBorderRadius(radius: IBorderRadiusStyle): void {
    this.hostElement.style.borderRadius = radius.topLeft + 'px ' + radius.topRight + 'px ' + radius.bottomRight + 'px ' + radius.bottomLeft + 'px';
  }
}
