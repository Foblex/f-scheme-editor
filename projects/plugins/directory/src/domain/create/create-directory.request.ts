import { CreateEntityRequestBase } from '@core';

export class CreateDirectoryRequest implements CreateEntityRequestBase {

  constructor(
      public inDirectory: string,
      public name: string
  ) {

  }
}
