import {ISize} from "@foblex/2d";

export function drawAlphaLine(canvas: HTMLCanvasElement, size: ISize, gradientStart: string, gradientEnd: string): void {
  const context = getContext(canvas);

  clearCanvas(context, size.width, size.height);
  drawCheckerboard(context, size.width, size.height, 3);
  drawGradient(context, size.width, size.height, gradientStart, gradientEnd);
}

function getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Canvas context is not supported');
  }
  return context;
}

function clearCanvas(context: CanvasRenderingContext2D, width: number, height: number): void {
  context.clearRect(0, 0, width, height);
}

function drawCheckerboard(context: CanvasRenderingContext2D, width: number, height: number, checkerSize: number): void {
  for (let y = 0; y < height; y += checkerSize) {
    for (let x = 0; x < width; x += checkerSize) {
      if ((x / checkerSize + y / checkerSize) % 2 === 0) {
        context.fillStyle = '#E1E1E1';
      } else {
        context.fillStyle = '#fff';
      }
      context.fillRect(x, y, checkerSize, checkerSize);
    }
  }
}

function drawGradient(context: CanvasRenderingContext2D, width: number, height: number, gradientStart: string, gradientEnd: string): void {
  context.fillStyle = createGradient(context, width, gradientStart, gradientEnd);
  context.fillRect(0, 0, width, height);
}

function createGradient(context: CanvasRenderingContext2D, width: number, gradientStart: string, gradientEnd: string): CanvasGradient {
  const result = context.createLinearGradient(0, 0, width, 0);
  result.addColorStop(0, gradientStart);
  result.addColorStop(1, gradientEnd);
  return result;
}
