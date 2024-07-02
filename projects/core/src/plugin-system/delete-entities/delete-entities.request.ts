import { IEntitySummary } from '../../core-domain';

export class DeleteEntitiesRequest {

  constructor(
      public items: IEntitySummary[]
  ) {
  }
}
