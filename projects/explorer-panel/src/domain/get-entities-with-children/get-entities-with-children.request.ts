import { ITreeItem } from '../i-tree-item';

export class GetEntitiesWithChildrenRequest {

  constructor(
      public flatten: Map<string, ITreeItem>,
      public allSelected: string[]
  ) {
  }
}
