import { CreateEntityRequestBase } from '@core';

export class CreateEntityDialogResponse extends CreateEntityRequestBase {

  constructor(
      inDirectory: string,
      name: string
  ) {
    super(inDirectory, name);
  }
}

