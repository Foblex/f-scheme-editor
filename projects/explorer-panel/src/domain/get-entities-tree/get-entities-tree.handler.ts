import { IHandler } from '@foblex/core';
import { ITreeItem } from '../i-tree-item';
import { getRootDirectory } from '../get-root-directory';
import { IExplorerPanelState } from '../i-explorer-panel-state';
import { EEntityType, IEntity, IEntityPlugin, StorageService } from '@core';

export class GetEntitiesTreeHandler
  implements IHandler<void, IExplorerPanelState> {

  constructor(
    private storage: StorageService,
    private plugins: IEntityPlugin<IEntity>[],
  ) {
  }

  public handle(): IExplorerPanelState {

    const flatten = new Map<string, ITreeItem>();

    const allDirectories = this.storage.getEntitiesByType(EEntityType.DIRECTORY).map((x) => {
      return this.mapEntityToExplorerPanelItem(x, []);
    }).sort(this.sortByName);

    const allEntities: ITreeItem[] = [];

    const types = this.storage.getExistingEntityTypes().filter((x) => {
      return x !== EEntityType.DIRECTORY;
    });
    types.forEach((type) => {

      const items = this.storage.getEntitiesByType(type).map((x) => {
        return this.mapEntityToExplorerPanelItem(x, []);
      });

      allEntities.push(...items);
    });

    allEntities.sort(this.sortByName);

    const items = [ ...allDirectories, ...allEntities ];
    const rootDirectory = getRootDirectory(this.storage.project.name);
    flatten.set(rootDirectory.key, rootDirectory);
    rootDirectory.children = this.findDirectChildren(items, rootDirectory.key, flatten);

    return {
      tree: rootDirectory,
      flatten: flatten
    };
  }

  private findDirectChildren(allItems: ITreeItem[], key: string, flatten: Map<string, ITreeItem>): ITreeItem[] {
    return allItems.filter((x) => x.parentKey === key).map((item) => {
      flatten.set(item.key, item);
      item.children = this.findDirectChildren(allItems, item.key, flatten);
      return item;
    });
  }

  private mapEntityToExplorerPanelItem(entity: IEntity, children: ITreeItem[]): ITreeItem {
    return {
      key: entity.key,
      parentKey: entity.parentKey,
      name: entity.name,
      type: entity.type,
      children: children.length ? children : undefined,
    }
  }

  private sortByName = (a: ITreeItem, b: ITreeItem) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  }
}
