import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { IScheme } from '../i-scheme';
import { CreateSchemeRequest } from './create-scheme.request';
import { CreateEntityHandlerBase, EEntityType, IEntitySummary, StorageService } from '@core';
import { ESchemeBackground } from '../e-scheme-background';
import {generateGuid} from "@foblex/utils";

@Injectable({
  providedIn: 'root'
})
export class CreateSchemeHandler extends CreateEntityHandlerBase {

  constructor(
      private storage: StorageService,
  ) {
    super();
  }

  public handle(payload: CreateSchemeRequest): Observable<IEntitySummary> {
    const entity: IScheme = {
      key: generateGuid(),
      parentKey: payload.inDirectory,
      name: payload.name,
      type: EEntityType.SCHEME_DRAWER,
      background: ESchemeBackground.RECT,
      fill: '#ffffff',
      stroke: '#f7f8fa',
      nodes: [],
      connections: []
    };

    this.storage.setEntity(entity);

    return this.storage.saveData().pipe(switchMap(() => {
      return of({ key: entity.key, name: entity.name, type: entity.type });
    }));
  }
}
