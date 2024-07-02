import { Injectable } from '@angular/core';
import { IGetDragHandleUnderPointerRequest } from './i-get-drag-handle-under-pointer-request';
import { DragHandleDirective } from '../../../directives';
import { IHandler } from '@foblex/core';
import { SelectionService } from '../../../services';

@Injectable()
export class GetDragHandleUnderPointerFeature implements IHandler<IGetDragHandleUnderPointerRequest, DragHandleDirective | undefined> {

  constructor(
      private selectionService: SelectionService
  ) {
  }

  public handle(request: IGetDragHandleUnderPointerRequest): DragHandleDirective | undefined {

    let result: DragHandleDirective | undefined;

    let element: Element | null = document.elementFromPoint(request.position.x, request.position.y);

    const item = (request.items || []).find((x) => {
      return x.hostElement.contains(element) || x.hostElement === element;
    });

    if (item) {
      if (!this.selectionService.selected.has(item.viewModel!.key) && !!item.viewModel?.children) {
        result = item;
      }
    }

    return result;
  }
}
