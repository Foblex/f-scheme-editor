import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { ICONS, LOCALIZATION } from '@resources';
import { ILocalConfiguration, LocalConfigurationService } from '@core';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: [ './navigation-bar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatIconModule
  ]
})
export class NavigationBarComponent implements OnInit, OnDestroy {

  private subscriptions$: Subscription = new Subscription();

  public icons: typeof ICONS = ICONS;

  public configuration: ILocalConfiguration | undefined;

  public localization: typeof LOCALIZATION = LOCALIZATION;

  constructor(
    private localConfigurationService: LocalConfigurationService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.subscriptions$.add(
      this.subscribeOnUserSettingsChanges()
    );
  }

  private subscribeOnUserSettingsChanges(): Subscription {
    return this.localConfigurationService.localStateChanges$.pipe(startWith(null)).subscribe(() => {
      this.configuration = this.localConfigurationService.getState();
      this.changeDetectorRef.markForCheck();
    });
  }

  public onToggleExplorerPanel(): void {
    this.configuration!.explorerPanel.isVisible = !this.configuration!.explorerPanel.isVisible;
    this.localConfigurationService.setState(this.configuration!);
  }

  public ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
