import {IPoint} from "@foblex/2d";

export interface IPointerEvent {

  event: MouseEvent | TouchEvent;

  point: IPoint;
}
