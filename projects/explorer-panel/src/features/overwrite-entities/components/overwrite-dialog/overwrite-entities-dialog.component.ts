import {
  ChangeDetectionStrategy,
  Component, Inject, OnInit
} from '@angular/core';
import { EOverwriteEntities, OverwriteEntitiesDialogRequest, OverwriteEntitiesDialogResponse } from './domain';
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { LOCALIZATION } from '@resources';
import { DialogRef } from '@angular/cdk/dialog';
import { EEntityType, LodashExtensions, StorageService } from '@core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  DialogBodyDirective, DialogContainerComponent,
  DialogFooterDirective,
  FocusOnInit,
  PrimaryButtonComponent,
  PrimaryButtonOutlineComponent
} from '@ui-kit';
import { CdkTrapFocus } from '@angular/cdk/a11y';

@Component({
  selector: 'move-entities-dialog',
  templateUrl: './overwrite-entities-dialog.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DialogBodyDirective,
    DialogFooterDirective,
    CdkTrapFocus,
    FocusOnInit,
    PrimaryButtonOutlineComponent,
    PrimaryButtonComponent,
    DialogContainerComponent
  ],
  host: {
    '(keydown)': 'handleKeyDown($event)'
  }
})
export class OverwriteEntitiesDialogComponent implements OnInit {

  public message: string = '';

  public localization = LOCALIZATION;

  constructor(
      private dialogReference: MatDialogRef<any>,
      private storage: StorageService,
      @Inject(MAT_DIALOG_DATA) public data: OverwriteEntitiesDialogRequest,
  ) {

  }

  public ngOnInit(): void {
    this.message = LodashExtensions.textInterpolation(
        LOCALIZATION.common.overwrite_confirm_message,
        this.data.entity.name,
        this.storage.getEntity(this.data.toDirectory, EEntityType.DIRECTORY)?.name
    );
  }

  public onCancel(): void {
    this.onClose(EOverwriteEntities.CANCEL);
  }

  public onSkip(): void {
    this.onClose(EOverwriteEntities.SKIP);
  }

  public onOverwrite(): void {
    this.onClose(EOverwriteEntities.OVERWRITE);
  }

  private onClose(value: EOverwriteEntities): void {
    this.dialogReference.close(new OverwriteEntitiesDialogResponse(this.data.entity, this.data.toDirectory, value));
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (event.keyCode === ESCAPE && !hasModifierKey(event)) {
      this.onCancel();
    }
  }
}
