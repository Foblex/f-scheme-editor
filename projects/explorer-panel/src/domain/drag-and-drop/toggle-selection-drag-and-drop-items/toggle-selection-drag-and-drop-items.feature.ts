import { Injectable } from '@angular/core';
import { IToggleSelectionDragAndDropItemsRequest } from './i-toggle-selection-drag-and-drop-items-request';
import { SelectionService } from '../../../services';
import {MouseEventExtensions} from "@foblex/utils";
import {IHandler} from "@foblex/mediator";

const SELECTED_ITEM_CLASS: string = 'explorer-panel-tree-item-selected';

@Injectable()
export class ToggleSelectionDragAndDropItemsFeature implements IHandler<IToggleSelectionDragAndDropItemsRequest, void> {

  constructor(
    private selectionService: SelectionService
  ) {
  }

  public handle(request: IToggleSelectionDragAndDropItemsRequest): void {

    const key = request.item.viewModel!.key;

    const isItemSelected: boolean = !!this.selectionService.selected.get(key);
    if (!isItemSelected) {
      if (MouseEventExtensions.isShiftPressed(request.event.originalEvent as MouseEvent)) {
        const selected: string[] = Array.from(this.selectionService.selected.keys());
        if (selected.length) {
          this.selectionService.selectFromTo(selected[ 0 ], key);
        } else {
          this.selectionService.selectSingle(key);
        }
      } else if (!MouseEventExtensions.isCtrlPressed(request.event.originalEvent as MouseEvent)) {
        this.selectionService.selectSingle(key);
      }
    } else {
      if (MouseEventExtensions.isShiftPressed(request.event.originalEvent as MouseEvent)) {
        const selected: string[] = Array.from(this.selectionService.selected.keys());
        if (selected.length) {
          this.selectionService.selectFromTo(selected[ 0 ], key);
        } else {
          this.selectionService.selectSingle(key);
        }
      }
    }

    request.items.forEach((item) => {
      if (this.selectionService.selected.get(item.hostElement.id)) {
        if (!item.hostElement.classList.contains(SELECTED_ITEM_CLASS)) {
          item.hostElement.classList.add(SELECTED_ITEM_CLASS);
        }
      } else {
        item.hostElement.classList.remove(SELECTED_ITEM_CLASS);
      }
    });
  }
}
