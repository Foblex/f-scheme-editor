import {
  ChangeDetectionStrategy,
  Component, Inject
} from '@angular/core';
import { ENTER, ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { DeleteEntitiesDialogData } from './domain';
import { LOCALIZATION } from '@resources';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import {
  DialogBodyDirective, DialogContainerComponent,
  DialogFooterDirective,
  PrimaryButtonComponent,
  PrimaryButtonOutlineComponent
} from '@ui-kit';

@Component({
  selector: 'delete-entities-dialog',
  templateUrl: './delete-entities-dialog.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DialogBodyDirective,
    PrimaryButtonOutlineComponent,
    PrimaryButtonComponent,
    DialogFooterDirective,
    DialogContainerComponent
  ],
  host: {
    '(keydown)': 'handleKeyDown($event)'
  }
})
export class DeleteEntitiesDialogComponent  {

  public localization = LOCALIZATION;

  constructor(
      private dialogReference: MatDialogRef<any>,
      @Inject(MAT_DIALOG_DATA) public data: DeleteEntitiesDialogData,
  ) {
  }

  public onCancel(): void {
    this.onClose(false);
  }

  public onSuccess(): void {
    this.onClose(true);
  }

  private onClose(value: boolean): void {
    this.dialogReference.close(value);
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (event.keyCode === ENTER && !hasModifierKey(event)) {
      event.preventDefault();
      this.onClose(true);
    } else if (event.keyCode === ESCAPE && !hasModifierKey(event)) {
      this.onClose(false);
    }
  }
}
