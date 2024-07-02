import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { IPalette } from '../i-palette';
import { CreatePaletteRequest } from './create-palette.request';
import { CreateEntityHandlerBase, EEntityType, IEntitySummary, StorageService } from '@core';
import { GuidExtensions } from '@foblex/core';

@Injectable({
  providedIn: 'root'
})
export class CreatePaletteHandler extends CreateEntityHandlerBase {

  constructor(
      private storage: StorageService,
  ) {
    super();
  }

  public handle(payload: CreatePaletteRequest): Observable<IEntitySummary> {
    const entity: IPalette = {
      key: GuidExtensions.generate(),
      parentKey: payload.inDirectory,
      name: payload.name,
      type: EEntityType.PALETTE,
    };

    this.storage.setEntity(entity);

    return this.storage.saveData().pipe(switchMap(() => {
      return of({ key: entity.key, name: entity.name, type: entity.type });
    }));
  }
}
