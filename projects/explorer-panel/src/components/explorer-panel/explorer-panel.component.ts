import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Inject,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { CuttedItemsService, ExplorerPanelApiService, SelectionService, ToggleItemsService } from '../../services';
import { ExplorerPanelToolbarComponent } from '../toolbar';
import { ExplorerPanelTreeComponent } from '../explorer-panel-tree/explorer-panel-tree.component';
import { GetDragHandleUnderPointerFeature, ITreeItem } from '../../domain';
import {
  ECommonMenuAction,
  EEntityType, EKeyboardEvent, getKeyboardEvent,
  IEntity,
  IEntityPlugin,
  IEntitySummary,
  PLUGIN_TOKEN,
  ROOT_DIRECTORY_KEY
} from '@core';
import { ContextMenuComponent } from '../context-menu';
import { CdkContextMenuTrigger } from '@angular/cdk/menu';
import { take } from 'rxjs';
import {
  CopyEntitiesHandler,
  CopyEntitiesRequest,
  IsDirectoryHasEntitiesWithSameNamesHandler,
  MoveEntitiesHandler,
  MoveEntitiesRequest,
  OverwriteEntitiesHandler,
  PasteEntitiesHandler,
  PasteEntitiesRequest
} from '../../features';
import { RouterStorage } from '@router-controller';

@Component({
  selector: 'explorer-panel',
  templateUrl: './explorer-panel.component.html',
  styleUrls: [ './explorer-panel.component.scss' ],
  standalone: true,
  imports: [
    ExplorerPanelTreeComponent,
    ExplorerPanelToolbarComponent,
    ContextMenuComponent,
    CdkContextMenuTrigger
  ],
  providers: [
    ExplorerPanelApiService,
    SelectionService,
    CuttedItemsService,
    ToggleItemsService,
    GetDragHandleUnderPointerFeature,
    CopyEntitiesHandler,
    PasteEntitiesHandler,
    OverwriteEntitiesHandler,
    IsDirectoryHasEntitiesWithSameNamesHandler,
    MoveEntitiesHandler
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(keydown)': 'handleKeydown($event)',
  }
})
export class ExplorerPanelComponent implements OnInit, OnDestroy {

  public viewModel: ITreeItem | null = null;

  @ViewChild(ExplorerPanelToolbarComponent, { static: false })
  public toolbar!: ExplorerPanelToolbarComponent;

  @ViewChild(ExplorerPanelTreeComponent, { static: false })
  public explorerPanel!: ExplorerPanelTreeComponent;

  constructor(
    private apiService: ExplorerPanelApiService,
    @Inject(PLUGIN_TOKEN) private plugins: IEntityPlugin<IEntity>[],
    private selectionService: SelectionService,
    private injector: Injector,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.initialize();
  }

  private initialize(): void {
    this.apiService.initialize();
    this.viewModel = this.apiService.getTree();
  }

  public handleKeydown(event: KeyboardEvent): void {
    switch (getKeyboardEvent(event)) {
      case EKeyboardEvent.NEW:
        this.onContextMenuAction(EEntityType.SCRATCH_FILE);
        event.preventDefault();
        break;
      case EKeyboardEvent.REMOVE:
        this.onContextMenuAction(ECommonMenuAction.DELETE);
        event.preventDefault();
        break;
      case EKeyboardEvent.COPY:
        this.onContextMenuAction(ECommonMenuAction.COPY);
        event.preventDefault();
        break;
      case EKeyboardEvent.PASTE:
        this.onContextMenuAction(ECommonMenuAction.PASTE);
        event.preventDefault();
        break;
      case EKeyboardEvent.RENAME:
        this.onContextMenuAction(ECommonMenuAction.RENAME);
        event.preventDefault();
        break;
      case EKeyboardEvent.SEARCH:
        event.preventDefault();
        this.toolbar.onShowSearchClick();
        break;
      case EKeyboardEvent.UNDO:

        event.preventDefault();
        break;
    }
  }

  public onContextMenuAction(action: ECommonMenuAction | EEntityType): void {
    if ((Object.values(EEntityType) as string[]).includes(action)) {
      this.onCreate(action as EEntityType);
    } else {
      switch (action) {
        case ECommonMenuAction.CUT:
          this.onCut();
          break;
        case ECommonMenuAction.COPY:
          this.onCopy();
          break;
        case ECommonMenuAction.PASTE:
          this.onPaste();
          break;
        case ECommonMenuAction.DELETE:
          this.onDelete();
          break;
        case ECommonMenuAction.RENAME:
          this.onRename();
          break;
        default:
          throw new Error('Incorrect Action ' + action);
      }
    }
  }

  public onActivateItem(entity: IEntitySummary): void {
    const feature = this.injector.get(RouterStorage);
    feature.show(entity);
  }

  public onMoveToContainer(toContainer: string): void {
    const feature = this.injector.get(MoveEntitiesHandler);

    let entities = this.apiService.filterChildrenEntitiesIfHasParentInList(this.selectionService.allSelected);
    entities = entities.filter((x) => x.parentKey !== toContainer);

    feature.handle(new MoveEntitiesRequest(entities, toContainer)).pipe(take(1)).subscribe((result) => {
      this.explorerPanel.focus();
      if (result) {
        this.initialize();
        this.explorerPanel.expand(toContainer);
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  public onCreate(type: EEntityType): void {
    const inDirectoryId: string = this.selectionService.getFirstSelectedOrRootDirectory();
    const inDirectory = this.apiService.getItem(inDirectoryId)?.key || ROOT_DIRECTORY_KEY;
    this.apiService.createItem(inDirectory, type).pipe(take(1)).subscribe((result: IEntitySummary | null) => {
      this.explorerPanel.focus();
      if (result) {
        this.initialize();
        this.explorerPanel.initializeWithIds([result.key]);
        this.explorerPanel.expand(inDirectory);
        const plugin = this.plugins.find((x) => x.type === result.type);

        if (plugin && plugin.type === EEntityType.DIRECTORY) {
          this.explorerPanel.expand(result.key);
        }

        if (plugin && plugin.editor) {
          this.onActivateItem(result);
        }
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  public onCut(): void {

  }

  public onCopy(): void {
    const feature = this.injector.get(CopyEntitiesHandler);

    let itemsForCopy = this.apiService.getItemsWithChildren(this.selectionService.allSelected);

    feature.handle(new CopyEntitiesRequest(itemsForCopy)).pipe(take(1)).subscribe();
  }

  public onPaste(): void {
    const feature = this.injector.get(PasteEntitiesHandler);

    const inDirectoryId: string = this.selectionService.getFirstSelectedOrRootDirectory();
    const inDirectory = this.apiService.getItem(inDirectoryId).key;

    feature.handle(new PasteEntitiesRequest(inDirectory)).pipe(take(1)).subscribe((result: IEntity[] | null) => {
      this.explorerPanel.focus();
      if (result) {
        this.initialize();
        this.explorerPanel.initializeWithIds(result.map((x) => x.key));
        this.explorerPanel.expand(inDirectory);
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  public onDelete(): void {
    let items = this.apiService.getItemsWithChildren(this.selectionService.allSelected);
    if (!items || items.length === 0) {
      throw new Error('Can\'t find entities for delete');
    }
    this.apiService.deleteItems(items).pipe(take(1)).subscribe((result) => {
      this.explorerPanel.focus();
      if (result) {
        this.initialize();

        const routerStorage = this.injector.get(RouterStorage);
        items.forEach((x) => {
          routerStorage.hideEditor(x.key);
        });

        this.changeDetectorRef.markForCheck();
      }
    });
  }

  public onRename(): void {
    const entity = this.selectionService.getSelectedIfSingleSelected();
    if (!entity) {
      throw new Error(`Can\'t find entity for rename`);
    }

    this.apiService.renameItem(entity).pipe(take(1)).subscribe((result) => {
      this.explorerPanel.focus();
      if (result) {

        this.apiService.getItem(result.key)!.name = result.name;

        this.explorerPanel.redrawItem(result.key);
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  public ngOnDestroy(): void {

  }
}
