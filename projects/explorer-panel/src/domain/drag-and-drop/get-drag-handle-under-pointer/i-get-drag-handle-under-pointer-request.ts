import { DragHandleDirective } from '../../../directives';
import {IPoint} from "@foblex/2d";

export interface IGetDragHandleUnderPointerRequest {

  items: DragHandleDirective[];

  position: IPoint;
}
