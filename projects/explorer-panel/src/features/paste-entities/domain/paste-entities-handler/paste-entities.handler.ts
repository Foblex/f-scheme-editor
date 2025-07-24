import { PasteEntitiesRequest } from './paste-entities.request';
import { map, Observable, of, switchMap } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { PasteEntitiesDialogComponent, PasteEntitiesDialogRequest } from '../../components';
import { EOverwriteEntities, OverwriteEntitiesDialogResponse, OverwriteEntitiesHandler, OverwriteEntitiesRequest } from '../../../overwrite-entities';
import { EP_CLIPBOARD_TOKEN } from '../../../../domain';
import { GetAllChildrenForEntityToPasteHandler, GetAllChildrenForEntityToPasteRequest } from '../get-all-children-for-entity-to-paste';
import { ExplorerPanelApiService } from '../../../../services';
import { ClipboardService, IEntity, IEntityPlugin, LodashExtensions, PLUGIN_TOKEN, StorageService } from '@core';
import { MatDialog } from '@angular/material/dialog';
import {IHandler} from "@foblex/mediator";

@Injectable()
export class PasteEntitiesHandler
    implements IHandler<PasteEntitiesRequest, Observable<IEntity[] | null>> {

  constructor(
      private dialog: MatDialog,
      @Inject(PLUGIN_TOKEN) private plugins: IEntityPlugin<IEntity>[],
      private clipboardService: ClipboardService,
      private apiService: ExplorerPanelApiService,
      private overwriteEntities: OverwriteEntitiesHandler,
      private storage: StorageService
  ) {
  }

  public handle(request: PasteEntitiesRequest): Observable<IEntity[] | null> {
    return this.clipboardService.paste<IEntity[]>(EP_CLIPBOARD_TOKEN).pipe(switchMap((entitiesToPaste) => {
      entitiesToPaste = this.filterValidEntitiesToPaste(entitiesToPaste || []);
      console.log(entitiesToPaste);
      const entitiesWithoutParent = this.getEntitiesWithoutParent(entitiesToPaste);
      console.log(entitiesWithoutParent);
      if (entitiesWithoutParent && entitiesWithoutParent.length) {
        return this.dialog.open(PasteEntitiesDialogComponent, {
          data: new PasteEntitiesDialogRequest(entitiesWithoutParent)
        }).afterClosed().pipe(switchMap((dialogResult: IEntity[] | undefined) => {
          if (dialogResult) {

            return this.overwriteEntities.handle(new OverwriteEntitiesRequest(dialogResult, request.toDirectory)).pipe(map((result) => {
              this.pasteEntities(result, entitiesToPaste!);
              return result.filter((x) => {
                return x.overwriteResult === EOverwriteEntities.WRITE || x.overwriteResult === EOverwriteEntities.OVERWRITE
              }).map((x) => {
                return x.entity;
              });
            }), switchMap((result) => {
              return this.storage.saveData().pipe(map(() => result));
            }));
          }
          return of(null);
        }));
      }
      return of(null);
    }));
  }

  private filterValidEntitiesToPaste(clipboardResult: IEntity[]): IEntity[] {
    return clipboardResult.filter((x) => {
      const isType: boolean = !!x.type;
      const plugin = this.plugins.find((p) => isType && p.type === x.type);
      return plugin?.validate(x);
    });
  }

  private getEntitiesWithoutParent(entities: IEntity[]): IEntity[] {
    const keys = entities.map((x) => x.key);
    return entities.filter((x) => {
      return !LodashExtensions.includes(keys, x.parentKey!);
    });
  }

  private pasteEntities(result: OverwriteEntitiesDialogResponse[], allEntities: IEntity[]): void {
    result.forEach((item) => {
      const itemChildren = new GetAllChildrenForEntityToPasteHandler().handle(
          new GetAllChildrenForEntityToPasteRequest(item.entity, allEntities)
      );
      if (item.overwriteResult === EOverwriteEntities.WRITE) {
        item.entity.parentKey = item.toDirectory;
        this.storage.setEntity(item.entity);
        itemChildren.forEach((x) => {
          this.storage.setEntity(x);
        });

      } else if (item.overwriteResult === EOverwriteEntities.OVERWRITE) {
        const entityToDelete = Object.values(this.storage.getEntitiesByType(item.entity.type)).find((x) => {
          const isNamesEqual = x.name.toLowerCase() === item.entity.name.toLowerCase();
          return isNamesEqual && x.parentKey === item.toDirectory;
        });
        if (entityToDelete) {
          const itemsToDelete = this.apiService.getItemsWithChildren([ entityToDelete.key ]);
          itemsToDelete.forEach((itemToDelete) => {
            this.storage.removeEntity(itemToDelete.key, itemToDelete.type);
          });

          item.entity.parentKey = item.toDirectory;
          this.storage.setEntity(item.entity);
          itemChildren.forEach((x) => {
            this.storage.setEntity(x);
          });
        }
      }
    });
  }
}
