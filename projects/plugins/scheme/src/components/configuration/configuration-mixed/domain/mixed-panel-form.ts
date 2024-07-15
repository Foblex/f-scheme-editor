import { FormControl, FormGroup } from '@angular/forms';
import { LodashExtensions, validateIntegerValues } from '@core';
import { IMixedValueForm } from './i-mixed-value-form';
import { IMixedValue } from './i-mixed-value';
import { FOverlayPanelComponent } from '@ui-kit';

export class MixedPanelForm {

  public form = this.buildForm();

  private value!: IMixedValue;

  constructor(
    private fPanel: FOverlayPanelComponent
  ) {
  }

  private buildForm(): FormGroup {
    return new FormGroup<IMixedValueForm>({
      control1: new FormControl(),
      control2: new FormControl(),
      control3: new FormControl(),
      control4: new FormControl()
    });
  }

  public onBlur(): void {
    this.validateValues();
    if (!this.isValueChanged()) {
      return;
    }
    this.fPanel.setValue(this.getValue());
  }

  private validateValues(): void {
    this.setFormValue(
      validateIntegerValues(this.getFormValue(), this.value, 1000)
    );
  }

  public isValueChanged(): boolean {
    return !LodashExtensions.isEquals(this.value, this.form.value);
  }

  public getValue(): IMixedValue {
    this.value = { ...this.value, ...this.getFormValue() };
    return this.value;
  }

  public setValue(value: IMixedValue): void {
    this.value = value;
    this.setFormValue(value);
  }

  private getFormValue(): IMixedValue {
    return {
      value1: this.form.value.control1,
      value2: this.form.value.control2,
      value3: this.form.value.control3,
      value4: this.form.value.control4
    };
  }

  private setFormValue(value: IMixedValue): void {
    this.form.setValue({
      control1: value.value1,
      control2: value.value2,
      control3: value.value3,
      control4: value.value4
    });
  }
}


