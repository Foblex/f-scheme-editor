import { RenameEntityRequest } from './rename-entity.request';
import { Observable, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageService } from '../../storage';
import { IEntitySummary } from '../../core-domain';
import {IHandler} from "@foblex/mediator";

@Injectable({
  providedIn: 'root',
})
export class RenameEntityHandler
  implements IHandler<RenameEntityRequest, Observable<IEntitySummary>> {

  constructor(
    private storage: StorageService,
  ) {
  }

  public handle(payload: RenameEntityRequest): Observable<IEntitySummary> {
    const entity = this.storage.getEntity(payload.key, payload.type);
    entity!.name = payload.newName;

    return this.storage.saveData().pipe(switchMap(() => {
      return of({ key: payload.key, name: payload.newName, type: entity!.type });
    }));
  }
}
