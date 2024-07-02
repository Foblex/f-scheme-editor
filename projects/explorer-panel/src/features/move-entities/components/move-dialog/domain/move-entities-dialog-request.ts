import { ITreeItem } from '../../../../../domain';

export class MoveEntitiesDialogRequest {

  constructor(
      public entities: ITreeItem[]
  ) {
  }
}
