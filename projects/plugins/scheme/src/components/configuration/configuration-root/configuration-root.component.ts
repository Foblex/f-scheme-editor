import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigurationSectionRenderer } from './configuration-section.renderer';
import { IConfiguration } from './domain';

@Component({
  selector: 'configuration-root',
  templateUrl: './configuration-root.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ConfigurationSectionRenderer
  ]
})
export class ConfigurationRootComponent implements OnDestroy {

  private subscription$: Subscription = Subscription.EMPTY;

  public _configuration!: IConfiguration;

  @Input({ required: true })
  public set configuration(configuration: IConfiguration) {
    this.updateConfiguration(configuration);
  }

  public updateConfiguration(configuration: IConfiguration): void {
    this.subscription$.unsubscribe();
    this.subscription$ = configuration.subscription;
    this._configuration = configuration;
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}


