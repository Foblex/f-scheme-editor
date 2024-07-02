import { ITreeItem } from '../i-tree-item';

export class GetEntitiesBetweenInTreeRequest {

  constructor(
      public flatten: Map<string, ITreeItem>,
      public from: string,
      public to: string
  ) {
  }
}
