import { IRectStyle } from './i-rect-style';
import { defaultBorderStyle } from '../border-style';
import { defaultPaddingStyle } from '../padding';
import { defaultBorderRadiusStyle } from '../border-radius';
import { IPoint, ISize } from '@foblex/core';

export function defaultRectStyle(position: IPoint, size: ISize): IRectStyle {
  return {
    ...position,
    ...size,
    background: 'transparent',
    border: defaultBorderStyle(),
    borderRadius: defaultBorderRadiusStyle(2),
    padding: defaultPaddingStyle(4),
    isClipContent: false,
  }
}
