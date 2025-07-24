import { GetNamesByTypeInDirectoryRequest } from './get-names-by-type-in-directory.request';
import { StorageService } from '@core';
import {IHandler} from "@foblex/mediator";

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
