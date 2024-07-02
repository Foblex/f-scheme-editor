import { EOverwriteEntities } from './e-overwrite-entities';
import { IEntity } from '@core';

export class OverwriteEntitiesDialogResponse {

  constructor(
      public entity: IEntity,
      public toDirectory: string,
      public overwriteResult: EOverwriteEntities
  ) {
  }
}
