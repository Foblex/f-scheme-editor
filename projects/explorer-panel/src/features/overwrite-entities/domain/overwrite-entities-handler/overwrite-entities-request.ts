import { IEntity } from '@core';

export class OverwriteEntitiesRequest {

  constructor(
      public entities: IEntity[],
      public toDirectory: string
  ) {
  }
}
