import { EFConnectionType } from '@foblex/flow';
import { IDropDownOption } from '../../configuration-drop-down';

export function getConnectionTypeOptions(): IDropDownOption<any>[] {
  return [
    { id: EFConnectionType.STRAIGHT, name: 'Straight', icon: 'connection-straight'},
    { id: EFConnectionType.SEGMENT, name: 'Segment', icon: 'connection-step'},
    { id: EFConnectionType.BEZIER, name: 'Bezier', icon: 'connection-bezier'},
  ];
}
