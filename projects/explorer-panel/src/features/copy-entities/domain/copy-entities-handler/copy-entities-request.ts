import { ITreeItem } from '../../../../domain';

export class CopyEntitiesRequest {

  constructor(
      public items: ITreeItem[]
  ) {
  }
}
