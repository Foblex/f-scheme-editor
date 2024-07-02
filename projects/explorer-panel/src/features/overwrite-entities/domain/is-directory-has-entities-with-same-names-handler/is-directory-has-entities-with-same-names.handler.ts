import { IsDirectoryHasEntitiesWithSameNamesRequest } from './is-directory-has-entities-with-same-names-request';
import { Injectable } from '@angular/core';
import { IHandler } from '@foblex/core';
import { IsDirectoryHasEntitiesWithSameNamesResponse } from './is-directory-has-entities-with-same-names-response';
import {
  IsDirectoryHasEntitiesWithSameNamesResponseItem
} from './is-directory-has-entities-with-same-names-response-item';
import { IEntity, LodashExtensions, StorageService } from '@core';

@Injectable()
export class IsDirectoryHasEntitiesWithSameNamesHandler
    implements IHandler<IsDirectoryHasEntitiesWithSameNamesRequest, IsDirectoryHasEntitiesWithSameNamesResponse> {

  constructor(
      private storage: StorageService
  ) {
  }

  public handle(request: IsDirectoryHasEntitiesWithSameNamesRequest): IsDirectoryHasEntitiesWithSameNamesResponse {
    const result = request.entities.map((entity) => {
      const entityWithSameName = this.isDirectoryHasEntityWithSameName(entity, request.toDirectory);
      return new IsDirectoryHasEntitiesWithSameNamesResponseItem(
          entity,
          entityWithSameName,
          request.toDirectory
      );
    });

    const unique = LodashExtensions.uniqueBy(result, (x) => x.entity.name.toLowerCase());

    return new IsDirectoryHasEntitiesWithSameNamesResponse(unique);
  }

  private isDirectoryHasEntityWithSameName(entity: IEntity, toDirectory: string): IEntity | undefined {
    const entitiesByType = Object.values(this.storage.getEntitiesByType( entity.type ));
    return entitiesByType.find((x) =>
        x.parentKey === toDirectory &&
        x.name.toLowerCase() === entity.name.toLowerCase() &&
        x.key !== entity.key);
  }
}
