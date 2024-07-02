import { IEntity } from '@core';

export class GetAllChildrenForEntityToPasteRequest {

  constructor(
      public entity: IEntity,
      public allEntities: IEntity[]
  ) {
  }
}
