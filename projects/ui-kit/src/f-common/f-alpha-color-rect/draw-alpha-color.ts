export function drawAlphaColor(canvas: HTMLCanvasElement, w: number, h: number): void {
  const context = getContext(canvas);
  clearCanvas(context, canvas.width, canvas.height);
  drawCheckerboard(context, canvas.width, canvas.height, w, h);
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

function drawCheckerboard(context: CanvasRenderingContext2D, width: number, height: number, w: number, h: number): void {
  const checkerSizeHeight = height / h;
  const checkerSizeWidth = width / w;

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
