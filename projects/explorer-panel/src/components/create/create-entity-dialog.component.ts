import {
  ChangeDetectionStrategy,
  Component, Inject, OnDestroy, OnInit
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ENTER, ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { CreateEntityDialogData, CreateEntityDialogResponse } from './domain';
import { CreateEntityDialogForm } from './services';
import { Subscription } from 'rxjs';
import { LOCALIZATION } from '@resources';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EEntityType, PLUGIN_TOKEN, IEntitySummary, IEntityPlugin, IEntity } from '@core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  DialogBodyDirective, DialogContainerComponent,
  DialogFooterDirective,
  FocusOnInit, FormContainerDirective, FormRowDirective,
  PrimaryButtonComponent,
  PrimaryButtonOutlineComponent
} from '@ui-kit';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'create-entity-dialog',
  templateUrl: './create-entity-dialog.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    PrimaryButtonComponent,
    PrimaryButtonOutlineComponent,
    FocusOnInit,
    MatSelect,
    MatOption,
    DialogBodyDirective,
    DialogFooterDirective,
    FormContainerDirective,
    FormRowDirective,
    MatIcon,
    DialogContainerComponent
  ],
  providers: [ CreateEntityDialogForm ]
})
export class CreateEntityDialogComponent implements OnInit, OnDestroy {

  private subscriptions$: Subscription = new Subscription();

  public localization = LOCALIZATION;

  public form: FormGroup | undefined;

  public options: IEntitySummary[] = [];

  public isTypeOnInit: boolean = true;

  constructor(
    @Inject(PLUGIN_TOKEN) private plugins: IEntityPlugin<IEntity>[],
    private dialogReference: MatDialogRef<CreateEntityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateEntityDialogData,
    private formService: CreateEntityDialogForm
  ) {
  }

  public ngOnInit(): void {
    this.initialize();
    this.form = this.formService.getForm(this.data.entityType, this.data.inDirectory);
    this.subscriptions$.add(
      this.formService.subscribeOnTypeValueChanges(this.form!, this.data.inDirectory)
    );
  }

  private initialize(): void {
    this.data.entityType = this.data.entityType === EEntityType.SCRATCH_FILE ? undefined : this.data.entityType
    this.isTypeOnInit = !!this.data.entityType;
    this.options = this.plugins.map((x) => {
      return {
        key: x.type,
        name: x.localization.name,
        type: x.type,
        icon: x.icon
      };
    });
  }

  public onCancel(): void {
    this.onClose();
  }

  public onSuccess(): void {
    this.onClose(
      new CreateEntityDialogResponse(this.data.inDirectory, this.form!.value.name)
    );
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (event.keyCode === ENTER && !hasModifierKey(event) && this.form!.valid) {
      event.preventDefault();
      this.onSuccess();
    } else if (event.keyCode === ESCAPE && !hasModifierKey(event)) {
      this.onCancel();
    }
  }

  private onClose(value?: CreateEntityDialogResponse): void {
    this.dialogReference.close(value);
  }

  public ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
