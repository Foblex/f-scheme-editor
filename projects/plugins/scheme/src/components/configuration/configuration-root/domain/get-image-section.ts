import { FormControl, FormGroup } from '@angular/forms';
import { IConfigurationSection } from '../../configuration-section/domain';
import { ConfigurationExtensions } from './configuration.extensions';

export function getImageSection(formGroup: FormGroup, title: string, controlName: string): IConfigurationSection {
  return ConfigurationExtensions.createSection(title, [
      ConfigurationExtensions.createRow([
        ConfigurationExtensions.imageComponent(formGroup.get(controlName) as FormControl<string>),
      ]),
    ],
  );
}

