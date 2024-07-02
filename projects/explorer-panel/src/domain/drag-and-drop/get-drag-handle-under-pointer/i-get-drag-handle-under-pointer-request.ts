import { DragHandleDirective } from '../../../directives';
import { IPoint } from '@foblex/core';

export interface IGetDragHandleUnderPointerRequest {

  items: DragHandleDirective[];

  position: IPoint;
}
