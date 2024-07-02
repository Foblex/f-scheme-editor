import { IPalette } from '../i-palette';
import { IsValidEntityRequestBase } from '@core';

export class IsValidPaletteRequest implements IsValidEntityRequestBase<IPalette> {

  constructor(
      public entity: IPalette
  ) {
  }
}
