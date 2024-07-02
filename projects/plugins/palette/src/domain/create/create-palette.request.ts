import { CreateEntityRequestBase } from '@core';

export class CreatePaletteRequest implements CreateEntityRequestBase {

  constructor(
      public inDirectory: string,
      public name: string
  ) {

  }
}
