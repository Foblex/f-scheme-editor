import { DragHandleDirective } from '../../../directives';
import { IPointerEvent } from '@foblex/core';

export interface IToggleSelectionDragAndDropItemsRequest {

  items: DragHandleDirective[];

  item: DragHandleDirective;

  event: IPointerEvent;
}
