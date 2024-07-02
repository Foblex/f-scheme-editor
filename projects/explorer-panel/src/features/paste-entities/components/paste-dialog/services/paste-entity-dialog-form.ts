import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { IEntity } from '@core';

@Injectable()
export class PasteEntityDialogForm {

  public getForm(entity: IEntity): FormGroup {

    return new FormGroup<any>({
      'name': new FormControl(entity.name, [
        Validators.required,
        Validators.maxLength(256)
      ])
    });
  }
}
