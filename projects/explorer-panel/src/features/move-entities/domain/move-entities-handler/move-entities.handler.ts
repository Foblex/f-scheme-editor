import { MoveEntitiesRequest } from './move-entities-request';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { MoveEntitiesDialogComponent, MoveEntitiesDialogRequest } from '../../components';
import {
  EOverwriteEntities,
  OverwriteEntitiesDialogResponse,
  OverwriteEntitiesHandler,
  OverwriteEntitiesRequest
} from '../../../overwrite-entities';
import { ExplorerPanelApiService } from '../../../../services';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '@core';
import {IHandler} from "@foblex/mediator";

@Injectable()
export class MoveEntitiesHandler
    implements IHandler<MoveEntitiesRequest, Observable<boolean | null>> {

  constructor(
      private dialog: MatDialog,
      private apiService: ExplorerPanelApiService,
      private overwriteEntities: OverwriteEntitiesHandler,
      private storage: StorageService
  ) {
  }

  public handle(request: MoveEntitiesRequest): Observable<boolean | null> {
    return this.showDialog(
        new MoveEntitiesDialogRequest(request.entities)
    ).pipe(switchMap((result) => {
      if (result) {

        const entitiesToMove = request.entities.map((x) => {
          return this.storage.getEntity(x.key, x.type)!;
        });

        return this.overwriteEntities.handle(
            new OverwriteEntitiesRequest(entitiesToMove, request.toDirectory)
        ).pipe(map((result) => {
          this.moveEntities(result);
          return true;
        }), switchMap((result) => {
            return this.storage.saveData().pipe(map(() => result));
        }));
      }
      return of(null);
    }));
  }

  private showDialog(request: MoveEntitiesDialogRequest): Observable<boolean> {
    return this.dialog.open(MoveEntitiesDialogComponent, { data: request }).afterClosed();
  }

  private moveEntities(result: OverwriteEntitiesDialogResponse[]): void {
    result.forEach((item) => {
      if (item.overwriteResult === EOverwriteEntities.WRITE) {
        let entity = this.storage.getEntity(item.entity.key, item.entity.type)!;
        entity.parentKey = item.toDirectory;
        this.storage.setEntity(entity!);
      } else if (item.overwriteResult === EOverwriteEntities.OVERWRITE) {
        const entityToDelete = Object.values(this.storage.project.entities[ item.entity.type ]).find((x) => {
          const isNamesEqual = x.name.toLowerCase() === item.entity.name.toLowerCase();
          return isNamesEqual && x.parentKey === item.toDirectory;
        });
        if (entityToDelete) {
          const itemsToDelete = this.apiService.getItemsWithChildren([ entityToDelete.key ]);
          itemsToDelete.forEach((itemToDelete) => {
            this.storage.removeEntity(itemToDelete.key, itemToDelete.type);
          });

          let entity = this.storage.getEntity(item.entity.key, item.entity.type)!;
          entity.parentKey = item.toDirectory;
          this.storage.setEntity(entity!);
        }
      }
    });
  }
}
