import { from, Observable } from 'rxjs';
import { DB_STORE_NAME } from '../constants';
import { CreateObjectPromiseRequest } from './create-object-promise.request';
import {IHandler} from "@foblex/mediator";

export class CreateObjectPromiseHandler<TData> implements IHandler<CreateObjectPromiseRequest<TData>, Observable<void>> {

  public handle(payload: CreateObjectPromiseRequest<TData>): Observable<void> {
    return from(this.createObjectPromise(payload));
  }

  private async createObjectPromise(payload: CreateObjectPromiseRequest<TData>): Promise<void> {
    const db = await payload.dbReady;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(DB_STORE_NAME, 'readwrite');
      const store = transaction.objectStore(DB_STORE_NAME);
      const request = store.add(payload.object);
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest)?.error);
    });
  }
}
