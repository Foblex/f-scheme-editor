import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FOverlayPanelComponent } from '@ui-kit';
import { IConfigurationComponent } from '../configuration-component';
import { IBorderRadiusStyle } from '../domain';
import { MixedPanelComponent } from './mixed-panel';
import { ConfigurationMixedForm } from './domain';

@Component({
  selector: 'configuration-mixed',
  templateUrl: './configuration-mixed.component.html',
  host: {
    class: 'configuration-component',
  },
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatIcon,
    MatPrefix,
    FOverlayPanelComponent,
    MixedPanelComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationMixedComponent implements OnInit {

  public formBuilder: ConfigurationMixedForm = new ConfigurationMixedForm();

  public control!: IConfigurationComponent;

  public ngOnInit(): void {
    this.formBuilder.initialize(this.control.formControl);
  }

  public onBlur(): void {
    this.formBuilder.onBlur();
  }

  public onValueChange(value: IBorderRadiusStyle): void {
    this.formBuilder.onUpdateValue(value);
  }
}
