import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ISchemeConnectionViewModel } from '../../domain';
import { ELineStyle } from '../configuration';

@Injectable()
export class SchemeEditorClassListService {

  private renderer: Renderer2;
  private readonly styleElement: HTMLStyleElement;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.styleElement = this.renderer.createElement('style') as HTMLStyleElement;
    this.renderer.appendChild(document.body, this.styleElement);
  }

  public updateClasses(connections: ISchemeConnectionViewModel[]): void {
    connections.forEach((x) => this.connectionClass(x));
  }

  private connectionClass(connection: ISchemeConnectionViewModel): void {
    const element = document.querySelector(`[data-f-path-id="${connection.key}"]`) as SVGPathElement;
    element.style.strokeWidth = `${connection.style.weight}px`;
    // element.style.stroke = connection.color1;
    // element.style.fill = connection.isGradient ? `url(#${connection.key})` : connection.color1;
    // element.style.strokeLinecap = 'round';
    // element.style.strokeLinejoin = 'round';
    element.style.strokeDasharray = LINE_TYPE_MAP[connection.style.style].dasharray;
    element.style.strokeMiterlimit = LINE_TYPE_MAP[connection.style.style].miterlimit;
  }
}

const LINE_TYPE_MAP = {
  [ELineStyle.SOLID]: {
    miterlimit: '0',
    dasharray: 'none',
  },
  [ELineStyle.DASHED]: {
    miterlimit: '10',
    dasharray: '9.45, 9.45',
  },
  [ELineStyle.DOTTED]: {
    miterlimit: '10',
    dasharray: '2.5, 2.5',
  }
};
