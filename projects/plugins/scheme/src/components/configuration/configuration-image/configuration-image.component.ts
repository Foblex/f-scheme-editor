import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FColorPickerOverlayComponent,
  FColorOverlayDirective,
  FImagePickerOverlayComponent, FImagePickerInputDirective,
} from '@ui-kit';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { IConfigurationComponent } from '../configuration-component';

@Component({
  selector: 'configuration-image',
  templateUrl: './configuration-image.component.html',
  standalone: true,
  host: {
    class: 'configuration-component',
  },
  imports: [
    MatFormFieldModule,
    FColorPickerOverlayComponent,
    MatInputModule,
    FColorOverlayDirective,
    ReactiveFormsModule,
    FImagePickerOverlayComponent,
    FImagePickerInputDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationImageComponent implements OnInit {

  public control!: IConfigurationComponent;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.control.formControl.registerOnDisabledChange(() => {
      this.changeDetectorRef.markForCheck();
    });
  }
}
