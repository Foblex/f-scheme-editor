import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IConfigurationComponent } from '../configuration-component';
import { SchemeFormComponentRenderer } from './configuration-component.renderer';

@Component({
  selector: 'configuration-row',
  templateUrl: './configuration-row.component.html',
  styleUrls: ['./configuration-row.component.scss'],
  standalone: true,
  imports: [
    SchemeFormComponentRenderer
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurationRowComponent {

  public children: IConfigurationComponent[] = [];
}
