import { FormControl, FormGroup } from '@angular/forms';
import { ISchemeConnection } from '../../../i-scheme-connection';
import { EFConnectionType } from '@foblex/flow';

export class SchemeConnectionForm {

  private form: FormGroup = this.buildForm(this.connection);

  constructor(
    private connection: ISchemeConnection
  ) {
  }

  private buildForm(item: ISchemeConnection): FormGroup {
    return new FormGroup({
      type: new FormControl(item.type),
      behaviour: new FormControl(item.behaviour),
      connectionSideStart: new FormControl(item.connectionSideStart),
      connectionSideEnd: new FormControl(item.connectionSideEnd),
      radius: new FormControl({ value: item.radius, disabled: this.isRadiusDisabled(item.type) }),
      offset: new FormControl({ value: item.offset, disabled: this.isOffsetDisabled(item.type) }),
    })
  }

  public getForm(): FormGroup {
    return this.form;
  }

  public isRadiusDisabled(type: EFConnectionType): boolean {
    return type === EFConnectionType.STRAIGHT || type === EFConnectionType.BEZIER;
  }

  public isOffsetDisabled(type: EFConnectionType): boolean {
    return type === EFConnectionType.STRAIGHT;
  }
}

