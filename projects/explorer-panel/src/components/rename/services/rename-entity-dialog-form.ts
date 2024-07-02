import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import {
  GetNamesByTypeInDirectoryHandler,
  GetNamesByTypeInDirectoryRequest,
  ITreeItem
} from '../../../domain';
import { CoreValidators, ROOT_DIRECTORY_KEY, StorageService } from '@core';

@Injectable()
export class RenameEntityDialogForm {

  constructor(
      private storage: StorageService
  ) {
  }

  public getForm(entity: ITreeItem): FormGroup {
    const existingNames = new GetNamesByTypeInDirectoryHandler(this.storage).handle(
        new GetNamesByTypeInDirectoryRequest(entity.parentKey || ROOT_DIRECTORY_KEY, entity.type)
    ).filter((x) => x !== entity.name.toLowerCase());

    return new FormGroup<any>({
      'name': new FormControl(entity.name, [
        Validators.required,
        CoreValidators.unique(existingNames),
        CoreValidators.validFileName(),
        Validators.maxLength(256)
      ])
    });
  }
}
