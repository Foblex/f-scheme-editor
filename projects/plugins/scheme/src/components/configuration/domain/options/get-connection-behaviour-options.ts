import { EFConnectionBehavior } from '@foblex/flow';
import { IDropDownOption } from '../../configuration-drop-down';

export function getConnectionBehaviourOptions(): IDropDownOption<any>[] {
  return [
    { id: EFConnectionBehavior.FLOATING, name: 'Floating', icon: 'behaviour-floating'},
    { id: EFConnectionBehavior.FIXED, name: 'Fixed', icon: 'behaviour-fixed'},
    { id: EFConnectionBehavior.FIXED_CENTER, name: 'Fixed Center', icon: 'behaviour-fixed-center'},
  ];
}
