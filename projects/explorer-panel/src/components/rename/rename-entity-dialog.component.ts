import {
  ChangeDetectionStrategy,
  Component, Inject, OnInit
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ENTER, ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { RenameEntityDialogData } from './domain';
import { RenameEntityDialogForm } from './services';
import { LOCALIZATION } from '@resources';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  DialogBodyDirective, DialogContainerComponent,
  DialogFooterDirective, FocusOnInit, FormContainerDirective, FormRowDirective,
  PrimaryButtonComponent,
  PrimaryButtonOutlineComponent
} from '@ui-kit';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'rename-entity-dialog',
  templateUrl: './rename-entity-dialog.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DialogFooterDirective,
    ReactiveFormsModule,
    DialogBodyDirective,
    PrimaryButtonOutlineComponent,
    PrimaryButtonComponent,
    MatFormField,
    MatInput,
    FocusOnInit,
    DialogContainerComponent,
    FormRowDirective,
    FormContainerDirective
  ],
  providers: [ RenameEntityDialogForm ]
})
export class RenameEntityDialogComponent implements OnInit {

  public form: FormGroup | undefined;

  public localization = LOCALIZATION;

  constructor(
      private dialogReference: MatDialogRef<any>,
      @Inject(MAT_DIALOG_DATA) public data: RenameEntityDialogData,
      private formService: RenameEntityDialogForm,
  ) {
  }

  public ngOnInit(): void {
    this.form = this.formService.getForm(this.data.entity);
  }

  public onCancel(): void {
    this.onClose();
  }

  public onSuccess(): void {
    this.onClose(this.form!.value.name);
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (event.keyCode === ENTER && !hasModifierKey(event) && this.form!.valid) {
      event.preventDefault();
      this.onClose(this.form!.value.name);
    } else if (event.keyCode === ESCAPE && !hasModifierKey(event)) {
      this.onClose();
    }
  }

  private onClose(value: string | null = null): void {
    this.dialogReference.close(value);
  }
}
