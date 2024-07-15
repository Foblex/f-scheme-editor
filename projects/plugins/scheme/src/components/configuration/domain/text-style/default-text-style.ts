import { ITextStyle } from './i-text-style';
import { defaultRectStyle } from '../rect-style';
import { defaultColorStyle } from '../color-style';

export function defaultTextStyle(): ITextStyle {
  return {
    text: '',
    size: 12,
    color: '#000000',
    rect: defaultRectStyle({ x: 0, y: 0 }, { width: 0, height: 0 })
  }
}
