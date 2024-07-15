import { FormControl } from '@angular/forms';
import { EConfigurationComponentType } from '../../configuration-root';
import { IDropDownOption } from '../../configuration-drop-down';
import { IMixedPanelConfiguration } from '../../configuration-mixed';

export interface IConfigurationComponent<T = any> {

  prefix?: string;

  type: EConfigurationComponentType;

  options?: IDropDownOption<T>[];

  label?: string;

  formControl: FormControl<T>;

  mixedPanel?: IMixedPanelConfiguration;

  enabled?: boolean;
}
