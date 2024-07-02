import { GetNamesByTypeInDirectoryRequest } from './get-names-by-type-in-directory.request';
import { IHandler } from '@foblex/core';
import { StorageService } from '@core';

export class GetNamesByTypeInDirectoryHandler
    implements IHandler<GetNamesByTypeInDirectoryRequest, string[]> {

  constructor(
      private storage: StorageService
  ) {
  }

  public handle(payload: GetNamesByTypeInDirectoryRequest): string[] {
    return this.storage.getEntitiesByType(payload.type).filter((x) => {
      return x.parentKey === payload.inDirectory;
    }).map((x) => {
      return x.name.toLowerCase();
    });
  }
}
