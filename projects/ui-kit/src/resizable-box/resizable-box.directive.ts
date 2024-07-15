import {
  AfterViewInit,
  ContentChild,
  Directive,
  ElementRef, EventEmitter, Input,
  NgZone,
  OnDestroy, Output,
  Renderer2,
} from '@angular/core';
import { ResizableBoxHandleDirective } from './resizable-box-handle.directive';
import { fromEvent, map, Subscription } from 'rxjs';
import { IS_TOUCH_DEVICE } from './domain/is-touch-device.const';
import { IPointerEvent } from './domain/i-pointer-event';
import { EResizableSize } from './domain/e-resizable-size';
import { IPoint } from '@foblex/core';

@Directive({
  selector: '[resizable-box]',
  standalone: true,
})
export class ResizableBoxDirective implements AfterViewInit, OnDestroy {

  private subscription$: Subscription = new Subscription();

  @ContentChild(ResizableBoxHandleDirective, { static: true })
  public handle!: ResizableBoxHandleDirective;

  @Output()
  public onResizeEnd: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  public minWidth: number | undefined;

  @Input()
  public initialWidth: number | undefined;

  @Input()
  public minHeight: number | undefined;

  public get hostElement(): HTMLElement {
    return this.elementReference.nativeElement;
  }

  private get handleHostElement(): HTMLElement {
    return this.handle!.hostElement;
  }

  private get resizeSide(): EResizableSize {
    return this.handle!.resizableSize;
  }

  private listeners: (() => void)[] = [];

  private startWidth: number = 0;
  private parentWidth: number = 0;
  private startHeight: number = 0;
  private startPoint: IPoint = { x: 0, y: 0 };

  constructor(
    private elementReference: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private zone: NgZone,
  ) {
  }

  public ngAfterViewInit(): void {
    if (!this.handleHostElement) {
      throw new Error('ResizableBoxHandleDirective not found');
    }
    if (this.initialWidth) {
      this.updateWidth(this.initialWidth);
    }

    this.zone.runOutsideAngular(() => {

      this.subscription$.add(
        this.subscribeOnMouseDown()
      );

      if (IS_TOUCH_DEVICE) {
        this.subscription$.add(
          this.subscribeOnTouchStart()
        );
      }
    });
  }

  private subscribeOnMouseDown(): Subscription {
    return fromEvent<MouseEvent>(this.handleHostElement, 'mousedown').pipe(
      map((x: MouseEvent) => {
        return { event: x, point: { x: x.clientX, y: x.clientY } };
      })
    ).subscribe((event: IPointerEvent) => {
      event.event.preventDefault();

      const mousemove = this.renderer.listen(
        document, 'mousemove', (touchEvent: MouseEvent) => {
          const pointerEvent = { event: touchEvent, point: { x: touchEvent.clientX, y: touchEvent.clientY } }
          this.onPointerMove(pointerEvent);
        }
      );
      this.listeners.push(mousemove);

      const mouseup = this.renderer.listen(
        document, 'mouseup', (touchEvent: MouseEvent) => {
          const pointerEvent = { event: touchEvent, point: { x: touchEvent.clientX, y: touchEvent.clientY } }
          this.onPointerUp(pointerEvent);
        }
      );
      this.listeners.push(mouseup);

      this.onPointerDown(event);
    });
  }

  private subscribeOnTouchStart(): Subscription {
    return fromEvent<TouchEvent>(this.handleHostElement, 'touchstart').pipe(
      map((x: TouchEvent) => {
        return { event: x, point: { x: x.touches[ 0 ].clientX, y: x.touches[ 0 ].clientY } };
      })
    ).subscribe((event: IPointerEvent) => {
      event.event.preventDefault();
      const touchMove = this.renderer.listen(
        document, 'touchmove', (touchEvent: TouchEvent) => {
          const pointerEvent = {
            event: touchEvent,
            point: { x: touchEvent.targetTouches[ 0 ].clientX, y: touchEvent.targetTouches[ 0 ].clientY }
          }
          this.onPointerMove(pointerEvent);
        }
      );

      this.listeners.push(touchMove);
      const touchEnd = this.renderer.listen(
        document, 'touchend', (touchEvent: TouchEvent) => {
          const pointerEvent = {
            event: touchEvent,
            point: { x: touchEvent.changedTouches[ 0 ].clientX, y: touchEvent.changedTouches[ 0 ].clientY }
          }
          this.onPointerUp(pointerEvent);
        }
      );
      this.listeners.push(touchEnd);
      const touchCancel = this.renderer.listen(
        document, 'touchcancel', (touchEvent: TouchEvent) => {
          const pointerEvent = {
            event: touchEvent,
            point: { x: touchEvent.changedTouches[ 0 ].clientX, y: touchEvent.changedTouches[ 0 ].clientY }
          }
          this.onPointerUp(pointerEvent);
        }
      );
      this.listeners.push(touchCancel);
      this.onPointerDown(event);
    });
  }

  public onPointerDown(event: IPointerEvent): void {
    this.parentWidth = this.hostElement.parentElement!.clientWidth;
    this.startWidth = this.hostElement.offsetWidth;
    this.startHeight = this.hostElement.clientHeight;
    this.startPoint = event.point;
  }

  private onPointerMove(event: IPointerEvent): void {
    let newWidth: number = this.startWidth;
    switch (this.resizeSide) {
      case 'right':
        newWidth = this.startWidth + (event.point.x - this.startPoint.x);
        break;
      case 'left':
        newWidth = this.startWidth + (this.startPoint.x - event.point.x);
        break;
    }

    if (newWidth > 0 && (!this.minWidth || newWidth > this.minWidth) && newWidth < this.parentWidth - 100) {
      this.updateWidth(newWidth);
    }
  }

  private updateWidth(value: number): void {
    this.renderer.setStyle(this.hostElement, 'width', value + 'px');
    this.renderer.setStyle(this.hostElement, 'min-width', value + 'px');
  }

  public onPointerUp(event: IPointerEvent): void {
    this.disposeListeners();
    this.onResizeEnd.next(this.hostElement.offsetWidth);
  }

  protected disposeListeners(): void {
    this.listeners.forEach((listener) => {
      listener();
    });
    this.listeners = [];
  }

  public ngOnDestroy(): void {
    this.disposeListeners();
    this.subscription$.unsubscribe();
  }
}
