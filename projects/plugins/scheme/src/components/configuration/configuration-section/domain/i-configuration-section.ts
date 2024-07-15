import { IConfigurationRow } from '../../configuration-row/domain';
import { IConfigurationComponent } from '../../configuration-component';

export interface IConfigurationSection {

  title: string;

  control?: IConfigurationComponent;

  rows: IConfigurationRow[];
}
