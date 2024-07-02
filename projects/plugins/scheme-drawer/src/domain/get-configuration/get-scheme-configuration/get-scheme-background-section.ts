import { IConfigurationSection } from '../../../components/configuration/configuration-section/domain';
import { ConfigurationExtensions, getSchemeBackgroundOptions } from '../../../components/configuration';
import { FormControl, FormGroup } from '@angular/forms';

export function getSchemeBackgroundSection(formGroup: FormGroup): IConfigurationSection {
  return ConfigurationExtensions.createSection('Background', [
      ConfigurationExtensions.createRow([
        ConfigurationExtensions.selectComponent(
          formGroup.get('background') as FormControl<string>, 'background', getSchemeBackgroundOptions()
        ),
      ]),
    ],
  );
}
