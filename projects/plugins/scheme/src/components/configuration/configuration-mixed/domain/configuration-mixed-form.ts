import { FormControl } from '@angular/forms';
import { LodashExtensions } from '@core';
import { isMixedValue } from './is-mixed-value';
import { IBorderRadiusStyle } from '../../domain';

export class ConfigurationMixedForm {

  public control: FormControl = new FormControl();
  private currentValue!: number | string;

  private originalControl!: FormControl;

  public initialize(originalControl: FormControl): void {
    this.originalControl = originalControl;
    this.currentValue = isMixedValue(originalControl.value) ? 'Mixed' : getValidValue(originalControl);
    this.control.setValue(this.currentValue);
  }

  public isValueChanged(): boolean {
    return !LodashExtensions.isEquals(this.currentValue, this.control.value);
  }

  public onBlur(): void {
    if (!this.isValueChanged()) {
      return;
    }
    this.currentValue = LodashExtensions.integerInRange(this.control.value, 1000, getValidValue(this.originalControl));
    if (this.isValueChanged()) {
      this.originalControl.setValue({
        value1: this.currentValue,
        value2: this.currentValue,
        value3: this.currentValue,
        value4: this.currentValue
      });
    }
    this.control.setValue(this.currentValue);
  }

  public getValue(): IBorderRadiusStyle {
    return this.originalControl.value;
  }

  public onUpdateValue(value: IBorderRadiusStyle): void {
    this.originalControl.setValue(value);
    this.initialize(this.originalControl);
  }
}

function getValidValue<T>(control: FormControl): T {
  return Object.values(control.value)[0] as T;
}

