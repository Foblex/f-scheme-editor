import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { IConfigurationComponent } from '../configuration-component';
import { LodashExtensions } from '@core';

@Component({
  selector: 'configuration-coordinate-input',
  templateUrl: './configuration-coordinate-input.component.html',
  styleUrls: [ './configuration-coordinate-input.component.scss' ],
  standalone: true,
  host: {
    class: 'configuration-component',
  },
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatIcon,
    MatPrefix
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationCoordinateInputComponent implements OnInit {

  public currentControl: FormControl = new FormControl();

  public control!: IConfigurationComponent;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.currentControl.setValue(this.control.formControl.value);
    this.control.formControl.registerOnDisabledChange(() => {
      this.toggleControl();
      this.changeDetectorRef.markForCheck();
    });
    this.toggleControl();
  }

  private toggleControl(): void {
    if (this.control.formControl.disabled || !this.control.enabled) {
      this.currentControl.disable({ emitEvent: false });
    } else {
      this.currentControl.enable({ emitEvent: false });
    }
  }

  public onBlur(): void {
    if(!this.currentControl.value) {
      this.currentControl.setValue(0);
    }
    if (this.currentControl.value !== this.control.formControl.value) {
      this.control.formControl.setValue(this.currentControl.value);
    }
  }
}
