import { Subscription } from 'rxjs';
import { IConfigurationSection } from '../../configuration-section/domain';

export interface IConfiguration {

  subscription: Subscription;

  sections: IConfigurationSection[];
}
