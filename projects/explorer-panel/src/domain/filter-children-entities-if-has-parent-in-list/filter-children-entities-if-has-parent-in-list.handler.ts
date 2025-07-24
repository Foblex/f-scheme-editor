import {
  FilterChildrenEntitiesIfHasParentInListRequest
} from './filter-children-entities-if-has-parent-in-list.request';
import { ITreeItem } from '../i-tree-item';
import { ROOT_DIRECTORY_KEY } from '@core';
import {IHandler} from "@foblex/mediator";

export class FilterChildrenEntitiesIfHasParentInListHandler
  implements IHandler<FilterChildrenEntitiesIfHasParentInListRequest, ITreeItem[]> {

  public handle(payload: FilterChildrenEntitiesIfHasParentInListRequest): ITreeItem[] {

    let result: ITreeItem[] = [];
    const selected = payload.allSelected;

    selected.forEach((id) => {
      const selectedItem = payload.flatten.get(id)!;
      if (!this.isParentSelected(payload.flatten, selected, selectedItem)) {
        result.push(selectedItem);
      }
    });
    return result;
  }

  private isParentSelected(flatten: Map<string, ITreeItem>, selected: string[], item: ITreeItem): boolean {

    if (item.parentKey && selected.includes(item.parentKey)) {
      return true;
    } else {
      if (item.parentKey !== ROOT_DIRECTORY_KEY) {
        return this.isParentSelected(flatten, selected, flatten.get(item.parentKey)!);
      } else {
        return false;
      }
    }
  }
}
