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
import {IPoint, RectExtensions} from "@foblex/2d";

@Component({
  selector: `f-color-picker-saturation`,
  templateUrl: `./f-color-picker-saturation.component.html`,
  styleUrls: [ 'f-color-picker-saturation.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FColorPickerHandleComponent
  ],
  standalone: true,
  host: {
    '(touchstart)': "onDragStart($event)",
    '(touchmove)': "onDrag($event)",
    '(touchend)': "onDragEnd()",
    '(mousedown)': "onMouseDown($event)",
  }
})
export class FColorPickerSaturationComponent extends BaseHandleContainer implements AfterViewInit {

  private value: IHSBAColor = ColorExtensions.defaultHSBA();

  @Input()
  public set color(value: IHSBAColor) {
    this.value = value;
    this.redraw();
  }

  @Input()
  public override isDisabled: boolean = false;

  @Output()
  public onChange: EventEmitter<{ s: number, b: number }> = new EventEmitter<{ s: number, b: number }>();

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
    this.value = this.getValidatedValue(this.getSaturationBrightness(this.getPageXY(event, position)));
    this.redraw();
    this.onChange.emit({ s: this.value.s, b: this.value.b });
  }

  private getValidatedValue(sb: { saturation: number, brightness: number }): IHSBAColor {
    return validateHSBA({
      h: this.value.h,
      s: sb.saturation,
      b: sb.brightness,
      a: 1
    })
  }

  private getSaturationPosition(): IPoint {
    return {
      x: this.hostRect.x + this.document.body.scrollLeft,
      y: this.hostRect.y + this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0
    };
  }

  private getSaturationBrightness(pageXY: IPoint): { saturation: number; brightness: number } {
    const componentPosition = this.getSaturationPosition();
    return {
      saturation: Math.floor((100 * Math.max(0, Math.min(this.hostRect.width, pageXY.x - componentPosition.x))) / this.hostRect.width),
      brightness: Math.floor((100 * (this.hostRect.height - Math.max(0, Math.min(this.hostRect.height, pageXY.y - componentPosition.y)))) / this.hostRect.height)
    };
  }

  public redraw() {
    this.redrawHandle();
    this.redrawBackground();
  }

  private redrawHandle(): void {
    this.fHandle?.setPosition({
      x: (this.hostRect.width * this.value.s) / 100,
      y: this.hostRect.height * (100 - this.value.b) / 100 + this.fHandle.rect.height / 4
    });
    this.fHandle?.setColor(HSBAToHexConverter({ ...this.value, a: 1 }));
  }

  private redrawBackground(): void {
    this.elementReference.nativeElement.style.backgroundColor = HSBAToHexConverter({
      h: this.value.h,
      s: 100,
      b: 100,
      a: 1
    });
  }
}
