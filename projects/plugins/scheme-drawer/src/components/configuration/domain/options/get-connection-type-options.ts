import { EFConnectionType } from '@foblex/flow';
import { IDropDownOption } from '../../configuration-drop-down';

export function getConnectionTypeOptions(): IDropDownOption<any>[] {
  return [
    { id: EFConnectionType.STRAIGHT, name: 'Straight' },
    { id: EFConnectionType.SEGMENT, name: 'Segment' },
    { id: EFConnectionType.BEZIER, name: 'Bezier' },
  ];
}
