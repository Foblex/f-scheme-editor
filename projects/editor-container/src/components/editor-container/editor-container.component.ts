import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'editor-container',
  templateUrl: './editor-container.component.html',
  styleUrls: [ './editor-container.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'tabindex': '-1'
  }
})
export class EditorContainerComponent {

}
