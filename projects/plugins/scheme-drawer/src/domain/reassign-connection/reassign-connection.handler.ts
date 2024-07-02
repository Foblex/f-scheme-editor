import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { IScheme } from '../i-scheme';
import { ReassignConnectionRequest } from './reassign-connection.request';
import { EEntityType, IEntitySummary, StorageService } from '@core';
import { IHandler } from '@foblex/core';

@Injectable()
export class ReassignConnectionHandler implements IHandler<ReassignConnectionRequest, Observable<IEntitySummary>> {

  constructor(
    private storage: StorageService,
  ) {
  }

  public handle(payload: ReassignConnectionRequest): Observable<IEntitySummary> {
    const entity = this.storage.getEntity<IScheme>(payload.key, EEntityType.SCHEME_DRAWER)!;

    const connection = entity.connections.find(x => x.key === payload.connectionKey);
    connection!.to = payload.targetKey;

    return this.storage.saveData().pipe(switchMap(() => {
      return of({ key: entity.key, name: entity.name, type: entity.type });
    }));
  }
}
