import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: 'canvas[fColorPickerHue]',
  standalone: true
})
export class FColorPickerRectDirective implements OnInit {

  constructor(
    private elementReference: ElementRef<HTMLCanvasElement>,
  ) {
  }

  public ngOnInit(): void {
    this.draw(this.elementReference.nativeElement);
  }

  private draw(canvas: HTMLCanvasElement): void {
    const context = this.getContext(canvas);

    this.clearCanvas(context, canvas.width, canvas.height);

    context.fillStyle = this.createGradient(context, canvas.width);
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  private getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas context is not supported');
    }
    return ctx;
  }

  private clearCanvas(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    ctx.clearRect(0, 0, width, height);
  }

  private createGradient(context: CanvasRenderingContext2D, width: number): CanvasGradient {
    const result = context.createLinearGradient(0, 0, width, 0);
    for (let i = 0; i <= 360; i++) {
      result.addColorStop(i / 360, `hsl(${ i }, 100%, 50%)`);
    }
    return result;
  }
}
