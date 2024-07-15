import { IDropDownOption } from '../../configuration-drop-down';
import { EConnectionMarker } from '../e-connection-marker';

export function getMarkerOptions(): IDropDownOption<any>[] {
  return [
    { id: EConnectionMarker.NONE, name: 'None', icon: 'line'},
    { id: EConnectionMarker.ARROW, name: 'Arrow', icon: 'arrow' },
    { id: EConnectionMarker.BACK_ARROW, name: 'Back Arrow', icon: 'back-arrow' },
    { id: EConnectionMarker.CIRCLE, name: 'Circle', icon: 'circle' },
    { id: EConnectionMarker.RHOMBUS, name: 'Rhombus', icon: 'rombed' },
  ];
}
