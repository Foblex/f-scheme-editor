import { IPoint } from '@foblex/core';

export interface IPointerEvent {

  event: MouseEvent | TouchEvent;

  point: IPoint;
}
