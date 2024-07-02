import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
  EventEmitter,
  Output,
  Inject, AfterViewInit
} from '@angular/core';
import { FColorPickerHandleComponent } from '../f-color-picker-handle/f-color-picker-handle.component';
import { DOCUMENT } from '@angular/common';
import {
  BaseHandleContainer,
  ColorExtensions,
  HSBAToHexConverter,
  IHSBAColor,
  validateHSBA
} from '../domain';
import { IPoint, RectExtensions } from '@foblex/core';
import { FColorPickerRectDirective } from './f-color-picker-hue.directive';

@Component({
  selector: `f-color-picker-hue`,
  templateUrl: `./f-color-picker-hue.component.html`,
  styleUrls: [ 'f-color-picker-hue.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FColorPickerHandleComponent,
    FColorPickerRectDirective
  ],
  standalone: true,
  host: {
    '(touchstart)': "onDragStart($event)",
    '(touchmove)': "onDrag($event)",
    '(touchend)': "onDragEnd()",
    '(mousedown)': "onMouseDown($event)",
  }
})
export class FColorPickerHueComponent extends BaseHandleContainer implements AfterViewInit {

  private value: IHSBAColor = ColorExtensions.defaultHSBA();

  @Input()
  public set color(value: IHSBAColor) {
    this.value = value;
    this.redraw();
  }

  @ViewChild(FColorPickerHandleComponent, { static: true })
  public handle!: FColorPickerHandleComponent;

  @Input()
  public override isDisabled: boolean = false;

  @Output()
  public onChange: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild(FColorPickerHandleComponent, { static: true })
  public fHandle!: FColorPickerHandleComponent;

  private window: Window;

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
    super();
    this.window = this.document.defaultView as Window;
  }

  public ngAfterViewInit(): void {
    this.hostRect = RectExtensions.fromElement(this.elementReference.nativeElement);
    this.redraw();
  }

  public override updateColor(event: MouseEvent | TouchEvent, position?: { pageX: number; pageY: number }): void {
    this.value = this.getValidatedValue(this.getHue(this.getPageXY(event, position)));
    this.redraw();
    this.onChange.emit(this.value.h);
  }

  private getHue(pageXY: IPoint): number {
    const x = Math.max(0, Math.min(this.getWidth(), pageXY.x - this.getLeft()));
    return Math.floor((359 * x) / this.getWidth());
  }

  private getLeft(): number {
    return this.hostRect.x + (this.window.pageXOffset || this.document.documentElement.scrollLeft || this.document.body.scrollLeft || 0);
  }

  private getValidatedValue(h: number): IHSBAColor {
    return validateHSBA({ h, s: 100, b: 100, a: 1 })
  }

  private redraw() {
    this.redrawHandle();
  }

  private redrawHandle(): void {
    this.fHandle?.setPosition({ x: (this.getWidth() * this.value.h) / 359, y: 0 });
    this.fHandle?.setColor(HSBAToHexConverter({ ...this.value, s: 100, b: 100 }));
  }

  private getWidth(): number {
    return this.hostRect.width - this.fHandle.rect.width;
  }
}
