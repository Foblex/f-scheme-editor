import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'f-editor-container',
  templateUrl: './f-editor-container.component.html',
  styleUrls: [ './f-editor-container.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'tabindex': '-1'
  }
})
export class FEditorContainerComponent {

}
