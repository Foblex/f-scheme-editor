import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ESchemeToolbarAction } from './e-scheme-toolbar-action';
import { LOCALIZATION } from '../../localization';
import { ICONS } from '@resources';
import { IconButtonComponent } from '@ui-kit';
import { SchemeEditorComponent } from '../editor/scheme-editor.component';

@Component({
  selector: 'scheme-editor-toolbar',
  templateUrl: './scheme-editor-toolbar.component.html',
  styleUrls: [ './scheme-editor-toolbar.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IconButtonComponent
  ],
  host: {
    role: 'toolbar',
  }
})
export class SchemeEditorToolbarComponent {

  public readonly icons: typeof ICONS = ICONS;

  public readonly localization: typeof LOCALIZATION = LOCALIZATION;

  public eAction: typeof ESchemeToolbarAction = ESchemeToolbarAction;

  constructor(
    private editor: SchemeEditorComponent
  ) {
  }

  public onActionClick(action: ESchemeToolbarAction): void {
    switch (action) {
      case ESchemeToolbarAction.SELECT_ALL:
        this.editor.fFlowComponent.selectAll();
        break;
      case ESchemeToolbarAction.UNSELECT_ALL:
        this.editor.fFlowComponent.clearSelection();
        break;
      case ESchemeToolbarAction.ZOOM_IN:
        this.editor.fZoomDirective.zoomIn();
        break;
      case ESchemeToolbarAction.ZOOM_OUT:
        this.editor.fZoomDirective.zoomOut();
        break;
      case ESchemeToolbarAction.FIT_TO_SCREEN:
        this.editor.fCanvasComponent.fitToScreen();
        break;
      case ESchemeToolbarAction.ONE_TO_ONE:
        this.editor.fCanvasComponent.oneToOne();
        break;
    }
  }
}
