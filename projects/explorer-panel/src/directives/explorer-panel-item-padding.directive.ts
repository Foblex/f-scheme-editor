import { Directive, HostBinding, Input } from '@angular/core';
import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';

@Directive({
  selector: '[epItemPadding]',
  standalone: true
})
export class ExplorerPanelItemPaddingDirective {

  @Input('epItemPadding')
  public get level(): number {
    return this.innerLevel;
  }
  public set level(value: NumberInput) {
    this.innerLevel = coerceNumberProperty(value, 0);
  }

  private innerLevel: number = 0;

  @HostBinding('style.padding-left')
  public get padding(): string {
    return this.innerLevel * 18 + 12 +'px';
  }
}

