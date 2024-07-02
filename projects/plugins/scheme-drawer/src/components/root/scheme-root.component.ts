import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy
} from '@angular/core';
import { Subscription, take } from 'rxjs';
import { EditorContainerComponent, EditorDrawerComponent } from '@editor-container';
import { SCHEME_PROVIDERS } from '../../domain';
import { RouterStorage } from '@router-controller';
import { startWith } from 'rxjs/operators';
import { SchemeEditorComponent } from '../editor/scheme-editor.component';
import { FSelectionChangeEvent } from '@foblex/flow';
import { SchemeApiService } from '../../domain';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FormsModule } from '@angular/forms';
import { ConfigurationRootComponent, IConfiguration } from '../configuration/configuration-root';

@Component({
  selector: 'scheme-root',
  templateUrl: './scheme-root.component.html',
  styleUrls: [ './scheme-root.component.scss' ],
  standalone: true,
  imports: [
    EditorContainerComponent,
    EditorDrawerComponent,
    SchemeEditorComponent,
    ConfigurationRootComponent,
    NgScrollbarModule,
    FormsModule,
  ],
  providers: [
    SCHEME_PROVIDERS
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchemeRootComponent implements AfterViewInit, OnDestroy {

  private subscriptions$: Subscription = new Subscription();

  public key: string | undefined;

  public configuration: IConfiguration | undefined;

  constructor(
    private routerStorage: RouterStorage,
    private apiService: SchemeApiService,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  public ngAfterViewInit(): void {
    this.subscriptions$.add(
      this.subscribeOnRouterChanged()
    );
  }

  private subscribeOnRouterChanged(): Subscription {
    return this.routerStorage.onRouterChanged$.pipe(startWith(null)).subscribe(() => {
      this.key = this.routerStorage.getEntityKey();
      this.getConfigurationSummary({ nodes: [], connections: [] });
      this.changeDetector.markForCheck();
    });
  }

  public onSelectionChange(event: FSelectionChangeEvent): void {
    this.getConfigurationSummary(event);
  }

  private getConfigurationSummary(event: FSelectionChangeEvent): void {
    this.apiService.getConfiguration(this.key!, event).pipe(take(1)).subscribe((x) => {
      this.configuration = x;
      this.changeDetector.detectChanges();
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}


