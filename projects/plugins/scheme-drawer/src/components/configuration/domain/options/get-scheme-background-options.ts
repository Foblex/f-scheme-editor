import { ESchemeBackground } from '../../../../domain';
import { IDropDownOption } from '../../configuration-drop-down';

export function getSchemeBackgroundOptions(): IDropDownOption<any>[] {
  return [
    { id: ESchemeBackground.NONE, name: 'None', },
    { id: ESchemeBackground.RECT, name: 'Rect', },
    { id: ESchemeBackground.CROSS, name: 'Cross', },
    { id: ESchemeBackground.DOT, name: 'Dot', }
  ];
}
