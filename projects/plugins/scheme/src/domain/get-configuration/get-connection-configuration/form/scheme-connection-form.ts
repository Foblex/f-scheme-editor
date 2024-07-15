import { FormControl, FormGroup } from '@angular/forms';
import { ISchemeConnection } from '../../../i-scheme-connection';
import { EFConnectionType } from '@foblex/flow';
import { getTextFormGroup } from '../../text';

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
      markerStart: new FormControl(item.markerStart),
      markerEnd: new FormControl(item.markerEnd),
      style: new FormGroup({
        color: new FormGroup({
          color1: new FormControl(item.style.color.color1),
          color2: new FormControl(item.style.color.color2),
          isGradient: new FormControl(item.style.color.isGradient),
        }),
        weight: new FormControl(item.style.weight),
        style: new FormControl(item.style.style),
      }),
      text: getTextFormGroup(item.text),
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

