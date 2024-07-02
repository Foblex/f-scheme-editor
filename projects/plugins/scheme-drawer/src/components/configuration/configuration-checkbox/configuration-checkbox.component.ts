import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { IConfigurationComponent } from '../configuration-component';

@Component({
  selector: 'configuration-checkbox',
  templateUrl: './configuration-checkbox.component.html',
  styleUrls: [ './configuration-checkbox.component.scss' ],
  standalone: true,
  host: {
    class: 'configuration-component',
  },
  imports: [
    ReactiveFormsModule,
    MatCheckbox,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationCheckboxComponent {

  public control!: IConfigurationComponent;
}
