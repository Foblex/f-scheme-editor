import { ELineStyle } from '../e-line-style';
import { IColorStyle } from '../color-style';

export interface IConnectionStyle {

  color: IColorStyle;

  weight: number;

  style: ELineStyle;

  radius: number;
}

