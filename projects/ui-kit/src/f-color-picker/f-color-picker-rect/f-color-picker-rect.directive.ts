import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: 'canvas[fColorPickerRect]',
  standalone: true
})
export class FColorPickerRectDirective implements OnInit {

  constructor(
    private elementReference: ElementRef<HTMLCanvasElement>,
  ) {
  }

  public ngOnInit(): void {
    this.drawColor(this.elementReference.nativeElement);
  }

  private drawColor(canvas: HTMLCanvasElement): void {
    const context = this.getContext(canvas);
    this.clearCanvas(context, canvas.width, canvas.height);
    this.drawCheckerboard(context, canvas.width, canvas.height);
  }

  private getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Canvas context is not supported');
    }
    return context;
  }

  private clearCanvas(context: CanvasRenderingContext2D, width: number, height: number): void {
    context.clearRect(0, 0, width, height);
  }

  private drawCheckerboard(context: CanvasRenderingContext2D, width: number, height: number): void {
    const checkerSizeHeight = height / 4;
    const checkerSizeWidth = width / 4;

    for (let y = 0; y < height; y += checkerSizeHeight) {
      for (let x = 0; x < width; x += checkerSizeWidth) {
        if ((x / checkerSizeWidth + y / checkerSizeHeight) % 2 === 0) {
          context.fillStyle = '#E1E1E1';
        } else {
          context.fillStyle = '#fff';
        }
        context.fillRect(x, y, checkerSizeWidth, checkerSizeHeight);
      }
    }
  }
}
