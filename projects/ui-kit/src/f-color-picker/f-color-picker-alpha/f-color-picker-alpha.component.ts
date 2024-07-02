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
import { BaseHandleContainer, ColorExtensions, HSBAToHexConverter, IHSBAColor } from '../domain';
import { RectExtensions } from '@foblex/core';
import { drawAlphaLine } from './draw-alpha-line';

@Component({
  selector: `f-color-picker-alpha`,
  templateUrl: `./f-color-picker-alpha.component.html`,
  styleUrls: [ 'f-color-picker-alpha.component.scss' ],
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
export class FColorPickerAlphaComponent extends BaseHandleContainer implements AfterViewInit {

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
    this.value.a = Math.max(0, Math.min(this.getWidth(), this.getPageXY(event, position).x - this.getLeft())) / this.getWidth();
    this.redraw();
    this.onChange.emit(this.value.a);
  }

  private getWidth(): number {
    return this.hostRect.width - this.fHandle.rect.width;
  }

  private getLeft(): number {
    return this.hostRect.x + (this.window.pageXOffset || this.document.documentElement.scrollLeft || this.document.body.scrollLeft || 0);
  }

  private redraw() {
    this.redrawHandle();
    this.redrawGradient();
  }

  private redrawHandle(): void {
    this.fHandle?.setPosition({ x: this.getHandleX(), y: 0 });
    const color = HSBAToHexConverter({ ...this.value });
    this.fHandle?.setColor(color);
  }

  private redrawGradient(): void {
    drawAlphaLine(this.elementReference.nativeElement.firstChild, this.hostRect, this.gradientStart, this.gradientEnd);
  }

  private getHandleX(): number {
    return Math.floor((this.hostRect.width - this.fHandle.rect.width) * this.value.a);
  }

  private get gradientStart(): string {
    return HSBAToHexConverter({ ...this.value, a: 0 });
  }

  private get gradientEnd(): string {
    return HSBAToHexConverter({ ...this.value, a: 1 });
  }
}
