import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, EventEmitter, Input, OnDestroy, Output, ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FColorPickerRectComponent } from '@ui-kit';

@Component({
  selector: 'f-image-picker',
  templateUrl: './f-image-picker.component.html',
  styleUrls: [ './f-image-picker.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FImagePickerComponent implements AfterViewInit, OnDestroy {

  private subscriptions$: Subscription = new Subscription();

  private value: string = '';

  @Input()
  public set color(value: string) {
    this.value = value;
    this.redraw();
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
