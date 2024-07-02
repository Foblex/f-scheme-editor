import {
  ChangeDetectionStrategy,
  Component, Inject, OnInit
} from '@angular/core';
import { ENTER, ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { PasteEntitiesDialogRequest } from './domain';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PasteEntityDialogForm } from './services';
import { LOCALIZATION } from '@resources';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IEntity } from '@core';
import {
  DialogBodyDirective, DialogContainerComponent,
  DialogFooterDirective,
  FocusOnInit, FormContainerDirective, FormRowDirective,
  PrimaryButtonComponent,
  PrimaryButtonOutlineComponent
} from '@ui-kit';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'paste-entities-dialog',
  templateUrl: './paste-entities-dialog.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PrimaryButtonOutlineComponent,
    DialogFooterDirective,
    PrimaryButtonComponent,
    FocusOnInit,
    ReactiveFormsModule,
    DialogBodyDirective,
    MatFormField,
    MatInput,
    DialogContainerComponent,
    FormContainerDirective,
    FormRowDirective
  ],
  host: {
    '(keydown)': 'handleKeyDown($event)'
  },
  providers: [
    PasteEntityDialogForm
  ]
})
export class PasteEntitiesDialogComponent implements OnInit {

  public form: FormGroup | undefined;

  public localization = LOCALIZATION;

  constructor(
      private dialogReference: MatDialogRef<any>,
      @Inject(MAT_DIALOG_DATA) public data: PasteEntitiesDialogRequest,
      private formService: PasteEntityDialogForm,
  ) {
  }

  public ngOnInit(): void {
    if (this.data.entities.length === 1) {
      this.form = this.formService.getForm(this.data.entities[ 0 ]);
    }
  }

  public onCancel(): void {
    this.onClose(undefined);
  }

  public onSuccess(): void {
    if (this.form) {
      this.data.entities[ 0 ].name = this.form.value.name;
    }
    this.onClose(this.data.entities);
  }

  private onClose(entities: IEntity[] | undefined): void {
    this.dialogReference.close(entities);
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (event.keyCode === ENTER && !hasModifierKey(event)) {
      event.preventDefault();
      this.onSuccess();
    } else if (event.keyCode === ESCAPE && !hasModifierKey(event)) {
      this.onCancel();
    }
  }
}
