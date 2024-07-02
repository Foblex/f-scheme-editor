import { IPoint } from './i-point';

export interface IPointerEvent {

  event: MouseEvent | TouchEvent;

  point: IPoint;
}
