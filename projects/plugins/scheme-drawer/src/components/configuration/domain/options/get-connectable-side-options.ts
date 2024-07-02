import { EFConnectableSide } from '@foblex/flow';
import { IDropDownOption } from '../../configuration-drop-down';

export function getConnectableSideOptions(): IDropDownOption<any>[] {
  return [
    { id: EFConnectableSide.AUTO, name: 'Auto' },
    { id: EFConnectableSide.LEFT, name: 'Left' },
    { id: EFConnectableSide.TOP, name: 'Top' },
    { id: EFConnectableSide.RIGHT, name: 'Right' },
    { id: EFConnectableSide.BOTTOM, name: 'Bottom' },
  ];
}
