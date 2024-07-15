import { FormControl, FormGroup } from '@angular/forms';
import { ITextStyle } from '../../../components/configuration';
import { getRectFormGroup } from '../rect';

export function getTextFormGroup(value: ITextStyle) {
  return new FormGroup({
    text: new FormControl(value.text),
    size: new FormControl(value.size),
    color: new FormControl(value.color),
    rect: getRectFormGroup(value.rect),
  });
}
