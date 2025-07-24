import { Injectable } from '@angular/core';
import { ICreateDragAndDropPlaceholderRequest } from './i-create-drag-and-drop-placeholder-request';
import { SelectionService } from '../../../services';
import {createHtmlElement, LodashExtensions} from '@core';
import { LOCALIZATION } from '@resources';
import {IHandler} from "@foblex/mediator";

const PLACEHOLDER_CLASS: string = 'explorer-panel-drag-placeholder';

const SELECTED_ITEM_CLASS: string = 'explorer-panel-item-selected';

@Injectable()
export class CreateDragAndDropPlaceholderFeature
    implements IHandler<ICreateDragAndDropPlaceholderRequest, HTMLElement> {

  constructor(
      private selectionService: SelectionService,
  ) {
  }

  public handle(request: ICreateDragAndDropPlaceholderRequest): HTMLElement {

    const result: HTMLElement = CreateDragAndDropPlaceholderFeature.createPlaceholderContainer();

    let items = request.items.filter((x) => this.selectionService.selected.get(x.hostElement.id));
    const itemsMoreThenThreshold: number = (items.length - 6) <= 0 ? 0 : (items.length - 6);
    if (items.length > 6) {
      items = items.filter((x, index) => {
        return index < 6;
      });
    }

    items.forEach((item) => {
      const element = item.cloneDomElement();
      element.classList.remove(SELECTED_ITEM_CLASS);
      result.appendChild(element);
    });

    if (itemsMoreThenThreshold > 0) {
      result.appendChild(this.createMoreItemsContainer(itemsMoreThenThreshold));
    }
    return result;
  }

  private static createPlaceholderContainer(): HTMLElement {
    const result: HTMLElement = createHtmlElement('div');
    result.classList.add(PLACEHOLDER_CLASS);
    return result;
  }

  private createMoreItemsContainer(itemsMoreThenThreshold: number): HTMLElement {
    const result: HTMLElement = createHtmlElement('button');
    result.classList.add('explorer-panel-item', SELECTED_ITEM_CLASS);
    const span: HTMLSpanElement =  createHtmlElement('span');
    span.classList.add('item-text');
    span.innerHTML = LodashExtensions.textInterpolation(LOCALIZATION.explorer_panel.and_more_files, itemsMoreThenThreshold);
    result.appendChild(span);
    return result;
  }
}
