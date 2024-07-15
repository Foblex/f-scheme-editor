import { FormControl, FormGroup } from '@angular/forms';
import { ISchemeNode } from '../../../i-scheme-node';
import { getRectFormGroup } from '../../rect';

export class SchemeNodeForm {

  private form: FormGroup = this.buildForm(this.item);

  constructor(
    private item: ISchemeNode
  ) {
  }

  private buildForm(item: ISchemeNode): FormGroup {
    return new FormGroup({
      rect: getRectFormGroup(item.rectStyle),
      image: new FormControl(item.image),
    })
  }

  public getForm(): FormGroup {
    return this.form;
  }
}

