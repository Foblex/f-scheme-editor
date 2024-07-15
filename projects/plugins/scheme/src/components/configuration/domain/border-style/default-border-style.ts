import { ELineStyle } from '../e-line-style';
import { IBorderStyle } from './i-border-style';

export function defaultBorderStyle(): IBorderStyle {
  return {
    isBorder: false,
    color: '#000000',
    style: ELineStyle.SOLID,
    width: 1,
  }
}
