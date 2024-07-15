import { Directive, ElementRef, Input } from '@angular/core';
import { ISchemeNodeViewModel } from '../../domain';
import { IBorderRadiusStyle } from '../configuration';
import { FNodeDirective } from '@foblex/flow';

@Directive({
  selector: '[sInputOutputRadius]',
  standalone: true,
})
export class SInputOutputRadiusDirective {

  @Input()
  public set sInputOutputRadius(value: ISchemeNodeViewModel) {
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
    this.drawBorderRadius(style!.rectStyle.borderRadius);
  }

  private drawBorderRadius(radius: IBorderRadiusStyle): void {
    this.hostElement.style.borderRadius = radius.topLeft + 'px ' + radius.topRight + 'px ' + radius.bottomRight + 'px ' + radius.bottomLeft + 'px';
  }
}
