import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, ElementRef, Input, OnDestroy, ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ColorExtensions, HSBAToHexConverter, IHSBAColor, RGBAToHSBAConverter } from '../domain';
import { FColorPickerHandleComponent } from '../f-color-picker-handle/f-color-picker-handle.component';
import { IRect, RectExtensions } from '@foblex/core';
import { FColorPickerRectDirective } from './f-color-picker-rect.directive';

@Component({
  selector: 'f-color-picker-rect',
  templateUrl: './f-color-picker-rect.component.html',
  styleUrls: [ './f-color-picker-rect.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FColorPickerHandleComponent,
    FColorPickerRectDirective
  ]
})
export class FColorPickerRectComponent implements AfterViewInit, OnDestroy {

  private subscriptions$: Subscription = new Subscription();

  private value: IHSBAColor = ColorExtensions.defaultHSBA();

  @Input()
  public set color(value: string) {
    this.value = RGBAToHSBAConverter(ColorExtensions.toRgba(ColorExtensions.fromString(value)));
    this.redraw();
  }

  public get color(): string {
    return HSBAToHexConverter(this.value);
  }

  protected hostRect: IRect = RectExtensions.fromElement(this.elementReference.nativeElement);

  @ViewChild('color', { static: true })
  public fColor!: ElementRef<HTMLDivElement>;

  constructor(
    private elementReference: ElementRef<HTMLElement>,
  ) {
  }

  public ngAfterViewInit(): void {
    this.hostRect = RectExtensions.fromElement(this.elementReference.nativeElement);
    this.redraw();
  }

  private redraw(): void {
    this.fColor.nativeElement.style.backgroundColor = HSBAToHexConverter(this.value);
  }

  public ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
