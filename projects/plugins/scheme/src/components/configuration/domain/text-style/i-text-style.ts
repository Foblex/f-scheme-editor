import { IRectStyle } from '../rect-style';
import { IColorStyle } from '../color-style';

export interface ITextStyle {

  text: string;

  size: number;

  color: string;

  rect: IRectStyle;
}
