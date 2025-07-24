import { DragHandleDirective } from '../../../directives';
import {IPointerEvent} from "@foblex/flow";

export interface IToggleSelectionDragAndDropItemsRequest {

  items: DragHandleDirective[];

  item: DragHandleDirective;

  event: IPointerEvent;
}
