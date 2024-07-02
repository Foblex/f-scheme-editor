import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ICONS } from '@resources';
import { LOCALIZATION } from '../../localization';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FFlowModule } from '@foblex/flow';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { IPaletteGroup } from '../../domain';

@Component({
  selector: 'scheme-editor-palette',
  templateUrl: './scheme-editor-palette.component.html',
  styleUrls: [ './scheme-editor-palette.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgScrollbarModule,
    FFlowModule,
    MatIcon,
    MatTooltip
  ],
  host: {
    'role': 'toolbar'
  }
})
export class SchemeEditorPaletteComponent implements OnDestroy {

  private subscriptions: Subscription = new Subscription();

  public readonly icons: typeof ICONS = ICONS;

  public readonly localization: typeof LOCALIZATION = LOCALIZATION;


  public viewModel: IPaletteGroup[] = [{
    key: 'group1',
    name: 'group1',
    items: [
      {
        name: 'item1',
        key: 'tooltip1'
      },
      {
        name: 'item2',
        key: 'tooltip2'
      },
      {
        name: 'item3',
        key: 'tooltip3'
      },
      {
        name: 'item4',
        key: 'tooltip4'
      }
    ]
  }, {
    key: 'group2',
    name: 'group2',
    items: [
      {
        name: 'item3',
        key: 'tooltip3'
      },
      {
        name: 'item4',
        key: 'tooltip4'
      }
    ]
  }];

  constructor() {
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
