import { OverwriteEntitiesRequest } from './overwrite-entities-request';
import { Observable, Subscriber, take } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  EOverwriteEntities,
  OverwriteEntitiesDialogComponent,
  OverwriteEntitiesDialogRequest,
  OverwriteEntitiesDialogResponse
} from '../../components';
import {
  IsDirectoryHasEntitiesWithSameNamesHandler,
  IsDirectoryHasEntitiesWithSameNamesRequest,
  IsDirectoryHasEntitiesWithSameNamesResponse
} from '../is-directory-has-entities-with-same-names-handler';
import { MatDialog } from '@angular/material/dialog';
import { IEntity } from '@core';
import {IHandler} from "@foblex/mediator";

@Injectable()
export class OverwriteEntitiesHandler
    implements IHandler<OverwriteEntitiesRequest, Observable<OverwriteEntitiesDialogResponse[]>> {

  constructor(
      private dialog: MatDialog,
      private entitiesWithSameNameHandler: IsDirectoryHasEntitiesWithSameNamesHandler,
  ) {
  }

  public handle(request: OverwriteEntitiesRequest): Observable<OverwriteEntitiesDialogResponse[]> {
    const entitiesForMove = this.entitiesWithSameNameHandler.handle(
        new IsDirectoryHasEntitiesWithSameNamesRequest(request.entities, request.toDirectory)
    );

    return new Observable((observer) => {
      this.subscribeOnResultItem(entitiesForMove, 0, [], observer);
    });
  }

  private subscribeOnResultItem(
      entitiesForMove: IsDirectoryHasEntitiesWithSameNamesResponse,
      index: number,
      result: OverwriteEntitiesDialogResponse[],
      observer: Subscriber<OverwriteEntitiesDialogResponse[]>
  ): void {
    const itemForMove = entitiesForMove.data[ index ];

    if (itemForMove?.entityWithSameName) {
      this.openOverwriteDialog(itemForMove.entity, itemForMove.toDirectory).pipe(take(1)).subscribe((dialogResult) => {
        if (!dialogResult || dialogResult.overwriteResult === EOverwriteEntities.CANCEL) {
          observer.next([]);
        } else {
          result.push(dialogResult);
          if (index + 1 < entitiesForMove.data.length) {
            this.subscribeOnResultItem(entitiesForMove, index + 1, result, observer);
          } else {
            observer.next(result);
          }
        }
      });
    } else {
      result.push(new OverwriteEntitiesDialogResponse(itemForMove.entity, itemForMove.toDirectory, EOverwriteEntities.WRITE));

      if (index + 1 < entitiesForMove.data.length) {
        this.subscribeOnResultItem(entitiesForMove, index + 1, result, observer);
      } else {
        observer.next(result);
      }
    }
  }

  private openOverwriteDialog(entity: IEntity, toDirectory: string): Observable<OverwriteEntitiesDialogResponse | undefined> {
    const request = new OverwriteEntitiesDialogRequest(entity, toDirectory);
    return this.dialog.open(OverwriteEntitiesDialogComponent, { data: request }).afterClosed();
  }
}
