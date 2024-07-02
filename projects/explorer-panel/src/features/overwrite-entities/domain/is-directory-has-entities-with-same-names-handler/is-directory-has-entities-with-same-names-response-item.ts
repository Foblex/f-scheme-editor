import { IEntity } from '@core';

export class IsDirectoryHasEntitiesWithSameNamesResponseItem {

  constructor(
      public entity: IEntity,
      public entityWithSameName: IEntity | undefined,
      public toDirectory: string
  ) {
  }
}
