import { IEntity } from '@core';

export class PasteEntitiesDialogRequest {

  constructor(
      public entities: IEntity[]
  ) {
  }
}
