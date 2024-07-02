import { ITreeItem } from '../i-tree-item';

export class FilterChildrenEntitiesIfHasParentInListRequest {

  constructor(
      public flatten: Map<string, ITreeItem>,
      public allSelected: string[]
  ) {
  }
}
