import { ISchemeEditorVisualState } from '../i-scheme-editor-visual-state';
import {IPoint} from "@foblex/2d";

export class TransformCanvasRequest implements ISchemeEditorVisualState {

  constructor(
      public key: string,
      public position: IPoint,
      public scale: number,
  ) {
  }
}
