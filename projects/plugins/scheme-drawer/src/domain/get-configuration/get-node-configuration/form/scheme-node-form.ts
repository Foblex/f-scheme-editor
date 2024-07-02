import { FormControl, FormGroup } from '@angular/forms';
import { ISchemeNode } from '../../../i-scheme-node';
import { ELineStyle, IMixedValue } from '../../../../components/configuration';
import { IPoint, ISize } from '@foblex/core';

export interface ISchemeNodeForm extends IPoint, ISize {
  fill: string;
  border: {
    isBorder: boolean;
    color: string;
    width: number;
    style: ELineStyle;
  };
  borderRadius: IMixedValue;
  padding: IMixedValue;
  isClipContent: boolean;
}

export class SchemeNodeForm {

  private form: FormGroup = this.buildForm(this.item);

  constructor(
    private item: ISchemeNode
  ) {
  }

  private buildForm(item: ISchemeNode): FormGroup {
    return new FormGroup({
      fill: new FormControl(item.rectStyle.background),
      border: new FormGroup({
        isBorder: new FormControl(item.rectStyle.border.isBorder),
        color: new FormControl(item.rectStyle.border.color),
        width: new FormControl(item.rectStyle.border.width),
        style: new FormControl(item.rectStyle.border.style),
      }),
      borderRadius: new FormControl({
        value1: item.rectStyle.borderRadius.topLeft,
        value2: item.rectStyle.borderRadius.topRight,
        value3: item.rectStyle.borderRadius.bottomLeft,
        value4: item.rectStyle.borderRadius.bottomRight,
      }),
      padding: new FormControl({
        value1: item.rectStyle.padding.top,
        value2: item.rectStyle.padding.right,
        value3: item.rectStyle.padding.bottom,
        value4: item.rectStyle.padding.left,
      }),
      x: new FormControl(item.rectStyle.x),
      y: new FormControl(item.rectStyle.y),
      width: new FormControl(item.rectStyle.width),
      height: new FormControl(item.rectStyle.height),
      isClipContent: new FormControl(item.rectStyle.isClipContent),
    })
  }

  public getForm(): FormGroup {
    return this.form;
  }
}

