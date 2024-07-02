import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, ViewChild } from '@angular/core';
import { IconButtonComponent } from '@ui-kit';
import { ICONS, LOCALIZATION } from '@resources';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { defer, Observable, of, switchMap, take } from 'rxjs';
import { LocalConfigurationService } from '@core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'header[ep-toolbar]',
  templateUrl: './explorer-panel-toolbar.component.html',
  styleUrls: [ './explorer-panel-toolbar.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IconButtonComponent,
    MatFormField,
    MatInput,
    MatSuffix,
    ReactiveFormsModule,
    MatIcon
  ],
  host: {
    'role': 'toolbar'
  }
})
export class ExplorerPanelToolbarComponent {

  public icons: typeof ICONS = ICONS;

  public localization: typeof LOCALIZATION = LOCALIZATION;

  public searchControl: FormControl = new FormControl({ value: '', disabled: true });

  @ViewChild(MatInput, { static: false })
  public searchInput: MatInput | undefined;

  private readonly input: Observable<MatInput> = defer(() => {

    return this.searchInput ? of(this.searchInput) : this.ngZone.onStable.pipe(
      take(1),
      switchMap(() => this.input),
    );
  }) as Observable<MatInput>;

  constructor(
    private ideConfigurationService: LocalConfigurationService,
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public resetSearch(): void {
    this.searchControl.reset();
  }

  public onShowSearchClick(): void {
    this.searchControl.enable();
    this.input.pipe(take(1)).subscribe((input) => {
      input.focus();
    });
    this.changeDetectorRef.detectChanges();
  }

  public onHideSearchClick(): void {
    this.resetSearch();
    this.searchControl.disable();
  }

  public onSearchKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.stopPropagation();
      this.onHideSearchClick();
    }
  }

  public onHideExplorerPanelClick(): void {
    const model = this.ideConfigurationService.getState();
    model.explorerPanel.isVisible = false;
    this.ideConfigurationService.setState(model);
  }
}
