import { FormControl, FormGroup } from '@angular/forms';
import { IRectStyle } from '../../../components/configuration';

export function getRectFormGroup(value: IRectStyle) {
  console.log('value', value);
  return new FormGroup({
    x: new FormControl(value.x),
    y: new FormControl(value.y),
    width: new FormControl(value.width),
    height: new FormControl(value.height),
    border: new FormGroup({
      isBorder: new FormControl(value.border.isBorder),
      color: new FormControl(value.border.color),
      width: new FormControl(value.border.width),
      style: new FormControl(value.border.style),
    }),
    borderRadius: new FormControl({
      value1: value.borderRadius.topLeft,
      value2: value.borderRadius.topRight,
      value3: value.borderRadius.bottomLeft,
      value4: value.borderRadius.bottomRight,
    }),
    padding: new FormControl({
      value1: value.padding.top,
      value2: value.padding.right,
      value3: value.padding.bottom,
      value4: value.padding.left,
    }),
    fill: new FormControl(value.background),
    isClipContent: new FormControl(value.isClipContent),
  });
}
