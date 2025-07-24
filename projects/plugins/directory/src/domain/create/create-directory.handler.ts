import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { IDirectory } from '../i-directory';
import { CreateDirectoryRequest } from './create-directory.request';
import { CreateEntityHandlerBase, EEntityType, IEntitySummary, StorageService } from '@core';
import {generateGuid} from "@foblex/utils";

@Injectable({
  providedIn: 'root'
})
export class CreateDirectoryHandler extends CreateEntityHandlerBase {

  constructor(
      private storage: StorageService,
  ) {
    super();
  }

  public handle(payload: CreateDirectoryRequest): Observable<IEntitySummary> {
    const entity: IDirectory = {
      key: generateGuid(),
      parentKey: payload.inDirectory,
      name: payload.name,
      type: EEntityType.DIRECTORY,
    };

    this.storage.setEntity(entity);

    return this.storage.saveData().pipe(switchMap(() => {
      return of({ key: entity.key, name: entity.name, type: entity.type });
    }));
  }
}
