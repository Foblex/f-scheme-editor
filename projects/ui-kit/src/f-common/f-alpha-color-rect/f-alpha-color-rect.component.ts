import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { drawAlphaColor } from './draw-alpha-color';

@Component({
  selector: 'canvas[f-alpha-color-rect]',
  template: '',
  styleUrls: [ './f-alpha-color-rect.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FAlphaColorRectComponent implements OnInit {

  private get hostElement(): HTMLCanvasElement {
    return this.elementReference.nativeElement;
  }

  constructor(
    private elementReference: ElementRef<HTMLCanvasElement>,
  ) {
  }

  public ngOnInit(): void {
    this.draw();
  }

  public draw(): void {
    drawAlphaColor(this.hostElement, 23, 16);
  }
}
