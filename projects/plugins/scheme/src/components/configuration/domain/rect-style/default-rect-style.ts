import { IRectStyle } from './i-rect-style';
import { defaultBorderStyle } from '../border-style';
import { defaultPaddingStyle } from '../padding';
import { defaultBorderRadiusStyle } from '../border-radius';
import {IPoint, ISize} from "@foblex/2d";

export function defaultRectStyle(position: IPoint, size: ISize, background: string = 'transparent'): IRectStyle {
  return {
    ...position,
    ...size,
    background,
    border: defaultBorderStyle(),
    borderRadius: defaultBorderRadiusStyle(2),
    padding: defaultPaddingStyle(4),
    isClipContent: false,
  }
}
