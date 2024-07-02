import { ITreeItem } from './i-tree-item';

export interface IExplorerPanelState {

  tree: ITreeItem;

  flatten: Map<string, ITreeItem>;
}
