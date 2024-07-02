import { DeleteEntitiesRequest } from './delete-entities.request';
import { Observable, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { IHandler } from '@foblex/core';
import { StorageService } from '../../storage';

@Injectable({
  providedIn: 'root',
})
export class DeleteEntitiesHandler
    implements IHandler<DeleteEntitiesRequest, Observable<boolean>> {

  constructor(
      private storage: StorageService,
  ) {
  }

  public handle(payload: DeleteEntitiesRequest): Observable<boolean>{
    payload.items.forEach((x) => {
      this.storage.removeEntity(x.key, x.type);
    });

    return this.storage.saveData().pipe(switchMap(() => {
      return of(true);
    }));
  }
}
