import { IPoint } from '@foblex/core';
import { ISchemeEditorVisualState } from '../i-scheme-editor-visual-state';

export class TransformCanvasRequest implements ISchemeEditorVisualState {

  constructor(
      public key: string,
      public position: IPoint,
      public scale: number,
  ) {
  }
}
