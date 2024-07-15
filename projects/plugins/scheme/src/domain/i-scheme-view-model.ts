import { ISchemeNodeViewModel } from './i-scheme-node-view-model';
import { ISchemeConnectionViewModel } from './i-scheme-connection-view-model';
import { ISchemeEditorVisualState } from './i-scheme-editor-visual-state';
import { ESchemeBackground } from './e-scheme-background';

export interface ISchemeViewModel {

  key: string;

  background: ESchemeBackground;

  fill: string;

  stroke: string;

  nodes: ISchemeNodeViewModel[];

  connections: ISchemeConnectionViewModel[];

  visualState: ISchemeEditorVisualState;
}
