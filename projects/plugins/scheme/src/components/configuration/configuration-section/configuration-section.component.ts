import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationRowRenderer } from './configuration-row.renderer';
import { IConfigurationRow } from '../configuration-row/domain';
import { FIconButtonComponent } from '@ui-kit';
import { MatIcon } from '@angular/material/icon';
import { ConfigurationVisibilityButtonComponent } from '../configuration-visibility-button';
import { IConfigurationComponent } from '../configuration-component';

@Component({
  selector: 'configuration-section',
  templateUrl: './configuration-section.component.html',
  styleUrls: ['./configuration-section.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ConfigurationRowRenderer,
    ConfigurationVisibilityButtonComponent
  ],
  host: {
    'class': 'configuration-section'
  }
})
export class ConfigurationSectionComponent {

  public title: string | undefined;

  public control: IConfigurationComponent | undefined;

  public rows: IConfigurationRow[] = [];
}
