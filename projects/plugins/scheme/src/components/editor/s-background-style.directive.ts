import { ContentChild, Directive, ElementRef, Input } from '@angular/core';
import { FBackgroundComponent } from '@foblex/flow';
import { ISchemeViewModel } from '../../domain';

@Directive({
  selector: '[sBackgroundStyle]',
  standalone: true,
})
export class SBackgroundStyleDirective {

  @Input()
  public set sBackgroundStyle(value: ISchemeViewModel) {
    this.refresh(value);
  };

  @ContentChild(FBackgroundComponent, { static: false })
  private fBackground!: FBackgroundComponent;

  constructor(
    private elementReference: ElementRef<HTMLElement>
  ) {
  }

  private refresh(style: ISchemeViewModel): void {
    this.setCSSVariable('--f-background-stroke', style.stroke);
    this.setCSSVariable('--f-background-fill', style.fill);
  }

  private setCSSVariable(variableName: string, value: string): void {
    this.elementReference.nativeElement.style.setProperty(variableName, value);
  }
}
