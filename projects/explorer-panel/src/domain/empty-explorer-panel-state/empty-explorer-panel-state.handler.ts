import { ITreeItem } from '../i-tree-item';
import { getRootDirectory } from '../get-root-directory';
import { IExplorerPanelState } from '../i-explorer-panel-state';
import {IHandler} from "@foblex/mediator";

export class EmptyExplorerPanelStateHandler
    implements IHandler<void, IExplorerPanelState> {

  public handle(): IExplorerPanelState {
    return {
      tree: getRootDirectory('Loading...'),
      flatten: new Map<string, ITreeItem>()
    };
  }
}
