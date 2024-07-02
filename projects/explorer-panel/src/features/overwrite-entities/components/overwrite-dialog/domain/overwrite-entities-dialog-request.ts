import { IEntity } from '@core';

export class OverwriteEntitiesDialogRequest {

  constructor(
      public entity: IEntity,
      public toDirectory: string
  ) {
  }
}
