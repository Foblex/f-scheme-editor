import {
  EventExtensions,
  IMouseEvent,
  IPoint,
  IPointerEvent,
  ITouchDownEvent,
  ITouchMoveEvent, ITouchUpEvent,
  PointExtensions
} from '@foblex/core';
import { ICanRunOutsideAngular } from './i-can-run-outside-angular';

export const MOUSE_EVENT_IGNORE_TIME = 800;

export abstract class IDragAndDropBase {

  private element!: Document;

  private mouseListeners: Function = EventExtensions.emptyListener();
  private touchListeners: Function = EventExtensions.emptyListener();

  private startListeners: Function = EventExtensions.emptyListener();

  public isSyntheticEvent(event: MouseEvent): boolean {
    return !!this.lastTouchEventTime &&
      (this.lastTouchEventTime + MOUSE_EVENT_IGNORE_TIME > Date.now());
  }

  private lastTouchEventTime: number = 0;

  public isDragStarted: boolean = false;
  private dragStartThreshold: number = 5;
  private dragStartDelay: number = 0;

  private dragStartTime: number = 0;
  private dragStartPosition: IPoint = PointExtensions.initialize();

  public abstract disabled: boolean;

  private moveHandler: Function = this.checkDragSequenceToStart;

  protected constructor(
      protected ngZone: ICanRunOutsideAngular
  ) {
  }

  private onMouseDown = (event: MouseEvent) => {
    const isSyntheticEvent = this.isSyntheticEvent(event);
    const isFakeEvent = isFakeMousedownFromScreenReader(event);
    const mouseEvent = new IMouseEvent(event);

    if (isSyntheticEvent || isFakeEvent || this.disabled) {
      return;
    }
    let result = this.onPointerDown(mouseEvent);
    if (result) {

      this.dragStartTime = Date.now();
      this.dragStartPosition = mouseEvent.getPosition();

      this.ngZone.runOutsideAngular(() => {
        this.element.addEventListener('mousemove', this.onMouseMove);
        this.element.addEventListener('mouseup', this.onMouseUp);
      });

      this.mouseListeners = () => {
        this.element.removeEventListener('mousemove', this.onMouseMove);
        this.element.removeEventListener('mouseup', this.onMouseUp);
      };
    }
  }

  private onTouchDown = (event: TouchEvent) => {
    const isFakeEvent = isFakeTouchstartFromScreenReader(event as TouchEvent)
    const touchEvent = new ITouchDownEvent(event);

    if (isFakeEvent || this.disabled) {
      return;
    }
    let result = this.onPointerDown(new ITouchDownEvent(event));
    if (result) {

      this.dragStartTime = Date.now();
      this.dragStartPosition = touchEvent.getPosition();

      this.ngZone.runOutsideAngular(() => {
        this.element.addEventListener('touchmove', this.onTouchMove);
        this.element.addEventListener('touchend', this.onTouchUp);
      });

      this.touchListeners = () => {
        this.element.removeEventListener('touchmove', this.onTouchMove);
        this.element.removeEventListener('touchend', this.onTouchUp);
      };
    }
  }

  private onMouseMove = (event: MouseEvent) => {
    this.moveHandler(new IMouseEvent(event));
  }

  private onTouchMove = (event: TouchEvent) => {
    this.moveHandler(new ITouchMoveEvent(event));
  }

  private checkDragSequenceToStart(event: IPointerEvent): void {
    const pointerPosition = event.getPosition();

    if (!this.isDragStarted) {
      const distanceX = Math.abs(pointerPosition.x - this.dragStartPosition.x);
      const distanceY = Math.abs(pointerPosition.y - this.dragStartPosition.y);
      const isOverThreshold = distanceX + distanceY >= this.dragStartThreshold;

      if (isOverThreshold) {
        const isDelayElapsed = Date.now() >= this.dragStartTime + this.dragStartDelay;

        if (!isDelayElapsed) {
          this.endDragSequence();
          return;
        }

        event.preventDefault();
        this.prepareDragSequence(event);
        this.isDragStarted = true;
        this.moveHandler = this.onPointerMove;
        if (isTouchEvent(event.originalEvent)) {
          this.lastTouchEventTime = Date.now();
        }
      }
    }
  }

  protected abstract prepareDragSequence(event: IPointerEvent): void;

  private onMouseUp = (event: MouseEvent) => {
    if (this.isDragStarted) {
      this.onPointerUp(new IMouseEvent(event));
    }
    this.endDragSequence();
  }

  private onTouchUp = (event: TouchEvent) => {
    if (this.isDragStarted) {
      this.onPointerUp(new ITouchUpEvent(event));
    }
    this.endDragSequence();
  }

  private endDragSequence(): void {
    this.finalizeDragSequence();
    this.isDragStarted = false;
    this.moveHandler = this.checkDragSequenceToStart;
    this.mouseListeners();
    this.mouseListeners = EventExtensions.emptyListener();
    this.touchListeners();
    this.touchListeners = EventExtensions.emptyListener();
  }

  public abstract finalizeDragSequence(): void;

  public abstract onPointerDown(event: IPointerEvent): boolean;

  public abstract onPointerMove(event: IPointerEvent): void;

  public abstract onPointerUp(event: IPointerEvent): void;

  public subscribe(elementToSubscribe: Document): void {
    if (this.element) {
      this.unsubscribe();
    }
    this.element = elementToSubscribe;

    this.ngZone.runOutsideAngular(() => {
      this.element.addEventListener('mousedown', this.onMouseDown, EventExtensions.activeListener());
      this.element.addEventListener('touchstart', this.onTouchDown, EventExtensions.passiveListener());
    });

    this.startListeners = () => {
      this.element.removeEventListener('mousedown', this.onMouseDown, EventExtensions.activeListener());
      this.element.removeEventListener('touchstart', this.onTouchDown, EventExtensions.passiveListener());
    };
  }

  public unsubscribe(): void {

    this.startListeners();
    this.startListeners = EventExtensions.emptyListener();
    this.touchListeners();
    this.touchListeners = EventExtensions.emptyListener();
    this.mouseListeners();
    this.mouseListeners = EventExtensions.emptyListener();
  }
}

function isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
  return event.type[ 0 ] === 't';
}

function isFakeMousedownFromScreenReader(event: MouseEvent): boolean {
  return event.buttons === 0 || (event.offsetX === 0 && event.offsetY === 0);
}

function isFakeTouchstartFromScreenReader(event: TouchEvent): boolean {
  const touch: Touch | undefined =
      (event.touches && event.touches[ 0 ]) || (event.changedTouches && event.changedTouches[ 0 ]);
  return (
      !!touch &&
      touch.identifier === -1 &&
      (touch.radiusX == null || touch.radiusX === 1) &&
      (touch.radiusY == null || touch.radiusY === 1)
  );
}
