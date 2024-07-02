import { IBorderStyle } from '../border-style';
import { IPaddingStyle } from '../padding';
import { IBorderRadiusStyle } from '../border-radius';
import { IPoint, ISize } from '@foblex/core';

export interface IRectStyle extends IPoint, ISize {

  background: string;

  border: IBorderStyle;

  borderRadius: IBorderRadiusStyle;

  padding: IPaddingStyle;

  isClipContent: boolean;
}
