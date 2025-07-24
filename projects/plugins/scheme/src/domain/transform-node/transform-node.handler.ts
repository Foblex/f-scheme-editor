import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { IScheme } from '../i-scheme';
import { TransformNodeRequest } from './transform-node.request';
import { EEntityType, IEntitySummary, StorageService } from '@core';
import {IHandler} from "@foblex/mediator";

@Injectable()
export class TransformNodeHandler implements IHandler<TransformNodeRequest, Observable<IEntitySummary>> {

  constructor(
    private storage: StorageService,
  ) {
  }

  public handle(payload: TransformNodeRequest): Observable<IEntitySummary> {
    const entity = this.storage.getEntity<IScheme>(payload.key, EEntityType.SCHEME_DRAWER)!;

    const node = entity.nodes.find(n => n.key === payload.nodeKey)!;
    node.rectStyle.x = payload.rect.x;
    node.rectStyle.y = payload.rect.y;
    node.rectStyle.width = payload.rect.width;
    node.rectStyle.height = payload.rect.height;

    return this.storage.saveData().pipe(switchMap(() => {
      return of({ key: entity.key, name: entity.name, type: entity.type });
    }));
  }
}
