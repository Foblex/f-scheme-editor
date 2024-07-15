import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FEditorContainerComponent, FEditorDrawerComponent } from '@ui-kit';

@Component({
  selector: 'palette-root',
  templateUrl: './palette-root.component.html',
  styleUrls: [ './palette-root.component.scss' ],
  standalone: true,
  imports: [
    FEditorContainerComponent,
    FEditorDrawerComponent
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
