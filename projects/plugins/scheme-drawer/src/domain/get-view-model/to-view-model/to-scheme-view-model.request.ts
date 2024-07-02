import { IScheme } from '../../i-scheme';
import { ISchemeEditorVisualState } from '../../i-scheme-editor-visual-state';

export class ToSchemeViewModelRequest {

  constructor(
      public entity: IScheme,
      public visualState?: ISchemeEditorVisualState
  ) {
  }
}
