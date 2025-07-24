import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Subscription, take} from 'rxjs';
import {ILocalConfiguration, LocalConfigurationService, StorageService} from '@core';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {LOCALIZATION} from '@resources';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {startWith} from 'rxjs/operators';
import {ResizableBoxDirective, ResizableBoxHandleDirective} from '@ui-kit';
import {MatIconRegistry} from '@angular/material/icon';
import {ExplorerPanelComponent} from '@explorer-panel';
import {createIconsRegistry} from './icons-registry';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ExplorerPanelComponent,
    ToolbarComponent,
    NavigationBarComponent,
    ResizableBoxDirective,
    ResizableBoxHandleDirective
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscriptions$: Subscription = new Subscription();

  public isInitialized: boolean = false;

  public configuration!: ILocalConfiguration;

  constructor(
    titleService: Title,
    matIconRegistry: MatIconRegistry,
    private storage: StorageService,
    private localConfigurationService: LocalConfigurationService,
    domSanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    matIconRegistry.setDefaultFontSetClass('material-symbols-outlined');
    createIconsRegistry(matIconRegistry, domSanitizer);
    titleService.setTitle(LOCALIZATION.application_name);
  }

  public ngOnInit(): void {
    this.storage.initialize(localStorage.getItem('prjKey') || 'prjKey').pipe(take(1)).subscribe(() => {
      this.isInitialized = true;
      this.subscriptions$.add(this.subscribeOnProjectSave());
      this.changeDetectorRef.markForCheck();
    });
    this.subscriptions$.add(
      this.subscribeOnUserSettingsChanges()
    );
  }

  private subscribeOnProjectSave(): Subscription {
    return this.storage.save$().subscribe();
  }

  private subscribeOnUserSettingsChanges(): Subscription {
    return this.localConfigurationService.localStateChanges$.pipe(startWith(null)).subscribe(() => {
      this.configuration = this.localConfigurationService.getState();
    });
  }

  public onExplorerPanelResizeEnd(event: any): void {
    const model = this.localConfigurationService.getState();
    model.explorerPanel.width = event ? event : model.explorerPanel.width;
    this.localConfigurationService.setState(model, false);
  }

  public ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
