import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FColorPickerOverlayComponent, FColorOverlayDirective } from '@ui-kit';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { IConfigurationComponent } from '../configuration-component/domain';

@Component({
  selector: 'configuration-color',
  templateUrl: './configuration-color.component.html',
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
export class ConfigurationColorComponent implements OnInit {

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
