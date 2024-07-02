import { ELineStyle, IDropDownOption } from '../../../configuration';

export function getLineTypeOptions(): IDropDownOption<any>[] {
  return [
    { id: ELineStyle.SOLID, name: 'Solid', icon: 'line-style-solid'},
    { id: ELineStyle.DASHED, name: 'Dashed', icon: 'line-style-dashed'},
    { id: ELineStyle.DOTTED, name: 'Dotted', icon: 'line-style-dotted'},
  ];
}
