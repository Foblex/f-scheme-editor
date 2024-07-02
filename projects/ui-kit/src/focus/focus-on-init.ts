import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  standalone: true,
  selector: '[focusOnInit]'
})
export class FocusOnInit implements AfterViewInit {

  @Input()
  public get focusOnInit(): boolean {
    return this.isFocusOnInit;
  }

  public set focusOnInit(value: BooleanInput) {
    this.isFocusOnInit = coerceBooleanProperty(value);
  }

  protected isFocusOnInit: boolean = true;

  constructor(
      private elementReference: ElementRef<HTMLElement>
  ) {
  }

  public ngAfterViewInit(): void {
    if (this.isFocusOnInit) {
      this.elementReference.nativeElement.focus();
    }
  }
}
