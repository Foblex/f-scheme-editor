import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ECommonMenuAction, EEntityType, EKeyboardEvent, IEntity, IEntityPlugin, PLUGIN_TOKEN } from '@core';
import { ICONS, LOCALIZATION } from '@resources';
import { MatMenu } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { EntityIconPipe, EntityLocalizationPipe, ShortcutPipe } from '@ui-kit';

@Component({
  selector: 'ep-new-item-context-menu',
  exportAs: 'menuComponent',
  templateUrl: './new-item-context-menu.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    CdkMenu,
    CdkMenuItem,
    EntityLocalizationPipe,
    EntityIconPipe,
    ShortcutPipe
  ]
})
export class NewItemContextMenuComponent {

  @ViewChild(TemplateRef, { static: true })
  public menu!: TemplateRef<CdkMenu>;

  @Output()
  public onContextMenuAction: EventEmitter<EEntityType> = new EventEmitter<EEntityType>();

  public icons: typeof ICONS = ICONS;

  public localization = LOCALIZATION;

  public SCRATCH_FILE = EEntityType.SCRATCH_FILE;

  public directory: IEntityPlugin<IEntity> | undefined = this.plugins.find((x) => x.type === EEntityType.DIRECTORY);

  public entities: IEntityPlugin<IEntity>[] = this.plugins.filter((x) => x.type !== EEntityType.DIRECTORY);

  constructor(
    @Inject(PLUGIN_TOKEN) public plugins: IEntityPlugin<IEntity>[],
  ) {
  }

  public onSelectionChange(event: string): void {
    // @ts-ignore
    this.onContextMenuAction.emit(event);
  }

  protected readonly shortcuts = EKeyboardEvent;
}
