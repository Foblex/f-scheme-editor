import { Injectable } from '@angular/core';
import { TransformCanvasRequest } from './transform-canvas.request';
import { Observable } from 'rxjs';
import { IHandler } from '@foblex/core';
import { SessionStateService } from '@core';
import { ISchemeEditorVisualState } from '../i-scheme-editor-visual-state';

@Injectable()
export class TransformCanvasHandler
    implements IHandler<TransformCanvasRequest, Observable<void>> {

  constructor(
      private sessionState: SessionStateService
  ) {
  }

  public handle(payload: TransformCanvasRequest): Observable<void> {
    this.sessionState.setState<ISchemeEditorVisualState>(payload.key, {
      position: payload.position,
      scale: payload.scale,
    });

    return new Observable<void>((observer) => {
      observer.next();
    });
  }
}