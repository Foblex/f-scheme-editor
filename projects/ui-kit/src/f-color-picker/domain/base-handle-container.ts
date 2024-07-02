import { ElementRef, inject, Renderer2 } from '@angular/core';
import { IPoint, IRect, RectExtensions } from '@foblex/core';

export abstract class BaseHandleContainer {

  protected elementReference: ElementRef = inject(ElementRef);
  protected renderer: Renderer2 = inject(Renderer2);

  private moveListener: Function | null = null;

  private upListener: Function | null = null;

  public abstract isDisabled: boolean;

  protected hostRect: IRect = RectExtensions.fromElement(this.elementReference.nativeElement);

  private get ownerDocument(): Document {
    return this.elementReference.nativeElement.ownerDocument;
  }

  protected onDragStart(event: TouchEvent): void {
    if (this.isDisabled) {
      return;
    }
    this.updateColor(event, (event as TouchEvent).changedTouches[ 0 ]);
  }

  protected onMouseDown(event: MouseEvent) {
    if (this.isDisabled) {
      return;
    }
    this.hostRect = RectExtensions.fromElement(this.elementReference.nativeElement);
    this.moveListener = this.subscribeOnMoveListeners(this.moveListener);
    this.upListener = this.subscribeOnUpListeners(this.upListener);
    this.updateColor(event);
  }

  protected onDrag(event: TouchEvent) {
    this.updateColor(event, event.changedTouches[ 0 ]);
    event.preventDefault();
  }

  private subscribeOnMoveListeners(listener: Function | null): Function {
    return listener ? listener : this.renderer.listen(this.ownerDocument, 'mousemove', (event: MouseEvent) => {
      this.updateColor(event);
    });
  }

  private subscribeOnUpListeners(listener: Function | null): Function {
    return listener ? listener : this.renderer.listen(this.ownerDocument, 'mouseup', () => {
      this.onDragEnd();
    });
  }

  public onDragEnd() {
    this.unsubscribeFromMove();
    this.unsubscribeFromUp();
  }

  private unsubscribeFromMove() {
    if (this.moveListener) {
      this.moveListener();
      this.moveListener = null;
    }
  }

  private unsubscribeFromUp() {
    if (this.upListener) {
      this.upListener();
      this.upListener = null;
    }
  }

  protected getPageXY(event: MouseEvent | TouchEvent, position?: { pageX: number; pageY: number }): IPoint {
    return {
      x: position ? position.pageX : (event as MouseEvent).pageX,
      y: position ? position.pageY : (event as MouseEvent).pageY
    }
  }

  public abstract updateColor(event: MouseEvent | TouchEvent, position?: { pageX: number; pageY: number }): void;
}
