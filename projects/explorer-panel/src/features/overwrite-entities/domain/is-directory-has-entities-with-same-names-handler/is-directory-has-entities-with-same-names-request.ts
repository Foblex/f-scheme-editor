import { IEntity } from '@core';

export class IsDirectoryHasEntitiesWithSameNamesRequest {

  constructor(
      public entities: IEntity[],
      public toDirectory: string
  ) {
  }
}
