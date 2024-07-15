import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FColorPickerOverlayComponent, FColorOverlayDirective } from '@ui-kit';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IConfigurationComponent } from '../configuration-component';

@Component({
  selector: 'configuration-textarea',
  templateUrl: './configuration-textarea.component.html',
  styleUrls: ['./configuration-textarea.component.scss'],
  standalone: true,
  host: {
    class: 'configuration-component',
  },
  imports: [
    MatFormFieldModule,
    FColorPickerOverlayComponent,
    MatInputModule,
    FColorOverlayDirective,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationTextareaComponent implements OnInit {

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
    if (this.control.formControl.disabled) {
      this.currentControl.disable({ emitEvent: false });
    } else {
      this.currentControl.enable({ emitEvent: false });
    }
  }

  public onBlur(): void {
    if (this.currentControl.value !== this.control.formControl.value) {
      this.control.formControl.setValue(this.currentControl.value);
    }
  }
}
