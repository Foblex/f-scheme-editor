import { EFConnectionBehavior } from '@foblex/flow';
import { IDropDownOption } from '../../configuration-drop-down';

export function getConnectionBehaviourOptions(): IDropDownOption<any>[] {
  return [
    { id: EFConnectionBehavior.FLOATING, name: 'Floating' },
    { id: EFConnectionBehavior.FIXED, name: 'Fixed' },
    { id: EFConnectionBehavior.FIXED_CENTER, name: 'Fixed Center' },
  ];
}
