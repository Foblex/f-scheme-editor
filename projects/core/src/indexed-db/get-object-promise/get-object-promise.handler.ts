import { from, Observable } from 'rxjs';
import { DB_STORE_NAME } from '../constants';
import { GetObjectPromiseRequest } from './get-object-promise.request';
import {IHandler} from "@foblex/mediator";

export class GetObjectPromiseHandler<TData> implements IHandler<GetObjectPromiseRequest, Observable<TData | undefined>> {

  public handle(payload: GetObjectPromiseRequest): Observable<TData | undefined> {
    return from(this.getObjectPromise(payload));
  }

  private async getObjectPromise(payload: GetObjectPromiseRequest): Promise<TData | undefined> {
    const db = await payload.dbReady;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(DB_STORE_NAME, 'readonly');
      const store = transaction.objectStore(DB_STORE_NAME);
      const request = store.get(payload.id);
      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest)?.result);
      }
      request.onerror = (event) => {
        reject((event.target as IDBRequest)?.error);
      }
    });
  }
}
