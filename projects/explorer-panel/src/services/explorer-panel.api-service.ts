import { Inject, Injectable } from '@angular/core';
import {
  EmptyExplorerPanelStateHandler,
  FilterChildrenEntitiesIfHasParentInListHandler, FilterChildrenEntitiesIfHasParentInListRequest,
  GetEntitiesBetweenInTreeHandler,
  GetEntitiesBetweenInTreeRequest,
  GetEntitiesTreeHandler, GetEntitiesWithChildrenHandler, GetEntitiesWithChildrenRequest,
  IExplorerPanelState,
  ITreeItem
} from '../domain';
import { Observable, of, switchMap } from 'rxjs';
import {
  DeleteEntitiesHandler, DeleteEntitiesRequest,
  IEntity,
  IEntityPlugin,
  IEntitySummary,
  PLUGIN_TOKEN,
  RenameEntityHandler, RenameEntityRequest,
  StorageService
} from '@core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntitiesDialogComponent, DeleteEntitiesDialogData } from '../components/delete';
import { CreateEntityDialogComponent, CreateEntityDialogData } from '../components/create';
import { RenameEntityDialogComponent, RenameEntityDialogData } from '../components/rename';

@Injectable()
export class ExplorerPanelApiService {

  private state: IExplorerPanelState = new EmptyExplorerPanelStateHandler().handle();

  constructor(
    private storage: StorageService,
    private renameEntity: RenameEntityHandler,
    private deleteEntities: DeleteEntitiesHandler,
    @Inject(PLUGIN_TOKEN) private plugins: IEntityPlugin<IEntity>[],
    private dialog: MatDialog,
  ) {
  }

  public initialize(): void {
    this.state = new GetEntitiesTreeHandler(this.storage, this.plugins).handle();
  }

  public getTree(): ITreeItem {
    return this.state.tree;
  }

  public getItem(id: string): ITreeItem {
    return this.state.flatten.get(id) as ITreeItem;
  }

  public getEntityIdsBetween(fromId: string, toId: string): string[] {
    return new GetEntitiesBetweenInTreeHandler().handle(
      new GetEntitiesBetweenInTreeRequest(this.state.flatten, fromId, toId)
    );
  }

  public getItemsWithChildren(allSelected: string[]): ITreeItem[] {
    return new GetEntitiesWithChildrenHandler().handle(
      new GetEntitiesWithChildrenRequest(this.state.flatten, allSelected)
    );
  }

  public filterChildrenEntitiesIfHasParentInList(allSelected: string[]): ITreeItem[] {
    return new FilterChildrenEntitiesIfHasParentInListHandler().handle(
      new FilterChildrenEntitiesIfHasParentInListRequest(this.state.flatten, allSelected)
    );
  }

  public renameItem(item: ITreeItem): Observable<IEntitySummary | null> {
    return this.dialog.open(RenameEntityDialogComponent, {
      data: new RenameEntityDialogData(item)
    }).afterClosed().pipe(switchMap((result) => {
      if (result) {
        return this.renameEntity.handle(
          new RenameEntityRequest(item.key, item.type, result)
        );
      }
      return of(null);
    }));
  }

  public deleteItems(items: ITreeItem[]): Observable<boolean | null> {
    return this.dialog.open(DeleteEntitiesDialogComponent, {
      data: new DeleteEntitiesDialogData(items)
    }).afterClosed().pipe(switchMap((result) => {
      if (result) {
        return this.deleteEntities.handle(
          new DeleteEntitiesRequest(items)
        );
      }
      return of(null);
    }));
  }

  public createItem(inDirectory: string, type: string): Observable<IEntitySummary | null> {
    return this.dialog.open(CreateEntityDialogComponent, {
      data: new CreateEntityDialogData(type, inDirectory),
      restoreFocus: false,
      autoFocus: false
    }).afterClosed().pipe(switchMap((result) => {
      if (result) {
        const plugin = this.plugins.find((p) => p.type === type);
        result.inDirectory = inDirectory;
        return plugin!.create(result);
      }
      return of(null);
    }));
  }
}
