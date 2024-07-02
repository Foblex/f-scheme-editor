import { IHandler } from '@foblex/core';
import { from, Observable } from 'rxjs';
import { DB_STORE_NAME } from '../constants';
import { EditObjectPromiseRequest } from './edit-object-promise.request';

export class EditObjectPromiseHandler<TData> implements IHandler<EditObjectPromiseRequest<TData>, Observable<void>> {

  public handle(payload: EditObjectPromiseRequest<TData>): Observable<void> {
    return from(this.editObjectPromise(payload));
  }

  private async editObjectPromise(payload: EditObjectPromiseRequest<TData>): Promise<void> {
    const db = await payload.dbReady;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(DB_STORE_NAME, 'readwrite');
      const store = transaction.objectStore(DB_STORE_NAME);
      const request = store.put(payload.object);
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest)?.error);
    });
  }
}
