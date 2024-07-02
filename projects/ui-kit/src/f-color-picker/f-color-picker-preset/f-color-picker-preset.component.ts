import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: `f-color-picker-preset`,
  templateUrl: `./f-color-picker-preset.component.html`,
  styleUrls: [ 'f-color-picker-preset.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FColorPickerPresetComponent {

  public colors: string[] = [];

  @Output()
  public onSelect: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public setPresets(colors: string[]): void {
    this.colors = colors;
    this.changeDetectorRef.markForCheck();
  }

  public onColorSelect(color: string): void {
    this.onSelect.emit(color);
  }
}
