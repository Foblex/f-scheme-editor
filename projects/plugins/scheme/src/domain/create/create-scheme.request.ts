import { CreateEntityRequestBase } from '@core';

export class CreateSchemeRequest implements CreateEntityRequestBase {

  constructor(
      public inDirectory: string,
      public name: string
  ) {

  }
}
