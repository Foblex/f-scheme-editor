import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, EventEmitter, Input, OnDestroy, Output, ViewChild
} from '@angular/core';
import { FColorPickerHueComponent } from '../f-color-picker-hue/f-color-picker-hue.component';
import { FColorPickerAlphaComponent } from '../f-color-picker-alpha/f-color-picker-alpha.component';
import { Subscription } from 'rxjs';
import { ColorExtensions, HSBAToHexConverter, IHSBAColor, RGBAToHSBAConverter } from '../domain';
import { FColorPickerSaturationComponent } from '../f-color-picker-saturation/f-color-picker-saturation.component';
import { FColorPickerPresetComponent } from '../f-color-picker-preset/f-color-picker-preset.component';
import { FColorPickerRectComponent } from '../f-color-picker-rect/f-color-picker-rect.component';

@Component({
  selector: 'f-color-picker',
  templateUrl: './f-color-picker.component.html',
  styleUrls: [ './f-color-picker.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FColorPickerSaturationComponent,
    FColorPickerHueComponent,
    FColorPickerAlphaComponent,
    FColorPickerPresetComponent,
    FColorPickerRectComponent
  ]
})
export class FColorPickerComponent implements AfterViewInit, OnDestroy {

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

  @ViewChild(FColorPickerSaturationComponent, { static: true })
  public saturation?: FColorPickerSaturationComponent;

  @ViewChild(FColorPickerHueComponent, { static: true })
  public hue?: FColorPickerHueComponent;

  @ViewChild(FColorPickerAlphaComponent, { static: true })
  public alpha?: FColorPickerAlphaComponent;

  @ViewChild(FColorPickerPresetComponent, { static: true })
  public preset?: FColorPickerPresetComponent;

  @ViewChild(FColorPickerRectComponent, { static: true })
  public fColorRect?: FColorPickerRectComponent;

  @Output()
  public onSelect: EventEmitter<string> = new EventEmitter<string>();

  public ngAfterViewInit(): void {
    this.redraw();
    this.subscriptions$.add(this.subscribeToSaturationChange());
    this.subscriptions$.add(this.subscribeToHueChange());
    this.subscriptions$.add(this.subscribeToAlphaChange());
  }

  private redraw(): void {
    this.saturation!.color = this.value;
    this.hue!.color = this.value;
    this.alpha!.color = this.value;
    this.fColorRect!.color = this.color;
  }

  private subscribeToSaturationChange(): Subscription {
    return this.saturation!.onChange.subscribe((value) => {
      this.value.s = value.s;
      this.value.b = value.b;
      this.redraw();
    });
  }

  private subscribeToHueChange(): Subscription {
    return this.hue!.onChange.subscribe((value) => {
      this.value.h = value;
      this.redraw();
    });
  }

  private subscribeToAlphaChange(): Subscription {
    return this.alpha!.onChange.subscribe((value) => {
      this.value.a = value;
      this.redraw();
    });
  }

  public setPresets(colors: string[]): void {
    this.preset!.setPresets(colors);
  }

  public onColorSelect(color: string): void {
    this.color = color;
    this.onSelect.emit(color);
  }

  public ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
