import { FormControl, FormGroup } from '@angular/forms';
import { IConfigurationSection } from '../../configuration-section/domain';
import { ConfigurationExtensions } from './configuration.extensions';
import { getLineTypeOptions } from '../../domain';

export function getBorderSection(formGroup: FormGroup, title: string): IConfigurationSection {
  return ConfigurationExtensions.createSection(title, [
    ConfigurationExtensions.createRow([
      ConfigurationExtensions.colorComponent(formGroup.get('color') as FormControl<string>),
    ]),
    ConfigurationExtensions.createRow([
      ConfigurationExtensions.inputComponent(formGroup.get('width') as FormControl<string>, 'line-size'),
      ConfigurationExtensions.selectComponent(formGroup.get('style') as FormControl<string>, 'line-style', getLineTypeOptions()),
    ]),
  ], ConfigurationExtensions.visibilityComponent(formGroup.get('isBorder')!));
}

