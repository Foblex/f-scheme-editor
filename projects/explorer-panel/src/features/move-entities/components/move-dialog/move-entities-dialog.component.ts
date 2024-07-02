import {
  ChangeDetectionStrategy,
  Component, Inject
} from '@angular/core';
import { ENTER, ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { MoveEntitiesDialogRequest } from './domain';
import { LOCALIZATION } from '@resources';
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
  templateUrl: './move-entities-dialog.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DialogBodyDirective,
    DialogFooterDirective,
    CdkTrapFocus,
    PrimaryButtonOutlineComponent,
    FocusOnInit,
    PrimaryButtonComponent,
    DialogContainerComponent
  ],
  host: {
    '(keydown)': 'handleKeyDown($event)'
  }
})
export class MoveEntitiesDialogComponent {

  public localization = LOCALIZATION;

  constructor(
      private dialogReference: MatDialogRef<any>,
      @Inject(MAT_DIALOG_DATA) public data: MoveEntitiesDialogRequest,
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
