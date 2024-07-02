import { CopyEntitiesRequest } from './copy-entities-request';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GuidExtensions, IHandler } from '@foblex/core';
import { ClipboardService, IEntity, LodashExtensions, StorageService } from '@core';
import { EP_CLIPBOARD_TOKEN } from '../../../../domain';

@Injectable()
export class CopyEntitiesHandler
    implements IHandler<CopyEntitiesRequest, Observable<void>> {

  constructor(
      private clipboardService: ClipboardService,
      private storage: StorageService
  ) {
  }

  public handle(request: CopyEntitiesRequest): Observable<void> {
    const entitiesForCopy = request.items.map((x) => {
      return LodashExtensions.cloneDeep(this.storage.getEntity(x.key, x.type)!);
    });

    this.regenerateIds(entitiesForCopy);
    return this.clipboardService.copy({
      type: EP_CLIPBOARD_TOKEN,
      data: entitiesForCopy
    });
  }

  private regenerateIds(entities: IEntity[]) {
    entities.forEach((entity) => {
      const oldKey = entity.key;
      entity.key = GuidExtensions.generate();
      entities.filter((x) => x.parentKey === oldKey).forEach((x) => x.parentKey = entity.key);
    });
  }
}
