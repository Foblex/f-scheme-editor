import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetNamesByTypeInDirectoryHandler, GetNamesByTypeInDirectoryRequest } from '../../../domain';
import { CoreValidators, StorageService } from '@core';

@Injectable()
export class CreateEntityDialogForm {

  constructor(
      private storage: StorageService
  ) {
  }

  public getForm(entityType: string | undefined, inDirectory: string): FormGroup {

    const existingNames = this.getExistingNames(entityType, inDirectory);
    return new FormGroup<any>({
      'name': new FormControl('', [
        Validators.required,
        CoreValidators.unique(existingNames),
        CoreValidators.validFileName(),
        Validators.maxLength(256)
      ]),
      'type': new FormControl(entityType, [
        Validators.required,
      ])
    });
  }

  public subscribeOnTypeValueChanges(form: FormGroup, inDirectory: string): Subscription {
    return form.get('type')!.valueChanges.subscribe((value) => {
      this.changeUniqueValidatorForType(form, value, inDirectory);
      form.get('name')?.updateValueAndValidity({ emitEvent: false });
    });
  }

  private changeUniqueValidatorForType(form: FormGroup, entityType: string, inDirectory: string): void {
    const existingNames = this.getExistingNames(entityType, inDirectory);
    form.get('name')!.setValidators([
      Validators.required,
      CoreValidators.unique(existingNames),
      Validators.maxLength(256)
    ]);
  }

  private getExistingNames(entityType: string | undefined, inDirectory: string): string[] {
    return entityType ? new GetNamesByTypeInDirectoryHandler(this.storage).handle(
        new GetNamesByTypeInDirectoryRequest(inDirectory, entityType)
    ) : [];
  }
}
