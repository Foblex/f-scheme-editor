import { IConnectionStyle } from './i-connection-style';
import { ELineStyle } from '../e-line-style';
import { defaultColorStyle } from '../color-style';

export function defaultConnectionStyle(): IConnectionStyle {
  return {
    color: defaultColorStyle(),
    weight: 2,
    style: ELineStyle.SOLID,
  }
}
