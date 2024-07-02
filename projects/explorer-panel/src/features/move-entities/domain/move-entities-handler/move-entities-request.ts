import { ITreeItem } from '../../../../domain';

export class MoveEntitiesRequest {

  constructor(
      public entities: ITreeItem[],
      public toDirectory: string
  ) {
  }
}
