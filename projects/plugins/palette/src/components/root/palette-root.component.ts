import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditorContainerComponent, EditorDrawerComponent } from '@editor-container';

@Component({
  selector: 'palette-root',
  templateUrl: './palette-root.component.html',
  styleUrls: [ './palette-root.component.scss' ],
  standalone: true,
  imports: [
    EditorContainerComponent,
    EditorDrawerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaletteRootComponent implements OnInit, OnDestroy {

  private subscriptions$: Subscription = new Subscription();

  public ngOnInit(): void {

  }

  public ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
